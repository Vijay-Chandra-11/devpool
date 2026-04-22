// import React, { useRef, useState, useEffect } from 'react';
// import Editor, { OnMount } from '@monaco-editor/react';
// import * as Y from 'yjs';
// import { MonacoBinding } from 'y-monaco';
// import { Play, Terminal, Maximize2, Minimize2, Loader2, Globe, Github, Save, Brain, XCircle, Lock, Video, CheckCircle2 } from 'lucide-react';
// import { supabase } from '@/lib/supabase';
// import { useMode } from '@/context/ModeContext';
// import { motion, AnimatePresence } from 'framer-motion';

// interface CodeEditorProps {
//   fileName: string;
//   userName: string;
//   yDoc: Y.Doc;
//   provider: any;
//   targetRepo: string | null; 
//   isReadOnly?: boolean; 
//   disableTracker?: boolean;
//   projectId?: string | null; // --- NEW: Added projectId for database insertion ---
// }

// const CodeEditor: React.FC<CodeEditorProps> = ({ fileName, userName, yDoc, provider, targetRepo, isReadOnly, disableTracker, projectId }) => {
//   const { mode } = useMode(); 
//   const [editorInstance, setEditorInstance] = useState<any>(null);
//   const bindingRef = useRef<any>(null);
  
//   const [output, setOutput] = useState<string[]>(["// Terminal Ready"]);
//   const [isRunning, setIsRunning] = useState(false);
//   const [isTerminalOpen, setIsTerminalOpen] = useState(true);
//   const [previewSrc, setPreviewSrc] = useState("");

//   const [showCommitModal, setShowCommitModal] = useState(false);
//   const [isCommitting, setIsCommitting] = useState(false);
//   const [commitMessage, setCommitMessage] = useState("");

//   // --- NEW: CLOUDINARY EXPLANATION VIDEO STATES ---
//   const [showVideoModal, setShowVideoModal] = useState(false);
//   const [isUploadingVideo, setIsUploadingVideo] = useState(false);

//   // --- FOCUS TRACKER STATES ---
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const wsRef = useRef<WebSocket | null>(null);
//   const scoreHistoryRef = useRef<number[]>([]); 
  
//   const audioDistractedRef = useRef(new Audio('/Distracted.ogg'));
//   const audioSleepyRef = useRef(new Audio('/Sleepy.ogg'));
  
//   const [focusScore, setFocusScore] = useState<number>(100);
//   const [processedImage, setProcessedImage] = useState<string | null>(null);
//   const [showTracker, setShowTracker] = useState<boolean>(false);

//   const getLanguage = (name: string) => {
//     if (name.endsWith('.js')) return 'javascript';
//     if (name.endsWith('.py')) return 'python';
//     if (name.endsWith('.java')) return 'java';
//     if (name.endsWith('.cpp')) return 'cpp';
//     if (name.endsWith('.html')) return 'html';
//     if (name.endsWith('.css')) return 'css';
//     if (name.endsWith('.json')) return 'json';
//     return 'plaintext';
//   };

//   const handleEditorDidMount: OnMount = (editor) => { setEditorInstance(editor); };

//   // --- EDITOR SYNC EFFECT ---
//   useEffect(() => {
//     if (!editorInstance || !yDoc || !provider) return;
//     if (bindingRef.current) bindingRef.current.destroy();
//     const yText = yDoc.getText(fileName);
//     bindingRef.current = new MonacoBinding(yText, editorInstance.getModel()!, new Set([editorInstance]), provider.awareness);
    
//     const websocket = provider.ws; 
//     if (websocket) {
//         const handleMessage = (event: any) => {
//             try {
//                 const data = JSON.parse(event.data);
//                 if (data.type === 'EXECUTION_RESULT') {
//                     setIsRunning(false);
//                     if (data.error) setOutput(["❌ API Error:", data.error]);
//                     else setOutput((data.stdout ? [data.stdout] : []).concat(data.stderr ? ["⚠️ " + data.stderr] : []).flatMap(l => l.split('\n')));
//                 }
//             } catch (e) { }
//         };
//         websocket.addEventListener('message', handleMessage);
//         return () => websocket.removeEventListener('message', handleMessage);
//     }
//   }, [fileName, yDoc, provider, editorInstance]); 

//   // --- AI FOCUS TRACKER EFFECT ---
//   useEffect(() => {
//     if (disableTracker) return;

//     let captureInterval: NodeJS.Timeout;

//     navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 } })
//       .then((stream) => {
//         if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//             videoRef.current.play().catch(e => console.error("Error playing video:", e));
//         }
//       })
//       .catch(err => console.error("[Tracker] Webcam access denied:", err));

//     const trackerUrl = import.meta.env.VITE_TRACKER_URL 
//       ? import.meta.env.VITE_TRACKER_URL.replace(/^http/, 'ws') + '/ws/focus'
//       : 'ws://localhost:8001/ws/focus';

//     const ws = new WebSocket(trackerUrl);
//     wsRef.current = ws;

//     ws.onopen = () => {
//       captureInterval = setInterval(() => {
//         if (videoRef.current && canvasRef.current && ws.readyState === WebSocket.OPEN) {
//           const ctx = canvasRef.current.getContext('2d');
//           ctx?.drawImage(videoRef.current, 0, 0, 320, 240);
//           ws.send(canvasRef.current.toDataURL('image/jpeg', 0.6));
//         }
//       }, 500);
//     };

//     ws.onmessage = (event) => {
//       try {
//           const data = JSON.parse(event.data);
          
//           setFocusScore(data.focusScore);
//           scoreHistoryRef.current.push(data.focusScore); 
          
//           if (data.processed_image) setProcessedImage(data.processed_image);

//           if (data.play_distracted_audio) {
//              audioDistractedRef.current.currentTime = 0;
//              audioDistractedRef.current.play().catch(e => console.warn("Browser blocked autoplay:", e));
//           }
//           if (data.play_sleepy_audio) {
//              audioSleepyRef.current.currentTime = 0;
//              audioSleepyRef.current.play().catch(e => console.warn("Browser blocked autoplay:", e));
//           }
//       } catch (e) { console.error("[Tracker] Error parsing AI response:", e); }
//     };

//     return () => {
//       clearInterval(captureInterval);
//       if (ws.readyState === WebSocket.OPEN) ws.close();
//       if (videoRef.current?.srcObject) {
//         (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
//       }
//       saveSessionData();
//     };
//   }, [disableTracker]);

//   const saveSessionData = async () => {
//     if (disableTracker || scoreHistoryRef.current.length === 0) return;
    
//     const avgScore = Math.max(0, Math.round(scoreHistoryRef.current.reduce((a, b) => a + b, 0) / scoreHistoryRef.current.length));
//     const durationMinutes = (scoreHistoryRef.current.length * 0.5) / 60;
    
//     if (durationMinutes > 0.16) {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (session) {
//           await supabase.from('focus_sessions').insert({ user_id: session.user.id, mode: mode, average_score: avgScore, duration_minutes: durationMinutes.toFixed(2) });
//       }
//     }
//   };

//   const runCode = () => {
//     if (fileName.endsWith('.html')) {
//       const html = yDoc.getText(fileName).toString();
//       const css = yDoc.getText('style.css')?.toString() || "";
//       const js = yDoc.getText('script.js')?.toString() || "";
//       setPreviewSrc(`<html><head><style>${css}</style></head><body>${html}<script>${js}</script></body></html>`);
//       return;
//     }
//     setIsRunning(true); setOutput(["Running on local server (port 1234)..."]); setIsTerminalOpen(true);
//     const ws = provider?.ws;
//     if (ws && ws.readyState === WebSocket.OPEN) {
//         const yFilesMap = yDoc.getMap('project-files');
//         const projectFiles: Record<string, string> = {};
//         yFilesMap.forEach((_, name) => projectFiles[name] = yDoc.getText(name).toString());
//         ws.send(JSON.stringify({ type: 'RUN_CODE', language: getLanguage(fileName), mainFile: fileName, files: projectFiles }));
//     } else {
//         setOutput(["❌ Error: Not connected to execution server."]); setIsRunning(false);
//     }
//   };

//   const handleCommit = async () => {
//     if (!commitMessage.trim() || !targetRepo) return;
//     setIsCommitting(true); setShowCommitModal(false); setOutput([`Pushing to GitHub: ${targetRepo}...`]); setIsTerminalOpen(true);
//     const { data: { session } } = await supabase.auth.getSession();
//     if (!session?.provider_token) { setOutput([`❌ Auth Error: Missing GitHub Token.`]); setIsCommitting(false); return; }
    
//     const yFilesMap = yDoc.getMap('project-files');
//     const projectFiles: Record<string, string> = {};
//     yFilesMap.forEach((_, name) => projectFiles[name] = yDoc.getText(name).toString());

//     try {
//         const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
//         const response = await fetch(`${apiUrl}/api/github/commit`, {
//             method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.provider_token}` },
//             body: JSON.stringify({ repo: targetRepo, message: commitMessage, files: projectFiles })
//         });
//         if (response.ok) {
//             setOutput([`✅ Successfully committed to GitHub!`, `Repository: ${targetRepo}`]);
//             // --- FIX: Show video modal instead of clearing commit message immediately ---
//             setShowVideoModal(true);
//         }
//         else throw new Error((await response.json()).error || "Failed to commit");
//     } catch (error: any) { 
//         setOutput([`❌ GitHub Push Error:`, error.message]); 
//         setCommitMessage(""); // Clear on fail
//     } finally { 
//         setIsCommitting(false); 
//     }
//   };

//   // --- NEW: CLOUDINARY UPLOAD HANDLER ---
//   const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setIsUploadingVideo(true);

//     const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
//     const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

//     if (!CLOUD_NAME || !UPLOAD_PRESET) {
//       alert("Cloudinary credentials missing. Setup .env first.");
//       setIsUploadingVideo(false);
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', UPLOAD_PRESET);

//     try {
//       setOutput((prev) => [...prev, "Uploading explanation video to Cloudinary..."]);
//       const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`, {
//         method: 'POST',
//         body: formData
//       });

//       const data = await res.json();
//       if (data.error) throw new Error(data.error.message);

//       // SAVE TO SUPABASE `project_explanations`
//       const { data: { session } } = await supabase.auth.getSession();
      
//       const { error: dbError } = await supabase.from('project_explanations').insert({
//          project_id: projectId,
//          developer_id: session?.user.id,
//          commit_message: commitMessage,
//          video_url: data.secure_url
//       });

//       if (dbError) throw dbError;

//       setOutput((prev) => [...prev, `✅ Explanation saved successfully`]);
//       setShowVideoModal(false);
//       setCommitMessage(""); // Clear commit message only AFTER successful upload

//     } catch (err: any) {
//       alert(`Upload failed: ${err.message}`);
//       setOutput((prev) => [...prev, `❌ Video Upload Error: ${err.message}`]);
//     } finally {
//       setIsUploadingVideo(false);
//     }
//   };

//   return (
//     <div className="h-full flex flex-col bg-[#1e1e1e] relative">
      
//       {/* Hidden Captures - ONLY RENDER IF TRACKER IS ACTIVE */}
//       {!disableTracker && (
//         <>
//           <video ref={videoRef} autoPlay playsInline muted className="hidden" />
//           <canvas ref={canvasRef} width="320" height="240" className="hidden" />
//         </>
//       )}

//       {/* --- THE AI FOCUS TRACKER POPUP --- */}
//       <AnimatePresence>
//         {showTracker && !disableTracker && (
//           <motion.div 
//             initial={{ opacity: 0, y: -10, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -10, scale: 0.95 }}
//             className="absolute top-14 right-4 z-40 glass rounded-2xl p-5 w-72 backdrop-blur-xl bg-[#0f172a]/90 border border-purple-500/20 shadow-2xl shadow-purple-500/10"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-2">
//                 <Brain className="w-5 h-5 text-purple-400" />
//                 <span className="text-sm font-semibold text-white">Focus Tracker</span>
//               </div>
//               <button onClick={() => setShowTracker(false)}><XCircle className="w-5 h-5 text-gray-500 hover:text-white transition-colors"/></button>
//             </div>

//             <div className="relative w-40 h-40 mx-auto mb-6 mt-2">
//               <div className="absolute inset-0 rounded-full border-2 border-purple-500/40 overflow-hidden bg-black/50 flex items-center justify-center">
//                 {processedImage ? (
//                    <img src={processedImage} alt="AI Feed" className="w-full h-full object-cover opacity-100" />
//                 ) : (
//                    <Loader2 className="w-8 h-8 text-purple-500/50 animate-spin" />
//                 )}
                
//                 <motion.div className="absolute inset-x-0 h-px bg-purple-400/80 shadow-[0_0_10px_rgba(168,85,247,1)]" animate={{ top: ["0%", "100%", "0%"] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} />
//                 <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(hsl(270, 70%, 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(270, 70%, 60%) 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
//               </div>
//               <motion.div className="absolute -inset-1 rounded-full border border-purple-500/30" animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
//             </div>

//             <div className="text-center">
//               <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm font-bold shadow-[0_0_15px_rgba(168,85,247,0.15)]">
//                 <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${focusScore > 80 ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]' : focusScore > 50 ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.8)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'}`} />
//                 Focus: {focusScore}%
//               </span>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Commit Modal */}
//       {showCommitModal && (
//         <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
//             <div className="bg-[#2d2d2d] p-6 rounded-lg shadow-xl w-96 border border-[#444]">
//                 <h3 className="text-white text-lg mb-4 flex items-center gap-2"><Github className="w-5 h-5" /> Commit to GitHub</h3>
//                 <div className="text-xs text-gray-400 mb-4">Pushing to: <strong className="text-blue-400">{targetRepo}</strong></div>
//                 <input 
//                     autoFocus type="text" placeholder="e.g., Fixed backend bug" 
//                     className="w-full bg-[#1e1e1e] text-white p-2 rounded border border-[#444] mb-4 focus:border-blue-500 outline-none"
//                     value={commitMessage} onChange={(e) => setCommitMessage(e.target.value)}
//                     onKeyDown={(e) => e.key === 'Enter' && handleCommit()}
//                 />
//                 <div className="flex justify-end gap-2">
//                     <button onClick={() => setShowCommitModal(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
//                     <button onClick={handleCommit} disabled={isCommitting} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium disabled:opacity-50">
//                       {isCommitting ? <Loader2 className="w-4 h-4 animate-spin inline" /> : null} Commit & Push
//                     </button>
//                 </div>
//             </div>
//         </div>
//       )}

//       {/* --- NEW: VIDEO EXPLANATION MODAL (Pops up AFTER commit) --- */}
//       {showVideoModal && (
//         <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
//             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#1e293b] p-8 rounded-2xl shadow-2xl max-w-lg w-full border border-purple-500/30">
//                 <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
//                   <CheckCircle2 className="w-6 h-6 text-green-400" />
//                 </div>
//                 <h3 className="text-white text-2xl font-bold mb-2 text-center">Code Committed!</h3>
//                 <p className="text-gray-400 text-sm mb-6 text-center">
//                   To help understand your approach, please record a quick 1-2 minute video explaining what you just built.
//                 </p>
                
//                 <div className="bg-black/40 p-4 rounded-xl mb-6 border border-white/5">
//                   <p className="text-xs text-gray-500 uppercase font-bold mb-1">Commit Message:</p>
//                   <p className="text-gray-300 font-mono text-sm">{commitMessage}</p>
//                 </div>

//                 <div className="flex flex-col gap-4">
//                   <label className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl cursor-pointer transition-colors shadow-lg shadow-purple-500/20">
//                     {isUploadingVideo ? (
//                       <><Loader2 className="w-5 h-5 animate-spin" /> Uploading to Cloudinary...</>
//                     ) : (
//                       <><Video className="w-5 h-5" /> Select Explanation Video</>
//                     )}
//                     <input type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} disabled={isUploadingVideo} />
//                   </label>
                  
//                   <button 
//                     onClick={() => { setShowVideoModal(false); setCommitMessage(""); }} 
//                     disabled={isUploadingVideo}
//                     className="w-full px-4 py-3 text-gray-400 hover:text-white border border-white/10 rounded-xl transition-colors disabled:opacity-50"
//                   >
//                     Skip for now
//                   </button>
//                 </div>
//             </motion.div>
//         </div>
//       )}

//       {/* Tab Bar */}
//       <div className="h-12 bg-[#2d2d2d] flex items-center justify-between px-4 border-b border-[#1e1e1e]">
//         <div className="flex items-center px-4 py-1.5 bg-[#1e1e1e] text-gray-200 text-sm border-t-2 border-blue-500 rounded-t-md mt-2 gap-2">
//            {fileName}
//            {isReadOnly && (
//              <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-[10px] uppercase font-bold rounded flex items-center gap-1 border border-purple-500/30 ml-2">
//                <Lock className="w-3 h-3" /> Sandbox Mode
//              </span>
//            )}
//            {disableTracker && !isReadOnly && (
//              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] uppercase font-bold rounded flex items-center gap-1 border border-blue-500/30 ml-2">
//                Founder Mode
//              </span>
//            )}
//         </div>
        
//         <div className="flex items-center gap-4">
          
//           {/* HIDE TRACKER BUTTON IF DISABLED */}
//           {!disableTracker && (
//             <>
//               <button 
//                 onClick={() => setShowTracker(!showTracker)} 
//                 className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all border ${showTracker ? 'bg-purple-500/20 text-purple-400 border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.2)]' : 'bg-[#1e1e1e] text-gray-400 border-[#444] hover:bg-[#333]'}`}
//               >
//                 <Brain className={`w-4 h-4 ${focusScore > 80 ? 'text-green-400' : focusScore > 50 ? 'text-yellow-400' : 'text-red-400'}`} />
//                 {focusScore}%
//               </button>
//               <div className="h-6 w-px bg-[#444] mx-1"></div>
//             </>
//           )}

//           {!isReadOnly && (
//             <button onClick={() => setShowCommitModal(true)} disabled={isCommitting || !targetRepo} className="flex items-center gap-2 px-3 py-1.5 bg-[#1e1e1e] hover:bg-[#333] border border-[#444] text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50">
//                 {isCommitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save to Repo
//             </button>
//           )}

//           <button onClick={runCode} disabled={isRunning} className="flex items-center gap-2 px-4 py-1.5 bg-green-700 hover:bg-green-600 text-white rounded-lg text-xs font-bold transition-colors">
//             {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : (fileName.endsWith('.html') ? <Globe className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />)}
//             {fileName.endsWith('.html') ? "Refresh" : "Run Code"}
//           </button>
//         </div>
//       </div>

//       {/* Editor Split */}
//       <div className="flex-1 flex overflow-hidden relative">
//         <div className={`${fileName.endsWith('.html') ? 'w-1/2' : 'w-full'} h-full`}>
//           <Editor 
//             height="100%" 
//             language={getLanguage(fileName)} 
//             theme="vs-dark" 
//             onMount={handleEditorDidMount} 
//             options={{ minimap: { enabled: false }, fontSize: 14, automaticLayout: true, readOnly: isReadOnly }} 
//           />
//         </div>
//         {fileName.endsWith('.html') && (
//           <div className="w-1/2 h-full bg-white border-l border-gray-700">
//              <iframe title="preview" className="w-full h-full border-none" srcDoc={previewSrc} sandbox="allow-scripts" />
//           </div>
//         )}
//       </div>

//       {/* Terminal */}
//       {!fileName.endsWith('.html') && (
//         <div className={`border-t border-[#333] bg-[#1e1e1e] flex flex-col ${isTerminalOpen ? 'h-48' : 'h-8'}`}>
//           <div className="flex items-center justify-between px-4 py-1.5 bg-[#2d2d2d] cursor-pointer hover:bg-[#333]" onClick={() => setIsTerminalOpen(!isTerminalOpen)}>
//             <div className="flex items-center gap-2 text-xs text-gray-300 font-bold"><Terminal className="w-3 h-3"/> TERMINAL</div>
//             {isTerminalOpen ? <Minimize2 className="w-3 h-3 text-gray-400"/> : <Maximize2 className="w-3 h-3 text-gray-400"/>}
//           </div>
//           {isTerminalOpen && (
//             <div className="flex-1 p-3 font-mono text-sm text-gray-300 overflow-auto bg-[#1e1e1e]">
//               {output.map((line, i) => (<div key={i} className="whitespace-pre-wrap font-mono">{line}</div>))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CodeEditor;






import React, { useRef, useState, useEffect } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import * as Y from 'yjs';
import { MonacoBinding } from 'y-monaco';
import { Play, Terminal, Maximize2, Minimize2, Loader2, Globe, Github, Save, Brain, XCircle, Lock, Video, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useMode } from '@/context/ModeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeEditorProps {
  fileName: string;
  userName: string;
  yDoc: Y.Doc;
  provider: any;
  targetRepo: string | null; 
  isReadOnly?: boolean; 
  disableTracker?: boolean;
  projectId?: string | null; 
}

const CodeEditor: React.FC<CodeEditorProps> = ({ fileName, userName, yDoc, provider, targetRepo, isReadOnly, disableTracker, projectId }) => {
  const { mode } = useMode(); 
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const bindingRef = useRef<any>(null);
  
  const [output, setOutput] = useState<string[]>(["// Terminal Ready"]);
  const [isRunning, setIsRunning] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [previewSrc, setPreviewSrc] = useState("");

  const [showCommitModal, setShowCommitModal] = useState(false);
  const [isCommitting, setIsCommitting] = useState(false);
  const [commitMessage, setCommitMessage] = useState("");

  // --- CLOUDINARY EXPLANATION VIDEO STATES ---
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);

  // --- FOCUS TRACKER STATES ---
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const scoreHistoryRef = useRef<number[]>([]); 
  
  const audioDistractedRef = useRef(new Audio('/Distracted.ogg'));
  const audioSleepyRef = useRef(new Audio('/Sleepy.ogg'));
  
  const [focusScore, setFocusScore] = useState<number>(100);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [showTracker, setShowTracker] = useState<boolean>(false);

  const getLanguage = (name: string) => {
    if (name.endsWith('.js')) return 'javascript';
    if (name.endsWith('.py')) return 'python';
    if (name.endsWith('.java')) return 'java';
    if (name.endsWith('.cpp')) return 'cpp';
    if (name.endsWith('.html')) return 'html';
    if (name.endsWith('.css')) return 'css';
    if (name.endsWith('.json')) return 'json';
    return 'plaintext';
  };

  const handleEditorDidMount: OnMount = (editor) => { setEditorInstance(editor); };

  // --- EDITOR SYNC EFFECT ---
  useEffect(() => {
    if (!editorInstance || !yDoc || !provider) return;
    if (bindingRef.current) bindingRef.current.destroy();
    const yText = yDoc.getText(fileName);
    bindingRef.current = new MonacoBinding(yText, editorInstance.getModel()!, new Set([editorInstance]), provider.awareness);
    
    const websocket = provider.ws; 
    if (websocket) {
        const handleMessage = (event: any) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'EXECUTION_RESULT') {
                    setIsRunning(false);
                    if (data.error) setOutput(["❌ API Error:", data.error]);
                    else setOutput((data.stdout ? [data.stdout] : []).concat(data.stderr ? ["⚠️ " + data.stderr] : []).flatMap(l => l.split('\n')));
                }
            } catch (e) { }
        };
        websocket.addEventListener('message', handleMessage);
        return () => websocket.removeEventListener('message', handleMessage);
    }
  }, [fileName, yDoc, provider, editorInstance]); 

  // --- AI FOCUS TRACKER EFFECT ---
  useEffect(() => {
    if (disableTracker) return;

    let captureInterval: NodeJS.Timeout;

    navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 } })
      .then((stream) => {
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(e => console.error("Error playing video:", e));
        }
      })
      .catch(err => console.error("[Tracker] Webcam access denied:", err));

    const trackerUrl = import.meta.env.VITE_TRACKER_URL 
      ? import.meta.env.VITE_TRACKER_URL.replace(/^http/, 'ws') + '/ws/focus'
      : 'ws://localhost:8001/ws/focus';

    const ws = new WebSocket(trackerUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      // Send frames at exactly 2fps (500ms) as stated in your paper
      captureInterval = setInterval(() => {
        if (videoRef.current && canvasRef.current && ws.readyState === WebSocket.OPEN) {
          const ctx = canvasRef.current.getContext('2d');
          ctx?.drawImage(videoRef.current, 0, 0, 320, 240);
          ws.send(canvasRef.current.toDataURL('image/jpeg', 0.6));
        }
      }, 500);
    };

    ws.onmessage = (event) => {
      try {
          const data = JSON.parse(event.data);
          
          setFocusScore(data.focusScore);
          scoreHistoryRef.current.push(data.focusScore); 
          
          if (data.processed_image) setProcessedImage(data.processed_image);

          if (data.play_distracted_audio) {
             audioDistractedRef.current.currentTime = 0;
             audioDistractedRef.current.play().catch(e => console.warn("Browser blocked autoplay:", e));
          }
          if (data.play_sleepy_audio) {
             audioSleepyRef.current.currentTime = 0;
             audioSleepyRef.current.play().catch(e => console.warn("Browser blocked autoplay:", e));
          }
      } catch (e) { console.error("[Tracker] Error parsing AI response:", e); }
    };

    return () => {
      clearInterval(captureInterval);
      if (ws.readyState === WebSocket.OPEN) ws.close();
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
      saveSessionData();
    };
  }, [disableTracker]);

  const saveSessionData = async () => {
    if (disableTracker || scoreHistoryRef.current.length === 0) return;
    
    const avgScore = Math.max(0, Math.round(scoreHistoryRef.current.reduce((a, b) => a + b, 0) / scoreHistoryRef.current.length));
    const durationMinutes = (scoreHistoryRef.current.length * 0.5) / 60;
    
    if (durationMinutes > 0.16) {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
          await supabase.from('focus_sessions').insert({ user_id: session.user.id, mode: mode, average_score: avgScore, duration_minutes: durationMinutes.toFixed(2) });
      }
    }
  };

  const runCode = () => {
    if (fileName.endsWith('.html')) {
      const html = yDoc.getText(fileName).toString();
      const css = yDoc.getText('style.css')?.toString() || "";
      const js = yDoc.getText('script.js')?.toString() || "";
      setPreviewSrc(`<html><head><style>${css}</style></head><body>${html}<script>${js}</script></body></html>`);
      return;
    }
    setIsRunning(true); setOutput(["🚀 Compiling and running in DevPool Cloud Engine..."]); setIsTerminalOpen(true);
    const ws = provider?.ws;
    if (ws && ws.readyState === WebSocket.OPEN) {
        const yFilesMap = yDoc.getMap('project-files');
        const projectFiles: Record<string, string> = {};
        yFilesMap.forEach((_, name) => projectFiles[name] = yDoc.getText(name).toString());
        ws.send(JSON.stringify({ type: 'RUN_CODE', language: getLanguage(fileName), mainFile: fileName, files: projectFiles }));
    } else {
        setOutput(["❌ Error: Not connected to execution server."]); setIsRunning(false);
    }
  };

  const handleCommit = async () => {
    if (!commitMessage.trim() || !targetRepo) return;
    setIsCommitting(true); setShowCommitModal(false); setOutput([`Pushing to GitHub: ${targetRepo}...`]); setIsTerminalOpen(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.provider_token) { setOutput([`❌ Auth Error: Missing GitHub Token.`]); setIsCommitting(false); return; }
    
    const yFilesMap = yDoc.getMap('project-files');
    const projectFiles: Record<string, string> = {};
    yFilesMap.forEach((_, name) => projectFiles[name] = yDoc.getText(name).toString());

    try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/github/commit`, {
            method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.provider_token}` },
            body: JSON.stringify({ repo: targetRepo, message: commitMessage, files: projectFiles })
        });
        if (response.ok) {
            setOutput([`✅ Successfully committed to GitHub!`, `Repository: ${targetRepo}`]);
            setShowVideoModal(true);
        }
        else throw new Error((await response.json()).error || "Failed to commit");
    } catch (error: any) { 
        setOutput([`❌ GitHub Push Error:`, error.message]); 
        setCommitMessage(""); 
    } finally { 
        setIsCommitting(false); 
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingVideo(true);

    const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      alert("Cloudinary credentials missing. Setup .env first.");
      setIsUploadingVideo(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      setOutput((prev) => [...prev, "Uploading explanation video to Cloudinary..."]);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error.message);

      const { data: { session } } = await supabase.auth.getSession();
      
      const { error: dbError } = await supabase.from('project_explanations').insert({
         project_id: projectId,
         developer_id: session?.user.id,
         commit_message: commitMessage,
         video_url: data.secure_url
      });

      if (dbError) throw dbError;

      setOutput((prev) => [...prev, `✅ Explanation saved successfully`]);
      setShowVideoModal(false);
      setCommitMessage(""); 

    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
      setOutput((prev) => [...prev, `❌ Video Upload Error: ${err.message}`]);
    } finally {
      setIsUploadingVideo(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] relative">
      
      {!disableTracker && (
        <>
          <video ref={videoRef} autoPlay playsInline muted className="hidden" />
          <canvas ref={canvasRef} width="320" height="240" className="hidden" />
        </>
      )}

      <AnimatePresence>
        {showTracker && !disableTracker && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-14 right-4 z-40 glass rounded-2xl p-5 w-72 backdrop-blur-xl bg-[#0f172a]/90 border border-purple-500/20 shadow-2xl shadow-purple-500/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-semibold text-white">Focus Tracker</span>
              </div>
              <button onClick={() => setShowTracker(false)}><XCircle className="w-5 h-5 text-gray-500 hover:text-white transition-colors"/></button>
            </div>

            <div className="relative w-40 h-40 mx-auto mb-6 mt-2">
              <div className="absolute inset-0 rounded-full border-2 border-purple-500/40 overflow-hidden bg-black/50 flex items-center justify-center">
                {processedImage ? (
                   <img src={processedImage} alt="AI Feed" className="w-full h-full object-cover opacity-100" />
                ) : (
                   <Loader2 className="w-8 h-8 text-purple-500/50 animate-spin" />
                )}
                
                <motion.div className="absolute inset-x-0 h-px bg-purple-400/80 shadow-[0_0_10px_rgba(168,85,247,1)]" animate={{ top: ["0%", "100%", "0%"] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} />
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(hsl(270, 70%, 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(270, 70%, 60%) 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
              </div>
              <motion.div className="absolute -inset-1 rounded-full border border-purple-500/30" animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
            </div>

            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm font-bold shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${focusScore > 80 ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]' : focusScore > 50 ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.8)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'}`} />
                Focus: {focusScore}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showCommitModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-[#2d2d2d] p-6 rounded-lg shadow-xl w-96 border border-[#444]">
                <h3 className="text-white text-lg mb-4 flex items-center gap-2"><Github className="w-5 h-5" /> Commit to GitHub</h3>
                <div className="text-xs text-gray-400 mb-4">Pushing to: <strong className="text-blue-400">{targetRepo}</strong></div>
                <input 
                    autoFocus type="text" placeholder="e.g., Fixed backend bug" 
                    className="w-full bg-[#1e1e1e] text-white p-2 rounded border border-[#444] mb-4 focus:border-blue-500 outline-none"
                    value={commitMessage} onChange={(e) => setCommitMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCommit()}
                />
                <div className="flex justify-end gap-2">
                    <button onClick={() => setShowCommitModal(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                    <button onClick={handleCommit} disabled={isCommitting} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium disabled:opacity-50">
                      {isCommitting ? <Loader2 className="w-4 h-4 animate-spin inline" /> : null} Commit & Push
                    </button>
                </div>
            </div>
        </div>
      )}

      {showVideoModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#1e293b] p-8 rounded-2xl shadow-2xl max-w-lg w-full border border-purple-500/30">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-white text-2xl font-bold mb-2 text-center">Code Committed!</h3>
                <p className="text-gray-400 text-sm mb-6 text-center">
                  To help understand your approach, please record a quick 1-2 minute video explaining what you just built.
                </p>
                
                <div className="bg-black/40 p-4 rounded-xl mb-6 border border-white/5">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Commit Message:</p>
                  <p className="text-gray-300 font-mono text-sm">{commitMessage}</p>
                </div>

                <div className="flex flex-col gap-4">
                  <label className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl cursor-pointer transition-colors shadow-lg shadow-purple-500/20">
                    {isUploadingVideo ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Uploading to Cloudinary...</>
                    ) : (
                      <><Video className="w-5 h-5" /> Select Explanation Video</>
                    )}
                    <input type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} disabled={isUploadingVideo} />
                  </label>
                  
                  <button 
                    onClick={() => { setShowVideoModal(false); setCommitMessage(""); }} 
                    disabled={isUploadingVideo}
                    className="w-full px-4 py-3 text-gray-400 hover:text-white border border-white/10 rounded-xl transition-colors disabled:opacity-50"
                  >
                    Skip for now
                  </button>
                </div>
            </motion.div>
        </div>
      )}

      <div className="h-12 bg-[#2d2d2d] flex items-center justify-between px-4 border-b border-[#1e1e1e]">
        <div className="flex items-center px-4 py-1.5 bg-[#1e1e1e] text-gray-200 text-sm border-t-2 border-blue-500 rounded-t-md mt-2 gap-2">
           {fileName}
           {isReadOnly && (
             <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-[10px] uppercase font-bold rounded flex items-center gap-1 border border-purple-500/30 ml-2">
               <Lock className="w-3 h-3" /> Sandbox Mode
             </span>
           )}
           {disableTracker && !isReadOnly && (
             <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] uppercase font-bold rounded flex items-center gap-1 border border-blue-500/30 ml-2">
               Founder Mode
             </span>
           )}
        </div>
        
        <div className="flex items-center gap-4">
          {!disableTracker && (
            <>
              <button 
                onClick={() => setShowTracker(!showTracker)} 
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all border ${showTracker ? 'bg-purple-500/20 text-purple-400 border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.2)]' : 'bg-[#1e1e1e] text-gray-400 border-[#444] hover:bg-[#333]'}`}
              >
                <Brain className={`w-4 h-4 ${focusScore > 80 ? 'text-green-400' : focusScore > 50 ? 'text-yellow-400' : 'text-red-400'}`} />
                {focusScore}%
              </button>
              <div className="h-6 w-px bg-[#444] mx-1"></div>
            </>
          )}

          {!isReadOnly && (
            <button onClick={() => setShowCommitModal(true)} disabled={isCommitting || !targetRepo} className="flex items-center gap-2 px-3 py-1.5 bg-[#1e1e1e] hover:bg-[#333] border border-[#444] text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50">
                {isCommitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save to Repo
            </button>
          )}

          <button onClick={runCode} disabled={isRunning} className="flex items-center gap-2 px-4 py-1.5 bg-green-700 hover:bg-green-600 text-white rounded-lg text-xs font-bold transition-colors">
            {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : (fileName.endsWith('.html') ? <Globe className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />)}
            {fileName.endsWith('.html') ? "Refresh" : "Run Code"}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        <div className={`${fileName.endsWith('.html') ? 'w-1/2' : 'w-full'} h-full`}>
          <Editor 
            height="100%" 
            language={getLanguage(fileName)} 
            theme="vs-dark" 
            onMount={handleEditorDidMount} 
            options={{ minimap: { enabled: false }, fontSize: 14, automaticLayout: true, readOnly: isReadOnly }} 
          />
        </div>
        {fileName.endsWith('.html') && (
          <div className="w-1/2 h-full bg-white border-l border-gray-700">
             <iframe title="preview" className="w-full h-full border-none" srcDoc={previewSrc} sandbox="allow-scripts" />
          </div>
        )}
      </div>

      {!fileName.endsWith('.html') && (
        <div className={`border-t border-[#333] bg-[#1e1e1e] flex flex-col ${isTerminalOpen ? 'h-48' : 'h-8'}`}>
          <div className="flex items-center justify-between px-4 py-1.5 bg-[#2d2d2d] cursor-pointer hover:bg-[#333]" onClick={() => setIsTerminalOpen(!isTerminalOpen)}>
            <div className="flex items-center gap-2 text-xs text-gray-300 font-bold"><Terminal className="w-3 h-3"/> TERMINAL</div>
            {isTerminalOpen ? <Minimize2 className="w-3 h-3 text-gray-400"/> : <Maximize2 className="w-3 h-3 text-gray-400"/>}
          </div>
          {isTerminalOpen && (
            <div className="flex-1 p-3 font-mono text-sm text-gray-300 overflow-auto bg-[#1e1e1e]">
              {output.map((line, i) => (<div key={i} className="whitespace-pre-wrap font-mono">{line}</div>))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;