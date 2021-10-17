from dotenv import load_dotenv
import requests
from bing import bing_search
from sentiment_analysis import extract_sentiment
import base64

def brand_analysis(b64image):
    """
    Takes a user provided image, extracts the brand, and performs
    a sentiment analysis based on bing news headlines
    """
    try:
        image_data = base64.b64decode(b64image)
        load_dotenv()  # take environment variables from .env.
        import os
        region = os.environ['ACCOUNT_REGION']
        key = os.environ['VISION_KEY']

        endpoint = "https://" + region + ".api.cognitive.microsoft.com/"
        analyze_url = endpoint + "vision/v3.1/analyze"

        # Read the image into a byte array
        headers = {'Ocp-Apim-Subscription-Key': key,
                'Content-Type': 'application/octet-stream'}
        params = {'visualFeatures': 'brands'}
        response = requests.post(
            analyze_url, headers=headers, params=params, data=image_data)
        response.raise_for_status()

        # The 'analysis' object contains various fields that describe the image. The most
        # relevant caption for the image is obtained from the 'description' property.
        analysis = response.json()

        print("Running search on ",analysis["brands"][0]["name"])
        headlines = bing_search(analysis["brands"][0]["name"])
        extract_sentiment(headlines)

    except Exception as e:
        print(e)
"""
with open("./b64.txt","r") as file:
    brand_analysis(file.read)
"""