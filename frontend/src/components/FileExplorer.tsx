// // import React, { useState } from 'react';
// // import { Folder, FileCode, FilePlus, ChevronRight, ChevronDown, Trash2 } from 'lucide-react';

// // interface FileExplorerProps {
// //   files: string[];
// //   activeFile: string;
// //   onFileSelect: (fileName: string) => void;
// //   onFileCreate: (fileName: string) => void;
// //   onFileDelete: (fileName: string) => void;
// // }

// // const FileExplorer: React.FC<FileExplorerProps> = ({ 
// //   files, 
// //   activeFile, 
// //   onFileSelect, 
// //   onFileCreate,
// //   onFileDelete
// // }) => {
// //   const [newFileName, setNewFileName] = useState("");
// //   const [isCreating, setIsCreating] = useState(false);

// //   const handleCreate = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (newFileName) {
// //       onFileCreate(newFileName);
// //       setNewFileName("");
// //       setIsCreating(false);
// //     }
// //   };

// //   return (
// //     <div className="w-64 bg-[#1e1e1e] border-r border-[#333] flex flex-col h-full">
// //       {/* Header */}
// //       <div className="p-3 text-xs font-bold text-gray-400 tracking-wider flex justify-between items-center">
// //         <span>EXPLORER</span>
// //         <button onClick={() => setIsCreating(true)} className="hover:text-white">
// //           <FilePlus className="w-4 h-4" />
// //         </button>
// //       </div>

// //       {/* File List */}
// //       <div className="flex-1 overflow-y-auto">
// //         <div className="px-2">
// //           {/* Project Root Folder */}
// //           <div className="flex items-center text-blue-400 mb-1 cursor-default">
// //             <ChevronDown className="w-4 h-4 mr-1" />
// //             <Folder className="w-4 h-4 mr-2" />
// //             <span className="font-bold text-sm">DEVPOOL-PROJECT</span>
// //           </div>

// //           {/* Files */}
// //           <div className="ml-4 flex flex-col gap-1">
// //             {files.map((file) => (
// //               <div
// //                 key={file}
// //                 onClick={() => onFileSelect(file)}
// //                 className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer text-sm group ${
// //                   activeFile === file 
// //                     ? "bg-[#37373d] text-white" 
// //                     : "text-gray-400 hover:bg-[#2a2d2e] hover:text-gray-200"
// //                 }`}
// //               >
// //                 <div className="flex items-center truncate">
// //                   <FileCode className="w-4 h-4 mr-2 text-blue-300" />
// //                   <span>{file}</span>
// //                 </div>
// //                 {/* Delete Button (Hidden unless hovering) */}
// //                 <button 
// //                   onClick={(e) => { e.stopPropagation(); onFileDelete(file); }}
// //                   className="hidden group-hover:block text-gray-500 hover:text-red-400"
// //                 >
// //                   <Trash2 className="w-3 h-3" />
// //                 </button>
// //               </div>
// //             ))}

// //             {/* Creation Input */}
// //             {isCreating && (
// //               <form onSubmit={handleCreate} className="ml-2 mt-1">
// //                 <input
// //                   autoFocus
// //                   type="text"
// //                   placeholder="name.js"
// //                   className="w-full bg-[#3c3c3c] text-white text-sm px-2 py-1 rounded border border-blue-500 outline-none"
// //                   value={newFileName}
// //                   onChange={(e) => setNewFileName(e.target.value)}
// //                   onBlur={() => setIsCreating(false)}
// //                 />
// //               </form>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default FileExplorer;



// import React, { useState } from 'react';
// import { 
//   Folder, FilePlus, ChevronDown, Trash2, 
//   FileJson, FileCode2, FileType2, FileCode, File
// } from 'lucide-react';

// interface FileExplorerProps {
//   files: string[];
//   activeFile: string;
//   onFileSelect: (fileName: string) => void;
//   onFileCreate: (fileName: string) => void;
//   onFileDelete: (fileName: string) => void;
// }

// const FileExplorer: React.FC<FileExplorerProps> = ({ 
//   files, activeFile, onFileSelect, onFileCreate, onFileDelete
// }) => {
//   const [newFileName, setNewFileName] = useState("");
//   const [isCreating, setIsCreating] = useState(false);

//   // Helper to get icon based on extension
//   const getFileIcon = (fileName: string) => {
//     if (fileName.endsWith('.js') || fileName.endsWith('.jsx')) return <FileCode2 className="w-4 h-4 text-yellow-400" />;
//     if (fileName.endsWith('.ts') || fileName.endsWith('.tsx')) return <FileCode className="w-4 h-4 text-blue-400" />;
//     if (fileName.endsWith('.css')) return <FileType2 className="w-4 h-4 text-blue-300" />;
//     if (fileName.endsWith('.html')) return <FileCode className="w-4 h-4 text-orange-500" />;
//     if (fileName.endsWith('.json')) return <FileJson className="w-4 h-4 text-green-400" />;
//     if (fileName.endsWith('.py')) return <FileCode className="w-4 h-4 text-blue-500" />;
//     return <File className="w-4 h-4 text-gray-400" />;
//   };

//   const handleCreate = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newFileName) {
//       onFileCreate(newFileName);
//       setNewFileName("");
//       setIsCreating(false);
//     }
//   };

//   return (
//     <div className="w-64 bg-[#18181b] border-r border-[#27272a] flex flex-col h-full select-none">
//       {/* Header */}
//       <div className="p-4 text-xs font-bold text-gray-400 tracking-wider flex justify-between items-center bg-[#18181b]">
//         <span>EXPLORER</span>
//         <button 
//           onClick={() => setIsCreating(true)} 
//           className="hover:bg-white/10 p-1 rounded transition-colors text-white"
//           title="New File"
//         >
//           <FilePlus className="w-4 h-4" />
//         </button>
//       </div>

//       {/* Project Root */}
//       <div className="px-2">
//         <div className="flex items-center text-gray-300 mb-2 px-2 py-1">
//           <ChevronDown className="w-4 h-4 mr-1" />
//           <Folder className="w-4 h-4 mr-2 text-blue-500" />
//           <span className="font-bold text-sm">PROJECT</span>
//         </div>

//         {/* File List */}
//         <div className="ml-2 flex flex-col gap-0.5">
//           {files.map((file) => (
//             <div
//               key={file}
//               onClick={() => onFileSelect(file)}
//               className={`flex items-center justify-between px-3 py-1.5 rounded cursor-pointer text-sm group transition-colors border-l-2 ${
//                 activeFile === file 
//                   ? "bg-[#2a2d2e] text-white border-blue-500" 
//                   : "border-transparent text-gray-400 hover:bg-[#2a2d2e] hover:text-gray-200"
//               }`}
//             >
//               <div className="flex items-center truncate">
//                 <span className="mr-2">{getFileIcon(file)}</span>
//                 <span>{file}</span>
//               </div>
//               <button 
//                 onClick={(e) => { e.stopPropagation(); onFileDelete(file); }}
//                 className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-opacity"
//               >
//                 <Trash2 className="w-3.5 h-3.5" />
//               </button>
//             </div>
//           ))}

//           {/* Creation Input */}
//           {isCreating && (
//             <form onSubmit={handleCreate} className="ml-3 mt-1">
//               <input
//                 autoFocus
//                 type="text"
//                 placeholder="filename.js"
//                 className="w-full bg-[#18181b] text-white text-sm px-2 py-1 border border-blue-500 rounded outline-none"
//                 value={newFileName}
//                 onChange={(e) => setNewFileName(e.target.value)}
//                 onBlur={() => setIsCreating(false)}
//               />
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FileExplorer;



import React, { useState } from 'react';
import { 
  Folder, FilePlus, ChevronDown, Trash2, 
  FileJson, FileCode2, FileType2, FileCode, File
} from 'lucide-react';

interface FileExplorerProps {
  files: string[];
  activeFile: string;
  onFileSelect: (fileName: string) => void;
  onFileCreate: (fileName: string) => void;
  onFileDelete: (fileName: string) => void;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ 
  files, activeFile, onFileSelect, onFileCreate, onFileDelete
}) => {
  const [newFileName, setNewFileName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.js') || fileName.endsWith('.jsx')) return <FileCode2 className="w-4 h-4 text-yellow-400" />;
    if (fileName.endsWith('.ts') || fileName.endsWith('.tsx')) return <FileCode className="w-4 h-4 text-blue-400" />;
    if (fileName.endsWith('.css')) return <FileType2 className="w-4 h-4 text-blue-300" />;
    if (fileName.endsWith('.html')) return <FileCode className="w-4 h-4 text-orange-500" />;
    if (fileName.endsWith('.json')) return <FileJson className="w-4 h-4 text-green-400" />;
    if (fileName.endsWith('.py')) return <FileCode className="w-4 h-4 text-blue-500" />;
    return <File className="w-4 h-4 text-gray-400" />;
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFileName) {
      onFileCreate(newFileName);
      setNewFileName("");
      setIsCreating(false);
    }
  };

  return (
    <div className="w-64 bg-[#18181b] border-r border-[#27272a] flex flex-col h-full select-none">
      <div className="p-3 text-xs font-bold text-gray-400 tracking-wider flex justify-between items-center bg-[#18181b] border-b border-[#27272a]">
        <span>EXPLORER</span>
        <button onClick={() => setIsCreating(true)} className="hover:text-white" title="New File">
          <FilePlus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pt-2">
        <div className="px-2">
          <div className="flex items-center text-gray-300 mb-1 px-2 py-1">
            <ChevronDown className="w-4 h-4 mr-1" />
            <span className="font-bold text-sm">PROJECT</span>
          </div>

          <div className="ml-2 flex flex-col gap-0.5">
            {files.map((file) => (
              <div
                key={file}
                onClick={() => onFileSelect(file)}
                className={`flex items-center justify-between px-3 py-1.5 rounded cursor-pointer text-sm group ${
                  activeFile === file 
                    ? "bg-[#2a2d2e] text-white border-l-2 border-blue-500" 
                    : "text-gray-400 hover:bg-[#2a2d2e] hover:text-gray-200 border-l-2 border-transparent"
                }`}
              >
                <div className="flex items-center truncate">
                  <span className="mr-2">{getFileIcon(file)}</span>
                  <span>{file}</span>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); onFileDelete(file); }}
                  className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {isCreating && (
              <form onSubmit={handleCreate} className="ml-3 mt-1">
                <input
                  autoFocus
                  type="text"
                  placeholder="name.js"
                  className="w-full bg-[#3f3f46] text-white text-sm px-2 py-1 rounded border border-blue-500 outline-none"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  onBlur={() => setIsCreating(false)}
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;