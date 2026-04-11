// import { useEffect, useState } from "react";
// import CodeEditor from "@/components/CodeEditor";
// import FileExplorer from "@/components/FileExplorer";
// import { Navbar } from "@/components/layout/Navbar";
// import { useLocation } from "react-router-dom";
// import { Loader2 } from "lucide-react";
// import * as Y from 'yjs';
// // @ts-ignore
// import { WebsocketProvider } from 'y-websocket';
// import { useToast } from "@/hooks/use-toast";

// const LiveEditor = () => {
//   const location = useLocation();
//   const urlParams = new URLSearchParams(location.search);
//   const { toast } = useToast();
  
//   let targetRepo = urlParams.get("repo");
//   if (targetRepo && targetRepo.includes('github.com/')) {
//     const urlParts = targetRepo.split('github.com/');
//     targetRepo = urlParts[1].replace(/\/$/, ""); 
//   }
  
//   const projectId = urlParams.get("projectId");
//   const roomId = projectId || "devpool-demo"; 
  
//   const [yDoc] = useState(() => new Y.Doc());
//   const [provider, setProvider] = useState<any>(null);
//   const [files, setFiles] = useState<string[]>([]);
//   const [activeFile, setActiveFile] = useState<string>("");
//   const [isFetchingRepo, setIsFetchingRepo] = useState(false);

//   // ---------------------------------------------------------
//   // 1. AUDIO ALERT FUNCTION
//   // ---------------------------------------------------------
//   const playAlert = (type: 'distracted' | 'sleepy' | 'posture') => {
//     try {
//       let audio;
//       if (type === 'distracted') {
//         audio = new Audio('/Distracted.ogg'); 
//       } else if (type === 'sleepy') {
//         audio = new Audio('/Sleepy.ogg');
//       } else if (type === 'posture') {
//         audio = new Audio('/Posture.ogg');
//       }
      
//       if (audio) {
//         audio.play().catch(e => console.log("Audio play blocked by browser:", e));
//       }
//     } catch (error) {
//       console.error("Error playing audio:", error);
//     }
//   };

//   // ---------------------------------------------------------
//   // 2. DISTRACTION TRACKER WEBSOCKET
//   // ---------------------------------------------------------
//   useEffect(() => {
//     // Automatically convert the HTTP Render URL to a WS connection
//     const trackerUrl = import.meta.env.VITE_TRACKER_URL 
//       ? import.meta.env.VITE_TRACKER_URL.replace(/^http/, 'ws') + '/ws/focus'
//       : 'ws://localhost:8001/ws/focus';

//     const ws = new WebSocket(trackerUrl);

//     ws.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         if (data.status === 'distracted') {
//           playAlert('distracted');
//           toast({
//             title: "Focus Alert!",
//             description: "You seem distracted. Eyes on the code!",
//             variant: "destructive",
//           });
//         } else if (data.status === 'sleepy') {
//           playAlert('sleepy');
//           toast({
//             title: "Wake Up!",
//             description: "You look sleepy. Consider taking a quick break.",
//             variant: "destructive",
//           });
//         } else if (data.status === 'posture') {
//           playAlert('posture');
//           toast({
//             title: "Posture Check!",
//             description: "Please sit up straight to protect your back.",
//             variant: "destructive",
//           });
//         }
//       } catch (err) {
//         console.error("Error parsing tracker message", err);
//       }
//     };

//     // Cleanup when leaving the page
//     return () => {
//       ws.close();
//     };
//   }, [toast]);

//   // ---------------------------------------------------------
//   // 3. WORKSPACE & REPO INITIALIZATION (Live Server)
//   // ---------------------------------------------------------
//   useEffect(() => {
//     const liveServerUrl = import.meta.env.VITE_LIVE_SERVER_URL 
//       ? import.meta.env.VITE_LIVE_SERVER_URL.replace(/^http/, 'ws') 
//       : 'ws://localhost:1234';

//     const wsProvider = new WebsocketProvider(liveServerUrl, roomId, yDoc);
//     setProvider(wsProvider);

//     const yFilesMap = yDoc.getMap('project-files');
    
//     const updateFiles = () => {
//       const list = Array.from(yFilesMap.keys()).sort();
//       setFiles(list);
      
//       setActiveFile((prev) => {
//         if (prev && list.includes(prev)) return prev;
//         if (list.length > 0) return list.includes('main.py') ? 'main.py' : list[0];
//         return "";
//       });
//     };
    
//     yFilesMap.observe(() => updateFiles());
//     updateFiles(); 

//     const initializeWorkspace = async () => {
//       if (targetRepo) {
//         setIsFetchingRepo(true);
//         try {
//           const res = await fetch(`https://api.github.com/repos/${targetRepo}/contents/`);
//           if (res.ok) {
//             const repoContents = await res.json();
            
//             const validFiles = repoContents.filter((f: any) => 
//               f.type === 'file' && 
//               !f.name.match(/\.(png|jpg|jpeg|gif|ico|pdf|zip|tar)$/i)
//             );

//             if (validFiles.length === 0) {
//                const yText = yDoc.getText('README.md');
//                if (yText.length === 0) yText.insert(0, '# Repository is empty or has no text files.');
//                yFilesMap.set('README.md', "file");
//             } else {
//                for (const file of validFiles) {
//                  const fileRes = await fetch(file.download_url);
//                  if (fileRes.ok) {
//                    const textContent = await fileRes.text();
//                    const yText = yDoc.getText(file.name);
//                    if (yText.length === 0) {
//                      yText.insert(0, textContent);
//                    }
//                    yFilesMap.set(file.name, "file"); 
//                  }
//                }
//             }
//           } else {
//             const yText = yDoc.getText('error.txt');
//             if (yText.length === 0) yText.insert(0, `Could not fetch ${targetRepo}. Make sure it is public.`);
//             yFilesMap.set('error.txt', "file");
//           }
//         } catch (err) {
//           console.error("Failed to clone repo:", err);
//           const yText = yDoc.getText('error.txt');
//           if (yText.length === 0) yText.insert(0, 'Failed to connect to GitHub API.');
//           yFilesMap.set('error.txt', "file");
//         } finally {
//           setIsFetchingRepo(false);
//           updateFiles();
//         }
//       } else {
//         const yText = yDoc.getText('main.py');
//         if (yText.length === 0) yText.insert(0, 'print("Hello DevPool!")');
//         yFilesMap.set('main.py', "file");
//         updateFiles();
//       }
//     };

//     const fallbackTimer = setTimeout(() => {
//       if (yFilesMap.size === 0) {
//         initializeWorkspace();
//       }
//     }, 3000);

//     wsProvider.on('sync', (isSynced: boolean) => {
//         if (isSynced && yFilesMap.size === 0) {
//             clearTimeout(fallbackTimer);
//             initializeWorkspace();
//         }
//     });

//     return () => {
//       clearTimeout(fallbackTimer);
//       wsProvider.disconnect();
//       yDoc.destroy();
//     };
//   }, [targetRepo, roomId]);

//   const handleCreateFile = (name: string) => {
//     const yFilesMap = yDoc.getMap('project-files');
//     if (!yFilesMap.has(name)) yFilesMap.set(name, "file");
//     setActiveFile(name);
//   };

//   const handleDeleteFile = (name: string) => {
//     const yFilesMap = yDoc.getMap('project-files');
//     yFilesMap.delete(name);
//     if (activeFile === name) setActiveFile("");
//   };

//   return (
//     <div className="h-screen w-full bg-[#1e1e1e] overflow-hidden text-white flex flex-col relative">
//       <Navbar />

//       {isFetchingRepo && (
//         <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center">
//           <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
//           <h2 className="text-xl font-bold text-white">Cloning Workspace...</h2>
//           <p className="text-muted-foreground mt-2">Pulling repository <span className="text-primary">{targetRepo}</span></p>
//         </div>
//       )}

//       <div className="flex-1 flex pt-20 h-full overflow-hidden">
//         <FileExplorer 
//           files={files} 
//           activeFile={activeFile} 
//           onFileSelect={setActiveFile}
//           onFileCreate={handleCreateFile}
//           onFileDelete={handleDeleteFile}
//         />

//         <div className="flex-1 h-full relative border-l border-[#333]">
//           {provider && activeFile ? (
//             <CodeEditor 
//               fileName={activeFile} 
//               userName="DevUser" 
//               yDoc={yDoc} 
//               provider={provider}
//               targetRepo={targetRepo}
//             />
//           ) : (
//             <div className="flex items-center justify-center h-full text-gray-500">
//               <p>Select a file to start coding.</p>
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
import { Loader2 } from "lucide-react";
import * as Y from 'yjs';
// @ts-ignore
import { WebsocketProvider } from 'y-websocket';
import { useToast } from "@/hooks/use-toast";

const LiveEditor = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const { toast } = useToast();
  
  let targetRepo = urlParams.get("repo");
  if (targetRepo && targetRepo.includes('github.com/')) {
    const urlParts = targetRepo.split('github.com/');
    targetRepo = urlParts[1].replace(/\/$/, ""); 
  }
  
  const projectId = urlParams.get("projectId");
  const roomId = projectId || "devpool-demo"; 
  
  // --- NEW: Read the readonly flag from the URL ---
  const isReadOnly = urlParams.get("readonly") === "true";
  
  const [yDoc] = useState(() => new Y.Doc());
  const [provider, setProvider] = useState<any>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [activeFile, setActiveFile] = useState<string>("");
  const [isFetchingRepo, setIsFetchingRepo] = useState(false);

  // ---------------------------------------------------------
  // 1. AUDIO ALERT FUNCTION
  // ---------------------------------------------------------
  const playAlert = (type: 'distracted' | 'sleepy' | 'posture') => {
    try {
      let audio;
      if (type === 'distracted') {
        audio = new Audio('/Distracted.ogg'); 
      } else if (type === 'sleepy') {
        audio = new Audio('/Sleepy.ogg');
      } else if (type === 'posture') {
        audio = new Audio('/Posture.ogg');
      }
      
      if (audio) {
        audio.play().catch(e => console.log("Audio play blocked by browser:", e));
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  // ---------------------------------------------------------
  // 2. DISTRACTION TRACKER WEBSOCKET
  // ---------------------------------------------------------
  useEffect(() => {
    const trackerUrl = import.meta.env.VITE_TRACKER_URL 
      ? import.meta.env.VITE_TRACKER_URL.replace(/^http/, 'ws') + '/ws/focus'
      : 'ws://localhost:8001/ws/focus';

    const ws = new WebSocket(trackerUrl);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.status === 'distracted') {
          playAlert('distracted');
          toast({
            title: "Focus Alert!",
            description: "You seem distracted. Eyes on the code!",
            variant: "destructive",
          });
        } else if (data.status === 'sleepy') {
          playAlert('sleepy');
          toast({
            title: "Wake Up!",
            description: "You look sleepy. Consider taking a quick break.",
            variant: "destructive",
          });
        } else if (data.status === 'posture') {
          playAlert('posture');
          toast({
            title: "Posture Check!",
            description: "Please sit up straight to protect your back.",
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error("Error parsing tracker message", err);
      }
    };

    return () => {
      ws.close();
    };
  }, [toast]);

  // ---------------------------------------------------------
  // 3. WORKSPACE & REPO INITIALIZATION (Live Server)
  // ---------------------------------------------------------
  useEffect(() => {
    const liveServerUrl = import.meta.env.VITE_LIVE_SERVER_URL 
      ? import.meta.env.VITE_LIVE_SERVER_URL.replace(/^http/, 'ws') 
      : 'ws://localhost:1234';

    const wsProvider = new WebsocketProvider(liveServerUrl, roomId, yDoc);
    setProvider(wsProvider);

    const yFilesMap = yDoc.getMap('project-files');
    
    const updateFiles = () => {
      const list = Array.from(yFilesMap.keys()).sort();
      setFiles(list);
      
      setActiveFile((prev) => {
        if (prev && list.includes(prev)) return prev;
        if (list.length > 0) return list.includes('main.py') ? 'main.py' : list[0];
        return "";
      });
    };
    
    yFilesMap.observe(() => updateFiles());
    updateFiles(); 

    const initializeWorkspace = async () => {
      if (targetRepo) {
        setIsFetchingRepo(true);
        try {
          const res = await fetch(`https://api.github.com/repos/${targetRepo}/contents/`);
          if (res.ok) {
            const repoContents = await res.json();
            
            const validFiles = repoContents.filter((f: any) => 
              f.type === 'file' && 
              !f.name.match(/\.(png|jpg|jpeg|gif|ico|pdf|zip|tar)$/i)
            );

            if (validFiles.length === 0) {
               const yText = yDoc.getText('README.md');
               if (yText.length === 0) yText.insert(0, '# Repository is empty or has no text files.');
               yFilesMap.set('README.md', "file");
            } else {
               for (const file of validFiles) {
                 const fileRes = await fetch(file.download_url);
                 if (fileRes.ok) {
                   const textContent = await fileRes.text();
                   const yText = yDoc.getText(file.name);
                   if (yText.length === 0) {
                     yText.insert(0, textContent);
                   }
                   yFilesMap.set(file.name, "file"); 
                 }
               }
            }
          } else {
            const yText = yDoc.getText('error.txt');
            if (yText.length === 0) yText.insert(0, `Could not fetch ${targetRepo}. Make sure it is public.`);
            yFilesMap.set('error.txt', "file");
          }
        } catch (err) {
          console.error("Failed to clone repo:", err);
          const yText = yDoc.getText('error.txt');
          if (yText.length === 0) yText.insert(0, 'Failed to connect to GitHub API.');
          yFilesMap.set('error.txt', "file");
        } finally {
          setIsFetchingRepo(false);
          updateFiles();
        }
      } else {
        const yText = yDoc.getText('main.py');
        if (yText.length === 0) yText.insert(0, 'print("Hello DevPool!")');
        yFilesMap.set('main.py', "file");
        updateFiles();
      }
    };

    const fallbackTimer = setTimeout(() => {
      if (yFilesMap.size === 0) {
        initializeWorkspace();
      }
    }, 3000);

    wsProvider.on('sync', (isSynced: boolean) => {
        if (isSynced && yFilesMap.size === 0) {
            clearTimeout(fallbackTimer);
            initializeWorkspace();
        }
    });

    return () => {
      clearTimeout(fallbackTimer);
      wsProvider.disconnect();
      yDoc.destroy();
    };
  }, [targetRepo, roomId]);

  const handleCreateFile = (name: string) => {
    // If it's read-only, block file creation
    if (isReadOnly) {
      toast({ title: "Read-Only Mode", description: "You cannot create files while shadow learning.", variant: "destructive" });
      return;
    }
    const yFilesMap = yDoc.getMap('project-files');
    if (!yFilesMap.has(name)) yFilesMap.set(name, "file");
    setActiveFile(name);
  };

  const handleDeleteFile = (name: string) => {
    // If it's read-only, block file deletion
    if (isReadOnly) {
      toast({ title: "Read-Only Mode", description: "You cannot delete files while shadow learning.", variant: "destructive" });
      return;
    }
    const yFilesMap = yDoc.getMap('project-files');
    yFilesMap.delete(name);
    if (activeFile === name) setActiveFile("");
  };

  return (
    <div className="h-screen w-full bg-[#1e1e1e] overflow-hidden text-white flex flex-col relative">
      <Navbar />

      {isFetchingRepo && (
        <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <h2 className="text-xl font-bold text-white">Cloning Workspace...</h2>
          <p className="text-muted-foreground mt-2">Pulling repository <span className="text-primary">{targetRepo}</span></p>
        </div>
      )}

      <div className="flex-1 flex pt-20 h-full overflow-hidden">
        <FileExplorer 
          files={files} 
          activeFile={activeFile} 
          onFileSelect={setActiveFile}
          onFileCreate={handleCreateFile}
          onFileDelete={handleDeleteFile}
        />

        <div className="flex-1 h-full relative border-l border-[#333]">
          {provider && activeFile ? (
            <CodeEditor 
              fileName={activeFile} 
              userName="DevUser" 
              yDoc={yDoc} 
              provider={provider}
              targetRepo={targetRepo}
              isReadOnly={isReadOnly} // --- NEW: Pass flag down ---
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