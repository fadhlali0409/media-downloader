from flask import Flask, render_template, request, jsonify, send_file
import yt_dlp
import os
import uuid

app = Flask(__name__)

DOWNLOAD_FOLDER = "downloads"
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/download", methods=["POST"])
def download():
    data = request.json
    url = data.get("url")

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    file_id = str(uuid.uuid4())
    output_path = os.path.join(DOWNLOAD_FOLDER, file_id)

    ydl_opts = {
        "outtmpl": output_path + ".%(ext)s",
        "format": "bestvideo+bestaudio/best",
        "merge_output_format": "mp4",
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            filename = ydl.prepare_filename(info)

        return jsonify({
            "success": True,
            "file": filename.split("/")[-1]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/file/<filename>")
def get_file(filename):
    path = os.path.join(DOWNLOAD_FOLDER, filename)
    return send_file(path, as_attachment=True)


if __name__ == "__main__":
    app.run(debug=True)
