export interface Answer {
  text: string;
  points: number;
}

export interface Question {
  text: string;
  answers: Answer[];
}

// This data should be fetched from a DB or API, in this example it is hardcoded
export const QUESTIONS_DATA: Question[] = [
  {
    text: "You’re really busy at work and a colleague is telling you their life story and personal woes. You:",
    answers: [
      {
        text: "Don’t dare to interrupt them",
        points: 1,
      },
      {
        text: "Think it’s more important to give them some of your time; work can wait",
        points: 2,
      },
      {
        text: "Listen, but with only with half an ear",
        points: 3,
      },
      {
        text: "Interrupt and explain that you are really busy at the moment",
        points: 4,
      },
    ],
  },

  {
    text: "You’ve been sitting in the doctor’s waiting room for more than 25 minutes. You:",
    answers: [
      {
        text: "Look at your watch every two minutes",
        points: 1,
      },
      {
        text: "Bubble with inner anger, but keep quiet",
        points: 2,
      },
      {
        text: "Explain to other equally impatient people in the room that the doctor is always running late",
        points: 3,
      },
      {
        text: "Complain in a loud voice, while tapping your foot impatiently",
        points: 4,
      },
    ],
  },
  {
    text: "You’re having an animated discussion with a colleague regarding a project that you’re in charge of. You:",
    answers: [
      {
        text: "Don’t dare contradict them",
        points: 1,
      },
      {
        text: "Think that they are obviously right",
        points: 2,
      },
      {
        text: "Defend your own point of view, tooth and nail",
        points: 3,
      },
      {
        text: "Continuously interrupt your colleague",
        points: 4,
      },
    ],
  },
];
