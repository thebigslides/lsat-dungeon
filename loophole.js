/* =========================================================
   REASONING LEAGUE — MAIN ENGINE
   ========================================================= */


/* =========================================================
   ACCESS GATE
   ========================================================= */

const ACCESS_HASH =
  "fa3ee43681cc1754c37e2bd4fdc3a4067dc7c9c182d9f7a6524e9ff1a94499bd";

const ACCESS_STORAGE_KEY = "reasoningLeagueAccess";

const MAX_ACCESS_ATTEMPTS = 5;
const ACCESS_LOCKOUT_MS = 30000;

let accessAttempts = 0;
let accessLockedUntil = 0;


async function hashText(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hashBuffer))
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");
}


function getAccessGate() {
  return document.getElementById("accessGate");
}


function getAccessInput() {
  return document.getElementById("accessPassword");
}


function getAccessError() {
  return document.getElementById("accessError");
}


function unlockSite() {
  const gate = getAccessGate();

  if (gate) {
    gate.classList.add("hidden");
  }

  document.body.classList.remove("access-locked");

  sessionStorage.setItem(ACCESS_STORAGE_KEY, "granted");
}


function lockSite() {
  const gate = getAccessGate();

  if (gate) {
    gate.classList.remove("hidden");
  }

  document.body.classList.add("access-locked");
}


function updateAccessError(message = "") {
  const error = getAccessError();

  if (error) {
    error.textContent = message;
  }
}


async function attemptAccess() {
  const input = getAccessInput();

  if (!input) return;

  const now = Date.now();

  if (now < accessLockedUntil) {
    const seconds = Math.ceil((accessLockedUntil - now) / 1000);

    updateAccessError(
      `Too many attempts. Try again in ${seconds} second${seconds === 1 ? "" : "s"}.`
    );

    return;
  }

  const enteredPassword = input.value;

  if (!enteredPassword) {
    updateAccessError("Enter the access password.");
    return;
  }

  const enteredHash = await hashText(enteredPassword);

  if (enteredHash === ACCESS_HASH) {
    accessAttempts = 0;
    accessLockedUntil = 0;

    updateAccessError("");
    unlockSite();

    input.value = "";

    return;
  }

  accessAttempts += 1;

  if (accessAttempts >= MAX_ACCESS_ATTEMPTS) {
    accessAttempts = 0;
    accessLockedUntil = Date.now() + ACCESS_LOCKOUT_MS;

    updateAccessError("Too many attempts. Locked for 30 seconds.");

    return;
  }

  const remaining = MAX_ACCESS_ATTEMPTS - accessAttempts;

  updateAccessError(
    `Incorrect password. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`
  );

  input.select();
}


function initializeAccessGate() {
  const gate = getAccessGate();
  const input = getAccessInput();
  const button = document.getElementById("accessSubmit");

  if (!gate) return;

  const alreadyGranted =
    sessionStorage.getItem(ACCESS_STORAGE_KEY) === "granted";

  if (alreadyGranted) {
    unlockSite();
  } else {
    lockSite();

    setTimeout(() => {
      input?.focus();
    }, 100);
  }

  button?.addEventListener("click", attemptAccess);

  input?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      attemptAccess();
    }
  });
}


/* =========================================================
   SAVE SYSTEM
   ========================================================= */

const SAVE_KEY = "loopholeTraining_v2";


const DEFAULT_PLAYER = {
  version: 3,

  xp: 0,

  streak: 0,

  bestStreak: 0,

  totalQuestions: 0,

  totalCorrect: 0,

  lessonsCompleted: 0,

  chapter1: {
    lessons: {
      "1-1": {
        unlocked: true,
        completed: false,
        currentStep: 0,
        bestMastery: 0
      },

      "1-2": {
        unlocked: false,
        completed: false,
        currentStep: 0,
        bestMastery: 0
      },

      "1-3": {
        unlocked: false,
        completed: false,
        currentStep: 0,
        bestMastery: 0
      },

      "1-4": {
        unlocked: false,
        completed: false,
        currentStep: 0,
        bestMastery: 0
      },

      "1-5": {
        unlocked: false,
        completed: false,
        currentStep: 0,
        bestMastery: 0
      }
    },

    test: {
      unlocked: false,
      attempts: 0,
      bestScore: 0,
      passed: false
    }
  },

  conceptMastery: {
    arguments: 0,
    premises: 0,
    conclusions: 0,
    premiseSets: 0,
    inferences: 0
  },

  questionHistory: []
};


function cloneDefaultPlayer() {
  return JSON.parse(JSON.stringify(DEFAULT_PLAYER));
}


function loadPlayer() {
  const freshPlayer = cloneDefaultPlayer();

  try {
    const rawSave = localStorage.getItem(SAVE_KEY);

    if (!rawSave) {
      return freshPlayer;
    }

    const saved = JSON.parse(rawSave);

    const merged = {
      ...freshPlayer,
      ...saved,

      chapter1: {
        ...freshPlayer.chapter1,
        ...(saved.chapter1 || {}),

        lessons: {
          ...freshPlayer.chapter1.lessons,
          ...(saved.chapter1?.lessons || {})
        },

        test: {
          ...freshPlayer.chapter1.test,
          ...(saved.chapter1?.test || {})
        }
      },

      conceptMastery: {
        ...freshPlayer.conceptMastery,
        ...(saved.conceptMastery || {})
      },

      questionHistory: Array.isArray(saved.questionHistory)
        ? saved.questionHistory
        : []
    };

    for (const lessonID of Object.keys(freshPlayer.chapter1.lessons)) {
      merged.chapter1.lessons[lessonID] = {
        ...freshPlayer.chapter1.lessons[lessonID],
        ...(saved.chapter1?.lessons?.[lessonID] || {})
      };
    }

    return merged;

  } catch (error) {
    console.error("Could not load Reasoning League save:", error);

    return freshPlayer;
  }
}


function savePlayer() {
  try {
    localStorage.setItem(
      SAVE_KEY,
      JSON.stringify(player)
    );
  } catch (error) {
    console.error("Could not save Reasoning League progress:", error);
  }
}


let player = loadPlayer();


/* =========================================================
   LESSON DATA

   Lesson content now lives in separate chapter files.

   IMPORTANT:
   js/lessons/chapter1.js must load BEFORE loophole.js.
   ========================================================= */

const lessons = {
  ...(window.chapter1Lessons || {})
};


if (!window.chapter1Lessons) {
  console.warn(
    "Reasoning League: chapter1.js was not loaded before loophole.js."
  );
}


/* =========================================================
   DOM REFERENCES
   ========================================================= */

const dashboardScreen =
  document.getElementById("dashboardScreen");

const lessonScreen =
  document.getElementById("lessonScreen");

const playerXP =
  document.getElementById("playerXP");

const playerStreak =
  document.getElementById("playerStreak");

const playerAccuracy =
  document.getElementById("playerAccuracy");

const playerLessons =
  document.getElementById("playerLessons");

const currentObjective =
  document.getElementById("currentObjective");

const lessonCards =
  document.querySelectorAll(".lesson-card");

const chapterTestCard =
  document.getElementById("chapterTestCard");

const startChapterTest =
  document.getElementById("startChapterTest");

const lessonEyebrow =
  document.getElementById("lessonEyebrow");

const lessonTitle =
  document.getElementById("lessonTitle");

const lessonProgressText =
  document.getElementById("lessonProgressText");

const lessonProgressFill =
  document.getElementById("lessonProgressFill");

const lessonBody =
  document.getElementById("lessonBody");

const lessonBackButton =
  document.getElementById("lessonBackButton");

const lessonNextButton =
  document.getElementById("lessonNextButton");

const basketballCourt =
  document.getElementById("basketballCourt");

const basketballBall =
  document.getElementById("basketballBall");

const basketballFeedback =
  document.getElementById("basketballFeedback");

const basketballFeedbackLabel =
  document.getElementById("basketballFeedbackLabel");

const basketballFeedbackTitle =
  document.getElementById("basketballFeedbackTitle");

const basketballFeedbackText =
  document.getElementById("basketballFeedbackText");

const basketballShootButton =
  document.getElementById("basketballShootButton");

const basketballNextButton =
  document.getElementById("basketballNextButton");

const answerContainer =
  document.getElementById("answerContainer");

const questionPrompt =
  document.getElementById("questionPrompt");

const questionStimulus =
  document.getElementById("questionStimulus");


/* =========================================================
   ACTIVE LESSON STATE
   ========================================================= */

let activeLessonID = null;

let activeLesson = null;

let activeStepIndex = 0;

let activeLessonCorrect = 0;

let activeLessonQuestions = 0;

let selectedAnswerIndex = null;

let questionLocked = false;


/* =========================================================
   GENERAL HELPERS
   ========================================================= */

function clamp(value, min, max) {
  return Math.min(
    Math.max(value, min),
    max
  );
}


function calculateAccuracy() {
  if (player.totalQuestions === 0) {
    return 0;
  }

  return Math.round(
    (player.totalCorrect / player.totalQuestions) * 100
  );
}


function calculateLessonMastery() {
  if (activeLessonQuestions === 0) {
    return 100;
  }

  return Math.round(
    (activeLessonCorrect / activeLessonQuestions) * 100
  );
}


function getLessonProgress(id) {
  return player.chapter1.lessons[id];
}


function getLessonTitle(id) {
  return lessons[id]?.title || id;
}


function getLessonNumber(id) {
  return lessons[id]?.number || id;
}


function getCurrentUnlockedLesson() {
  const order = [
    "1-1",
    "1-2",
    "1-3",
    "1-4",
    "1-5"
  ];

  for (const id of order) {
    const progress = getLessonProgress(id);

    if (
      progress &&
      progress.unlocked &&
      !progress.completed
    ) {
      return id;
    }
  }

  return null;
}


/* =========================================================
   SCREEN CONTROL
   ========================================================= */

function showDashboard() {
  dashboardScreen?.classList.remove("hidden");

  lessonScreen?.classList.add("hidden");

  activeLessonID = null;
  activeLesson = null;

  renderDashboard();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function showLessonScreen() {
  dashboardScreen?.classList.add("hidden");

  lessonScreen?.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================================
   DASHBOARD
   ========================================================= */

function renderDashboard() {
  renderPlayerStats();

  renderLessonCards();

  renderCurrentObjective();

  updateChapterTestUnlock();

  renderChapterTest();
}


function renderPlayerStats() {
  if (playerXP) {
    playerXP.textContent = player.xp;
  }

  if (playerStreak) {
    playerStreak.textContent = player.streak;
  }

  if (playerAccuracy) {
    playerAccuracy.textContent =
      `${calculateAccuracy()}%`;
  }

  if (playerLessons) {
    playerLessons.textContent =
      player.lessonsCompleted;
  }
}


function renderCurrentObjective() {
  if (!currentObjective) return;

  const nextLesson = getCurrentUnlockedLesson();

  if (nextLesson) {
    const title = getLessonTitle(nextLesson);

    currentObjective.innerHTML = `
      <span class="objective-label">
        CURRENT OBJECTIVE
      </span>

      <strong>
        ${getLessonNumber(nextLesson)} —
        ${title}
      </strong>
    `;

    return;
  }

  if (player.chapter1.test.unlocked) {
    currentObjective.innerHTML = `
      <span class="objective-label">
        CURRENT OBJECTIVE
      </span>

      <strong>
        Chapter 1 Championship
      </strong>
    `;

    return;
  }

  currentObjective.innerHTML = `
    <span class="objective-label">
      CURRENT OBJECTIVE
    </span>

    <strong>
      Complete Chapter 1
    </strong>
  `;
}


function renderLessonCards() {
  lessonCards.forEach(card => {
    const id =
      card.dataset.lesson ||
      card.dataset.lessonId ||
      card.getAttribute("data-lesson");

    if (!id) return;

    const progress = getLessonProgress(id);

    if (!progress) return;

    card.classList.remove(
      "locked",
      "available",
      "completed"
    );

    if (progress.completed) {
      card.classList.add("completed");
    } else if (progress.unlocked) {
      card.classList.add("available");
    } else {
      card.classList.add("locked");
    }

    const button =
      card.querySelector("[data-start-lesson]") ||
      card.querySelector("button");

    if (button) {
      button.disabled =
        !progress.unlocked &&
        !progress.completed;

      if (progress.completed) {
        button.textContent = "Review";
      } else if (
        progress.currentStep &&
        progress.currentStep > 0
      ) {
        button.textContent = "Continue";
      } else if (progress.unlocked) {
        button.textContent = "Start";
      } else {
        button.textContent = "Locked";
      }
    }

    const mastery =
      card.querySelector(
        "[data-lesson-mastery]"
      );

    if (mastery) {
      mastery.textContent =
        `${progress.bestMastery || 0}%`;
    }
  });
}


/* =========================================================
   CHAPTER TEST
   ========================================================= */

function updateChapterTestUnlock() {
  const requiredLessons = [
    "1-1",
    "1-2",
    "1-3",
    "1-4",
    "1-5"
  ];

  const allComplete =
    requiredLessons.every(id =>
      player.chapter1.lessons[id]?.completed
    );

  if (allComplete) {
    player.chapter1.test.unlocked = true;

    savePlayer();
  }
}


function renderChapterTest() {
  if (!chapterTestCard) return;

  const test =
    player.chapter1.test;

  chapterTestCard.classList.toggle(
    "locked",
    !test.unlocked
  );

  chapterTestCard.classList.toggle(
    "available",
    test.unlocked && !test.passed
  );

  chapterTestCard.classList.toggle(
    "completed",
    test.passed
  );

  if (startChapterTest) {
    startChapterTest.disabled =
      !test.unlocked;

    if (test.passed) {
      startChapterTest.textContent =
        "Replay Championship";
    } else if (test.unlocked) {
      startChapterTest.textContent =
        "Start Championship";
    } else {
      startChapterTest.textContent =
        "Locked";
    }
  }
}


function startAssessmentPlaceholder() {
  alert(
    "Chapter Championship engine is coming next."
  );
}


/* =========================================================
   LESSON OPENING
   ========================================================= */

function openLesson(id) {
  if (!lessons[id]) {
    alert(
      "This lesson hasn't been built yet."
    );

    return;
  }

  const progress =
    getLessonProgress(id);

  if (
    !progress?.unlocked &&
    !progress?.completed
  ) {
    return;
  }

  activeLessonID = id;
  activeLesson = lessons[id];

  activeLessonCorrect = 0;
  activeLessonQuestions = 0;

  selectedAnswerIndex = null;
  questionLocked = false;

  if (progress.completed) {
    activeStepIndex = 0;
  } else {
    activeStepIndex =
      clamp(
        progress.currentStep || 0,
        0,
        activeLesson.steps.length - 1
      );
  }

  showLessonScreen();

  renderLessonStep();
}


/* =========================================================
   LESSON RENDERING
   ========================================================= */

function renderLessonStep() {
  if (
    !activeLesson ||
    !activeLesson.steps?.length
  ) {
    return;
  }

  const step =
    activeLesson.steps[activeStepIndex];

  if (!step) return;

  renderLessonHeader(step);

  resetQuestionUI();

  switch (step.type) {
    case "learn":
      renderLearnStep(step);
      break;

    case "question":
      renderQuestionStep(step);
      break;

    case "complete":
      renderCompleteStep(step);
      break;

    default:
      console.warn(
        "Unknown lesson step type:",
        step.type
      );
  }

  saveCurrentLessonStep();
}


function renderLessonHeader(step) {
  if (lessonEyebrow) {
    lessonEyebrow.textContent =
      `LESSON ${activeLesson.number}`;
  }

  if (lessonTitle) {
    lessonTitle.textContent =
      activeLesson.title;
  }

  const current =
    activeStepIndex + 1;

  const total =
    activeLesson.steps.length;

  if (lessonProgressText) {
    lessonProgressText.textContent =
      `${current} / ${total}`;
  }

  if (lessonProgressFill) {
    const percentage =
      (current / total) * 100;

    lessonProgressFill.style.width =
      `${percentage}%`;
  }

  if (lessonBackButton) {
    lessonBackButton.disabled =
      activeStepIndex === 0;
  }

  if (lessonNextButton) {
    lessonNextButton.classList.add(
      "hidden"
    );
  }
}


function renderLearnStep(step) {
  if (!lessonBody) return;

  lessonBody.innerHTML = `
    <div class="lesson-content">
      <p class="eyebrow">
        FILM ROOM
      </p>

      <h2>
        ${step.title || ""}
      </h2>

      <div class="lesson-copy">
        ${step.html || ""}
      </div>

      <button
        class="primary-button lesson-continue-button"
        type="button"
      >
        Continue
      </button>
    </div>
  `;

  const button =
    lessonBody.querySelector(
      ".lesson-continue-button"
    );

  button?.addEventListener(
    "click",
    nextLessonStep
  );
}


function renderQuestionStep(step) {
  if (!lessonBody) return;

  selectedAnswerIndex = null;
  questionLocked = false;

  const answers =
    Array.isArray(step.answers)
      ? step.answers
      : [];

  lessonBody.innerHTML = `
    <div class="lesson-content question-step">

      <p class="eyebrow">
        ${
          step.drill
            ? "GAME SITUATION"
            : "KNOWLEDGE CHECK"
        }
      </p>

      <h2>
        ${step.title || ""}
      </h2>

      <div class="question-card">

        <p class="question-prompt">
          ${step.prompt || ""}
        </p>

        ${
          step.stimulus
            ? `
              <div class="stimulus-box">
                ${step.stimulus}
              </div>
            `
            : ""
        }

        <div class="answer-list">

          ${answers
            .map(
              (answer, index) => `
                <button
                  class="answer-choice"
                  type="button"
                  data-answer-index="${index}"
                >
                  <span class="answer-letter">
                    ${String.fromCharCode(65 + index)}
                  </span>

                  <span class="answer-text">
                    ${answer}
                  </span>
                </button>
              `
            )
            .join("")}

        </div>

        <button
          class="primary-button shoot-answer-button"
          type="button"
          disabled
        >
          Shoot
        </button>

        <div
          class="question-feedback hidden"
          aria-live="polite"
        >
          <span class="feedback-label"></span>

          <h3 class="feedback-title"></h3>

          <p class="feedback-text"></p>

          <button
            class="primary-button next-possession-button"
            type="button"
          >
            Next Possession
          </button>
        </div>

      </div>

    </div>
  `;

  const choices =
    lessonBody.querySelectorAll(
      ".answer-choice"
    );

  const shootButton =
    lessonBody.querySelector(
      ".shoot-answer-button"
    );

  choices.forEach(choice => {
    choice.addEventListener(
      "click",
      () => {
        if (questionLocked) return;

        choices.forEach(item =>
          item.classList.remove("selected")
        );

        choice.classList.add("selected");

        selectedAnswerIndex =
          Number(
            choice.dataset.answerIndex
          );

        shootButton.disabled = false;
      }
    );
  });

  shootButton?.addEventListener(
    "click",
    () => submitQuestion(step)
  );
}


function renderCompleteStep(step) {
  completeLesson();

  if (!lessonBody) return;

  lessonBody.innerHTML = `
    <div class="lesson-content">
      ${step.html || ""}

      <button
        class="primary-button return-dashboard-button"
        type="button"
      >
        Return to Chapter
      </button>
    </div>
  `;

  const button =
    lessonBody.querySelector(
      ".return-dashboard-button"
    );

  button?.addEventListener(
    "click",
    showDashboard
  );
}


/* =========================================================
   QUESTION SUBMISSION
   ========================================================= */

function submitQuestion(step) {
  if (
    questionLocked ||
    selectedAnswerIndex === null
  ) {
    return;
  }

  questionLocked = true;

  activeLessonQuestions += 1;

  player.totalQuestions += 1;

  const correct =
    selectedAnswerIndex === step.correct;

  if (correct) {
    activeLessonCorrect += 1;

    player.totalCorrect += 1;

    player.streak += 1;

    player.bestStreak =
      Math.max(
        player.bestStreak,
        player.streak
      );
  } else {
    player.streak = 0;
  }

  player.questionHistory.push({
    lesson: activeLessonID,
    step: activeStepIndex,
    selected: selectedAnswerIndex,
    correctAnswer: step.correct,
    correct,
    timestamp: Date.now()
  });

  if (
    player.questionHistory.length > 200
  ) {
    player.questionHistory =
      player.questionHistory.slice(-200);
  }

  savePlayer();

  disableQuestionChoices();

  playBasketballResult(
    correct,
    () => showQuestionFeedback(
      step,
      correct
    )
  );
}


function disableQuestionChoices() {
  if (!lessonBody) return;

  lessonBody
    .querySelectorAll(".answer-choice")
    .forEach(choice => {
      choice.disabled = true;
    });

  const shootButton =
    lessonBody.querySelector(
      ".shoot-answer-button"
    );

  if (shootButton) {
    shootButton.disabled = true;
  }
}


function showQuestionFeedback(
  step,
  correct
) {
  if (!lessonBody) return;

  const feedbackBox =
    lessonBody.querySelector(
      ".question-feedback"
    );

  if (!feedbackBox) {
    nextLessonStep();
    return;
  }

  const feedback =
    correct
      ? step.feedbackCorrect
      : step.feedbackWrong;

  const label =
    feedbackBox.querySelector(
      ".feedback-label"
    );

  const title =
    feedbackBox.querySelector(
      ".feedback-title"
    );

  const text =
    feedbackBox.querySelector(
      ".feedback-text"
    );

  if (label) {
    label.textContent =
      feedback?.label ||
      (correct ? "BUCKET" : "MISSED");
  }

  if (title) {
    title.textContent =
      feedback?.title ||
      (correct ? "Correct." : "Not quite.");
  }

  if (text) {
    text.textContent =
      feedback?.text || "";
  }

  feedbackBox.classList.remove(
    "hidden"
  );

  const nextButton =
    feedbackBox.querySelector(
      ".next-possession-button"
    );

  nextButton?.addEventListener(
    "click",
    nextLessonStep,
    {
      once: true
    }
  );

  renderPlayerStats();
}


/* =========================================================
   BASKETBALL ANIMATION
   ========================================================= */

function playBasketballResult(
  correct,
  callback
) {
  const court =
    basketballCourt ||
    document.querySelector(
      ".basketball-court"
    );

  const ball =
    basketballBall ||
    document.querySelector(
      ".basketball-ball"
    );

  if (!court || !ball) {
    setTimeout(callback, 200);
    return;
  }

  court.classList.remove(
    "shot-made",
    "shot-brick",
    "shot-blocked",
    "shot-airball"
  );

  ball.classList.remove(
    "shooting"
  );

  void court.offsetWidth;

  let resultClass;

  if (correct) {
    resultClass = "shot-made";
  } else {
    const misses = [
      "shot-brick",
      "shot-blocked",
      "shot-airball"
    ];

    resultClass =
      misses[
        Math.floor(
          Math.random() *
          misses.length
        )
      ];
  }

  court.classList.add(
    resultClass
  );

  ball.classList.add(
    "shooting"
  );

  setTimeout(() => {
    ball.classList.remove(
      "shooting"
    );

    callback();
  }, 850);
}


/* =========================================================
   LESSON NAVIGATION
   ========================================================= */

function nextLessonStep() {
  if (!activeLesson) return;

  if (
    activeStepIndex >=
    activeLesson.steps.length - 1
  ) {
    return;
  }

  activeStepIndex += 1;

  selectedAnswerIndex = null;
  questionLocked = false;

  saveCurrentLessonStep();

  renderLessonStep();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function previousLessonStep() {
  if (
    !activeLesson ||
    activeStepIndex <= 0
  ) {
    return;
  }

  activeStepIndex -= 1;

  selectedAnswerIndex = null;
  questionLocked = false;

  saveCurrentLessonStep();

  renderLessonStep();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function saveCurrentLessonStep() {
  if (!activeLessonID) return;

  const progress =
    getLessonProgress(activeLessonID);

  if (!progress) return;

  if (!progress.completed) {
    progress.currentStep =
      activeStepIndex;
  }

  savePlayer();
}


/* =========================================================
   LESSON COMPLETION
   ========================================================= */

function completeLesson() {
  if (
    !activeLesson ||
    !activeLessonID
  ) {
    return;
  }

  const progress =
    getLessonProgress(activeLessonID);

  if (!progress) return;

  const mastery =
    calculateLessonMastery();

  progress.bestMastery =
    Math.max(
      progress.bestMastery || 0,
      mastery
    );

  player.conceptMastery[
    activeLesson.concept
  ] = Math.max(
    player.conceptMastery[
      activeLesson.concept
    ] || 0,
    mastery
  );

  if (!progress.completed) {
    progress.completed = true;

    progress.currentStep =
      activeLesson.steps.length - 1;

    player.lessonsCompleted += 1;

    player.xp +=
      activeLesson.xpReward || 0;

    unlockNextLesson(
      activeLessonID
    );
  }

  updateChapterTestUnlock();

  savePlayer();

  renderPlayerStats();
}


function unlockNextLesson(
  completedLessonID
) {
  const order = [
    "1-1",
    "1-2",
    "1-3",
    "1-4",
    "1-5"
  ];

  const index =
    order.indexOf(
      completedLessonID
    );

  if (
    index === -1 ||
    index >= order.length - 1
  ) {
    return;
  }

  const nextID =
    order[index + 1];

  if (
    player.chapter1.lessons[nextID]
  ) {
    player.chapter1.lessons[
      nextID
    ].unlocked = true;
  }
}


/* =========================================================
   QUESTION UI RESET
   ========================================================= */

function resetQuestionUI() {
  selectedAnswerIndex = null;
  questionLocked = false;

  basketballCourt?.classList.remove(
    "shot-made",
    "shot-brick",
    "shot-blocked",
    "shot-airball"
  );

  basketballBall?.classList.remove(
    "shooting"
  );

  basketballFeedback?.classList.add(
    "hidden"
  );
}


/* =========================================================
   CONTINUE TRAINING
   ========================================================= */

function continueTraining() {
  const lesson =
    getCurrentUnlockedLesson();

  if (lesson) {
    openLesson(lesson);
    return;
  }

  if (player.chapter1.test.unlocked) {
    startAssessmentPlaceholder();
    return;
  }

  openLesson("1-1");
}


/* =========================================================
   EVENT DELEGATION
   ========================================================= */

document.addEventListener(
  "click",
  event => {

    const lessonButton =
      event.target.closest(
        "[data-start-lesson]"
      );

    if (lessonButton) {
      const id =
        lessonButton.dataset.startLesson ||
        lessonButton.dataset.lesson ||
        lessonButton
          .closest("[data-lesson]")
          ?.dataset.lesson;

      if (id) {
        openLesson(id);
      }

      return;
    }


    const continueButton =
      event.target.closest(
        "[data-continue-training]"
      );

    if (continueButton) {
      continueTraining();
      return;
    }


    const dashboardButton =
      event.target.closest(
        "[data-return-dashboard]"
      );

    if (dashboardButton) {
      showDashboard();
      return;
    }

  }
);


/* =========================================================
   DIRECT BUTTON EVENTS
   ========================================================= */

lessonBackButton?.addEventListener(
  "click",
  previousLessonStep
);


lessonNextButton?.addEventListener(
  "click",
  nextLessonStep
);


startChapterTest?.addEventListener(
  "click",
  () => {
    if (
      player.chapter1.test.unlocked
    ) {
      startAssessmentPlaceholder();
    }
  }
);


/* =========================================================
   DEVELOPMENT RESET
   ========================================================= */

window.resetReasoningLeagueProgress =
  function () {

    const confirmed =
      confirm(
        "Reset all Reasoning League progress?"
      );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem(
      SAVE_KEY
    );

    location.reload();
  };


/* =========================================================
   DEBUG HELPERS
   ========================================================= */

window.reasoningLeague =
  window.reasoningLeague || {};


window.reasoningLeague.getPlayer =
  function () {
    return player;
  };


window.reasoningLeague.getLessons =
  function () {
    return lessons;
  };


window.reasoningLeague.openLesson =
  function (id) {
    openLesson(id);
  };


window.reasoningLeague.save =
  function () {
    savePlayer();
  };


/* =========================================================
   INITIALIZATION
   ========================================================= */

function initializeReasoningLeague() {
  initializeAccessGate();

  updateChapterTestUnlock();

  renderDashboard();

  console.log(
    `Reasoning League loaded ${Object.keys(lessons).length} lesson(s).`
  );

  if (
    Object.keys(lessons).length === 0
  ) {
    console.error(
      "NO LESSON DATA FOUND. Make sure chapter1.js is loaded before loophole.js in index.html."
    );
  }
}


if (
  document.readyState === "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initializeReasoningLeague
  );
} else {
  initializeReasoningLeague();
}
