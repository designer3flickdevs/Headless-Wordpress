import React, { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/wp-json/wp/v2/posts") // Change to your WP URL
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>WordPress Posts</h1>
      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: "20px" }}>
          <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
        </div>
      ))}
    </div>
  );
}

export default App;
