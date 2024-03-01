import React, { useMemo, useRef } from "react";
import Api from "../../api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAtom } from "jotai";
import { editorState } from "../../store";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import './TextEditor.styles.css'

// eslint-disable-next-line react-refresh/only-export-components
const TextEditor = (props) => {
  const { content } = props
  const token = Cookies.get("token");

  const [contentState, setContentState] = useAtom(editorState);

  let quillRef = useRef(ReactQuill || null);

  const handlerImagePost = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    const formData = new FormData();

    input.onchange = async () => {
      const range = quillRef.current.getEditor().getSelection();
      let quillObj = quillRef.current.getEditor();
      const file = input.files;
      formData.append("image", file[0]);

      await Api.post("/api/admin/posts/storeImagePost", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      }).then((response) => {
        quillObj.editor.insertEmbed(range.index, "image", response.data.url);
      });

      return;
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline"], // toggled buttons

          ["link", "image"],
        ],
        handlers: {
          image: handlerImagePost,
        },
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onContentChange = (contentState) => {
    setContentState(contentState);
  };

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={contentState || content}
      modules={modules}
      onChange={(contentState) => onContentChange(contentState)}
    />
  );
};

TextEditor.propTypes = {
  content: PropTypes.any.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(TextEditor);
