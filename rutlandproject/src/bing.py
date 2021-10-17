import os
from dotenv import load_dotenv
import requests

def bing_search(search_term):

    load_dotenv()  # take environment variables from .env.
    key = os.environ['BING_KEY']
    
    search_url = "https://api.bing.microsoft.com/v7.0/news/search"
    headers = {"Ocp-Apim-Subscription-Key": key}
    params = {"q": search_term, "textDecorations": False, "textFormat": "HTML"}
    response = requests.get(search_url, headers=headers, params=params)
    response.raise_for_status()
    search_results = response.json()

    # The 'analysis' object contains various fields that describe the image. The most
    # relevant caption for the image is obtained from the 'description' property.
    analysis = response.json()
    headlines = []

    for result in analysis["value"]:
        headlines.append(result["name"])
    
    print(headlines)
    return headlines
    