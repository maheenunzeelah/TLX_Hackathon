import base64
from PIL import Image
import io
def encode_image_to_base64(image_path ,size=(256, 256)):
    with Image.open(image_path) as img:
        img = img.resize(size) 
        buffered = io.BytesIO()
        img.save(buffered, format="PNG")
        img_bytes = buffered.getvalue()
    return base64.b64encode(img_bytes).decode('utf-8')

def convert_image_to_base64(image):
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")  # You can change format to JPEG if needed
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return img_str
