from flask import Blueprint
from flask.globals import request
import os

folder_api = Blueprint('folder_api', __name__)

@folder_api.route("/createfolder", methods=['POST','GET'])
def createFolder():
    path = "./Data"
    access_rights = 0o755
    # print("First1",os.getcwd())
    if request.method == "POST":
        foldername = request.args.get('foldername')
        try:
            file_path = path+"/"+foldername
            os.mkdir(file_path, access_rights)
        except OSError:
            return {"Messsage":"Error in creating User Space as its already exist!!!"}
        else:
            return {"Messsage":"User Space Created Successfully!!!"}

    elif request.method == 'GET':
        return "GET createFolder"


@folder_api.route("/createfolder/<username>", methods=['POST','GET'])
def addProjectFolder(username):
    path = "./Data"+"/"+username
    access_rights = 0o755
    # print("First1",path)
    if request.method == "POST":
        foldername = request.args.get('foldername')
        # print(foldername)
        try:
            file_path = path+"/"+foldername
            os.mkdir(file_path, access_rights)
        except OSError:
            return {"Messsage":"Error in creating User Space as its already exist!!!"}
        else:
            return {"Messsage":"User Space Created Successfully!!!"}

    elif request.method == 'GET':
        return "GET createFolder"
