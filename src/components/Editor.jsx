// import { useState } from "react";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { EditorState, convertToRaw } from "draft-js";
// import { useEffect } from "react";

// const TextEditor = () => {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());

//   // Try fetching item snapshot already in database

//   useEffect(() => {
//     // if snapsot has data set editor state to this data
//   }, []);

//   function uploadImageCallBack(file) {
//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.open("POST", "https://api.imgur.com/3/image");
//       xhr.setRequestHeader("Authorization", "Client-ID XXXXX");
//       const data = new FormData();
//       data.append("image", file);
//       xhr.send(data);
//       xhr.addEventListener("load", () => {
//         const response = JSON.parse(xhr.responseText);
//         resolve(response);
//       });
//       xhr.addEventListener("error", () => {
//         const error = JSON.parse(xhr.responseText);
//         reject(error);
//       });
//     });
//   }

//   const onEditorStateChange = (estate) => {
//     setEditorState(estate);

//     // prepare content for upload to a database
//     convertToRaw(editorState.getCurrentContent());
//   };
//   return (
//     <div className="bg-[#f8f9fa] min-h-screen pb-16">
//       <Editor
//         editorState={editorState}
//         onEditorStateChange={onEditorStateChange}
//         toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
//         wrapperClassName="demo-wrapper"
//         editorClassName="demo-editor mt-6 bg-white shadow-md max-w-6xl mx-auto mb-12 border p-10"
//         toolbar={{
//           inline: { inDropdown: true },
//           list: { inDropdown: true },
//           textAlign: { inDropdown: true },
//           link: { inDropdown: true },
//           history: { inDropdown: true },
//           image: {
//             uploadCallback: uploadImageCallBack,
//             alt: { present: true, mandatory: true },
//           },
//         }}
//       />
//       ;
//     </div>
//   );
// };

// export default TextEditor;

import { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import htmlToDraft from "html-to-draftjs";

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
      <textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      />
    </div>
  );
};

export default TextEditor;
