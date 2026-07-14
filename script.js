/**
 * ============================================================
 * Rock Paper Scissors Arena – script.js
 * ============================================================
 * Features:
 *  - Three difficulty levels (Easy / Medium / Hard)
 *  - Full scoreboard + advanced statistics with progress bars
 *  - Win/lose/draw streaks
 *  - Last-5 results + full game history
 *  - Confetti celebration on win
 *  - Keyboard shortcuts (R / P / S / N)
 *  - LocalStorage persistence
 *  - Sound support (graceful fallback if files missing)
 *  - Motivational messages after each round
 *  - Animated loading spinner (1-second computer "thinking" delay)
 * ============================================================
 */

/* ============================================================
   CONSTANTS
   ============================================================ */
const CHOICES = ['rock', 'paper', 'scissors'];

const CHOICE_META = {
  rock:     { emoji: '🪨', label: 'Rock',     beats: 'scissors' },
  paper:    { emoji: '📄', label: 'Paper',    beats: 'rock'     },
  scissors: { emoji: '✂️', label: 'Scissors', beats: 'paper'    },
};

const DIFFICULTY_LABELS = {
  easy:   '🟢 Easy Mode',
  medium: '🟡 Medium Mode',
  hard:   '🔴 Hard Mode',
};

const MOTIVATIONAL = {
  win: [
    "You're on fire! 🔥",
    "Crushing it! Keep going! 💪",
    "Brilliant move! 🎯",
    "Unstoppable! 🚀",
    "You outplayed the machine! 🤖",
    "Champion energy! 👑",
    "That's what champions do! 🏆",
  ],
  lose: [
    "Don't give up! Try again! 💡",
    "The computer got lucky… maybe. 😅",
    "One step closer to your comeback! 🔄",
    "Learn from it and bounce back! 📈",
    "Every loss is a lesson! 📚",
    "Not your round – next one is! 🎲",
    "Shake it off! You've got this! 🌟",
  ],
  draw: [
    "Great minds think alike! 🤝",
    "An even match! 🎭",
    "The stalemate continues… 🤔",
    "Both equally brilliant! ⚖️",
    "Nobody blinks first! 👀",
    "Perfect balance! ☯️",
  ],
};

const STORAGE_KEY = 'rps_arena_data';

/* ============================================================
   STATE
   ============================================================ */
let state = {
  playerScore:    0,
  computerScore:  0,
  drawScore:      0,
  gamesPlayed:    0,
  currentStreak:  0,
  bestStreak:     0,
  difficulty:     'easy',
  lastPlayerChoice: null,
  history:        [],       // full history array
  isPlaying:      false,    // prevents double-clicks during animation
};

/* ============================================================
   DOM REFERENCES
   ============================================================ */
const dom = {
  // Scores
  playerScoreEl:    document.getElementById('player-score'),
  computerScoreEl:  document.getElementById('computer-score'),
  drawScoreEl:      document.getElementById('draw-score'),
  gamesPlayedLabel: document.getElementById('games-played-label'),

  // Battle arena sections
  idleState:         document.getElementById('idle-state'),
  loadingState:      document.getElementById('loading-state'),
  resultState:       document.getElementById('result-state'),
  battleArena:       document.getElementById('battle-arena'),

  // Battle display
  playerChoiceDisplay:   document.getElementById('player-choice-display'),
  playerChoiceName:      document.getElementById('player-choice-name'),
  computerChoiceDisplay: document.getElementById('computer-choice-display'),
  computerChoiceName:    document.getElementById('computer-choice-name'),

  // Result
  resultBanner:    document.getElementById('result-banner'),
  resultText:      document.getElementById('result-text'),
  resultEmoji:     document.getElementById('result-emoji'),
  motivationalMsg: document.getElementById('motivational-msg'),

  // Choice buttons
  choiceBtns: document.querySelectorAll('.choice-btn'),

  // Action buttons
  btnPlayAgain:  document.getElementById('btn-play-again'),
  btnResetScore: document.getElementById('btn-reset-score'),
  btnNewGame:    document.getElementById('btn-new-game'),

  // Difficulty
  diffBtns:       document.querySelectorAll('.diff-btn'),
  diffIndicator:  document.getElementById('diff-indicator'),

  // Stats
  winBar:          document.getElementById('win-bar'),
  lossBar:         document.getElementById('loss-bar'),
  drawBar:         document.getElementById('draw-bar'),
  winPct:          document.getElementById('win-pct'),
  lossPct:         document.getElementById('loss-pct'),
  drawPct:         document.getElementById('draw-pct'),
  currentStreakEl:  document.getElementById('current-streak'),
  bestStreakEl:     document.getElementById('best-streak'),

  // History
  historyList:        document.getElementById('history-list'),
  toggleHistoryBtn:   document.getElementById('toggle-history-btn'),
  fullHistoryPanel:   document.getElementById('full-history-panel'),
  fullHistoryList:    document.getElementById('full-history-list'),
  closeHistoryBtn:    document.getElementById('close-history-btn'),
  fullHistoryEmpty:   document.getElementById('full-history-empty'),

  // Confetti
  confettiContainer: document.getElementById('confetti-container'),
};

/* ============================================================
   AUDIO
   ============================================================ */
/**
 * Loads an audio file gracefully.
 * Returns an Audio object or null if the file doesn't exist.
 */
function loadSound(src) {
  try {
    const audio = new Audio(src);
    // Test if the file can be loaded (no-throw guard)
    audio.preload = 'auto';
    return audio;
  } catch (_) {
    return null;
  }
}

const sounds = {
  click: loadSound('assets/click.mp3'),
  win:   loadSound('assets/win.mp3'),
  lose:  loadSound('assets/lose.mp3'),
  draw:  loadSound('assets/draw.mp3'),
};

/**
 * Plays a sound by key; silently fails if unavailable.
 */
function playSound(key) {
  const snd = sounds[key];
  if (!snd) return;
  try {
    snd.currentTime = 0;
    snd.play().catch(() => {/* audio policy – ignore */});
  } catch (_) {
    // Silently ignore any audio errors
  }
}

/* ============================================================
   LOCAL STORAGE
   ============================================================ */
function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) {
    // Storage might be blocked in some environments
  }
}

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge loaded data into state (keeps any missing keys from defaults)
      state = { ...state, ...parsed };
    }
  } catch (_) {
    // Corrupted or missing storage – use defaults
  }
}

/* ============================================================
   COMPUTER AI
   ============================================================ */
/**
 * Returns the choice that BEATS the given choice.
 */
function getWinningChoice(choice) {
  return CHOICES.find(c => CHOICE_META[c].beats === choice);
}

/**
 * Returns a completely random choice.
 */
function getRandomChoice() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

/**
 * Determines the computer's choice based on difficulty level.
 *
 * Easy:   Completely random.
 * Medium: 80% random, 20% counter the player's LAST move.
 * Hard:   70% counter the player's LAST move, 30% random.
 */
function getComputerChoice() {
  const { difficulty, lastPlayerChoice } = state;

  if (difficulty === 'easy') {
    return getRandomChoice();
  }

  if (difficulty === 'medium') {
    if (lastPlayerChoice && Math.random() < 0.20) {
      return getWinningChoice(lastPlayerChoice);
    }
    return getRandomChoice();
  }

  // Hard
  if (lastPlayerChoice && Math.random() < 0.70) {
    return getWinningChoice(lastPlayerChoice);
  }
  return getRandomChoice();
}

/* ============================================================
   GAME LOGIC
   ============================================================ */
/**
 * Determines the outcome for the player.
 * Returns: 'win' | 'lose' | 'draw'
 */
function determineWinner(player, computer) {
  if (player === computer) return 'draw';
  if (CHOICE_META[player].beats === computer) return 'win';
  return 'lose';
}

/**
 * Main game entry point. Called when player selects a choice.
 */
function playGame(playerChoice) {
  if (state.isPlaying) return;   // guard against double-clicks
  state.isPlaying = true;

  playSound('click');

  // Highlight selected choice button
  dom.choiceBtns.forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.choice === playerChoice);
    btn.classList.add('disabled-btn');
  });

  // Show player choice & computer thinking in battle area
  showLoadingState(playerChoice);

  // Wait 1 second before revealing computer choice
  setTimeout(() => {
    const computerChoice = getComputerChoice();
    const outcome        = determineWinner(playerChoice, computerChoice);

    // Update state
    state.lastPlayerChoice = playerChoice;
    state.gamesPlayed     += 1;

    if (outcome === 'win') {
      state.playerScore   += 1;
      state.currentStreak += 1;
      if (state.currentStreak > state.bestStreak) {
        state.bestStreak = state.currentStreak;
      }
    } else if (outcome === 'lose') {
      state.computerScore += 1;
      state.currentStreak  = 0;
    } else {
      state.drawScore     += 1;
      state.currentStreak  = 0;
    }

    // Record in history
    state.history.push({
      round:    state.gamesPlayed,
      player:   playerChoice,
      computer: computerChoice,
      outcome,
    });

    // Persist
    saveToStorage();

    // Render results
    showResultState(playerChoice, computerChoice, outcome);
    updateScore();
    updateStatistics();
    updateHistoryList();

    // Celebrations
    if (outcome === 'win') {
      launchConfetti();
      playSound('win');
    } else if (outcome === 'lose') {
      playSound('lose');
    } else {
      playSound('draw');
    }

    state.isPlaying = false;
  }, 1000);
}

/* ============================================================
   UI UPDATES
   ============================================================ */
/**
 * Shows the loading / "computer is thinking" state.
 */
function showLoadingState(playerChoice) {
  setArenaState('loading');

  // Pre-fill the player side (visible after reveal)
  dom.playerChoiceDisplay.textContent = CHOICE_META[playerChoice].emoji;
  dom.playerChoiceName.textContent    = CHOICE_META[playerChoice].label;
  dom.computerChoiceDisplay.textContent = '❓';
  dom.computerChoiceName.textContent    = '???';
}

/**
 * Transitions the arena to the result state.
 */
function showResultState(playerChoice, computerChoice, outcome) {
  setArenaState('result');

  // Animate computer emoji in
  dom.computerChoiceDisplay.textContent = CHOICE_META[computerChoice].emoji;
  dom.computerChoiceName.textContent    = CHOICE_META[computerChoice].label;

  // Result banner
  const bannerConfig = {
    win:  { text: 'YOU WIN',  emoji: '🎉', cls: 'win-banner',  arenaCls: 'win-celebration' },
    lose: { text: 'YOU LOSE', emoji: '😢', cls: 'lose-banner', arenaCls: '' },
    draw: { text: 'DRAW',     emoji: '🤝', cls: 'draw-banner', arenaCls: '' },
  };

  const cfg = bannerConfig[outcome];

  dom.resultBanner.className = `result-banner ${cfg.cls}`;
  dom.resultText.textContent  = cfg.text;
  dom.resultEmoji.textContent = cfg.emoji;

  // Motivational message
  const pool = MOTIVATIONAL[outcome];
  dom.motivationalMsg.textContent = pool[Math.floor(Math.random() * pool.length)];

  // Arena celebration ring
  if (cfg.arenaCls) {
    dom.battleArena.classList.add(cfg.arenaCls);
    setTimeout(() => dom.battleArena.classList.remove(cfg.arenaCls), 800);
  }
}

/**
 * Switches the visible panel inside the battle arena.
 * @param {'idle'|'loading'|'result'} panel
 */
function setArenaState(panel) {
  dom.idleState.classList.toggle('hidden',    panel !== 'idle');
  dom.loadingState.classList.toggle('hidden', panel !== 'loading');
  dom.resultState.classList.toggle('hidden',  panel !== 'result');
}

/**
 * Updates the scoreboard numbers with a pop animation.
 */
function updateScore() {
  const bump = el => {
    el.classList.remove('bump');
    // Force reflow to re-trigger animation
    void el.offsetWidth;
    el.classList.add('bump');
  };

  dom.playerScoreEl.textContent    = state.playerScore;
  dom.computerScoreEl.textContent  = state.computerScore;
  dom.drawScoreEl.textContent      = state.drawScore;
  dom.gamesPlayedLabel.textContent = `${state.gamesPlayed} Game${state.gamesPlayed !== 1 ? 's' : ''}`;

  bump(dom.playerScoreEl);
  bump(dom.computerScoreEl);
  bump(dom.drawScoreEl);
}

/**
 * Updates win/loss/draw % bars and streak counters.
 */
function updateStatistics() {
  const total = state.gamesPlayed;
  const winP  = total ? Math.round((state.playerScore   / total) * 100) : 0;
  const lossP = total ? Math.round((state.computerScore / total) * 100) : 0;
  const drawP = total ? Math.round((state.drawScore     / total) * 100) : 0;

  dom.winBar.style.width  = `${winP}%`;
  dom.lossBar.style.width = `${lossP}%`;
  dom.drawBar.style.width = `${drawP}%`;

  dom.winPct.textContent  = `${winP}%`;
  dom.lossPct.textContent = `${lossP}%`;
  dom.drawPct.textContent = `${drawP}%`;

  dom.currentStreakEl.textContent = state.currentStreak;
  dom.bestStreakEl.textContent    = state.bestStreak;
}

/* ============================================================
   HISTORY
   ============================================================ */
/**
 * Builds a single history <li> element.
 */
function createHistoryItem(entry) {
  const li = document.createElement('li');
  li.className = `history-item hist-${entry.outcome}`;

  const round    = document.createElement('span');
  round.className = 'hist-round';
  round.textContent = `#${entry.round}`;

  const emojis   = document.createElement('span');
  emojis.className = 'hist-emojis';
  emojis.textContent = `${CHOICE_META[entry.player].emoji} vs ${CHOICE_META[entry.computer].emoji}`;
  emojis.setAttribute('aria-label', `${entry.player} vs ${entry.computer}`);

  const outcome  = document.createElement('span');
  outcome.className = `hist-outcome ${entry.outcome}`;
  outcome.textContent = entry.outcome.toUpperCase();

  li.appendChild(round);
  li.appendChild(emojis);
  li.appendChild(outcome);
  return li;
}

/**
 * Refreshes the last-5 history list and the full history list.
 */
function updateHistoryList() {
  // --- Last 5 ---
  dom.historyList.innerHTML = '';
  const last5 = state.history.slice(-5).reverse();

  if (last5.length === 0) {
    const li = document.createElement('li');
    li.className = 'history-empty';
    li.textContent = 'No games played yet';
    dom.historyList.appendChild(li);
  } else {
    last5.forEach(entry => dom.historyList.appendChild(createHistoryItem(entry)));
  }

  // --- Full history ---
  dom.fullHistoryList.innerHTML = '';
  const allReversed = [...state.history].reverse();

  if (allReversed.length === 0) {
    dom.fullHistoryEmpty.classList.remove('hidden');
  } else {
    dom.fullHistoryEmpty.classList.add('hidden');
    allReversed.forEach(entry => dom.fullHistoryList.appendChild(createHistoryItem(entry)));
  }
}

/* ============================================================
   RESET FUNCTIONS
   ============================================================ */
/**
 * Resets only scores/stats (keeps history).
 */
function resetScores() {
  state.playerScore    = 0;
  state.computerScore  = 0;
  state.drawScore      = 0;
  state.gamesPlayed    = 0;
  state.currentStreak  = 0;
  state.bestStreak     = 0;
  state.lastPlayerChoice = null;
  saveToStorage();
  updateScore();
  updateStatistics();
}

/**
 * Full reset: scores + history + arena.
 */
function resetGame() {
  resetScores();
  state.history = [];
  saveToStorage();
  updateHistoryList();
  goToIdle();
}

/**
 * Returns arena to the idle/welcome state.
 */
function goToIdle() {
  setArenaState('idle');
  dom.choiceBtns.forEach(btn => {
    btn.classList.remove('selected', 'disabled-btn');
  });

  // Close full history if open
  dom.fullHistoryPanel.classList.add('hidden');
  dom.toggleHistoryBtn.setAttribute('aria-expanded', 'false');
  dom.toggleHistoryBtn.textContent = '📜 View Full History';
}

/* ============================================================
   DIFFICULTY
   ============================================================ */
function setDifficulty(level) {
  state.difficulty = level;
  saveToStorage();

  dom.diffBtns.forEach(btn => {
    const isActive = btn.dataset.diff === level;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });

  dom.diffIndicator.textContent = DIFFICULTY_LABELS[level];
}

/* ============================================================
   CONFETTI
   ============================================================ */
const CONFETTI_COLORS = [
  '#7c3aed', '#a855f7', '#2563eb', '#06b6d4',
  '#10b981', '#f59e0b', '#ec4899', '#f97316',
];

/**
 * Launches a confetti burst (CSS + JS, no external library).
 */
function launchConfetti() {
  dom.confettiContainer.innerHTML = '';
  const count = 80;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';

    const left     = Math.random() * 100;
    const delay    = Math.random() * 0.8;
    const duration = 2.5 + Math.random() * 2;
    const color    = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    const size     = 6 + Math.random() * 10;
    const rotation = Math.random() * 360;

    piece.style.cssText = `
      left: ${left}vw;
      background: ${color};
      width: ${size}px;
      height: ${size}px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      --fall-delay: ${delay}s;
      --fall-dur: ${duration}s;
      transform: rotate(${rotation}deg);
    `;

    dom.confettiContainer.appendChild(piece);
  }

  // Clean up after longest possible animation
  setTimeout(() => { dom.confettiContainer.innerHTML = ''; }, 5000);
}

/* ============================================================
   EVENT LISTENERS
   ============================================================ */
function attachEventListeners() {
  // Choice buttons
  dom.choiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (!btn.classList.contains('disabled-btn')) {
        playGame(btn.dataset.choice);
      }
    });
  });

  // Action buttons
  dom.btnPlayAgain.addEventListener('click', () => {
    playSound('click');
    goToIdle();
  });

  dom.btnResetScore.addEventListener('click', () => {
    playSound('click');
    if (confirm('Reset all scores? Game history will be kept.')) {
      resetScores();
      goToIdle();
    }
  });

  dom.btnNewGame.addEventListener('click', () => {
    playSound('click');
    if (confirm('Start a new game? This will reset all scores AND history.')) {
      resetGame();
    }
  });

  // Difficulty buttons
  dom.diffBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setDifficulty(btn.dataset.diff);
      playSound('click');
    });
  });

  // Full history toggle
  dom.toggleHistoryBtn.addEventListener('click', () => {
    const isHidden = dom.fullHistoryPanel.classList.toggle('hidden');
    dom.toggleHistoryBtn.setAttribute('aria-expanded', String(!isHidden));
    dom.toggleHistoryBtn.textContent = isHidden ? '📜 View Full History' : '🔼 Hide History';
  });

  dom.closeHistoryBtn.addEventListener('click', () => {
    dom.fullHistoryPanel.classList.add('hidden');
    dom.toggleHistoryBtn.setAttribute('aria-expanded', 'false');
    dom.toggleHistoryBtn.textContent = '📜 View Full History';
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboard);
}

/**
 * Handles keyboard shortcuts.
 */
function handleKeyboard(e) {
  // Ignore if focus is in an input/textarea
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

  const key = e.key.toUpperCase();

  const map = {
    'R': 'rock',
    'P': 'paper',
    'S': 'scissors',
  };

  if (map[key] && !state.isPlaying) {
    const btn = document.querySelector(`.choice-btn[data-choice="${map[key]}"]`);
    if (btn && !btn.classList.contains('disabled-btn')) {
      btn.focus();
      playGame(map[key]);
    }
  }

  // N = New Game (quick restart without confirm, same as Play Again)
  if (key === 'N' && !state.isPlaying) {
    goToIdle();
  }
}

/* ============================================================
   INITIALISE
   ============================================================ */
function init() {
  // Load persisted data
  loadFromStorage();

  // Apply loaded state to UI
  setDifficulty(state.difficulty);
  updateScore();
  updateStatistics();
  updateHistoryList();

  // Start in idle
  setArenaState('idle');

  // Wire events
  attachEventListeners();
}

// Boot
init();
