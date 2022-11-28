import { useState } from "react";
import SRSS1x30sec from "../../../../audio/SRSS-1x30sec.mp3";
import SRDU2x30sec from "../../../../audio/SRDU-2x30sec.mp3";
import SRSE1x180sec from "../../../../audio/SRSE-1x180sec.mp3";
import SRSR4x30sec from "../../../../audio/SRSR-4x30sec.mp3";
import DDSS1x60sec from "../../../../audio/DDSS-1x60sec.mp3";
import DDSR4x30sec from "../../../../audio/DDSR-4x30sec.mp3";

export default function useTimingTracksController() {
  const [src, setSrc] = useState(SRSS1x30sec);

  const handleTrackChange = (event) => {
    if (event.target.value === "SRSS-1x30sec") {
      setSrc(SRSS1x30sec);
    } else if (event.target.value === "SRDU-2x30sec") {
      setSrc(SRDU2x30sec);
    } else if (event.target.value === "SRSE-1x180sec") {
      setSrc(SRSE1x180sec);
    } else if (event.target.value === "SRSR-4x30sec") {
      setSrc(SRSR4x30sec);
    } else if (event.target.value === "DDSR-4x30sec") {
      setSrc(DDSR4x30sec);
    } else if (event.target.value === "DDSS-1x60sec") {
      setSrc(DDSS1x60sec);
    }
  };

  return [src, handleTrackChange];
}
