import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface CKEditorProps {
  initialValue: string;
  onChange: (content: string) => void;
}

const CKEditorComponent: React.FC<CKEditorProps> = ({ initialValue, onChange }) => {
  const [editorContent, setEditorContent] = useState(initialValue);

  const handleChange = (event: any, editor: any) => {
    const data = editor.getData();
    setEditorContent(data);
    onChange(data);
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={editorContent}
      onChange={handleChange}
    />
  );
};

export default CKEditorComponent;
