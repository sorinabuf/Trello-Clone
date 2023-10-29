"use client";

import { useAuth } from "@/contexts/AuthContext";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import styles from "@/styles/Boards.module.css";
import BoardCard from "@/components/BoardCard";
import AddCard from "@/components/AddCard";
import Grid from "@mui/material/Grid";
import { getUserBoards } from "@/utils/data";
import Navbar from "@/components/Navbar";

export default function Boards() {
  const { currentUserId } = useAuth();
  const [boards, setBoards] = useState([]);

  const bgImages = ["bg1.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg", "bg5.jpg"];

  const boardsStyle = {
    margin: "20px",
  };

  useEffect(() => {
    if (currentUserId) {
      getUserBoards(currentUserId).then((boards) => {
        setBoards(boards);
      });
    }
  }, [currentUserId]);

  return (
    <>
      <Navbar />
      <Typography
        variant="h6"
        gutterBottom
        className={styles.header}
        margin="20px"
      >
        My Boards
      </Typography>
      <div style={boardsStyle}>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <AddCard boards={boards} setBoards={setBoards} />
          </Grid>

          {boards.map((board, index) => (
            <Grid item xs={3} key={index}>
              <BoardCard
                name={board["name"]}
                id={board["board_id"]}
                backgroundImage={bgImages[index % bgImages.length]}
                boards={boards}
                setBoards={setBoards}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
