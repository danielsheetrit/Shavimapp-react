const options = [
  {
    emoji: "😀",
    answer: "good",
  },
  {
    emoji: "😐",
    answer: "ok",
  },
  {
    emoji: "😕",
    answer: "little down",
  },
  {
    emoji: "🙁",
    answer: "sad",
  },
  {
    emoji: "😡",
    answer: "bad",
  },
];

export default function MediaIndicator({ answer }: { answer: string }) {
  const icon = options.find((el) => el.answer === answer);

  if (!icon) {
    return <p>-</p>;
  }

  return <p style={{ fontSize: 18 }}>{icon.emoji}</p>;
}
