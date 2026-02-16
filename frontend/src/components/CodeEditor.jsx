import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';

// Random cursor colors for users
const CURSOR_COLORS = ['#ff0000', '#00ff00', '#0000ff', '#ffa500', '#800080'];

const CodeEditor = ({ roomId = "global-room", userName = "Anonymous" }) => {
  const editorRef = useRef(null);
  const [status, setStatus] = useState("Disconnected");

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;

    // 1. Create Yjs Document
    const doc = new Y.Doc();

    // 2. Connect to your local Hocuspocus/Y-Websocket server
    const provider = new WebsocketProvider(
      'ws://localhost:1234', 
      roomId, 
      doc
    );

    // 3. Status updates
    provider.on('status', event => {
      setStatus(event.status); // 'connected' or 'disconnected'
    });

    // 4. Bind Yjs to Monaco
    const text = doc.getText('monaco');
    const binding = new MonacoBinding(
      text, 
      editorRef.current.getModel(), 
      new Set([editorRef.current]), 
      provider.awareness
    );

    // 5. Set User Awareness (Cursor)
    const color = CURSOR_COLORS[Math.floor(Math.random() * CURSOR_COLORS.length)];
    provider.awareness.setLocalStateField('user', {
      name: userName,
      color: color,
    });

    // Cleanup
    return () => {
      provider.disconnect();
      doc.destroy();
      binding.destroy();
    };
  }

  return (
    <div className="w-full h-screen bg-[#1e1e1e] p-4 flex flex-col">
      <div className="flex justify-between items-center mb-2 text-gray-300">
        <h2 className="font-bold">Live Editor</h2>
        <span className={`text-sm ${status === 'connected' ? 'text-green-400' : 'text-red-400'}`}>
          ● {status}
        </span>
      </div>
      
      <div className="flex-grow border border-gray-700 rounded overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="python"
          defaultValue="# Start coding together..."
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;