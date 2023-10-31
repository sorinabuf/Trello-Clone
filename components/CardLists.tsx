"use client";

import { getBoardLists } from "@/utils/data";
import { useEffect, useState } from "react";
import CardList from "@/components/CardList";

import styles from "@/styles/pages.module.css";
import AddList from "./AddList";

export interface CardList {
  card_list_id: number;
  name: string;
}

interface Props {
  id: number;
}

export default function CardLists({ id }: Props) {
  const [lists, setLists] = useState<CardList[]>([]);

  useEffect(() => {
    getBoardLists(id).then((lists) => {
      setLists(lists);
    });
  }, []);

  return (
    <>
      <div className={styles["card-list-width"]}>
        <AddList boardId={id} lists={lists} setLists={setLists} />
      </div>

      {lists.map((list, index) => (
        <div className={styles["card-list-width"]} key={index}>
          <CardList
            id={list["card_list_id"]}
            name={list["name"]}
            lists={lists}
            setLists={setLists}
          />
        </div>
      ))}
    </>
  );
}
