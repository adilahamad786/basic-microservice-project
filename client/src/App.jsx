import PostCreate from "./postCreate";
import PostList from "./PostList";

function App() {
  return (
    <div className="container">
      <h1>Create a Post</h1>
      <PostCreate />
      <hr />
      <PostList />
    </div>
  )
}

export default App
