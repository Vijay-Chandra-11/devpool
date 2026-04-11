// // // import { WebSocketServer } from 'ws';

// // // // Create a WebSocket server on port 1234
// // // const wss = new WebSocketServer({ port: 1234 });

// // // // Store connected clients by room
// // // const rooms = new Map();

// // // wss.on('connection', (ws, req) => {
// // //   // 1. Get the room ID from the URL (e.g., /project-123)
// // //   const roomId = req.url.slice(1) || 'global';

// // //   // 2. Add client to the room
// // //   if (!rooms.has(roomId)) {
// // //     rooms.set(roomId, new Set());
// // //   }
// // //   const clients = rooms.get(roomId);
// // //   clients.add(ws);

// // //   console.log(`⚡ Connection: [${roomId}] Clients: ${clients.size}`);

// // //   // 3. Handle incoming messages (Relay logic)
// // //   ws.on('message', (message, isBinary) => {
// // //     // Broadcast the message to EVERYONE else in the room
// // //     clients.forEach((client) => {
// // //       if (client !== ws && client.readyState === 1) { // 1 = OPEN
// // //         client.send(message, { binary: isBinary });
// // //       }
// // //     });
// // //   });

// // //   // 4. Handle disconnection
// // //   ws.on('close', () => {
// // //     clients.delete(ws);
// // //     console.log(`❌ Disconnect: [${roomId}] Clients: ${clients.size}`);
    
// // //     // Clean up empty rooms
// // //     if (clients.size === 0) {
// // //       rooms.delete(roomId);
// // //     }
// // //   });
// // // });

// // // console.log('🚀 DevPool Relay Server running on port 1234');


// // // import 'dotenv/config';
// // // import { WebSocketServer } from 'ws';
// // // import { executeCode } from '@tpmjs/unsandbox';

// // // // 🔴 PASTE YOUR API KEY HERE
// // // const UNSANDBOX_API_KEY = process.env.UNSANDBOX_API_KEY; 

// // // // If using the library, we usually set the key in the environment or config.
// // // // The library might look for process.env.UNSANDBOX_API_KEY
// // // process.env.UNSANDBOX_API_KEY = UNSANDBOX_API_KEY;

// // // const wss = new WebSocketServer({ port: 1234 });
// // // const rooms = new Map();

// // // wss.on('connection', (ws, req) => {
// // //   const roomId = req.url.slice(1) || 'global';

// // //   if (!rooms.has(roomId)) rooms.set(roomId, new Set());
// // //   rooms.get(roomId).add(ws);

// // //   console.log(`⚡ Client connected to room: ${roomId}`);

// // //   ws.on('message', async (message, isBinary) => {
// // //     // 1. Handle Yjs Sync Messages (Binary)
// // //     if (isBinary) {
// // //       rooms.get(roomId).forEach(client => {
// // //         if (client !== ws && client.readyState === 1) {
// // //           client.send(message, { binary: true });
// // //         }
// // //       });
// // //       return;
// // //     }

// // //     // 2. Handle Text Commands (like "Run Code")
// // //     try {
// // //       const data = JSON.parse(message.toString());

// // //       if (data.type === 'RUN_CODE') {
// // //         console.log(`🚀 Executing ${data.language} code...`);
        
// // //         // Call Unsandbox API
// // //         const result = await executeCode.execute({
// // //           language: data.language,
// // //           code: data.code
// // //         });

// // //         // Send Result back to THIS user only
// // //         ws.send(JSON.stringify({
// // //           type: 'EXECUTION_RESULT',
// // //           stdout: result.stdout,
// // //           stderr: result.stderr,
// // //           error: result.error
// // //         }));
// // //       }
// // //     } catch (e) {
// // //       console.error("Error processing message:", e);
// // //     }
// // //   });

// // //   ws.on('close', () => {
// // //     const clients = rooms.get(roomId);
// // //     if (clients) {
// // //       clients.delete(ws);
// // //       if (clients.size === 0) rooms.delete(roomId);
// // //     }
// // //   });
// // // });

// // // console.log('✅ DevPool Backend running on port 1234');




// // import 'dotenv/config'; 
// // import { WebSocketServer } from 'ws';
// // import { spawn } from 'child_process';
// // import fs from 'fs';
// // import path from 'path';
// // import os from 'os';

// // const wss = new WebSocketServer({ port: 1234 });
// // const rooms = new Map();

// // // Ensure a temp directory exists
// // const TEMP_DIR = path.join(os.tmpdir(), 'devpool_exec');
// // if (!fs.existsSync(TEMP_DIR)) {
// //   fs.mkdirSync(TEMP_DIR);
// // }

// // // Map languages to file extensions and commands
// // const RUNTIMES = {
// //   'javascript': { ext: '.js', cmd: 'node' },
// //   'python': { ext: '.py', cmd: 'python' }, // On some Windows, this might be 'py'
// //   'java': { ext: '.java', cmd: 'java', args: true }, // Java needs special handling
// // };

// // wss.on('connection', (ws, req) => {
// //   const roomId = req.url.slice(1) || 'global';
// //   if (!rooms.has(roomId)) rooms.set(roomId, new Set());
// //   rooms.get(roomId).add(ws);
// //   console.log(`⚡ Client connected: ${roomId}`);

// //   ws.on('message', async (message, isBinary) => {
// //     if (isBinary) {
// //       rooms.get(roomId).forEach(client => {
// //         if (client !== ws && client.readyState === 1) client.send(message, { binary: true });
// //       });
// //       return;
// //     }

// //     try {
// //       const data = JSON.parse(message.toString());

// //       if (data.type === 'RUN_CODE') {
// //         console.log(`🚀 Executing ${data.language} locally...`);
// //         const runtime = RUNTIMES[data.language];

// //         if (!runtime) {
// //           ws.send(JSON.stringify({
// //             type: 'EXECUTION_RESULT',
// //             error: `Language '${data.language}' is not supported locally yet.\nInstalled runtimes: JS, Python`
// //           }));
// //           return;
// //         }

// //         // 1. Create a unique file path
// //         const filename = `run_${Date.now()}${runtime.ext}`;
// //         const filepath = path.join(TEMP_DIR, filename);

// //         // 2. Write code to file
// //         fs.writeFileSync(filepath, data.code);

// //         // 3. Spawn the process
// //         let output = "";
// //         let errorOutput = "";

// //         // Handle process execution
// //         const proc = spawn(runtime.cmd, [filepath]);

// //         // Capture stdout
// //         proc.stdout.on('data', (data) => {
// //           output += data.toString();
// //         });

// //         // Capture stderr
// //         proc.stderr.on('data', (data) => {
// //           errorOutput += data.toString();
// //         });

// //         // Handle completion
// //         proc.on('close', (code) => {
// //           // 4. Cleanup file
// //           try { fs.unlinkSync(filepath); } catch (e) {}

// //           ws.send(JSON.stringify({
// //             type: 'EXECUTION_RESULT',
// //             stdout: output,
// //             stderr: errorOutput,
// //             error: code !== 0 ? `Process exited with code ${code}` : ""
// //           }));
// //         });

// //         proc.on('error', (err) => {
// //           ws.send(JSON.stringify({
// //              type: 'EXECUTION_RESULT',
// //              error: `Failed to start ${runtime.cmd}. Is it installed on your computer?` 
// //           }));
// //         });
// //       }
// //     } catch (e) {
// //       console.error(e);
// //     }
// //   });

// //   ws.on('close', () => {
// //     const clients = rooms.get(roomId);
// //     if (clients) {
// //       clients.delete(ws);
// //       if (clients.size === 0) rooms.delete(roomId);
// //     }
// //   });
// // });

// // console.log('✅ DevPool Local Runner running on port 1234');
// // console.log(`📂 Execution Temp Dir: ${TEMP_DIR}`);



// import { WebSocketServer } from 'ws';
// import { spawn } from 'child_process';
// import fs from 'fs';
// import path from 'path';
// import os from 'os';

// const port = 1234;
// const wss = new WebSocketServer({ port });
// const rooms = new Map();

// // Ensure a temp directory exists
// const TEMP_DIR = path.join(os.tmpdir(), 'devpool_exec');
// if (!fs.existsSync(TEMP_DIR)) {
//   fs.mkdirSync(TEMP_DIR);
// }

// // Map languages to file extensions and commands
// const RUNTIMES = {
//   'javascript': { ext: '.js', cmd: 'node' },
//   'python': { ext: '.py', cmd: 'python' }, 
//   'java': { ext: '.java', cmd: 'java' }, 
// };

// wss.on('connection', (ws, req) => {
//   // Extract room ID from URL, default to global
//   const roomId = req.url.slice(1) || 'global';
//   if (!rooms.has(roomId)) rooms.set(roomId, new Set());
//   rooms.get(roomId).add(ws);
//   console.log(`⚡ Client connected to room: ${roomId}`);

//   ws.on('message', async (message, isBinary) => {
//     // 1. Broadcast Binary Messages (This is how Yjs syncs cursors/text!)
//     if (isBinary) {
//       rooms.get(roomId).forEach(client => {
//         if (client !== ws && client.readyState === 1) client.send(message, { binary: true });
//       });
//       return;
//     }

//     // 2. Handle Text Messages (Like our RUN_CODE command)
//     try {
//       const data = JSON.parse(message.toString());

//       if (data.type === 'RUN_CODE') {
//         console.log(`🚀 Executing ${data.language} locally...`);
//         const runtime = RUNTIMES[data.language];

//         if (!runtime) {
//           ws.send(JSON.stringify({
//             type: 'EXECUTION_RESULT',
//             error: `Language '${data.language}' is not supported locally yet.\nInstalled runtimes: JS, Python`
//           }));
//           return;
//         }

//         // --- NEW MULTI-FILE WORKSPACE LOGIC ---
//         // Create a unique folder for this specific execution run
//         const runFolder = path.join(TEMP_DIR, `run_${Date.now()}`);
//         fs.mkdirSync(runFolder, { recursive: true });

//         // Write ALL files from the CodeEditor into this folder
//         if (data.files && typeof data.files === 'object') {
//             for (const [fileName, content] of Object.entries(data.files)) {
//                 // Prevent directory traversal attacks
//                 const safeFileName = path.basename(fileName);
//                 fs.writeFileSync(path.join(runFolder, safeFileName), content);
//             }
//         }

//         // Determine the main file to run
//         const mainFilePath = path.join(runFolder, path.basename(data.mainFile));

//         // 3. Spawn the process
//         let output = "";
//         let errorOutput = "";

//         // Execute the code INSIDE the unique folder so imports work!
//         const proc = spawn(runtime.cmd, [mainFilePath], { cwd: runFolder });

//         // Capture stdout
//         proc.stdout.on('data', (data) => {
//           output += data.toString();
//         });

//         // Capture stderr
//         proc.stderr.on('data', (data) => {
//           errorOutput += data.toString();
//         });

//         // Handle completion
//         proc.on('close', (code) => {
//           // Cleanup the entire folder after execution
//           try { fs.rmSync(runFolder, { recursive: true, force: true }); } catch (e) {}

//           ws.send(JSON.stringify({
//             type: 'EXECUTION_RESULT',
//             stdout: output,
//             stderr: errorOutput,
//             error: code !== 0 ? `Process exited with code ${code}` : ""
//           }));
//         });

//         proc.on('error', (err) => {
//           ws.send(JSON.stringify({
//              type: 'EXECUTION_RESULT',
//              error: `Failed to start ${runtime.cmd}. Is it installed on your computer?` 
//           }));
//         });
//       }
//     } catch (e) {
//       // Ignore invalid JSON
//     }
//   });

//   ws.on('close', () => {
//     const clients = rooms.get(roomId);
//     if (clients) {
//       clients.delete(ws);
//       if (clients.size === 0) rooms.delete(roomId);
//     }
//   });
// });

// console.log('✅ DevPool Local Runner running on ws://localhost:1234');
// console.log(`📂 Execution Temp Dir: ${TEMP_DIR}`);






import { WebSocketServer } from 'ws';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const port = 1234;
const wss = new WebSocketServer({ port });
const rooms = new Map();

const TEMP_DIR = path.join(os.tmpdir(), 'devpool_exec');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
}

// Function to generate the correct compile and run commands
function getRunCommand(language, mainFile) {
  const baseName = path.parse(mainFile).name; // Gets filename without extension
  const ext = path.parse(mainFile).ext.toLowerCase(); // Gets the .extension

  // Mac/Linux/Windows executable path handling
  const execPath = os.platform() === 'win32' ? '.\\main_out.exe' : './main_out';

  // 1. Auto-detect language if the frontend sends "plaintext" or empty
  let resolvedLang = language;
  if (!resolvedLang || resolvedLang === 'plaintext') {
    if (ext === '.js') resolvedLang = 'javascript';
    else if (ext === '.py') resolvedLang = 'python';
    else if (ext === '.java') resolvedLang = 'java';
    else if (ext === '.c') resolvedLang = 'c';
    else if (ext === '.cpp') resolvedLang = 'cpp';
  }

  // 2. Generate the execution command using shell chaining
  switch (resolvedLang?.toLowerCase()) {
    case 'javascript':
    case 'js':
      return `node "${mainFile}"`;
    case 'python':
      return `python "${mainFile}"`; // Change to 'python3' if needed on your Mac/Linux
    case 'java':
      return `javac *.java && java "${baseName}"`;
    case 'c':
      return `gcc "${mainFile}" -o main_out && ${execPath}`;
    case 'cpp':
    case 'c++':
      return `g++ "${mainFile}" -o main_out && ${execPath}`;
    default:
      return null;
  }
}

wss.on('connection', (ws, req) => {
  const roomId = req.url.slice(1) || 'global';
  if (!rooms.has(roomId)) rooms.set(roomId, new Set());
  rooms.get(roomId).add(ws);
  console.log(`⚡ Client connected to room: ${roomId}`);

  ws.on('message', async (message, isBinary) => {
    if (isBinary) {
      rooms.get(roomId).forEach(client => {
        if (client !== ws && client.readyState === 1) client.send(message, { binary: true });
      });
      return;
    }

    try {
      const data = JSON.parse(message.toString());

      if (data.type === 'RUN_CODE') {
        console.log(`🚀 Executing ${data.language || 'auto-detected file'} locally...`);

        const runCmd = getRunCommand(data.language, path.basename(data.mainFile));

        if (!runCmd) {
          ws.send(JSON.stringify({
            type: 'EXECUTION_RESULT',
            error: `Language '${data.language}' is not supported locally yet.\nSupported: JS, Python, Java, C, C++`
          }));
          return;
        }

        const runFolder = path.join(TEMP_DIR, `run_${Date.now()}`);
        fs.mkdirSync(runFolder, { recursive: true });

        // Write ALL files into the execution folder
        if (data.files && typeof data.files === 'object') {
            for (const [fileName, content] of Object.entries(data.files)) {
                const safeFileName = path.basename(fileName);
                fs.writeFileSync(path.join(runFolder, safeFileName), content);
            }
        }

        let output = "";
        let errorOutput = "";

        // Use shell: true to allow chained compile && run commands
        const proc = spawn(runCmd, { cwd: runFolder, shell: true });

        proc.stdout.on('data', (data) => {
          output += data.toString();
        });

        proc.stderr.on('data', (data) => {
          errorOutput += data.toString();
        });

        proc.on('close', (code) => {
          try { fs.rmSync(runFolder, { recursive: true, force: true }); } catch (e) {}

          ws.send(JSON.stringify({
            type: 'EXECUTION_RESULT',
            stdout: output,
            stderr: errorOutput,
            error: code !== 0 ? `Process exited with code ${code}` : ""
          }));
        });
        
        proc.on('error', (err) => {
          ws.send(JSON.stringify({
             type: 'EXECUTION_RESULT',
             error: `Failed to execute. Are the compilers (gcc/g++/javac) installed?` 
          }));
        });
      }
    } catch (e) {
      // Ignore invalid JSON
    }
  });

  ws.on('close', () => {
    const clients = rooms.get(roomId);
    if (clients) {
      clients.delete(ws);
      if (clients.size === 0) rooms.delete(roomId);
    }
  });
});

console.log('✅ DevPool Local Runner running on ws://localhost:1234');
console.log(`📂 Execution Temp Dir: ${TEMP_DIR}`);