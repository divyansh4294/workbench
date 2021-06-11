from flask import Blueprint, Flask, json
from flask.globals import request
from flask import request
from flask import current_app, flash, jsonify, make_response, redirect, request, url_for
import pandas as pd
from io import StringIO


uploaddataset_api = Blueprint('uploaddataset_api', __name__)
# converting dataframe into json
def df_to_json(df):
    dfjson = df.to_dict('records')
    collist = list(df.columns)
    dfdict = []
    for i in collist:
        dfdict.append({"name":i})
    return dfjson, dfdict

# converting datatypes into json
def df_datatype(df):
    dtype = df.dtypes.to_dict()
    arr = []
    for k, v in dtype.items():
        arr.append({"dtype":str(v)})
    return arr

# Calculating null Percentage and converting into json
def df_null(df):
    arr = []
    for i in df.isnull().sum():
        arr.append({"null": (i/df.shape[0])*100})
    return arr

@uploaddataset_api.route("/upload", methods=['POST','GET'])
def uploadData():
    print(".....................")
    if request.method == 'POST':
        print("Running...")
        file=request.files['file']
        # print("File:",file)
        a=file.read()
        # print("A:",a)
        s=str(a,'utf-8')
        # print("S:",s)
        data = StringIO(s)
        # print("Data:",data)
        df=pd.read_csv(data, encoding='utf-8')
        # print("DF:",df)
        dfJson, dfDict = df_to_json(df)
        dtype = df_datatype(df)
        dfNull = df_null(df)
        return jsonify({
            "Rows": dfJson,
            "Columns": dfDict,
            "Nulls": dfNull,
            "Dtypes": dtype,
        })
    elif request.method == 'GET':
        print("yo")
        return {"Message":"File aa gyi"}

