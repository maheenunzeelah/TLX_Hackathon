
import os
from dotenv import load_dotenv
#Add Azure OpenAI package
from openai import AzureOpenAI
import base64
from PIL import Image
import io
from helpers import encode_image_to_base64
# Convert the image to base64 format
import logging

# Set up logging
# logging.basicConfig(level=logging.DEBUG)

def generatePromptResult(prompt):
    try:

        #Get Configuration settings
        load_dotenv()
        azure_oai_endpoint = os.getenv("AZURE_OAI_ENDPOINT")
        azure_oai_key = os.getenv("AZURE_OAI_KEY_DALL")
        azure_oai_deployment = os.getenv("AZURE_OAI_DEPLOYMENT_GPT_VISION")

        #Initialize the Azure OpenAI client
        client = AzureOpenAI(
            azure_endpoint = azure_oai_endpoint,
            api_key = azure_oai_key,
            api_version = "2024-02-15-preview"
        )

        #Create a system message
        system_message = """You are a helpful assistant.
        """

        #Initialize messages array
        messages_array = [{"role":"system","content":system_message}]

        
          
        print("\n Sending request to Azure OpenAI endpoint..\n\n")
        # base64_image = encode_image_to_base64('1.png')
        # print(base64_image)
        #Send request to Azure OpenAI model
        messages_array.extend([
              
                  {
        "role": "user",
        "content": [{
            "type": "text",
            "text": f"""{prompt}: 
           """
        }
        ]
                  }]
        )
        response = client.chat.completions.create(
            model = azure_oai_deployment,
            max_tokens=1000,
            stream=False,
            messages = messages_array
        )
        generated_result= response.choices[0].message.content

            #Add generated text to message-array
        messages_array.append({"role":"system","content":generated_result})

        print("Response: "+ generated_result + "\n")
        return  generated_result
    except Exception as ex:
        print(ex)

def generateResult(prompt,detected_elements,img_str):
    try:

        #Get Configuration settings
        load_dotenv()
        azure_oai_endpoint = os.getenv("AZURE_OAI_ENDPOINT")
        azure_oai_key = os.getenv("AZURE_OAI_KEY_DALL")
        azure_oai_deployment = os.getenv("AZURE_OAI_DEPLOYMENT_GPT_VISION")

        #Initialize the Azure OpenAI client
        client = AzureOpenAI(
            azure_endpoint = azure_oai_endpoint,
            api_key = azure_oai_key,
            api_version = "2024-02-15-preview"
        )

        #Create a system message
        system_message = """You are a helpful assistant.
        """

        #Initialize messages array
        messages_array = [{"role":"system","content":system_message}]

        
          
        print("\n Sending request to Azure OpenAI endpoint..\n\n")
        # base64_image = encode_image_to_base64('1.png')
        # print(base64_image)
        #Send request to Azure OpenAI model
        messages_array.extend([
              
                  {
        "role": "user",
        "content": [{
            "type": "text",
            "text": f"""{prompt}: 
            {detected_elements
            }"""
        }, {
            "type": "image_url",
            "image_url": {
                "url": f"data:image/png;base64,{img_str}"
            }
        }
        ]
                  }]
        )
        response = client.chat.completions.create(
            model = azure_oai_deployment,
            max_tokens=1000,
            stream=False,
            messages = messages_array
        )
        generated_result= response.choices[0].message.content

            #Add generated text to message-array
        messages_array.append({"role":"system","content":generated_result})

        print("Response: "+ generated_result + "\n")
        return  generated_result
    except Exception as ex:
        print(ex)
      

# if __name__ == '__main__':
#     main()