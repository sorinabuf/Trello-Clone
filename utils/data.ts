const url = "http://localhost:5328/api";

export async function addUser(email: string) {
  const response = await fetch(`${url}/users`, {
    method: "POST",
    body: JSON.stringify({ email: email }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

export async function getUser(email: string) {
  const response = await fetch(`${url}/users?email=` + email);

  return await response.json();
}

export async function getUserBoards(userId: number) {
  const response = await fetch(`${url}/boards?user_id=` + userId);

  return await response.json();
}

export async function addBoard(name: string, userId: number) {
  const response = await fetch(`${url}/boards`, {
    method: "POST",
    body: JSON.stringify({ name: name, user_id: userId }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

export async function updateBoard(name: string, boardId: number) {
  const response = await fetch(`${url}/boards/` + boardId, {
    method: "PUT",
    body: JSON.stringify({ name: name }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.text();
}

export async function deleteBoard(boardId: number) {
  const response = await fetch(`${url}/boards/` + boardId, {
    method: "DELETE",
  });

  return await response.text();
}

export async function getBoard(boardId: number) {
  const response = await fetch(`${url}/boards/` + boardId);

  return await response.json();
}

export async function addBoardList(name: string, boardId: number) {
  const response = await fetch(`${url}/card-lists`, {
    method: "POST",
    body: JSON.stringify({ name: name, board_id: boardId }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

export async function getBoardLists(boardId: number) {
  const response = await fetch(`${url}/card-lists?board_id=` + boardId);

  return response.json();
}

export async function deleteBoardList(listId: number) {
  const response = await fetch(`${url}/card-lists/` + listId, {
    method: "DELETE",
  });

  return await response.text();
}

export async function updateBoardList(name: string, listId: number) {
  const response = await fetch(`${url}/card-lists/` + listId, {
    method: "PUT",
    body: JSON.stringify({ name: name }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.text();
}

export async function addCard(name: string, cardListId: number) {
  const response = await fetch(`${url}/cards`, {
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
  const response = await fetch(`${url}/cards?card_list_id=` + cardListId);

  return await response.json();
}

export async function updateCard(
  name: string,
  description: string,
  cardId: number
) {
  const response = await fetch(`${url}/cards/` + cardId, {
    method: "PUT",
    body: JSON.stringify({ name: name, description: description }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.text();
}

export async function deleteCard(cardId: number) {
  const response = await fetch(`${url}/cards/` + cardId, {
    method: "DELETE",
  });

  return await response.text();
}
