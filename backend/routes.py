# # from flask import Blueprint, request, jsonify
# # import sqlite3

# # devpool_routes = Blueprint("devpool_routes", __name__)

# # def get_db():
# #     conn = sqlite3.connect("devpool.db")
# #     conn.row_factory = sqlite3.Row
# #     return conn

# # # -------------------------------
# # # CREATE USER
# # # -------------------------------
# # @devpool_routes.route("/user", methods=["POST"])
# # def create_user():
# #     data = request.json
# #     conn = get_db()
# #     cur = conn.cursor()

# #     cur.execute(
# #         "INSERT INTO users (name, email, role) VALUES (?, ?, ?)",
# #         (data["name"], data["email"], data["role"])
# #     )

# #     conn.commit()
# #     conn.close()
# #     return {"message": "User created successfully"}

# # # -------------------------------
# # # CREATE PROJECT (FOUNDER FILLS ALL FIELDS)
# # # -------------------------------
# # @devpool_routes.route("/project", methods=["POST"])
# # def create_project():
# #     data = request.json

# #     conn = get_db()
# #     cur = conn.cursor()

# #     cur.execute("""
# #         INSERT INTO projects 
# #         (title, description, tech_stack, difficulty, type, timeline, budget, spots_left, founder_name, founder_avatar)
# #         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
# #     """, (
# #         data["title"],
# #         data["description"],
# #         data["techStack"],
# #         data["difficulty"],
# #         data["type"],
# #         data["timeline"],
# #         data["budget"],
# #         data["spotsLeft"],
# #         data["founderName"],
# #         data["founderAvatar"]
# #     ))

# #     conn.commit()
# #     conn.close()

# #     return {"message": "Project created successfully"}

# # # -------------------------------
# # # LIST PROJECTS (FULL DATA FOR UI)
# # # -------------------------------
# # @devpool_routes.route("/projects", methods=["GET"])
# # def list_projects():
# #     conn = get_db()
# #     cur = conn.cursor()

# #     rows = cur.execute("SELECT * FROM projects").fetchall()
# #     conn.close()

# #     projects = []
# #     for row in rows:
# #         projects.append({
# #             "id": row["id"],
# #             "title": row["title"],
# #             "description": row["description"],
# #             "techStack": row["tech_stack"].split(","),
# #             "difficulty": row["difficulty"],
# #             "type": row["type"],
# #             "timeline": row["timeline"],
# #             "budget": row["budget"],
# #             "spotsLeft": row["spots_left"],
# #             "applicants": 0,  # can be dynamic later
# #             "founder": {
# #                 "name": row["founder_name"],
# #                 "avatar": row["founder_avatar"]
# #             }
# #         })

# #     return jsonify(projects)




# from flask import Blueprint, request, jsonify
# import sqlite3

# devpool_routes = Blueprint("devpool_routes", __name__)

# def get_db():
#     conn = sqlite3.connect("devpool.db")
#     conn.row_factory = sqlite3.Row
#     return conn

# # -------------------------------
# # SIGNUP
# # -------------------------------
# @devpool_routes.route("/signup", methods=["POST"])
# def signup():
#     data = request.json
#     conn = get_db()
#     cur = conn.cursor()

#     try:
#         cur.execute("""
#             INSERT INTO users (name, email, password)
#             VALUES (?, ?, ?)
#         """, (
#             data["name"],
#             data["email"],
#             data["password"]
#         ))

#         conn.commit()
#         return {"message": "User registered successfully"}

#     except sqlite3.IntegrityError:
#         return {"error": "Email already exists"}, 400

#     finally:
#         conn.close()

# # -------------------------------
# # LOGIN
# # -------------------------------
# @devpool_routes.route("/login", methods=["POST"])
# def login():
#     data = request.json
#     conn = get_db()
#     cur = conn.cursor()

#     user = cur.execute("""
#         SELECT * FROM users
#         WHERE email=? AND password=?
#     """, (
#         data["email"],
#         data["password"]
#     )).fetchone()

#     conn.close()

#     if not user:
#         return {"error": "Invalid credentials"}, 401

#     return {
#         "id": user["id"],
#         "name": user["name"],
#         "email": user["email"],
#         "role": user["role"],
#         "founder_status": user["founder_status"]
#     }

# # -------------------------------
# # APPLY AS FOUNDER (YES CLICKED)
# # -------------------------------
# @devpool_routes.route("/apply-founder", methods=["POST"])
# def apply_founder():
#     data = request.json
#     conn = get_db()
#     cur = conn.cursor()

#     cur.execute("""
#         UPDATE users
#         SET founder_status='pending'
#         WHERE id=?
#     """, (data["user_id"],))

#     conn.commit()
#     conn.close()

#     return {"message": "Founder application submitted"}

# # -------------------------------
# # CREATE PROJECT (APPROVED FOUNDERS ONLY)
# # -------------------------------
# @devpool_routes.route("/project", methods=["POST"])
# def create_project():
#     data = request.json
#     conn = get_db()
#     cur = conn.cursor()

#     cur.execute("""
#         INSERT INTO projects
#         (title, description, tech_stack, difficulty, type, timeline,
#          budget, spots_left, founder_name, founder_avatar)
#         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
#     """, (
#         data["title"],
#         data["description"],
#         data["techStack"],
#         data["difficulty"],
#         data["type"],
#         data["timeline"],
#         data["budget"],
#         data["spotsLeft"],
#         data["founderName"],
#         data["founderAvatar"]
#     ))

#     conn.commit()
#     conn.close()

#     return {"message": "Project created successfully"}

# # -------------------------------
# # LIST PROJECTS
# # -------------------------------
# @devpool_routes.route("/projects", methods=["GET"])
# def list_projects():
#     conn = get_db()
#     cur = conn.cursor()

#     rows = cur.execute("SELECT * FROM projects").fetchall()
#     conn.close()

#     projects = []
#     for row in rows:
#         projects.append({
#             "id": row["id"],
#             "title": row["title"],
#             "description": row["description"],
#             "techStack": row["tech_stack"].split(","),
#             "difficulty": row["difficulty"],
#             "type": row["type"],
#             "timeline": row["timeline"],
#             "budget": row["budget"],
#             "spotsLeft": row["spots_left"],
#             "applicants": 0,
#             "founder": {
#                 "name": row["founder_name"],
#                 "avatar": row["founder_avatar"]
#             }
#         })

#     return jsonify(projects)





from flask import Blueprint, request, jsonify
import sqlite3
import base64
import requests

devpool_routes = Blueprint("devpool_routes", __name__)

# TODO: Replace with your actual GitHub token (Settings -> Developer Settings -> Personal Access Tokens (classic))
# Ensure the token has the "repo" scope checked.
GITHUB_TOKEN = "YOUR_GITHUB_PERSONAL_ACCESS_TOKEN"

def get_db():
    conn = sqlite3.connect("devpool.db")
    conn.row_factory = sqlite3.Row
    return conn

# -------------------------------
# SIGNUP
# -------------------------------
@devpool_routes.route("/signup", methods=["POST"])
def signup():
    data = request.json
    conn = get_db()
    cur = conn.cursor()

    try:
        cur.execute("""
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        """, (
            data["name"],
            data["email"],
            data["password"]
        ))

        conn.commit()
        return {"message": "User registered successfully"}

    except sqlite3.IntegrityError:
        return {"error": "Email already exists"}, 400

    finally:
        conn.close()

# -------------------------------
# LOGIN
# -------------------------------
@devpool_routes.route("/login", methods=["POST"])
def login():
    data = request.json
    conn = get_db()
    cur = conn.cursor()

    user = cur.execute("""
        SELECT * FROM users
        WHERE email=? AND password=?
    """, (
        data["email"],
        data["password"]
    )).fetchone()

    conn.close()

    if not user:
        return {"error": "Invalid credentials"}, 401

    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
        "role": user["role"],
        "founder_status": user["founder_status"]
    }

# -------------------------------
# APPLY AS FOUNDER (YES CLICKED)
# -------------------------------
@devpool_routes.route("/apply-founder", methods=["POST"])
def apply_founder():
    data = request.json
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        UPDATE users
        SET founder_status='pending'
        WHERE id=?
    """, (data["user_id"],))

    conn.commit()
    conn.close()

    return {"message": "Founder application submitted"}

# -------------------------------
# CREATE PROJECT (APPROVED FOUNDERS ONLY)
# -------------------------------
@devpool_routes.route("/project", methods=["POST"])
def create_project():
    data = request.json
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO projects
        (title, description, tech_stack, difficulty, type, timeline,
         budget, spots_left, founder_name, founder_avatar)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data["title"],
        data["description"],
        data["techStack"],
        data["difficulty"],
        data["type"],
        data["timeline"],
        data["budget"],
        data["spotsLeft"],
        data["founderName"],
        data["founderAvatar"]
    ))

    conn.commit()
    conn.close()

    return {"message": "Project created successfully"}

# -------------------------------
# LIST PROJECTS
# -------------------------------
@devpool_routes.route("/projects", methods=["GET"])
def list_projects():
    conn = get_db()
    cur = conn.cursor()

    rows = cur.execute("SELECT * FROM projects").fetchall()
    conn.close()

    projects = []
    for row in rows:
        projects.append({
            "id": row["id"],
            "title": row["title"],
            "description": row["description"],
            "techStack": row["tech_stack"].split(","),
            "difficulty": row["difficulty"],
            "type": row["type"],
            "timeline": row["timeline"],
            "budget": row["budget"],
            "spotsLeft": row["spots_left"],
            "applicants": 0,
            "founder": {
                "name": row["founder_name"],
                "avatar": row["founder_avatar"]
            }
        })

    return jsonify(projects)

# -------------------------------
# GITHUB COMMIT (FROM LIVE EDITOR)
# -------------------------------
@devpool_routes.route('/api/github/commit', methods=['POST', 'OPTIONS'])
def github_commit():
    # Handle CORS preflight request explicitly
    if request.method == "OPTIONS":
        return jsonify({"success": True}), 200

    data = request.json
    repo = data.get('repo')
    message = data.get('message')
    files = data.get('files')

    if not repo or not message or not files:
        return jsonify({"error": "Missing required fields"}), 400

    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }

    try:
        # Loop through the files from the Live Editor and push them to GitHub
        for file_name, content in files.items():
            url = f"https://api.github.com/repos/{repo}/contents/{file_name}"
            
            # 1. Check if the file already exists (we need its SHA hash to update it)
            get_res = requests.get(url, headers=headers)
            sha = get_res.json().get('sha') if get_res.status_code == 200 else None

            # 2. GitHub requires file content to be Base64 encoded
            encoded_content = base64.b64encode(content.encode('utf-8')).decode('utf-8')

            # 3. Build the commit payload
            payload = {
                "message": message,
                "content": encoded_content
            }
            if sha:
                payload["sha"] = sha # Attach the SHA if updating an existing file

            # 4. Push to GitHub!
            put_res = requests.put(url, headers=headers, json=payload)
            
            if put_res.status_code not in [200, 201]:
                return jsonify({"error": f"Failed to push {file_name}: {put_res.json().get('message')}"}), 400

        return jsonify({"success": True, "message": "Successfully pushed to GitHub"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500