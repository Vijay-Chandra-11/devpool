# from flask import Flask
# from flask_cors import CORS
# from models import create_tables
# from routes import devpool_routes

# app = Flask(__name__)
# CORS(app)

# create_tables()

# @app.route("/")
# def home():
#     return {"message": "DevPool backend running"}

# app.register_blueprint(devpool_routes)

# if __name__ == "__main__":
#     app.run(debug=True)




from flask import Flask
from flask_cors import CORS
from routes import devpool_routes

app = Flask(__name__)
# Enable CORS for all routes so your React frontend can talk to it
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/")
def home():
    return {"message": "DevPool Secure Backend is running!"}

app.register_blueprint(devpool_routes)

if __name__ == "__main__":
    app.run(debug=True, port=5000)