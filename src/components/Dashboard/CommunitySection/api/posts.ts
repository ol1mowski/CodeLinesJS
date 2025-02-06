const token = sessionStorage.getItem("token") || localStorage.getItem("token");

export const addComment = async (postId: string, content: string) => {
  const response = await fetch(`http://localhost:5001/api/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error("Nie udało się dodać komentarza");
  }

  return response.json();
};

export const likePost = async (postId: string) => {
  const response = await fetch(`http://localhost:5001/api/posts/${postId}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    throw new Error("Nie udało się polubić posta");
  }

  return response.json();
};

export const unlikePost = async (postId: string) => {
  const response = await fetch(`http://localhost:5001/api/posts/${postId}/like`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    throw new Error("Nie udało się usunąć polubienia");
  }

  return response.json();
};
