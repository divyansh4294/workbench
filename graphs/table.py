from types import MethodType
import pandas as pd
from flask import Flask, jsonify, request, json 
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

# @app.route('/api/table',methods=['GET','POST','DELETE'])
# def register():
#     if request.method=="GET":
#         df = pd.read_csv('iris.csv')
#         df
#         # data1=request.get_data()
#         # print("data1",type(data1),data1)
#         # a=data1.decode('utf-8')
#         # print('a',type(a),a)
#         # col=eval('[' + a + ']')
#         # print("col",col)
#         # df.drop(col[0], axis='columns', inplace=True)

#         df1=df.head(10)
#         df2=df.tail(10)

#         # result=df.to_dict('records')
#         resultlist=df.values.tolist()

#         # head= df1.to_dict('records')
#         # tail=df2.to_dict('records')
#         head= df1.values.tolist()
#         tail=df2.values.tolist()
#         column = list(df.columns)
        

#         data_dict1=[]
#         for i in column:
#             data_dict1.append({"name":i})
#         # column_dict =df1.columns.to_dict()
#         # print(column_dict)
#         return jsonify({'result' : resultlist, 'columns': data_dict1, 'head':head,'tail':tail}) #mui table
#     elif request.method=="POST":
#         df = pd.read_csv('iris.csv')
#         data1=request.get_data()
#         print("data1",type(data1),data1)
#         a=data1.decode('utf-8')
#         print('a',type(a),a)
#         col=eval('[' + a + ']')
#         print("col",col)
#         df.drop(col[0], axis='columns', inplace=True)

#         df1=df.head(10)
#         df2=df.tail(10)

#         result=df.values.tolist()
#         head= df1.values.tolist()
#         tail=df2.values.tolist()
#         column = list(df.columns)

#         data_dict1=[]
#         for i in column:
#             data_dict1.append({"name":i})
#         # column_dict =df1.columns.to_dict()
#         # print(column_dict)
#         return jsonify({'result' : result, 'columns': data_dict1, 'head':head,'tail':tail})

    # return jsonify({'result' : result})



@app.route('/api/drop',methods=['GET','POST','DELETE'])
def drop():
    data1=request.get_data()
    print("data1",type(data1),data1)

    a=data1.decode('utf-8')
    print('a',type(a),a)
    col=eval('[' + a + ']')
    print("col",col)
    # print(list(a))
    df=pd.read_csv('iris.csv')
    df1=df[col[0]]
    # print("df1",df1)
    df.drop(col[0], axis='columns', inplace=True)
    result=df.to_dict('records')
    print("result")
    column = list(df.columns)
    data_dict1=[]
    for i in column:
        data_dict1.append({"name":i})

    return jsonify({'co':"success",'result' : result, 'columns': data_dict1,})


@app.route('/api/chart',methods=['GET','POST','DELETE'])
def register():
    if request.method=="GET":
        df = pd.read_csv('iris.csv')
        # data=pd.read_csv('Data_Entry_2017.csv')
        # df=df[["Species","Sepal_Length"]]
        df=df[["Sepal_Length","Petal_Width"]]
        # df5=data.head(250)
        # df=df5[['Patient Age','Follow-up #',]]
        df1=df.head(10)
        # df2=df.tail(10)

        # result=df.to_dict('records')
        resultlist=df.values.tolist()

        # head= df1.to_dict('records')
        # tail=df2.to_dict('records')
        head= df1.values.tolist()
        # tail=df2.values.tolist()
        column = list(df.columns)
        data_dict1=[]
        for i in column:
            data_dict1.append({"name":i})
        # column_dict =df1.columns.to_dict()
        # print(column_dict)
        return jsonify({'result' : resultlist, 'columns': data_dict1, 'head':head}) #mui table
    elif request.method=="POST":
        df = pd.read_csv('iris.csv')
        data1=request.get_data()
        print("data1",type(data1),data1)
        a=data1.decode('utf-8')
        print('a',type(a),a)
        col=eval('[' + a + ']')
        print("col",col)
        df.drop(col[0], axis='columns', inplace=True)

        df1=df.head(10)
        df2=df.tail(10)

        result=df.values.tolist()
        head= df1.values.tolist()
        tail=df2.values.tolist()
        column = list(df.columns)

        data_dict1=[]
        for i in column:
            data_dict1.append({"name":i})
        # column_dict =df1.columns.to_dict()
        # print(column_dict)
        return jsonify({'result' : result, 'columns': data_dict1, 'head':head,'tail':tail})

@app.route('/api/graph',methods=['GET','POST','DELETE'])
def graph():
    if request.method=="GET":
        df = pd.read_csv('iris.csv')
        # data=pd.read_csv('Data_Entry_2017.csv')
        # df=df[["Species","Sepal_Length"]]
        # df=df[["Sepal_Length","Petal_Width"]]
        # df5=data.head(250)
        # df=df5[['Patient Age','Follow-up #',]]
        df1=df.head(10)
        # df2=df.tail(10)

        # result=df.to_dict('records')
        resultlist=df.values.tolist()

        # head= df1.to_dict('records')
        # tail=df2.to_dict('records')
        head= df1.values.tolist()
        # tail=df2.values.tolist()
        column = list(df.columns)
        data_dict1=[]
        for i in column:
            data_dict1.append({"name":i})
        # column_dict =df1.columns.to_dict()
        # print(column_dict)
        return jsonify({'result' : resultlist, 'columns': data_dict1, 'head':head}) #mui table
    elif request.method=="POST":
        df = pd.read_csv('iris.csv')
        data1=request.get_data()
        print("data1",type(data1),data1)
        a=data1.decode('utf-8')
        print('a',type(a),a)
        col=eval('[' + a + ']')
        print("col",col)
        # df.drop(col[0], axis='columns', inplace=True)
        # df=df[col[0]]
        df=df.groupby(col[0]).size().reset_index(name="Frequency")

        # df1=df.head(10)
        # df2=df.tail(10)
        print("df",df)

        result=df.values.tolist()
        # # head= df1.values.tolist()
        # # tail=df2.values.tolist()
        column = list(df.columns)

        data_dict1=[]
        for i in column:
            data_dict1.append({"name":i})
        # column_dict =df.columns.to_dict()
        # print(column_dict)
        return jsonify({'result' : result, 'columns': data_dict1})


@app.route('/api/plot',methods=['GET','POST','DELETE'])
def plot():
    if request.method=="GET":
        df = pd.read_csv('iris.csv') 
        # d1=df.head(10)
        # df=df.groupby(['Sepal_Length']).size().reset_index(name="Frequency")
        df=df[['Sepal_Length']]
        chart=[]
        chart.append(list(df))
        # li=[d1[name].tolist() for name in d1.columns]
        li=df.values.tolist()
        for i in range(len(li)):
            chart.append(li[i])
        # resultlist=df.values.tolist()
        # column = list(df.columns)
        # data_dict1=[]
        # for i in column:
        #     data_dict1.append({"name":i})
       
        return jsonify({'result' : chart}) #mui table
    elif request.method=="POST":
        df = pd.read_csv('iris.csv')
        data1=request.get_data()
        print("data1",type(data1),data1)
        a=data1.decode('utf-8')
        print('a',type(a),a)
        col=eval('[' + a + ']')
        print("col",col)
        # df.drop(col[0], axis='columns', inplace=True)
        # df=df[col[0]]
        df=df.groupby(col[0]).size().reset_index(name="Frequency")

        # df1=df.head(10)
        # df2=df.tail(10)
        print("df",df)

        result=df.values.tolist()
        # # head= df1.values.tolist()
        # # tail=df2.values.tolist()
        column = list(df.columns)

        data_dict1=[]
        for i in column:
            data_dict1.append({"name":i})
        # column_dict =df.columns.to_dict()
        # print(column_dict)
        return jsonify({'result' : result, 'columns': data_dict1})

@app.route('/api/cross',methods=['GET','POST','DELETE'])
def cross():
    if request.method=="GET":
        data = pd.read_csv('vegsampledata.csv') 
        # d1=df.head(10)
        # df=df.groupby(['Sepal_Length']).size().reset_index(name="Frequency")
        d1=data[['Veg','Nonveg']].values.tolist()
        d1[:3]
        d3=data['State'].values.tolist()
        d3[:3]
        cate=[]
        cate.append(list(data.columns[1:3]))
        return jsonify({'result' : d1,"columns":d3,"cat":cate}) #mui table
    elif request.method=="POST":
        df = pd.read_csv('iris.csv')
        data1=request.get_data()
        print("data1",type(data1),data1)
        a=data1.decode('utf-8')
        print('a',type(a),a)
        col=eval('[' + a + ']')
        print("col",col)
        # df.drop(col[0], axis='columns', inplace=True)
        # df=df[col[0]]
        df=df.groupby(col[0]).size().reset_index(name="Frequency")

        # df1=df.head(10)
        # df2=df.tail(10)
        print("df",df)

        result=df.values.tolist()
        # # head= df1.values.tolist()
        # # tail=df2.values.tolist()
        column = list(df.columns)

        data_dict1=[]
        for i in column:
            data_dict1.append({"name":i})
        # column_dict =df.columns.to_dict()
        # print(column_dict)
        return jsonify({'result' : result, 'columns': data_dict1})

app.run()