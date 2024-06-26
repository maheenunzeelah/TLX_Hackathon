
import os
from dotenv import load_dotenv
from openai import AzureOpenAI
import numpy as np
import pandas as pd


def get_embedding(client,text):
    print(text)
    response = client.embeddings.create(input = [text], model = "text-embedding-3-large")

    return response.data[0].embedding

def generateEmbeddings(user_story):
    try:

        #Get Configuration settings
        load_dotenv()
        azure_oai_endpoint = os.getenv("AZURE_OAI_ENDPOINT_EMBEDDINGS")
        azure_oai_key = os.getenv("AZURE_OAI_KEY")
        azure_oai_deployment = os.getenv("AZURE_OAI_DEPLOYMENT_GPT")

        #Initialize the Azure OpenAI client
        client = AzureOpenAI(
            azure_endpoint = azure_oai_endpoint,
            api_key = azure_oai_key,
            api_version = "2024-02-15-preview"
        )
        embedding = get_embedding(client,user_story)
        return embedding
            #Get input text
            # input_text = input("Enter the prompt( or type 'quit' to exit):")
            # if input_text.lower()== 'quit':
            #     break
            # if len(input_text)==0:
            #     print("Please enter a prompt")
            #     continue

            # print("\n Sending request to Azure OpenAI endpoint..\n\n")

            #Send request to Azure OpenAI model
          
        # df=pd.read_csv(r"C:\Users\MaheenUnzeelah\Documents\Hackathon\us_1.csv")
        # data=[]
        # for text in df["Combined"].dropna():
        #   embedding = get_embedding(client,text)
        #   data.append({'text': text, 'embedding': embedding})
        # df2 = pd.DataFrame(data)
        # print(df2)
        # df2
        # response = client.embeddings.create(input = [df['Combined']], model = "text-embedding-3-large")
        # generated_embedding = response.data[0].embedding
        # np_array=np.array(generated_embedding)
        # print(np_array.size,np_array.shape)

    except Exception as ex:
        print(ex)

