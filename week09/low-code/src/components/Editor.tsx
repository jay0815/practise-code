
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { EditorProps } from "@monaco-editor/react"
import Monaco from "@monaco-editor/react";

const options = {
  "acceptSuggestionOnCommitCharacter": true,
  "acceptSuggestionOnEnter": "on",
  "accessibilitySupport": "auto",
  "autoIndent": false,
  "automaticLayout": true,
  "codeLens": true,
  "colorDecorators": true,
  "contextmenu": true,
  "cursorBlinking": "blink",
  "cursorSmoothCaretAnimation": false,
  "cursorStyle": "line",
  "disableLayerHinting": false,
  "disableMonospaceOptimizations": false,
  "dragAndDrop": false,
  "fixedOverflowWidgets": false,
  "folding": true,
  "foldingStrategy": "auto",
  "fontLigatures": false,
  "formatOnPaste": false,
  "formatOnType": false,
  "hideCursorInOverviewRuler": false,
  "highlightActiveIndentGuide": true,
  "links": true,
  "mouseWheelZoom": false,
  "multiCursorMergeOverlapping": true,
  "multiCursorModifier": "alt",
  "overviewRulerBorder": true,
  "overviewRulerLanes": 2,
  "quickSuggestions": true,
  "quickSuggestionsDelay": 100,
  "readOnly": false,
  "renderControlCharacters": false,
  "renderFinalNewline": true,
  "renderIndentGuides": true,
  "renderLineHighlight": "all",
  "renderWhitespace": "none",
  "revealHorizontalRightPadding": 30,
  "roundedSelection": true,
  "rulers": [],
  "scrollBeyondLastColumn": 5,
  "scrollBeyondLastLine": true,
  "selectOnLineNumbers": true,
  "selectionClipboard": true,
  "selectionHighlight": true,
  "showFoldingControls": "mouseover",
  "smoothScrolling": false,
  "suggestOnTriggerCharacters": true,
  "wordBasedSuggestions": true,
  "wordSeparators": "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
  "wordWrap": "off",
  "wordWrapBreakAfterCharacters": "\t})]?|&,;",
  "wordWrapBreakBeforeCharacters": "{([+",
  "wordWrapBreakObtrusiveCharacters": ".",
  "wordWrapColumn": 80,
  "wordWrapMinified": true,
  "wrappingIndent": "none"
}

export const Editor: FC<{ value: string; update: (v?:string) => void }> = ({ value, update }) => {
  const ref = useRef(null);

  const [temp, setTemp] = useState("");
  
  useEffect(() => {
    if (value !== temp) {
      setTemp(value);
    }
  }, [value, temp])

  const handleEditorDidMount: EditorProps['onMount'] = (editor) => {
    ref.current = editor; 
  }

  const onChange: EditorProps['onChange'] = (v, self) => {
    update(v)
    // setTemp(!v ? "" : v);
  }

  // const onValidate: EditorProps['onValidate'] = useCallback(
  //   (markers) => {      
  //     if (markers.length === 0 && value !== temp) {
  //       console.log('here', temp);
        
  //       update(temp)
  //     }
  //   },
  //   [value, temp]
  // )
  
  return (
    <>
      <Monaco
        height="90vh"
        defaultLanguage="json"
        theme="vs-dark"
        value={value}
        onMount={handleEditorDidMount}
        options={options}
        onChange={onChange}
        // onValidate={onValidate}
      />
    </>
  );
}