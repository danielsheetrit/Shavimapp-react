import { useEffect, useRef } from "react";

export default function AvatarImg({ base64 }: { base64: string }) {
  const imageRef = useRef<HTMLImageElement>(null);

  console.log(typeof base64)
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      if (imageRef.current) {
        imageRef.current.src = img.src;
      }
    };
    img.src = `data:image/png;base64,${base64}`;
  }, [base64]);

  return (
    <img
      style={{ width: 65, height: 65, borderRadius: '50%' }}
      ref={imageRef}
      alt="Base64 content"
    />
  );
}
