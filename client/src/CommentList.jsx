import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function CommentList({postId}) {
    const [comments, setComments] = useState([]);

    const fetchComments = useCallback(async () => {
        try {
            const response = await axios(`http://localhost:5001/posts/${postId}/comments`);
            setComments(response.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    }, [setComments, postId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    return (
        <div className="comment-list">
            <h6>Comments</h6>
            <ul>
                {
                    comments.map((comment) => (
                        <li key={comment.id}>
                            {comment.content}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default CommentList;