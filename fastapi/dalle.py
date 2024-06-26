import os
from dotenv import load_dotenv
import sys
import base64
from PIL import Image
import io
#Add Azure OpenAI package
from openai import AzureOpenAI
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)
def encode_image_to_base64(image_path ,size=(256, 256)):
    with Image.open(image_path) as img:
        img = img.resize(size) 
        buffered = io.BytesIO()
        img.save(buffered, format="PNG")
        img_bytes = buffered.getvalue()
    return base64.b64encode(img_bytes).decode('utf-8')
def generate_image(prompt):
    try:

        #Get Configuration settings
        load_dotenv()
        azure_oai_endpoint = os.getenv("AZURE_OAI_ENDPOINT_DALL_E")
        azure_oai_key = os.getenv("AZURE_OAI_KEY_DALL")
        azure_oai_deployment = os.getenv("AZURE_OAI_DEPLOYMENT_DALL_E")

        #Initialize the Azure OpenAI client
        client = AzureOpenAI(
            azure_endpoint = azure_oai_endpoint,
            api_key = azure_oai_key,
            api_version = "2024-05-01-preview"
        )

        #Create a system message
        system_message = """ 
        """

        #Initialize messages array
        messages_array = [{"role":"system","content":system_message}]
        # base64_image = encode_image_to_base64('1.png')
  

        
       

        print("\n Sending request to Azure OpenAI endpoint..\n\n")
        # width = 1440
        # height = 813
        # mask = Image.new("RGBA", (width, height), (0, 0, 0, 1))  # create an opaque image mask
        
        # # set the bottom half to be transparent
        # for x in range(width):
        #     for y in range(height // 2, height):  # only loop over the bottom half of the mask
        #         # set alpha (A) to zero to turn pixel transparent
        #         alpha = 0
        #         mask.putpixel((x, y), (0, 0, 0, alpha))
        
        # # save the mask
        # mask_name = "bottom_half_mask.png"
        # mask_filepath = os.path.join("", mask_name)
        # mask.save(mask_filepath)
        response = client.images.generate(
            model=azure_oai_deployment,
        # image=f"data:image/png;base64,{base64_image}",
        # image=open("1.png", "rb"),
        # mask=open(mask_filepath, "rb"),  # from right above
       
        prompt= prompt,  # from the generation section
        n=1,
        size="1024x1024",
        style="natural",
        response_format="b64_json",
        )

            # image_url_list = []
            # image_data_list = []
            # for image in response.data:
            #     image_url_list.append(image.model_dump()["url"])
            #     image_data_list.append(image.model_dump()["b64_json"])

            # #Add generated text to message-array
            # messages_array.append({"role":"system","content":image_url_list})

        print(response)
        return response
    except Exception as ex:
        print(ex)

# sys.modules[__name__] = generate_image