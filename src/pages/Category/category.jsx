import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";

const Categories = () => {
    const { slug } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page")) || 1;

    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const postsPerPage = 9;

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/categories`);
                setCategories(response.data.data || []);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setCategories([]);
            }
        };
        fetchCategories();
    }, []);

    // Fetch posts based on slug and page
    useEffect(() => {
        if (!slug) return;
        setLoading(true);
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/posts?category=${slug}&page=${page}`);
                setPosts(response.data.data || []);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
            setLoading(false);
        };
        fetchPosts();
    }, [slug, page]);

    const paginatedPosts = posts.slice((page - 1) * postsPerPage, page * postsPerPage);
    const heroPost = paginatedPosts.length > 0 ? paginatedPosts[0] : null;
    const gridPosts = paginatedPosts.slice(1);

    // Helper function to trim content
    const trimContent = (content, maxWords = 20) => {
        const words = content.split(" ");
        return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : content;
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Categories</h1>

            {/* Category List */}
            <div className="flex gap-4 mb-6">
                {categories.map(category => (
                    <a 
                        key={category.slug} 
                        href={`/category/${category.slug}`} 
                        className={`px-4 py-2 rounded-lg ${slug === category.slug ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    >
                        {category.name}
                    </a>
                ))}
            </div>

            {/* Posts */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {heroPost && (
                        <div className="hero-post bg-gray-100 p-6 rounded-lg mb-6">
                            <img src={heroPost.cover} alt={heroPost.title} className="w-full h-64 object-cover rounded-md"/>
                            <h2 className="text-2xl font-semibold mt-2">{heroPost.title}</h2>
                            <p className="text-gray-600">{heroPost.author} - {new Date(heroPost.createdAt).toLocaleDateString()}</p>
                            <p className="mt-2">{trimContent(heroPost.content)}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-3 gap-4">
                        {gridPosts.map(post => (
                            <div key={post.id} className="bg-white shadow-md rounded-lg p-4">
                                <img src={post.cover} alt={post.title} className="w-full h-40 object-cover rounded-md"/>
                                <h3 className="text-lg font-semibold mt-2">{post.title}</h3>
                                <p className="text-gray-500">{post.author} - {new Date(post.createdAt).toLocaleDateString()}</p>
                                <p className="mt-2">{trimContent(post.content)}</p>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="pagination mt-6 flex justify-center gap-2">
                        <button 
                            onClick={() => setSearchParams({ page: page - 1 })} 
                            disabled={page === 1}
                            className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button 
                            onClick={() => setSearchParams({ page: page + 1 })} 
                            disabled={posts.length <= page * postsPerPage}
                            className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Categories;