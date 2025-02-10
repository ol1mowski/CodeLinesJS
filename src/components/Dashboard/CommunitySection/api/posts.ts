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

type LikeResponse = {
  isLiked: boolean;
  likesCount: number;
};


export const toggleLike = async (postId: string, isLiked: boolean): Promise<LikeResponse> => {
  console.log('API call - setting like to:', isLiked);
  
  const response = await fetch(`http://localhost:5001/api/posts/${postId}/like`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ isLiked })
  });

  console.log('API response status:', response.status);

  if (!response.ok) {
    throw new Error("Nie udało się zaktualizować polubienia");
  }

  const data = await response.json();
  console.log('API response data:', data);
  
  return {
    isLiked: Boolean(data.isLiked),
    likesCount: Number(data.likesCount)
  };
};
