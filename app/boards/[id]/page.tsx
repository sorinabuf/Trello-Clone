"use client";

import Navbar from "@/components/Navbar";
import { Typography } from "@mui/material";
import CardLists from "@/components/CardLists";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getBoard } from "@/utils/data";
import styles from "@/styles/pages.module.css";
import { useEffect, useState } from "react";

const BoardPage = ({ params }: { params: { id: number } }) => {
  const [board, setBoard] = useState({ board_id: params.id, name: "" });

  useEffect(() => {
    getBoard(params.id).then((board) => {
      setBoard(board);
    });
  }, []);

  return (
    <>
      <Navbar />

      <Typography
        variant="h6"
        gutterBottom
        className={styles.header}
        margin="20px"
      >
        {board.name}
      </Typography>

      <div className={styles["horizontal-scrollable-container"]}>
        <CardLists id={params.id} />
      </div>
    </>
  );
};

export default ProtectedRoute(BoardPage);
