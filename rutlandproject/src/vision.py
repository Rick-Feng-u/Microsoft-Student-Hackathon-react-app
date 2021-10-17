from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import VisualFeatureTypes
from msrest.authentication import CognitiveServicesCredentials
from dotenv import load_dotenv
import requests
from bing import bing_search
from sentiment_analysis import extract_sentiment
import base64



def brand_analysis(image):
    """
    Takes a user provided image, extracts the brand, and performs
    a sentiment analysis based on bing news headlines
    
    image object has the following fields:
    b64string: base64 encoded string representation of image
    extension: the image's original finle extension"
    """
    imgdata = base64.b64decode(image["b64string"])
    filename = '../bin/photo.%s' % image["extension"]
    with open(filename, 'wb') as f:
        f.write(imgdata)

    load_dotenv()  # take environment variables from .env.
    import os
    region = os.environ['ACCOUNT_REGION']
    key = os.environ['VISION_KEY']

    credentials = CognitiveServicesCredentials(key)
    client = ComputerVisionClient(
        endpoint="https://" + region + ".api.cognitive.microsoft.com/",
        credentials=credentials
    )

    endpoint = "https://" + region + ".api.cognitive.microsoft.com/"
    analyze_url = endpoint + "vision/v3.1/analyze"

    # Read the image into a byte array
    image_data = open(filepath, "rb").read()
    headers = {'Ocp-Apim-Subscription-Key': key,
            'Content-Type': 'application/octet-stream'}
    params = {'visualFeatures': 'brands'}
    response = requests.post(
        analyze_url, headers=headers, params=params, data=image_data)
    response.raise_for_status()

    # The 'analysis' object contains various fields that describe the image. The most
    # relevant caption for the image is obtained from the 'description' property.
    analysis = response.json()
    try:
        print("Running search on ",analysis["brands"][0]["name"])
        headlines = bing_search(analysis["brands"][0]["name"])
        extract_sentiment(headlines)

    except e:
        print(e)
