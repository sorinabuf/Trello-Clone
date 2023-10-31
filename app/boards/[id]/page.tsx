"use client";

import Navbar from "@/components/Navbar";
import { Typography } from "@mui/material";
import CardLists from "@/components/CardLists";
import ProtectedRoute from "@/components/ProtectedRoute";
import styles from "@/styles/pages.module.css";
import BoardName from "@/components/BoardName";

const BoardPage = ({ params }: { params: { id: number } }) => {
  return (
    <>
      <Navbar />

      <Typography
        variant="h6"
        gutterBottom
        className={styles.header}
        margin="20px"
      >
        <BoardName id={params.id} />
      </Typography>

      <div className={styles["horizontal-scrollable-container"]}>
        <CardLists id={params.id} />
      </div>
    </>
  );
};

export default ProtectedRoute(BoardPage);
