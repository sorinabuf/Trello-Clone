import { Typography } from "@mui/material";
import { useState } from "react";
import CardDialog from "./CardDialog";
import styles from "@/styles/Boards.module.css";
import { deleteCard, updateCard } from "@/utils/data";
import NotesIcon from "@mui/icons-material/Notes";

interface Props {
  cardId: number;
  cardName: string;
  cardDescription: string;
  style: any;
  cards: any;
  setCards: any;
}

export default function Card({
  cardId,
  cardName,
  cardDescription,
  style,
  cards,
  setCards,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = (
    name: string,
    description: string,
    open: boolean
  ) => {
    setOpen(open);

    if (open) {
      setCards(
        cards.map((card: any) => {
          if (card["card_id"] === cardId) {
            card["name"] = name;
            card["description"] = description;
          }

          return card;
        })
      );

      updateCard(name, description, cardId).then(() => {
        console.log("Updated card");
      });
    }
  };

  const handleDeleteCard = () => {
    setOpen(false);

    deleteCard(cardId).then(() => {
      setCards(cards.filter((card: any) => card["card_id"] !== cardId));
    });
  };

  return (
    <>
      <div
        style={{ ...style, whiteSpace: "pre-wrap" }}
        onClick={handleOpenDialog}
        className={styles["hover-card"]}
      >
        <Typography variant="subtitle1" style={{ overflowWrap: "break-word" }}>
          {cardName}
        </Typography>

        {cardDescription !== "" && (
          <NotesIcon sx={{ color: "#B6C2CF", fontSize: "16px" }} />
        )}
      </div>

      <CardDialog
        cardId={cardId}
        cardName={cardName}
        cardDescription={cardDescription}
        open={open}
        onClose={handleCloseDialog}
        deleteCard={handleDeleteCard}
      />
    </>
  );
}
