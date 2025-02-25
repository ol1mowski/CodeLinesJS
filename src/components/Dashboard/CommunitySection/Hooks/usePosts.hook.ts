import { useState, useEffect } from 'react';
import { Post as PostType } from '../types/post.types';

const API_URL = 'http://localhost:3000/posts'; // Adjust the URL as needed

export const usePosts = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('Failed to fetch posts');
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const deletePost = async (id: string) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete post');
            setPosts(posts.filter(post => post._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const updatePost = async (id: string, updatedData: Partial<PostType>) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) throw new Error('Failed to update post');
            const updatedPost = await response.json();
            setPosts(posts.map(post => (post._id === id ? updatedPost : post)));
        } catch (err) {
            setError(err.message);
        }
    };

    return { posts, loading, error, deletePost, updatePost };
}; 