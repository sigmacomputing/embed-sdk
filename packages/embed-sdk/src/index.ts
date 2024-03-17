export interface WorkbookLoadedEvent {
  type: "workbook:loaded";
  workbook: {
    variables: Record<string, string>;
  };
}

export interface WorkbookErrorEvent {
  type: "workbook:error";
  code: string;
  message: string;
}

export const workbookLoadedListener = (
  event: MessageEvent,
  iframe: HTMLIFrameElement,
  onLoaded: (event: WorkbookLoadedEvent) => void,
) => {
  if (
    event.source === iframe.contentWindow &&
    event.origin === "https://staging.sigmacomputing.io"
  ) {
    if (event.data.type === "workbook:loaded") {
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
    if (event.data.type === "workbook:error") {
      onError(event.data);
    }
  }
};
