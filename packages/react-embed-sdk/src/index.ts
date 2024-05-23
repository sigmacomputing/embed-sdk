import { useEffect } from "react";
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
