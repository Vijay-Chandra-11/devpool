// // // import { useEffect } from "react";
// // // import CodeEditor from "@/components/CodeEditor";
// // // import { Navbar } from "@/components/layout/Navbar";
// // // import { useLocation } from "react-router-dom";

// // // const LiveEditor = () => {
// // //   const location = useLocation();
// // //   // Generate a room ID based on URL or default to 'demo'
// // //   const roomId = new URLSearchParams(location.search).get("room") || "devpool-demo";

// // //   return (
// // //     <div className="min-h-screen bg-background">
// // //       <Navbar />
// // //       <div className="pt-24 px-4 md:px-8 max-w-[1600px] mx-auto">
// // //         <div className="flex flex-col gap-6">
          
// // //           {/* Header Section */}
// // //           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
// // //             <div>
// // //               <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
// // //                 Collaborative Workspace
// // //               </h1>
// // //               <p className="text-muted-foreground mt-1">
// // //                 Real-time synchronization engine powered by DevPool.
// // //               </p>
// // //             </div>
// // //             <div className="bg-secondary/50 px-4 py-2 rounded-full border border-white/10">
// // //               <code className="text-sm text-primary">ID: {roomId}</code>
// // //             </div>
// // //           </div>

// // //           {/* Editor Container */}
// // //           <div className="shadow-2xl shadow-blue-500/10 rounded-xl">
// // //              <CodeEditor roomId={roomId} userName="DevUser" />
// // //           </div>

// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default LiveEditor;



// // import { useEffect, useState } from "react";
// // import CodeEditor from "@/components/CodeEditor";
// // import FileExplorer from "@/components/FileExplorer";
// // import { Navbar } from "@/components/layout/Navbar";
// // import { useLocation } from "react-router-dom";
// // import * as Y from 'yjs';
// // // @ts-ignore
// // import { WebsocketProvider } from 'y-websocket';

// // const LiveEditor = () => {
// //   const location = useLocation();
// //   const roomId = new URLSearchParams(location.search).get("room") || "devpool-demo";
  
// //   // State
// //   const [yDoc] = useState(() => new Y.Doc());
// //   const [provider, setProvider] = useState<any>(null);
// //   const [files, setFiles] = useState<string[]>([]);
// //   const [activeFile, setActiveFile] = useState<string>("");

// //   useEffect(() => {
// //     // 1. Connect to WebSocket
// //     const wsProvider = new WebsocketProvider(
// //       'ws://localhost:1234', 
// //       roomId, 
// //       yDoc
// //     );
// //     setProvider(wsProvider);

// //     // 2. Sync File List (We use a Y.Map called 'files' to store the directory)
// //     const yFilesMap = yDoc.getMap('project-files');

// //     // Function to update local state from Yjs
// //     const updateFiles = () => {
// //       const fileList = Array.from(yFilesMap.keys());
// //       setFiles(fileList);
      
// //       // If no file selected, select the first one
// //       if (fileList.length > 0 && !activeFile) {
// //         setActiveFile(fileList[0]);
// //       }
// //     };

// //     // Initial check and subscribe to changes
// //     updateFiles();
// //     yFilesMap.observe(() => updateFiles());

// //     // 3. Create a default file if empty
// //     wsProvider.on('sync', (isSynced: boolean) => {
// //         if (isSynced && yFilesMap.size === 0) {
// //             yFilesMap.set('main.py', new Y.Text('print("Hello DevPool!")'));
// //             updateFiles();
// //             setActiveFile('main.py');
// //         }
// //     });

// //     return () => {
// //       wsProvider.disconnect();
// //       yDoc.destroy();
// //     };
// //   }, []);

// //   const handleCreateFile = (name: string) => {
// //     const yFilesMap = yDoc.getMap('project-files');
// //     // We add it to the Yjs map. The observer above will update the UI.
// //     // If it doesn't exist, we init it with empty text.
// //     if (!yFilesMap.has(name)) {
// //         yFilesMap.set(name, new Y.Text("")); 
// //     }
// //     setActiveFile(name);
// //   };

// //   const handleDeleteFile = (name: string) => {
// //     const yFilesMap = yDoc.getMap('project-files');
// //     yFilesMap.delete(name);
// //     if (activeFile === name) {
// //         setActiveFile("");
// //     }
// //   };

// //   return (
// //     <div className="h-screen bg-background flex flex-col overflow-hidden">
// //       <Navbar />
      
// //       <div className="flex-1 flex pt-16 h-full">
// //         {/* Left: File Explorer */}
// //         <FileExplorer 
// //           files={files} 
// //           activeFile={activeFile} 
// //           onFileSelect={setActiveFile}
// //           onFileCreate={handleCreateFile}
// //           onFileDelete={handleDeleteFile}
// //         />

// //         {/* Right: Code Editor */}
// //         <div className="flex-1 h-full relative">
// //           {provider && activeFile ? (
// //             <CodeEditor 
// //               roomId={roomId} 
// //               fileName={activeFile} 
// //               userName="DevUser" 
// //               yDoc={yDoc}
// //               provider={provider}
// //             />
// //           ) : (
// //             <div className="flex items-center justify-center h-full text-gray-500">
// //               Select or create a file to start coding
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LiveEditor;



// // ... (imports same as before) ...
// import { useEffect, useState } from "react";
// import CodeEditor from "@/components/CodeEditor";
// import FileExplorer from "@/components/FileExplorer";
// import { Navbar } from "@/components/layout/Navbar";
// import { useLocation } from "react-router-dom";
// import * as Y from 'yjs';
// // @ts-ignore
// import { WebsocketProvider } from 'y-websocket';

// const LiveEditor = () => {
//   const location = useLocation();
//   const roomId = new URLSearchParams(location.search).get("room") || "devpool-demo";
  
//   const [yDoc] = useState(() => new Y.Doc());
//   const [provider, setProvider] = useState<any>(null);
//   const [files, setFiles] = useState<string[]>([]);
//   const [activeFile, setActiveFile] = useState<string>("");

//   useEffect(() => {
//     // 1. Connect
//     const wsProvider = new WebsocketProvider('ws://localhost:1234', roomId, yDoc);
//     setProvider(wsProvider);

//     // 2. Sync Files
//     const yFilesMap = yDoc.getMap('project-files');
//     const updateFiles = () => {
//       const list = Array.from(yFilesMap.keys());
//       setFiles(list);
//       if (list.length > 0 && !activeFile) setActiveFile(list[0]);
//     };
//     yFilesMap.observe(() => updateFiles());

//     // 3. Init Default
//     wsProvider.on('sync', (isSynced: boolean) => {
//         if (isSynced && yFilesMap.size === 0) {
//             yFilesMap.set('main.py', new Y.Text('print("Hello from DevPool!")'));
//             updateFiles();
//             setActiveFile('main.py');
//         }
//     });

//     return () => {
//       wsProvider.disconnect();
//       yDoc.destroy();
//     };
//   }, []); // Run once

//   const handleCreateFile = (name: string) => {
//     const yFilesMap = yDoc.getMap('project-files');
//     if (!yFilesMap.has(name)) yFilesMap.set(name, new Y.Text(""));
//     setActiveFile(name);
//   };

//   const handleDeleteFile = (name: string) => {
//     const yFilesMap = yDoc.getMap('project-files');
//     yFilesMap.delete(name);
//     if (activeFile === name) setActiveFile("");
//   };

//   return (
//     // 'h-screen' and 'overflow-hidden' are crucial to prevent double scrollbars
//     <div className="h-screen bg-[#1e1e1e] flex flex-col overflow-hidden text-white">
//       <Navbar />
      
//       <div className="flex-1 flex pt-16 h-full overflow-hidden">
//         {/* Sidebar */}
//         <FileExplorer 
//           files={files} 
//           activeFile={activeFile} 
//           onFileSelect={setActiveFile}
//           onFileCreate={handleCreateFile}
//           onFileDelete={handleDeleteFile}
//         />

//         {/* Editor Area */}
//         <div className="flex-1 h-full">
//           {provider && activeFile ? (
//             <CodeEditor 
//               fileName={activeFile} 
//               userName="DevUser" 
//               yDoc={yDoc}
//               provider={provider}
//             />
//           ) : (
//             <div className="flex items-center justify-center h-full text-gray-500">
//               <p>Select a file to start coding</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiveEditor;




// import { useEffect, useState } from "react";
// import CodeEditor from "@/components/CodeEditor";
// import FileExplorer from "@/components/FileExplorer";
// import { Navbar } from "@/components/layout/Navbar";
// import { useLocation } from "react-router-dom";
// import * as Y from 'yjs';
// // @ts-ignore
// import { WebsocketProvider } from 'y-websocket';

// const LiveEditor = () => {
//   const location = useLocation();
//   const roomId = new URLSearchParams(location.search).get("room") || "devpool-demo";
  
//   const [yDoc] = useState(() => new Y.Doc());
//   const [provider, setProvider] = useState<any>(null);
//   const [files, setFiles] = useState<string[]>([]);
//   const [activeFile, setActiveFile] = useState<string>("");

//   useEffect(() => {
//     const wsProvider = new WebsocketProvider('ws://localhost:1234', roomId, yDoc);
//     setProvider(wsProvider);

//     const yFilesMap = yDoc.getMap('project-files');
//     const updateFiles = () => {
//       const list = Array.from(yFilesMap.keys());
//       setFiles(list.sort());
//       if (list.length > 0 && !activeFile) setActiveFile(list[0]);
//     };
    
//     yFilesMap.observe(() => updateFiles());
//     updateFiles();

//     wsProvider.on('sync', (isSynced: boolean) => {
//         if (isSynced && yFilesMap.size === 0) {
//             yFilesMap.set('main.py', new Y.Text('print("Hello DevPool!")'));
//             updateFiles();
//             setActiveFile('main.py');
//         }
//     });

//     return () => {
//       wsProvider.disconnect();
//       yDoc.destroy();
//     };
//   }, []);

//   const handleCreateFile = (name: string) => {
//     const yFilesMap = yDoc.getMap('project-files');
//     if (!yFilesMap.has(name)) yFilesMap.set(name, new Y.Text(""));
//     setActiveFile(name);
//   };

//   const handleDeleteFile = (name: string) => {
//     const yFilesMap = yDoc.getMap('project-files');
//     yFilesMap.delete(name);
//     if (activeFile === name) setActiveFile("");
//   };

//   return (
//     <div className="h-screen bg-[#1e1e1e] flex flex-col overflow-hidden text-white">
//       <Navbar />
      
//       {/* Main Workspace Area (Sidebar + Editor) */}
//       <div className="flex-1 flex pt-16 h-full overflow-hidden">
        
//         {/* Sidebar */}
//         <FileExplorer 
//           files={files} 
//           activeFile={activeFile} 
//           onFileSelect={setActiveFile}
//           onFileCreate={handleCreateFile}
//           onFileDelete={handleDeleteFile}
//         />

//         {/* Editor Content */}
//         <div className="flex-1 h-full relative">
//           {provider && activeFile ? (
//             <CodeEditor 
//               fileName={activeFile} 
//               userName="DevUser" 
//               yDoc={yDoc} 
//               provider={provider}
//             />
//           ) : (
//             <div className="flex items-center justify-center h-full text-gray-500 bg-[#1e1e1e]">
//               <div className="text-center">
//                  <p className="text-xl mb-2">Welcome to DevPool IDE</p>
//                  <p className="text-sm">Select a file from the sidebar to start coding.</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiveEditor;


import { useEffect, useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import FileExplorer from "@/components/FileExplorer";
import { Navbar } from "@/components/layout/Navbar";
import { useLocation } from "react-router-dom";
import * as Y from 'yjs';
// @ts-ignore
import { WebsocketProvider } from 'y-websocket';

const LiveEditor = () => {
  const location = useLocation();
  const roomId = new URLSearchParams(location.search).get("room") || "devpool-demo";
  
  const [yDoc] = useState(() => new Y.Doc());
  const [provider, setProvider] = useState<any>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [activeFile, setActiveFile] = useState<string>("");

  useEffect(() => {
    const wsProvider = new WebsocketProvider('ws://localhost:1234', roomId, yDoc);
    setProvider(wsProvider);

    const yFilesMap = yDoc.getMap('project-files');
    const updateFiles = () => {
      const list = Array.from(yFilesMap.keys());
      setFiles(list.sort());
      if (!activeFile && list.length > 0) {
        setActiveFile(list.includes('main.py') ? 'main.py' : list[0]);
      }
    };
    
    yFilesMap.observe(() => updateFiles());
    updateFiles(); 

    wsProvider.on('sync', (isSynced: boolean) => {
        if (isSynced && yFilesMap.size === 0) {
            yFilesMap.set('main.py', new Y.Text('print("Hello DevPool!")'));
            updateFiles();
        }
    });

    return () => {
      wsProvider.disconnect();
      yDoc.destroy();
    };
  }, []);

  const handleCreateFile = (name: string) => {
    const yFilesMap = yDoc.getMap('project-files');
    if (!yFilesMap.has(name)) yFilesMap.set(name, new Y.Text(""));
    setActiveFile(name);
  };

  const handleDeleteFile = (name: string) => {
    const yFilesMap = yDoc.getMap('project-files');
    yFilesMap.delete(name);
    if (activeFile === name) setActiveFile("");
  };

  return (
    <div className="h-screen w-full bg-[#1e1e1e] overflow-hidden text-white flex flex-col">
      {/* 1. Navbar (Fixed) */}
      <Navbar />

      {/* 2. Main Workspace - Added pt-20 to push it down below Navbar */}
      <div className="flex-1 flex pt-20 h-full overflow-hidden">
        
        {/* Sidebar */}
        <FileExplorer 
          files={files} 
          activeFile={activeFile} 
          onFileSelect={setActiveFile}
          onFileCreate={handleCreateFile}
          onFileDelete={handleDeleteFile}
        />

        {/* Editor Area */}
        <div className="flex-1 h-full relative border-l border-[#333]">
          {provider && activeFile ? (
            <CodeEditor 
              fileName={activeFile} 
              userName="DevUser" 
              yDoc={yDoc} 
              provider={provider}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Select a file to start coding.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveEditor;