import logging

import azure.functions as func
import base64
import json
import requests
import os

def brand_analysis(b64image):
    """
    Takes a user provided image, extracts the brand, and performs
    a sentiment analysis based on bing news headlines
    """
    image_data = base64.b64decode(b64image)
    # load_dotenv()  # take environment variables from .env.

    region = os.environ['ACCOUNT_REGION']
    key = os.environ['VISION_KEY']

    endpoint = f"https://{region}.api.cognitive.microsoft.com/"

    analyze_url = f"{endpoint}vision/v3.1/analyze"
    
    # Read the image into a byte array
    headers = {'Ocp-Apim-Subscription-Key': key,
            'Content-Type': 'application/octet-stream'}
    params = {'visualFeatures': 'brands'}
    
    response = requests.post(
        analyze_url, headers=headers, params=params, data=image_data
    )
    response.raise_for_status()
    
    # The 'analysis' object contains various fields that describe the image. The most
    # relevant caption for the image is obtained from the 'description' property.
    analysis = response.json()
    try:
        brand_name = analysis["brands"][0]["name"]
    except:
        brand_name = "Brand Not Found"
    
    return brand_name


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    photo = req.params.get('photo')
    if not photo:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            photo = req_body.get('photo')

    RESPONSE = {
        "photo": photo,
        "logo": "B64ENCODEDSTRING",
        "parent_company": "Parent company",
        "brand_name": "Brand name",
        "overall_rating": 4.2,
        "ethical_rating": 4.1,
        "site_ratings":[
            {
                "site_name":"Site name",
                "site_rating": 4.2
            }
        ],
        "sources":[
            {
                "name":"NAMEOFSOURCE",
                "url":"URLOFSOURCE"
            }
        ]
    }

    if photo:
        try:
            brand_name = brand_analysis(photo)
            RESPONSE["brand_name"] = brand_name
            return func.HttpResponse(
                json.dumps(RESPONSE),
                mimetype="application/json",
            )
        except Exception as err:
            RESPONSE["brand_name"] = "Fail"
            return func.HttpResponse(
                json.dumps(RESPONSE),
                mimetype="application/json",
            )
    else:
        return func.HttpResponse(
             "This HTTP triggered function executed successfully. Pass a photo in base64.",
             status_code=200
        )
