'use client';

import { useEffect, useRef } from "react";

const LottiePlayer = ({ url }: { url: string }) => {
  const ref = useRef(null);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <div className="w-[300px] h-[300px] animate-in fade-in duration-500">
      <lottie-player
        id="firstLottie"
        ref={ref}
        autoplay
        mode="normal"
        src={url}
        style={{ width: "300px", height: "300px" }}
      ></lottie-player>
    </div>
  );
}

export default LottiePlayer
