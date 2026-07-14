# 🎮 Rock Paper Scissors Arena

> A modern, feature-rich Rock Paper Scissors game built with pure HTML5, CSS3, and Vanilla JavaScript. No frameworks. No libraries. Just clean, production-quality code.

---

## 📌 Project Overview

**Rock Paper Scissors Arena** is a fully-featured browser-based game with a stunning glassmorphism dark UI, advanced difficulty levels, real-time statistics, game history, confetti celebrations, keyboard shortcuts, and persistent score tracking via LocalStorage.

Designed to impress — built for simplicity. Just open `index.html` and play.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🎮 **Core Gameplay** | Rock / Paper / Scissors vs Computer |
| 🤖 **Difficulty Levels** | Easy, Medium, Hard (AI scales in aggressiveness) |
| 📊 **Scoreboard** | Live Player, Computer & Draw scores |
| 📈 **Advanced Statistics** | Win %, Loss %, Draw %, Animated progress bars |
| 🔥 **Streaks** | Current winning streak + Best streak ever |
| 🕹️ **Game History** | Last 5 results panel + Full scrollable history |
| 🎊 **Confetti Celebration** | Pure CSS + JS confetti burst on every win |
| ⌨️ **Keyboard Shortcuts** | `R` Rock · `P` Paper · `S` Scissors · `N` New Game |
| 💾 **LocalStorage** | Scores & history survive browser refreshes |
| 🔊 **Sound Effects** | Click, Win, Lose, Draw — graceful fallback if missing |
| ⏱️ **Thinking Delay** | 1-second animated spinner before computer reveals |
| 💬 **Motivational Messages** | Random encouraging messages after every round |
| 📱 **Fully Responsive** | Works on Desktop, Laptop, Tablet, and Mobile |
| 🌙 **Dark Theme** | Blue/purple gradient glassmorphism design |

---

## 🧰 Technology Stack

- **HTML5** — Semantic markup, ARIA accessibility
- **CSS3** — Custom properties, Flexbox, Grid, Animations, Media Queries, Glassmorphism
- **Vanilla JavaScript** — Modular, event-driven, no dependencies

---

## 📁 Folder Structure

```
RockPaperScissors/
│
├── index.html          ← Main game page
├── style.css           ← All styles, animations, responsive design
├── script.js           ← Game logic, AI, stats, history, events
├── README.md           ← You're reading it!
│
└── assets/
    ├── rock.png        ← (Optional) Rock image
    ├── paper.png       ← (Optional) Paper image
    ├── scissors.png    ← (Optional) Scissors image
    ├── click.mp3       ← (Optional) Button click sound
    ├── win.mp3         ← (Optional) Win sound
    ├── lose.mp3        ← (Optional) Lose sound
    └── draw.mp3        ← (Optional) Draw sound
```

> **Note:** All asset files are optional. The game uses emojis as fallback icons and silently disables sounds if audio files are missing.

---

## 🚀 How to Run

1. **Download or clone** this repository.
2. **Open** `index.html` in any modern web browser.
3. **No installation, build step, or server required.**

```bash
# Option A: Simply double-click index.html
# Option B: Or serve locally
npx serve .
# OR
python -m http.server 8080
```

---

## 🎮 Game Rules

| Match | Winner |
|---|---|
| 🪨 Rock vs ✂️ Scissors | Rock wins |
| ✂️ Scissors vs 📄 Paper | Scissors wins |
| 📄 Paper vs 🪨 Rock | Paper wins |
| Any vs Same | Draw |

---

## 🤖 Difficulty Levels

### 🟢 Easy
Computer picks completely at random every round.

### 🟡 Medium
Computer is random 80% of the time. 20% of the time it counters your previous move.

### 🔴 Hard
Computer counters your previous move 70% of the time. Adapts to your patterns. Challenging!

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `R` | Play Rock |
| `P` | Play Paper |
| `S` | Play Scissors |
| `N` | Return to idle / Play Again |

---

## 📸 Screenshots

> *(Add screenshots of your app here)*

```
[ Gameplay Screenshot 1 ]
[ Statistics Panel Screenshot ]
[ Mobile View Screenshot ]
```

---

## 🔮 Future Improvements

- [ ] Best-of-N tournament mode (Best of 3, Best of 5)
- [ ] Player vs Player (local hot-seat mode)
- [ ] Online multiplayer using WebSockets
- [ ] Custom avatar / player name
- [ ] Animated sprite characters instead of emojis
- [ ] Theme switcher (Light / Dark / Neon)
- [ ] Export game history as CSV
- [ ] Achievements / badges system
- [ ] Global leaderboard (with backend)
- [ ] Sound toggle button in UI
- [ ] PWA support (offline playable as installed app)

---

## 👨‍💻 Author

**Rock Paper Scissors Arena**  
Built with ❤️ using pure HTML5, CSS3 & Vanilla JavaScript  
© 2025 — All Rights Reserved

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> *"The best way to learn web development is to build real things."*
