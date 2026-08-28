// ==========================================
// LOOPHOLE TRAINING ENGINE
// ==========================================

const SAVE_KEY = "loopholeTrainingPlayer_v1";


// ==========================================
// QUESTION BANK
//
// These are ORIGINAL practice questions.
// We can massively expand this later.
// ==========================================

const questions = [
  {
    id: "arg-001",

    concept: "arguments",
    subtype: "inference",

    tag: "VALID INFERENCE",
    difficulty: "Rookie",

    stimulus:
      "Every player selected for the All-Star team receives an invitation. Luka was selected for the All-Star team.",

    prompt:
      "Which statement must be true?",

    answers: [
      "Luka received an invitation.",
      "Luka was the best player selected.",
      "Every player who received an invitation was selected.",
      "Luka might not have received an invitation."
    ],

    correct: 0,

    feedback: {
      title: "That's the inference.",

      explanation:
        "Every selected player receives an invitation. Luka was selected. Therefore, Luka must receive an invitation."
    }
  },


  {
    id: "arg-002",

    concept: "arguments",
    subtype: "conclusion",

    tag: "FIND THE CONCLUSION",
    difficulty: "Rookie",

    stimulus:
      "The city should expand its rail system. Traffic congestion has increased every year, and cities with larger rail networks generally have fewer commuters traveling by car.",

    prompt:
      "Which statement is the conclusion of the argument?",

    answers: [
      "Traffic congestion has increased every year.",
      "The city should expand its rail system.",
      "Some cities have larger rail networks.",
      "Many commuters travel by car."
    ],

    correct: 1,

    feedback: {
      title: "Conclusion identified.",

      explanation:
        "The claims about congestion and other cities provide support. The claim being supported is that the city should expand its rail system."
    }
  },


  {
    id: "arg-003",

    concept: "arguments",
    subtype: "premise",

    tag: "FIND THE PREMISE",
    difficulty: "Rookie",

    stimulus:
      "Maya will probably succeed in the advanced course because she earned the highest grade in the prerequisite course.",

    prompt:
      "Which statement functions as a premise?",

    answers: [
      "Maya will probably succeed in the advanced course.",
      "Advanced courses are always difficult.",
      "Maya earned the highest grade in the prerequisite course.",
      "Maya enjoys advanced courses."
    ],

    correct: 2,

    feedback: {
      title: "That's the support.",

      explanation:
        "Maya's prerequisite grade is offered as evidence for the conclusion that she will probably succeed in the advanced course."
    }
  },


  {
    id: "arg-004",

    concept: "arguments",
    subtype: "invalid-inference",

    tag: "VALID OR INVALID",
    difficulty: "Starter",

    stimulus:
      "All licensed pilots completed flight training. Jordan completed flight training.",

    prompt:
      "Which statement is properly supported?",

    answers: [
      "Jordan must be a licensed pilot.",
      "Jordan cannot be a licensed pilot.",
      "Jordan may or may not be a licensed pilot.",
      "Everyone who completes flight training becomes a licensed pilot."
    ],

    correct: 2,

    feedback: {
      title: "No reversal allowed.",

      explanation:
        "Licensed pilot guarantees completed training. Completed training does not guarantee that someone is a licensed pilot. Jordan could be licensed or unlicensed."
    }
  },


  {
    id: "arg-005",

    concept: "arguments",
    subtype: "argument-recognition",

    tag: "ARGUMENT STRUCTURE",
    difficulty: "Starter",

    stimulus:
      "The museum closes at 6:00 p.m. The building was constructed in 1924. Its newest exhibit contains paintings from several local artists.",

    prompt:
      "Does this passage contain an argument?",

    answers: [
      "Yes, because it contains several statements.",
      "Yes, because the statements concern the same museum.",
      "No, because none of the statements is offered as support for another.",
      "No, because arguments must contain disagreement."
    ],

    correct: 2,

    feedback: {
      title: "No support relationship.",

      explanation:
        "A collection of statements is not automatically an argument. An argument requires at least one claim to be offered as support for another."
    }
  },


  {
    id: "arg-006",

    concept: "arguments",
    subtype: "conclusion",

    tag: "FIND THE CONCLUSION",
    difficulty: "Starter",

    stimulus:
      "The restaurant is unlikely to remain open much longer. Its customer traffic has declined for six consecutive months, and its rent recently increased by twenty percent.",

    prompt:
      "What is the main conclusion?",

    answers: [
      "The restaurant's rent increased.",
      "Customer traffic has declined.",
      "The restaurant is unlikely to remain open much longer.",
      "Restaurants require customers to remain open."
    ],

    correct: 2,

    feedback: {
      title: "Main conclusion secured.",

      explanation:
        "Declining traffic and increased rent are evidence. They support the prediction that the restaurant is unlikely to remain open much longer."
    }
  },


  {
    id: "arg-007",

    concept: "arguments",
    subtype: "inference",

    tag: "VALID INFERENCE",
    difficulty: "Intermediate",

    stimulus:
      "No member of the committee who opposed the proposal voted for the final resolution. Priya opposed the proposal.",

    prompt:
      "Which statement must be true?",

    answers: [
      "Priya voted for the final resolution.",
      "Priya did not vote for the final resolution.",
      "Priya was absent from the final vote.",
      "Everyone who rejected the resolution opposed the proposal."
    ],

    correct: 1,

    feedback: {
      title: "Clean deduction.",

      explanation:
        "Anyone who opposed the proposal did not vote for the final resolution. Priya opposed it, so she could not have voted for the resolution."
    }
  },


  {
    id: "arg-008",

    concept: "arguments",
    subtype: "premise-conclusion",

    tag: "ARGUMENT STRUCTURE",
    difficulty: "Intermediate",

    stimulus:
      "Electric buses require less maintenance than diesel buses. They also produce no tailpipe emissions. Therefore, the transit authority has good reason to replace some of its diesel fleet with electric buses.",

    prompt:
      "How is the final sentence functioning?",

    answers: [
      "It provides evidence for the first sentence.",
      "It provides an example of an electric bus.",
      "It states the conclusion supported by the previous claims.",
      "It contradicts both previous statements."
    ],

    correct: 2,

    feedback: {
      title: "Structure recognized.",

      explanation:
        "The first two sentences provide benefits of electric buses. The final sentence draws a recommendation from those premises."
    }
  },


  {
    id: "arg-009",

    concept: "arguments",
    subtype: "invalid-inference",

    tag: "INFERENCE CHECK",
    difficulty: "Intermediate",

    stimulus:
      "Some attorneys at the firm specialize in tax law. Every attorney who specializes in tax law has completed advanced tax coursework.",

    prompt:
      "Which statement must be true?",

    answers: [
      "Every attorney at the firm completed advanced tax coursework.",
      "At least one attorney at the firm completed advanced tax coursework.",
      "Only attorneys at this firm complete advanced tax coursework.",
      "Most attorneys at the firm specialize in tax law."
    ],

    correct: 1,

    feedback: {
      title: "Existence carries through.",

      explanation:
        "At least one attorney specializes in tax law, and every tax-law specialist completed advanced coursework. Therefore at least one attorney at the firm completed that coursework."
    }
  },


  {
    id: "arg-010",

    concept: "arguments",
    subtype: "argument-recognition",

    tag: "ARGUMENT STRUCTURE",
    difficulty: "Intermediate",

    stimulus:
      "The lake's water level is lower than it was last summer. Rainfall in the region has also been below average. The reduced rainfall is therefore probably contributing to the lake's lower water level.",

    prompt:
      "Which claim is supported by the others?",

    answers: [
      "The lake existed last summer.",
      "Rainfall has been below average.",
      "Reduced rainfall is probably contributing to the lower water level.",
      "The lake will completely dry up."
    ],

    correct: 2,

    feedback: {
      title: "Argument mapped.",

      explanation:
        "The observations about water level and rainfall support the causal conclusion that reduced rainfall is probably contributing to the lower lake level."
    }
  }
];


// ==========================================
// DEFAULT PLAYER SAVE
// ==========================================

const defaultPlayer = {
  version: 1,

  xp: 0,
  level: 1,

  streak: 0,
  bestStreak: 0,

  totalAnswered: 0,
  totalCorrect: 0,

  mastery: {
    arguments: 0,
    inferences: 0,
    powerPlayers: 0,
    loopholes: 0,
    mixed: 0
  },

  unlockedLevels: [
    "arguments"
  ],

  questionHistory: {},

  currentRound: {
    level: "arguments",
    questionIndex: 0,
    correct: 0,
    answered: false
  }
};


// ==========================================
// LOAD / SAVE
// ==========================================

function cloneDefaultPlayer() {
  return JSON.parse(JSON.stringify(defaultPlayer));
}


function loadPlayer() {

  const saved = localStorage.getItem(SAVE_KEY);

  if (!saved) {
    return cloneDefaultPlayer();
  }

  try {

    const parsed = JSON.parse(saved);

    return {
      ...cloneDefaultPlayer(),
      ...parsed,

      mastery: {
        ...defaultPlayer.mastery,
        ...(parsed.mastery || {})
      },

      questionHistory: {
        ...(parsed.questionHistory || {})
      },

      currentRound: {
        ...defaultPlayer.currentRound,
        ...(parsed.currentRound || {})
      }
    };

  } catch (error) {

    console.error(
      "Could not load Loophole save:",
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


// ==========================================
// DOM
// ==========================================

const playerLevel =
  document.querySelector("#playerLevel");

const playerXP =
  document.querySelector("#playerXP");

const playerStreak =
  document.querySelector("#playerStreak");

const masteryPercent =
  document.querySelector("#masteryPercent");

const masteryBar =
  document.querySelector("#masteryBar");

const questionNumber =
  document.querySelector("#questionNumber");

const questionTotal =
  document.querySelector("#questionTotal");

const accuracyDisplay =
  document.querySelector("#accuracyDisplay");

const roundProgressBar =
  document.querySelector("#roundProgressBar");

const questionTag =
  document.querySelector("#questionTag");

const difficulty =
  document.querySelector("#difficulty");

const stimulus =
  document.querySelector("#stimulus");

const questionPrompt =
  document.querySelector("#questionPrompt");

const answerContainer =
  document.querySelector("#answerContainer");

const submitAnswer =
  document.querySelector("#submitAnswer");

const feedbackPanel =
  document.querySelector("#feedbackPanel");

const feedbackTitle =
  document.querySelector("#feedbackTitle");

const feedbackExplanation =
  document.querySelector("#feedbackExplanation");

const nextQuestion =
  document.querySelector("#nextQuestion");


// ==========================================
// GAME STATE
// ==========================================

let currentQuestionIndex =
  Math.min(
    player.currentRound.questionIndex || 0,
    questions.length - 1
  );

let selectedAnswer = null;
let answerLocked = false;


// ==========================================
// XP SYSTEM
// ==========================================

function getLevelFromXP(xp) {

  return Math.floor(xp / 500) + 1;
}


function awardXP(amount) {

  player.xp += amount;

  player.level =
    getLevelFromXP(player.xp);

  animateElement(
    playerXP,
    "xp-pulse"
  );
}


// ==========================================
// MASTERY
// ==========================================

function calculateArgumentsMastery() {

  if (player.totalAnswered === 0) {
    return 0;
  }

  const accuracy =
    player.totalCorrect /
    player.totalAnswered;

  const experienceFactor =
    Math.min(
      player.totalAnswered / 20,
      1
    );

  return Math.round(
    accuracy *
    experienceFactor *
    100
  );
}


function updateMastery() {

  player.mastery.arguments =
    calculateArgumentsMastery();

  // Unlock Level 2 later once mastery reaches 80.
  if (
    player.mastery.arguments >= 80 &&
    !player.unlockedLevels.includes("inferences")
  ) {

    player.unlockedLevels.push(
      "inferences"
    );
  }
}


// ==========================================
// QUESTION HISTORY
// ==========================================

function recordQuestionResult(
  question,
  wasCorrect
) {

  if (
    !player.questionHistory[question.id]
  ) {

    player.questionHistory[question.id] = {
      attempts: 0,
      correct: 0,
      incorrect: 0
    };
  }

  const history =
    player.questionHistory[question.id];

  history.attempts++;

  if (wasCorrect) {
    history.correct++;
  } else {
    history.incorrect++;
  }

  history.lastAttempt =
    new Date().toISOString();
}


// ==========================================
// RENDER PLAYER HUD
// ==========================================

function renderHUD() {

  playerLevel.textContent =
    player.level;

  playerXP.textContent =
    player.xp.toLocaleString();

  playerStreak.textContent =
    `🔥 ${player.streak}`;

  masteryPercent.textContent =
    `${player.mastery.arguments}%`;

  masteryBar.style.width =
    `${player.mastery.arguments}%`;


  if (player.totalAnswered === 0) {

    accuracyDisplay.textContent =
      "—";

  } else {

    const accuracy =
      Math.round(
        (
          player.totalCorrect /
          player.totalAnswered
        ) * 100
      );

    accuracyDisplay.textContent =
      `${accuracy}%`;
  }
}


// ==========================================
// RENDER QUESTION
// ==========================================

function renderQuestion() {

  const question =
    questions[currentQuestionIndex];


  selectedAnswer = null;
  answerLocked = false;


  questionNumber.textContent =
    currentQuestionIndex + 1;

  questionTotal.textContent =
    questions.length;


  const progress =
    (
      currentQuestionIndex /
      questions.length
    ) * 100;

  roundProgressBar.style.width =
    `${progress}%`;


  questionTag.textContent =
    question.tag;

  difficulty.textContent =
    `Difficulty: ${question.difficulty}`;

  stimulus.textContent =
    question.stimulus;

  questionPrompt.textContent =
    question.prompt;


  answerContainer.innerHTML = "";


  question.answers.forEach(
    (answer, index) => {

      const button =
        document.createElement("button");

      button.className =
        "answer-button";

      button.dataset.index =
        index;


      const letter =
        String.fromCharCode(
          65 + index
        );


      button.innerHTML = `
        <span class="answer-letter">
          ${letter}
        </span>

        <span class="answer-text">
          ${answer}
        </span>
      `;


      button.addEventListener(
        "click",
        () => selectAnswer(
          index,
          button
        )
      );


      answerContainer.appendChild(
        button
      );
    }
  );


  submitAnswer.disabled = true;

  feedbackPanel.classList.add(
    "hidden"
  );

  feedbackPanel.classList.remove(
    "wrong"
  );

  nextQuestion.classList.add(
    "hidden"
  );


  player.currentRound.questionIndex =
    currentQuestionIndex;

  player.currentRound.answered =
    false;

  savePlayer();
}


// ==========================================
// SELECT ANSWER
// ==========================================

function selectAnswer(
  index,
  button
) {

  if (answerLocked) {
    return;
  }


  selectedAnswer = index;


  document
    .querySelectorAll(
      ".answer-button"
    )
    .forEach((answerButton) => {

      answerButton.classList.remove(
        "selected"
      );
    });


  button.classList.add(
    "selected"
  );


  submitAnswer.disabled = false;
}


// ==========================================
// SUBMIT ANSWER
// ==========================================

function handleSubmit() {

  if (
    selectedAnswer === null ||
    answerLocked
  ) {
    return;
  }


  answerLocked = true;


  const question =
    questions[currentQuestionIndex];

  const wasCorrect =
    selectedAnswer ===
    question.correct;


  const answerButtons =
    document.querySelectorAll(
      ".answer-button"
    );


  answerButtons.forEach(
    (button, index) => {

      button.disabled = true;

      button.classList.remove(
        "selected"
      );


      if (
        index ===
        question.correct
      ) {

        button.classList.add(
          "correct"
        );
      }


      if (
        index === selectedAnswer &&
        !wasCorrect
      ) {

        button.classList.add(
          "incorrect"
        );
      }
    }
  );


  player.totalAnswered++;

  recordQuestionResult(
    question,
    wasCorrect
  );


  if (wasCorrect) {

    player.totalCorrect++;

    player.streak++;

    player.bestStreak =
      Math.max(
        player.bestStreak,
        player.streak
      );


    player.currentRound.correct++;


    const streakBonus =
      Math.min(
        player.streak * 2,
        20
      );


    const earnedXP =
      40 + streakBonus;


    awardXP(
      earnedXP
    );


    showCorrectFeedback(
      question,
      earnedXP
    );


    animateElement(
      playerStreak,
      "streak-pulse"
    );

  } else {

    player.streak = 0;

    showIncorrectFeedback(
      question
    );
  }


  updateMastery();


  player.currentRound.answered =
    true;


  renderHUD();

  savePlayer();


  submitAnswer.disabled =
    true;

  nextQuestion.classList.remove(
    "hidden"
  );
}


// ==========================================
// CORRECT FEEDBACK
// ==========================================

function showCorrectFeedback(
  question,
  xp
) {

  feedbackPanel.classList.remove(
    "hidden",
    "wrong"
  );


  feedbackPanel.querySelector(
    ".feedback-icon"
  ).textContent = "✓";


  feedbackPanel.querySelector(
    ".feedback-label"
  ).textContent = "BUCKET";


  feedbackTitle.textContent =
    question.feedback.title;


  feedbackExplanation.textContent =
    question.feedback.explanation;


  feedbackPanel.querySelector(
    ".feedback-rewards"
  ).innerHTML = `
    <span>+${xp} XP</span>
    <span>🔥 Streak ${player.streak}</span>
  `;
}


// ==========================================
// INCORRECT FEEDBACK
// ==========================================

function showIncorrectFeedback(
  question
) {

  feedbackPanel.classList.remove(
    "hidden"
  );

  feedbackPanel.classList.add(
    "wrong"
  );


  feedbackPanel.querySelector(
    ".feedback-icon"
  ).textContent = "✕";


  feedbackPanel.querySelector(
    ".feedback-label"
  ).textContent =
    "POSSESSION LOST";


  feedbackTitle.textContent =
    "That doesn't follow.";


  feedbackExplanation.textContent =
    question.feedback.explanation;


  feedbackPanel.querySelector(
    ".feedback-rewards"
  ).innerHTML = `
    <span>Review the reasoning</span>
    <span>Streak reset</span>
  `;
}


// ==========================================
// NEXT QUESTION
// ==========================================

function handleNextQuestion() {

  currentQuestionIndex++;


  if (
    currentQuestionIndex >=
    questions.length
  ) {

    finishRound();

    return;
  }


  renderQuestion();

  renderHUD();


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ==========================================
// FINISH ROUND
// ==========================================

function finishRound() {

  roundProgressBar.style.width =
    "100%";


  const roundCorrect =
    player.currentRound.correct;


  const roundAccuracy =
    Math.round(
      (
        roundCorrect /
        questions.length
      ) * 100
    );


  document.querySelector(
    ".question-card"
  ).innerHTML = `

    <div class="question-content">

      <p class="eyebrow">
        ROUND COMPLETE
      </p>

      <h2 class="question-prompt">
        Arguments Training Complete
      </h2>

      <p class="stimulus">
        You answered
        ${roundCorrect}
        of
        ${questions.length}
        questions correctly.

        Round accuracy:
        ${roundAccuracy}%.
      </p>

      <div
        style="
          margin-top: 30px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        "
      >

        <button
          class="submit-button"
          id="restartRound"
        >
          Run It Back
        </button>

      </div>

    </div>
  `;


  feedbackPanel.classList.add(
    "hidden"
  );

  nextQuestion.classList.add(
    "hidden"
  );


  player.currentRound = {
    level: "arguments",
    questionIndex: 0,
    correct: 0,
    answered: false
  };


  savePlayer();


  document
    .querySelector(
      "#restartRound"
    )
    .addEventListener(
      "click",
      restartRound
    );
}


// ==========================================
// RESTART ROUND
// ==========================================

function restartRound() {

  window.location.reload();
}


// ==========================================
// ANIMATION HELPER
// ==========================================

function animateElement(
  element,
  className
) {

  element.classList.remove(
    className
  );


  void element.offsetWidth;


  element.classList.add(
    className
  );


  setTimeout(
    () => {

      element.classList.remove(
        className
      );

    },
    500
  );
}


// ==========================================
// EVENTS
// ==========================================

submitAnswer.addEventListener(
  "click",
  handleSubmit
);


nextQuestion.addEventListener(
  "click",
  handleNextQuestion
);


// ==========================================
// INITIALIZE
// ==========================================

updateMastery();

renderHUD();

renderQuestion();
