import React, { useState, useEffect } from 'react';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 20;

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(`http://localhost/headless_wordpress/server/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}`); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data); // Assuming data is an array of blog posts
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [page]); // Empty dependency array ensures this runs once on mount

  if (loading) {
    return <div>Loading blog posts...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const [display, setDisplay] = useState(true);

  return (
    <div>
      <button onclick={()=>setDisplay(!display)}>Click Me</button>
      {
        display ? <h1>test</h1> : null
      }
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <div key={post.id}> 
          <h2>{post.title.rendered}</h2>
          <p>{post.content.rendered.replace(/<[^>]+>/g, '')}</p>
        </div>
      ))}

      {/* Pagination Controls */}
      {/* <div>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <span style={{ margin: "0 10px" }}>Page {page}</span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={posts.length < perPage}
        >
          Next
        </button>
      </div> */}

    </div>
  );
}

export default Home;