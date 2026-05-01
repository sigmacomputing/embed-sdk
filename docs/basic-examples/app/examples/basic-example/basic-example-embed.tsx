"use client";
import { useSigmaIframe } from "@sigmacomputing/react-embed-sdk";

export default function BasicExample({ src }: { src: string }) {
  const { iframeRef, loading, error } = useSigmaIframe();
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading iframe</p>}
      <iframe
        src={src}
        ref={iframeRef}
        style={{
          opacity: loading || error ? 0 : 1,
          pointerEvents: loading || error ? "none" : "auto",
        }}
        width={"100%"}
        height={"100%"}
      />
    </>
  );
}
