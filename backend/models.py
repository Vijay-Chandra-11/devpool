# import sqlite3

# def get_db_connection():
#     conn = sqlite3.connect("devpool.db")
#     conn.row_factory = sqlite3.Row
#     return conn

# def create_tables():
#     conn = get_db_connection()
#     cur = conn.cursor()

#     # Users table
#     cur.execute("""
#     CREATE TABLE IF NOT EXISTS users (
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         name TEXT NOT NULL,
#         email TEXT NOT NULL,
#         role TEXT NOT NULL
#     )
#     """)

#     # Projects table (FULL STRUCTURE)
#     cur.execute("""
#     CREATE TABLE IF NOT EXISTS projects (
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         title TEXT NOT NULL,
#         description TEXT NOT NULL,
#         tech_stack TEXT NOT NULL,
#         difficulty TEXT NOT NULL,
#         type TEXT NOT NULL,
#         timeline TEXT NOT NULL,
#         budget TEXT NOT NULL,
#         spots_left INTEGER NOT NULL,
#         founder_name TEXT NOT NULL,
#         founder_avatar TEXT NOT NULL
#     )
#     """)

#     # Tasks table
#     cur.execute("""
#     CREATE TABLE IF NOT EXISTS tasks (
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         project_id INTEGER,
#         assigned_to INTEGER,
#         status TEXT
#     )
#     """)

#     # Learner joins table
#     cur.execute("""
#     CREATE TABLE IF NOT EXISTS learning_joins (
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         project_id INTEGER,
#         learner_id INTEGER,
#         progress INTEGER
#     )
#     """)

#     conn.commit()
#     conn.close()



import sqlite3

def get_db_connection():
    conn = sqlite3.connect("devpool.db")
    conn.row_factory = sqlite3.Row
    return conn

def create_tables():
    conn = get_db_connection()
    cur = conn.cursor()

    # -------------------------
    # USERS TABLE
    # -------------------------
    cur.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'learner',
        founder_status TEXT DEFAULT 'not_applied'
    )
    """)

    # -------------------------
    # PROJECTS TABLE
    # -------------------------
    cur.execute("""
    CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        tech_stack TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        type TEXT NOT NULL,
        timeline TEXT NOT NULL,
        budget TEXT NOT NULL,
        spots_left INTEGER NOT NULL,
        founder_name TEXT NOT NULL,
        founder_avatar TEXT NOT NULL
    )
    """)

    # -------------------------
    # TASKS TABLE
    # -------------------------
    cur.execute("""
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER,
        assigned_to INTEGER,
        status TEXT
    )
    """)

    # -------------------------
    # LEARNING JOINS TABLE
    # -------------------------
    cur.execute("""
    CREATE TABLE IF NOT EXISTS learning_joins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER,
        learner_id INTEGER,
        progress INTEGER
    )
    """)

    conn.commit()
    conn.close()