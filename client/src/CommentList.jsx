function CommentList({comments}) {
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