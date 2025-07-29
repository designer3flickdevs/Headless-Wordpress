import React, { useEffect, useState } from 'react';

export function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost/headless_wordpress/server/wp-json/wp/v2/posts') // Change to your WP URL
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='App'>
      <h1>WordPress Posts123</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
