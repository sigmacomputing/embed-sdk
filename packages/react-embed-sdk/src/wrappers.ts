import {
  WorkbookLoadedEvent,
  WorkbookErrorEvent,
  workbookLoadedListener,
  workbookErrorListener,
} from "@sigmacomputing/embed-sdk";
import { useEffect } from "react";

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
 *      src="https://app.sigmacomputing.com/embed"
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
 *      src="https://app.sigmacomputing.com/embed"
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

/**
 * Listen for a workbook data loaded event, and execute the given callback when it occurs.
 *
 * @example
 * ```
 * function MyEmbed() {
 *   const [dataLoaded, setDataLoaded] = useState(false);
 *   const onDataLoaded = useCallback(() => setDataLoaded(true), []);
 *   const iframeRef = useRef<HTMLIFrameElement>(null);
 *   return (
 *    <iframe
 *      ref={iframeRef}
 *      src="https://app.sigmacomputing.com/embed"
 *    />
 *   );
 * }
 * ```
 *
 */
// export function useWorkbookDataLoaded(
//   iframeRef: React.RefObject<HTMLIFrameElement>,
//   onDataLoaded: () => void,
// ) {
//   useEffect(() => {
//     const listener = (event: MessageEvent) => {
//       if (!iframeRef.current) {
//         return;
//       }
//       workbookDataLoadedListener(event, iframeRef.current, onDataLoaded);
//     };
//     window.addEventListener("message", listener);
//     return () => window.removeEventListener("message", listener);
//   }, [iframeRef, onDataLoaded]);
// }
