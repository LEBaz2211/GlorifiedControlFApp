import openai
import os



def get_embedding(text, model="text-embedding-ada-002"):
    openai.api_key = os.getenv('OPENAI_API_KEY')
    text = text.replace("\n", " ")
    response = openai.Embedding.create(input=text, model=model)
    embedding = response['data'][0]['embedding']
    return embedding