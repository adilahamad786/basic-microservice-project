import axios from "axios";
import { useState } from "react";

function CommentCreate({ postId }) {
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:5002/posts/${postId}/comments`, { content: comment });
        setComment('');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="comment">Comment:</label>
                    <input onChange={(e) => setComment(e.target.value)} value={comment} type="text" id="comment" name="comment" className="form-control mt-2" required />
                </div>
                <button className="btn btn-primary mt-2">Submit</button>
            </form>
        </div>
    );
}

export default CommentCreate;