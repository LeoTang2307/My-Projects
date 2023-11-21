from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import pickle
import json
import uvicorn


app = FastAPI()

origins = ['http://localhost:5173']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.post('/price_estimate')
async def predict_home_price(city,bed,bath,house_size,land_size):
    model = pickle.load(open('./model/home_price_model.pickle','rb'))
    all_cols = json.load(open('./model/columns.json'))['data_cols']
    city_cols = json.load(open('./model/city_columns.json'))['data_cols']
    try:
        city_index = np.where(city_cols==city)[0][0]
    except:
        city_index = -1
    input = np.zeros(len(all_cols))
    input[0] = bed
    input[1] = bath
    input[2] = house_size
    input[3] = land_size
    if city_index>=0:
        input[city_index] = 1
    return model.predict([input])[0]

@app.get('/get_columns')
async def fetch_all_cols():
    obj = json.load(open('./model/columns.json'))
    cols = obj['data_cols'][4:]
    return cols

@app.get('/get_cities')
async def fetch_all_cities():
    obj = json.load(open('./model/city_columns.json'))
    cols = obj['data_cols'][4:]
    return cols

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)