"use client";

import Navbar from "@/components/Navbar";
import { Grid, Typography } from "@mui/material";
import styles from "@/styles/Boards.module.css";
import { useEffect, useState } from "react";
import { getBoard, getBoardLists } from "@/utils/data";
import AddList from "@/components/AddList";
import CardList from "@/components/CardList";

export default function Page({ params }: { params: { id: number } }) {
  const [board, setBoard] = useState({ board_id: params.id, name: "Board" });
  const [lists, setLists] = useState([]);

  const listsStyle = {
    margin: "20px",
    paddingBottom: "20px"
  };

  useEffect(() => {
    getBoard(params.id).then((board) => {
      setBoard(board);
    });

    getBoardLists(params.id).then((lists) => {
      setLists(lists);
    });
  }, []);

  useEffect(() => {
    console.log(lists)
  }, [lists])

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

      <div style={listsStyle} className={styles["scrollable-container"]}>
        <div className={styles["card-list-width"]}>
          <AddList boardId={params.id} lists={lists} setLists={setLists}/>
        </div>

        {lists.map((list, index) => (
          <div className={styles["card-list-width"]} key={index}>
            <CardList id={list["card_list_id"]} name={list["name"]} lists={lists} setLists={setLists}/>
          </div>
        ))}
      </div>
    </>
  );
}
