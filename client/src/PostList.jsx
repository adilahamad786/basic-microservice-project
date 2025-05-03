import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

function PostList () {
    const [posts, setPosts] = useState({});

    const fetchPosts = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5002/posts');
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }, [setPosts]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const postItems = Object.values(posts).map((post) => {
        return <div key={post.id} className='post' style={{width: '30%', margin: '10px', padding: '10px', border: '1px solid black', borderRadius: '5px'}}>
            <div className='card-body'>
                <h3>{post.title}</h3>
                <CommentList comments={post.comments} />
                <CommentCreate postId={post.id} />
            </div>
        </div>;
    });

    return (
        <div className='postList d-flex flex-row flex-wrap jsut-content-between'>   
            {postItems}
        </div>
    );
}

export default PostList;