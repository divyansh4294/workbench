from flask import Blueprint
from flask.globals import request
import os
import json

tree_api = Blueprint('tree_api', __name__)

def path_to_dict(path):
    d = {'name': os.path.basename(path)}
    if os.path.isdir(path):
        d['type'] = "directory"
        d['children'] = [path_to_dict(os.path.join(path,x)) for x in os.listdir(path)]
    else:
        d['type'] = "file"
    # print (json.dumps(d))
    return d


@tree_api.route("/createtree/<path>/<username>", methods=['POST','GET'])
def folderStructure(path, username):
    # print("Path:",path)
    # print("Username:",username)
    exaxt_path = ("./"+path+"/"+username)
    # print("Exact Path:",exaxt_path)
    d = {'name': os.path.basename(exaxt_path)}
    result = path_to_dict(exaxt_path)
    print(type(result))
    return {"Tree":result}










# @tree_api.route("/createtree/<path>/<username>", methods=['POST','GET'])
# def createTree(path, username):
#     print("Path:",path)
#     print("Username:",username)
#     exaxt_path = ("./"+path+"/"+username)
#     print("Exact Path:",exaxt_path)
#     d = {'name': os.path.basename(exaxt_path)}
#     print("Name:",d)
#     if os.path.isdir(exaxt_path):
#         d['type'] = "directory"
#         print("DType:",d)
#         d['children'] = [createTree(os.path.join(exaxt_path,x), d['name']) for x in os.listdir(exaxt_path)]
#         print("D.children:",d)
#     else:
#         d['type'] = "file"
#         print("D else type:",d)
#     print(json.dumps(d))
#     return d






    # for root, dirs, files in os.walk(exaxt_path):
    #     level = root.replace(path,'').count(os.sep)
    #     indent = ' ' * 4 * (level)
    #     print('F:{}{}/'.format(indent, os.path.basename(root)))
    #     subindent = ' ' * 4 * (level + 1)
    #     for f in files:
    #         print('D:{}{}'.format(subindent, f))

        # print("level",indent)


@tree_api.route("/createtree/<path>/<name>", methods=['POST','GET'])
def createTree(path, name):
    for root, dirs, files in os.walk(path):
        level = root.replace(path, '').count(os.sep)
        indent = ' ' * 4 * (level)
        print('F:{}{}/'.format(indent, os.path.basename(root)))

        # d = {'name': indent, os.path.basename(root)) }
        subindent = ' ' * 4 * (level + 1)
        for f in files:
            print("Files:",f)
            print("Subindent:",subindent)
            print('D:{}{}'.format(subindent, f))

    # print(json.dumps())
    # return {"Output":""}

# path = "./Data"

# @tree_api.route("/createtree/<path>/<name>", methods=['POST','GET'])
# def path_to_dict(path,name):
#     d = {'name': os.path.basename(path+"/"+name)}
#     print("D:",d)
#     if os.path.isdir(path):
#         d['type'] = "directory"
#         print("D.type:",d)
#         d['children'] = [path_to_dict(os.path.join(path,x),name) for x in os.listdir(path)]
#         print("D.children:",d)
#     else:
#         d['type'] = "file"
#         print("D else type:",d)

#     print(json.dumps(d))
#     return d