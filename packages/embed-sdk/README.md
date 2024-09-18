## Getting Started

To use the embed-sdk in your project, you can install it using your node package manager.

**Using npm:**

```code
npm install @sigmacomputing/embed-sdk
```

**yarn:**

```code
yarn add @sigmacomputing/embed-sdk
```

**pnpm:**

```code
pnpm add @sigmacomputing/embed-sdk
```

## Documentation

### Listeners

These are functions that can be used to listen for events from the embed, and react to them.

#### workbookLoadedListener

Listen for a workbook loaded event, and execute the given callback when it occurs.

```typescript
workbookLoadedListener(event: MessageEvent, iframe: HTMLIFrameElement, onLoaded: (event: WorkbookLoadedEvent) => void)
```

#### workbookErrorListener

Listen for a workbook error event, and execute the given callback when it occurs.

```typescript
workbookErrorListener(event: MessageEvent, iframe: HTMLIFrameElement, onError: (event: WorkbookErrorEvent) => void)
```

#### workbookVariableChangeListener

Listen for a workbook variable change event, and execute the given callback when it occurs.

```typescript
workbookVariableChangeListener(event: MessageEvent, iframe: HTMLIFrameElement, onVariable: (event: WorkbookVariableOnChangeEvent) => void)
```

#### workbookVariableCurrentListener

Listen for a workbook variable current event, and execute the given callback when it occurs.

```typescript
workbookVariableCurrentListener(event: MessageEvent, iframe: HTMLIFrameElement, onVariable: (event: WorkbookVariableCurrentEvent) => void)
```

#### workbookLinkSharingUpdateListener

Listen for a workbook sharing link update event, and execute the given callback when it occurs.

```typescript
workbookLinkSharingUpdateListener(event: MessageEvent, iframe: HTMLIFrameElement, onVariable: (event: WorkbookSharingLinkUpdateEvent) => void)
```

#### workbookTableCellSelectListener

Listen for a table cell select event, and execute the given callback when it occurs.

```typescript
workbookTableCellSelectListener(event: MessageEvent, iframe: HTMLIFrameElement, onTableCellSelect: (event: WorkbookTableCellSelectEvent) => void)
```

#### workbookPublishedListener

Listen for a workbook published event, and execute the given callback when it occurs.

```typescript
workbookPublishedListener(event: MessageEvent, iframe: HTMLIFrameElement, onPublished: (event: WorkbookPublishedEvent) => void)
```

#### workbookFullScreenListener

Listen for a workbook full screen event, and execute the given callback when it occurs.

```typescript
workbookFullScreenListener(event: MessageEvent, iframe: HTMLIFrameElement, onFullScreen: (event: WorkbookFullScreenEvent) => void)
```

#### workbookPageHeightListener

Listen for a workbook page height event, and execute the given callback when it occurs. Needs to be used with the responsive_height [URL Parameter](https://help.sigmacomputing.com/docs/embed-url-parameters).

```typescript
workbookPageHeightListener(event: MessageEvent, iframe: HTMLIFrameElement, onPageHeight: (event: WorkbookPageHeightEvent) => void)
```

#### workbookSelectedNodeListener

Listen for a workbook selected node event, and execute the given callback when it occurs.

```typescript
workbookSelectedNodeListener(event: MessageEvent, iframe: HTMLIFrameElement, onPageSelectedNode: (event: WorkbookSelectedNodeEvent) => void)
```

#### workbookPivotTableCellSelectListener

Listen for a pivot table cell select event, and execute the given callback when it occurs.

```typescript
workbookPivotTableCellSelectListener(event: MessageEvent, iframe: HTMLIFrameElement, onPivotTableCellSelect: (event: WorkbookPivotTableCellSelectEvent) => void)
```

#### workbookChartValueSelectListener

Listen for a chart value select event, and execute the given callback when it occurs.

```typescript
workbookChartValueSelectListener(event: MessageEvent, iframe: HTMLIFrameElement, onChartValueSelect: (event: WorkbookChartValueSelectEvent) => void)
```

#### workbookCurrentVariablesListener

Listen for a workbook current variables event, and execute the given callback when it occurs. This is to be used when `workbookVariablesList` is called.

```typescript
workbookCurrentVariablesListener(event: MessageEvent, iframe: HTMLIFrameElement, onCurrentVariables: (event: WorkbookCurrentVariablesEvent) => void)
```

#### workbookBookmarkCreateListener

Listen for a workbook bookmark create event, and execute the given callback when it occurs.

```typescript
workbookBookmarkCreateListener(event: MessageEvent, iframe: HTMLIFrameElement, onBookmarkCreate: (event: WorkbookBookmarkOnCreateEvent) => void)
```

#### workbookDataLoadedListener

Listen for a workbook data loaded event, and execute the given callback when it occurs.

```typescript
workbookDataLoadedListener(event: MessageEvent, iframe: HTMLIFrameElement, onWorkbookDataLoaded: (event: WorkbookDataLoadedEvent) => void)
```

#### workbookChartErrorListener

Listen for a workbook chart error event, and execute the given callback when it occurs.

```typescript
workbookChartErrorListener(event: MessageEvent, iframe: HTMLIFrameElement, onChartError: (event: WorkbookChartErrorEvent) => void)
```

#### workbookExploreKeyOnChangeListener

Listen for a workbook explore key change event, and execute the given callback when it occurs.

```typescript
workbookExploreKeyOnChangeListener(event: MessageEvent, iframe: HTMLIFrameElement, onExploreKeyOnChange: (event: WorkbookExploreKeyOnChangeEvent) => void)
```

#### workbookBookmarkOnChangeListener

Listen for a workbook bookmark change event, and execute the given callback when it occurs.

```typescript
workbookBookmarkOnChangeListener(event: MessageEvent, iframe: HTMLIFrameElement, onBookmarkChange: (event: WorkbookBookmarkOnChangeEvent) => void)
```

#### urlOnChangeListener

Listen for a url change event, and execute the given callback when it occurs.

```typescript
urlOnChangeListener(event: MessageEvent, iframe: HTMLIFrameElement, onUrlChange: (event: UrlOnChangeEvent) => void)
```

#### workbookIdOnChangeListener

Listen for a workbook id change event, and execute the given callback when it occurs.

```typescript
workbookIdOnChangeListener(event: MessageEvent, iframe: HTMLIFrameElement, onWorkbookIdChange: (event: WorkbookIdOnChangeEvent) => void)
```

### Mutations

These are functions that can be used to send messages to the embed. They may cause an event to be emitted from the embed.

#### workbookVariablesList

Send a message to the embed to list the current variables. This will cause a `workbook:variables:current` event to be emitted from the embed, and can be used with the `workbookCurrentVariablesListener` function.

```typescript
workbookVariablesList(iframe: HTMLIFrameElement)
```

#### workbookVariablesUpdate

Send a message to the embed to update the variables.

```typescript
workbookVariablesUpdate(iframe: HTMLIFrameElement, variables: Record<string, string>)
```

#### workbookSharingLinkUpdate

Send a message to the embed to update the sharing link.

```typescript
workbookSharingLinkUpdate(iframe: HTMLIFrameElement, sharingLink: string | null, sharingExplorationLink?: string | null)
```

#### workbookBookmarkCreate

Send a message to the embed to create a bookmark.

```typescript
workbookBookmarkCreate(iframe: HTMLIFrameElement, bookmark: WorkbookBookmarkCreateEvent)
```

#### workbookBookmarkUpdate

Send a message to the embed to update the current bookmark.

```typescript
workbookBookmarkUpdate(iframe: HTMLIFrameElement)
```

#### workbookFullscreenUpdate

Send a message to the embed to toggle the fullscreen state of the given element.

```typescript
workbookFullscreenUpdate(iframe: HTMLIFrameElement, nodeId: string | null)
```

#### workbookSelectedNodeIdUpdate

Send a message to the embed to update the selected element. Can be a pageId or elementId.

```typescript
workbookSelectedNodeIdUpdate(iframe: HTMLIFrameElement, nodeId: string, nodeType: "element" | "page")
```
