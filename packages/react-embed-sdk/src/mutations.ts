import { useEffect, useState } from "react";
import {
  workbookVariablesList,
  workbookCurrentVariablesListener,
} from "@sigmacomputing/embed-sdk";

type CallBackState =
  | {
      state: "pending";
      callback: (variables: Record<string, string>) => void;
    }
  | {
      state: "success";
      variables: Record<string, string>;
    };

export const useWorkbookVariables = (
  iframeRef: React.RefObject<HTMLIFrameElement>,
) => {
  const [state, setState] = useState<CallBackState>();
  const getCurrentVariables = (
    onVariables: (variables: Record<string, string>) => void,
  ) => {
    if (!iframeRef.current) {
      throw new Error("iframe contentWindow is not available");
    }
    workbookVariablesList(iframeRef.current);
    setState({ state: "pending", callback: onVariables });
  };
  useEffect(() => {
    if (!iframeRef.current) return;
    const listener = (event: MessageEvent) => {
      if (!iframeRef.current) {
        return;
      }
      workbookCurrentVariablesListener(event, iframeRef.current, (event) => {
        if (state?.state === "pending") {
          setState({ state: "success", variables: event.variables });
          state.callback(event.variables);
        }
      });
    };
    window.addEventListener("message", listener);
    return () => {
      window.removeEventListener("message", listener);
    };
  }, [iframeRef]);
  return { getCurrentVariables };
};
