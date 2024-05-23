import {
  WorkbookLoadedEventName,
  WorkbookErrorEventName,
  WorkbookVariableEventName,
  WorkbookTableCellSelectEventName,
  WorkbookPublishedEventName,
  WorkbookFullScreenEventName,
  WorkbookPageHeightEventName,
  WorkbookLoadedEvent,
  WorkbookErrorEvent,
  WorkbookVariableEvent,
  WorkbookTableCellSelectEvent,
  WorkbookPublishedEvent,
  WorkbookFullScreenEvent,
  WorkbookPageHeightEvent,
  WorkbookPageSelectedNodeEvent,
  WorkbookPageSelectedNodeEventName,
} from "./types";

export const workbookLoadedListener = (
  event: MessageEvent,
  iframe: HTMLIFrameElement,
  onLoaded: (event: WorkbookLoadedEvent) => void,
) => {
  if (
    event.source === iframe.contentWindow &&
    event.origin === "https://staging.sigmacomputing.io"
  ) {
    if (event.data.type === WorkbookLoadedEventName) {
      onLoaded(event.data);
    }
  }
};

export const workbookErrorListener = (
  event: MessageEvent,
  iframe: HTMLIFrameElement,
  onError: (event: WorkbookErrorEvent) => void,
) => {
  if (
    event.source === iframe.contentWindow &&
    event.origin === "https://staging.sigmacomputing.io"
  ) {
    if (event.data.type === WorkbookErrorEventName) {
      onError(event.data);
    }
  }
};

export const workbookVariableListener = (
  event: MessageEvent,
  iframe: HTMLIFrameElement,
  onVariable: (event: WorkbookVariableEvent) => void,
) => {
  if (
    event.source === iframe.contentWindow &&
    event.origin === "https://staging.sigmacomputing.io"
  ) {
    if (event.data.type === WorkbookVariableEventName) {
      onVariable(event.data);
    }
  }
};

export const workbookTableCellSelectListener = (
  event: MessageEvent,
  iframe: HTMLIFrameElement,
  onTableCellSelect: (event: WorkbookTableCellSelectEvent) => void,
) => {
  if (
    event.source === iframe.contentWindow &&
    event.origin === "https://staging.sigmacomputing.io"
  ) {
    if (event.data.type === WorkbookTableCellSelectEventName) {
      onTableCellSelect(event.data);
    }
  }
};

export const workbookPublishedListener = (
  event: MessageEvent,
  iframe: HTMLIFrameElement,
  onPublished: (event: WorkbookPublishedEvent) => void,
) => {
  if (
    event.source === iframe.contentWindow &&
    event.origin === "https://staging.sigmacomputing.io"
  ) {
    if (event.data.type === WorkbookPublishedEventName) {
      onPublished(event.data);
    }
  }
};

export const workbookFullScreenListener = (
  event: MessageEvent,
  iframe: HTMLIFrameElement,
  onFullScreen: (event: WorkbookFullScreenEvent) => void,
) => {
  if (
    event.source === iframe.contentWindow &&
    event.origin === "https://staging.sigmacomputing.io"
  ) {
    if (event.data.type === WorkbookFullScreenEventName) {
      onFullScreen(event.data);
    }
  }
};

export const workbookPageHeightListener = (
  event: MessageEvent,
  iframe: HTMLIFrameElement,
  onPageHeight: (event: WorkbookPageHeightEvent) => void,
) => {
  if (
    event.source === iframe.contentWindow &&
    event.origin === "https://staging.sigmacomputing.io"
  ) {
    if (event.data.type === WorkbookPageHeightEventName) {
      onPageHeight(event.data);
    }
  }
};

export const workbookPageSelectedNodeListener = (
  event: MessageEvent,
  iframe: HTMLIFrameElement,
  onPageSelectedNode: (event: WorkbookPageSelectedNodeEvent) => void,
) => {
  if (
    event.source === iframe.contentWindow &&
    event.origin === "https://staging.sigmacomputing.io"
  ) {
    if (event.data.type === WorkbookPageSelectedNodeEventName) {
      onPageSelectedNode(event.data);
    }
  }
};
