import React, { useState } from 'react';
import { RefCallBack } from 'react-hook-form';
import MarkdownEditor from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';
import 'react-markdown-editor-lite/lib/index.css';

type EditorProps = {
  onChange?: (content: any) => void;
  onBlur?: any;
  value?: string;
  name?: string;
  setValue?: (field: 'content', updateContent: string) => void;
  ref?: RefCallBack; // Use the correct type for the ref from RHF
};

const Editor: React.FC<EditorProps> = ({
  onChange,
  setValue,
  //   onBlur,
  //   value,
  //   name,
  //   ref,
}) => {
  const [markdown, setMarkdown] = useState('');

  const handleEditorChange = ({ text }) => {
    setValue && setValue('content', text);
    setMarkdown(text);
  };

  return (
    <div>
      <MarkdownEditor
        renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
        value={markdown}
        onChange={handleEditorChange}
        style={{ height: '500px' }}
      />
      <div className="preview">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Editor;
