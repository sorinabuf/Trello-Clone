"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/pages.module.css";
import { IconButton, Input, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteBoard, updateBoard } from "@/utils/data";
import { useRouter } from "next/navigation";
import { Board } from "./Boards";

interface Props {
  id: number;
  name: string;
  backgroundImage: string;
  boards: Board[];
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
}

export default function BoardCard({
  id,
  name,
  backgroundImage,
  boards,
  setBoards,
}: Props) {
  const nameStyle = { padding: "25px 40px" };

  const backgroundImageStyle = {
    backgroundImage: "url(" + backgroundImage + ")",
  };

  const router = useRouter();

  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(name);

  function handleNameChange(event: any) {
    setEditValue(event.target.value);
  }

  function handleDeleteBoard(id: number) {
    deleteBoard(id).then(() => {
      setBoards(boards.filter((board: any) => board["board_id"] !== id));

      console.log("Deleted board.");
    });
  }

  function handleEditName() {
    setTimeout(() => {
      setIsEdit(!isEdit);
    }, 220);

    setBoards(
      boards.map((board: any) => {
        if (board["board_id"] === id) {
          board["name"] = editValue;
        }
        return board;
      })
    );

    if (editValue !== name && editValue !== "") {
      updateBoard(editValue, id).then(() => {
        console.log("Updated board name.");
      });
    }
  }

  useEffect(() => {
    setEditValue(name);
  }, [name]);

  return (
    <div
      className={styles.card}
      style={backgroundImageStyle}
      onClick={() => {
        if (!isEdit) {
          router.push(`/boards/${id}`);
        }
      }}
    >
      <div className={`${styles["full-width"]} ${styles["delete-icon"]}`}>
        <IconButton
          size="small"
          disableRipple
          onClick={(event) => {
            event.stopPropagation();
            handleDeleteBoard(id);
          }}
        >
          <DeleteIcon sx={{ color: "white" }} />
        </IconButton>
      </div>

      {isEdit && (
        <div style={nameStyle}>
          <Input
            className={styles["board-input-font"]}
            type="text"
            value={editValue}
            onChange={handleNameChange}
            autoFocus
            fullWidth
            onBlur={handleEditName}
          />
        </div>
      )}

      {!isEdit && (
        <Typography
          variant="h6"
          gutterBottom
          className={styles.title}
          style={nameStyle}
          onClick={(event) => {
            event.stopPropagation();
            setIsEdit(!isEdit);
          }}
        >
          {name}
        </Typography>
      )}
    </div>
  );
}
