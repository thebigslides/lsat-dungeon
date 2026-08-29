// ============================================================
// REASONING LEAGUE — CHAPTER 1 LESON DATA
// ============================================================

window.chapter1Lessons = {

  "1-1": {
    chapter: 1,
    number: "1.1",
    title: "What Is an Argument?",
    concept: "arguments",
    xpReward: 150,

    steps: [
      {
        type: "learn",
        title: "What Is an Argument?",
        html: `
          <p>Before we analyze reasoning, we need to know what makes something an <strong>argument</strong>.</p>

          <div class="concept-box">
            <h3>The basic idea</h3>
            <p>In an argument, one or more statements are offered as <strong>support</strong> for another statement.</p>
          </div>

          <div class="logic-flow">
            <div class="logic-node">SUPPORT</div>
            <div class="logic-arrow">↓</div>
            <div class="logic-node conclusion-node">CLAIM</div>
          </div>

          <p>No support relationship? Then you may simply have a collection of statements.</p>
        `
      },

      {
        type: "learn",
        title: "Statements Aren't Enough",
        html: `
          <p>Consider these statements:</p>

          <div class="concept-example">
            <p>Luka plays professional basketball.</p>
            <p>Luka wears number 77.</p>
            <p>Luka was born in Slovenia.</p>
          </div>

          <p>They may all be true, but <strong>none is being used to prove another.</strong></p>
          <p>Related statements do not automatically form an argument.</p>
        `
      },

      {
        type: "question",
        title: "Check the Relationship",
        prompt: "Does this passage contain an argument?",
        stimulus: "The library closes at 8:00 p.m. It contains more than 50,000 books. The building was renovated five years ago.",
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
          text: "The statements are related, but none is being offered as evidence for another."
        },
        feedbackWrong: {
          label: "NOT QUITE",
          title: "Look for support, not just statements.",
          text: "Several related claims do not automatically create an argument. Ask whether one claim is being used to support another."
        }
      },

      {
        type: "learn",
        title: "Now Add Support",
        html: `
          <p>Compare that with:</p>

          <div class="concept-example">
            <p>The roads are covered in ice.</p>
            <p><strong>Therefore, schools should delay opening this morning.</strong></p>
          </div>

          <div class="logic-flow">
            <div class="logic-node">Roads are covered in ice</div>
            <div class="logic-arrow">↓ supports ↓</div>
            <div class="logic-node conclusion-node">Schools should delay opening</div>
          </div>

          <p>The first statement gives us a reason to accept the second. That's an argument.</p>
        `
      },

      {
        type: "question",
        title: "Argument or Not?",
        prompt: "Which best describes this passage?",
        stimulus: "Attendance at the theater has fallen for six straight months. Therefore, the theater should reconsider its current ticket prices.",
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
          text: "The decline in attendance is offered as a reason for the recommendation."
        },
        feedbackWrong: {
          label: "BLOCKED",
          title: "Separate existence from quality.",
          text: "An argument does not have to be good to count as an argument. The attendance claim is still offered as support."
        }
      },

      {
        type: "learn",
        title: "Argument ≠ Good Argument",
        html: `
          <div class="concept-box">
            <h3>An argument can be terrible and still be an argument.</h3>
            <p>First ask whether support exists. Only then ask whether the support is strong.</p>
          </div>

          <div class="concept-example">
            <p>Marcus owns a red car.</p>
            <p>Therefore, Marcus must be an excellent basketball player.</p>
          </div>

          <p>The reasoning is awful, but structurally the first claim is still presented as support for the second.</p>
        `
      },

      {
        type: "question",
        title: "Bad Argument or No Argument?",
        prompt: "How should we classify this passage?",
        stimulus: "Nina owns three blue shirts. Therefore, Nina will become a successful attorney.",
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
          text: "The premise gives terrible support, but it is nevertheless presented as support."
        },
        feedbackWrong: {
          label: "OFF THE RIM",
          title: "Don't confuse quality with structure.",
          text: "We are deciding whether a support relationship exists, not whether it is persuasive."
        }
      },

      {
        type: "learn",
        title: "Mini Drill",
        html: `
          <div class="concept-box">
            <h3>Your job</h3>
            <p>Decide whether each passage contains an argument.</p>
          </div>

          <p><strong>Don't ask whether the statements are related.</strong> Ask whether one statement is offered as support for another.</p>
        `
      },

      {
        type: "question",
        title: "Mini Drill — 1 of 3",
        drill: true,
        prompt: "Argument or collection of statements?",
        stimulus: "The café opened in 2018. It has twelve employees. Its walls are painted green.",
        answers: [
          "Argument",
          "Collection of statements"
        ],
        correct: 1,
        feedbackCorrect: {
          label: "BUCKET",
          title: "Collection of statements.",
          text: "Nothing is being offered as support for anything else."
        },
        feedbackWrong: {
          label: "BLOCKED",
          title: "Find the support relationship.",
          text: "These statements describe the same café, but none is used to establish another."
        }
      },

      {
        type: "question",
        title: "Mini Drill — 2 of 3",
        drill: true,
        prompt: "Argument or collection of statements?",
        stimulus: "The café has lost money during each of the last four months. Thus, the owner should consider reducing operating costs.",
        answers: [
          "Argument",
          "Collection of statements"
        ],
        correct: 0,
        feedbackCorrect: {
          label: "BUCKET",
          title: "Argument.",
          text: "The financial losses are offered as support for the recommendation."
        },
        feedbackWrong: {
          label: "POSSESSION LOST",
          title: "There is support here.",
          text: "The first claim gives a reason for accepting the recommendation in the second."
        }
      },

      {
        type: "question",
        title: "Mini Drill — 3 of 3",
        drill: true,
        prompt: "Argument or collection of statements?",
        stimulus: "The train arrived twenty minutes late. Several passengers were carrying luggage. The station has four platforms.",
        answers: [
          "Argument",
          "Collection of statements"
        ],
        correct: 1,
        feedbackCorrect: {
          label: "BUCKET",
          title: "You got it.",
          text: "There is no support relationship among the statements."
        },
        feedbackWrong: {
          label: "BLOCKED",
          title: "Related facts aren't enough.",
          text: "All three concern the same situation, but none is offered as evidence for another."
        }
      },

      {
        type: "complete",
        title: "Lesson Complete",
        html: `
          <div class="completion-screen">
            <div class="completion-symbol">🏀</div>
            <p class="eyebrow">FINAL BUZZER</p>
            <h2>Lesson Complete</h2>
            <p>You now have the foundation: arguments contain a <strong>support relationship</strong>.</p>

            <div class="completion-summary">
              <div><span>Concept</span><strong>Arguments</strong></div>
              <div><span>Reward</span><strong>+150 XP</strong></div>
              <div><span>Next</span><strong>Premises</strong></div>
            </div>
          </div>
        `
      }
    ]
  },


  // ============================================================
  // LESSON 1.2 — PREMISES
  // ============================================================

  "1-2": {
    chapter: 1,
    number: "1.2",
    title: "Premises",
    concept: "premises",
    xpReward: 175,

    steps: [
      {
        type: "learn",
        title: "Meet the Premise",
        html: `
          <p>A <strong>premise</strong> is a statement offered as support for another claim.</p>

          <div class="logic-flow">
            <div class="logic-node">PREMISE</div>
            <div class="logic-arrow">↓ gives support ↓</div>
            <div class="logic-node conclusion-node">CONCLUSION</div>
          </div>

          <div class="concept-box">
            <h3>Think of the premise as the reason.</h3>
            <p>Ask: <strong>“Why should I believe the author’s main claim?”</strong></p>
          </div>
        `
      },

      {
        type: "learn",
        title: "Find the Reason",
        html: `
          <div class="concept-example">
            <p>The city's population has increased by 20 percent.</p>
            <p>Therefore, the city should expand public transportation.</p>
          </div>

          <p>The population increase is the <strong>premise</strong>.</p>
          <p>It is the reason offered for expanding public transportation.</p>
        `
      },

      {
        type: "question",
        title: "Identify the Premise",
        prompt: "Which statement functions as the premise?",
        stimulus: "The company should hire additional customer-service representatives because average wait times have doubled.",
        answers: [
          "The company should hire additional representatives.",
          "Average wait times have doubled.",
          "Customer service is important.",
          "The company has representatives."
        ],
        correct: 1,
        feedbackCorrect: {
          label: "BUCKET",
          title: "That's the reason.",
          text: "The doubled wait time is offered as support for hiring more representatives."
        },
        feedbackWrong: {
          label: "BLOCKED",
          title: "Ask why.",
          text: "Why should the company hire more representatives? Because average wait times have doubled."
        }
      },

      {
        type: "learn",
        title: "Premise Indicators",
        html: `
          <p>Certain words often introduce premises:</p>

          <div class="concept-box">
            <h3>Common premise indicators</h3>
            <p><strong>because, since, given that, after all, for</strong></p>
          </div>

          <p>These words are useful clues, but don't rely on them mechanically.</p>
          <p>Your real job is always to identify the <strong>support relationship</strong>.</p>
        `
      },

      {
        type: "question",
        title: "Follow the Indicator",
        prompt: "What is the premise?",
        stimulus: "The museum should extend its weekend hours, since visitor demand is highest on Saturdays and Sundays.",
        answers: [
          "The museum should extend its weekend hours.",
          "Visitor demand is highest on Saturdays and Sundays.",
          "Museums should always open on weekends.",
          "Weekend visitors stay longer."
        ],
        correct: 1,
        feedbackCorrect: {
          label: "BUCKET",
          title: "Correct.",
          text: "The statement following 'since' supplies the reason."
        },
        feedbackWrong: {
          label: "OFF THE RIM",
          title: "Follow the support.",
          text: "The weekend demand claim is used to justify extending the hours."
        }
      },

      {
        type: "learn",
        title: "Premises Can Come After",
        html: `
          <p>Don't assume the premise must appear first.</p>

          <div class="concept-example">
            <p><strong>The university should add another parking structure.</strong></p>
            <p>After all, students regularly spend more than twenty minutes searching for parking.</p>
          </div>

          <p>The conclusion appears first. The premise comes afterward.</p>
        `
      },

      {
        type: "question",
        title: "Position Doesn't Matter",
        prompt: "Which statement is the premise?",
        stimulus: "The company should replace the server. The current server crashes several times each week.",
        answers: [
          "The company should replace the server.",
          "The current server crashes several times each week.",
          "The company owns a server.",
          "Servers should never crash."
        ],
        correct: 1,
        feedbackCorrect: {
          label: "BUCKET",
          title: "Exactly.",
          text: "The crash frequency supports the recommendation to replace the server."
        },
        feedbackWrong: {
          label: "BLOCKED",
          title: "Ignore sentence order.",
          text: "Ask which statement gives a reason for accepting the other."
        }
      },

      {
        type: "learn",
        title: "Premise Drill",
        html: `
          <div class="concept-box">
            <h3>Game plan</h3>
            <p>For each argument, identify the statement doing the supporting.</p>
          </div>

          <p>Keep asking: <strong>“What reason did the author give me?”</strong></p>
        `
      },

      {
        type: "question",
        title: "Premise Drill — 1 of 3",
        drill: true,
        prompt: "Which statement is the premise?",
        stimulus: "The restaurant should offer online reservations because customers frequently complain about long telephone hold times.",
        answers: [
          "The restaurant should offer online reservations.",
          "Customers frequently complain about long telephone hold times."
        ],
        correct: 1,
        feedbackCorrect: {
          label: "BUCKET",
          title: "Premise identified.",
          text: "The complaints provide the reason for the recommendation."
        },
        feedbackWrong: {
          label: "BLOCKED",
          title: "That's the conclusion.",
          text: "The recommendation is what the author wants us to accept. The complaints support it."
        }
      },

      {
        type: "question",
        title: "Premise Drill — 2 of 3",
        drill: true,
        prompt: "Which statement provides support?",
        stimulus: "The city should repair the bridge immediately. Recent inspections found serious structural damage.",
        answers: [
          "The city should repair the bridge immediately.",
          "Recent inspections found serious structural damage."
        ],
        correct: 1,
        feedbackCorrect: {
          label: "BUCKET",
          title: "Clean read.",
          text: "The inspection results support the recommendation."
        },
        feedbackWrong: {
          label: "OFF THE RIM",
          title: "Ask why the bridge should be repaired.",
          text: "The structural damage is the reason."
        }
      },

      {
        type: "question",
        title: "Premise Drill — 3 of 3",
        drill: true,
        prompt: "Which statement functions as the premise?",
        stimulus: "Because enrollment has increased substantially, the college should offer more evening classes.",
        answers: [
          "Enrollment has increased substantially.",
          "The college should offer more evening classes."
        ],
        correct: 0,
        feedbackCorrect: {
          label: "BUCKET",
          title: "Got it.",
          text: "The enrollment increase is the supporting reason."
        },
        feedbackWrong: {
          label: "BLOCKED",
          title: "That's what the argument is trying to establish.",
          text: "The evening-class recommendation is supported by the enrollment increase."
        }
      },

      {
        type: "complete",
        title: "Lesson Complete",
        html: `
          <div class="completion-screen">
            <div class="completion-symbol">🏀</div>
            <p class="eyebrow">FINAL BUZZER</p>
            <h2>Premises Complete</h2>
            <p>You can now identify the statements that provide <strong>support</strong> inside an argument.</p>

            <div class="completion-summary">
              <div><span>Concept</span><strong>Premises</strong></div>
              <div><span>Reward</span><strong>+175 XP</strong></div>
              <div><span>Next</span><strong>Conclusions</strong></div>
            </div>
          </div>
        `
      }
    ]
  },


  // ============================================================
  // LESSON 1.3 — CONCLUSIONS
  // ============================================================

  "1-3": {
    chapter: 1,
    number: "1.3",
    title: "Conclusions",
    concept: "conclusions",
    xpReward: 175,

    steps: [
      {
        type: "learn",
        title: "Meet the Conclusion",
        html: `
          <p>The <strong>conclusion</strong> is the claim the argument is trying to establish.</p>

          <div class="logic-flow">
            <div class="logic-node">PREMISE</div>
            <div class="logic-arrow">↓ supports ↓</div>
            <div class="logic-node conclusion-node">CONCLUSION</div>
          </div>

          <div class="concept-box">
            <h3>Ask yourself:</h3>
            <p><strong>“What does the author want me to believe?”</strong></p>
          </div>
        `
      },

      {
        type: "learn",
        title: "What Is the Author Trying to Prove?",
        html: `
          <div class="concept-example">
            <p>Average rent has risen much faster than local wages.</p>
            <p>Therefore, the city should increase its supply of affordable housing.</p>
          </div>

          <p>The rent-and-wage claim gives support.</p>
          <p>The affordable-housing recommendation is the <strong>conclusion</strong>.</p>
        `
      },

      {
        type: "question",
        title: "Identify the Conclusion",
        prompt: "Which statement is the conclusion?",
        stimulus: "The neighborhood lacks safe pedestrian crossings. Therefore, the city should install additional crosswalks.",
        answers: [
          "The neighborhood lacks safe pedestrian crossings.",
          "The city should install additional crosswalks.",
          "Pedestrians use crosswalks.",
          "The city maintains roads."
        ],
        correct: 1,
        feedbackCorrect: {
          label: "BUCKET",
          title: "That's the conclusion.",
          text: "The author uses the lack of safe crossings to support the recommendation."
        },
        feedbackWrong: {
          label: "BLOCKED",
          title: "Find what the author wants established.",
          text: "The unsafe crossings are the reason. The crosswalk recommendation is the claim being supported."
        }
      },

      {
        type: "learn",
        title: "Conclusion Indicators",
        html: `
          <p>Some words frequently introduce conclusions:</p>

          <div class="concept-box">
            <h3>Common conclusion indicators</h3>
            <p><strong>therefore, thus, hence, consequently, so</strong></p>
          </div>

          <p>Again, these are clues — not magic.</p>
          <p>Always confirm which statement is being <strong>supported by the others</strong>.</p>
        `
      },

      {
        type: "question",
        title: "Follow the Support",
        prompt: "What is the conclusion?",
        stimulus: "The new battery overheats during ordinary use. Consequently, the manufacturer should investigate the battery's design.",
        answers: [
          "The new battery overheats during ordinary use.",
          "The manufacturer should investigate the battery's design.",
          "The battery is defective.",
          "All batteries overheat."
        ],
        correct: 1,
        feedbackCorrect: {
          label: "BUCKET",
          title: "Correct.",
          text: "The overheating claim supports the recommendation to investigate."
        },
        feedbackWrong: {
          label: "OFF THE RIM",
          title: "Watch what follows 'consequently.'",
          text: "The author is trying to establish that an investigation should occur."
        }
      },

      {
        type: "learn",
        title: "The Conclusion Can Come First",
        html: `
          <p>Sentence order doesn't determine argumentative role.</p>

          <div class="concept-example">
            <p><strong>The town should replace its aging water pipes.</strong></p>
            <p>Leaks from the current system waste thousands of gallons each month.</p>
          </div>

          <p>The recommendation appears first but is still the conclusion.</p>
        `
      },

      {
        type: "question",
        title: "Conclusion First",
        prompt: "Which statement is the conclusion?",
        stimulus: "The school should expand its tutoring program. Students who use the existing program have shown substantial academic improvement.",
        answers: [
          "The school should expand its tutoring program.",
          "Students use the existing program.",
          "Students have shown substantial academic improvement.",
          "Tutoring programs exist."
        ],
        correct: 0,
        feedbackCorrect: {
          label: "BUCKET",
          title: "Yep.",
          text: "The improvement data is used to support expanding the program."
        },
        feedbackWrong: {
          label: "BLOCKED",
          title: "Don't let sentence order fool you.",
          text: "The first sentence is the recommendation the second sentence supports."
        }
      },

      {
        type: "learn",
        title: "Use the Why Test",
        html: `
          <p>When you're unsure, try this:</p>

          <div class="concept-box">
            <h3>The Why Test</h3>
            <p>Take one candidate claim and ask <strong>“Why?”</strong></p>
            <p>If the other statement answers that question, you've probably found the conclusion.</p>
          </div>

          <p><strong>Why</strong> should the town replace the pipes?</p>
          <p>Because the existing system leaks thousands of gallons.</p>
        `
      },

      {
        type: "question",
        title: "Conclusion Drill — 1 of 3",
        drill: true,
        prompt: "Which statement is the conclusion?",
        stimulus: "Because the park receives heavy use every weekend, the city should add more trash bins.",
        answers: [
          "The park receives heavy use every weekend.",
          "The city should add more trash bins."
        ],
        correct: 1,
        feedbackCorrect: {
          label: "BUCKET",
          title: "Conclusion found.",
          text: "Heavy use is the reason; adding bins is the recommendation."
        },
        feedbackWrong: {
          label: "BLOCKED",
          title: "That's the support.",
          text: "The author uses heavy park usage to justify adding bins."
        }
      },

      {
        type: "question",
        title: "Conclusion Drill — 2 of 3",
        drill: true,
        prompt: "What is the author trying to establish?",
        stimulus: "The store should remain open later on Fridays. Sales during the final hour of operation are consistently strong.",
        answers: [
          "The store should remain open later on Fridays.",
          "Sales during the final hour are consistently strong."
        ],
        correct: 0,
        feedbackCorrect: {
          label: "BUCKET",
          title: "Exactly.",
          text: "The sales information is offered to support the recommendation."
        },
        feedbackWrong: {
          label: "OFF THE RIM",
          title: "Use the Why Test.",
          text: "Why stay open later? Because late-hour sales are strong."
        }
      },

      {
        type: "question",
        title: "Conclusion Drill — 3 of 3",
        drill: true,
        prompt: "Which statement is the conclusion?",
        stimulus: "The laboratory's equipment is outdated. Thus, the university should allocate funds for replacement equipment.",
        answers: [
          "The laboratory's equipment is outdated.",
          "The university should allocate funds for replacement equipment."
        ],
        correct: 1,
        feedbackCorrect: {
          label: "BUCKET",
          title: "Clean.",
          text: "The outdated equipment supports the funding recommendation."
        },
        feedbackWrong: {
          label: "BLOCKED",
          title: "That's the premise.",
          text: "The outdated equipment is the reason given for allocating funds."
        }
      },

      {
        type: "complete",
        title: "Lesson Complete",
        html: `
          <div class="completion-screen">
            <div class="completion-symbol">🏀</div>
            <p class="eyebrow">FINAL BUZZER</p>
            <h2>Conclusions Complete</h2>
            <p>You can now identify the claim an argument is ultimately trying to <strong>establish</strong>.</p>

            <div class="completion-summary">
              <div><span>Concept</span><strong>Conclusions</strong></div>
              <div><span>Reward</span><strong>+175 XP</strong></div>
              <div><span>Next</span><strong>Premise Sets</strong></div>
            </div>
          </div>
        `
      }
    ]
  },


  // ============================================================
  // LESSON 1.4 — PREMISE SETS
  // ============================================================

  "1-4": {
    chapter: 1,
    number: "1.4",
    title: "Premise Sets",
    concept: "premiseSets",
    xpReward: 225,

    steps: [
      {
        type: "learn",
        title: "Arguments Can Have Multiple Premises",
        html: `
          <p>Arguments aren't limited to one premise.</p>

          <div class="concept-example">
            <p>The city's population is growing.</p>
            <p>Traffic congestion has increased.</p>
            <p>Existing buses are frequently overcrowded.</p>
            <p><strong>Therefore, the city should expand public transportation.</strong></p>
          </div>

          <p>Several pieces of support can work together toward the same conclusion.</p>
        `
      },

      {
        type: "learn",
        title: "Support Can Accumulate",
        html: `
          <div class="logic-flow">
            <div class="logic-node">Premise 1</div>
            <div class="logic-node">Premise 2</div>
            <div class="logic-node">Premise 3</div>
            <div class="logic-arrow">↓ support ↓</div>
            <div class="logic-node conclusion-node">Conclusion</div>
          </div>

          <p>Think of a premise set as the argument's <strong>evidence package</strong>.</p>
        `
      },

      {
        type: "question",
        title: "Find the Premise Set",
        prompt: "Which statements function as premises?",
        stimulus: "Customer wait times have increased, and complaints have doubled. Therefore, the company should revise its service process.",
        answers: [
          "Only customer wait times have increased.",
          "Only complaints have doubled.",
          "Both increased wait times and doubled complaints.",
          "The company should revise its service process."
        ],
        correct: 2,
        feedbackCorrect: {
          label: "BUCKET",
          title: "Both provide support.",
          text: "The two factual claims work together to support the recommendation."
        },
        feedbackWrong: {
          label: "BLOCKED",
          title: "There is more than one supporting statement.",
          text: "Both the wait-time increase and complaint increase are reasons for revising the process."
        }
      },

      {
        type: "learn",
        title: "Independent Support",
        html: `
          <p>Sometimes two premises each provide their own reason for the conclusion.</p>

          <div class="concept-example">
            <p>The laptop has excellent battery life.</p>
            <p>The laptop is significantly cheaper than comparable models.</p>
            <p>Therefore, the laptop is a strong option for students.</p>
          </div>

          <p>Either premise gives some support even without the other.</p>
        `
      },

      {
        type: "question",
        title: "Independent Reasons",
        prompt: "How do the first two statements function?",
        stimulus: "The restaurant has excellent reviews. It is also within walking distance of the hotel. Therefore, we should consider eating there.",
        answers: [
          "Neither statement supports the conclusion.",
          "Each statement provides a separate reason for considering the restaurant.",
          "The first statement proves the second.",
          "The second statement proves the first."
        ],
        correct: 1,
        feedbackCorrect: {
          label: "BUCKET",
          title: "Separate lanes, same basket.",
          text: "Good reviews and convenient location independently support considering the restaurant."
        },
        feedbackWrong: {
          label: "OFF THE RIM",
          title: "Look at what each reason does.",
          text: "Each premise gives its own support for the final recommendation."
        }
      },

      {
        type: "learn",
        title: "Linked Support",
        html: `
          <p>Other times, premises need to be combined before they support the conclusion.</p>

          <div class="concept-example">
            <p>Anyone who accesses confidential records must have authorization.</p>
            <p>Jordan accessed confidential records.</p>
            <p>Therefore, Jordan must have authorization.</p>
          </div>

          <p>Neither premise gets us to the conclusion alone. We need <strong>both together</strong>.</p>
        `
      },

      {
        type: "question",
        title: "Linked Premises",
        prompt: "Why are both premises needed?",
        stimulus: "Every vehicle in Garage A has been inspected. Car 17 is in Garage A. Therefore, Car 17 has been inspected.",
        answers: [
          "The first premise alone identifies Car 17.",
          "The second premise alone proves Car 17 was inspected.",
          "Together they connect Car 17 to the rule governing Garage A.",
          "Neither premise supports the conclusion."
        ],
        correct: 2,
        feedbackCorrect: {
          label: "BUCKET",
          title: "That's linked support.",
          text: "The general rule and Car 17's membership in the group must be combined."
        },
        feedbackWrong: {
          label: "BLOCKED",
          title: "You need the rule and the membership fact.",
          text: "One tells us what is true of Garage A vehicles; the other tells us Car 17 is one of them."
        }
      },

      {
        type: "learn",
        title: "Background Isn't Automatically a Premise",
        html: `
          <p>Arguments can contain information that sets the scene without doing logical work.</p>

          <div class="concept-example">
            <p>The gym opened in 1998.</p>
            <p>Membership has fallen for three years.</p>
            <p>Customers frequently complain about outdated equipment.</p>
            <p>Therefore, the gym should modernize its facilities.</p>
          </div>

          <p>The opening date may be background. The falling membership and equipment complaints provide the obvious support.</p>
        `
      },

      {
        type: "question",
        title: "Separate Background from Support",
        prompt: "Which information most clearly functions as support for the conclusion?",
        stimulus: "The clinic was founded twenty years ago. Appointment delays have increased sharply, and patient complaints about scheduling have risen. Therefore, the clinic should revise its scheduling system.",
        answers: [
          "Only the clinic's age.",
          "The increased delays and scheduling complaints.",
          "The fact that the clinic exists.",
          "All information must function as a premise."
        ],
        correct: 1,
        feedbackCorrect: {
          label: "BUCKET",
          title: "Exactly.",
          text: "Those facts directly support changing the scheduling system."
        },
        feedbackWrong: {
          label: "BLOCKED",
          title: "Not every sentence has to do argumentative work.",
          text: "The clinic's age provides context but does not obviously justify the scheduling recommendation."
        }
      },

      {
        type: "question",
        title: "Premise Set Drill — 1 of 3",
        drill: true,
        prompt: "How many supporting reasons are presented?",
        stimulus: "The bus route is overcrowded during rush hour. It also serves a rapidly growing neighborhood. Therefore, the transit agency should increase service on the route.",
        answers: [
          "Zero",
          "One",
          "Two",
          "Three"
        ],
        correct: 2,
        feedbackCorrect: {
          label: "BUCKET",
          title: "Two premises.",
          text: "Overcrowding and neighborhood growth both support increased service."
        },
        feedbackWrong: {
          label: "OFF THE RIM",
          title: "Count the reasons, not the sentences blindly.",
          text: "There are two supporting facts followed by one conclusion."
        }
      },

      {
        type: "question",
        title: "Premise Set Drill — 2 of 3",
        drill: true,
        prompt: "Which best describes the support?",
        stimulus: "All employees working in Laboratory C must wear protective eyewear. Dana works in Laboratory C. Therefore, Dana must wear protective eyewear.",
        answers: [
          "The premises are linked and work together.",
          "The premises are unrelated.",
          "Each premise independently proves the conclusion.",
          "There is no conclusion."
        ],
        correct: 0,
        feedbackCorrect: {
          label: "BUCKET",
          title: "Linked.",
          text: "You need both the general rule and Dana's membership in Laboratory C."
        },
        feedbackWrong: {
          label: "BLOCKED",
          title: "Combine the information.",
          text: "Neither premise alone gets you all the way to Dana's requirement."
        }
      },

      {
        type: "question",
        title: "Premise Set Drill — 3 of 3",
        drill: true,
        prompt: "Which sentence is primarily background information?",
        stimulus: "The theater was built in 1952. Ticket sales have declined substantially, and maintenance costs have risen. Therefore, management should reconsider how the theater is operated.",
        answers: [
          "The theater was built in 1952.",
          "Ticket sales have declined substantially.",
          "Maintenance costs have risen.",
          "Management should reconsider how the theater is operated."
        ],
        correct: 0,
        feedbackCorrect: {
          label: "BUCKET",
          title: "Background identified.",
          text: "The theater's age sets context; the declining sales and rising costs provide direct support."
        },
        feedbackWrong: {
          label: "OFF THE RIM",
          title: "Ask what actually supports the recommendation.",
          text: "The financial and maintenance problems do the argumentative work."
        }
      },

      {
        type: "complete",
        title: "Lesson Complete",
        html: `
          <div class="completion-screen">
            <div class="completion-symbol">🏀</div>
            <p class="eyebrow">FINAL BUZZER</p>
            <h2>Premise Sets Complete</h2>
            <p>You can now recognize multiple premises, linked support, independent support, and background information.</p>

            <div class="completion-summary">
              <div><span>Concept</span><strong>Premise Sets</strong></div>
              <div><span>Reward</span><strong>+225 XP</strong></div>
              <div><span>Next</span><strong>Valid & Invalid Conclusions</strong></div>
            </div>
          </div>
        `
      }
    ]
  },


  // ============================================================
  // LESSON 1.5 — VALID & INVALID CONCLUSIONS
  // ============================================================

  "1-5": {
    chapter: 1,
    number: "1.5",
    title: "Valid & Invalid Conclusions",
    concept: "inferences",
    xpReward: 250,

    steps: [
      {
        type: "learn",
        title: "What Can You Actually Conclude?",
        html: `
          <p>Now we shift from identifying argument parts to asking what the information <strong>actually allows us to infer</strong>.</p>

          <div class="concept-box">
            <h3>A safe conclusion cannot outrun the evidence.</h3>
            <p>If the premises could all be true while the conclusion is false, the conclusion is not guaranteed.</p>
          </div>
        `
      },

      {
        type: "learn",
        title: "Must Be True vs. Could Be True",
        html: `
          <p>Suppose we know:</p>

          <div class="concept-example">
            <p>Every violin in the cabinet is wooden.</p>
            <p>Instrument A is a violin in the cabinet.</p>
          </div>

          <p>Then Instrument A <strong>must</strong> be wooden.</p>
          <p>But we cannot conclude it is expensive, old, or Italian-made. Those things could be true, but the premises do not guarantee them.</p>
        `
      },

      {
        type: "question",
        title: "Guaranteed Conclusion",
        prompt: "Which conclusion must be true?",
        stimulus: "Every employee assigned to Project Orion has security clearance. Maya is assigned to Project Orion.",
        answers: [
          "Maya has security clearance.",
          "Maya has the highest level of security clearance.",
          "Maya requested the Orion assignment.",
          "Only employees with security clearance work for the company."
        ],
        correct: 0,
        feedbackCorrect: {
          label: "BUCKET",
          title: "Guaranteed.",
          text: "The general rule covers every Orion employee, and Maya is one of them."
        },
        feedbackWrong: {
          label: "BLOCKED",
          title: "Don't add information.",
          text: "Only Maya's possession of security clearance follows. The other answers introduce facts the premises never establish."
        }
      },

      {
        type: "learn",
        title: "Possible Is Not Guaranteed",
        html: `
          <p>A common reasoning mistake is upgrading <strong>could</strong> into <strong>must</strong>.</p>

          <div class="concept-example">
            <p>Some members of the debate club are seniors.</p>
            <p>Andre is a member of the debate club.</p>
          </div>

          <p>Andre <em>could</em> be a senior. But he does not <strong>have</strong> to be one.</p>
        `
      },

      {
        type: "question",
        title: "Don't Overreach",
        prompt: "What can properly be concluded?",
        stimulus: "Some apartments in the building have balconies. Chen lives in the building.",
        answers: [
          "Chen definitely has a balcony.",
          "Chen definitely does not have a balcony.",
          "Chen could have a balcony, but the information does not establish that he does.",
          "Every apartment in the building has a balcony."
        ],
        correct: 2,
        feedbackCorrect: {
          label: "BUCKET",
          title: "Possibility stays possibility.",
          text: "The existence of some balcony apartments does not tell us which apartment Chen occupies."
        },
        feedbackWrong: {
          label: "OFF THE RIM",
          title: "Some does not mean all.",
          text: "The premises leave Chen's apartment type open."
        }
      },

      {
        type: "learn",
        title: "Cannot Be True",
        html: `
          <p>Sometimes the premises rule something out.</p>

          <div class="concept-example">
            <p>No electric vehicles in the fleet use diesel fuel.</p>
            <p>Van 4 is an electric vehicle in the fleet.</p>
          </div>

          <p>Van 4 <strong>cannot</strong> use diesel fuel if both premises are true.</p>
        `
      },

      {
        type: "question",
        title: "Rule It Out",
        prompt: "Which statement cannot be true?",
        stimulus: "No members of the morning shift work remotely. Elena is a member of the morning shift.",
        answers: [
          "Elena works remotely.",
          "Elena works on site.",
          "Elena starts work in the morning.",
          "Elena is an employee."
        ],
        correct: 0,
        feedbackCorrect: {
          label: "BUCKET",
          title: "Ruled out.",
          text: "The first premise excludes remote work for every morning-shift member, including Elena."
        },
        feedbackWrong: {
          label: "BLOCKED",
          title: "Find the direct contradiction.",
          text: "Remote work conflicts with the explicit rule governing the morning shift."
        }
      },

      {
        type: "learn",
        title: "Don't Reverse a Rule",
        html: `
          <p>Suppose:</p>

          <div class="concept-example">
            <p>Every finalist receives an interview.</p>
          </div>

          <p>If Sam is a finalist, Sam gets an interview.</p>
          <p>But if Sam gets an interview, we cannot automatically conclude Sam is a finalist.</p>
          <p>The rule tells us what happens to finalists; it does not say only finalists are interviewed.</p>
        `
      },

      {
        type: "question",
        title: "Reverse Trap",
        prompt: "Which conclusion is justified?",
        stimulus: "All certified guides carry radios. Luis carries a radio.",
        answers: [
          "Luis must be a certified guide.",
          "Luis cannot be a certified guide.",
          "Luis could be a certified guide, but the premises do not establish that he is.",
          "Only certified guides carry radios."
        ],
        correct: 2,
        feedbackCorrect: {
          label: "BUCKET",
          title: "No reversal.",
          text: "Certified guide → radio does not give us radio → certified guide."
        },
        feedbackWrong: {
          label: "POSSESSION LOST",
          title: "You reversed the relationship.",
          text: "The rule guarantees radios for certified guides; it does not restrict radios only to certified guides."
        }
      },

      {
        type: "question",
        title: "Inference Drill — 1 of 3",
        drill: true,
        prompt: "Which statement must be true?",
        stimulus: "Every book on Shelf A is cataloged. The novel Meridian is on Shelf A.",
        answers: [
          "Meridian is cataloged.",
          "Meridian is the only novel on Shelf A.",
          "Every cataloged book is on Shelf A.",
          "Meridian was cataloged recently."
        ],
        correct: 0,
        feedbackCorrect: {
          label: "BUCKET",
          title: "Clean inference.",
          text: "Meridian falls directly under the rule governing every book on Shelf A."
        },
        feedbackWrong: {
          label: "BLOCKED",
          title: "Stay inside the facts.",
          text: "Only cataloged status is guaranteed."
        }
      },

      {
        type: "question",
        title: "Inference Drill — 2 of 3",
        drill: true,
        prompt: "Which statement could be true?",
        stimulus: "No red files are stored in Cabinet B. File K is stored in Cabinet B.",
        answers: [
          "File K is red.",
          "File K is blue.",
          "File K is both red and stored in Cabinet B.",
          "Every file outside Cabinet B is red."
        ],
        correct: 1,
        feedbackCorrect: {
          label: "BUCKET",
          title: "Possible and consistent.",
          text: "We only know File K is not red. Blue remains possible."
        },
        feedbackWrong: {
          label: "OFF THE RIM",
          title: "Check for contradictions.",
          text: "Any answer making File K red conflicts with the premises, while claims about every outside file go beyond the evidence."
        }
      },

      {
        type: "question",
        title: "Inference Drill — 3 of 3",
        drill: true,
        prompt: "Which conclusion is invalid?",
        stimulus: "All scholarship recipients submitted an essay. Talia submitted an essay.",
        answers: [
          "Talia may or may not be a scholarship recipient.",
          "Talia could be a scholarship recipient.",
          "Talia must be a scholarship recipient.",
          "The premises do not tell us whether everyone who submitted an essay received a scholarship."
        ],
        correct: 2,
        feedbackCorrect: {
          label: "BUCKET",
          title: "That's the invalid leap.",
          text: "Submitting an essay is necessary for recipients in this setup, but it is not stated to be sufficient for receiving a scholarship."
        },
        feedbackWrong: {
          label: "BLOCKED",
          title: "Watch the reversal.",
          text: "The rule goes recipient → essay. It does not guarantee essay → recipient."
        }
      },

      {
        type: "complete",
        title: "Chapter Lessons Complete",
        html: `
          <div class="completion-screen">
            <div class="completion-symbol">🏆</div>
            <p class="eyebrow">REGULAR SEASON COMPLETE</p>
            <h2>Chapter 1 Lessons Complete</h2>
            <p>You can now identify arguments, premises, conclusions, premise structures, and basic valid versus invalid inferences.</p>

            <div class="completion-summary">
              <div><span>Concept</span><strong>Inferences</strong></div>
              <div><span>Reward</span><strong>+250 XP</strong></div>
              <div><span>Next</span><strong>Chapter Championship</strong></div>
            </div>
          </div>
        `
      }
    ]
  }

};
