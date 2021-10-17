import logging

import azure.functions as func
import json

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
        return func.HttpResponse(
            json.dumps(RESPONSE),
            mimetype="application/json",
        )
    else:
        return func.HttpResponse(
             "This HTTP triggered function executed successfully. Pass a photo in base64.",
             status_code=200
        )
