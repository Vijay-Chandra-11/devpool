# import cv2
# import numpy as np
# import base64
# import mediapipe as mp
# import math
# from fastapi import FastAPI, WebSocket, WebSocketDisconnect
# from fastapi.middleware.cors import CORSMiddleware
# import uvicorn

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# mp_face_mesh = mp.solutions.face_mesh
# face_mesh = mp_face_mesh.FaceMesh(max_num_faces=1, refine_landmarks=True, min_detection_confidence=0.5, min_tracking_confidence=0.5)
# mp_drawing = mp.solutions.drawing_utils

# def calculate_ear(eye_points):
#     v1 = math.dist(eye_points[1], eye_points[5])
#     v2 = math.dist(eye_points[2], eye_points[4])
#     h = math.dist(eye_points[0], eye_points[3])
#     if h == 0: return 0
#     return (v1 + v2) / (2.0 * h)

# @app.websocket("/ws/focus")
# async def focus_tracker_endpoint(websocket: WebSocket):
#     await websocket.accept()
#     print("DevPool Live Editor Connected to AI Tracker!")
    
#     face_3d = np.array([
#         [0.0, 0.0, 0.0], [0.0, -330.0, -65.0], [-225.0, 170.0, -135.0], 
#         [225.0, 170.0, -135.0], [-150.0, -150.0, -125.0], [150.0, -150.0, -125.0]
#     ], dtype=np.float64)

#     time_counter_sleep = 0.0
#     time_counter_dist = 0.0
#     frame_duration = 0.5 
    
#     current_focus_score = 100.0

#     try:
#         while True:
#             data = await websocket.receive_text()
            
#             if "," in data:
#                 header, encoded = data.split(",", 1)
#             else:
#                 encoded = data
                
#             image_bytes = base64.b64decode(encoded)
#             nparr = np.frombuffer(image_bytes, np.uint8)
#             img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

#             if img is None: continue

#             h, w, c = img.shape
#             rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#             results = face_mesh.process(rgb_img)

#             status = {
#                 "drowsy": False, "distracted": False, "focusScore": 100,
#                 "play_distracted_audio": False, "play_sleepy_audio": False,
#                 "processed_image": None
#             }

#             face_detected = False
#             is_sleepy = False
#             is_distracted = False

#             if results.multi_face_landmarks:
#                 face_detected = True
#                 for face_landmarks in results.multi_face_landmarks:
#                     mp_drawing.draw_landmarks(
#                         image=img, landmark_list=face_landmarks,
#                         connections=mp_face_mesh.FACEMESH_TESSELATION,
#                         landmark_drawing_spec=None,
#                         connection_drawing_spec=mp_drawing.DrawingSpec(color=(168, 85, 247), thickness=1, circle_radius=1)
#                     )

#                     # 1. CHECK EYES FIRST
#                     left_eye_indices = [362, 385, 387, 263, 373, 380]
#                     right_eye_indices = [33, 160, 158, 133, 153, 144]
#                     left_eye = [(int(face_landmarks.landmark[i].x * w), int(face_landmarks.landmark[i].y * h)) for i in left_eye_indices]
#                     right_eye = [(int(face_landmarks.landmark[i].x * w), int(face_landmarks.landmark[i].y * h)) for i in right_eye_indices]
                    
#                     if ((calculate_ear(left_eye) + calculate_ear(right_eye)) / 2) < 0.22: 
#                         is_sleepy = True

#                     # 2. CHECK HEAD TILT SECOND
#                     face_2d = np.array([
#                         (int(face_landmarks.landmark[1].x * w), int(face_landmarks.landmark[1].y * h)),
#                         (int(face_landmarks.landmark[152].x * w), int(face_landmarks.landmark[152].y * h)),
#                         (int(face_landmarks.landmark[226].x * w), int(face_landmarks.landmark[226].y * h)),
#                         (int(face_landmarks.landmark[446].x * w), int(face_landmarks.landmark[446].y * h)),
#                         (int(face_landmarks.landmark[57].x * w), int(face_landmarks.landmark[57].y * h)),
#                         (int(face_landmarks.landmark[287].x * w), int(face_landmarks.landmark[287].y * h))
#                     ], dtype=np.float64)

#                     focal_length = 1 * w
#                     cam_matrix = np.array([[focal_length, 0, h / 2], [0, focal_length, w / 2], [0, 0, 1]])
#                     dist_matrix = np.zeros((4, 1), dtype=np.float64)
                    
#                     success, rot_vec, trans_vec = cv2.solvePnP(face_3d, face_2d, cam_matrix, dist_matrix)
#                     rmat, _ = cv2.Rodrigues(rot_vec)
#                     angles, _, _, _, _, _ = cv2.RQDecomp3x3(rmat)
#                     x_angle, y_angle = angles[0] * 360, angles[1] * 360

#                     if y_angle < -25 or y_angle > 25 or x_angle < -25 or x_angle > 25: 
#                         is_distracted = True

#             # --- FIX: THE LOGIC CHAIN ORDER ---
#             if not face_detected:
#                 time_counter_dist += frame_duration
#                 time_counter_sleep = 0
#                 current_focus_score -= 5.0 
            
#             elif is_sleepy:  # <--- WE CHECK SLEEPY BEFORE DISTRACTED NOW!
#                 time_counter_sleep += frame_duration
#                 time_counter_dist = 0
#                 current_focus_score -= 4.0 
                
#             elif is_distracted: 
#                 time_counter_dist += frame_duration
#                 time_counter_sleep = 0
#                 current_focus_score -= 3.0 
                
#             else:
#                 time_counter_dist = 0
#                 time_counter_sleep = 0
#                 current_focus_score += 5.0 

#             current_focus_score = max(0.0, min(100.0, current_focus_score))
#             status["focusScore"] = int(current_focus_score)

#             # Wait 7 seconds before triggering audio flag
#             if time_counter_dist >= 7:
#                 status["play_distracted_audio"] = True
#                 time_counter_dist = 0 
#             if time_counter_sleep >= 7:
#                 status["play_sleepy_audio"] = True
#                 time_counter_sleep = 0

#             _, buffer = cv2.imencode('.jpg', img)
#             status["processed_image"] = f"data:image/jpeg;base64,{base64.b64encode(buffer).decode('utf-8')}"

#             await websocket.send_json(status)

#     except WebSocketDisconnect:
#         print("Frontend disconnected.")

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8001)




import cv2
import numpy as np
import base64
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# IMPORT YOUR ORIGINAL WORKING LOGIC
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
    print("DevPool Live Editor Connected to AI Tracker (Original Logic)!")
    
    # These match your original main.py exactly
    time_counter_sleep = 0.0
    time_counter_dist = 0.0
    
    # React sends frames at ~2 FPS (every 500ms)
    frame_duration = 0.5 
    
    # The UI score
    current_focus_score = 100.0

    try:
        while True:
            # 1. Receive Image from React
            data = await websocket.receive_text()
            
            if "," in data:
                header, encoded = data.split(",", 1)
            else:
                encoded = data
                
            image_bytes = base64.b64decode(encoded)
            nparr = np.frombuffer(image_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            if img is None: 
                print("DEBUG: Empty frame received")
                continue

            status = {
                "drowsy": False, 
                "distracted": False, 
                "focusScore": 100,
                "play_distracted_audio": False, 
                "play_sleepy_audio": False,
                "processed_image": None
            }

            # 2. RUN YOUR ORIGINAL FACE_LANDMARKS.PY LOGIC
            # This returns your exact variables
            ratio_eyes, ratio_lids, face_detected, frame = camera_function(img)
            frame = frame.copy() # Required for drawing

            debug_message = "Focused"

            # 3. APPLY YOUR ORIGINAL MAIN.PY LOGIC EXACTLY
            # But we update the 'current_focus_score' for the React UI instead of PyQt text
            
            if not face_detected:
                time_counter_dist += frame_duration
                time_counter_sleep = 0
                status["distracted"] = True
                current_focus_score -= 5.0
                debug_message = "No Face Detected"
                
            elif ratio_lids < 4:
                # We check sleepy first! (If eyes are closed, it doesn't matter where they look)
                time_counter_sleep += frame_duration
                time_counter_dist = 0
                status["drowsy"] = True
                current_focus_score -= 4.0
                debug_message = f"Drowsy (Ratio Lids: {ratio_lids})"
                
            elif ratio_eyes <= 38:
                time_counter_dist += frame_duration
                time_counter_sleep = 0
                status["distracted"] = True
                current_focus_score -= 3.0
                debug_message = f"Distracted (Ratio Eyes: {ratio_eyes})"
                
            else:
                # Normal attentive state
                time_counter_dist = 0
                time_counter_sleep = 0
                current_focus_score += 5.0

            # Cap score between 0 and 100
            current_focus_score = max(0.0, min(100.0, current_focus_score))
            status["focusScore"] = int(current_focus_score)

            # print(f"Score: {status['focusScore']} | State: {debug_message}")

            # 4. AUDIO TRIGGERS (Wait 7 seconds as requested)
            if time_counter_dist >= 7:
                status["play_distracted_audio"] = True
                time_counter_dist = 0 
                
            if time_counter_sleep >= 7:
                status["play_sleepy_audio"] = True
                time_counter_sleep = 0

            # 5. SEND PROCESSED IMAGE BACK TO REACT
            # Since `camera_function` already drew the mesh/landmarks, we just send it!
            _, buffer = cv2.imencode('.jpg', frame)
            status["processed_image"] = f"data:image/jpeg;base64,{base64.b64encode(buffer).decode('utf-8')}"

            await websocket.send_json(status)

    except WebSocketDisconnect:
        print("Frontend disconnected.")
    except Exception as e:
        print(f"Error in backend: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)