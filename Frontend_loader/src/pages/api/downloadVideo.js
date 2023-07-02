import axios from "axios";

export default async function handler(req, res) {
  try {
    const url = req.body.url; // Extract the URL from the query parameters
    console.log(url);
    // Validate the URL if needed

    const response = await axios.get(url, { responseType: "stream" });

    res.setHeader("Content-Type", response.headers["content-type"]);
    res.setHeader("Content-Disposition", "attachment; filename=video.mp4");

    response.data.pipe(res);
  } catch (error) {
    console.error("Error downloading video:", error);
    res.status(500).send("Error downloading video");
  }
}
