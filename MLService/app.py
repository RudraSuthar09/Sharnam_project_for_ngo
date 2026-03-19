import io
import json
import numpy as np
from PIL import Image

import tensorflow as tf
from fastapi import FastAPI, File, UploadFile

app = FastAPI()

# Load model + metadata once
model = tf.keras.models.load_model("dog_disease_model.h5")

with open("classes.json", "r") as f:
    classes = json.load(f)

with open("advice.json", "r") as f:
    advice = json.load(f)

print("Model loaded")

def preprocess_image(image_bytes: bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))
    arr = np.array(img).astype("float32") / 255.0
    arr = np.expand_dims(arr, axis=0)
    return arr

@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    image_bytes = await image.read()
    x = preprocess_image(image_bytes)

    pred = model.predict(x)
    class_index = int(np.argmax(pred, axis=1)[0])
    label = classes[class_index]

    severity, tip = advice[label]
    confidence = float(np.max(pred))

    return {
        "success": True,
        "prediction": label,
        "severity": severity,
        "advice": tip,
        "confidence": confidence
    }