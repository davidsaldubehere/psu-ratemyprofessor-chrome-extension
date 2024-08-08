from flask import Flask, request, jsonify
import requests
import ratemyprofessor as rmp
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)

school = rmp.get_school_by_name("Penn State")

@app.route('/getprofid', methods=['POST'])
@cross_origin(supports_credentials=True, origin='https://pennstate.collegescheduler.com')
def getprofid():
    data = request.get_json()
    name = data['name']

    profid =  rmp.get_first_professor_by_school_and_name(school, name).id
    response = jsonify({'profid': profid})
    return response

if __name__ == '__main__':
    app.run(debug=True)