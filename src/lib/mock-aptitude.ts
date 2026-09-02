export type AptitudeCategory = "Quantitative Aptitude" | "Logical Reasoning" | "Verbal Ability";

export interface AptitudeQuestion {
  id: number;
  category: AptitudeCategory;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option (0-3)
  explanation: string;
}

export const MOCK_APTITUDE_QUESTIONS: AptitudeQuestion[] = [
  // Quantitative Aptitude
  {
    id: 1,
    category: "Quantitative Aptitude",
    topic: "Percentages",
    question: "A product costs ₹500 and is sold at ₹600. What is the profit percentage?",
    options: ["10%", "15%", "20%", "25%"],
    correctAnswer: 2,
    explanation: "Profit = 600 - 500 = ₹100\nProfit % = (100 / 500) * 100 = 20%"
  },
  {
    id: 2,
    category: "Quantitative Aptitude",
    topic: "Time & Work",
    question: "A can do a piece of work in 10 days and B can do the same work in 15 days. If they work together, in how many days will they finish the work?",
    options: ["4 days", "5 days", "6 days", "8 days"],
    correctAnswer: 2,
    explanation: "Work done by A in 1 day = 1/10\nWork done by B in 1 day = 1/15\nWork done by both in 1 day = (1/10) + (1/15) = 5/30 = 1/6\nSo, they will finish the work in 6 days."
  },
  {
    id: 3,
    category: "Quantitative Aptitude",
    topic: "Time, Speed & Distance",
    question: "A train 150m long is running at a speed of 90 km/hr. How much time will it take to cross a pole?",
    options: ["5 sec", "6 sec", "8 sec", "10 sec"],
    correctAnswer: 1,
    explanation: "Speed in m/s = 90 * (5/18) = 25 m/s\nDistance to cover = Length of train = 150m\nTime = Distance / Speed = 150 / 25 = 6 seconds."
  },
  {
    id: 4,
    category: "Quantitative Aptitude",
    topic: "Simple & Compound Interest",
    question: "What is the simple interest on ₹4000 at 5% per annum for 3 years?",
    options: ["₹400", "₹500", "₹600", "₹700"],
    correctAnswer: 2,
    explanation: "Simple Interest = (P * R * T) / 100\nSI = (4000 * 5 * 3) / 100 = 60000 / 100 = ₹600"
  },
  {
    id: 5,
    category: "Quantitative Aptitude",
    topic: "Ratio & Proportion",
    question: "If A : B = 3 : 4 and B : C = 8 : 9, then what is A : C?",
    options: ["2 : 3", "3 : 4", "1 : 2", "1 : 3"],
    correctAnswer: 0,
    explanation: "A/C = (A/B) * (B/C)\nA/C = (3/4) * (8/9) = 24/36 = 2/3\nSo, A : C = 2 : 3."
  },
  {
    id: 6,
    category: "Quantitative Aptitude",
    topic: "Averages",
    question: "The average of 5 consecutive odd numbers is 27. What is the highest number among them?",
    options: ["29", "31", "33", "27"],
    correctAnswer: 1,
    explanation: "Let the numbers be x, x+2, x+4, x+6, x+8.\nAverage = (5x + 20)/5 = x + 4.\nGiven, x + 4 = 27 => x = 23.\nHighest number = x + 8 = 23 + 8 = 31."
  },
  {
    id: 7,
    category: "Quantitative Aptitude",
    topic: "Profit & Loss",
    question: "If the cost price of 15 articles is equal to the selling price of 12 articles, find the profit %.",
    options: ["20%", "25%", "15%", "10%"],
    correctAnswer: 1,
    explanation: "Let CP of 1 article = ₹1. CP of 12 articles = ₹12.\nSP of 12 articles = CP of 15 articles = ₹15.\nProfit = 15 - 12 = ₹3.\nProfit % = (3/12) * 100 = 25%."
  },

  // Logical Reasoning
  {
    id: 8,
    category: "Logical Reasoning",
    topic: "Number Series",
    question: "Find the missing number in the series: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "48"],
    correctAnswer: 1,
    explanation: "The pattern is:\n1*2 = 2\n2*3 = 6\n3*4 = 12\n4*5 = 20\n5*6 = 30\nSo, 6*7 = 42."
  },
  {
    id: 9,
    category: "Logical Reasoning",
    topic: "Coding-Decoding",
    question: "If in a certain language, 'TABLE' is coded as 'UBCMF', how will 'CHAIR' be coded?",
    options: ["DIBJS", "DIBKS", "DJBJS", "DJBKS"],
    correctAnswer: 0,
    explanation: "Each letter is shifted by +1 in the alphabet.\nT -> U\nA -> B\nB -> C\nL -> M\nE -> F\nSo, CHAIR -> DIBJS."
  },
  {
    id: 10,
    category: "Logical Reasoning",
    topic: "Blood Relations",
    question: "Pointing to a photograph, a man said, 'I have no brother or sister but that man's father is my father's son.' Whose photograph was it?",
    options: ["His own", "His son's", "His father's", "His nephew's"],
    correctAnswer: 1,
    explanation: "Since the narrator has no brother or sister, 'my father's son' refers to the narrator himself.\nSo, 'that man's father' is the narrator.\nThus, the photograph is of his son."
  },
  {
    id: 11,
    category: "Logical Reasoning",
    topic: "Direction Sense",
    question: "A man walks 5 km toward South and then turns to the right. After walking 3 km, he turns to the left and walks 5 km. In which direction is he from the starting point?",
    options: ["West", "South", "South-West", "South-East"],
    correctAnswer: 2,
    explanation: "Starting from origin (0,0):\nGoes South 5km -> (0, -5)\nTurns right (faces West) and walks 3km -> (-3, -5)\nTurns left (faces South) and walks 5km -> (-3, -10)\nThe final point is South-West of the origin."
  },
  {
    id: 12,
    category: "Logical Reasoning",
    topic: "Syllogism",
    question: "Statements: Some cats are dogs. All dogs are birds.\nConclusions: \nI. Some cats are birds.\nII. Some birds are cats.",
    options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither follows"],
    correctAnswer: 2,
    explanation: "Since all dogs are birds, the intersection of cats and dogs is also part of birds. Thus, some cats are birds, which means some birds are cats. Both conclusions follow."
  },

  // Verbal Ability
  {
    id: 13,
    category: "Verbal Ability",
    topic: "Sentence Correction",
    question: "Identify the incorrect part of the sentence: 'Neither of the boys have returned.'",
    options: ["Neither of", "the boys", "have", "returned"],
    correctAnswer: 2,
    explanation: "'Neither' is a singular subject, so it requires a singular verb. 'have' should be 'has'."
  },
  {
    id: 14,
    category: "Verbal Ability",
    topic: "Synonyms & Antonyms",
    question: "What is the synonym of 'LUCID'?",
    options: ["Obscure", "Clear", "Complicated", "Vague"],
    correctAnswer: 1,
    explanation: "'Lucid' means expressed clearly or easy to understand."
  },
  {
    id: 15,
    category: "Verbal Ability",
    topic: "Vocabulary",
    question: "Choose the correct spelling:",
    options: ["Accommodate", "Acommodate", "Accomodate", "Acomodate"],
    correctAnswer: 0,
    explanation: "The correct spelling is 'Accommodate' (two c's, two m's)."
  },
  {
    id: 16,
    category: "Verbal Ability",
    topic: "Para Jumbles",
    question: "Arrange the parts in order: \nP: an essential part \nQ: of our daily lives \nR: smartphones have become \nS: in today's world",
    options: ["RSQP", "SRQP", "SQPR", "SRPQ"],
    correctAnswer: 3,
    explanation: "S: in today's world\nR: smartphones have become\nP: an essential part\nQ: of our daily lives\nSRPQ forms a meaningful sentence."
  },
  {
    id: 17,
    category: "Verbal Ability",
    topic: "Synonyms & Antonyms",
    question: "What is the antonym of 'MITIGATE'?",
    options: ["Alleviate", "Aggravate", "Relieve", "Soothe"],
    correctAnswer: 1,
    explanation: "'Mitigate' means to make less severe. 'Aggravate' means to make worse."
  },
  {
    id: 18,
    category: "Quantitative Aptitude",
    topic: "Permutation & Combination",
    question: "In how many different ways can the letters of the word 'MATH' be arranged?",
    options: ["12", "24", "48", "120"],
    correctAnswer: 1,
    explanation: "The word has 4 distinct letters. So they can be arranged in 4! = 4*3*2*1 = 24 ways."
  },
  {
    id: 19,
    category: "Logical Reasoning",
    topic: "Number Series",
    question: "Find the missing number: 1, 9, 25, 49, ?, 121",
    options: ["64", "81", "91", "100"],
    correctAnswer: 1,
    explanation: "The series is of squares of consecutive odd numbers: 1², 3², 5², 7², 9² (81), 11²."
  },
  {
    id: 20,
    category: "Quantitative Aptitude",
    topic: "Probability",
    question: "What is the probability of getting a sum 9 from two throws of a dice?",
    options: ["1/6", "1/8", "1/9", "1/12"],
    correctAnswer: 2,
    explanation: "Total possible outcomes = 36.\nOutcomes that yield a sum of 9 = (3,6), (4,5), (5,4), (6,3) => 4 outcomes.\nProbability = 4/36 = 1/9."
  }
];
