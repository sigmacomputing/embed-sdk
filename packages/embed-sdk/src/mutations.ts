import {
  WorkbookBookmarkCreateEvent,
  WorkbookBookmarkCreateEventName,
  WorkbookBookmarkUpdateEventName,
  WorkbookFullscreenUpdateEventName,
  WorkbookSelectedNodeIdUpdateEventName,
  WorkbookSharingLinkUpdateEventName,
  WorkbookVariablesListEventName,
  WorkbookVariablesUpdateEventName,
} from "./types";

let SIGMA_COMPUTING_URL = "https://app.sigmacomputing.com";

const sendIframeMessage = (
  iframe: HTMLIFrameElement,
  message: { type: string; [key: string]: unknown },
) => {
  if (!iframe.contentWindow) {
    throw new Error("iframe contentWindow is not available");
  }
  iframe.contentWindow.postMessage(message, SIGMA_COMPUTING_URL);
};

/**
 * DO NOT USE IN PRODUCTION.
 *
 * This will override the Sigma Computing URL used for mutations.
 *
 * @param url the URL to use instead of the default
 */
export const DO_NOT_USE_IN_PRODUCTION_overrideMutationUrl = (url: string) => {
  SIGMA_COMPUTING_URL = url;
};

export const workbookBookmarkCreate = (
  iframe: HTMLIFrameElement,
  bookmark: WorkbookBookmarkCreateEvent,
) => {
  sendIframeMessage(iframe, {
    type: WorkbookBookmarkCreateEventName,
    ...bookmark,
  });
};

export const workbookBookmarkUpdate = (iframe: HTMLIFrameElement) => {
  sendIframeMessage(iframe, {
    type: WorkbookBookmarkUpdateEventName,
  });
};

export const workbookFullscreenUpdate = (
  iframe: HTMLIFrameElement,
  nodeId: string | null,
) => {
  sendIframeMessage(iframe, {
    type: WorkbookFullscreenUpdateEventName,
    nodeId: nodeId,
  });
};

export const workbookSelectedNodeIdUpdate = (
  iframe: HTMLIFrameElement,
  nodeId: string,
  nodeType: "element" | "page",
) => {
  sendIframeMessage(iframe, {
    type: WorkbookSelectedNodeIdUpdateEventName,
    nodeId: nodeId,
    nodeType: nodeType,
  });
};

export const workbookVariablesList = (iframe: HTMLIFrameElement) => {
  sendIframeMessage(iframe, {
    type: WorkbookVariablesListEventName,
  });
};

export const workbookVariablesUpdate = (
  iframe: HTMLIFrameElement,
  variables: Record<string, string>,
) => {
  sendIframeMessage(iframe, {
    type: WorkbookVariablesUpdateEventName,
    variables: variables,
  });
};

export const workbookSharingLinkUpdate = (
  iframe: HTMLIFrameElement,
  sharingLink: string | null,
  sharingExplorationLink?: string | null,
) => {
  sendIframeMessage(iframe, {
    type: WorkbookSharingLinkUpdateEventName,
    sharingLink: sharingLink,
    sharingExplorationLink: sharingExplorationLink,
  });
};
