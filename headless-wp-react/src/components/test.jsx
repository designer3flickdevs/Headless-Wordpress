import React, { useState, useEffect } from 'react';

// function Test() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [display, setDisplay] = useState(true);
//   const perPage = 3;

//   useEffect(() => {
//     const fetchBlogPosts = async () => {
//       try {
//         const response = await fetch(`http://localhost/headless_wordpress/server/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}`); // Replace with your actual API endpoint
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setPosts(data); // Assuming data is an array of blog posts
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogPosts();
//   }, [page]); // Empty dependency array ensures this runs once on mount

//   if (loading) {
//     return <div>Loading blog posts...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div>
//       <button onClick={()=>setDisplay(!display)}>Click Me</button>
//       {
//         display ? <h1>test</h1> : null
//       }
//       <h1>Blog Posts</h1>
//       {posts.map(post => (
//         <div key={post.id}> 
//           <h2>{post.title.rendered}</h2>
//           <p>{post.content.rendered.replace(/<[^>]+>/g, '')}</p>
//         </div>
//       ))}

//       {/* Pagination Controls */}
//       <div>
//         <button
//           onClick={() => setPage((p) => Math.max(p - 1, 1))}
//           disabled={page === 1}
//         >
//           Previous
//         </button>

//         <span style={{ margin: "0 10px" }}>Page {page}</span>

//         <button
//           onClick={() => setPage((p) => p + 1)}
//           disabled={posts.length < perPage}
//         >
//           Next
//         </button>
//       </div>

//     </div>
//   );
// }

// export default Test;







export default function Test() {
  const WP = process.env.REACT_APP_WP_API_URL || "https://your-wordpress-site.com";
  const PAGE_SLUG = process.env.REACT_APP_WP_PAGE_SLUG || "landing-page"; // page slug in WP

  const [page, setPage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // Contact form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sentMsg, setSentMsg] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        // 1) Fetch page by slug (WP REST: /wp-json/wp/v2/pages?slug=your-slug)
        const pageRes = await fetch(`${WP}/wp-json/wp/v2/pages?slug=${PAGE_SLUG}`);
        const pageJson = await pageRes.json();
        const pageData = Array.isArray(pageJson) && pageJson.length ? pageJson[0] : null;

        // 2) Fetch recent posts (optional)
        const postsRes = await fetch(`${WP}/wp-json/wp/v2/posts?per_page=3&_embed`);
        const postsJson = await postsRes.json();

        setPage(pageData);
        setPosts(postsJson || []);
      } catch (e) {
        console.error(e);
        setErr('Unable to load content.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [WP, PAGE_SLUG]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSentMsg(null);
    if (!name || !email || !message) return setSentMsg({ type: 'error', text: 'બધા ફીલ્ડ ભરો.' });

    setSending(true);
    try {
      // Post to custom WP REST endpoint: /wp-json/custom/v1/contact
      const res = await fetch(`${WP}/wp-json/custom/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const json = await res.json();
      if (res.ok) {
        setSentMsg({ type: 'success', text: json.message || 'Message sent. Thank you!' });
        setName(''); setEmail(''); setMessage('');
      } else {
        setSentMsg({ type: 'error', text: json.message || 'Send failed.' });
      }
    } catch (err) {
      console.error(err);
      setSentMsg({ type: 'error', text: 'Server error. Try later.' });
    } finally {
      setSending(false);
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">Loading…</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero */}
      <header className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold">{page?.title?.rendered ? (
              <span dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
            ) : 'Welcome'}</h1>
            <p className="mt-4 text-gray-600 max-w-xl">{page?.excerpt?.rendered ? (
              <span dangerouslySetInnerHTML={{ __html: page.excerpt.rendered }} />
            ) : 'A fast headless landing page powered by WordPress + React.'}</p>

            <div className="mt-6 flex gap-3">
              <a href="#contact" className="inline-block px-5 py-3 bg-indigo-600 text-white rounded-md">Get in touch</a>
              <a href="#features" className="inline-block px-5 py-3 border rounded-md">Learn more</a>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            {/* If ACF image field or featured media exists, show it */}
            {page?._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
              <img src={page._embedded['wp:featuredmedia'][0].source_url} alt="hero" className="rounded-lg shadow-md" />
            ) : (
              <div className="h-48 bg-indigo-100 rounded-lg flex items-center justify-center">Image</div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Content from WP (page content). Be careful with HTML from WP - sanitize if needed */}
        {page?.content?.rendered && (
          <section className="prose max-w-none mb-12" dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
        )}

        {/* Features (example) */}
        <section id="features" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded shadow">Fast loading<br/><span className="text-sm text-gray-500">SSG/ISR friendly</span></div>
            <div className="p-6 bg-white rounded shadow">SEO Friendly<br/><span className="text-sm text-gray-500">Meta from WP</span></div>
            <div className="p-6 bg-white rounded shadow">Easy Content Editing<br/><span className="text-sm text-gray-500">Editors use WP</span></div>
          </div>
        </section>

        {/* Recent posts */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Recent from our blog</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((p) => (
              <article key={p.id} className="p-4 bg-white rounded shadow">
                <h4 className="font-semibold" dangerouslySetInnerHTML={{ __html: p.title.rendered }} />
                <p className="text-sm text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: p.excerpt.rendered }} />
                <a className="mt-3 inline-block text-indigo-600" href={p.link}>Read →</a>
              </article>
            ))}
          </div>
        </section>

        {/* Contact form */}
        <section id="contact" className="mb-24">
          <h3 className="text-xl font-semibold mb-4">Contact us</h3>
          <form onSubmit={handleSubmit} className="max-w-xl bg-white p-6 rounded shadow">
            <label className="block mb-3">
              <span className="text-sm">Name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border p-2 rounded" />
            </label>
            <label className="block mb-3">
              <span className="text-sm">Email</span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border p-2 rounded" />
            </label>
            <label className="block mb-3">
              <span className="text-sm">Message</span>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 block w-full border p-2 rounded" rows={5} />
            </label>

            <div className="flex items-center gap-3">
              <button type="submit" disabled={sending} className="px-4 py-2 bg-indigo-600 text-white rounded">{sending ? 'Sending...' : 'Send'}</button>
              {sentMsg && (
                <p className={`text-sm ${sentMsg.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{sentMsg.text}</p>
              )}
            </div>
          </form>
        </section>
      </main>

      <footer className="bg-white border-t py-6">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-gray-600">© {new Date().getFullYear()} Your Company</div>
      </footer>
    </div>
  );
}




