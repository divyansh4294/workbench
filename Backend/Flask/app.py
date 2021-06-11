from os import SEEK_CUR
import re
from flask import Flask
from flask import jsonify, make_response
from flask import request
from flask.globals import session
from flask.json import dumps
from flask_pymongo import PyMongo
from flask_cors import CORS
from baseFolder import folder_api
from FileTree import tree_api
from UploadDataset import uploaddataset_api


from bson import ObjectId
import json
import os

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from model import User


app = Flask(__name__)
app.register_blueprint(folder_api)
app.register_blueprint(tree_api)
app.register_blueprint(uploaddataset_api)

app.config['SERVER_NAME'] = 'localhost:5000'
app.config['MONGO_DBNAME'] = 'user'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/user'
# app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET')
app.config['JWT_SECRET_KEY'] = "nn93pM(*$U#(*$NWMJN($(@(mwjnim1jmn"

jwt = JWTManager(app)
mongo = PyMongo(app)
db  = mongo.db.user
CORS(app)

# THis is for login functionality
@app.route("/Login", methods = ['POST','GET'])
def getpost():
    if request.method == "POST":
        # print("Post request hai")
        validUser = db.find({
            "username":request.json["username"],
            "password":request.json["password"]
            }).count()
        # print("valid:",validUser)
        username = request.json["username"]
        # print("username:",username)
        if validUser > 0:
            access_token = create_access_token(identity=username)
            # print("username:",username)
            # print("access_token:",access_token)
            return {"access_token":access_token, "username":username}
            # return jsonify(access_token=access_token)
            # return {"Message":"Login Success"}
        else:
            return jsonify({"msg":"Bad Username or Password"}), 401
            # return {"Message":"Login Unsuccess"}

    elif request.method == "GET":
        # print("Login Get request hai")
        return {"message":"Login Get"}

# THis is for register functionality
@app.route("/Register", methods = ['GET', 'POST'])
def getpost1():
    if request.method == "GET":
        o=[]
        for i in db.find():
            print(i)
            o.append({
                "_id":str(ObjectId(i["_id"])),
                "username":i["username"],
                "email":i["email"],
                "password":i["password"]
            })
        return jsonify(o)

    elif request.method == "POST":
        username=request.json["username"]
        email = request.json["email"]
        password = request.json["password"]

        usernameExist = db.find_one({'username': username})
        emailExist = db.find_one({'email': email})

        if emailExist and usernameExist:
            return {"Message":"User Already Exist", "Status":False}

        elif usernameExist:
            return {"Message":"Username Already Used", "Status": False}

        elif emailExist:
            return {"Message":"User with this Email already exist", "Status": False}

        else:
            id = db.insert({
                "username": request.json["username"],
                "email": request.json["email"],
                "password": request.json["password"]
            })
            print("Username not exist")
            output = {
                'username': username,
                'email': email,
                'password': password
            }
            return {"Results": output, "Message":"User Successfully Registered!!", "Status":True}

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return jsonify({'result': 'success'})








@app.route("/view1", methods=['GET'])
def index():
    if "username" in session:
        return "You are logged in as"+ session['username']
def getView1():
    users = mongo.db.userlist.find({},{ "_id": 0})

    user = []
    # new_list = list(users)
    s = list(users)
    print("s:",s)
    # for i in users:
    #     print("i:",i)
    #     user.append(i)
    # print(user)
    # print(type(user))
    # u = user.tojson()
    # jsonStr = json.dumps(user)
    return jsonify(s)
    return jsonify(s)

    # return {"messgae":"yo"}
    # return jsonStr
    # return dumps(user)
    # return make_response(dumps(user))

    # return dumps(users)

@app.route("/view", methods=['GET'])
def getView():

    todos = mongo.db.userlist.find()

    return jsonify([todo for todo in todos])
    # userList = mongo.db.userlist
    # print("userList:",userList)
    # users = []
    # user = db.find()
    # print("user:",user)
    # for i in user:
    #     print(i)
    #     i.pop("_id")
    #     users.append(i)
    # return jsonify(users)

@app.route('/addUser/<username>', methods=['POST'])
def addUser(username):
    userList = mongo.db.userlist
    user_new = {'username': username}
    if userList.find({'username': username}).count()>0:
        return "User Already Exists"
    else:
        userList.insert(user_new)
        return ("User Added")

# @app.route('/addGoal/<new_goal>', methods=['POST']) #adding new item to bucketlist
# def add_item(new_goal):
# 	bucketList = mongo.db.userlist

# 	goal_new = {'name' : new_goal}
# 	if bucketList.find({'name' : new_goal}).count() > 0:
# 		return "Goal Already Exists!"
# 	else:
# 		bucketList.insert(goal_new)
# 		return "Added Goal successfully"

# @app.route('/delete/<goal_name>', methods=['GET']) #function to delete one item on bucketlist
# def delete_item(goal_name):
# 	bucketList = mongo.db.bucketList
# 	bucketList.remove({'name': goal_name})
# 	return "Goal deleted successfully!"





@app.route("/Login/<id>", methods=['DELETE','PUT'])
def deleteput(id):
    if request.method == "DELETE":
        db.delete_one({
            "_id":ObjectId(id)
        })
        return jsonify({
            "message":"Deleted"
        })
    elif request.method == "PUT":
        db.update(
            {
                "_id":ObjectId(id),
            },
            {
                "$set":{
                    "username":request.json["username"],
                    "email":request.json["email"],
                    "password":request.json["password"]
                }
        })
        return jsonify({
            "message":"Updated"
        })

@app.route("/user/signup", methods=['GET'])
def signup():
    return User().signup()

    
@app.route('/star', methods=['GET'])
def get_all_stars():
  star = mongo.db.stars
  output = []
  for s in star.find():
    output.append({'name' : s['name'], 'distance' : s['distance']})
  return jsonify({'result' : output})

@app.route('/star/<name>', methods=['GET'])
def get_one_star(name):
  star = mongo.db.stars
  s = star.find_one({'name' : name})
  if s:
    output = {'name' : s['name'], 'distance' : s['distance']}
  else:
    output = "No such name"
  return jsonify({'result' : output})

@app.route('/star', methods=['POST'])
def add_star():
  star = mongo.db.stars
  name = request.json['name']
  distance = request.json['distance']
  star_id = star.insert({'name': name, 'distance': distance})
  new_star = star.find_one({'_id': star_id })
  output = {'name' : new_star['name'], 'distance' : new_star['distance']}
  return jsonify({'result' : output})

if __name__ == '__main__':
    app.run(debug=True, port=5000, threaded=True)
# from flask import Flask, jsonify, request, json
# from flask_pymongo import PyMongo

# # from bson.objectid import ObjectId
# # from datetime import datetime 
# # from flask_bcrypt import Bcrypt 
# # from flask_cors import CORS
# # from flask_jwt_extended import JWTManager 
# # from flask_jwt_extended import create_access_token

# app = Flask(__name__)

# # app.config['MONGO_DBNAME'] = 'users'
# # app.config['MONGO_URI'] = 'mongodb://localhost:27017/users'
# # app.config['JWT_SECRET_KEY'] = 'secret'

# mongo = PyMongo(app)
# # bcrypt = Bcrypt(app)
# # jwt = JWTManager(app)

# # CORS(app)

# @app.route("/home", methods=['GET','POST'])
# def home():
#     return "Home"
# # @app.route('/users/register', methods=["POST"])
# # def register():
# #     users = mongo.db.users
# #     first_name = request.get_json()['first_name']
# #     last_name = request.get_json()['last_name']
# #     email = request.get_json()['email']
# #     password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
# #     created = datetime.utcnow()

# #     user_id = users.insert({
# #         'first_name': first_name,
# #         'last_name': last_name,
# #         'email': email,
# #         'password': password,
# #         'created': created 
# #     })

# #     new_user = users.find_one({'_id': user_id})

# #     result = {'email': new_user['email'] + ' registered'}

# #     return jsonify({'result' : result})

# # @app.route('/users/login', methods=['POST'])
# # def login():
# #     users = mongo.db.users 
# #     email = request.get_json()['email']
# #     password = request.get_json()['password']
# #     result = ""

# #     response = users.find_one({'email': email})

# #     if response:
# #         if bcrypt.check_password_hash(response['password'], password):
# #             access_token = create_access_token(identity = {
# #                 'first_name': response['first_name'],
# #                 'last_name': response['last_name'],
# #                 'email': response['email']
# #             })
# #             result = jsonify({'token':access_token})
# #         else:
# #             result = jsonify({"error":"Invalid username and password"})
# #     else:
# #         result = jsonify({"result":"No results found"})
# #     return result 

# if __name__ == '__main__':
#     app.run(debug=True)
