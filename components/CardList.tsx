import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Divider, IconButton, Input, Typography } from "@mui/material";
import styles from "@/styles/Boards.module.css";
import {
  addCard,
  deleteBoardList,
  getCards,
  updateBoardList,
} from "@/utils/data";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Card from "./Card";

interface Props {
  id: number;
  name: string;
  lists: any;
  setLists: any;
}

export default function CardList({ id, name, lists, setLists }: Props) {
  const listStyle = {
    borderRadius: "10px",
    padding: "20px 0px 20px 15px",
    backgroundColor: "#101204",
    color: "#B6C2CF",
    marginLeft: "20px",
  };

  const listHeaderStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
    marginLeft: "15px",
    marginRight: "15px",
  };

  const addCardButtonStyle = {
    backgroundColor: "#101204",
    borderRadius: "10px",
    padding: "10px 15px",
    marginRight: "15px",
    marginTop: "15px",
  };

  const addCardStyle = {
    backgroundColor: "#22272B",
    borderRadius: "10px",
    padding: "10px 15px",
    marginRight: "15px",
    marginBottom: "15px",
    marginTop: "15px",
  };

  const buttonsStyle = {
    display: "flex",
    gap: "10px",
  };

  const dividerStyle = {
    backgroundColor: "#363F47",
    marginRight: "20px",
  };

  const [cards, setCards] = useState<
    { card_id: number; name: string; description: string }[]
  >([]);
  const [isListNameEdit, setIsListNameEdit] = useState(false);
  const [listNameEditValue, setListNameEditValue] = useState(name);
  const [isCardAdd, setIsCardAdd] = useState(false);
  const [cardNameValue, setCardNameValue] = useState("");

  function handleDeleteList(id: number) {
    deleteBoardList(id).then(() => {
      setLists(lists.filter((list: any) => list["card_list_id"] !== id));
    });
  }

  const handleListNameChange = (event: any) => {
    setListNameEditValue(event.target.value);
  };

  function handleEditListName() {
    setTimeout(() => {
      setIsListNameEdit(!isListNameEdit);
      setLists(
        lists.map((list: any) => {
          if (list["card_list_id"] === id) {
            list["name"] = listNameEditValue;
          }
          return list;
        })
      );

      if (listNameEditValue !== name && listNameEditValue !== "") {
        updateBoardList(listNameEditValue, id).then(() => {
          console.log("Updated list name");
        });
      }
    }, 100);
  }

  function handleCloseAdd() {
    setIsCardAdd(!isCardAdd);
    setCardNameValue("");
  }

  const handleAddCard = () => {
    if (cardNameValue === "") {
      handleCloseAdd();
    } else {
      addCard(cardNameValue, id).then((response) => {
        console.log("Added card");

        setCards([
          ...cards,
          {
            card_id: response["card_id"],
            name: cardNameValue,
            description: "",
          },
        ]);

        handleCloseAdd();
      });
    }
  };

  const handleCardNameChange = (event: any) => {
    setCardNameValue(event.target.value);
  };

  useEffect(() => {
    setListNameEditValue(name);
  }, [name]);

  useEffect(() => {
    getCards(id).then((cards) => {
      setCards(cards);
      console.log(cards);
    });
  }, []);

  return (
    <div style={listStyle}>
      <div style={listHeaderStyle}>
        {isListNameEdit && (
          <div>
            <Input
              className={styles["list-input-font"]}
              type="text"
              value={listNameEditValue}
              onChange={handleListNameChange}
              autoFocus
              fullWidth
              onBlur={handleEditListName}
            />
          </div>
        )}

        {!isListNameEdit && (
          <Typography
            variant="subtitle1"
            style={{ fontWeight: "bold" }}
            onClick={() => setIsListNameEdit(!isListNameEdit)}
          >
            {name}
          </Typography>
        )}

        <IconButton disableRipple onClick={() => handleDeleteList(id)}>
          <DeleteIcon sx={{ color: "#B6C2CF" }} />
        </IconButton>
      </div>

      <div className={styles["scrollable-container-vertical"]}>
        {cards.map((card, index) => (
          <Card
            cardId={card["card_id"]}
            cardName={card["name"]}
            cardDescription={card["description"]}
            key={index}
            style={addCardStyle}
            cards={cards}
            setCards={setCards}
          />
        ))}
      </div>

      {cards.length > 0 && <Divider style={dividerStyle} />}

      {isCardAdd && (
        <div style={addCardStyle}>
          <Input
            disableUnderline
            className={styles["card-input-font"]}
            type="text"
            value={cardNameValue}
            onChange={handleCardNameChange}
            placeholder="Enter a title for this card..."
            autoFocus
            fullWidth
            multiline
            rows={3}
          />
        </div>
      )}

      {!isCardAdd && (
        <div style={addCardButtonStyle} className={styles["add-card"]}>
          <Typography
            variant="subtitle1"
            style={{ fontWeight: "bold" }}
            onClick={() => setIsCardAdd(!isCardAdd)}
          >
            + Add a card
          </Typography>
        </div>
      )}

      {isCardAdd && (
        <div style={buttonsStyle}>
          <Button variant="contained" disableElevation onClick={handleAddCard}>
            Add card
          </Button>

          <div>
            <IconButton
              size="small"
              disableRipple
              sx={{ color: "#B6C2CF" }}
              onClick={handleCloseAdd}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
}
