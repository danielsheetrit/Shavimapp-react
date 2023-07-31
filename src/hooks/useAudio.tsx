import { useState, useEffect } from "react";

type UseAudioValuesType = {
  playing: boolean;
  toggle: () => void;
};

export default function useAudio(path: string): UseAudioValuesType {
  const [audio] = useState(new Audio(path));
  const [playing, setPlaying] = useState(false);

  console.log(audio);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [audio, playing]);

  //   useEffect(() => {
  //     audio.addEventListener("ended", () => setPlaying(false));
  //     return () => {
  //       audio.removeEventListener("ended", () => setPlaying(false));
  //     };
  //   }, []);

  return { playing, toggle };
}
