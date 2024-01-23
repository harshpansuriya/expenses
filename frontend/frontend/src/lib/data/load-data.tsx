// The following function is shared
// with getStaticProps and API routes
// from a `lib/` directory
export async function loadData() {
    // Call an external API endpoint to get posts
    const res = await fetch("http://127.0.0.1:8000/");
    const data = await res.json();

    return data;
}
