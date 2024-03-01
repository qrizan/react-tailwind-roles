import { atom } from "jotai";

export const editorState = atom({
    key: 'editor-state',
    default: ''
});
