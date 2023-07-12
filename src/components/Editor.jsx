import { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const toolbarOptions = {
  options: ["inline", "fontSize", "image", "emoji"],
  inline: {
    options: ["bold", "italic", "underline", "strikethrough"],
  },
};

const TextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    // handle upload to db here after convert to raw
    convertToRaw(editorState.getCurrentContent());
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        wrapperClassName="editor-wrapper"
        editorClassName="message-editor"
        toolbarClassName="message-toolbar"
        onEditorStateChange={onEditorStateChange}
        toolbarOptions={toolbarOptions}
      />
    </div>
  );
};

export default TextEditor;
