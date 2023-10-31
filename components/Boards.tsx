"use client";

import Grid from "@mui/material/Grid";
import AddBoardCard from "./AddBoardCard";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserBoards } from "@/utils/data";
import BoardCard from "./BoardCard";

export interface Board {
  board_id: number;
  name: string;
  user_id: number;
}

export default function Boards() {
  const [boards, setBoards] = useState<Board[]>([]);
  const { currentUserId } = useAuth();

  const bgImages = ["bg1.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg", "bg5.jpg"];

  useEffect(() => {
    if (currentUserId) {
      getUserBoards(currentUserId).then((boards) => {
        setBoards(boards);
      });
    }
  }, [currentUserId]);

  return (
    <>
      <Grid item xs={3}>
        <AddBoardCard boards={boards} setBoards={setBoards} />
      </Grid>

      {boards.map((board, index) => (
        <Grid item xs={3} key={index}>
          <BoardCard
            id={board["board_id"]}
            name={board["name"]}
            backgroundImage={bgImages[index % bgImages.length]}
            boards={boards}
            setBoards={setBoards}
          />
        </Grid>
      ))}
    </>
  );
}
