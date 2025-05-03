import axios from 'axios';
import { useState } from 'react';

function PostCreate() {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/posts', { title });
        setTitle('');
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input onChange={(e) => setTitle(e.target.value)} value={title} className="form-control mt-2" type="text" id="title" name="title" required />
        </div>
        <button className="btn btn-primary mt-2">Submit</button>
      </form>
    </div>
  );
}

export default PostCreate;