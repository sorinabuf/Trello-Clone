import { useEffect, useState } from "react";
import styles from "@/styles/Boards.module.css";
import { IconButton, Input, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteBoard, updateBoard } from "@/utils/data";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  name: string;
  backgroundImage: string;
  boards: any;
  setBoards: any;
}

export default function BoardCard({
  id,
  name,
  backgroundImage,
  boards,
  setBoards,
}: Props) {
  const deleteIconStyle = {
    display: "flex",
    justifyContent: "end",
  };

  const nameStyle = { padding: "25px 40px" };

  const cardStyle = {
    backgroundImage: "url(" + backgroundImage + ")",
  };

  const router = useRouter();

  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(name);

  const handleNameChange = (event: any) => {
    setEditValue(event.target.value);
  };

  function handleDeleteBoard(id: number) {
    deleteBoard(id).then(() => {
      setBoards(boards.filter((board: any) => board["board_id"] !== id));
    });
  }

  useEffect(() => {
    setEditValue(name);
  }, [name]);


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
        console.log("Updated board name");
      });
    }
  }

  return (
    <div
      className={styles.card}
      style={cardStyle}
      onClick={() => {
        if (!isEdit) {
          router.push(`/boards/${id}`);
        }
      }}
    >
      <div
        className={`${styles["full-width"]} ${styles["delete-icon"]}`}
        style={deleteIconStyle}
      >
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
            className={styles["input-font"]}
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
