from flask import (
    Flask,
    g,
    render_template,
    request,
    redirect,
    url_for,
    flash,
    session,
    make_response,
)
import sqlite3
import argon2

app = Flask(__name__)
app.secret_key = "notsafe"


def get_db():
    if "db" not in g:
        g.db = sqlite3.connect("bestdbever.sqlite3")
        g.db.row_factory = sqlite3.Row
        g.db.set_trace_callback(print)
    return g.db


@app.teardown_appcontext
def close_db(e=None):
    db = g.pop("db", None)
    if db is not None:
        db.close()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/404")
def fourohfour():
    return render_template("404.html")


@app.route("/api/signup", methods=["POST"])
def signup():
    db = get_db()
    if request.method == "POST":
        username = request.form["username"]
        email = request.form["email"]
        password = request.form["password"]
        password_confirm = request.form["password-confirm"]
        ph = argon2.PasswordHasher()
        if password == password_confirm:
            password = ph.hash(str(password))
            db.execute(
                    "INSERT INTO user (username, password, email) VALUES (?,?,?,?)",
                    (username, password, email),
            )
            db.commit()


if __name__ == "__main__":
    app.run("0.0.0.0", port=5000, debug=True)
