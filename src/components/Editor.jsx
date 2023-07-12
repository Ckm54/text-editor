import { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const toolbarOptions = {
  inline: { inDropdown: true },
  list: { inDropdown: true },
  textAlign: { inDropdown: true },
  link: { inDropdown: true },
  history: { inDropdown: true },
  // image: {
  //   uploadCallback: "uploadImageCallback",
  //   alt: { present: true, mandatory: true },
  // },
};

const clientId = "a894a9096c2b4e0";

const TextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    // handle upload to db here after convert to raw
    const data = convertToRaw(editorState.getCurrentContent());
    console.log({ data });
  };

  const uploadImageCallback = (file) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.imgur.com/3/image");
      xhr.setRequestHeader("Authorization", `Client-ID ${clientId}`);

      const data = new FormData();
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);

        console.log({ response });
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        console.error({ error });
        reject(error);
      });
    });
  };

  // const handleEditorDrop = async (e) => {
  //   e.preventDefault();
  //   if (e.dataTransfer.files.length > 0) {
  //     const file = e.dataTransfer.files[0];
  //     if (file.type.startsWith("image")) {
  //       const newFile = await uploadImageCallback(file);
  //       const entityData = {
  //         src: newFile.data.link,
  //         height: newFile.data?.metadata?.height || "320px",
  //         width: newFile.data?.metadata?.width || "320px",
  //       };
  //       const entityKey = editorState
  //         .getCurrentContent()
  //         .createEntity("IMAGE", "MUTABLE", entityData)
  //         .getLastCreatedEntityKey();
  //       const newEditorState = AtomicBlockUtils.insertAtomicBlock(
  //         editorState,
  //         entityKey,
  //         " "
  //       );
  //       setEditorState(newEditorState);
  //     }
  //   }
  // };

  return (
    <div>
      <Editor
        editorState={editorState}
        wrapperClassName="editor-wrapper"
        editorClassName="message-editor"
        toolbarClassName="message-toolbar"
        onEditorStateChange={onEditorStateChange}
        toolbarOptions={{
          ...toolbarOptions,
          image: {
            uploadCallback: uploadImageCallback,
            previewImage: true,
            alt: { present: true, mandatory: false },
            inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
          },
        }}
      />
    </div>
  );
};

export default TextEditor;
