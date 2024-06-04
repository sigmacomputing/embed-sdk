import { useCallback, useEffect, useRef, useState } from "react";
import {
  WorkbookErrorEvent,
  WorkbookLoadedEvent,
  workbookErrorListener,
  workbookLoadedListener,
} from "@sigmacomputing/embed-sdk";

// Reexport all types from the embed-sdk package
// so that it's easier to import them from this package
export type * from "@sigmacomputing/embed-sdk";

export type OnLoaded = (event: WorkbookLoadedEvent) => void;
export type OnError = (event: WorkbookErrorEvent) => void;

/**
 * Listen for a workbook loaded event, and execute the given callback when it occurs.
 *
 * @example
 * ```
 * function MyEmbed() {
 *   const [loading, setLoading] = useState(true);
 *   const loadingCallback = useCallback(() => setLoading(false), []);
 *   const iframeRef = useRef<HTMLIFrameElement>(null);
 *   useWorkbookLoaded(iframeRef, loadingCallback);
 *   return (
 *    <iframe
 *      className{loading ? "hidden" : "show"}
 *      ref={iframeRef}
 *      src="https://sigmacomputing.app/embed"
 *    />
 *   );
 * }
 * ```
 *
 */
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

/**
 * Listen for a workbook error event, and execute the given callback when it occurs.
 *
 * @example
 * ```
 * function MyEmbed() {
 *   const [error, setError] = useState<string | null>(null);
 *   const onError = useCallback((event: WorkbookErrorEvent) => {
 *     sendToErrorReporting(event.message);
 *     setError(event.message);
 *   }, []);
 *   const iframeRef = useRef<HTMLIFrameElement>(null);
 *   return (
 *    <iframe
 *      ref={iframeRef}
 *      src="https://sigmacomputing.app/embed"
 *    />
 *   );
 * }
 * ```
 *
 */
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

// This function can't be auto generated, but we can provide a
// better abstraction. In the final state of this project, it would
// be nice to see most functions auto generated but some
// hand generated for better abstraction.

/**
 * A hook that returns a ref to be used with an iframe element, and the loading and error state of the embed.
 *
 * @example
 * ```
 * function MyEmbed() {
 *  const { iframeRef, loading, error } = useSigmaIframe();
 *  return (
 *   <>
 *     {loading && <p>Loading...</p>}
 *     {error && <p>Error: {error.message}</p>}
 *     <iframe
 *       className={loading || error ? "hidden" : "show"}
 *       ref={iframeRef}
 *       src="https://sigmacomputing.app/embed"
 *     />
 *   </>
 * );
 * }
 * ```
 */
export function useSigmaIframe() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<WorkbookErrorEvent | null>(null);
  const loadingCallback = useCallback(() => setLoading(false), []);
  const errorCallback = useCallback((event: WorkbookErrorEvent) => {
    setError(event);
    setLoading(false);
  }, []);
  useWorkbookLoaded(iframeRef, loadingCallback);
  useWorkbookError(iframeRef, errorCallback);
  return { iframeRef, loading, error };
}
