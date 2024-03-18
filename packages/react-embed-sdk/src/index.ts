import { useEffect } from "react";
import {
  WorkbookErrorEvent,
  WorkbookLoadedEvent,
  workbookErrorListener,
  workbookLoadedListener,
} from "@sigmacomputing/embed-sdk";

export type OnLoaded = (event: WorkbookLoadedEvent) => void;
export type OnError = (event: WorkbookErrorEvent) => void;

export function useWorkbookLoaded(
  iframeRef: React.RefObject<HTMLIFrameElement>,
  onLoaded: OnLoaded,
) {
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (!iframeRef.current) {
        return;
      }
      workbookLoadedListener(event, iframeRef.current, onLoaded);
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, [iframeRef, onLoaded]);
}

export function useWorkbookError(
  iframeRef: React.RefObject<HTMLIFrameElement>,
  onError: OnError,
) {
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (!iframeRef.current) {
        return;
      }
      workbookErrorListener(event, iframeRef.current, onError);
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, [iframeRef, onError]);
}
