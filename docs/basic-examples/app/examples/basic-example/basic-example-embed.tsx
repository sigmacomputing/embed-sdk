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
        className={loading || error ? "opacity-0 pointer-events-none" : ""}
        width={"100%"}
        height={"100%"}
      />
    </>
  );
}
