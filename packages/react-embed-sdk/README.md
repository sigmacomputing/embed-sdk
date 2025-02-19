## Getting Started

To use the react-embed-sdk in your project, you can install it using your node package manager.

**Using npm:**

```code
npm install @sigmacomputing/react-embed-sdk
```

**yarn:**

```code
yarn add @sigmacomputing/react-embed-sdk
```

**pnpm:**

```code
pnpm add @sigmacomputing/react-embed-sdk
```

## Documentation

### Hooks

The library provides hooks that combine the lower level [listeners](#listeners) and [mutations](#mutations) to provide a more ergonomic API.

#### useSigmaIframe

A hook that returns a ref to be used with a Sigma iframe element, and the loading and error state of the embed.

```typescript
useSigmaIframe(): {
  iframeRef: React.RefObject<HTMLIFrameElement>;
  loading: boolean;
  error: WorkbookErrorEvent | null;
  variables: Record<string, string> | undefined;
}
```

Example usage:

```tsx
function MyEmbed() {
  const { iframeRef, loading, error } = useSigmaIframe();
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <iframe
        className={loading || error ? "hidden" : "show"}
        ref={iframeRef}
        {/* The embed url to load */}
        src="https://app.sigmacomputing.com/embed"
      />
    </>
  );
}
```

#### useWorkbookVariables

A hook that returns functions to get and set the variables in a workbook.

```typescript
useWorkbookVariables(iframeRef: React.RefObject<HTMLIFrameElement>): {
  getVariables: () => Promise<Record<string, string>>;
  setVariables: (variables: Record<string, string>) => void;
}
```

Example usage:

```tsx
function MyEmbed() {
  const { getVariables, setVariables } = useWorkbookVariables(iframeRef);
  return (
    <>
      <button onClick={() => setVariables({ foo: "bar" }))} name="set-variables">Set Filters</button>
      <button
        onClick={async () => {
          const variable = await getVariables();
        }}
        name="get-variables"
      >
        Get Filters
      </button>
      <iframe ref={iframeRef} src="https://app.sigmacomputing.com/embed" />
    </>
  );
}
```

#### usePageHeight

A hook that returns the height of the page in the iframe. This HAS to be used with the responsive_height [URL Parameter](https://help.sigmacomputing.com/docs/embed-url-parameters).

```typescript
usePageHeight(iframeRef: React.RefObject<HTMLIFrameElement>): number | undefined
```

Example usage:

```tsx
function MyEmbed() {
  const { iframeRef } = useSigmaIframe();
  const height = usePageHeight(iframeRef);
  return (
    <>
      <iframe
        style={{ height }}
        ref={iframeRef}
        src="https://app.sigmacomputing.com/embed?:responsive_height=true"
      />
    </>
  );
}
```

### Listeners

These are functions that can be used to listen for events from the embed, and react to them.

#### useWorkbookLoaded

Listen for a workbook loaded event, and execute the given callback when it occurs.

```typescript
useWorkbookLoaded(iframeRef: React.RefObject<HTMLIFrameElement>, onLoaded: (event: WorkbookLoadedEvent) => void)
```

#### useWorkbookError

Listen for a workbook error event, and execute the given callback when it occurs.

```typescript
useWorkbookError(iframeRef: React.RefObject<HTMLIFrameElement>, onError: (event: WorkbookErrorEvent) => void)
```

#### useWorkbookDataLoaded

Listen for a workbook data loaded event, and execute the given callback when it occurs.

```typescript
useWorkbookDataLoaded(iframeRef: React.RefObject<HTMLIFrameElement>, onDataLoaded: (event: WorkbookDataLoadedEvent) => void)
```

#### useVariableChange

Listen for a workbook variable change event, and execute the given callback when it occurs.

```typescript
useVariableChange(iframeRef: React.RefObject<HTMLIFrameElement>, onVariableChange: (event: WorkbookVariableOnChangeEvent) => void)
```

#### useTableCellSelect

Listen for a table cell select event, and execute the given callback when it occurs.

```typescript
useTableCellSelect(iframeRef: React.RefObject<HTMLIFrameElement>, onTableCellSelect: (event: WorkbookTableCellSelectEvent) => void)
```

#### useWorkbookPublished

Listen for a workbook published event, and execute the given callback when it occurs.

```typescript
useWorkbookPublished(iframeRef: React.RefObject<HTMLIFrameElement>, onWorkbookPublished: (event: WorkbookPublishedEvent) => void)
```

#### useWorkbookFullScreen

Listen for a workbook full screen event, and execute the given callback when it occurs.

```typescript
useWorkbookFullScreen(iframeRef: React.RefObject<HTMLIFrameElement>, onFullScreen: (event: WorkbookFullScreenEvent) => void)
```

#### useWorkbookPageHeight

Listen for a workbook page height event, and execute the given callback when it occurs. Needs to be used with the responsive_height [URL Parameter](https://help.sigmacomputing.com/docs/embed-url-parameters).

```typescript
useWorkbookPageHeight(iframeRef: React.RefObject<HTMLIFrameElement>, onPageHeight: (event: WorkbookPageHeightEvent) => void)
```

#### useWorkbookSelectedNode

Listen for a workbook selected node event, and execute the given callback when it occurs.

```typescript
useWorkbookSelectedNode(iframeRef: React.RefObject<HTMLIFrameElement>, onPageSelectedNode: (event: WorkbookSelectedNodeEvent) => void)
```

#### useWorkbookPivotTableCellSelect

Listen for a pivot table cell select event, and execute the given callback when it occurs.

```typescript
useWorkbookPivotTableCellSelect(iframeRef: React.RefObject<HTMLIFrameElement>, onPivotTableCellSelect: (event: WorkbookPivotTableCellSelectEvent) => void)
```

#### useWorkbookChartValueSelect

Listen for a chart value select event, and execute the given callback when it occurs.

```typescript
useWorkbookChartValueSelect(iframeRef: React.RefObject<HTMLIFrameElement>, onChartValueSelect: (event: WorkbookChartValueSelectEvent) => void)
```

#### useWorkbookCurrentVariables

Listen for a workbook current variables event, and execute the given callback when it occurs. This is to be used when `workbookVariablesList` is called.

```typescript
useWorkbookCurrentVariables(iframeRef: React.RefObject<HTMLIFrameElement>, onCurrentVariables: (event: WorkbookCurrentVariablesEvent) => void)
```

#### useWorkbookBookmarkOnCreate

Listen for a workbook bookmark create event, and execute the given callback when it occurs.

```typescript
useWorkbookBookmarkOnCreate(iframeRef: React.RefObject<HTMLIFrameElement>, onBookmarkCreate: (event: WorkbookBookmarkOnCreateEvent) => void)
```

#### useWorkbookBookmarkOnChange

Listen for a workbook bookmark change event, and execute the given callback when it occurs.

```typescript
useWorkbookBookmarkOnChange(iframeRef: React.RefObject<HTMLIFrameElement>, onBookmarkChange: (event: WorkbookBookmarkOnChangeEvent) => void)
```

#### useWorkbookBookmarkOnUpdate

Listen for a workbook bookmark update event, and execute the given callback when it occurs.

```typescript
useWorkbookBookmarkOnUpdate(iframeRef: React.RefObject<HTMLIFrameElement>, onBookmarkUpdate: (event: WorkbookBookmarkOnUpdateEvent) => void)
```

#### useWorkbookBookmarkOnDelete

Listen for a workbook bookmark delete event, and execute the given callback when it occurs.

```typescript
useWorkbookBookmarkOnDelete(iframeRef: React.RefObject<HTMLIFrameElement>, onBookmarkDelete: (event: WorkbookBookmarkOnDeleteEvent) => void)
```

#### useWorkbookChartError

Listen for a workbook chart error event, and execute the given callback when it occurs.

```typescript
useWorkbookChartError(iframeRef: React.RefObject<HTMLIFrameElement>, onChartError: (event: WorkbookChartErrorEvent) => void)
```

#### useWorkbookExploreKeyOnChange

Listen for a workbook explore key change event, and execute the given callback when it occurs.

```typescript
useWorkbookExploreKeyOnChange(iframeRef: React.RefObject<HTMLIFrameElement>, onExploreKeyOnChange: (event: WorkbookExploreKeyOnChangeEvent) => void)
```

#### useUrlOnChange

Listen for a url change event, and execute the given callback when it occurs.

```typescript
useUrlOnChange(iframeRef: React.RefObject<HTMLIFrameElement>, onUrlChange: (event: UrlOnChangeEvent) => void)
```

#### useWorkbookIdOnChange

Listen for a workbook id change event, and execute the given callback when it occurs.

```typescript
useWorkbookIdOnChange(iframeRef: React.RefObject<HTMLIFrameElement>, onWorkbookIdChange: (event: WorkbookIdOnChangeEvent) => void)
```

### Mutations

These are functions that can be used to send messages to the embed. They may cause an event to be emitted from the embed.

#### getWorkbookVariables

Send a message to the embed to list the current variables. This will cause a `workbook:variables:current` event to be emitted from the embed, and can be used with the `useWorkbookCurrentVariables` function.

```typescript
getWorkbookVariables(iframeRef: React.RefObject<HTMLIFrameElement>)
```

#### updateWorkbookVariables

Send a message to the embed to update the variables.

```typescript
updateWorkbookVariables(iframeRef: React.RefObject<HTMLIFrameElement>, variables: Record<string, string>)
```

#### createWorkbookBookmark

Send a message to the embed to create a bookmark.

```typescript
createWorkbookBookmark(iframeRef: React.RefObject<HTMLIFrameElement>, bookmark: WorkbookBookmarkCreateEvent)
```

#### updateWorkbookBookmark

Send a message to the embed to update the current bookmark.

```typescript
updateWorkbookBookmark(iframeRef: React.RefObject<HTMLIFrameElement>)
```

#### deleteWorkbookBookmark

Send a message to the embed to delete the given bookmark.

```typescript
deleteWorkbookBookmark(iframeRef: React.RefObject<HTMLIFrameElement>, bookmarkId: string)
```

#### selectWorkbookBookmark

Send a message to the embed to select the given bookmark. If no bookmarkId is provided, the current bookmark will be deselected.

```typescript
selectWorkbookBookmark(iframeRef: React.RefObject<HTMLIFrameElement>, bookmarkId?: string)
```

#### updateWorkbookFullscreen

Send a message to the embed to toggle the fullscreen state of the given element.

```typescript
updateWorkbookFullscreen(iframeRef: React.RefObject<HTMLIFrameElement>, nodeId: string | null)
```

#### updateWorkbookSelectedNodeId

Send a message to the embed to update the selected element. Can be a pageId or elementId.

```typescript
updateWorkbookSelectedNodeId(iframeRef: React.RefObject<HTMLIFrameElement>, nodeId: string, nodeType: "element" | "page")
```

#### updateWorkbookSharingLink

Send a message to the embed to update the sharing link.

```typescript
updateWorkbookSharingLink(iframeRef: React.RefObject<HTMLIFrameElement>, sharingLink: string | null, sharingExplorationLink?: string | null)
```
