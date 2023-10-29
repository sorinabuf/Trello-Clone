export async function addUser(email: string) {
  const response = await fetch("http://localhost:5328/api/users", {
    method: "POST",
    body: JSON.stringify({ email: email }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

export async function getUser(email: string) {
  const response = await fetch("http://localhost:5328/api/users?email=" + email);

  return await response.json();
}

export async function getUserBoards(userId: number) {
  const response = await fetch(
    "http://localhost:5328/boards?user_id=" + userId
  );

  return await response.json();
}

export async function addBoard(name: string, userId: number) {
  const response = await fetch("http://localhost:5328/boards", {
    method: "POST",
    body: JSON.stringify({ name: name, user_id: userId }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

export async function updateBoard(name: string, boardId: number) {
  const response = await fetch("http://localhost:5328/boards/" + boardId, {
    method: "PUT",
    body: JSON.stringify({ name: name }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.text();
}

export async function deleteBoard(boardId: number) {
  const response = await fetch("http://localhost:5328/boards/" + boardId, {
    method: "DELETE",
  });

  return await response.text();
}

export async function getBoard(boardId: number) {
  const response = await fetch("http://localhost:5328/boards/" + boardId);

  return await response.json();
}

export async function addBoardList(name: string, boardId: number) {
  const response = await fetch("http://localhost:5328/card-lists", {
    method: "POST",
    body: JSON.stringify({ name: name, board_id: boardId }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

export async function getBoardLists(boardId: number) {
  const response = await fetch(
    "http://localhost:5328/card-lists?board_id=" + boardId
  );

  return await response.json();
}

export async function deleteBoardList(listId: number) {
  const response = await fetch("http://localhost:5328/card-lists/" + listId, {
    method: "DELETE",
  });

  return await response.text();
}

export async function updateBoardList(name: string, listId: number) {
  const response = await fetch("http://localhost:5328/card-lists/" + listId, {
    method: "PUT",
    body: JSON.stringify({ name: name }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.text();
}

export async function addCard(name: string, cardListId: number) {
  const response = await fetch("http://localhost:5328/cards", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      description: "",
      card_list_id: cardListId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

export async function getCards(cardListId: number) {
  const response = await fetch(
    "http://localhost:5328/cards?card_list_id=" + cardListId
  );

  return await response.json();
}

export async function updateCard(
  name: string,
  description: string,
  cardId: number
) {
  const response = await fetch("http://localhost:5328/cards/" + cardId, {
    method: "PUT",
    body: JSON.stringify({ name: name, description: description }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.text();
}

export async function deleteCard(cardId: number) {
  const response = await fetch("http://localhost:5328/cards/" + cardId, {
    method: "DELETE",
  });

  return await response.text();
}
