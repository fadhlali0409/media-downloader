from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "<h1>Media Downloader</h1><p>الموقع يعمل بنجاح ✅</p>"
