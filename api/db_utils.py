import psycopg2
from dotenv import find_dotenv, load_dotenv
import os

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

connection = psycopg2.connect(
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT"),
    database=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD")
)

################################# USER TABLE ###################################

def add_user(email):
    cursor = connection.cursor()

    cursor.execute(f"INSERT INTO \"user\" (email) VALUES (\'{email}\') RETURNING user_id")
    new_user = {
        "user_id": cursor.fetchone()[0]
    }

    connection.commit()
    cursor.close()

    return new_user

def get_user(email):
    cursor = connection.cursor()

    cursor.execute(f"SELECT * FROM \"user\" WHERE email = \'{email}\'")
    user = {
        "user_id": cursor.fetchone()[0]
    }

    cursor.close()

    return user

################################# BOARD TABLE ##################################

def add_user_board(user_id, name):
    cursor = connection.cursor()

    cursor.execute(f"INSERT INTO board (name, user_id) VALUES (\'{name}\', {user_id}) RETURNING board_id")
    new_board = {
        "board_id": cursor.fetchone()[0]
    }

    connection.commit()
    cursor.close()

    return new_board

def get_user_boards(user_id):
    cursor = connection.cursor()

    cursor.execute(f"SELECT * FROM board WHERE user_id = {user_id} ORDER BY board_id")
    board_rows = cursor.fetchall()

    boards = []
    for row in board_rows:
        boards.append(dict(zip([column[0] for column in cursor.description], row)))

    cursor.close()

    return boards

def get_board(board_id):
    cursor = connection.cursor()

    cursor.execute(f"SELECT * FROM board WHERE board_id = {board_id}")
    board_row = cursor.fetchone()

    board = {
        "board_id": board_row[0],
        "name": board_row[1]
    }

    cursor.close()

    return board

def delete_board(board_id):
    cursor = connection.cursor()

    cursor.execute(f"DELETE FROM board WHERE board_id = {board_id}")

    connection.commit()
    cursor.close()

def update_board(board_id, name):
    cursor = connection.cursor()

    cursor.execute(f"UPDATE board SET name = \'{name}\' WHERE board_id = {board_id}")

    connection.commit()
    cursor.close()

############################### CARD_LIST TABLE ################################

def add_board_card_list(name, board_id):
    cursor = connection.cursor()

    cursor.execute(f"INSERT INTO card_list (name) VALUES (\'{name}\') RETURNING card_list_id")
    new_card_list = {
        "card_list_id": cursor.fetchone()[0]
    }

    cursor.execute(f"INSERT INTO board_card_list (board_id, card_list_id) VALUES ({board_id}, {new_card_list['card_list_id']})")

    connection.commit()
    cursor.close()

    return new_card_list

def get_board_card_lists(board_id):
    cursor = connection.cursor()

    cursor.execute(f"SELECT c.card_list_id, c.name FROM board_card_list b, card_list c WHERE b.card_list_id = c.card_list_id \
                   AND b.board_id = {board_id} ORDER BY c.card_list_id")
    card_list_rows = cursor.fetchall()

    card_lists = []
    for row in card_list_rows:
        card_lists.append(dict(zip([column[0] for column in cursor.description], row)))

    cursor.close()

    return card_lists

def delete_card_list(card_list_id):
    cursor = connection.cursor()

    cursor.execute(f"DELETE FROM card_list WHERE card_list_id = {card_list_id}")

    connection.commit()
    cursor.close()

def update_card_list(card_list_id, name):
    cursor = connection.cursor()

    cursor.execute(f"UPDATE card_list SET name = \'{name}\' WHERE card_list_id = {card_list_id}")

    connection.commit()
    cursor.close()

################################# CARD TABLE ###################################

def add_card_list_card(card_list_id, name, description):
    cursor = connection.cursor()

    cursor.execute(f"INSERT INTO card (name, description) VALUES (\'{name}\', \'{description}\') RETURNING card_id")
    new_card = {
        "card_id": cursor.fetchone()[0]
    }

    cursor.execute(f"INSERT INTO card_list_element (card_id, card_list_id) VALUES ({new_card['card_id']}, {card_list_id})")

    connection.commit()
    cursor.close()

    return new_card

def get_card_list_cards(card_list_id):
    cursor = connection.cursor()

    cursor.execute(f"SELECT c.card_id, c.name, c.description FROM card c, card_list_element cl WHERE c.card_id = cl.card_id \
                   AND cl.card_list_id = {card_list_id} ORDER BY c.card_id")
    card_rows = cursor.fetchall()

    cards = []
    for row in card_rows:
        cards.append(dict(zip([column[0] for column in cursor.description], row)))

    cursor.close()

    return cards

def delete_card(card_id):
    cursor = connection.cursor()

    cursor.execute(f"DELETE FROM card WHERE card_id = {card_id}")

    connection.commit()
    cursor.close()

def update_card(card_id, name, description):
    cursor = connection.cursor()

    cursor.execute(f"UPDATE card SET name = \'{name}\', description = \'{description}\' WHERE card_id = {card_id}")

    connection.commit()
    cursor.close()
