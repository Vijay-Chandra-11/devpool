// import { WebSocketServer } from 'ws';

// // Create a WebSocket server on port 1234
// const wss = new WebSocketServer({ port: 1234 });

// // Store connected clients by room
// const rooms = new Map();

// wss.on('connection', (ws, req) => {
//   // 1. Get the room ID from the URL (e.g., /project-123)
//   const roomId = req.url.slice(1) || 'global';

//   // 2. Add client to the room
//   if (!rooms.has(roomId)) {
//     rooms.set(roomId, new Set());
//   }
//   const clients = rooms.get(roomId);
//   clients.add(ws);

//   console.log(`⚡ Connection: [${roomId}] Clients: ${clients.size}`);

//   // 3. Handle incoming messages (Relay logic)
//   ws.on('message', (message, isBinary) => {
//     // Broadcast the message to EVERYONE else in the room
//     clients.forEach((client) => {
//       if (client !== ws && client.readyState === 1) { // 1 = OPEN
//         client.send(message, { binary: isBinary });
//       }
//     });
//   });

//   // 4. Handle disconnection
//   ws.on('close', () => {
//     clients.delete(ws);
//     console.log(`❌ Disconnect: [${roomId}] Clients: ${clients.size}`);
    
//     // Clean up empty rooms
//     if (clients.size === 0) {
//       rooms.delete(roomId);
//     }
//   });
// });

// console.log('🚀 DevPool Relay Server running on port 1234');


// import 'dotenv/config';
// import { WebSocketServer } from 'ws';
// import { executeCode } from '@tpmjs/unsandbox';

// // 🔴 PASTE YOUR API KEY HERE
// const UNSANDBOX_API_KEY = process.env.UNSANDBOX_API_KEY; 

// // If using the library, we usually set the key in the environment or config.
// // The library might look for process.env.UNSANDBOX_API_KEY
// process.env.UNSANDBOX_API_KEY = UNSANDBOX_API_KEY;

// const wss = new WebSocketServer({ port: 1234 });
// const rooms = new Map();

// wss.on('connection', (ws, req) => {
//   const roomId = req.url.slice(1) || 'global';

//   if (!rooms.has(roomId)) rooms.set(roomId, new Set());
//   rooms.get(roomId).add(ws);

//   console.log(`⚡ Client connected to room: ${roomId}`);

//   ws.on('message', async (message, isBinary) => {
//     // 1. Handle Yjs Sync Messages (Binary)
//     if (isBinary) {
//       rooms.get(roomId).forEach(client => {
//         if (client !== ws && client.readyState === 1) {
//           client.send(message, { binary: true });
//         }
//       });
//       return;
//     }

//     // 2. Handle Text Commands (like "Run Code")
//     try {
//       const data = JSON.parse(message.toString());

//       if (data.type === 'RUN_CODE') {
//         console.log(`🚀 Executing ${data.language} code...`);
        
//         // Call Unsandbox API
//         const result = await executeCode.execute({
//           language: data.language,
//           code: data.code
//         });

//         // Send Result back to THIS user only
//         ws.send(JSON.stringify({
//           type: 'EXECUTION_RESULT',
//           stdout: result.stdout,
//           stderr: result.stderr,
//           error: result.error
//         }));
//       }
//     } catch (e) {
//       console.error("Error processing message:", e);
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

// console.log('✅ DevPool Backend running on port 1234');




import 'dotenv/config'; 
import { WebSocketServer } from 'ws';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const wss = new WebSocketServer({ port: 1234 });
const rooms = new Map();

// Ensure a temp directory exists
const TEMP_DIR = path.join(os.tmpdir(), 'devpool_exec');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
}

// Map languages to file extensions and commands
const RUNTIMES = {
  'javascript': { ext: '.js', cmd: 'node' },
  'python': { ext: '.py', cmd: 'python' }, // On some Windows, this might be 'py'
  'java': { ext: '.java', cmd: 'java', args: true }, // Java needs special handling
};

wss.on('connection', (ws, req) => {
  const roomId = req.url.slice(1) || 'global';
  if (!rooms.has(roomId)) rooms.set(roomId, new Set());
  rooms.get(roomId).add(ws);
  console.log(`⚡ Client connected: ${roomId}`);

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
        console.log(`🚀 Executing ${data.language} locally...`);
        const runtime = RUNTIMES[data.language];

        if (!runtime) {
          ws.send(JSON.stringify({
            type: 'EXECUTION_RESULT',
            error: `Language '${data.language}' is not supported locally yet.\nInstalled runtimes: JS, Python`
          }));
          return;
        }

        // 1. Create a unique file path
        const filename = `run_${Date.now()}${runtime.ext}`;
        const filepath = path.join(TEMP_DIR, filename);

        // 2. Write code to file
        fs.writeFileSync(filepath, data.code);

        // 3. Spawn the process
        let output = "";
        let errorOutput = "";

        // Handle process execution
        const proc = spawn(runtime.cmd, [filepath]);

        // Capture stdout
        proc.stdout.on('data', (data) => {
          output += data.toString();
        });

        // Capture stderr
        proc.stderr.on('data', (data) => {
          errorOutput += data.toString();
        });

        // Handle completion
        proc.on('close', (code) => {
          // 4. Cleanup file
          try { fs.unlinkSync(filepath); } catch (e) {}

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
             error: `Failed to start ${runtime.cmd}. Is it installed on your computer?` 
          }));
        });
      }
    } catch (e) {
      console.error(e);
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

console.log('✅ DevPool Local Runner running on port 1234');
console.log(`📂 Execution Temp Dir: ${TEMP_DIR}`);