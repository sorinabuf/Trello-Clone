import AddIcon from "@mui/icons-material/Add";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import styles from "@/styles/Boards.module.css";
import { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { addBoardList } from "@/utils/data";

export default function AddList({
  boardId,
  lists,
  setLists,
}: {
  boardId: number;
  lists: any;
  setLists: any;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(false);
  const [listName, setListName] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const dividerMargin = {
    marginBottom: "15px",
  };

  const spanColor = {
    color: "red",
  };

  const addListStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
    borderRadius: "10px",
    padding: "15px 30px 15px 10px",
    backgroundColor: "#282E34",
    color: "#B6C2CF",
  };

  const formStyle = {
    borderRadius: "10px",
    padding: "20px 20px",
    backgroundColor: "#282E34",
    color: "#B6C2CF",
  };

  const buttonsStyle = {
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
        console.log("Added list");
        console.log(formRef.current);

        formRef.current?.reset();
        setLoading(false);
        setError(false);
        setListName("");

        setLists([
          ...lists,
          {
            card_list_id: response["card_list_id"],
            name: name
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
          style={addListStyle}
          className={styles["add-card"]}
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
          style={formStyle}
        >
          <div className={styles["full-width"]} style={dividerMargin}>
            <Typography variant="subtitle2" className={styles.header}>
              List title <span style={spanColor}>*</span>
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

          <div style={buttonsStyle}>
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
