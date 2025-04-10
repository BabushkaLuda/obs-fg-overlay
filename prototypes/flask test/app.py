# save this as app.py
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    print("hello")
    return "Hello, World!"