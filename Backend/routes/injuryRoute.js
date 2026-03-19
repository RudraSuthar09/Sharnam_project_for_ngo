import express from "express";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";

const router = express.Router();

// store uploaded file in memory
const upload = multer({ storage: multer.memoryStorage() });

/**
 * POST /api/injury/analyze
 * expects: multipart/form-data with field "image"
 * forwards to FastAPI: POST http://127.0.0.1:8001/predict
 */
router.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "image is required" });
    }

    const form = new FormData();
    form.append("image", req.file.buffer, {
      filename: req.file.originalname || "upload.png",
      contentType: req.file.mimetype || "image/png",
    });

    const fastapiUrl = "http://127.0.0.1:8001/predict";

    const response = await axios.post(fastapiUrl, form, {
      headers: form.getHeaders(),
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      timeout: 60000,
    });

    return res.json(response.data);
  } catch (err) {
    console.error("FastAPI error:", err?.response?.data || err?.message || err);

    return res.status(500).json({
      success: false,
      message: "Failed to analyze image",
      error: err?.response?.data || err?.message || String(err),
    });
  }
});

export default router;