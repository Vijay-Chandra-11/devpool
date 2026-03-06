# # import cv2
# # import base64
# # import numpy as np
# # from fastapi import FastAPI, WebSocket, WebSocketDisconnect
# # from fastapi.middleware.cors import CORSMiddleware

# # # IMPORT YOUR EXACT EXISTING CODE!
# # from face_landmarks import camera_function

# # app = FastAPI()

# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["*"],
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )

# # @app.websocket("/ws/focus")
# # async def focus_tracker_endpoint(websocket: WebSocket):
# #     await websocket.accept()
    
# #     TIME_COUNTER_SLEEP = 0.0
# #     TIME_COUNTER_DIST = 0.0
# #     # React sends a frame every 500ms
# #     frame_duration = 0.5 

# #     try:
# #         while True:
# #             # 1. Receive Image from React Web App
# #             data = await websocket.receive_text()
# #             encoded_data = data.split(',')[1]
# #             nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
# #             frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

# #             if frame is None:
# #                 continue

# #             # 2. RUN YOUR EXACT CAMERA FUNCTION!
# #             # This returns the stats AND the frame with the mesh drawn on it
# #             ratio_eyes, ratio_lids, face_detected, processed_frame = camera_function(frame)

# #             status = {
# #                 "drowsy": False,
# #                 "distracted": False,
# #                 "focusScore": 100,
# #                 "processed_image": ""
# #             }

# #             # 3. State Logic (Replicated exactly from your main.py)
# #             if not face_detected:
# #                 TIME_COUNTER_DIST += frame_duration
# #                 TIME_COUNTER_SLEEP = 0
# #                 status["distracted"] = True
# #                 status["focusScore"] -= 100
                
# #             elif ratio_eyes <= 38:
# #                 TIME_COUNTER_DIST += frame_duration
# #                 TIME_COUNTER_SLEEP = 0
# #                 status["distracted"] = True
# #                 status["focusScore"] -= 30
                
# #             elif ratio_lids < 4:
# #                 TIME_COUNTER_SLEEP += frame_duration
# #                 TIME_COUNTER_DIST = 0
# #                 status["drowsy"] = True
# #                 status["focusScore"] -= 40
                
# #             else:
# #                 TIME_COUNTER_DIST = 0
# #                 TIME_COUNTER_SLEEP = 0

# #             # 4. Encode the PROCESSED frame to send back to React
# #             # This allows the user to see the actual lines/dots on their face!
# #             _, buffer = cv2.imencode('.jpg', processed_frame)
# #             b64_img = base64.b64encode(buffer).decode('utf-8')
# #             status["processed_image"] = f"data:image/jpeg;base64,{b64_img}"

# #             # Instantly return the result to the browser
# #             await websocket.send_json(status)

# #     except WebSocketDisconnect:
# #         print("Client disconnected from Focus Tracker")
# #     except Exception as e:
# #         print(f"Websocket error: {e}")

# # if __name__ == "__main__":
# #     import uvicorn
# #     # RUNNING ON PORT 8001 SO IT DOESN'T CLASH WITH ECHO-PREP!
# #     uvicorn.run(app, host="0.0.0.0", port=8001)




# import cv2
# import base64
# import numpy as np
# from fastapi import FastAPI, WebSocket, WebSocketDisconnect
# from fastapi.middleware.cors import CORSMiddleware

# # IMPORT YOUR EXACT EXISTING CODE!
# from face_landmarks import camera_function

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.websocket("/ws/focus")
# async def focus_tracker_endpoint(websocket: WebSocket):
#     await websocket.accept()
    
#     TIME_COUNTER_SLEEP = 0.0
#     TIME_COUNTER_DIST = 0.0
#     # React sends a frame every 500ms
#     frame_duration = 0.5 

#     try:
#         while True:
#             # 1. Receive Image from React Web App
#             data = await websocket.receive_text()
            
#             # --- CRASH-PROOF SAFETY CHECKS ---
#             if not data or "," not in data:
#                 continue
                
#             encoded_data = data.split(',')[1]
#             if not encoded_data:
#                 continue
                
#             nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
#             if nparr.size == 0:
#                 continue
                
#             frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
#             if frame is None:
#                 continue
#             # ------------------------------------------

#             # 2. RUN YOUR EXACT CAMERA FUNCTION!
#             # This returns the stats AND the frame with the mesh drawn on it
#             ratio_eyes, ratio_lids, face_detected, processed_frame = camera_function(frame)

#             status = {
#                 "drowsy": False,
#                 "distracted": False,
#                 "focusScore": 100,
#                 "processed_image": ""
#             }

#             # 3. State Logic (Replicated exactly from your main.py)
#             if not face_detected:
#                 TIME_COUNTER_DIST += frame_duration
#                 TIME_COUNTER_SLEEP = 0
#                 status["distracted"] = True
#                 status["focusScore"] -= 100
                
#             elif ratio_eyes <= 38:
#                 TIME_COUNTER_DIST += frame_duration
#                 TIME_COUNTER_SLEEP = 0
#                 status["distracted"] = True
#                 status["focusScore"] -= 30
                
#             elif ratio_lids < 4:
#                 TIME_COUNTER_SLEEP += frame_duration
#                 TIME_COUNTER_DIST = 0
#                 status["drowsy"] = True
#                 status["focusScore"] -= 40
                
#             else:
#                 TIME_COUNTER_DIST = 0
#                 TIME_COUNTER_SLEEP = 0

#             # 4. Encode the PROCESSED frame to send back to React
#             # This allows the user to see the actual lines/dots on their face!
#             _, buffer = cv2.imencode('.jpg', processed_frame)
#             b64_img = base64.b64encode(buffer).decode('utf-8')
#             status["processed_image"] = f"data:image/jpeg;base64,{b64_img}"

#             # Instantly return the result to the browser
#             await websocket.send_json(status)

#     except WebSocketDisconnect:
#         print("Client disconnected from Focus Tracker")
#     except Exception as e:
#         print(f"Websocket error: {e}")

# if __name__ == "__main__":
#     import uvicorn
#     # RUNNING ON PORT 8001 SO IT DOESN'T CLASH WITH ECHO-PREP!
#     uvicorn.run(app, host="0.0.0.0", port=8001)


import cv2
import base64
import numpy as np
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

# IMPORT YOUR EXACT EXISTING CODE!
from face_landmarks import camera_function

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.websocket("/ws/focus")
async def focus_tracker_endpoint(websocket: WebSocket):
    await websocket.accept()
    
    TIME_COUNTER_SLEEP = 0.0
    TIME_COUNTER_DIST = 0.0
    frame_duration = 0.5 

    try:
        while True:
            data = await websocket.receive_text()
            
            if not data or "," not in data:
                continue
                
            encoded_data = data.split(',')[1]
            if not encoded_data:
                continue
                
            nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
            if nparr.size == 0:
                continue
                
            frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            if frame is None:
                continue

            # Run MediaPipe
            ratio_eyes, ratio_lids, face_detected, processed_frame = camera_function(frame)

            status = {
                "drowsy": False,
                "distracted": False,
                "focusScore": 100,
                "processed_image": "",
                "play_distracted_audio": False, # FIX: Added back the audio flags!
                "play_sleepy_audio": False
            }

            if not face_detected:
                TIME_COUNTER_DIST += frame_duration
                TIME_COUNTER_SLEEP = 0
                status["distracted"] = True
                status["focusScore"] -= 100
                
            elif ratio_eyes <= 38:
                TIME_COUNTER_DIST += frame_duration
                TIME_COUNTER_SLEEP = 0
                status["distracted"] = True
                status["focusScore"] -= 30
                
            elif ratio_lids < 4:
                TIME_COUNTER_SLEEP += frame_duration
                TIME_COUNTER_DIST = 0
                status["drowsy"] = True
                status["focusScore"] -= 40
                
            else:
                TIME_COUNTER_DIST = 0
                TIME_COUNTER_SLEEP = 0

            # --- THE AUDIO TRIGGERS ---
            if TIME_COUNTER_DIST >= 8:
                status["play_distracted_audio"] = True
                TIME_COUNTER_DIST = 0
                
            if TIME_COUNTER_SLEEP >= 8:
                status["play_sleepy_audio"] = True
                TIME_COUNTER_SLEEP = 0

            # Encode the image
            if processed_frame is not None:
                _, buffer = cv2.imencode('.jpg', processed_frame)
                b64_img = base64.b64encode(buffer).decode('utf-8')
                status["processed_image"] = f"data:image/jpeg;base64,{b64_img}"

            await websocket.send_json(status)

    except WebSocketDisconnect:
        print("Client disconnected")
    except Exception as e:
        print(f"Websocket error: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)