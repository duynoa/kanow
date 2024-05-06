
import React, { useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CustomQuill(props: any) {
    // add in the undo/redo icons

    let icons = Quill.import("ui/icons");
    icons["undo"] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
    <path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
    </svg>`;
    icons["redo"] = `<svg viewbox="0 0 18 18">
        <polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
        <path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
    </svg>`;

    let quillEditor: any;

    let fontSizeArr = ['10px', '11px', '12px', '14px', '18px', '24px'];
    let Size = Quill.import('attributors/style/size');
    Size.whitelist = fontSizeArr;
    Quill.register(Size, true);


    const fontFamilyArr = ["Roboto Condensed", "Times New Roman", "Calibri", "Calibri Light", "Sans-Serif"];
    let fonts = Quill.import("attributors/style/font");
    fonts.whitelist = fontFamilyArr;
    Quill.register(fonts, true);



    const modules = useMemo(
        () => ({
            history: { delay: 200, maxStack: 500, userOnly: true },
            toolbar: {
                container: [
                    ['undo', 'redo'],
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ['blockquote', 'code-block'],
                    ['link', 'image', 'video', 'formula'],

                    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                    [{ 'direction': 'rtl' }],                         // text direction

                    // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                    [{ "size": fontSizeArr },
                    ], // custom dropdown
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'font': fontFamilyArr }],
                    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                    [{ 'align': [] }],
                    ['clean']
                ],
                handlers: {
                    undo: () => {
                        return quillEditor?.history.undo();
                    },
                    redo: () => {
                        return quillEditor?.history.redo();
                    },
                },
            },
            clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false,
            },
        }), []);

    const onChange = (text: any) => {
        props.field.onChange(text);
    };

    return (
        <ReactQuill
            ref={(el) => {
                if (el) quillEditor = el.getEditor();
            }}
            formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "align",
                "strike",
                "script",
                "blockquote",
                "background",
                "list",
                "bullet",
                "indent",
                "link",
                "image",
                "color",
                "code-block"
            ]}
            theme="snow"
            // theme="bubble"
            placeholder={props.placeholder}
            // {...props.field}
            value={props.field.value}
            onChange={onChange}
            modules={modules}
        />
    );
}
