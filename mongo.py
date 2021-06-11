from flask import Flask
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo
from model import User
app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'users'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/users'

mongo = PyMongo(app)

@app.route("/")
def home():
    return "home"

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
    app.run(debug=True)
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