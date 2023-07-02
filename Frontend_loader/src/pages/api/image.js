import axios from "axios";
import { Buffer } from "buffer";

export default async function handler(req, res) {
  try {
    const { url } = req.body; // Extract the URL from the request body

    // Validate the URL if needed

    const response = await axios.get(url, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data, "binary");

    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.send(imageBuffer);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).send("Error fetching image");
  }
}
