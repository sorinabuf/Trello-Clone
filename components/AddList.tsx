"use client";

import AddIcon from "@mui/icons-material/Add";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { addBoardList } from "@/utils/data";
import { CardList } from "./CardLists";
import styles from "@/styles/pages.module.css";

interface Props {
  boardId: number;
  lists: CardList[];
  setLists: React.Dispatch<React.SetStateAction<CardList[]>>;
}

export default function AddList({ boardId, lists, setLists }: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(false);
  const [listName, setListName] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const dividerMargin = {
    marginBottom: "15px",
  };

  const addListFormStyle = {
    borderRadius: "10px",
    padding: "20px 20px",
    backgroundColor: "#282E34",
    color: "#B6C2CF",
  };

  const addListFormButtonsStyle = {
    display: "flex",
    justifyContent: "space-between",
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = data.get("name")?.toString();

    if (name) {
      setLoading(true);

      addBoardList(name, boardId).then((response) => {
        console.log("Added list.");

        formRef.current?.reset();
        setLoading(false);
        setError(false);
        setListName("");

        setLists([
          ...lists,
          {
            card_list_id: response["card_list_id"],
            name: name,
          },
        ]);
      });
    }
  }

  function handleClick() {
    setIsAdding(!isAdding);
    setListName("");
    setError(false);
    setLoading(false);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setListName(event.target.value);
  }

  function handleBlur() {
    if (listName === "") {
      setError(true);
    } else {
      setError(false);
    }
  }

  useEffect(() => {
    if (listName.length > 0) {
      setError(false);
    }
  }, [listName]);

  return (
    <>
      {!isAdding && (
        <div
          className={`${styles["add-card"]} ${styles["add-list"]}`}
          onClick={handleClick}
        >
          <AddIcon />
          <Typography variant="h6">Add another list</Typography>
        </div>
      )}

      {isAdding && (
        <Box
          component="form"
          ref={formRef}
          onSubmit={handleSubmit}
          style={addListFormStyle}
        >
          <div className={styles["full-width"]} style={dividerMargin}>
            <Typography variant="subtitle2" className={styles.header}>
              List title <span className={styles["red-span"]}>*</span>
            </Typography>
            <TextField
              id="name"
              name="name"
              required
              fullWidth
              size="small"
              autoFocus
              error={error}
              onChange={handleInputChange}
              onBlur={handleBlur}
              sx={{ input: { color: "#B6C2CF" } }}
            />
          </div>

          <div style={addListFormButtonsStyle}>
            <Button
              variant="contained"
              type="submit"
              disableElevation
              disabled={listName === "" || loading}
            >
              Add list
            </Button>

            <div onClick={handleClick}>
              <IconButton size="small" disableRipple>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </Box>
      )}
    </>
  );
}
