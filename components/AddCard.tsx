import { useAuth } from "@/contexts/AuthContext";
import styles from "@/styles/Boards.module.css";
import { addBoard } from "@/utils/data";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

export default function AddCard({
  boards,
  setBoards,
}: {
  boards: any;
  setBoards: any;
}) {
  const cardStyle = {
    display: "flex",
    backgroundColor: "#282E34",
    alignItems: "center",
    justifyContent: "center",
  };

  const dividerMargin = {
    marginBottom: "15px",
  };

  const closeIconStyle = {
    display: "flex",
    justifyContent: "end",
  };

  const nameStyle = {
    color: "#B6C2CF",
  };

  const spanColor = {
    color: "red",
  };

  const { currentUserId } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = data.get("name")?.toString();

    if (name && currentUserId) {
      setLoading(true);

      addBoard(name, currentUserId).then((response) => {
        console.log("Added board");
        setIsAdding(false);

        setBoards([
          ...boards,
          {
            board_id: response["board_id"],
            name: name,
            user_id: currentUserId,
          },
        ]);
      });
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setBoardName(event.target.value);
  }

  function handleBlur() {
    if (boardName === "") {
      setError(true);
    } else {
      setError(false);
    }
  }

  function handleClick() {
    setIsAdding(!isAdding);
    setBoardName("");
    setError(false);
    setLoading(false);
  }

  useEffect(() => {
    if (boardName.length > 0) {
      setError(false);
    }
  }, [boardName]);

  return (
    <div className={styles["card-container"]}>
      <div
        className={`${styles.card} ${styles["add-card"]}`}
        style={cardStyle}
        onClick={handleClick}
      >
        <Typography variant="h6" gutterBottom style={nameStyle}>
          Create new board
        </Typography>
      </div>

      {isAdding && (
        <Box component="form" onSubmit={handleSubmit}>
          <div className={styles.popover}>
            <div
              className={styles["full-width"]}
              onClick={handleClick}
              style={closeIconStyle}
            >
              <IconButton size="small" disableRipple>
                <CloseIcon />
              </IconButton>
            </div>

            <Typography
              variant="subtitle1"
              className={styles.header}
              style={dividerMargin}
            >
              Create board
            </Typography>

            <div className={styles["full-width"]} style={dividerMargin}>
              <Typography variant="subtitle2" className={styles.header}>
                Board title <span style={spanColor}>*</span>
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

            <Button
              variant="contained"
              fullWidth
              type="submit"
              disableElevation
              disabled={boardName === "" || loading}
            >
              Create
            </Button>
          </div>
        </Box>
      )}
    </div>
  );
}
