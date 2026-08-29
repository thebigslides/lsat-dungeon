// ============================================================
// REASONING LEAGUE — PRIVATE ACCESS GATE
// ============================================================

const ACCESS_HASH = "fa3ee43681cc1754c37e2bd4fdc3a4067dc7c9c182d9f7a6524e9ff1a94499bd";

const ACCESS_STORAGE_KEY = "reasoningLeagueAccess";

const ACCESS_MAX_ATTEMPTS = 5;
const ACCESS_LOCKOUT_MS = 30_000;

const ACCESS_ATTEMPTS_KEY = "reasoningLeagueFailedAttempts";
const ACCESS_LOCKOUT_KEY = "reasoningLeagueLockedUntil";

const accessGate = document.getElementById("accessGate");
const accessForm = document.getElementById("accessForm");
const accessCodeInput = document.getElementById("accessCode");
const accessError = document.getElementById("accessError");
const accessGateCard = document.querySelector(".access-gate-card");

async function sha256(text) {
  const data = new TextEncoder().encode(text);

  const hashBuffer = await crypto.subtle.digest(
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

  accessError.textContent = message;

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

const alreadyUnlocked =
  sessionStorage.getItem(
    ACCESS_STORAGE_KEY
  ) === "granted";

if (alreadyUnlocked && accessGate) {
  accessGate.classList.add(
    "hidden"
  );
}

if (accessForm) {
  accessForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      const now = Date.now();
      const lockedUntil =
        getLockedUntil();

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

      if (lockedUntil !== 0) {
        clearAccessFailures();
      }

      const enteredCode =
        accessCodeInput.value.trim();

      const enteredHash =
        await sha256(
          enteredCode
        );

      if (enteredHash === ACCESS_HASH) {
        accessCodeInput.value = "";

        unlockAccessGate();

        return;
      }

      const failedAttempts =
        getFailedAttempts() + 1;

      setFailedAttempts(
        failedAttempts
      );

      accessCodeInput.value = "";
      accessCodeInput.focus();

      shakeAccessGate();

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
   SAVE SYSTEM
========================================================= */

const SAVE_KEY =
  "loopholeTraining_v2";

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

function cloneDefaultPlayer() {
  return JSON.parse(
    JSON.stringify(
      DEFAULT_PLAYER
    )
  );
}

function loadPlayer() {
  const saved =
    localStorage.getItem(
      SAVE_KEY
    );

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
========================================================= */

const lessons = {

  /* =======================================================
     LESSON 1.1 — WHAT IS AN ARGUMENT?
  ======================================================= */

  "1-1": {
    chapter: 1,
    number: "1.1",

    title:
      "What Is an Argument?",

    concept:
      "arguments",

    xpReward:
      150,

    steps: [
      {
        type: "learn",

        title:
          "What Is an Argument?",

        html: `
          <p>
            Before we can analyze reasoning,
            we first need to recognize when
            reasoning is actually happening.
          </p>

          <div class="concept-box">
            <h3>The Core Idea</h3>

            <p>
              An <strong>argument</strong>
              exists when one or more statements
              are offered as support for another
              statement.
            </p>
          </div>

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
            If no statement is trying to support
            another statement, you probably just
            have a collection of facts.
          </p>
        `
      },

      {
        type: "learn",

        title:
          "Statements Aren't Enough",

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
            These statements all concern the same
            person, but none of them is being used
            to prove another.
          </p>

          <p>
            So we have related statements,
            but not an argument.
          </p>
        `
      },

      {
        type: "question",

        title:
          "Check the Relationship",

        prompt:
          "Does this passage contain an argument?",

        stimulus:
          "The library closes at 8:00 p.m. It contains more than 50,000 books. The building was renovated five years ago.",

        answers: [
          "Yes — because the passage contains multiple statements.",
          "Yes — because all of the statements concern the library.",
          "No — none of the statements is being offered as support for another.",
          "No — arguments must always contain disagreement."
        ],

        correct: 2,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "Exactly.",

          text:
            "The statements are related, but no statement is being offered as evidence for another."
        },

        feedbackWrong: {
          label: "BLOCKED",

          title:
            "Look for support.",

          text:
            "Multiple related statements do not automatically create an argument. Ask whether one claim supports another."
        }
      },

      {
        type: "learn",

        title:
          "Now Add Support",

        html: `
          <p>
            Compare the last example with this:
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

          <div class="logic-flow">
            <div class="logic-node">
              Roads are icy
            </div>

            <div class="logic-arrow">
              ↓ supports ↓
            </div>

            <div class="logic-node conclusion-node">
              Schools should delay opening
            </div>
          </div>

          <p>
            Now one statement is being used as
            a reason to accept another statement.
          </p>

          <p>
            That's an argument.
          </p>
        `
      },

      {
        type: "question",

        title:
          "Argument or Not?",

        prompt:
          "Which best describes the passage?",

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

          title:
            "There's the support relationship.",

          text:
            "The attendance decline is offered as a reason for reconsidering ticket prices."
        },

        feedbackWrong: {
          label: "OFF THE RIM",

          title:
            "Structure first.",

          text:
            "An argument can exist even if the reasoning is weak. The first statement is being offered in support of the recommendation."
        }
      },

      {
        type: "learn",

        title:
          "Bad Arguments Still Count",

        html: `
          <div class="concept-box">
            <h3>
              Argument ≠ Good Argument
            </h3>

            <p>
              The quality of the reasoning is a
              separate question from whether an
              argument exists.
            </p>
          </div>

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
            Terrible reasoning.
            Still an argument.
          </p>

          <p>
            Why? Because the first claim is being
            presented as support for the second.
          </p>
        `
      },

      {
        type: "question",

        title:
          "Bad Argument or No Argument?",

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

          title:
            "Bad reasoning. Still an argument.",

          text:
            "The support is terrible, but support is nevertheless being offered."
        },

        feedbackWrong: {
          label: "BLOCKED",

          title:
            "Don't confuse quality with structure.",

          text:
            "The passage still contains a premise-conclusion relationship even though the reasoning is awful."
        }
      },

      {
        type: "learn",

        title:
          "Mini Drill",

        html: `
          <div class="concept-box">
            <h3>Your Job</h3>

            <p>
              Decide whether each passage contains
              an argument or merely a collection
              of statements.
            </p>
          </div>

          <p>
            Ask:
          </p>

          <p>
            <strong>
              Is one statement being offered
              as support for another?
            </strong>
          </p>
        `
      },

      {
        type: "question",

        title:
          "Mini Drill — 1 of 3",

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

          title:
            "Collection of statements.",

          text:
            "Nothing is being offered as support for anything else."
        },

        feedbackWrong: {
          label: "BLOCKED",

          title:
            "Related facts aren't enough.",

          text:
            "These statements concern the same café, but none supports another."
        }
      },

      {
        type: "question",

        title:
          "Mini Drill — 2 of 3",

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

          title:
            "Argument.",

          text:
            "The financial losses are offered as support for the recommendation."
        },

        feedbackWrong: {
          label: "POSSESSION LOST",

          title:
            "There is support here.",

          text:
            "The first statement gives a reason for accepting the second."
        }
      },

      {
        type: "question",

        title:
          "Mini Drill — 3 of 3",

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

          title:
            "You got it.",

          text:
            "There is no support relationship among the statements."
        },

        feedbackWrong: {
          label: "BLOCKED",

          title:
            "No support relationship.",

          text:
            "All three statements describe the same situation, but none supports another."
        }
      },

      {
        type: "complete",

        title:
          "Lesson Complete",

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
              Arguments contain a
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
  },


  /* =======================================================
     LESSON 1.2 — PREMISES
  ======================================================= */

  "1-2": {
    chapter: 1,
    number: "1.2",

    title:
      "Premises",

    concept:
      "premises",

    xpReward:
      175,

    steps: [
      {
        type: "learn",

        title:
          "Meet the Premise",

        html: `
          <p>
            Once you know you're looking at an
            argument, the next job is figuring
            out which statements provide support.
          </p>

          <div class="concept-box">
            <h3>Premise</h3>

            <p>
              A <strong>premise</strong> is a
              statement offered as a reason for
              accepting another claim.
            </p>
          </div>

          <div class="logic-flow">
            <div class="logic-node">
              PREMISE
            </div>

            <div class="logic-arrow">
              ↓ supports ↓
            </div>

            <div class="logic-node conclusion-node">
              CONCLUSION
            </div>
          </div>
        `
      },

      {
        type: "learn",

        title:
          "Find the Reason",

        html: `
          <p>
            Consider:
          </p>

          <div class="concept-example">
            <p>
              The restaurant received repeated
              complaints about slow service.
            </p>

            <p>
              Therefore, management should increase
              staffing during dinner hours.
            </p>
          </div>

          <p>
            The complaint information is the
            <strong>premise</strong>.
          </p>

          <p>
            It is being offered as the reason for
            the staffing recommendation.
          </p>
        `
      },

      {
        type: "question",

        title:
          "Identify the Premise",

        prompt:
          "Which statement functions as the premise?",

        stimulus:
          "The city's population has grown rapidly during the last decade. Therefore, the city should expand its public transportation system.",

        answers: [
          "The city's population has grown rapidly during the last decade.",
          "The city should expand its public transportation system.",
          "Both statements are premises.",
          "Neither statement is a premise."
        ],

        correct: 0,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "That's the support.",

          text:
            "Population growth is the reason offered for expanding public transportation."
        },

        feedbackWrong: {
          label: "BLOCKED",

          title:
            "Ask what provides the reason.",

          text:
            "The premise is the statement doing the supporting, not the statement being supported."
        }
      },

      {
        type: "learn",

        title:
          "Premise Indicators",

        html: `
          <p>
            Certain words frequently introduce
            premises.
          </p>

          <div class="concept-box">
            <h3>Common Signals</h3>

            <p>
              because • since • given that •
              after all • for
            </p>
          </div>

          <p>
            Example:
          </p>

          <div class="concept-example">
            <p>
              The team should rest its starting
              center <strong>because</strong>
              he has played forty minutes in each
              of the last three games.
            </p>
          </div>

          <p>
            The information following
            <strong>because</strong> is being
            offered as support.
          </p>

          <p>
            These indicators are useful clues,
            but your real job is always to identify
            the logical relationship.
          </p>
        `
      },

      {
        type: "question",

        title:
          "Follow the Indicator",

        prompt:
          "Which statement is the premise?",

        stimulus:
          "The museum should extend its weekend hours because visitor demand is highest on Saturdays and Sundays.",

        answers: [
          "The museum should extend its weekend hours.",
          "Visitor demand is highest on Saturdays and Sundays.",
          "Both statements are conclusions.",
          "The sentence contains no argument."
        ],

        correct: 1,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "Because points to the reason.",

          text:
            "High weekend demand is the evidence supporting the recommendation."
        },

        feedbackWrong: {
          label: "OFF THE RIM",

          title:
            "Follow the support.",

          text:
            "The recommendation is what the author wants you to accept. The demand information is why."
        }
      },

      {
        type: "learn",

        title:
          "Premises Can Appear Anywhere",

        html: `
          <p>
            Premises do not have to appear before
            the conclusion.
          </p>

          <div class="concept-example">
            <p>
              The county should repair the bridge
              immediately.
            </p>

            <p>
              Engineers have found significant
              structural deterioration.
            </p>
          </div>

          <p>
            Even though the supporting statement
            appears second, it is still the premise.
          </p>

          <div class="concept-box">
            <h3>Don't rely on order.</h3>

            <p>
              Rely on function.
            </p>
          </div>
        `
      },

      {
        type: "question",

        title:
          "Premise After the Conclusion",

        prompt:
          "Which statement is the premise?",

        stimulus:
          "The company should replace the old server. The current server crashes several times each week.",

        answers: [
          "The company should replace the old server.",
          "The current server crashes several times each week.",
          "Both.",
          "Neither."
        ],

        correct: 1,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "Position doesn't matter.",

          text:
            "The crashes provide support for replacing the server."
        },

        feedbackWrong: {
          label: "BLOCKED",

          title:
            "Don't assume first means premise.",

          text:
            "The recommendation comes first, but the crash information supplies the reason."
        }
      },

      {
        type: "learn",

        title:
          "Mini Drill",

        html: `
          <p>
            Now isolate the supporting statement
            in each argument.
          </p>

          <div class="concept-box">
            <h3>Ask:</h3>

            <p>
              Which statement is functioning as
              the reason?
            </p>
          </div>
        `
      },

      {
        type: "question",

        title:
          "Premise Drill — 1 of 3",

        drill: true,

        prompt:
          "Which claim is the premise?",

        stimulus:
          "Because rainfall has been unusually low this year, residents should reduce unnecessary water use.",

        answers: [
          "Rainfall has been unusually low this year.",
          "Residents should reduce unnecessary water use."
        ],

        correct: 0,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "Premise identified.",

          text:
            "Low rainfall supports the recommendation about water use."
        },

        feedbackWrong: {
          label: "BLOCKED",

          title:
            "That's the supported claim.",

          text:
            "The water-use recommendation is what the author wants us to accept."
        }
      },

      {
        type: "question",

        title:
          "Premise Drill — 2 of 3",

        drill: true,

        prompt:
          "Which claim is the premise?",

        stimulus:
          "The school should add another bus route. Many students currently spend more than ninety minutes commuting each morning.",

        answers: [
          "The school should add another bus route.",
          "Many students spend more than ninety minutes commuting each morning."
        ],

        correct: 1,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "That's the reason.",

          text:
            "The lengthy commute supports the proposal for another bus route."
        },

        feedbackWrong: {
          label: "OFF THE RIM",

          title:
            "That's the conclusion.",

          text:
            "Ask why the school should add the route. The commute information answers that question."
        }
      },

      {
        type: "question",

        title:
          "Premise Drill — 3 of 3",

        drill: true,

        prompt:
          "Which claim is the premise?",

        stimulus:
          "The park receives very little use during winter, so the city should concentrate maintenance spending there during the summer.",

        answers: [
          "The park receives very little use during winter.",
          "The city should concentrate maintenance spending there during the summer."
        ],

        correct: 0,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "Correct.",

          text:
            "The winter-use information supplies the support."
        },

        feedbackWrong: {
          label: "BLOCKED",

          title:
            "That's the recommendation.",

          text:
            "The low winter usage is the fact used to support it."
        }
      },

      {
        type: "complete",

        title:
          "Lesson Complete",

        html: `
          <div class="completion-screen">
            <div class="completion-symbol">
              🏀
            </div>

            <p class="eyebrow">
              FINAL BUZZER
            </p>

            <h2>
              Premises Complete
            </h2>

            <p>
              A premise is a statement that
              <strong>provides support</strong>.
            </p>

            <div class="completion-summary">
              <div>
                <span>Concept</span>
                <strong>Premises</strong>
              </div>

              <div>
                <span>Reward</span>
                <strong>+175 XP</strong>
              </div>

              <div>
                <span>Next</span>
                <strong>Conclusions</strong>
              </div>
            </div>
          </div>
        `
      }
    ]
  },


  /* =======================================================
     LESSON 1.3 — CONCLUSIONS
  ======================================================= */

  "1-3": {
    chapter: 1,
    number: "1.3",

    title:
      "Conclusions",

    concept:
      "conclusions",

    xpReward:
      175,

    steps: [
      {
        type: "learn",

        title:
          "Meet the Conclusion",

        html: `
          <p>
            If premises are doing the supporting,
            something has to be receiving that
            support.
          </p>

          <div class="concept-box">
            <h3>Conclusion</h3>

            <p>
              The <strong>conclusion</strong> is
              the claim the author is trying to
              establish using the premises.
            </p>
          </div>

          <div class="logic-flow">
            <div class="logic-node">
              PREMISE
            </div>

            <div class="logic-arrow">
              ↓ supports ↓
            </div>

            <div class="logic-node conclusion-node">
              CONCLUSION
            </div>
          </div>
        `
      },

      {
        type: "learn",

        title:
          "Ask What the Author Wants",

        html: `
          <p>
            Consider:
          </p>

          <div class="concept-example">
            <p>
              The parking garage is full by
              8:30 every weekday morning.
            </p>

            <p>
              Therefore, the university should
              construct additional parking.
            </p>
          </div>

          <p>
            The author gives us a fact and then
            uses it to support a recommendation.
          </p>

          <p>
            The recommendation is the conclusion.
          </p>
        `
      },

      {
        type: "question",

        title:
          "Identify the Conclusion",

        prompt:
          "Which statement is the conclusion?",

        stimulus:
          "Local rents have risen dramatically while wages have remained nearly unchanged. Therefore, the city should increase its supply of affordable housing.",

        answers: [
          "Local rents have risen dramatically.",
          "Wages have remained nearly unchanged.",
          "The city should increase its supply of affordable housing.",
          "All three statements are conclusions."
        ],

        correct: 2,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "That's what the argument is trying to establish.",

          text:
            "The rent and wage facts support the recommendation about affordable housing."
        },

        feedbackWrong: {
          label: "BLOCKED",

          title:
            "Ask what receives the support.",

          text:
            "The conclusion is the claim the author wants you to accept because of the other information."
        }
      },

      {
        type: "learn",

        title:
          "Conclusion Indicators",

        html: `
          <p>
            Certain words frequently announce
            conclusions.
          </p>

          <div class="concept-box">
            <h3>Common Signals</h3>

            <p>
              therefore • thus • hence •
              consequently • so
            </p>
          </div>

          <p>
            Example:
          </p>

          <div class="concept-example">
            <p>
              The building failed its most recent
              safety inspection.
            </p>

            <p>
              <strong>Therefore</strong>,
              the building should remain closed
              until repairs are completed.
            </p>
          </div>

          <p>
            Indicators help, but they are clues,
            not magic words.
          </p>
        `
      },

      {
        type: "question",

        title:
          "Follow the Indicator",

        prompt:
          "Which statement is the conclusion?",

        stimulus:
          "The battery repeatedly overheats during normal use. Thus, the manufacturer should investigate the product before shipping more units.",

        answers: [
          "The battery repeatedly overheats.",
          "The manufacturer should investigate the product before shipping more units.",
          "Both statements.",
          "Neither statement."
        ],

        correct: 1,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "Thus points to the conclusion.",

          text:
            "The overheating problem supports the recommendation to investigate."
        },

        feedbackWrong: {
          label: "OFF THE RIM",

          title:
            "Follow the direction of support.",

          text:
            "The overheating fact is the reason; the investigation recommendation is what that reason supports."
        }
      },

      {
        type: "learn",

        title:
          "Conclusion Can Come First",

        html: `
          <p>
            The conclusion does not have to appear
            at the end.
          </p>

          <div class="concept-example">
            <p>
              The team should change its defensive
              strategy.
            </p>

            <p>
              Opponents have scored efficiently
              against the current scheme for six
              consecutive games.
            </p>
          </div>

          <p>
            The first sentence is still the
            conclusion because the second provides
            the support.
          </p>
        `
      },

      {
        type: "question",

        title:
          "Conclusion First",

        prompt:
          "Which statement is the conclusion?",

        stimulus:
          "The town should replace the damaged water pipes. Several major leaks have occurred this month alone.",

        answers: [
          "The town should replace the damaged water pipes.",
          "Several major leaks have occurred this month alone.",
          "Both.",
          "Neither."
        ],

        correct: 0,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "Correct.",

          text:
            "The leak information supports the recommendation, even though the recommendation appears first."
        },

        feedbackWrong: {
          label: "BLOCKED",

          title:
            "Don't rely on sentence order.",

          text:
            "Ask which claim the other statement is trying to prove."
        }
      },

      {
        type: "learn",

        title:
          "The Why Test",

        html: `
          <p>
            One useful way to check your conclusion
            identification is the <strong>why test</strong>.
          </p>

          <div class="concept-box">
            <h3>Ask:</h3>

            <p>
              Why should I believe this claim?
            </p>
          </div>

          <p>
            If the rest of the argument answers
            that question, you probably found the
            conclusion.
          </p>
        `
      },

      {
        type: "question",

        title:
          "Conclusion Drill — 1 of 3",

        drill: true,

        prompt:
          "Which claim is the conclusion?",

        stimulus:
          "Sales increased after the store began opening earlier. Therefore, the store should maintain its new opening time.",

        answers: [
          "Sales increased after the store began opening earlier.",
          "The store should maintain its new opening time."
        ],

        correct: 1,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "Conclusion identified.",

          text:
            "The sales increase is the reason; maintaining the opening time is the supported claim."
        },

        feedbackWrong: {
          label: "BLOCKED",

          title:
            "That's the evidence.",

          text:
            "Ask what the sales increase is being used to support."
        }
      },

      {
        type: "question",

        title:
          "Conclusion Drill — 2 of 3",

        drill: true,

        prompt:
          "Which claim is the conclusion?",

        stimulus:
          "The restaurant should simplify its menu, since customers regularly complain that ordering takes too long.",

        answers: [
          "The restaurant should simplify its menu.",
          "Customers regularly complain that ordering takes too long."
        ],

        correct: 0,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "Correct.",

          text:
            "The complaint information supports the menu recommendation."
        },

        feedbackWrong: {
          label: "OFF THE RIM",

          title:
            "Since introduces support.",

          text:
            "The customer complaints are the reason, not the conclusion."
        }
      },

      {
        type: "question",

        title:
          "Conclusion Drill — 3 of 3",

        drill: true,

        prompt:
          "Which claim is the conclusion?",

        stimulus:
          "Several nearby hospitals have adopted the new scheduling system successfully. So this hospital should consider adopting it as well.",

        answers: [
          "Several nearby hospitals successfully adopted the scheduling system.",
          "This hospital should consider adopting the scheduling system."
        ],

        correct: 1,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "Exactly.",

          text:
            "The experience of nearby hospitals supports the recommendation."
        },

        feedbackWrong: {
          label: "BLOCKED",

          title:
            "That's the supporting information.",

          text:
            "The author uses those hospitals as a reason for the recommendation."
        }
      },

      {
        type: "complete",

        title:
          "Lesson Complete",

        html: `
          <div class="completion-screen">
            <div class="completion-symbol">
              🏀
            </div>

            <p class="eyebrow">
              FINAL BUZZER
            </p>

            <h2>
              Conclusions Complete
            </h2>

            <p>
              The conclusion is the claim
              <strong>receiving support</strong>.
            </p>

            <div class="completion-summary">
              <div>
                <span>Concept</span>
                <strong>Conclusions</strong>
              </div>

              <div>
                <span>Reward</span>
                <strong>+175 XP</strong>
              </div>

              <div>
                <span>Next</span>
                <strong>Premise Sets</strong>
              </div>
            </div>
          </div>
        `
      }
    ]
  },


  /* =======================================================
     LESSON 1.4 — PREMISE SETS
  ======================================================= */

  "1-4": {
    chapter: 1,
    number: "1.4",

    title:
      "Premise Sets",

    concept:
      "premiseSets",

    xpReward:
      200,

    steps: [
      {
        type: "learn",

        title:
          "Arguments Can Use Multiple Premises",

        html: `
          <p>
            Many arguments contain more than one
            supporting statement.
          </p>

          <div class="concept-box">
            <h3>Premise Set</h3>

            <p>
              A <strong>premise set</strong> is
              the collection of statements working
              together to support a conclusion.
            </p>
          </div>

          <div class="logic-flow">
            <div class="logic-node">
              PREMISE 1
            </div>

            <div class="logic-node">
              PREMISE 2
            </div>

            <div class="logic-arrow">
              ↓ together support ↓
            </div>

            <div class="logic-node conclusion-node">
              CONCLUSION
            </div>
          </div>
        `
      },

      {
        type: "learn",

        title:
          "Support Can Accumulate",

        html: `
          <div class="concept-example">
            <p>
              The office computers are more than
              eight years old.
            </p>

            <p>
              Repair costs have increased every
              year.
            </p>

            <p>
              Employees regularly report system
              failures.
            </p>

            <p>
              Therefore, the company should replace
              the computers.
            </p>
          </div>

          <p>
            All three facts contribute support
            to the same conclusion.
          </p>
        `
      },

      {
        type: "question",

        title:
          "Count the Premises",

        prompt:
          "How many premises support the conclusion?",

        stimulus:
          "The neighborhood's population has increased. Traffic congestion has also worsened. Public buses are frequently overcrowded. Therefore, the city should expand transit service in the neighborhood.",

        answers: [
          "One",
          "Two",
          "Three",
          "Four"
        ],

        correct: 2,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "Three supporting claims.",

          text:
            "Population growth, congestion, and overcrowded buses all support the transit recommendation."
        },

        feedbackWrong: {
          label: "BLOCKED",

          title:
            "Separate support from the conclusion.",

          text:
            "Three factual claims provide support; the final recommendation is the conclusion."
        }
      },

      {
        type: "learn",

        title:
          "Independent Support",

        html: `
          <p>
            Sometimes multiple premises each give
            their own reason for accepting the
            conclusion.
          </p>

          <div class="concept-example">
            <p>
              The building's roof leaks badly.
            </p>

            <p>
              Its electrical system is outdated.
            </p>

            <p>
              Therefore, the building requires
              major renovation.
            </p>
          </div>

          <p>
            Either problem gives us some reason
            for renovation.
          </p>

          <p>
            Together, they strengthen the case.
          </p>
        `
      },

      {
        type: "question",

        title:
          "Find the Whole Premise Set",

        prompt:
          "Which statements make up the premise set?",

        stimulus:
          "Customer wait times have doubled, and complaint volume has increased sharply. Therefore, the company should revise its service process.",

        answers: [
          "Only the customer wait-time statement.",
          "Only the complaint-volume statement.",
          "Both the wait-time and complaint-volume statements.",
          "The recommendation itself."
        ],

        correct: 2,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "Both support the conclusion.",

          text:
            "The argument uses two pieces of evidence to support revising the service process."
        },

        feedbackWrong: {
          label: "OFF THE RIM",

          title:
            "Don't leave support on the bench.",

          text:
            "Both factual claims contribute to the argument's support."
        }
      },

      {
        type: "learn",

        title:
          "Linked Support",

        html: `
          <p>
            Sometimes premises matter most when
            combined.
          </p>

          <div class="concept-example">
            <p>
              Anyone who enters the laboratory
              must wear protective eyewear.
            </p>

            <p>
              Maya is entering the laboratory.
            </p>

            <p>
              Therefore, Maya must wear protective
              eyewear.
            </p>
          </div>

          <p>
            The first premise gives us the rule.
          </p>

          <p>
            The second tells us Maya falls under
            that rule.
          </p>

          <p>
            Together, they support the conclusion.
          </p>
        `
      },

      {
        type: "question",

        title:
          "Linked Premises",

        prompt:
          "Why are both premises important?",

        stimulus:
          "Every employee who handles confidential records must complete security training. Jordan handles confidential records. Therefore, Jordan must complete security training.",

        answers: [
          "The first premise alone proves Jordan handles confidential records.",
          "The second premise alone establishes the training rule.",
          "One premise supplies the rule and the other places Jordan under that rule.",
          "The conclusion does not depend on either premise."
        ],

        correct: 2,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "That's linked support.",

          text:
            "The rule and Jordan's status work together to establish the conclusion."
        },

        feedbackWrong: {
          label: "BLOCKED",

          title:
            "Both pieces are doing work.",

          text:
            "One gives the general rule; the other tells us the rule applies to Jordan."
        }
      },

      {
        type: "learn",

        title:
          "Separate Background From Support",

        html: `
          <p>
            Not every sentence in an argument must
            belong to the premise set.
          </p>

          <div class="concept-box">
            <h3>Your Question</h3>

            <p>
              Does this statement actually provide
              a reason for accepting the conclusion?
            </p>
          </div>

          <p>
            A sentence may simply provide context
            or description.
          </p>
        `
      },

      {
        type: "question",

        title:
          "Premise Set Drill — 1 of 3",

        drill: true,

        prompt:
          "Which claims support the conclusion?",

        stimulus:
          "The gym opened in 1998. Membership has fallen for three consecutive years. Equipment complaints have increased. Therefore, the gym should modernize its facilities.",

        answers: [
          "Only the fact that the gym opened in 1998.",
          "Falling membership and increased equipment complaints.",
          "All three factual statements.",
          "None of the factual statements."
        ],

        correct: 1,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "You separated background from support.",

          text:
            "The opening year is descriptive background. Falling membership and equipment complaints support modernization."
        },

        feedbackWrong: {
          label: "BLOCKED",

          title:
            "Not every fact is a premise.",

          text:
            "Ask which facts actually make modernization more reasonable."
        }
      },

      {
        type: "question",

        title:
          "Premise Set Drill — 2 of 3",

        drill: true,

        prompt:
          "How many premises are working together?",

        stimulus:
          "Every licensed driver must pass the road test. Elena has not passed the road test. Therefore, Elena is not yet a licensed driver.",

        answers: [
          "One",
          "Two",
          "Three",
          "None"
        ],

        correct: 1,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "Two premises.",

          text:
            "The rule and Elena's failure to satisfy it work together."
        },

        feedbackWrong: {
          label: "OFF THE RIM",

          title:
            "Count the supporting claims.",

          text:
            "There are two premises followed by one conclusion."
        }
      },

      {
        type: "question",

        title:
          "Premise Set Drill — 3 of 3",

        drill: true,

        prompt:
          "Which description is best?",

        stimulus:
          "The restaurant's rent increased substantially. Food costs also rose this year. The owner should therefore review the restaurant's pricing strategy.",

        answers: [
          "Two premises support one conclusion.",
          "One premise supports two conclusions.",
          "Three unrelated statements appear.",
          "There is no argument."
        ],

        correct: 0,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "Two-on-one support.",

          text:
            "Higher rent and higher food costs both support reviewing prices."
        },

        feedbackWrong: {
          label: "BLOCKED",

          title:
            "Map the support.",

          text:
            "Two cost increases serve as premises for one recommendation."
        }
      },

      {
        type: "complete",

        title:
          "Lesson Complete",

        html: `
          <div class="completion-screen">
            <div class="completion-symbol">
              🏀
            </div>

            <p class="eyebrow">
              FINAL BUZZER
            </p>

            <h2>
              Premise Sets Complete
            </h2>

            <p>
              Arguments can use multiple premises
              <strong>working together</strong>.
            </p>

            <div class="completion-summary">
              <div>
                <span>Concept</span>
                <strong>Premise Sets</strong>
              </div>

              <div>
                <span>Reward</span>
                <strong>+200 XP</strong>
              </div>

              <div>
                <span>Next</span>
                <strong>Valid & Invalid Conclusions</strong>
              </div>
            </div>
          </div>
        `
      }
    ]
  },


  /* =======================================================
     LESSON 1.5 — VALID & INVALID CONCLUSIONS
  ======================================================= */

  "1-5": {
    chapter: 1,
    number: "1.5",

    title:
      "Valid & Invalid Conclusions",

    concept:
      "inferences",

    xpReward:
      225,

    steps: [
      {
        type: "learn",

        title:
          "What Can the Premises Actually Support?",

        html: `
          <p>
            Once you've identified the premises,
            you can ask a deeper question:
          </p>

          <div class="concept-box">
            <h3>
              What follows from this information?
            </h3>

            <p>
              A conclusion must stay within the
              logical limits of the premises.
            </p>
          </div>

          <p>
            The premises give you a certain amount
            of information.
          </p>

          <p>
            Your conclusion cannot magically add
            facts that were never established.
          </p>
        `
      },

      {
        type: "learn",

        title:
          "Guaranteed vs Possible",

        html: `
          <p>
            Suppose:
          </p>

          <div class="concept-example">
            <p>
              Every player on the team attended
              practice.
            </p>

            <p>
              Andre is a player on the team.
            </p>
          </div>

          <p>
            We can safely conclude:
          </p>

          <div class="concept-box">
            <p>
              Andre attended practice.
            </p>
          </div>

          <p>
            Why?
          </p>

          <p>
            Because the premises guarantee it.
          </p>
        `
      },

      {
        type: "question",

        title:
          "What Must Follow?",

        prompt:
          "Which conclusion is guaranteed by the premises?",

        stimulus:
          "Every student enrolled in the seminar submitted the research paper. Priya is enrolled in the seminar.",

        answers: [
          "Priya submitted the research paper.",
          "Priya received the highest grade.",
          "Priya enjoyed writing the research paper.",
          "Priya is the only student enrolled in the seminar."
        ],

        correct: 0,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "Guaranteed.",

          text:
            "The general rule applies directly to Priya."
        },

        feedbackWrong: {
          label: "BLOCKED",

          title:
            "Don't add information.",

          text:
            "The premises tell us nothing about grades, enjoyment, or how many students are enrolled."
        }
      },

      {
        type: "learn",

        title:
          "The Could-Be-True Trap",

        html: `
          <p>
            A conclusion may sound reasonable
            without actually being guaranteed.
          </p>

          <div class="concept-example">
            <p>
              Three employees arrived before
              8:00 a.m.
            </p>
          </div>

          <p>
            Could one of them have arrived at
            7:30?
          </p>

          <p>
            Sure.
          </p>

          <p>
            But do we <strong>know</strong> that
            anyone arrived at exactly 7:30?
          </p>

          <p>
            No.
          </p>

          <div class="concept-box">
            <h3>
              Possible is not the same as proven.
            </h3>
          </div>
        `
      },

      {
        type: "question",

        title:
          "Possible or Guaranteed?",

        prompt:
          "Which conclusion must be true?",

        stimulus:
          "At least one member of the committee voted against the proposal.",

        answers: [
          "Exactly one member voted against the proposal.",
          "Some member of the committee voted against the proposal.",
          "Most members voted against the proposal.",
          "The proposal failed."
        ],

        correct: 1,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "Stay inside the evidence.",

          text:
            "At least one guarantees that some member voted against it, but tells us nothing more specific."
        },

        feedbackWrong: {
          label: "OFF THE RIM",

          title:
            "You're adding certainty.",

          text:
            "The premise guarantees only that one or more committee members voted against the proposal."
        }
      },

      {
        type: "learn",

        title:
          "Watch Strong Language",

        html: `
          <p>
            Conclusions using words like
            <strong>all</strong>,
            <strong>none</strong>,
            <strong>always</strong>,
            or
            <strong>must</strong>
            require strong support.
          </p>

          <div class="concept-example">
            <p>
              Several customers complained about
              the new menu.
            </p>

            <p>
              Therefore, all customers dislike
              the new menu.
            </p>
          </div>

          <p>
            That conclusion goes far beyond the
            evidence.
          </p>

          <p>
            Several is not all.
          </p>
        `
      },

      {
        type: "question",

        title:
          "Spot the Overreach",

        prompt:
          "Which conclusion is best supported?",

        stimulus:
          "Several residents reported difficulty finding parking downtown last weekend.",

        answers: [
          "No one can ever find parking downtown.",
          "Some residents had difficulty finding parking downtown last weekend.",
          "Every downtown parking space was occupied all weekend.",
          "The city must build a new parking garage."
        ],

        correct: 1,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "No overreach.",

          text:
            "The conclusion simply restates what the premise guarantees."
        },

        feedbackWrong: {
          label: "BLOCKED",

          title:
            "The conclusion got too strong.",

          text:
            "The premise supports a limited claim about some residents during one weekend."
        }
      },

      {
        type: "learn",

        title:
          "Don't Reverse the Relationship",

        html: `
          <p>
            Consider:
          </p>

          <div class="concept-example">
            <p>
              Every surgeon in the hospital
              completed medical school.
            </p>
          </div>

          <p>
            Does that mean everyone who completed
            medical school is a surgeon at the
            hospital?
          </p>

          <p>
            No.
          </p>

          <div class="concept-box">
            <h3>
              A relationship does not automatically
              work in reverse.
            </h3>
          </div>
        `
      },

      {
        type: "question",

        title:
          "Don't Reverse It",

        prompt:
          "Which conclusion follows?",

        stimulus:
          "Every member of the varsity team passed the fitness test. Carlos passed the fitness test.",

        answers: [
          "Carlos must be on the varsity team.",
          "Carlos could be on the varsity team, but the premises do not establish that he is.",
          "Carlos cannot be on the varsity team.",
          "No varsity player passed the fitness test."
        ],

        correct: 1,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "Exactly.",

          text:
            "Passing the test is required of varsity players, but other people may pass it too."
        },

        feedbackWrong: {
          label: "BLOCKED",

          title:
            "You reversed the rule.",

          text:
            "Varsity player → passed test does not establish passed test → varsity player."
        }
      },

      {
        type: "learn",

        title:
          "Inference Drill",

        html: `
          <p>
            Final possessions.
          </p>

          <div class="concept-box">
            <h3>Your Job</h3>

            <p>
              Select only what the premises
              actually establish.
            </p>
          </div>
        `
      },

      {
        type: "question",

        title:
          "Inference Drill — 1 of 3",

        drill: true,

        prompt:
          "Which conclusion must be true?",

        stimulus:
          "No electric vehicle in the fleet uses gasoline. Vehicle 12 is an electric vehicle in the fleet.",

        answers: [
          "Vehicle 12 does not use gasoline.",
          "Vehicle 12 is the newest vehicle in the fleet.",
          "Vehicle 12 is the most efficient vehicle in the fleet.",
          "Every vehicle in the fleet is electric."
        ],

        correct: 0,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "Direct inference.",

          text:
            "Vehicle 12 falls within the group described by the rule."
        },

        feedbackWrong: {
          label: "BLOCKED",

          title:
            "Only one fact is guaranteed.",

          text:
            "The premises establish nothing about age, efficiency, or the rest of the fleet."
        }
      },

      {
        type: "question",

        title:
          "Inference Drill — 2 of 3",

        drill: true,

        prompt:
          "Which conclusion is properly supported?",

        stimulus:
          "Some applicants have previous legal experience.",

        answers: [
          "All applicants have previous legal experience.",
          "No applicants lack legal experience.",
          "At least one applicant has previous legal experience.",
          "Exactly half of the applicants have legal experience."
        ],

        correct: 2,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "That's all we know.",

          text:
            "Some guarantees at least one, but nothing stronger."
        },

        feedbackWrong: {
          label: "OFF THE RIM",

          title:
            "Too much certainty.",

          text:
            "The premise does not establish all, none, or an exact proportion."
        }
      },

      {
        type: "question",

        title:
          "Inference Drill — 3 of 3",

        drill: true,

        prompt:
          "Which conclusion follows from the premises?",

        stimulus:
          "Every judge in the panel is an attorney. Morgan is a judge in the panel.",

        answers: [
          "Morgan is an attorney.",
          "Every attorney is a judge.",
          "Morgan is the most experienced attorney.",
          "Morgan is the only judge in the panel."
        ],

        correct: 0,

        feedbackCorrect: {
          label: "BUCKET",

          title:
            "Clean inference.",

          text:
            "Morgan belongs to the group, so the rule applies."
        },

        feedbackWrong: {
          label: "BLOCKED",

          title:
            "Don't add or reverse.",

          text:
            "The premises establish only that Morgan is an attorney."
        }
      },

      {
        type: "complete",

        title:
          "Lesson Complete",

        html: `
          <div class="completion-screen">
            <div class="completion-symbol">
              🏆
            </div>

            <p class="eyebrow">
              FINAL BUZZER
            </p>

            <h2>
              Chapter Lessons Complete
            </h2>

            <p>
              You can now identify arguments,
              premises, conclusions, premise sets,
              and basic valid inferences.
            </p>

            <div class="completion-summary">
              <div>
                <span>Concept</span>
                <strong>Inferences</strong>
              </div>

              <div>
                <span>Reward</span>
                <strong>+225 XP</strong>
              </div>

              <div>
                <span>Next</span>
                <strong>Chapter Championship</strong>
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
  document.querySelector(
    "#playerLevel"
  );

const playerXP =
  document.querySelector(
    "#playerXP"
  );

const playerStreak =
  document.querySelector(
    "#playerStreak"
  );

const totalAnswered =
  document.querySelector(
    "#totalAnswered"
  );

const overallAccuracy =
  document.querySelector(
    "#overallAccuracy"
  );

const bestStreak =
  document.querySelector(
    "#bestStreak"
  );


/* =========================================================
   DOM REFERENCES — DASHBOARD
========================================================= */

const courseProgressPercent =
  document.querySelector(
    "#courseProgressPercent"
  );

const courseProgressBar =
  document.querySelector(
    "#courseProgressBar"
  );

const chapterMastery =
  document.querySelector(
    "#chapterMastery"
  );

const chapterMasteryBar =
  document.querySelector(
    "#chapterMasteryBar"
  );

const lessonProgress =
  document.querySelector(
    "#lessonProgress"
  );

const currentObjective =
  document.querySelector(
    "#currentObjective"
  );

const continueTraining =
  document.querySelector(
    "#continueTraining"
  );


/* =========================================================
   DOM REFERENCES — MASTERY
========================================================= */

const argumentsMastery =
  document.querySelector(
    "#argumentsMastery"
  );

const argumentsMasteryBar =
  document.querySelector(
    "#argumentsMasteryBar"
  );

const premisesMastery =
  document.querySelector(
    "#premisesMastery"
  );

const premisesMasteryBar =
  document.querySelector(
    "#premisesMasteryBar"
  );

const conclusionsMastery =
  document.querySelector(
    "#conclusionsMastery"
  );

const conclusionsMasteryBar =
  document.querySelector(
    "#conclusionsMasteryBar"
  );

const premiseSetsMastery =
  document.querySelector(
    "#premiseSetsMastery"
  );

const premiseSetsMasteryBar =
  document.querySelector(
    "#premiseSetsMasteryBar"
  );

const inferencesMastery =
  document.querySelector(
    "#inferencesMastery"
  );

const inferencesMasteryBar =
  document.querySelector(
    "#inferencesMasteryBar"
  );


/* =========================================================
   DOM REFERENCES — LESSON
========================================================= */

const lessonScreen =
  document.querySelector(
    "#lessonScreen"
  );

const exitLesson =
  document.querySelector(
    "#exitLesson"
  );

const lessonProgressText =
  document.querySelector(
    "#lessonProgressText"
  );

const lessonScreenProgressBar =
  document.querySelector(
    "#lessonScreenProgressBar"
  );

const lessonStageType =
  document.querySelector(
    "#lessonStageType"
  );

const lessonStageTitle =
  document.querySelector(
    "#lessonStageTitle"
  );

const lessonBody =
  document.querySelector(
    "#lessonBody"
  );

const interactionArea =
  document.querySelector(
    "#interactionArea"
  );

const lessonFeedback =
  document.querySelector(
    "#lessonFeedback"
  );

const lessonFeedbackIcon =
  document.querySelector(
    "#lessonFeedbackIcon"
  );

const lessonFeedbackLabel =
  document.querySelector(
    "#lessonFeedbackLabel"
  );

const lessonFeedbackTitle =
  document.querySelector(
    "#lessonFeedbackTitle"
  );

const lessonFeedbackText =
  document.querySelector(
    "#lessonFeedbackText"
  );

const previousLessonStep =
  document.querySelector(
    "#previousLessonStep"
  );

const nextLessonStep =
  document.querySelector(
    "#nextLessonStep"
  );

const stepCounter =
  document.querySelector(
    "#stepCounter"
  );


/* =========================================================
   DOM REFERENCES — CHAPTER TEST
========================================================= */

const chapterTestCard =
  document.querySelector(
    "#chapterTestCard"
  );

const startChapterTest =
  document.querySelector(
    "#startChapterTest"
  );


/* =========================================================
   DOM REFERENCES — BASKETBALL
========================================================= */

const basketballStage =
  document.querySelector(
    "#basketballStage"
  );

const pixelCourt =
  document.querySelector(
    "#pixelCourt"
  );

const pixelPlayer =
  document.querySelector(
    "#pixelPlayer"
  );

const pixelDefender =
  document.querySelector(
    "#pixelDefender"
  );

const pixelBall =
  document.querySelector(
    "#pixelBall"
  );

const pixelHoop =
  document.querySelector(
    "#pixelHoop"
  );

const shotResult =
  document.querySelector(
    "#shotResult"
  );

const playerScore =
  document.querySelector(
    "#playerScore"
  );

const opponentScore =
  document.querySelector(
    "#opponentScore"
  );

const possessionNumber =
  document.querySelector(
    "#possessionNumber"
  );


/* =========================================================
   CURRENT LESSON STATE
========================================================= */

let activeLessonID = null;
let activeLesson = null;

let currentStepIndex = 0;
let currentSelection = null;

let currentQuestionAnswered =
  false;

let lessonCorrect = 0;

let lessonQuestionsAnswered =
  0;


/* =========================================================
   BASKETBALL GAME STATE
========================================================= */

let gamePlayerScore = 0;
let gameOpponentScore = 0;
let gamePossession = 1;

let shotAnimationPlaying =
  false;


/* =========================================================
   UTILITIES
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

  if (playerLevel) {
    playerLevel.textContent =
      player.level;
  }

  if (playerXP) {
    playerXP.textContent =
      player.xp.toLocaleString();
  }

  if (playerStreak) {
    playerStreak.textContent =
      `🔥 ${player.streak}`;
  }

  if (totalAnswered) {
    totalAnswered.textContent =
      player.totalAnswered;
  }

  if (bestStreak) {
    bestStreak.textContent =
      player.bestStreak;
  }

  if (overallAccuracy) {
    if (
      player.totalAnswered === 0
    ) {
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
      lesson =>
        lesson.completed
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

  if (lessonProgress) {
    lessonProgress.textContent =
      `${completed} / 5 Complete`;
  }

  if (chapterMastery) {
    chapterMastery.textContent =
      `${progress}%`;
  }

  if (chapterMasteryBar) {
    chapterMasteryBar.style.width =
      `${progress}%`;
  }

  if (courseProgressPercent) {
    courseProgressPercent.textContent =
      `${progress}%`;
  }

  if (courseProgressBar) {
    courseProgressBar.style.width =
      `${progress}%`;
  }
}


/* =========================================================
   CONCEPT MASTERY
========================================================= */

function renderConceptMastery() {
  const mastery =
    player.conceptMastery;

  if (argumentsMastery) {
    argumentsMastery.textContent =
      `${mastery.arguments}%`;
  }

  if (argumentsMasteryBar) {
    argumentsMasteryBar.style.width =
      `${mastery.arguments}%`;
  }

  if (premisesMastery) {
    premisesMastery.textContent =
      `${mastery.premises}%`;
  }

  if (premisesMasteryBar) {
    premisesMasteryBar.style.width =
      `${mastery.premises}%`;
  }

  if (conclusionsMastery) {
    conclusionsMastery.textContent =
      `${mastery.conclusions}%`;
  }

  if (conclusionsMasteryBar) {
    conclusionsMasteryBar.style.width =
      `${mastery.conclusions}%`;
  }

  if (premiseSetsMastery) {
    premiseSetsMastery.textContent =
      `${mastery.premiseSets}%`;
  }

  if (premiseSetsMasteryBar) {
    premiseSetsMasteryBar.style.width =
      `${mastery.premiseSets}%`;
  }

  if (inferencesMastery) {
    inferencesMastery.textContent =
      `${mastery.inferences}%`;
  }

  if (inferencesMasteryBar) {
    inferencesMasteryBar.style.width =
      `${mastery.inferences}%`;
  }
}


/* =========================================================
   LESSON CARDS
========================================================= */

function renderLessonCards() {
  const lessonData =
    player.progress.chapter1.lessons;

  document
    .querySelectorAll(
      ".lesson-card"
    )
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

      if (
        !button ||
        !icon
      ) {
        return;
      }

      if (
        progress.completed
      ) {
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

      else if (
        progress.unlocked
      ) {
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
    [
      "1-1",
      "What Is an Argument?"
    ],

    [
      "1-2",
      "Premises"
    ],

    [
      "1-3",
      "Conclusions"
    ],

    [
      "1-4",
      "Premise Sets"
    ],

    [
      "1-5",
      "Valid & Invalid Conclusions"
    ]
  ];

  for (
    const [id, title]
    of order
  ) {
    if (
      lessonData[id].unlocked &&
      !lessonData[id].completed
    ) {
      if (currentObjective) {
        currentObjective.textContent =
          `Complete Lesson ${id.replace("-", ".")} — ${title}`;
      }

      if (continueTraining) {
        continueTraining.dataset.lesson =
          id;

        continueTraining.disabled =
          !lessons[id];
      }

      return;
    }
  }

  if (
    player.progress.chapter1.test.unlocked
  ) {
    if (currentObjective) {
      currentObjective.textContent =
        "Complete the Chapter 1 Championship";
    }

    if (continueTraining) {
      continueTraining.dataset.lesson =
        "";

      continueTraining.disabled =
        false;
    }

    return;
  }

  if (currentObjective) {
    currentObjective.textContent =
      "Chapter 1 Complete";
  }
}


/* =========================================================
   CHAPTER TEST LOCK
========================================================= */

function updateChapterTestUnlock() {
  const allComplete =
    Object.values(
      player.progress
        .chapter1
        .lessons
    )
      .every(
        lesson =>
          lesson.completed
      );

  player.progress
    .chapter1
    .test
    .unlocked =
      allComplete;

  if (
    !chapterTestCard ||
    !startChapterTest
  ) {
    return;
  }

  if (allComplete) {
    chapterTestCard.classList.remove(
      "locked"
    );

    startChapterTest.disabled =
      false;

    startChapterTest.textContent =
      "Play Championship";
  }

  else {
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
   BASKETBALL COURT
========================================================= */

function resetBasketballCourt() {
  if (!basketballStage) {
    return;
  }

  pixelPlayer?.classList.remove(
    "shooting",
    "celebrate"
  );

  pixelDefender?.classList.remove(
    "blocking"
  );

  pixelBall?.classList.remove(
    "shot-made",
    "shot-miss",
    "shot-blocked",
    "shot-airball"
  );

  pixelHoop?.classList.remove(
    "swish"
  );

  shotResult?.classList.remove(
    "result-pop",
    "made",
    "missed"
  );

  shotResult?.classList.add(
    "hidden"
  );

  if (shotResult) {
    shotResult.textContent = "";
  }

  shotAnimationPlaying =
    false;
}

function showBasketballCourt() {
  if (!basketballStage) {
    return;
  }

  resetBasketballCourt();

  basketballStage.classList.remove(
    "hidden"
  );

  if (playerScore) {
    playerScore.textContent =
      gamePlayerScore;
  }

  if (opponentScore) {
    opponentScore.textContent =
      gameOpponentScore;
  }

  if (possessionNumber) {
    possessionNumber.textContent =
      gamePossession;
  }
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

function showShotResult(
  text,
  made
) {
  if (!shotResult) {
    return;
  }

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

async function playMadeShot() {
  resetBasketballCourt();

  shotAnimationPlaying =
    true;

  pixelPlayer?.classList.add(
    "shooting"
  );

  await wait(180);

  pixelBall?.classList.add(
    "shot-made"
  );

  pixelHoop?.classList.add(
    "swish"
  );

  await wait(970);

  gamePlayerScore += 2;

  if (playerScore) {
    playerScore.textContent =
      gamePlayerScore;
  }

  showShotResult(
    "BUCKET!",
    true
  );

  pixelPlayer?.classList.remove(
    "shooting"
  );

  pixelPlayer?.classList.add(
    "celebrate"
  );

  await wait(650);

  shotAnimationPlaying =
    false;
}

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

  if (
    outcome === "block"
  ) {
    await playBlockedShot();

    return;
  }

  if (
    outcome === "airball"
  ) {
    await playAirball();

    return;
  }

  await playBrick();
}

async function playBrick() {
  resetBasketballCourt();

  shotAnimationPlaying =
    true;

  pixelPlayer?.classList.add(
    "shooting"
  );

  await wait(180);

  pixelBall?.classList.add(
    "shot-miss"
  );

  await wait(970);

  gameOpponentScore += 2;

  if (opponentScore) {
    opponentScore.textContent =
      gameOpponentScore;
  }

  showShotResult(
    "BRICK!",
    false
  );

  await wait(600);

  shotAnimationPlaying =
    false;
}

async function playBlockedShot() {
  resetBasketballCourt();

  shotAnimationPlaying =
    true;

  pixelPlayer?.classList.add(
    "shooting"
  );

  await wait(170);

  pixelDefender?.classList.add(
    "blocking"
  );

  pixelBall?.classList.add(
    "shot-blocked"
  );

  await wait(680);

  gameOpponentScore += 2;

  if (opponentScore) {
    opponentScore.textContent =
      gameOpponentScore;
  }

  showShotResult(
    "BLOCKED!",
    false
  );

  await wait(600);

  shotAnimationPlaying =
    false;
}

async function playAirball() {
  resetBasketballCourt();

  shotAnimationPlaying =
    true;

  pixelPlayer?.classList.add(
    "shooting"
  );

  await wait(180);

  pixelBall?.classList.add(
    "shot-airball"
  );

  await wait(970);

  gameOpponentScore += 2;

  if (opponentScore) {
    opponentScore.textContent =
      gameOpponentScore;
  }

  showShotResult(
    "AIRBALL!",
    false
  );

  await wait(600);

  shotAnimationPlaying =
    false;
}


/* =========================================================
   OPEN / CLOSE LESSON
========================================================= */

function openLesson(id) {
  if (!lessons[id]) {
    alert(
      "This lesson hasn't been built yet."
    );

    return;
  }

  const progress =
    player.progress
      .chapter1
      .lessons[id];

  if (
    !progress ||
    !progress.unlocked
  ) {
    return;
  }

  activeLessonID = id;
  activeLesson = lessons[id];

  currentStepIndex = 0;
  currentSelection = null;

  currentQuestionAnswered =
    false;

  lessonCorrect = 0;

  lessonQuestionsAnswered =
    0;

  gamePlayerScore = 0;
  gameOpponentScore = 0;
  gamePossession = 1;

  resetBasketballCourt();

  progress.attempts++;

  savePlayer();

  lessonScreen?.classList.remove(
    "hidden"
  );

  document.body.style.overflow =
    "hidden";

  renderLessonStep();
}

function closeLesson() {
  if (shotAnimationPlaying) {
    return;
  }

  hideBasketballCourt();

  lessonScreen?.classList.add(
    "hidden"
  );

  document.body.style.overflow =
    "";

  activeLessonID = null;
  activeLesson = null;

  currentStepIndex = 0;

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

  if (lessonProgressText) {
    lessonProgressText.textContent =
      `Lesson ${activeLesson.number}`;
  }

  if (lessonScreenProgressBar) {
    lessonScreenProgressBar.style.width =
      `${progress}%`;
  }

  if (stepCounter) {
    stepCounter.textContent =
      `${currentStepIndex + 1} / ${totalSteps}`;
  }

  if (lessonStageTitle) {
    lessonStageTitle.textContent =
      step.title;
  }

  lessonFeedback?.classList.add(
    "hidden"
  );

  lessonFeedback?.classList.remove(
    "wrong"
  );

  currentSelection = null;

  currentQuestionAnswered =
    false;

  if (interactionArea) {
    interactionArea.innerHTML =
      "";
  }

  if (previousLessonStep) {
    previousLessonStep.disabled =
      currentStepIndex === 0;
  }

  hideBasketballCourt();

  if (
    step.type === "learn"
  ) {
    if (lessonStageType) {
      lessonStageType.textContent =
        "FILM ROOM";
    }

    if (lessonBody) {
      lessonBody.innerHTML =
        step.html;
    }

    if (nextLessonStep) {
      nextLessonStep.disabled =
        false;

      nextLessonStep.textContent =
        "Continue →";
    }
  }

  if (
    step.type === "question"
  ) {
    showBasketballCourt();

    if (lessonStageType) {
      lessonStageType.textContent =
        step.drill
          ? "LIVE DRILL"
          : "KNOWLEDGE CHECK";
    }

    if (lessonBody) {
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
    }

    const options =
      document.createElement(
        "div"
      );

    options.className =
      "interaction-options";

    step.answers.forEach(
      (answer, index) => {

        const button =
          document.createElement(
            "button"
          );

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

    interactionArea?.appendChild(
      options
    );

    if (nextLessonStep) {
      nextLessonStep.disabled =
        true;

      nextLessonStep.textContent =
        "Shoot";
    }
  }

  if (
    step.type === "complete"
  ) {
    if (lessonStageType) {
      lessonStageType.textContent =
        "FINAL BUZZER";
    }

    if (lessonBody) {
      lessonBody.innerHTML =
        step.html;
    }

    completeLesson();

    if (nextLessonStep) {
      nextLessonStep.disabled =
        false;

      nextLessonStep.textContent =
        "Return to Chapter";
    }
  }
}


/* =========================================================
   ANSWER SELECTION
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

  if (nextLessonStep) {
    nextLessonStep.disabled =
      false;
  }
}


/* =========================================================
   CHECK ANSWER
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

  if (nextLessonStep) {
    nextLessonStep.disabled =
      true;
  }

  if (previousLessonStep) {
    previousLessonStep.disabled =
      true;
  }

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
    player.streak = 0;

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
  }

  else {
    showLessonFeedback(
      false,
      step.feedbackWrong
    );
  }

  renderPlayerHUD();

  savePlayer();

  gamePossession++;

  if (possessionNumber) {
    possessionNumber.textContent =
      gamePossession;
  }

  if (previousLessonStep) {
    previousLessonStep.disabled =
      currentStepIndex === 0;
  }

  if (nextLessonStep) {
    nextLessonStep.disabled =
      false;

    nextLessonStep.textContent =
      "Next Possession →";
  }
}


/* =========================================================
   FEEDBACK
========================================================= */

function showLessonFeedback(
  correct,
  feedback
) {
  if (!lessonFeedback) {
    return;
  }

  lessonFeedback.classList.remove(
    "hidden"
  );

  if (correct) {
    lessonFeedback.classList.remove(
      "wrong"
    );

    if (lessonFeedbackIcon) {
      lessonFeedbackIcon.textContent =
        "🏀";
    }
  }

  else {
    lessonFeedback.classList.add(
      "wrong"
    );

    if (lessonFeedbackIcon) {
      lessonFeedbackIcon.textContent =
        "✕";
    }
  }

  if (lessonFeedbackLabel) {
    lessonFeedbackLabel.textContent =
      feedback.label;
  }

  if (lessonFeedbackTitle) {
    lessonFeedbackTitle.textContent =
      feedback.title;
  }

  if (lessonFeedbackText) {
    lessonFeedbackText.textContent =
      feedback.text;
  }
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

  if (
    !player.questionHistory[id]
  ) {
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
  }

  else {
    history.incorrect++;
  }

  history.lastAttempt =
    new Date().toISOString();
}


/* =========================================================
   NEXT / PREVIOUS
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

  if (
    step.type === "complete"
  ) {
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

  if (!lessonProgressData) {
    return;
  }

  if (
    !lessonProgressData.completed
  ) {
    player.xp +=
      activeLesson.xpReward;

    lessonProgressData.completed =
      true;

    let mastery = 100;

    if (
      lessonQuestionsAnswered > 0
    ) {
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
    index ===
      order.length - 1
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
    .unlocked =
      true;
}


/* =========================================================
   SCROLL
========================================================= */

function scrollLessonTop() {
  lessonScreen?.scrollTo({
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
        button.dataset
          .startLesson;

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

continueTraining?.addEventListener(
  "click",
  () => {

    const id =
      continueTraining.dataset
        .lesson;

    if (id) {
      openLesson(id);

      return;
    }

    if (
      player.progress
        .chapter1
        .test
        .unlocked
    ) {
      startAssessmentPlaceholder();
    }
  }
);


/* =========================================================
   LESSON CONTROLS
========================================================= */

nextLessonStep?.addEventListener(
  "click",
  handleNextStep
);

previousLessonStep?.addEventListener(
  "click",
  handlePreviousStep
);

exitLesson?.addEventListener(
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
      lessonScreen &&
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
   CHAPTER CHAMPIONSHIP PLACEHOLDER
========================================================= */

function startAssessmentPlaceholder() {
  alert(
    "Chapter Championship engine is coming next."
  );
}

startChapterTest?.addEventListener(
  "click",
  startAssessmentPlaceholder
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
   INITIALIZE
========================================================= */

bindLessonButtons();

renderDashboard();

hideBasketballCourt();
