import React from "react";

type AnimatedFramesProps = {
  frames: string[];
  fps?: number;
  alt?: string;
  className?: string;
};

const AnimatedFrames: React.FC<AnimatedFramesProps> = ({
  frames,
  fps = 8, // 8 فريم في الثانية مثلاً
  alt = "",
  className = "",
}) => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (!frames.length) return;

    const interval = 1000 / fps;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % frames.length);
    }, interval);

    return () => window.clearInterval(id);
  }, [frames, fps]);

  return <img src={frames[index]} alt={alt} className={className} />;
};

export default AnimatedFrames;
