import json
from bson import ObjectId
from bson.json_util import dumps
from flask import Flask, jsonify, request
import pandas as pd
import numpy as np
from pymongo import MongoClient
from sklearn.metrics.pairwise import cosine_similarity


app = Flask(__name__)


client = MongoClient('mongodb://localhost:27017/')
db = client['IdeaVest']
opportunities_collection = db['opportunities']

def get_recommendations_based_on_questions(user, data):
    user_goal = data.get('goal', '').capitalize().strip()
    field_preference = data.get('field', '').capitalize().strip()
    opportunity_goal = data.get('opportunity_goal', '').capitalize().strip()
    project_location = data.get('location', '').capitalize().strip()
    funding_amount = data.get('funding_amount', '')

   
    opportunities = list(opportunities_collection.find({}))
    opportunities_df = pd.DataFrame(opportunities)


    if 'fundingamount' not in opportunities_df.columns:
        raise KeyError("The 'fundingamount' column is missing from the data.")
    opportunities_df['location'] = opportunities_df['address'].str.capitalize()
    opportunities_df['industry'] = opportunities_df['industry'].str.capitalize()
    opportunities_df['goal'] = opportunities_df['goal'].str.capitalize()
    opportunities_df['description'] = opportunities_df['description'].str.capitalize()

    
    features = ['goal', 'industry', 'description', 'location', 'fundingamount']
    weights = {
        'goal': 2,
        'industry': 3,
        'description': 2,
        'location': 1,
        'fundingamount': 3
    }

  
    opportunities_features_encoded = pd.get_dummies(opportunities_df[features])
    opportunities_features_array = opportunities_features_encoded.values

   
    try:
        funding_amount_value = float(funding_amount.split()[1].replace('$', '').replace(',', ''))
    except (ValueError, IndexError):
        funding_amount_value = 0.0  

    user_preferences = pd.DataFrame({
        'goal_' + user_goal.lower(): [1],
        'industry_' + field_preference.lower(): [1],
        'description_' + opportunity_goal.lower(): [1],
        'location_' + project_location.lower(): [1],
        'fundingamount': [funding_amount_value]
    })

    
    merged_data = pd.concat([opportunities_features_encoded, user_preferences], ignore_index=True).fillna(0)
    user_similarity = cosine_similarity(merged_data)[-1][:-1]

    
    top_similar_opportunities_indices = user_similarity.argsort()[::-1][:4]

    
    recommended_opportunities = []
    for idx in top_similar_opportunities_indices:
        opportunity_data = opportunities_df.iloc[idx].to_dict()
        
        opportunity_data['_id'] = str(opportunity_data['_id'])
        recommended_opportunities.append(opportunity_data)

    return recommended_opportunities

@app.route('/recommendations', methods=['POST'])
def recommendations():
    data = request.json
    user = {"_id": "3"}  

    recommendations = get_recommendations_based_on_questions(user, data)
    
    
    response = dumps(recommendations)
    return app.response_class(
        response=response,
        status=200,
        mimetype='application/json'
    )

if __name__ == '__main__':
    app.run(debug=True)
