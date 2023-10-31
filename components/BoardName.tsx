import { getBoard } from "@/utils/data";
import { useEffect, useState } from "react";

interface Props {
  id: number;
}

export default function BoardName({ id }: Props) {
  const [board, setBoard] = useState({ board_id: id, name: "" });

  useEffect(() => {
    getBoard(id).then((board) => {
      setBoard(board);
    });
  }, []);

  return <>{board.name}</>;
}
