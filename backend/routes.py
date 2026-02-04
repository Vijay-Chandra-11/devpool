# from flask import Blueprint, request, jsonify
# import sqlite3

# devpool_routes = Blueprint("devpool_routes", __name__)

# def get_db():
#     conn = sqlite3.connect("devpool.db")
#     conn.row_factory = sqlite3.Row
#     return conn

# # -------------------------------
# # CREATE USER
# # -------------------------------
# @devpool_routes.route("/user", methods=["POST"])
# def create_user():
#     data = request.json
#     conn = get_db()
#     cur = conn.cursor()

#     cur.execute(
#         "INSERT INTO users (name, email, role) VALUES (?, ?, ?)",
#         (data["name"], data["email"], data["role"])
#     )

#     conn.commit()
#     conn.close()
#     return {"message": "User created successfully"}

# # -------------------------------
# # CREATE PROJECT (FOUNDER FILLS ALL FIELDS)
# # -------------------------------
# @devpool_routes.route("/project", methods=["POST"])
# def create_project():
#     data = request.json

#     conn = get_db()
#     cur = conn.cursor()

#     cur.execute("""
#         INSERT INTO projects 
#         (title, description, tech_stack, difficulty, type, timeline, budget, spots_left, founder_name, founder_avatar)
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
# # LIST PROJECTS (FULL DATA FOR UI)
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
#             "applicants": 0,  # can be dynamic later
#             "founder": {
#                 "name": row["founder_name"],
#                 "avatar": row["founder_avatar"]
#             }
#         })

#     return jsonify(projects)




from flask import Blueprint, request, jsonify
import sqlite3

devpool_routes = Blueprint("devpool_routes", __name__)

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
