from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
from dotenv import load_dotenv
import os
import requests

def authenticate_client():
    load_dotenv()  # take environment variables from .env.
    key = os.environ['SENTIMENT_KEY']
    endpoint="https://rutlandsentiment.cognitiveservices.azure.com/"
    ta_credential = AzureKeyCredential(key)
    text_analytics_client = TextAnalyticsClient(
            endpoint=endpoint, 
            credential=ta_credential)
    return text_analytics_client
    
def extract_sentiment(strings):
    long_string = ""
    for string in strings:
        long_string = long_string + string
    client = authenticate_client()
    response = client.analyze_sentiment(documents=[long_string])[0]
    print(response)




