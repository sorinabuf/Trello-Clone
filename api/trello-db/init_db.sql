CREATE TABLE "user"
(
    user_id SERIAL,
    email VARCHAR(50) NOT NULL UNIQUE,
    CONSTRAINT PK_USER PRIMARY KEY (user_id)
);

CREATE TABLE board
(
    board_id SERIAL,
    name VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT PK_BOARD PRIMARY KEY (board_id),
    CONSTRAINT FK_BOARD_USER FOREIGN KEY (user_id) REFERENCES "user" (user_id) ON DELETE CASCADE
);

CREATE TABLE card
(
    card_id SERIAL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    CONSTRAINT PK_CARD PRIMARY KEY (card_id)
);

CREATE TABLE card_list
(
    card_list_id SERIAL,
    name VARCHAR(50) NOT NULL,
    CONSTRAINT PK_CARD_LIST PRIMARY KEY (card_list_id)
);

CREATE TABLE board_card_list
(
    board_id INT NOT NULL,
    card_list_id INT NOT NULL,
    CONSTRAINT PK_BOARD_CARD_LIST PRIMARY KEY (board_id, card_list_id),
    CONSTRAINT FK_BOARD FOREIGN KEY (board_id) REFERENCES board (board_id) ON DELETE CASCADE,
    CONSTRAINT FK_CARD_LIST FOREIGN KEY (card_list_id) REFERENCES card_list (card_list_id) ON DELETE CASCADE
);

CREATE TABLE card_list_element
(
    card_id INT NOT NULL,
    card_list_id INT NOT NULL,
    CONSTRAINT PK_CARD_LIST_ELEMENT PRIMARY KEY (card_id, card_list_id),
    CONSTRAINT FK_CARD FOREIGN KEY (card_id) REFERENCES card (card_id) ON DELETE CASCADE,
    CONSTRAINT FK_CARD_LIST FOREIGN KEY (card_list_id) REFERENCES card_list (card_list_id) ON DELETE CASCADE
);