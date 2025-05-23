import {
  workbookVariablesList,
  workbookVariablesUpdate,
  workbookBookmarkCreate,
  workbookBookmarkUpdate,
  workbookFullscreenUpdate,
  workbookSelectedNodeIdUpdate,
  WorkbookBookmarkCreateEvent,
  workbookSharingLinkUpdate,
  workbookBookmarkDelete,
  workbookBookmarkSelect,
} from "@sigmacomputing/embed-sdk";

export { DO_NOT_USE_IN_PRODUCTION_overrideMutationUrl } from "@sigmacomputing/embed-sdk";

export function getWorkbookVariables(
  iframeRef: React.RefObject<HTMLIFrameElement>,
) {
  if (!iframeRef.current) {
    throw new Error("iframe is not available");
  }
  workbookVariablesList(iframeRef.current);
}

export function updateWorkbookVariables(
  iframeRef: React.RefObject<HTMLIFrameElement>,
  variables: Record<string, string>,
) {
  if (!iframeRef.current) {
    throw new Error("iframe is not available");
  }
  workbookVariablesUpdate(iframeRef.current, variables);
}

export function createWorkbookBookmark(
  iframeRef: React.RefObject<HTMLIFrameElement>,
  bookmark: WorkbookBookmarkCreateEvent,
) {
  if (!iframeRef.current) {
    throw new Error("iframe is not available");
  }
  workbookBookmarkCreate(iframeRef.current, bookmark);
}

export function updateWorkbookBookmark(
  iframeRef: React.RefObject<HTMLIFrameElement>,
) {
  if (!iframeRef.current) {
    throw new Error("iframe is not available");
  }
  workbookBookmarkUpdate(iframeRef.current);
}

export function deleteWorkbookBookmark(
  iframeRef: React.RefObject<HTMLIFrameElement>,
  bookmarkId: string,
) {
  if (!iframeRef.current) {
    throw new Error("iframe is not available");
  }
  workbookBookmarkDelete(iframeRef.current, bookmarkId);
}

export function selectWorkbookBookmark(
  iframeRef: React.RefObject<HTMLIFrameElement>,
  bookmarkId?: string,
) {
  if (!iframeRef.current) {
    throw new Error("iframe is not available");
  }
  workbookBookmarkSelect(iframeRef.current, bookmarkId);
}

export function updateWorkbookFullscreen(
  iframeRef: React.RefObject<HTMLIFrameElement>,
  nodeId: string | null,
) {
  if (!iframeRef.current) {
    throw new Error("iframe is not available");
  }
  workbookFullscreenUpdate(iframeRef.current, nodeId);
}

export function updateWorkbookSelectedNodeId(
  iframeRef: React.RefObject<HTMLIFrameElement>,
  nodeId: string,
  nodeType: "element" | "page",
) {
  if (!iframeRef.current) {
    throw new Error("iframe is not available");
  }
  workbookSelectedNodeIdUpdate(iframeRef.current, nodeId, nodeType);
}

export function updateWorkbookSharingLink(
  iframeRef: React.RefObject<HTMLIFrameElement>,
  sharingLink: string | null,
  sharingExplorationLink?: string | null,
) {
  if (!iframeRef.current) {
    throw new Error("iframe is not available");
  }
  workbookSharingLinkUpdate(
    iframeRef.current,
    sharingLink,
    sharingExplorationLink,
  );
}
