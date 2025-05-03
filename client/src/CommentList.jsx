function CommentList({comments}) {
    return (
        <div className="comment-list">
            <h6>Comments</h6>
            <ul>
                {
                    comments.map((comment) => {
                        let content = comment.content;
                        if (comment.status === 'approved') {
                            content = comment.content;
                        } else if (comment.status === 'pending') {
                            content = 'This comment is awaiting moderation.';
                        } else if (comment.status === 'rejected') {
                            content = 'This comment has been rejected.';
                        }
                        
                        return <li key={comment.id}>{content}</li>;
                    })
                }
            </ul>
        </div>
    );
}

export default CommentList;