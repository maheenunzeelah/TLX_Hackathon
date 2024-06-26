from openai import OpenAI
from dotenv import load_dotenv
import os
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"), organization='OPEN_API_ORG')

edit_response = client.images.edit(
        model="dall-e-2",
        # image=f"data:image/png;base64,{base64_image}",
        image=open(r"C:\Users\MaheenUnzeelah\Documents\Hackathon\1.png", "rb"),
      
       
        prompt="""Generate image similar to provided one and replace login with sign in""" ,  # from the generation section
        n=1,
        size="1024x1024",
        response_format="url",
        )
print(edit_response)