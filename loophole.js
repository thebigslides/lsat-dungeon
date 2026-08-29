// ============================================================
// REASONING LEAGUE — PRIVATE ACCESS GATE
// ============================================================

// IMPORTANT:
// Replace this placeholder with the 64-character SHA-256 hash
// of your chosen password. Do NOT store the actual password here.
const ACCESS_HASH = "fa3ee43681cc1754c37e2bd4fdc3a4067dc7c9c182d9f7a6524e9ff1a94499bd";

const ACCESS_STORAGE_KEY = "reasoningLeagueAccess";

// Basic client-side throttling.
// This discourages casual password guessing, but it is not
// a substitute for real server-side authentication.
const ACCESS_MAX_ATTEMPTS = 5;
const ACCESS_LOCKOUT_MS = 30_000;

const ACCESS_ATTEMPTS_KEY = "reasoningLeagueFailedAttempts";
const ACCESS_LOCKOUT_KEY = "reasoningLeagueLockedUntil";


// ------------------------------------------------------------
// ACCESS GATE ELEMENTS
// ------------------------------------------------------------

const accessGate = document.getElementById("accessGate");
const accessForm = document.getElementById("accessForm");
const accessCodeInput = document.getElementById("accessCode");
const accessError = document.getElementById("accessError");
const accessGateCard = document.querySelector(".access-gate-card");


// ------------------------------------------------------------
// SHA-256
// ------------------------------------------------------------

async function sha256(text) {

  const data =
    new TextEncoder().encode(text);

  const hashBuffer =
    await crypto.subtle.digest(
      "SHA-256",
      data
    );

  return Array.from(
    new Uint8Array(hashBuffer)
  )
    .map(byte =>
      byte
        .toString(16)
        .padStart(2, "0")
    )
    .join("");
}


// ------------------------------------------------------------
// ACCESS HELPERS
// ------------------------------------------------------------

function getFailedAttempts() {

  return Number(
    sessionStorage.getItem(
      ACCESS_ATTEMPTS_KEY
    ) || 0
  );
}


function setFailedAttempts(count) {

  sessionStorage.setItem(
    ACCESS_ATTEMPTS_KEY,
    String(count)
  );
}


function getLockedUntil() {

  return Number(
    sessionStorage.getItem(
      ACCESS_LOCKOUT_KEY
    ) || 0
  );
}


function clearAccessFailures() {

  sessionStorage.removeItem(
    ACCESS_ATTEMPTS_KEY
  );

  sessionStorage.removeItem(
    ACCESS_LOCKOUT_KEY
  );
}


function showAccessError(message) {

  if (!accessError) {
    return;
  }

  accessError.textContent =
    message;

  accessError.classList.remove(
    "hidden"
  );
}


function shakeAccessGate() {

  if (!accessGateCard) {
    return;
  }

  accessGateCard.classList.remove(
    "access-denied"
  );

  void accessGateCard.offsetWidth;

  accessGateCard.classList.add(
    "access-denied"
  );

  setTimeout(() => {

    accessGateCard.classList.remove(
      "access-denied"
    );

  }, 300);
}


function unlockAccessGate() {

  sessionStorage.setItem(
    ACCESS_STORAGE_KEY,
    "granted"
  );

  clearAccessFailures();

  if (accessError) {
    accessError.classList.add(
      "hidden"
    );
  }

  if (!accessGate) {
    return;
  }

  accessGate.classList.add(
    "access-granted"
  );

  setTimeout(() => {

    accessGate.classList.add(
      "hidden"
    );

  }, 300);
}


// ------------------------------------------------------------
// ALREADY UNLOCKED?
// ------------------------------------------------------------

const alreadyUnlocked =
  sessionStorage.getItem(
    ACCESS_STORAGE_KEY
  ) === "granted";

if (alreadyUnlocked && accessGate) {

  accessGate.classList.add(
    "hidden"
  );
}


// ------------------------------------------------------------
// HANDLE PASSWORD SUBMISSION
// ------------------------------------------------------------

if (accessForm) {

  accessForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      // If the hash has not been configured yet,
      // fail closed instead of accidentally allowing access.
      if (
        ACCESS_HASH ===
        "PASTE-YOUR-64-CHARACTER-SHA256-HASH-HERE"
      ) {

        showAccessError(
          "ACCESS HASH NOT CONFIGURED"
        );

        shakeAccessGate();

        return;
      }


      const now =
        Date.now();

      const lockedUntil =
        getLockedUntil();


      // Still in a temporary lockout.
      if (lockedUntil > now) {

        const secondsRemaining =
          Math.ceil(
            (lockedUntil - now) / 1000
          );

        showAccessError(
          `TOO MANY ATTEMPTS — TRY AGAIN IN ${secondsRemaining}s`
        );

        shakeAccessGate();

        return;
      }


      // Expired lockout: reset the counter.
      if (lockedUntil !== 0) {

        clearAccessFailures();
      }


      const enteredCode =
        accessCodeInput.value.trim();

      const enteredHash =
        await sha256(
          enteredCode
        );


      // CORRECT PASSWORD
      if (enteredHash === ACCESS_HASH) {

        accessCodeInput.value =
          "";

        unlockAccessGate();

        return;
      }


      // WRONG PASSWORD
      const failedAttempts =
        getFailedAttempts() + 1;

      setFailedAttempts(
        failedAttempts
      );

      accessCodeInput.value =
        "";

      accessCodeInput.focus();

      shakeAccessGate();


      // Temporary lockout after repeated failures.
      if (
        failedAttempts >=
        ACCESS_MAX_ATTEMPTS
      ) {

        const newLockedUntil =
          Date.now() +
          ACCESS_LOCKOUT_MS;

        sessionStorage.setItem(
          ACCESS_LOCKOUT_KEY,
          String(newLockedUntil)
        );

        showAccessError(
          "TOO MANY ATTEMPTS — LOCKED FOR 30 SECONDS"
        );

        return;
      }


      const attemptsRemaining =
        ACCESS_MAX_ATTEMPTS -
        failedAttempts;

      showAccessError(
        `ACCESS DENIED — ${attemptsRemaining} ATTEMPT${attemptsRemaining === 1 ? "" : "S"} REMAINING`
      );

    }
  );
}


/* =========================================================
   REASONING LEAGUE
   VERSION 3

   Learn → Check → Shoot → Feedback → Master

   Includes:
   - Local save system
   - XP / levels
   - Streaks
   - Lesson progression
   - Concept mastery
   - Question history
   - Basketball possessions
   - Made shots
   - Bricks
   - Blocks
   - Airballs
   ========================================================= */


/* =========================================================
   SAVE SYSTEM
   ========================================================= */

const SAVE_KEY = "loopholeTraining_v2";


const DEFAULT_PLAYER = {
  version: 3,

  xp: 0,
  level: 1,

  streak: 0,
  bestStreak: 0,

  totalAnswered: 0,
  totalCorrect: 0,

  currentChapter: 1,

  progress: {
    chapter1: {
      lessons: {
        "1-1": {
          unlocked: true,
          completed: false,
          mastery: 0,
          attempts: 0
        },

        "1-2": {
          unlocked: false,
          completed: false,
          mastery: 0,
          attempts: 0
        },

        "1-3": {
          unlocked: false,
          completed: false,
          mastery: 0,
          attempts: 0
        },

        "1-4": {
          unlocked: false,
          completed: false,
          mastery: 0,
          attempts: 0
        },

        "1-5": {
          unlocked: false,
          completed: false,
          mastery: 0,
          attempts: 0
        }
      },

      test: {
        unlocked: false,
        attempts: 0,
        bestScore: 0,
        passed: false
      }
    }
  },

  conceptMastery: {
    arguments: 0,
    premises: 0,
    conclusions: 0,
    premiseSets: 0,
    inferences: 0
  },

  questionHistory: {}
};


/* =========================================================
   SAVE HELPERS
   ========================================================= */

function cloneDefaultPlayer() {
  return JSON.parse(
    JSON.stringify(DEFAULT_PLAYER)
  );
}


function loadPlayer() {

  const saved =
    localStorage.getItem(SAVE_KEY);


  if (!saved) {
    return cloneDefaultPlayer();
  }


  try {

    const parsed =
      JSON.parse(saved);

    const fresh =
      cloneDefaultPlayer();


    return {
      ...fresh,
      ...parsed,

      version: 3,

      progress: {
        ...fresh.progress,
        ...(parsed.progress || {}),

        chapter1: {
          ...fresh.progress.chapter1,
          ...(parsed.progress?.chapter1 || {}),

          lessons: {
            ...fresh.progress.chapter1.lessons,
            ...(parsed.progress?.chapter1?.lessons || {})
          },

          test: {
            ...fresh.progress.chapter1.test,
            ...(parsed.progress?.chapter1?.test || {})
          }
        }
      },

      conceptMastery: {
        ...fresh.conceptMastery,
        ...(parsed.conceptMastery || {})
      },

      questionHistory: {
        ...(parsed.questionHistory || {})
      }
    };

  } catch (error) {

    console.error(
      "Could not load save:",
      error
    );

    return cloneDefaultPlayer();
  }
}


function savePlayer() {

  localStorage.setItem(
    SAVE_KEY,
    JSON.stringify(player)
  );
}


let player =
  loadPlayer();


/* =========================================================
   LESSON DATA

   Lesson content lives in separate chapter files.
   chapter1.js must load BEFORE loophole.js.
   ========================================================= */

const lessons = {
  ...(window.chapter1Lessons || {})
};


/* =========================================================
   DOM REFERENCES — PLAYER
   ========================================================= */

const playerLevel =
  document.querySelector("#playerLevel");

const playerXP =
  document.querySelector("#playerXP");

const playerStreak =
  document.querySelector("#playerStreak");

const totalAnswered =
  document.querySelector("#totalAnswered");

const overallAccuracy =
  document.querySelector("#overallAccuracy");

const bestStreak =
  document.querySelector("#bestStreak");


/* =========================================================
   DOM REFERENCES — DASHBOARD
   ========================================================= */

const courseProgressPercent =
  document.querySelector("#courseProgressPercent");

const courseProgressBar =
  document.querySelector("#courseProgressBar");

const chapterMastery =
  document.querySelector("#chapterMastery");

const chapterMasteryBar =
  document.querySelector("#chapterMasteryBar");

const lessonProgress =
  document.querySelector("#lessonProgress");

const currentObjective =
  document.querySelector("#currentObjective");

const continueTraining =
  document.querySelector("#continueTraining");


/* =========================================================
   DOM REFERENCES — MASTERY
   ========================================================= */

const argumentsMastery =
  document.querySelector("#argumentsMastery");

const argumentsMasteryBar =
  document.querySelector("#argumentsMasteryBar");

const premisesMastery =
  document.querySelector("#premisesMastery");

const premisesMasteryBar =
  document.querySelector("#premisesMasteryBar");

const conclusionsMastery =
  document.querySelector("#conclusionsMastery");

const conclusionsMasteryBar =
  document.querySelector("#conclusionsMasteryBar");

const premiseSetsMastery =
  document.querySelector("#premiseSetsMastery");

const premiseSetsMasteryBar =
  document.querySelector("#premiseSetsMasteryBar");

const inferencesMastery =
  document.querySelector("#inferencesMastery");

const inferencesMasteryBar =
  document.querySelector("#inferencesMasteryBar");


/* =========================================================
   DOM REFERENCES — LESSON
   ========================================================= */

const lessonScreen =
  document.querySelector("#lessonScreen");

const exitLesson =
  document.querySelector("#exitLesson");

const lessonProgressText =
  document.querySelector("#lessonProgressText");

const lessonScreenProgressBar =
  document.querySelector("#lessonScreenProgressBar");

const lessonStageType =
  document.querySelector("#lessonStageType");

const lessonStageTitle =
  document.querySelector("#lessonStageTitle");

const lessonBody =
  document.querySelector("#lessonBody");

const interactionArea =
  document.querySelector("#interactionArea");

const lessonFeedback =
  document.querySelector("#lessonFeedback");

const lessonFeedbackIcon =
  document.querySelector("#lessonFeedbackIcon");

const lessonFeedbackLabel =
  document.querySelector("#lessonFeedbackLabel");

const lessonFeedbackTitle =
  document.querySelector("#lessonFeedbackTitle");

const lessonFeedbackText =
  document.querySelector("#lessonFeedbackText");

const previousLessonStep =
  document.querySelector("#previousLessonStep");

const nextLessonStep =
  document.querySelector("#nextLessonStep");

const stepCounter =
  document.querySelector("#stepCounter");


/* =========================================================
   DOM REFERENCES — CHAPTER TEST
   ========================================================= */

const chapterTestCard =
  document.querySelector("#chapterTestCard");

const startChapterTest =
  document.querySelector("#startChapterTest");


/* =========================================================
   DOM REFERENCES — BASKETBALL
   ========================================================= */

const basketballStage =
  document.querySelector("#basketballStage");

const pixelCourt =
  document.querySelector("#pixelCourt");

const pixelPlayer =
  document.querySelector("#pixelPlayer");

const pixelDefender =
  document.querySelector("#pixelDefender");

const pixelBall =
  document.querySelector("#pixelBall");

const pixelHoop =
  document.querySelector("#pixelHoop");

const shotResult =
  document.querySelector("#shotResult");

const playerScore =
  document.querySelector("#playerScore");

const opponentScore =
  document.querySelector("#opponentScore");

const possessionNumber =
  document.querySelector("#possessionNumber");


/* =========================================================
   CURRENT LESSON STATE
   ========================================================= */

let activeLessonID = null;

let activeLesson = null;

let currentStepIndex = 0;

let currentSelection = null;

let currentQuestionAnswered = false;

let lessonCorrect = 0;

let lessonQuestionsAnswered = 0;


/* =========================================================
   BASKETBALL GAME STATE
   ========================================================= */

let gamePlayerScore = 0;

let gameOpponentScore = 0;

let gamePossession = 1;

let shotAnimationPlaying = false;


/* =========================================================
   UTILITY
   ========================================================= */

function wait(milliseconds) {

  return new Promise(resolve => {

    setTimeout(
      resolve,
      milliseconds
    );

  });
}


/* =========================================================
   PLAYER LEVEL
   ========================================================= */

function calculatePlayerLevel() {

  return Math.floor(
    player.xp / 500
  ) + 1;
}


/* =========================================================
   PLAYER HUD
   ========================================================= */

function renderPlayerHUD() {

  player.level =
    calculatePlayerLevel();


  playerLevel.textContent =
    player.level;


  playerXP.textContent =
    player.xp.toLocaleString();


  playerStreak.textContent =
    `🔥 ${player.streak}`;


  totalAnswered.textContent =
    player.totalAnswered;


  bestStreak.textContent =
    player.bestStreak;


  if (player.totalAnswered === 0) {

    overallAccuracy.textContent =
      "—";

  } else {

    const accuracy =
      Math.round(
        (
          player.totalCorrect /
          player.totalAnswered
        ) * 100
      );


    overallAccuracy.textContent =
      `${accuracy}%`;
  }
}


/* =========================================================
   CHAPTER PROGRESS
   ========================================================= */

function calculateCompletedLessons() {

  const lessonData =
    player.progress.chapter1.lessons;


  return Object.values(
    lessonData
  )
    .filter(
      lesson => lesson.completed
    )
    .length;
}


function calculateChapterProgress() {

  const completed =
    calculateCompletedLessons();


  return Math.round(
    (completed / 5) * 100
  );
}


function renderChapterProgress() {

  const completed =
    calculateCompletedLessons();

  const progress =
    calculateChapterProgress();


  lessonProgress.textContent =
    `${completed} / 5 Complete`;


  chapterMastery.textContent =
    `${progress}%`;


  chapterMasteryBar.style.width =
    `${progress}%`;


  courseProgressPercent.textContent =
    `${progress}%`;


  courseProgressBar.style.width =
    `${progress}%`;
}


/* =========================================================
   CONCEPT MASTERY
   ========================================================= */

function renderConceptMastery() {

  const mastery =
    player.conceptMastery;


  argumentsMastery.textContent =
    `${mastery.arguments}%`;

  argumentsMasteryBar.style.width =
    `${mastery.arguments}%`;


  premisesMastery.textContent =
    `${mastery.premises}%`;

  premisesMasteryBar.style.width =
    `${mastery.premises}%`;


  conclusionsMastery.textContent =
    `${mastery.conclusions}%`;

  conclusionsMasteryBar.style.width =
    `${mastery.conclusions}%`;


  premiseSetsMastery.textContent =
    `${mastery.premiseSets}%`;

  premiseSetsMasteryBar.style.width =
    `${mastery.premiseSets}%`;


  inferencesMastery.textContent =
    `${mastery.inferences}%`;

  inferencesMasteryBar.style.width =
    `${mastery.inferences}%`;
}


/* =========================================================
   LESSON CARDS
   ========================================================= */

function renderLessonCards() {

  const lessonData =
    player.progress.chapter1.lessons;


  document
    .querySelectorAll(".lesson-card")
    .forEach(card => {

      const id =
        card.dataset.lesson;

      const progress =
        lessonData[id];


      if (!progress) {
        return;
      }


      card.classList.remove(
        "available",
        "locked",
        "completed"
      );


      const button =
        card.querySelector(
          ".lesson-button"
        );

      const icon =
        card.querySelector(
          ".lesson-status-icon"
        );


      if (progress.completed) {

        card.classList.add(
          "completed"
        );

        icon.textContent =
          "✓";

        button.disabled =
          false;

        button.textContent =
          "Review Lesson";

        button.dataset.startLesson =
          id;

      }

      else if (progress.unlocked) {

        card.classList.add(
          "available"
        );

        icon.textContent =
          "▶";

        button.disabled =
          false;

        button.textContent =
          progress.attempts > 0
            ? "Continue Lesson"
            : "Start Lesson";

        button.dataset.startLesson =
          id;

      }

      else {

        card.classList.add(
          "locked"
        );

        icon.textContent =
          "🔒";

        button.disabled =
          true;

        button.textContent =
          "Locked";
      }
    });
}


/* =========================================================
   CURRENT OBJECTIVE
   ========================================================= */

function renderCurrentObjective() {

  const lessonData =
    player.progress.chapter1.lessons;


  const order = [
    ["1-1", "What Is an Argument?"],
    ["1-2", "Premises"],
    ["1-3", "Conclusions"],
    ["1-4", "Premise Sets"],
    ["1-5", "Valid & Invalid Conclusions"]
  ];


  for (const [id, title] of order) {

    if (
      lessonData[id].unlocked &&
      !lessonData[id].completed
    ) {

      currentObjective.textContent =
        `Complete Lesson ${id.replace("-", ".")} — ${title}`;


      continueTraining.dataset.lesson =
        id;


      continueTraining.disabled =
        !lessons[id];


      return;
    }
  }


  if (
    player.progress.chapter1.test.unlocked
  ) {

    currentObjective.textContent =
      "Complete the Chapter 1 Championship";


    continueTraining.dataset.lesson =
      "";


    continueTraining.disabled =
      false;


    return;
  }


  currentObjective.textContent =
    "Chapter 1 Complete";
}


/* =========================================================
   CHAPTER TEST LOCK
   ========================================================= */

function updateChapterTestUnlock() {

  const allComplete =
    Object.values(
      player.progress.chapter1.lessons
    )
      .every(
        lesson => lesson.completed
      );


  player.progress.chapter1.test.unlocked =
    allComplete;


  if (allComplete) {

    chapterTestCard.classList.remove(
      "locked"
    );

    startChapterTest.disabled =
      false;

    startChapterTest.textContent =
      "Play Championship";

  } else {

    chapterTestCard.classList.add(
      "locked"
    );

    startChapterTest.disabled =
      true;

    startChapterTest.textContent =
      "Complete Lessons";
  }
}


/* =========================================================
   DASHBOARD
   ========================================================= */

function renderDashboard() {

  renderPlayerHUD();

  renderChapterProgress();

  renderConceptMastery();

  renderLessonCards();

  updateChapterTestUnlock();

  renderCurrentObjective();

  savePlayer();
}


/* =========================================================
   BASKETBALL COURT RESET
   ========================================================= */

function resetBasketballCourt() {

  if (!basketballStage) {
    return;
  }


  pixelPlayer.classList.remove(
    "shooting",
    "celebrate"
  );


  pixelDefender.classList.remove(
    "blocking"
  );


  pixelBall.classList.remove(
    "shot-made",
    "shot-miss",
    "shot-blocked",
    "shot-airball"
  );


  pixelHoop.classList.remove(
    "swish"
  );


  shotResult.classList.remove(
    "result-pop",
    "made",
    "missed"
  );


  shotResult.classList.add(
    "hidden"
  );


  shotResult.textContent =
    "";


  shotAnimationPlaying =
    false;
}


/* =========================================================
   SHOW / HIDE COURT
   ========================================================= */

function showBasketballCourt() {

  if (!basketballStage) {
    return;
  }


  resetBasketballCourt();


  basketballStage.classList.remove(
    "hidden"
  );


  playerScore.textContent =
    gamePlayerScore;


  opponentScore.textContent =
    gameOpponentScore;


  possessionNumber.textContent =
    gamePossession;
}


function hideBasketballCourt() {

  if (!basketballStage) {
    return;
  }


  basketballStage.classList.add(
    "hidden"
  );


  resetBasketballCourt();
}


/* =========================================================
   SHOT RESULT
   ========================================================= */

function showShotResult(
  text,
  made
) {

  shotResult.textContent =
    text;


  shotResult.classList.remove(
    "hidden",
    "made",
    "missed",
    "result-pop"
  );


  shotResult.classList.add(
    made
      ? "made"
      : "missed"
  );


  void shotResult.offsetWidth;


  shotResult.classList.add(
    "result-pop"
  );
}


/* =========================================================
   MADE SHOT
   ========================================================= */

async function playMadeShot() {

  resetBasketballCourt();

  shotAnimationPlaying =
    true;


  pixelPlayer.classList.add(
    "shooting"
  );


  await wait(180);


  pixelBall.classList.add(
    "shot-made"
  );


  pixelHoop.classList.add(
    "swish"
  );


  await wait(970);


  gamePlayerScore +=
    2;


  playerScore.textContent =
    gamePlayerScore;


  showShotResult(
    "BUCKET!",
    true
  );


  pixelPlayer.classList.remove(
    "shooting"
  );


  pixelPlayer.classList.add(
    "celebrate"
  );


  await wait(650);


  shotAnimationPlaying =
    false;
}


/* =========================================================
   WRONG SHOT SELECTOR
   ========================================================= */

async function playMissedShot() {

  const outcomes = [
    "brick",
    "block",
    "airball"
  ];


  const outcome =
    outcomes[
      Math.floor(
        Math.random() *
        outcomes.length
      )
    ];


  if (outcome === "block") {

    await playBlockedShot();

    return;
  }


  if (outcome === "airball") {

    await playAirball();

    return;
  }


  await playBrick();
}


/* =========================================================
   BRICK
   ========================================================= */

async function playBrick() {

  resetBasketballCourt();

  shotAnimationPlaying =
    true;


  pixelPlayer.classList.add(
    "shooting"
  );


  await wait(180);


  pixelBall.classList.add(
    "shot-miss"
  );


  await wait(970);


  gameOpponentScore +=
    2;


  opponentScore.textContent =
    gameOpponentScore;


  showShotResult(
    "BRICK!",
    false
  );


  await wait(600);


  shotAnimationPlaying =
    false;
}


/* =========================================================
   BLOCK
   ========================================================= */

async function playBlockedShot() {

  resetBasketballCourt();

  shotAnimationPlaying =
    true;


  pixelPlayer.classList.add(
    "shooting"
  );


  await wait(170);


  pixelDefender.classList.add(
    "blocking"
  );


  pixelBall.classList.add(
    "shot-blocked"
  );


  await wait(680);


  gameOpponentScore +=
    2;


  opponentScore.textContent =
    gameOpponentScore;


  showShotResult(
    "BLOCKED!",
    false
  );


  await wait(600);


  shotAnimationPlaying =
    false;
}


/* =========================================================
   AIRBALL
   ========================================================= */

async function playAirball() {

  resetBasketballCourt();

  shotAnimationPlaying =
    true;


  pixelPlayer.classList.add(
    "shooting"
  );


  await wait(180);


  pixelBall.classList.add(
    "shot-airball"
  );


  await wait(970);


  gameOpponentScore +=
    2;


  opponentScore.textContent =
    gameOpponentScore;


  showShotResult(
    "AIRBALL!",
    false
  );


  await wait(600);


  shotAnimationPlaying =
    false;
}


/* =========================================================
   OPEN LESSON
   ========================================================= */

function openLesson(id) {

  if (!lessons[id]) {

    alert(
      "This lesson hasn't been built yet."
    );

    return;
  }


  const progress =
    player.progress.chapter1.lessons[id];


  if (!progress.unlocked) {
    return;
  }


  activeLessonID =
    id;


  activeLesson =
    lessons[id];


  currentStepIndex =
    0;


  currentSelection =
    null;


  currentQuestionAnswered =
    false;


  lessonCorrect =
    0;


  lessonQuestionsAnswered =
    0;


  gamePlayerScore =
    0;


  gameOpponentScore =
    0;


  gamePossession =
    1;


  resetBasketballCourt();


  progress.attempts++;


  savePlayer();


  lessonScreen.classList.remove(
    "hidden"
  );


  document.body.style.overflow =
    "hidden";


  renderLessonStep();
}


/* =========================================================
   CLOSE LESSON
   ========================================================= */

function closeLesson() {

  if (shotAnimationPlaying) {
    return;
  }


  hideBasketballCourt();


  lessonScreen.classList.add(
    "hidden"
  );


  document.body.style.overflow =
    "";


  activeLessonID =
    null;


  activeLesson =
    null;


  currentStepIndex =
    0;


  renderDashboard();
}


/* =========================================================
   RENDER LESSON STEP
   ========================================================= */

function renderLessonStep() {

  if (!activeLesson) {
    return;
  }


  const step =
    activeLesson.steps[
      currentStepIndex
    ];


  const totalSteps =
    activeLesson.steps.length;


  const progress =
    (
      (currentStepIndex + 1) /
      totalSteps
    ) * 100;


  lessonProgressText.textContent =
    `Lesson ${activeLesson.number}`;


  lessonScreenProgressBar.style.width =
    `${progress}%`;


  stepCounter.textContent =
    `${currentStepIndex + 1} / ${totalSteps}`;


  lessonStageTitle.textContent =
    step.title;


  lessonFeedback.classList.add(
    "hidden"
  );


  lessonFeedback.classList.remove(
    "wrong"
  );


  currentSelection =
    null;


  currentQuestionAnswered =
    false;


  interactionArea.innerHTML =
    "";


  previousLessonStep.disabled =
    currentStepIndex === 0;


  hideBasketballCourt();


  if (step.type === "learn") {

    lessonStageType.textContent =
      "FILM ROOM";


    lessonBody.innerHTML =
      step.html;


    nextLessonStep.disabled =
      false;


    nextLessonStep.textContent =
      "Continue →";
  }


  if (step.type === "question") {

    showBasketballCourt();


    lessonStageType.textContent =
      step.drill
        ? "LIVE DRILL"
        : "KNOWLEDGE CHECK";


    lessonBody.innerHTML = `

      <div class="lesson-question-block">

        <p class="lesson-stimulus">
          ${step.stimulus}
        </p>

        <h3 class="interaction-question">
          ${step.prompt}
        </h3>

      </div>

    `;


    const options =
      document.createElement("div");


    options.className =
      "interaction-options";


    step.answers.forEach(
      (answer, index) => {

        const button =
          document.createElement("button");


        button.className =
          "interaction-option";


        button.dataset.answer =
          index;


        const letter =
          String.fromCharCode(
            65 + index
          );


        button.innerHTML = `

          <span class="answer-letter">
            ${letter}
          </span>

          <span>
            ${answer}
          </span>

        `;


        button.addEventListener(
          "click",
          () => {

            selectLessonAnswer(
              index,
              button
            );

          }
        );


        options.appendChild(
          button
        );
      }
    );


    interactionArea.appendChild(
      options
    );


    nextLessonStep.disabled =
      true;


    nextLessonStep.textContent =
      "Shoot";
  }


  if (step.type === "complete") {

    lessonStageType.textContent =
      "FINAL BUZZER";


    lessonBody.innerHTML =
      step.html;


    completeLesson();


    nextLessonStep.disabled =
      false;


    nextLessonStep.textContent =
      "Return to Chapter";
  }
}


/* =========================================================
   SELECT ANSWER
   ========================================================= */

function selectLessonAnswer(
  index,
  button
) {

  if (
    currentQuestionAnswered ||
    shotAnimationPlaying
  ) {
    return;
  }


  currentSelection =
    index;


  document
    .querySelectorAll(
      ".interaction-option"
    )
    .forEach(option => {

      option.classList.remove(
        "selected"
      );

    });


  button.classList.add(
    "selected"
  );


  nextLessonStep.disabled =
    false;
}


/* =========================================================
   CHECK ANSWER + PLAY POSSESSION
   ========================================================= */

async function checkLessonAnswer() {

  if (
    currentSelection === null ||
    currentQuestionAnswered ||
    shotAnimationPlaying
  ) {
    return;
  }


  const step =
    activeLesson.steps[
      currentStepIndex
    ];


  const correct =
    currentSelection ===
    step.correct;


  currentQuestionAnswered =
    true;


  lessonQuestionsAnswered++;


  player.totalAnswered++;


  recordQuestionAttempt(
    activeLessonID,
    currentStepIndex,
    correct
  );


  const options =
    document.querySelectorAll(
      ".interaction-option"
    );


  options.forEach(option => {

    option.disabled =
      true;

  });


  nextLessonStep.disabled =
    true;


  previousLessonStep.disabled =
    true;


  if (correct) {

    lessonCorrect++;


    player.totalCorrect++;


    player.streak++;


    player.bestStreak =
      Math.max(
        player.bestStreak,
        player.streak
      );


    await playMadeShot();
  }


  else {

    player.streak =
      0;


    await playMissedShot();
  }


  options.forEach(
    (option, index) => {

      option.classList.remove(
        "selected"
      );


      if (
        index === step.correct
      ) {

        option.classList.add(
          "correct"
        );
      }


      if (
        index === currentSelection &&
        !correct
      ) {

        option.classList.add(
          "incorrect"
        );
      }
    }
  );


  if (correct) {

    showLessonFeedback(
      true,
      step.feedbackCorrect
    );

  } else {

    showLessonFeedback(
      false,
      step.feedbackWrong
    );
  }


  renderPlayerHUD();


  savePlayer();


  gamePossession++;


  possessionNumber.textContent =
    gamePossession;


  previousLessonStep.disabled =
    currentStepIndex === 0;


  nextLessonStep.disabled =
    false;


  nextLessonStep.textContent =
    "Next Possession →";
}


/* =========================================================
   FEEDBACK
   ========================================================= */

function showLessonFeedback(
  correct,
  feedback
) {

  lessonFeedback.classList.remove(
    "hidden"
  );


  if (correct) {

    lessonFeedback.classList.remove(
      "wrong"
    );


    lessonFeedbackIcon.textContent =
      "🏀";

  } else {

    lessonFeedback.classList.add(
      "wrong"
    );


    lessonFeedbackIcon.textContent =
      "✕";
  }


  lessonFeedbackLabel.textContent =
    feedback.label;


  lessonFeedbackTitle.textContent =
    feedback.title;


  lessonFeedbackText.textContent =
    feedback.text;
}


/* =========================================================
   QUESTION HISTORY
   ========================================================= */

function recordQuestionAttempt(
  lessonID,
  stepIndex,
  correct
) {

  const id =
    `${lessonID}-step-${stepIndex}`;


  if (!player.questionHistory[id]) {

    player.questionHistory[id] = {
      attempts: 0,
      correct: 0,
      incorrect: 0
    };
  }


  const history =
    player.questionHistory[id];


  history.attempts++;


  if (correct) {

    history.correct++;

  } else {

    history.incorrect++;
  }


  history.lastAttempt =
    new Date().toISOString();
}


/* =========================================================
   NEXT STEP
   ========================================================= */

function handleNextStep() {

  if (
    !activeLesson ||
    shotAnimationPlaying
  ) {
    return;
  }


  const step =
    activeLesson.steps[
      currentStepIndex
    ];


  if (
    step.type === "question" &&
    !currentQuestionAnswered
  ) {

    checkLessonAnswer();

    return;
  }


  if (step.type === "complete") {

    closeLesson();

    return;
  }


  if (
    currentStepIndex <
    activeLesson.steps.length - 1
  ) {

    currentStepIndex++;


    renderLessonStep();


    scrollLessonTop();
  }
}


/* =========================================================
   PREVIOUS STEP
   ========================================================= */

function handlePreviousStep() {

  if (
    !activeLesson ||
    currentStepIndex === 0 ||
    shotAnimationPlaying
  ) {
    return;
  }


  currentStepIndex--;


  renderLessonStep();


  scrollLessonTop();
}


/* =========================================================
   COMPLETE LESSON
   ========================================================= */

function completeLesson() {

  const lessonProgressData =
    player.progress
      .chapter1
      .lessons[
        activeLessonID
      ];


  if (!lessonProgressData.completed) {

    player.xp +=
      activeLesson.xpReward;


    lessonProgressData.completed =
      true;


    let mastery =
      100;


    if (lessonQuestionsAnswered > 0) {

      mastery =
        Math.round(
          (
            lessonCorrect /
            lessonQuestionsAnswered
          ) * 100
        );
    }


    lessonProgressData.mastery =
      mastery;


    player.conceptMastery[
      activeLesson.concept
    ] =
      mastery;


    unlockNextLesson(
      activeLessonID
    );


    updateChapterTestUnlock();


    savePlayer();
  }


  renderPlayerHUD();
}


/* =========================================================
   UNLOCK NEXT LESSON
   ========================================================= */

function unlockNextLesson(
  completedID
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
      completedID
    );


  if (
    index === -1 ||
    index === order.length - 1
  ) {
    return;
  }


  const nextID =
    order[
      index + 1
    ];


  player.progress
    .chapter1
    .lessons[
      nextID
    ]
    .unlocked = true;
}


/* =========================================================
   SCROLL
   ========================================================= */

function scrollLessonTop() {

  lessonScreen.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================================
   LESSON BUTTONS
   ========================================================= */

function bindLessonButtons() {

  document.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
          "[data-start-lesson]"
        );


      if (!button) {
        return;
      }


      const id =
        button.dataset.startLesson;


      if (!id) {
        return;
      }


      openLesson(id);
    }
  );
}


/* =========================================================
   CONTINUE TRAINING
   ========================================================= */

continueTraining.addEventListener(
  "click",
  () => {

    const id =
      continueTraining.dataset.lesson;


    if (id) {

      openLesson(id);

      return;
    }


    if (
      player.progress.chapter1.test.unlocked
    ) {

      startAssessmentPlaceholder();
    }
  }
);


/* =========================================================
   LESSON CONTROLS
   ========================================================= */

nextLessonStep.addEventListener(
  "click",
  handleNextStep
);


previousLessonStep.addEventListener(
  "click",
  handlePreviousStep
);


exitLesson.addEventListener(
  "click",
  closeLesson
);


/* =========================================================
   ESCAPE
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      !lessonScreen.classList.contains(
        "hidden"
      ) &&
      !shotAnimationPlaying
    ) {

      closeLesson();
    }
  }
);


/* =========================================================
   CHAPTER TEST PLACEHOLDER
   ========================================================= */

function startAssessmentPlaceholder() {

  alert(
    "Chapter Championship engine is coming next."
  );
}


startChapterTest.addEventListener(
  "click",
  startAssessmentPlaceholder
);


/* =========================================================
   DEVELOPMENT RESET

   Browser console:
   resetReasoningLeagueProgress()
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
   INITIALIZE
   ========================================================= */

bindLessonButtons();

renderDashboard();

hideBasketballCourt();
