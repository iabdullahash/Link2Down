from concurrent.futures import ThreadPoolExecutor
from flask import Flask, request, send_file, after_this_request, Response, make_response
from pytube import YouTube
from io import BytesIO
import instaloader
import requests
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
cors = CORS(app)


import subprocess

import tempfile

# Specify the directory path for the temporary files
temp_dir = os.path.join(os.getcwd(), "temp")


def merge_video_audio(video_path, audio_path):
    cmd = [
        "ffmpeg",
        "-i",
        video_path,
        "-i",
        audio_path,
        "-c:v",
        "copy",
        "-c:a",
        "copy",
        "-strict",
        "-2",
        "-f",
        "mp4",
        "pipe:1",
    ]
    process = subprocess.Popen(cmd, stdout=subprocess.PIPE)
    output, _ = process.communicate()
    return output


@app.route("/homelink")
def allLink():
    url = request.args["url"]
    if "youtube.com" in url or "youtu.be" in url:
        return {"endpoint": "youtube"}
    elif "instagram.com" in url:
        return {"endpoint": "instagram"}
    else:
        raise Exception("url not found")


@app.route("/youtube/download_video", methods=["GET", "POST"])
def download_video():
    url = request.args["url"]
    res = request.args["res"]
    yt = YouTube(url)
    video = yt.streams.filter(res=f"{res}p").first()
    filename = f"{yt.title}.mp4"
    output_folder = os.path.join(os.getcwd(), "output_folder")

    if not video.is_progressive:
        video_url = video.url
        audio_stream = yt.streams.get_audio_only()
        audio_url = audio_stream.url

        os.makedirs(output_folder, exist_ok=True)
        temp_file_path = os.path.join(output_folder, tempfile.mktemp(suffix=".mp4"))

        def merge_audio_video():
            ffmpeg_cmd = [
                "ffmpeg",
                "-i",
                video_url,
                "-i",
                audio_url,
                "-c:v",
                "copy",
                "-c:a",
                "aac",
                "-preset",
                "ultrafast",
                "-movflags",
                "faststart",
                "-y",
                "-f",
                "mp4",
                temp_file_path,
            ]
            subprocess.run(ffmpeg_cmd)

        with ThreadPoolExecutor() as executor:
            executor.submit(merge_audio_video)

        @after_this_request
        def remove_temp_file(response):
            try:
                response.direct_passthrough = False
                os.remove(temp_file_path)
            except Exception as error:
                app.logger.error("Error removing temporary file: %s", str(error))
            return response

        return send_file(
            temp_file_path,
            download_name=filename,
            as_attachment=True,
            mimetype="video/mp4",
        )
    else:
        video_data = BytesIO()
        video.stream_to_buffer(video_data)
        video_data.seek(0)
        return send_file(
            video_data, download_name=filename, as_attachment=True, mimetype="video/mp4"
        )


@app.route("/youtube/download_audio", methods=["GET", "POST"])
def download_audio():
    url = request.args["url"]
    abr = request.args["abr"]
    yt = YouTube(url)
    audio = yt.streams.filter(only_audio=True, abr=f"{abr}kbps").first()
    filename = f"audio-{yt.title}-{abr}kbps.mp3"
    # audio.download(filename=filename)
    audio_data = BytesIO()
    audio.stream_to_buffer(audio_data)
    audio_data.seek(0)
    return send_file(
        audio_data, download_name="test.mp3", as_attachment=True, mimetype="audio/mp3"
    )


@app.route("/youtube/details", methods=["GET", "POST"])
def details():
    url = request.args["url"]
    yt = YouTube(url)
    min, sec = divmod(yt.length, 60)

    res = []
    for stream in yt.streams.order_by("resolution"):
        if stream.resolution:
            res.append(int(stream.resolution[:-1]))
    res = [x for i, x in enumerate(res) if x not in res[:i]]
    res.reverse()

    audio_streams = yt.streams.filter(only_audio=True)
    aud_res = []
    for stream in audio_streams:
        if stream.abr:
            aud_res.append(int(stream.abr[:-4]))
    aud_res = sorted(aud_res, reverse=True)

    video_details = {
        "title": yt.title,
        "thumbnail_url": yt.thumbnail_url,
        "length": f"{min}:{sec}",
        "views": yt.views,
        "rating": yt.rating,
        "author": yt.author,
        "publish_date": yt.publish_date,
        "resolutions": res,
        "audio_res": aud_res,
    }
    return video_details


@app.route("/instagram/details")
def details_Insta():
    url = request.args["url"]
    L = instaloader.Instaloader()
    l = url.split("/")
    if "p" in l or "tv" in l or "reel" in l:
        shortcode = l[4]
    else:
        return {"error": "Invalid url"}
    post = instaloader.Post.from_shortcode(L.context, shortcode)
    return post._asdict()


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
