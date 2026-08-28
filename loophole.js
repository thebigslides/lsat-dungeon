/* =========================================================
   LOOPHOLE LEAGUE
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

   Original instructional material for the game.
   ========================================================= */

const lessons = {

  "1-1": {

    chapter: 1,

    number: "1.1",

    title: "What Is an Argument?",

    concept: "arguments",

    xpReward: 150,


    steps: [

      /* ===================================================
         STEP 1
         =================================================== */

      {
        type: "learn",

        title: "What Is an Argument?",

        html: `
          <p>
            Before we can analyze an argument,
            we need to know what actually makes
            something an <strong>argument</strong>.
          </p>

          <p>
            An argument isn't just a bunch of
            statements sitting next to each other.
          </p>

          <div class="concept-box">

            <h3>The basic idea</h3>

            <p>
              In an argument, one or more statements
              are offered as <strong>support</strong>
              for another statement.
            </p>

          </div>

          <p>
            That relationship is what matters:
          </p>

          <div class="logic-flow">

            <div class="logic-node">
              SUPPORT
            </div>

            <div class="logic-arrow">
              ↓
            </div>

            <div class="logic-node conclusion-node">
              CLAIM
            </div>

          </div>

          <p>
            No support relationship?
            Then you may simply have a collection
            of statements rather than an argument.
          </p>
        `
      },


      /* ===================================================
         STEP 2
         =================================================== */

      {
        type: "learn",

        title: "Statements Aren't Enough",

        html: `
          <p>
            Consider these statements:
          </p>

          <div class="concept-example">

            <p>
              Luka plays professional basketball.
            </p>

            <p>
              Luka wears number 77.
            </p>

            <p>
              Luka was born in Slovenia.
            </p>

          </div>

          <p>
            All three statements might be true.
          </p>

          <p>
            But notice something important:
            <strong>none of them is being used
            to prove another.</strong>
          </p>

          <p>
            They're related statements, but there
            isn't yet a support relationship.
          </p>
        `
      },


      /* ===================================================
         STEP 3
         =================================================== */

      {
        type: "question",

        title: "Check the Relationship",

        prompt:
          "Does this passage contain an argument?",

        stimulus:
          "The library closes at 8:00 p.m. It contains more than 50,000 books. The building was renovated five years ago.",

        answers: [
          "Yes — it contains several factual claims.",
          "Yes — all of the statements concern the library.",
          "No — none of the statements is being used to support another.",
          "No — arguments must contain disagreement."
        ],

        correct: 2,

        feedbackCorrect: {
          label: "BUCKET",
          title: "Exactly.",
          text:
            "The statements are related, but no statement is being offered as evidence for another. That's the distinction we're looking for."
        },

        feedbackWrong: {
          label: "NOT QUITE",
          title: "Look for support, not just statements.",
          text:
            "Having several related statements does not automatically create an argument. Ask whether one claim is being used to support another."
        }
      },


      /* ===================================================
         STEP 4
         =================================================== */

      {
        type: "learn",

        title: "Now Add Support",

        html: `
          <p>
            Now compare the previous example with this:
          </p>

          <div class="concept-example">

            <p>
              The roads are covered in ice.
            </p>

            <p>
              <strong>
                Therefore, schools should delay
                opening this morning.
              </strong>
            </p>

          </div>

          <p>
            Now we have something different.
          </p>

          <div class="logic-flow">

            <div class="logic-node">
              Roads are covered in ice
            </div>

            <div class="logic-arrow">
              ↓ supports ↓
            </div>

            <div class="logic-node conclusion-node">
              Schools should delay opening
            </div>

          </div>

          <p>
            The first statement gives us a
            <strong>reason</strong> to accept
            the second statement.
          </p>

          <p>
            That's an argument.
          </p>
        `
      },


      /* ===================================================
         STEP 5
         =================================================== */

      {
        type: "question",

        title: "Argument or Not?",

        prompt:
          "Which best describes this passage?",

        stimulus:
          "Attendance at the theater has fallen for six straight months. Therefore, the theater should reconsider its current ticket prices.",

        answers: [
          "It is an argument because the attendance claim supports the recommendation.",
          "It is not an argument because both statements could be true.",
          "It is not an argument because recommendations cannot be conclusions.",
          "It is an argument only if ticket prices actually caused the decline."
        ],

        correct: 0,

        feedbackCorrect: {
          label: "BUCKET",
          title: "There's the support relationship.",
          text:
            "The decline in attendance is being offered as a reason for the recommendation about ticket prices. Whether the argument is ultimately persuasive is a separate question."
        },

        feedbackWrong: {
          label: "BLOCKED",
          title: "Separate existence from quality.",
          text:
            "An argument does not have to be good to count as an argument. Here, the attendance claim is clearly being offered as support for the recommendation."
        }
      },


      /* ===================================================
         STEP 6
         =================================================== */

      {
        type: "learn",

        title: "Argument ≠ Good Argument",

        html: `
          <p>
            This distinction is important.
          </p>

          <div class="concept-box">

            <h3>
              An argument can be terrible and
              still be an argument.
            </h3>

            <p>
              We're first asking whether a
              support relationship exists.
              We're not yet asking whether that
              support is strong.
            </p>

          </div>

          <p>
            For example:
          </p>

          <div class="concept-example">

            <p>
              Marcus owns a red car.
            </p>

            <p>
              Therefore, Marcus must be an
              excellent basketball player.
            </p>

          </div>

          <p>
            That's obviously awful reasoning.
          </p>

          <p>
            But structurally, the first claim is
            still being presented as support for
            the second.
          </p>

          <p>
            So it <strong>is</strong> an argument.
            It's just a bad one.
          </p>
        `
      },


      /* ===================================================
         STEP 7
         =================================================== */

      {
        type: "question",

        title: "Bad Argument or No Argument?",

        prompt:
          "How should we classify this passage?",

        stimulus:
          "Nina owns three blue shirts. Therefore, Nina will become a successful attorney.",

        answers: [
          "Not an argument because the reasoning is terrible.",
          "An argument because one statement is presented as support for another.",
          "Not an argument because the conclusion concerns the future.",
          "An argument only if Nina actually becomes an attorney."
        ],

        correct: 1,

        feedbackCorrect: {
          label: "BUCKET",
          title: "Bad reasoning. Still an argument.",
          text:
            "The premise provides terrible support, but it is nevertheless presented as support for the conclusion."
        },

        feedbackWrong: {
          label: "OFF THE RIM",
          title: "Don't confuse quality with structure.",
          text:
            "We're not deciding whether the reasoning is persuasive yet. We're deciding whether a claim is being offered in support of another claim."
        }
      },


      /* ===================================================
         STEP 8
         =================================================== */

      {
        type: "learn",

        title: "Mini Drill",

        html: `
          <p>
            Time to make sure the distinction
            actually stuck.
          </p>

          <div class="concept-box">

            <h3>Your job</h3>

            <p>
              For each passage, decide whether
              it contains an argument.
            </p>

          </div>

          <p>
            Remember:
          </p>

          <p>
            <strong>
              Don't ask whether the statements
              are related.
            </strong>
          </p>

          <p>
            Ask whether one statement is being
            offered as <em>support</em> for another.
          </p>
        `
      },


      /* ===================================================
         STEP 9
         =================================================== */

      {
        type: "question",

        title: "Mini Drill — 1 of 3",

        drill: true,

        prompt:
          "Argument or collection of statements?",

        stimulus:
          "The café opened in 2018. It has twelve employees. Its walls are painted green.",

        answers: [
          "Argument",
          "Collection of statements"
        ],

        correct: 1,

        feedbackCorrect: {
          label: "BUCKET",
          title: "Collection of statements.",
          text:
            "Nothing is being offered as support for anything else."
        },

        feedbackWrong: {
          label: "BLOCKED",
          title: "Find the support relationship.",
          text:
            "These statements describe the same café, but none is being used to establish another."
        }
      },


      /* ===================================================
         STEP 10
         =================================================== */

      {
        type: "question",

        title: "Mini Drill — 2 of 3",

        drill: true,

        prompt:
          "Argument or collection of statements?",

        stimulus:
          "The café has lost money during each of the last four months. Thus, the owner should consider reducing operating costs.",

        answers: [
          "Argument",
          "Collection of statements"
        ],

        correct: 0,

        feedbackCorrect: {
          label: "BUCKET",
          title: "Argument.",
          text:
            "The financial losses are being offered as support for the recommendation."
        },

        feedbackWrong: {
          label: "POSSESSION LOST",
          title: "There is support here.",
          text:
            "The first claim gives a reason for accepting the recommendation in the second."
        }
      },


      /* ===================================================
         STEP 11
         =================================================== */

      {
        type: "question",

        title: "Mini Drill — 3 of 3",

        drill: true,

        prompt:
          "Argument or collection of statements?",

        stimulus:
          "The train arrived twenty minutes late. Several passengers were carrying luggage. The station has four platforms.",

        answers: [
          "Argument",
          "Collection of statements"
        ],

        correct: 1,

        feedbackCorrect: {
          label: "BUCKET",
          title: "You got it.",
          text:
            "There is no support relationship among the statements."
        },

        feedbackWrong: {
          label: "BLOCKED",
          title: "Related facts aren't enough.",
          text:
            "All three statements concern the same situation, but none is offered as evidence for another."
        }
      },


      /* ===================================================
         STEP 12
         =================================================== */

      {
        type: "complete",

        title: "Lesson Complete",

        html: `
          <div class="completion-screen">

            <div class="completion-symbol">
              🏀
            </div>

            <p class="eyebrow">
              FINAL BUZZER
            </p>

            <h2>
              Lesson Complete
            </h2>

            <p>
              You now have the foundation:
              arguments contain a
              <strong>support relationship</strong>.
            </p>

            <div class="completion-summary">

              <div>
                <span>Concept</span>
                <strong>Arguments</strong>
              </div>

              <div>
                <span>Reward</span>
                <strong>+150 XP</strong>
              </div>

              <div>
                <span>Next</span>
                <strong>Premises</strong>
              </div>

            </div>

          </div>
        `
      }
    ]
  }
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


  /*
    Force browser to restart animation.
  */

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


  /* =======================================================
     LEARN
     ======================================================= */

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


  /* =======================================================
     QUESTION
     ======================================================= */

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


  /* =======================================================
     COMPLETE
     ======================================================= */

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


  /*
    Lock the entire interface while the
    possession animation plays.
  */

  options.forEach(option => {

    option.disabled =
      true;

  });


  nextLessonStep.disabled =
    true;


  previousLessonStep.disabled =
    true;


  /* =======================================================
     CORRECT
     ======================================================= */

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


  /* =======================================================
     WRONG
     ======================================================= */

  else {

    player.streak =
      0;


    await playMissedShot();
  }


  /* =======================================================
     REVEAL ANSWERS
     ======================================================= */

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


  /* =======================================================
     FEEDBACK
     ======================================================= */

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


  /*
    Question selected but possession
    has not yet been played.
  */

  if (
    step.type === "question" &&
    !currentQuestionAnswered
  ) {

    checkLessonAnswer();

    return;
  }


  /*
    End of lesson.
  */

  if (step.type === "complete") {

    closeLesson();

    return;
  }


  /*
    Advance.
  */

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


  /*
    Completion rewards only happen once.
  */

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
   resetLoopholeProgress()
   ========================================================= */

window.resetLoopholeProgress =
  function () {

    const confirmed =
      confirm(
        "Reset all Loophole League progress?"
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
