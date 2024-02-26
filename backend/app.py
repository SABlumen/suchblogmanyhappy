from flask import (
    Flask,
    g,
    render_template,
    request,
    jsonify,
    redirect,
    url_for,
    flash,
    session,
    make_response,
)
from flask_api import status
from flask_cors import CORS
import sqlite3
import argon2

app = Flask(__name__)
app.secret_key = "notsafe"


def get_db():
    if "db" not in g:
        g.db = sqlite3.connect("db.sqlite3")
        g.db.row_factory = sqlite3.Row
        g.db.set_trace_callback(print)
    return g.db


@app.teardown_appcontext
def close_db(e=None):
    db = g.pop("db", None)
    if db is not None:
        db.close()


@app.route("/api/signup", methods=["POST"])
def signup():
    db = get_db()
    d = {"success": False, "text": ""}
    http_status = status.HTTP_500_INTERNAL_SERVER_ERROR
    if request.method == "POST":
        username = request.form["username"]
        email = request.form["email"]
        password = request.form["password"]
        password_confirm = request.form["password-confirm"]
        ph = argon2.PasswordHasher()
        if password == password_confirm:
            password = ph.hash(str(password))
            db.execute(
                    "INSERT INTO user (username, password, email) VALUES (?,?,?)",
                    (username, password, email),
            )
            try:
                db.commit()
                d["success"] = True
                http_status = status.HTTP_201_CREATED
            except Exception:
                d["text"] = d["text"] + "Username or email already exists. "
                http_status = status.HTTP_400_BAD_REQUEST
        else:
            d["text"] = d["text"] + "Passwords do not match. "
    return jsonify(d), http_status


if __name__ == "__main__":
    debug = True
    if debug:
        CORS(app, origins=["*"])
    app.run("0.0.0.0", port=5000, debug=debug)
