from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import joblib
import json
import uvicorn

app = FastAPI()

origins = ['http://localhost:5173']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.post('/price_estimate')
def make_prediction(request: dict):
    # Import artifacts
    with open('./artifacts/gbr.pkl', 'rb') as file:
        model = joblib.load(file)
    columns = get_all_columns()

    # Transform request into numpy array
    input = []
    for column in columns:
        input.append(request[column])
    input = np.array([input])

    # Make prediction
    estimated_price = round(model.predict(input)[0], 2)

    return estimated_price

def get_all_columns():
    with open('./artifacts/columns.json', 'r') as file:
        columns = json.load(file)
    return columns

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)