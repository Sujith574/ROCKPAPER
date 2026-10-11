# SUMMER TRAINING & INTERNSHIP PROJECT REPORT

---

## 📝 INSTRUCTIONS FOR THE USER
To use this report in MS Word (as per your guidelines):
1. **Copy the content** of this report and paste it into MS Word.
2. **Page Margins**: Go to Page Layout > Margins > Custom Margins, and set:
   - **Top**: 1 inch (2.54 cm)
   - **Bottom**: 1 inch (2.54 cm)
   - **Left**: 1.5 inches (3.81 cm)
   - **Right**: 1 inch (2.54 cm)
3. **Typography**: Select all text and set Font to **Times New Roman**, size **12 pt**, and line spacing to **1.5**.
4. **Paper Size**: Ensure paper size is set to **A4**.
5. **Alignment**: Keep the Cover Page centered. Keep the rest of the text left-aligned or justified.

---

<!-- PAGE BREAK -->
<div align="center">

# A SUMMER TRAINING PROJECT REPORT
### ON
# 🎮 ROCK PAPER SCISSORS ARENA

<br><br>

### Submitted in partial fulfillment of the requirements for the award of the degree of
## BACHELOR OF TECHNOLOGY
### In
## COMPUTER SCIENCE & ENGINEERING

<br><br>

### Under the Supervision of:
**[Supervisor Name / Mentor Name]**  
[Supervisor's Designation]  

<br>

### Submitted By:
**[Your Full Name]**  
Roll No: **[Your University Roll Number]**  
Branch: Computer Science & Engineering  

<br><br><br>

### DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
### [YOUR UNIVERSITY/INSTITUTE NAME]
### [YEAR - 2026]

</div>

<!-- PAGE BREAK -->
---

## DECLARATION

I hereby declare that the Summer Training / Internship Report entitled **"Rock Paper Scissors Arena"** is an authentic record of my own work carried out at **[Organization Name / Self-Directed]** under the guidance of **[Mentor/Supervisor Name]** during the period from **[Start Date]** to **[End Date]**.

This report has not been submitted elsewhere for the award of any other degree, diploma, or certificate.

<br><br>

**Signature of the Candidate:** _______________________  
**Name of the Candidate:** [Your Full Name]  
**Roll Number:** [Your University Roll Number]  
**Date:** July 23, 2026  

---

<!-- PAGE BREAK -->
## CERTIFICATE

This is to certify that the report entitled **"Rock Paper Scissors Arena"** submitted by **[Your Full Name]** (Roll No: **[Your University Roll Number]**) in partial fulfillment of the requirements for the award of the degree of Bachelor of Technology in Computer Science & Engineering is a record of training carried out by him/her under my supervision.

To the best of my knowledge, the matter embodied in this project report has not been submitted to any other University or Institute for the award of any degree or diploma.

<br><br><br>

_______________________  
**[Supervisor/Mentor Signature]**  
[Supervisor Name]  
[Designation]  
[Department/Organization]  

---

<!-- PAGE BREAK -->
## ACKNOWLEDGEMENT

I would like to express my deep sense of gratitude to my project supervisor, **[Supervisor/Mentor Name]**, for their invaluable guidance, constant encouragement, and constructive feedback throughout the course of this project.

I am also highly indebted to **[Organization Name / University Name]** for providing the facilities and resources required to carry out this summer training and complete the project successfully.

Lastly, I extend my heartfelt thanks to my parents, family, and peers for their continuous moral support and help during the completion of this internship and project.

<br><br>

**[Your Full Name]**  
Roll No: [Your University Roll Number]  
Department of Computer Science & Engineering  

---

<!-- PAGE BREAK -->
## TABLE OF CONTENTS

- **Cover Page**
- **Declaration**
- **Certificate**
- **Acknowledgement**
- **Table of Contents**
- **1. Introduction of Organization** .......................................................................... Page X
- **2. Summer Training Course/Internship Content Detail** ............................ Page X
- **3. Summer Training / Internship Project Detail** ............................................. Page X
  - 3.1 Problem Statement
  - 3.2 Project Outcomes
  - 3.3 Technologies Used
- **4. Source Code or System Snapshots** ............................................................. Page X
  - 4.1 Key Code Files
  - 4.2 Application Snapshots
- **12. Bibliography** .................................................................................................. Page X

---

<!-- PAGE BREAK -->
## 1. INTRODUCTION OF ORGANIZATION

During this summer training, the practical development was aligned with industry standards for web application design. The organization **[Insert Organization Name / e.g., Self-Directed Lab / Tech Corp]** focuses on producing scalable, accessible, and user-centric software solutions using modern front-end design patterns.

The training emphasized the lifecycle of client-side web development:
- Architectural planning using semantic HTML5 and standards-compliant CSS3.
- Implementing client-side logic using Vanilla ECMAScript (JavaScript) to avoid heavy library overhead.
- Deploying optimized, single-page client applications to web-hosting environments such as Vercel.

The development of **Rock Paper Scissors Arena** showcases the concepts learned during this training, emphasizing modular scripting, data persistence, event handling, and modern UI/UX styles like glassmorphism.

---

<!-- PAGE BREAK -->
## 2. SUMMER TRAINING COURSE/INTERNSHIP CONTENT DETAIL

The summer internship syllabus covered comprehensive modules in web design and scripting:

1. **Semantic HTML5 Markup**: Designing highly accessible web structures, applying ARIA attributes, and creating clean layouts suitable for screen readers and search engines.
2. **Advanced CSS3 Styling & Layouts**:
   - Custom CSS Variables (Custom Properties) for systematic theme definition.
   - Layout systems using CSS Flexbox and Grid.
   - Creating glassmorphism interfaces (using properties like `backdrop-filter`).
   - CSS Keyframe Animations for transitions, interactive hover effects, and loading states.
3. **Vanilla JavaScript (ES6+)**:
   - DOM Selection and Manipulation.
   - Event-driven programming model (keyboard shortcuts, click handlers).
   - LocalStorage API for offline client-side state persistence.
   - Simulation logic, handling timing delays via asynchronous intervals, and implementing basic algorithmic decision-making (game AI modes).
4. **Code Quality and Deployment**: Learning standard folder structures, implementing graceful fallbacks for assets, and staging web projects via hosting engines.

---

<!-- PAGE BREAK -->
## 3. SUMMER TRAINING / INTERNSHIP PROJECT DETAIL

### 3.1 Problem Statement
Traditional browser mini-games are often simplistic, lack engagement, and suffer from poor aesthetics, lack of state retention, and static computer opponents. The goal of this project was to design and build **Rock Paper Scissors Arena**, a highly-polished, feature-rich web game that addresses these issues through:
- An elegant glassmorphism dark UI that provides an immersive user experience.
- Adaptive gameplay through variable difficulty modes (Easy, Medium, Hard AI configurations).
- Client-side persistence so a player's score, winning streaks, and game history survive page refreshes.
- Accessibility features, including complete keyboard controls.

### 3.2 Project Outcomes
The application successfully delivered:
- **Responsive Adaptive Interface**: Optimally rendered across mobile, tablet, and desktop screens.
- **Persistent Stats Dashboard**: Live calculations of win/loss/draw percentages with progress indicator bars.
- **State Preservation**: Scores and high streaks are saved via the browser's LocalStorage API.
- **AI Decision Trees**:
  - *Easy*: 100% random computer choices.
  - *Medium*: 20% adaptive countering based on player history, 80% random.
  - *Hard*: 70% predictive countering based on player's previous actions.
- **Dynamic Animations**: Hand shake pre-delay, spinner transitions, and a CSS confetti celebration on wins.

### 3.3 Technologies Used
- **Structure**: HTML5 (HyperText Markup Language)
- **Styling**: CSS3 (Cascading Style Sheets) with Custom Variables, Backdrop Filters, Flexbox, and Custom Keyframes.
- **Logic**: Vanilla JavaScript (ECMAScript 6)
- **State Storage**: Web Storage API (LocalStorage)

---

<!-- PAGE BREAK -->
## 4. SOURCE CODE OR SYSTEM SNAPSHOTS

### 4.1 Key HTML Structure (`index.html`)
The HTML file structures the game into a persistent sidebar/dashboard for stats, a central battle arena, and a bottom control bar.

```html
<!-- Example structural layout from index.html -->
<main class="game-container">
  <header>
    <h1>Rock Paper Scissors Arena</h1>
    <p>Select your weapon and defeat the AI</p>
  </header>
  <!-- Interactive Arena -->
  <div class="arena-card">
    <!-- State indicators: Idle, Battle, Confetti -->
  </div>
</main>
```

### 4.2 Core Game Logic Snippet (`script.js`)
This JavaScript function demonstrates how the AI makes a choice based on the selected difficulty level:

```javascript
function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  
  if (state.difficulty === 'easy') {
    // 100% Random Choice
    return choices[Math.floor(Math.random() * choices.length)];
  } else if (state.difficulty === 'medium') {
    // 80% Random, 20% countering player's last choice
    const isStrategic = Math.random() < 0.20;
    if (isStrategic && state.lastPlayerChoice) {
      return getCounterChoice(state.lastPlayerChoice);
    }
    return choices[Math.floor(Math.random() * choices.length)];
  } else {
    // Hard: 70% countering player's last choice (Predictive adaptive)
    const isStrategic = Math.random() < 0.70;
    if (isStrategic && state.lastPlayerChoice) {
      return getCounterChoice(state.lastPlayerChoice);
    }
    return choices[Math.floor(Math.random() * choices.length)];
  }
}

// Function to find the winning counter choice
function getCounterChoice(playerChoice) {
  if (playerChoice === 'rock') return 'paper';
  if (playerChoice === 'paper') return 'scissors';
  return 'rock';
}
```

---

<!-- PAGE BREAK -->
## 12. BIBLIOGRAPHY

1. **MDN Web Docs (Mozilla Developer Network)**
   - *HTML Semantic Elements*: https://developer.mozilla.org/en-US/docs/Glossary/Semantics
   - *Web Storage API (LocalStorage)*: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
2. **W3C Accessibility Guidelines (WCAG 2.1)**
   - *Keyboard navigation and focus indicator states*: https://www.w3.org/WAI/standards-guidelines/wcag/
3. **CSS-Tricks**
   - *A Complete Guide to Flexbox & CSS Grid*: https://css-tricks.com
4. **ECMAScript Language Specification**
   - *Standard specifications for JS event structures*: https://tc39.es/ecma262/
