const situations = [
  {
    name: "Awkward silence",
    jokes: [
      "Awkward silences are just group chats where nobody has found the send button yet.",
      "I tried to break the awkward silence, but it had already filed for emotional damages.",
      "An awkward silence walked into a room. Everyone noticed, but nobody wanted to say anything."
    ]
  },
  {
    name: "Running late",
    jokes: [
      "I am not late; I am giving everyone else a head start on missing me.",
      "Running late is cardio for people who hate cardio and calendars.",
      "My punctuality is in beta. Please expect occasional delays and nervous sweating."
    ]
  },
  {
    name: "Monday morning",
    jokes: [
      "Monday mornings are proof that alarms can be rude in multiple time zones.",
      "My coffee needs coffee before it can help me with Monday.",
      "Monday entered the chat, and every weekend plan left me on read."
    ]
  },
  {
    name: "Video call freeze",
    jokes: [
      "If I freeze on a video call, assume I am either thoughtful or becoming a low-budget painting.",
      "My internet froze at the perfect moment, which is how I accidentally became a suspense thriller.",
      "Video calls taught me that 'Can you hear me?' is the modern mating call of office workers."
    ]
  },
  {
    name: "Waiting in line",
    jokes: [
      "Waiting in line is just a conga dance for people with errands.",
      "This line is moving so slowly, my future self just asked if I need snacks.",
      "I joined a line for patience, but the wait was too long."
    ]
  },
  {
    name: "Forgot a name",
    jokes: [
      "I forgot their name, so now everyone is 'champ' until further notice.",
      "Forgetting a name turns a handshake into a pop quiz with eye contact.",
      "My brain saved the face as a file named definitely_someone_final_v3."
    ]
  },
  {
    name: "Gym motivation",
    jokes: [
      "I went to the gym for a six-pack and left with a smoothie and questions.",
      "My workout plan is simple: lift spirits, lower expectations.",
      "The treadmill and I have an agreement: it goes nowhere, and so do I."
    ]
  },
  {
    name: "Rainy day",
    jokes: [
      "Rainy days are the sky's way of saying, 'You washed your car, didn't you?'",
      "I brought an umbrella, so naturally the wind joined the meeting uninvited.",
      "Rain makes everything cozy, except socks. Socks take it personally."
    ]
  }
];

const select = document.querySelector("#situation-select");
const customInput = document.querySelector("#custom-input");
const customButton = document.querySelector("#custom-button");
const newJokeButton = document.querySelector("#new-joke-button");
const copyButton = document.querySelector("#copy-button");
const situationLabel = document.querySelector("#situation-label");
const jokeText = document.querySelector("#joke-text");
const copyStatus = document.querySelector("#copy-status");

let currentSituation = situations[0];
let currentJokeIndex = 0;

function populateSituations() {
  situations.forEach((situation, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = situation.name;
    select.append(option);
  });
}

function randomIndex(max, except = -1) {
  if (max <= 1) return 0;

  let next = Math.floor(Math.random() * max);
  while (next === except) {
    next = Math.floor(Math.random() * max);
  }
  return next;
}

function showJoke(situation, jokeIndex = randomIndex(situation.jokes.length)) {
  currentSituation = situation;
  currentJokeIndex = jokeIndex;
  situationLabel.textContent = `For: ${situation.name}`;
  jokeText.textContent = situation.jokes[jokeIndex];
  copyStatus.textContent = "";
}

function makeCustomJoke(rawSituation) {
  const cleaned = rawSituation.trim().replace(/\s+/g, " ");
  const situationName = cleaned || "a mysterious situation";
  const templates = [
    `Being in ${situationName} is just character development with worse lighting.`,
    `I asked for advice about ${situationName}, and my calendar replied, "Good luck, legend."`,
    `${situationName} sounds like the universe opened a comedy club and made you the headliner.`
  ];

  return {
    name: situationName[0].toUpperCase() + situationName.slice(1),
    jokes: templates
  };
}

select.addEventListener("change", () => {
  showJoke(situations[Number(select.value)]);
});

newJokeButton.addEventListener("click", () => {
  const nextIndex = randomIndex(currentSituation.jokes.length, currentJokeIndex);
  showJoke(currentSituation, nextIndex);
});

customButton.addEventListener("click", () => {
  showJoke(makeCustomJoke(customInput.value));
});

customInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    showJoke(makeCustomJoke(customInput.value));
  }
});

copyButton.addEventListener("click", async () => {
  const textToCopy = `${situationLabel.textContent}\n${jokeText.textContent}`;

  try {
    await navigator.clipboard.writeText(textToCopy);
    copyStatus.textContent = "Copied! Deploy joke responsibly.";
  } catch {
    copyStatus.textContent = "Copy failed, but the joke is still yours to tell.";
  }
});

populateSituations();
showJoke(currentSituation);
