import React, { useEffect } from 'react';
// import Highlighter from "react-highlight-words"; // 文字高亮
// import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun } from "docx";
// const fs = require('fs')
import { saveAs } from 'file-saver';
const Word = () => {

  useEffect(() => {
    // fetWord()
  }, []);

  const fetWord = () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun("Hello World"),
              new TextRun({
                text: "Foo Bar",
                bold: true,
              }),
              new TextRun({
                text: "\tGithub is the best",
                bold: true,
              }),
            ],
          }),
        ],
      }],
    });
    Packer.toBlob(doc).then((blob: any) => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  }

  return (
    <div>
      <button onClick={fetWord}>下载</button>
      {/* <Highlighter
        highlightClassName="YourHighlightClass"
        searchWords={["and", "or", "the"]}
        autoEscape={true}
        textToHighlight="The dog is chasing the cat. Or perhaps they're just playing?"
      /> */}
    </div>
  );
};

export default Word;