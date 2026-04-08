# import os
# import numpy as np
# import mediapipe as mp
# import winsound

# from mediapipe import solutions
# from mediapipe.framework.formats import landmark_pb2
# from mediapipe.tasks import python
# from mediapipe.tasks.python import vision

# # -------------------- AUDIO FILE PATHS (WAV ONLY) --------------------
# AUDIO_DISTRACTED = os.path.abspath("./Audio/Distracted.wav")
# AUDIO_SLEEPY = os.path.abspath("./Audio/Sleepy.wav")
# AUDIO_POSTURE = os.path.abspath("./Audio/Posture.wav")

# # -------------------- AUDIO PLAY FUNCTION --------------------
# def play_audio(path):
#     try:
#         if os.path.exists(path):
#             winsound.PlaySound(path, winsound.SND_FILENAME | winsound.SND_ASYNC)
#     except Exception as e:
#         print("Audio error:", e)

# # -------------------- DRAW LANDMARKS --------------------
# def draw_landmarks_on_image(rgb_image, detection_result):
#     if not detection_result.face_landmarks:
#         return rgb_image

#     annotated_image = np.copy(rgb_image)

#     for face_landmarks in detection_result.face_landmarks:
#         proto = landmark_pb2.NormalizedLandmarkList()
#         proto.landmark.extend(
#             [landmark_pb2.NormalizedLandmark(x=l.x, y=l.y, z=l.z) for l in face_landmarks]
#         )

#         solutions.drawing_utils.draw_landmarks(
#             annotated_image,
#             proto,
#             mp.solutions.face_mesh.FACEMESH_TESSELATION,
#             None,
#             mp.solutions.drawing_styles.get_default_face_mesh_tesselation_style(),
#         )

#         solutions.drawing_utils.draw_landmarks(
#             annotated_image,
#             proto,
#             mp.solutions.face_mesh.FACEMESH_CONTOURS,
#             None,
#             mp.solutions.drawing_styles.get_default_face_mesh_contours_style(),
#         )

#         solutions.drawing_utils.draw_landmarks(
#             annotated_image,
#             proto,
#             mp.solutions.face_mesh.FACEMESH_IRISES,
#             None,
#             mp.solutions.drawing_styles.get_default_face_mesh_iris_connections_style(),
#         )

#     return annotated_image

# # -------------------- METRIC FUNCTIONS --------------------
# def calculate_ratio(result, h, w, dist):
#     top = result.face_landmarks[0][10]
#     bottom = result.face_landmarks[0][152]

#     face_dist = np.sqrt(
#         (top.x * w - bottom.x * w) ** 2 +
#         (top.y * h - bottom.y * h) ** 2
#     )

#     return 0 if face_dist == 0 else round(dist / face_dist * 100, 2)

# def left_eye_blink(result, h):
#     return abs(
#         result.face_landmarks[0][386].y * h -
#         result.face_landmarks[0][374].y * h
#     )

# def eye_distance(result, h, w):
#     l = result.face_landmarks[0][468]
#     r = result.face_landmarks[0][473]
#     return np.sqrt(
#         (l.x * w - r.x * w) ** 2 +
#         (l.y * h - r.y * h) ** 2
#     )

# # -------------------- MEDIAPIPE SETUP --------------------
# base_options = python.BaseOptions(
#     model_asset_path="models/face_landmarker.task"
# )

# options = vision.FaceLandmarkerOptions(
#     base_options=base_options,
#     num_faces=1,
#     output_face_blendshapes=True,
#     output_facial_transformation_matrixes=True,
# )

# detector = vision.FaceLandmarker.create_from_options(options)

# # -------------------- CAMERA FUNCTION --------------------
# def camera_function(frame):
#     image = mp.Image(mp.ImageFormat.SRGB, frame)
#     h, w, _ = frame.shape

#     result = detector.detect(image)

#     ratio_eyes = 0
#     ratio_lids = 0
#     face_detected = False

#     if result.face_landmarks:
#         face_detected = True
#         lid = left_eye_blink(result, h)
#         eyes = eye_distance(result, h, w)

#         ratio_lids = calculate_ratio(result, h, w, lid)
#         ratio_eyes = calculate_ratio(result, h, w, eyes)

#     annotated = draw_landmarks_on_image(image.numpy_view(), result)

#     return ratio_eyes, ratio_lids, face_detected, annotated






import os
import numpy as np
import mediapipe as mp
import platform
if platform.system() == 'Windows':
    import winsound
else:
    winsound = None

from mediapipe import solutions
from mediapipe.framework.formats import landmark_pb2
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

# -------------------- AUDIO FILE PATHS (WAV ONLY) --------------------
AUDIO_DISTRACTED = os.path.abspath("./Audio/Distracted.wav")
AUDIO_SLEEPY = os.path.abspath("./Audio/Sleepy.wav")
AUDIO_POSTURE = os.path.abspath("./Audio/Posture.wav")

def play_audio(path):
    try:
        if os.path.exists(path):
            if winsound:
                # FIX: Use the 'path' variable instead of the hardcoded string!
                winsound.PlaySound(path, winsound.SND_ASYNC)
            else:
                print(f"ALERT: Audio bypassed for cloud. Triggered file: {path}")
    except Exception as e:
        print("Audio error:", e)

# -------------------- DRAW LANDMARKS --------------------
def draw_landmarks_on_image(rgb_image, detection_result):
    if not detection_result.face_landmarks:
        return rgb_image

    annotated_image = np.copy(rgb_image)

    for face_landmarks in detection_result.face_landmarks:
        proto = landmark_pb2.NormalizedLandmarkList()
        proto.landmark.extend(
            [landmark_pb2.NormalizedLandmark(x=l.x, y=l.y, z=l.z) for l in face_landmarks]
        )

        solutions.drawing_utils.draw_landmarks(
            annotated_image,
            proto,
            mp.solutions.face_mesh.FACEMESH_TESSELATION,
            None,
            mp.solutions.drawing_styles.get_default_face_mesh_tesselation_style(),
        )

        solutions.drawing_utils.draw_landmarks(
            annotated_image,
            proto,
            mp.solutions.face_mesh.FACEMESH_CONTOURS,
            None,
            mp.solutions.drawing_styles.get_default_face_mesh_contours_style(),
        )

        solutions.drawing_utils.draw_landmarks(
            annotated_image,
            proto,
            mp.solutions.face_mesh.FACEMESH_IRISES,
            None,
            mp.solutions.drawing_styles.get_default_face_mesh_iris_connections_style(),
        )

    return annotated_image

# -------------------- METRIC FUNCTIONS --------------------
def calculate_ratio(result, h, w, dist):
    top = result.face_landmarks[0][10]
    bottom = result.face_landmarks[0][152]

    face_dist = np.sqrt(
        (top.x * w - bottom.x * w) ** 2 +
        (top.y * h - bottom.y * h) ** 2
    )

    return 0 if face_dist == 0 else round(dist / face_dist * 100, 2)

def left_eye_blink(result, h):
    return abs(
        result.face_landmarks[0][386].y * h -
        result.face_landmarks[0][374].y * h
    )

def eye_distance(result, h, w):
    l = result.face_landmarks[0][468]
    r = result.face_landmarks[0][473]
    return np.sqrt(
        (l.x * w - r.x * w) ** 2 +
        (l.y * h - r.y * h) ** 2
    )

# -------------------- MEDIAPIPE SETUP --------------------
base_options = python.BaseOptions(
    model_asset_path="models/face_landmarker.task"
)

options = vision.FaceLandmarkerOptions(
    base_options=base_options,
    num_faces=1,
    output_face_blendshapes=True,
    output_facial_transformation_matrixes=True,
)

detector = vision.FaceLandmarker.create_from_options(options)

# -------------------- CAMERA FUNCTION --------------------
def camera_function(frame):
    image = mp.Image(mp.ImageFormat.SRGB, frame)
    h, w, _ = frame.shape

    result = detector.detect(image)

    ratio_eyes = 0
    ratio_lids = 0
    face_detected = False

    if result.face_landmarks:
        face_detected = True
        lid = left_eye_blink(result, h)
        eyes = eye_distance(result, h, w)

        ratio_lids = calculate_ratio(result, h, w, lid)
        ratio_eyes = calculate_ratio(result, h, w, eyes)

    annotated = draw_landmarks_on_image(image.numpy_view(), result)

    return ratio_eyes, ratio_lids, face_detected, annotated
