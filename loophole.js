/* =========================================================
   LOOPHOLE TRAINING ENGINE
   VERSION 2
   Learn → Interact → Drill → Master
   ========================================================= */


/* =========================================================
   SAVE SYSTEM
   ========================================================= */

const SAVE_KEY = "loopholeTraining_v2";


const DEFAULT_PLAYER = {
  version: 2,

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
   LOAD PLAYER
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


let player = loadPlayer();



/* =========================================================
   LESSON DATA

   IMPORTANT:
   This is our own instructional material.

   We can later expand this lesson-by-lesson as you
   work through the book.
   ========================================================= */

const lessons = {

  /* =======================================================
     LESSON 1.1
     ======================================================= */

  "1-1": {

    chapter: 1,

    number: "1.1",

    title: "What Is an Argument?",

    concept: "arguments",

    xpReward: 150,


    steps: [

      /* ---------------------------------------------------
         STEP 1 — TEACHING
         --------------------------------------------------- */

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


      /* ---------------------------------------------------
         STEP 2 — EXAMPLE
         --------------------------------------------------- */

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


      /* ---------------------------------------------------
         STEP 3 — INTERACTIVE CHECK
         --------------------------------------------------- */

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


      /* ---------------------------------------------------
         STEP 4 — TEACHING
         --------------------------------------------------- */

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


      /* ---------------------------------------------------
         STEP 5 — INTERACTIVE
         --------------------------------------------------- */

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


      /* ---------------------------------------------------
         STEP 6 — IMPORTANT DISTINCTION
         --------------------------------------------------- */

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


      /* ---------------------------------------------------
         STEP 7 — CHECK
         --------------------------------------------------- */

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


      /* ---------------------------------------------------
         STEP 8 — MINI DRILL INTRO
         --------------------------------------------------- */

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


      /* ---------------------------------------------------
         STEP 9 — MINI DRILL
         --------------------------------------------------- */

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


      /* ---------------------------------------------------
         STEP 10 — MINI DRILL
         --------------------------------------------------- */

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


      /* ---------------------------------------------------
         STEP 11 — MINI DRILL
         --------------------------------------------------- */

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


      /* ---------------------------------------------------
         STEP 12 — COMPLETE
         --------------------------------------------------- */

      {
        type: "complete",

        title: "Lesson Complete",

        html: `
          <div class="completion-screen">

            <div class="completion-symbol">
              ✓
            </div>

            <p class="eyebrow">
              LESSON COMPLETE
            </p>

            <h2>
              What Is an Argument?
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
   DOM REFERENCES
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


const chapterTestCard =
  document.querySelector("#chapterTestCard");

const startChapterTest =
  document.querySelector("#startChapterTest");



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

  const lessons =
    player.progress.chapter1.lessons;


  return Object.values(lessons)
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
   LESSON CARD STATES
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


        button.disabled =
          true;


        button.textContent =
          "🔒 Locked";
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
      "Complete the Chapter 1 Assessment";


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
      "Begin Assessment";

  } else {

    chapterTestCard.classList.add(
      "locked"
    );


    startChapterTest.disabled =
      true;


    startChapterTest.textContent =
      "🔒 Complete Lessons";
  }
}



/* =========================================================
   RENDER DASHBOARD
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



  /* =======================================================
     LEARN STEP
     ======================================================= */

  if (step.type === "learn") {

    lessonStageType.textContent =
      "LEARN";


    lessonBody.innerHTML =
      step.html;


    nextLessonStep.disabled =
      false;


    nextLessonStep.textContent =
      "Continue →";
  }



  /* =======================================================
     QUESTION STEP
     ======================================================= */

  if (step.type === "question") {

    lessonStageType.textContent =
      step.drill
        ? "MINI DRILL"
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
      "Check Answer";
  }



  /* =======================================================
     COMPLETION STEP
     ======================================================= */

  if (step.type === "complete") {

    lessonStageType.textContent =
      "COMPLETE";


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
   SELECT LESSON ANSWER
   ========================================================= */

function selectLessonAnswer(
  index,
  button
) {

  if (currentQuestionAnswered) {
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
   CHECK LESSON ANSWER
   ========================================================= */

function checkLessonAnswer() {

  if (
    currentSelection === null ||
    currentQuestionAnswered
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


  options.forEach(
    (option, index) => {

      option.disabled =
        true;


      option.classList.remove(
        "selected"
      );


      if (index === step.correct) {

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


    showLessonFeedback(
      true,
      step.feedbackCorrect
    );

  }



  /* =======================================================
     WRONG
     ======================================================= */

  else {

    player.streak =
      0;


    showLessonFeedback(
      false,
      step.feedbackWrong
    );
  }


  renderPlayerHUD();


  savePlayer();


  nextLessonStep.disabled =
    false;


  nextLessonStep.textContent =
    "Continue →";
}



/* =========================================================
   SHOW FEEDBACK
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
      "✓";

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
   RECORD QUESTION HISTORY
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

  if (!activeLesson) {
    return;
  }


  const step =
    activeLesson.steps[
      currentStepIndex
    ];



  /* -------------------------------------------------------
     QUESTION NOT YET CHECKED
     ------------------------------------------------------- */

  if (
    step.type === "question" &&
    !currentQuestionAnswered
  ) {

    checkLessonAnswer();

    return;
  }



  /* -------------------------------------------------------
     COMPLETION SCREEN
     ------------------------------------------------------- */

  if (step.type === "complete") {

    closeLesson();

    return;
  }



  /* -------------------------------------------------------
     MOVE FORWARD
     ------------------------------------------------------- */

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
    currentStepIndex === 0
  ) {
    return;
  }


  currentStepIndex--;


  renderLessonStep();


  scrollLessonTop();
}



/* =========================================================
   LESSON COMPLETION
   ========================================================= */

function completeLesson() {

  const lessonProgressData =
    player.progress
      .chapter1
      .lessons[
        activeLessonID
      ];


  /* -------------------------------------------------------
     ONLY AWARD COMPLETION XP ONCE
     ------------------------------------------------------- */

  if (!lessonProgressData.completed) {

    player.xp +=
      activeLesson.xpReward;


    lessonProgressData.completed =
      true;



    /* -----------------------------------------------------
       CALCULATE MASTERY
       ----------------------------------------------------- */

    let mastery = 100;


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



    /* -----------------------------------------------------
       UPDATE CONCEPT MASTERY
       ----------------------------------------------------- */

    player.conceptMastery[
      activeLesson.concept
    ] =
      mastery;



    /* -----------------------------------------------------
       UNLOCK NEXT LESSON
       ----------------------------------------------------- */

    unlockNextLesson(
      activeLessonID
    );


    updateChapterTestUnlock();


    savePlayer();
  }
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
    order[index + 1];


  player.progress
    .chapter1
    .lessons[
      nextID
    ]
    .unlocked = true;
}



/* =========================================================
   SCROLL LESSON TO TOP
   ========================================================= */

function scrollLessonTop() {

  lessonScreen.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}



/* =========================================================
   START BUTTON EVENTS
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
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      !lessonScreen.classList.contains(
        "hidden"
      )
    ) {

      closeLesson();
    }
  }
);



/* =========================================================
   CHAPTER TEST PLACEHOLDER

   We build the actual chapter test once
   all Chapter 1 lessons exist.
   ========================================================= */

function startAssessmentPlaceholder() {

  alert(
    "Chapter Assessment engine is coming next."
  );
}


startChapterTest.addEventListener(
  "click",
  startAssessmentPlaceholder
);



/* =========================================================
   DEVELOPMENT RESET

   IMPORTANT:
   If you ever want to wipe your local progress,
   open the browser console and run:

   resetLoopholeProgress()

   ========================================================= */

window.resetLoopholeProgress =
  function () {

    const confirmed =
      confirm(
        "Reset all Loophole Training progress?"
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
