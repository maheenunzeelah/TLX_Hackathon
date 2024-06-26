import google.generativeai as genai
import os
from dotenv import load_dotenv
load_dotenv()

def gemini_visoin_response(model, prompt, image):
    response = model.generate_content([prompt, image])
    return response

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel('gemini-1.0-pro-latest')
prompt="""Generate html code from this image"""
response = gemini_visoin_response(model,prompt,"1.png")
print(response)