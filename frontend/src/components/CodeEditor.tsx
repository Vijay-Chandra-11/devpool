// // // // import React, { useRef, useState, useEffect } from 'react';
// // // // import Editor from '@monaco-editor/react';
// // // // import * as Y from 'yjs';
// // // // import { WebsocketProvider } from 'y-websocket';
// // // // import { MonacoBinding } from 'y-monaco';

// // // // // Random cursor colors for users
// // // // const CURSOR_COLORS = ['#ff0000', '#00ff00', '#0000ff', '#ffa500', '#800080'];

// // // // const CodeEditor = ({ roomId = "global-room", userName = "Anonymous" }) => {
// // // //   const editorRef = useRef(null);
// // // //   const [status, setStatus] = useState("Connecting...");

// // // //   const handleEditorDidMount = (editor, monaco) => {
// // // //     editorRef.current = editor;

// // // //     // 1. Create Yjs Document
// // // //     const doc = new Y.Doc();

// // // //     // 2. Connect to your local Live Server
// // // //     // Make sure your 'live-server' is running on port 1234
// // // //     const provider = new WebsocketProvider(
// // // //       'ws://localhost:1234', 
// // // //       roomId, 
// // // //       doc
// // // //     );

// // // //     // 3. Handle Connection Status
// // // //     provider.on('status', (event) => {
// // // //       setStatus(event.status); 
// // // //     });

// // // //     // 4. Bind Yjs to Monaco Editor
// // // //     const text = doc.getText('monaco');
// // // //     const binding = new MonacoBinding(
// // // //       text, 
// // // //       editor.getModel(), 
// // // //       new Set([editor]), 
// // // //       provider.awareness
// // // //     );

// // // //     // 5. Set User Awareness (Cursor Name & Color)
// // // //     const color = CURSOR_COLORS[Math.floor(Math.random() * CURSOR_COLORS.length)];
// // // //     provider.awareness.setLocalStateField('user', {
// // // //       name: userName,
// // // //       color: color,
// // // //     });

// // // //     // Cleanup
// // // //     return () => {
// // // //       provider.disconnect();
// // // //       doc.destroy();
// // // //       binding.destroy();
// // // //     };
// // // //   };

// // // //   return (
// // // //     <div className="w-full h-[calc(100vh-100px)] bg-[#1e1e1e] rounded-lg overflow-hidden border border-gray-800 flex flex-col">
// // // //       {/* Status Bar */}
// // // //       <div className="bg-[#2d2d2d] px-4 py-2 flex justify-between items-center text-xs border-b border-gray-700">
// // // //         <div className="flex items-center gap-2">
// // // //           <span className={`w-2 h-2 rounded-full ${status === 'connected' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></span>
// // // //           <span className="text-gray-300 font-mono">{status === 'connected' ? 'LIVE SYNC ACTIVE' : status.toUpperCase()}</span>
// // // //         </div>
// // // //         <div className="text-gray-500">Room: {roomId}</div>
// // // //       </div>
      
// // // //       {/* Editor */}
// // // //       <div className="flex-grow">
// // // //         <Editor
// // // //           height="100%"
// // // //           defaultLanguage="python"
// // // //           defaultValue={`# Welcome to DevPool Live Editor
// // // // # Start typing to see code sync across windows!

// // // // def hello():
// // // //     print('Hello, Collaborative World!')`}
// // // //           theme="vs-dark"
// // // //           onMount={handleEditorDidMount}
// // // //           options={{
// // // //             minimap: { enabled: false },
// // // //             fontSize: 14,
// // // //             automaticLayout: true,
// // // //             scrollBeyondLastLine: false,
// // // //           }}
// // // //         />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default CodeEditor;



// // // // import React, { useRef, useState } from 'react';
// // // // import Editor from '@monaco-editor/react';
// // // // import * as Y from 'yjs';
// // // // import { WebsocketProvider } from 'y-websocket';
// // // // import { MonacoBinding } from 'y-monaco';

// // // // // Random cursor colors for users
// // // // const CURSOR_COLORS = ['#ff0000', '#00ff00', '#0000ff', '#ffa500', '#800080'];

// // // // const CodeEditor = ({ roomId = "global-room", userName = "Anonymous" }) => {
// // // //   const editorRef = useRef(null);
// // // //   const [status, setStatus] = useState("Connecting...");

// // // //   const handleEditorDidMount = (editor, monaco) => {
// // // //     editorRef.current = editor;

// // // //     // 1. Create Yjs Document
// // // //     const doc = new Y.Doc();

// // // //     // 2. Connect to your local Live Server
// // // //     const provider = new WebsocketProvider(
// // // //       'ws://localhost:1234', 
// // // //       roomId, 
// // // //       doc
// // // //     );

// // // //     provider.on('status', (event) => {
// // // //       setStatus(event.status); 
// // // //     });

// // // //     // 3. Bind Yjs to Monaco Editor
// // // //     const text = doc.getText('monaco');
// // // //     const binding = new MonacoBinding(
// // // //       text, 
// // // //       editor.getModel(), 
// // // //       new Set([editor]), 
// // // //       provider.awareness
// // // //     );

// // // //     // 4. Set User Awareness
// // // //     const color = CURSOR_COLORS[Math.floor(Math.random() * CURSOR_COLORS.length)];
// // // //     provider.awareness.setLocalStateField('user', {
// // // //       name: userName,
// // // //       color: color,
// // // //     });

// // // //     return () => {
// // // //       provider.disconnect();
// // // //       doc.destroy();
// // // //       binding.destroy();
// // // //     };
// // // //   };

// // // //   return (
// // // //     // 🔴 FORCE VISIBILITY: Fixed height of 85% of the viewport and a dark background
// // // //     <div style={{ width: '100%', height: '85vh', backgroundColor: '#1e1e1e', display: 'flex', flexDirection: 'column', border: '1px solid #444', borderRadius: '8px', overflow: 'hidden' }}>
      
// // // //       {/* Top Status Bar */}
// // // //       <div style={{ padding: '10px', backgroundColor: '#2d2d2d', color: '#ccc', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #444', fontSize: '12px' }}>
// // // //         <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
// // // //             <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: status === 'connected' ? '#00ff00' : 'orange' }}></div>
// // // //             <strong>{status.toUpperCase()}</strong>
// // // //         </div>
// // // //         <div>Room: {roomId}</div>
// // // //       </div>
      
// // // //       {/* Editor Area - Forces it to take remaining space */}
// // // //       <div style={{ flexGrow: 1, position: 'relative' }}>
// // // //         <Editor
// // // //           height="100%"
// // // //           width="100%"
// // // //           defaultLanguage="python"
// // // //           theme="vs-dark"
// // // //           defaultValue="# Start typing... Code will sync!"
// // // //           onMount={handleEditorDidMount}
// // // //           options={{
// // // //             minimap: { enabled: false },
// // // //             fontSize: 14,
// // // //             automaticLayout: true,
// // // //           }}
// // // //         />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default CodeEditor;




// // // import React, { useRef, useState, useEffect } from 'react';
// // // import Editor, { OnMount } from '@monaco-editor/react';
// // // import * as Y from 'yjs';
// // // // @ts-ignore
// // // import { WebsocketProvider } from 'y-websocket';
// // // // @ts-ignore
// // // import { MonacoBinding } from 'y-monaco';

// // // interface CodeEditorProps {
// // //   roomId: string;
// // //   fileName: string;
// // //   userName: string;
// // //   yDoc: Y.Doc; // We pass the document down from the parent
// // //   provider: any; // Pass provider to reuse awareness
// // // }

// // // const CodeEditor: React.FC<CodeEditorProps> = ({ fileName, userName, yDoc, provider }) => {
// // //   const editorRef = useRef<any>(null);
// // //   const bindingRef = useRef<any>(null);

// // //   // Helper to determine language from extension
// // //   const getLanguage = (name: string) => {
// // //     if (name.endsWith('.js') || name.endsWith('.jsx')) return 'javascript';
// // //     if (name.endsWith('.ts') || name.endsWith('.tsx')) return 'typescript';
// // //     if (name.endsWith('.html')) return 'html';
// // //     if (name.endsWith('.css')) return 'css';
// // //     if (name.endsWith('.json')) return 'json';
// // //     return 'python'; // default
// // //   };

// // //   const handleEditorDidMount: OnMount = (editor, monaco) => {
// // //     editorRef.current = editor;
// // //     // We don't bind immediately here, we do it in the useEffect below
// // //     // when the fileName changes.
// // //   };

// // //   // Whenever the fileName changes, re-bind the editor to the new text
// // //   useEffect(() => {
// // //     if (!editorRef.current || !yDoc || !provider) return;

// // //     // 1. Destroy old binding if it exists
// // //     if (bindingRef.current) {
// // //       bindingRef.current.destroy();
// // //     }

// // //     // 2. Get the specific text type for this file
// // //     // We simply use the filename as the key in Yjs
// // //     const yText = yDoc.getText(fileName);

// // //     // 3. Create new binding
// // //     bindingRef.current = new MonacoBinding(
// // //       yText,
// // //       editorRef.current.getModel()!,
// // //       new Set([editorRef.current]),
// // //       provider.awareness
// // //     );

// // //     // 4. Update Cursor Awareness
// // //     const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
// // //     provider.awareness.setLocalStateField('user', {
// // //       name: userName,
// // //       color: randomColor,
// // //     });

// // //     return () => {
// // //       // Cleanup happens automatically when dependency changes or unmount
// // //       if (bindingRef.current) {
// // //         bindingRef.current.destroy();
// // //       }
// // //     };
// // //   }, [fileName, yDoc, provider]);

// // //   return (
// // //     <div className="h-full w-full bg-[#1e1e1e] flex flex-col">
// // //       {/* File Tab Bar */}
// // //       <div className="bg-[#2d2d2d] flex text-sm">
// // //         <div className="px-4 py-2 bg-[#1e1e1e] text-white border-t-2 border-blue-500 flex items-center gap-2">
// // //            <span>{fileName}</span>
// // //            <span className="text-xs text-gray-500 ml-2">({getLanguage(fileName)})</span>
// // //         </div>
// // //       </div>

// // //       {/* Editor Area */}
// // //       <Editor
// // //         height="100%"
// // //         width="100%"
// // //         language={getLanguage(fileName)} // Auto-sets syntax highlighting
// // //         theme="vs-dark"
// // //         onMount={handleEditorDidMount}
// // //         options={{
// // //           minimap: { enabled: true },
// // //           fontSize: 14,
// // //           automaticLayout: true,
// // //           scrollBeyondLastLine: false,
// // //           padding: { top: 10 }
// // //         }}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default CodeEditor;



// // import React, { useRef, useState, useEffect } from 'react';
// // import Editor, { OnMount } from '@monaco-editor/react';
// // import * as Y from 'yjs';
// // import { MonacoBinding } from 'y-monaco';
// // import { Play, Terminal, Maximize2, Minimize2 } from 'lucide-react';

// // interface CodeEditorProps {
// //   fileName: string;
// //   userName: string;
// //   yDoc: Y.Doc;
// //   provider: any;
// // }

// // const CodeEditor: React.FC<CodeEditorProps> = ({ fileName, userName, yDoc, provider }) => {
// //   const editorRef = useRef<any>(null);
// //   const bindingRef = useRef<any>(null);
  
// //   // State for Running Code
// //   const [output, setOutput] = useState<string[]>(["// Terminal Ready"]);
// //   const [isRunning, setIsRunning] = useState(false);
// //   const [isTerminalOpen, setIsTerminalOpen] = useState(true);

// //   // Helper: Map extension to Piston API language
// //   const getLanguage = (name: string) => {
// //     if (name.endsWith('.js')) return 'javascript';
// //     if (name.endsWith('.py')) return 'python';
// //     if (name.endsWith('.java')) return 'java';
// //     if (name.endsWith('.html')) return 'html';
// //     return 'plaintext';
// //   };

// //   const handleEditorDidMount: OnMount = (editor) => {
// //     editorRef.current = editor;
// //   };

// //   // Sync Logic (Same as before)
// //   useEffect(() => {
// //     if (!editorRef.current || !yDoc || !provider) return;
// //     if (bindingRef.current) bindingRef.current.destroy();

// //     const yText = yDoc.getText(fileName);
// //     bindingRef.current = new MonacoBinding(
// //       yText,
// //       editorRef.current.getModel()!,
// //       new Set([editorRef.current]),
// //       provider.awareness
// //     );
    
// //     // Set random cursor color
// //     const color = '#' + Math.floor(Math.random()*16777215).toString(16);
// //     provider.awareness.setLocalStateField('user', { name: userName, color: color });

// //     return () => bindingRef.current?.destroy();
// //   }, [fileName, yDoc, provider]);

// //   // --- RUN CODE FUNCTION ---
// //   const runCode = async () => {
// //     if (!editorRef.current) return;
// //     const sourceCode = editorRef.current.getValue();
// //     const language = getLanguage(fileName);

// //     setIsRunning(true);
// //     setOutput(["Running..."]);

// //     // If HTML, just preview it (handled in render)
// //     if (language === 'html') {
// //       setOutput(["HTML Preview Updated! (See Output Tab)"]);
// //       setIsRunning(false);
// //       return;
// //     }

// //     try {
// //       // Use Piston API for execution
// //       const response = await fetch("https://emkc.org/api/v2/piston/execute", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           language: language,
// //           version: "*",
// //           files: [{ content: sourceCode }]
// //         })
// //       });
      
// //       const result = await response.json();
      
// //       // Format output
// //       if (result.run) {
// //         setOutput(result.run.output.split("\n"));
// //       } else {
// //         setOutput(["Error: Execution failed", result.message || "Unknown error"]);
// //       }
// //     } catch (error) {
// //       setOutput(["Error: Failed to connect to compiler API"]);
// //     } finally {
// //       setIsRunning(false);
// //     }
// //   };

// //   return (
// //     <div className="h-full flex flex-col bg-[#1e1e1e]">
// //       {/* 1. Toolbar */}
// //       <div className="h-10 bg-[#2d2d2d] flex items-center justify-between px-4 border-b border-[#1e1e1e]">
// //         <div className="flex items-center gap-2">
// //           <span className="text-sm text-gray-300 font-mono">{fileName}</span>
// //         </div>
        
// //         <button 
// //           onClick={runCode}
// //           disabled={isRunning}
// //           className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs transition-colors disabled:opacity-50"
// //         >
// //           <Play className="w-3 h-3 fill-current" />
// //           {isRunning ? "Running..." : "Run"}
// //         </button>
// //       </div>

// //       {/* 2. Main Editor & Preview Area */}
// //       <div className="flex-1 flex overflow-hidden">
// //         {/* Editor */}
// //         <div className={`${fileName.endsWith('.html') ? 'w-1/2' : 'w-full'} h-full`}>
// //           <Editor
// //             height="100%"
// //             defaultLanguage={getLanguage(fileName)}
// //             language={getLanguage(fileName)}
// //             theme="vs-dark"
// //             onMount={handleEditorDidMount}
// //             options={{ minimap: { enabled: false }, fontSize: 14, automaticLayout: true }}
// //           />
// //         </div>

// //         {/* HTML Preview (Only visible for HTML files) */}
// //         {fileName.endsWith('.html') && (
// //           <div className="w-1/2 h-full border-l border-[#333] bg-white">
// //              {/* Using an iframe to render HTML safely */}
// //              <iframe 
// //                 title="preview"
// //                 className="w-full h-full"
// //                 srcDoc={editorRef.current ? editorRef.current.getValue() : ""}
// //                 sandbox="allow-scripts"
// //              />
// //           </div>
// //         )}
// //       </div>

// //       {/* 3. Terminal Panel */}
// //       <div className={`border-t border-[#333] bg-[#1e1e1e] flex flex-col ${isTerminalOpen ? 'h-48' : 'h-8'}`}>
// //         {/* Terminal Header */}
// //         <div className="flex items-center justify-between px-4 py-1 bg-[#2d2d2d] cursor-pointer" onClick={() => setIsTerminalOpen(!isTerminalOpen)}>
// //           <div className="flex items-center gap-2 text-xs text-gray-300 uppercase tracking-wide">
// //             <Terminal className="w-3 h-3" />
// //             <span>Terminal</span>
// //           </div>
// //           {isTerminalOpen ? <Minimize2 className="w-3 h-3 text-gray-400" /> : <Maximize2 className="w-3 h-3 text-gray-400" />}
// //         </div>

// //         {/* Terminal Output */}
// //         {isTerminalOpen && (
// //           <div className="flex-1 p-4 overflow-y-auto font-mono text-sm text-gray-300">
// //             {output.map((line, i) => (
// //               <div key={i} className="whitespace-pre-wrap">{line}</div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CodeEditor;




// import React, { useRef, useState, useEffect } from 'react';
// import Editor, { OnMount } from '@monaco-editor/react';
// import * as Y from 'yjs';
// import { MonacoBinding } from 'y-monaco';
// import { Play, Terminal, Maximize2, Minimize2, Loader2, Globe } from 'lucide-react';

// interface CodeEditorProps {
//   fileName: string;
//   userName: string;
//   yDoc: Y.Doc;
//   provider: any;
// }

// const CodeEditor: React.FC<CodeEditorProps> = ({ fileName, userName, yDoc, provider }) => {
//   const editorRef = useRef<any>(null);
//   const bindingRef = useRef<any>(null);
  
//   const [output, setOutput] = useState<string[]>(["// Terminal Ready"]);
//   const [isRunning, setIsRunning] = useState(false);
//   const [isTerminalOpen, setIsTerminalOpen] = useState(true);
//   const [previewSrc, setPreviewSrc] = useState("");

//   // Helper to map extension to language for Unsandbox
//   const getLanguage = (name: string) => {
//     if (name.endsWith('.js')) return 'javascript';
//     if (name.endsWith('.py')) return 'python';
//     if (name.endsWith('.java')) return 'java';
//     if (name.endsWith('.cpp')) return 'cpp';
//     if (name.endsWith('.rs')) return 'rust';
//     if (name.endsWith('.go')) return 'go';
//     if (name.endsWith('.html')) return 'html';
//     return 'python'; // default
//   };

//   const handleEditorDidMount: OnMount = (editor) => {
//     editorRef.current = editor;
//   };

//   // Sync Logic
//   useEffect(() => {
//     if (!editorRef.current || !yDoc || !provider) return;
//     if (bindingRef.current) bindingRef.current.destroy();

//     const yText = yDoc.getText(fileName);
//     bindingRef.current = new MonacoBinding(
//       yText,
//       editorRef.current.getModel()!,
//       new Set([editorRef.current]),
//       provider.awareness
//     );

//     // Listen for execution results from the server
//     const websocket = provider.ws; 
//     if (websocket) {
//         websocket.addEventListener('message', (event: any) => {
//             try {
//                 const data = JSON.parse(event.data);
//                 if (data.type === 'EXECUTION_RESULT') {
//                     setIsRunning(false);
//                     if (data.error) {
//                         setOutput(["❌ API Error:", data.error]);
//                     } else {
//                         const logs = [];
//                         if (data.stdout) logs.push(data.stdout);
//                         if (data.stderr) logs.push("⚠️ " + data.stderr);
//                         if (logs.length === 0) logs.push("Program executed successfully with no output.");
//                         setOutput(logs.flatMap(l => l.split('\n')));
//                     }
//                 }
//             } catch (e) {
//                 // Ignore non-JSON messages (like Yjs binary syncs)
//             }
//         });
//     }

//     return () => bindingRef.current?.destroy();
//   }, [fileName, yDoc, provider]);

//   // --- RUN CODE ---
//   const runCode = () => {
//     if (fileName.endsWith('.html')) {
//       const html = yDoc.getText(fileName).toString();
//       const css = yDoc.getText('style.css')?.toString() || "";
//       const js = yDoc.getText('script.js')?.toString() || "";
//       setPreviewSrc(`<html><head><style>${css}</style></head><body>${html}<script>${js}</script></body></html>`);
//       return;
//     }

//     setIsRunning(true);
//     setOutput(["Running on server..."]);

//     // Send command to Backend
//     if (provider.ws && provider.ws.readyState === 1) {
//         provider.ws.send(JSON.stringify({
//             type: 'RUN_CODE',
//             language: getLanguage(fileName),
//             code: editorRef.current.getValue()
//         }));
//     } else {
//         setOutput(["Error: Not connected to server."]);
//         setIsRunning(false);
//     }
//   };

//   return (
//     <div className="h-full flex flex-col bg-[#1e1e1e]">
//       {/* Toolbar */}
//       <div className="h-10 bg-[#2d2d2d] flex items-center justify-between px-4 border-b border-[#1e1e1e]">
//         <span className="text-sm text-gray-300 font-mono">{fileName}</span>
//         <button 
//           onClick={runCode}
//           disabled={isRunning}
//           className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs"
//         >
//           {isRunning ? <Loader2 className="w-3 h-3 animate-spin" /> : (fileName.endsWith('.html') ? <Globe className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />)}
//           {fileName.endsWith('.html') ? "Refresh Preview" : "Run"}
//         </button>
//       </div>

//       {/* Editor & Output */}
//       <div className="flex-1 flex overflow-hidden">
//         <div className={`${fileName.endsWith('.html') ? 'w-1/2' : 'w-full'} h-full`}>
//           <Editor
//             height="100%"
//             language={getLanguage(fileName) === 'html' ? 'html' : getLanguage(fileName)}
//             theme="vs-dark"
//             onMount={handleEditorDidMount}
//             options={{ minimap: { enabled: false }, fontSize: 14 }}
//           />
//         </div>
//         {fileName.endsWith('.html') && (
//           <div className="w-1/2 h-full bg-white"><iframe title="preview" className="w-full h-full" srcDoc={previewSrc} /></div>
//         )}
//       </div>

//       {/* Terminal */}
//       {!fileName.endsWith('.html') && (
//         <div className={`border-t border-[#333] bg-[#1e1e1e] flex flex-col ${isTerminalOpen ? 'h-48' : 'h-8'}`}>
//           <div className="flex items-center justify-between px-4 py-1 bg-[#2d2d2d] cursor-pointer" onClick={() => setIsTerminalOpen(!isTerminalOpen)}>
//             <div className="flex items-center gap-2 text-xs text-gray-300"><Terminal className="w-3 h-3"/> TERMINAL</div>
//             {isTerminalOpen ? <Minimize2 className="w-3 h-3"/> : <Maximize2 className="w-3 h-3"/>}
//           </div>
//           {isTerminalOpen && (
//             <div className="flex-1 p-4 font-mono text-sm text-gray-300 overflow-auto">
//               {output.map((line, i) => <div key={i}>{line}</div>)}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CodeEditor;



import React, { useRef, useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import * as Y from 'yjs';
import { MonacoBinding } from 'y-monaco';
import { Play, Terminal, Maximize2, Minimize2, Loader2, Globe } from 'lucide-react';

const CodeEditor = ({ fileName, userName, yDoc, provider }) => {
  const editorRef = useRef(null);
  const bindingRef = useRef(null);
  
  const [output, setOutput] = useState(["// Terminal Ready"]);
  const [isRunning, setIsRunning] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [previewSrc, setPreviewSrc] = useState("");

  const getLanguage = (name) => {
    if (name.endsWith('.js')) return 'javascript';
    if (name.endsWith('.py')) return 'python';
    if (name.endsWith('.java')) return 'java';
    if (name.endsWith('.cpp')) return 'cpp';
    if (name.endsWith('.html')) return 'html';
    if (name.endsWith('.css')) return 'css';
    if (name.endsWith('.json')) return 'json';
    return 'plaintext';
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (!editorRef.current || !yDoc || !provider) return;
    if (bindingRef.current) bindingRef.current.destroy();

    const yText = yDoc.getText(fileName);
    bindingRef.current = new MonacoBinding(
      yText,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness
    );

    const websocket = provider.ws; 
    if (websocket) {
        const handleMessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'EXECUTION_RESULT') {
                    setIsRunning(false);
                    if (data.error) {
                        setOutput(["❌ API Error:", data.error]);
                    } else {
                        const logs = [];
                        if (data.stdout) logs.push(data.stdout);
                        if (data.stderr) logs.push("⚠️ " + data.stderr);
                        if (logs.length === 0) logs.push("Program executed successfully with no output.");
                        setOutput(logs.flatMap(l => l.split('\n')));
                    }
                }
            } catch (e) { }
        };
        websocket.addEventListener('message', handleMessage);
        return () => websocket.removeEventListener('message', handleMessage);
    }
  }, [fileName, yDoc, provider]);

  const runCode = () => {
    if (fileName.endsWith('.html')) {
      const html = yDoc.getText(fileName).toString();
      const css = yDoc.getText('style.css')?.toString() || "";
      const js = yDoc.getText('script.js')?.toString() || "";
      setPreviewSrc(`<html><head><style>${css}</style></head><body>${html}<script>${js}</script></body></html>`);
      return;
    }

    setIsRunning(true);
    setOutput(["Running on server..."]);

    if (provider.ws && provider.ws.readyState === 1) {
        provider.ws.send(JSON.stringify({
            type: 'RUN_CODE',
            language: getLanguage(fileName),
            code: editorRef.current.getValue()
        }));
    } else {
        setOutput(["Error: Not connected to server."]);
        setIsRunning(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Tab Bar */}
      <div className="h-9 bg-[#2d2d2d] flex items-center justify-between px-4 border-b border-[#1e1e1e]">
        <div className="flex items-center px-3 py-1 bg-[#1e1e1e] text-gray-200 text-sm border-t-2 border-blue-500">
           {fileName}
        </div>
        <button 
          onClick={runCode}
          disabled={isRunning}
          className="flex items-center gap-2 px-2 py-1 bg-green-700 hover:bg-green-600 text-white rounded text-xs transition-colors"
        >
          {isRunning ? <Loader2 className="w-3 h-3 animate-spin" /> : (fileName.endsWith('.html') ? <Globe className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />)}
          {fileName.endsWith('.html') ? "Refresh" : "Run"}
        </button>
      </div>

      {/* Editor & Preview Split */}
      <div className="flex-1 flex overflow-hidden relative">
        <div className={`${fileName.endsWith('.html') ? 'w-1/2' : 'w-full'} h-full`}>
          <Editor
            height="100%"
            language={getLanguage(fileName)}
            theme="vs-dark"
            onMount={handleEditorDidMount}
            options={{ minimap: { enabled: false }, fontSize: 14, automaticLayout: true }}
          />
        </div>
        {fileName.endsWith('.html') && (
          <div className="w-1/2 h-full bg-white border-l border-gray-700">
             <iframe title="preview" className="w-full h-full border-none" srcDoc={previewSrc} sandbox="allow-scripts" />
          </div>
        )}
      </div>

      {/* Terminal Pane */}
      {!fileName.endsWith('.html') && (
        <div className={`border-t border-[#333] bg-[#1e1e1e] flex flex-col ${isTerminalOpen ? 'h-48' : 'h-8'}`}>
          <div className="flex items-center justify-between px-4 py-1 bg-[#2d2d2d] cursor-pointer hover:bg-[#333]" onClick={() => setIsTerminalOpen(!isTerminalOpen)}>
            <div className="flex items-center gap-2 text-xs text-gray-300 font-bold">
               <Terminal className="w-3 h-3"/> TERMINAL
            </div>
            {isTerminalOpen ? <Minimize2 className="w-3 h-3 text-gray-400"/> : <Maximize2 className="w-3 h-3 text-gray-400"/>}
          </div>
          {isTerminalOpen && (
            <div className="flex-1 p-3 font-mono text-sm text-gray-300 overflow-auto bg-[#1e1e1e]">
              {output.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap font-mono">{line}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;