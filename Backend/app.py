from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv('NASA_API_KEY')
NASA_API_URL = 'https://api.nasa.gov/planetary/apod'

@app.route('/api/apod', methods=['GET'])
def get_apod():
    date = request.args.get('date')
    params = {
        'api_key': API_KEY
    }
    if date:
        params['date'] = date
        
    try:
        response = requests.get(NASA_API_URL, params=params)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
