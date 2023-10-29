from http import HTTPStatus
import db_utils
from flask import Flask, request, Response
from prometheus_flask_exporter import PrometheusMetrics
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

metrics = PrometheusMetrics(app)

################################# USER TABLE ###################################

@app.route("/users", methods=["POST"])
def add_user():
    body = request.get_json()
    email = body["email"]

    new_user = db_utils.add_user(email)

    return json.dumps(new_user), HTTPStatus.CREATED

@app.route("/users", methods=["GET"])
def get_user():
    email = request.args.get("email")
    user = db_utils.get_user(email)

    return json.dumps(user), HTTPStatus.OK

################################# BOARD TABLE ##################################

@app.route("/boards/<int:id>", methods=["GET"])
def get_board(id):
    board = db_utils.get_board(id)

    return json.dumps(board), HTTPStatus.OK

@app.route("/boards", methods=["GET"])
def get_user_boards():
    user_id = request.args.get("user_id")
    boards = db_utils.get_all_user_boards(user_id)

    return json.dumps(boards), HTTPStatus.OK

@app.route("/boards", methods=["POST"])
def add_user_board():
    body = request.get_json()
    user_id = body["user_id"]
    name = body["name"]

    new_board = db_utils.add_user_board(user_id, name)

    return json.dumps(new_board), HTTPStatus.CREATED

@app.route("/boards/<int:id>", methods=["DELETE"])
def delete_board(id):
    db_utils.delete_board(id)

    return Response(status=HTTPStatus.OK)

@app.route("/boards/<int:id>", methods=["PUT"])
def update_board(id):
    body = request.get_json()
    name = body["name"]
    db_utils.update_board(id, name)

    return Response(status=HTTPStatus.OK)

############################### CARD_LIST TABLE ################################

@app.route("/card-lists", methods=["POST"])
def add_card_list():
    body = request.get_json()
    name = body["name"]
    board_id = body["board_id"]

    new_card_list = db_utils.add_board_list(name, board_id)

    return json.dumps(new_card_list), HTTPStatus.CREATED

@app.route("/card-lists", methods=["GET"])
def get_board_card_lists():
    board_id = request.args.get("board_id")
    card_lists = db_utils.get_all_board_lists(board_id)

    return json.dumps(card_lists), HTTPStatus.OK

@app.route("/card-lists/<int:id>", methods=["DELETE"])
def delete_card_list(id):
    db_utils.delete_card_list(id)

    return Response(status=HTTPStatus.OK)

@app.route("/card-lists/<int:id>", methods=["PUT"])
def update_card_list(id):
    body = request.get_json()
    name = body["name"]
    db_utils.update_card_list(id, name)

    return Response(status=HTTPStatus.OK)

################################# CARD TABLE ###################################

@app.route("/cards", methods=["POST"])
def add_card():
    body = request.get_json()
    card_list_id = body["card_list_id"]
    name = body["name"]
    description = body["description"]

    new_card = db_utils.add_card(card_list_id, name, description)

    return json.dumps(new_card), HTTPStatus.CREATED

@app.route("/cards", methods=["GET"])
def get_board_list_cards():
    card_list_id = request.args.get("card_list_id")
    cards = db_utils.get_all_list_cards(card_list_id)

    return json.dumps(cards), HTTPStatus.OK

@app.route("/cards/<int:id>", methods=["DELETE"])
def delete_card(id):
    db_utils.delete_card(id)

    return Response(status=HTTPStatus.OK)

@app.route("/cards/<int:id>", methods=["PUT"])
def update_card(id):
    body = request.get_json()
    name = body["name"]
    description = body["description"]
    db_utils.update_card(id, name, description)

    return Response(status=HTTPStatus.OK)

if __name__ == "__main__":
    app.run(port=5328, debug=True)
