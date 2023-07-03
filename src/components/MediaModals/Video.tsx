export default function Video({ url }: { url: string }) {
  return (
    <video
      autoPlay
      src={url}
      width={"100%"}
      height={275}
    />
  );
}
