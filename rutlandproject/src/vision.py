from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import VisualFeatureTypes
from msrest.authentication import CognitiveServicesCredentials
from dotenv import load_dotenv
import requests

load_dotenv()  # take environment variables from .env.
import os
region = os.environ['ACCOUNT_REGION']
key = os.environ['ACCOUNT_KEY']

credentials = CognitiveServicesCredentials(key)
client = ComputerVisionClient(
    endpoint="https://" + region + ".api.cognitive.microsoft.com/",
    credentials=credentials
)

image_path = "../bin/microsoft_hoodie.jpg"
endpoint = "https://" + region + ".api.cognitive.microsoft.com/"
analyze_url = endpoint + "vision/v3.1/analyze"

# Read the image into a byte array
image_data = open(image_path, "rb").read()
headers = {'Ocp-Apim-Subscription-Key': key,
           'Content-Type': 'application/octet-stream'}
params = {'visualFeatures': 'brands'}
response = requests.post(
    analyze_url, headers=headers, params=params, data=image_data)
response.raise_for_status()

# The 'analysis' object contains various fields that describe the image. The most
# relevant caption for the image is obtained from the 'description' property.
analysis = response.json()
print(analysis)