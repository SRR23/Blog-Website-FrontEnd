import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import myaxios from "../utils/myaxios";

const BlogDetailsPage = () => {
    const { slug } = useParams();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [categories, setCategories] = useState([]); // Blog categories
    const [tags, setTags] = useState([]); // Blog tags
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5); // Default rating is 5
    const [reviews, setReviews] = useState([]);
    const [isAddingToFavourite, setIsAddingToFavourite] = useState(false); // State to track adding to favourites

    const [error, setError] = useState(null);

    useEffect(() => {
        myaxios.get(`/blog-details/${slug}/`)
            .then(response => {
                console.log(response.data);
                setBlog(response.data);
                setReviews(response.data.reviews);
                // setIsFavourite(response.data.is_favourited); // Set the favorite state
            })
            .catch(error => {
                console.error("Error fetching blog details:", error);
                setError("Failed to fetch blog details.");
            });
    }, [slug]);

    // const blogId = blog.id;
    // Handle Favourites button
    const handleAddToFavourite = async (blogId) => {
        // const token = localStorage.getItem("token");
        // const navigate = useNavigate();
    
        if (!token) {
            navigate("/login"); // Redirect to login if not authenticated
        } else {

            setIsAddingToFavourite(true); // Set loading state to true
            try {
                await myaxios.post(
                    `/favourites/${blogId}/`, 
                    {}, // Empty object since no body data is required
                    { headers: { Authorization: `Bearer ${token}` } }
                );
    
                alert("Blog added to favorites!");
                setIsAddingToFavourite(false); // Set loading state to false
                navigate("/my-favourites/"); // Redirect to My Favorites page
            } catch (error) {
                console.error("Error adding to favorites:", error);
                alert("Failed to add blog to favorites.");
                setIsAddingToFavourite(false); // Set loading state to false
            }
        }
    };

    // Fetch categories
    useEffect(() => {
        myaxios
          .get("/categories/")
          .then((response) => {
            if (response.data) {
              setCategories(response.data);
            }
          })
          .catch((error) => console.error("Error fetching categories:", error));
      }, []);
    
      // Fetch tags
    useEffect(() => {
        myaxios
          .get("/tags/")
          .then((response) => {
            if (response.data) {
              setTags(response.data);
            }
          })
          .catch((error) => console.error("Error fetching tags:", error));
      }, []);


    const handleSubmitReview = async (e) => {
        e.preventDefault();
        // const token = localStorage.getItem("token");

        if (!token) {
            alert("Please log in to post a review.");
            return;
        }

        try {
            const response = await myaxios.post(
                `/blog-details/${slug}/`, // Assuming there's a separate reviews endpoint
                { comment, rating },  // Sending comment and rating as per your format
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setReviews([...reviews, response.data]); // Append new review
            setComment(""); // Clear comment input
            setRating(5); // Reset rating to default
        } catch (error) {
            console.error("Error posting review:", error);
            alert("Failed to post review.");
        }
    };


    if (error) return <p>{error}</p>;
    if (!blog) return <p>Loading...</p>;

    return (
        <div>
            <div className="heading-page header-text">
                <section className="page-heading">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-content">
                                    <h4>Blog Details</h4>
                                    <h2>{blog.title}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="blog-posts grid-system">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="all-blog-posts">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="blog-post">
                                            <div className="blog-thumb">
                                                <img style={{ height: "300px"}} src={blog.banner} alt={blog.title} />
                                            </div>
                                            <div className="down-content">
                                                <span>{blog.category_title}</span>
                                                <h4>{blog.title}</h4>
                                                <ul className="post-info">
                                                    <li>{blog.user}</li>
                                                    <li>{blog.created_date}</li>
                                                    <li>{reviews.length} Comments</li>
                                                </ul>
                                                <p>{blog.description}</p>
                                                <div class="post-options">
                                                    <div class="row">
                                                        <div class="col-6">
                                                            <ul class="post-tags">
                                                                <li><i class="fa fa-tags"></i></li>
                                                                
                                                                <li>{blog.tag_title.join(", ")}</li>
                                                                
                                                            </ul>
                                                        </div>
                                                        <div class="col-6">
                                                            <ul class="post-share">
                                                                <button
                                                                    className="btn border border-secondary rounded-pill px-3 text-primary"
                                                                    onClick={() => handleAddToFavourite(blog.id)}
                                                                    disabled={isAddingToFavourite || blog.is_favourited} // Disable if adding to favourite or already favorited
                                                                >
                                                                    <i className="fa fa-heart"></i> 
                                                                    {blog.is_favourited ? "Added to Favourite" : "Add to Favourite"}
                                                                </button>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Display Comments */}
                                    <div className="col-lg-12">
                                        <div className="sidebar-item comments">
                                            <div className="sidebar-heading">
                                                <h2>Comments</h2>
                                            </div>
                                            <div className="content">
                                            
                                                <ul class="d-flex flex-column">
                                                {reviews.map((review, index) => (
                                                    <li key={index}>
                                                        <div class="author-thumb">
                                
                                                        </div>
                                                        <div className="right-content">
                                                            <h4>{review.user} <span>{review.created_date}</span></h4>
                                                            <p>{review.comment}</p>
                                                            <p><strong>Rating:</strong> {review.rating} ⭐</p>
                                                        </div>
                                                    </li> 
                                                ))}
                                                </ul>
                                                
                                            </div>
                                        </div>
                                    </div>

                                    {/* Review Submission Form */}
                                    <div className="col-lg-12">
                                        <div className="sidebar-item submit-comment">
                                            <div className="sidebar-heading">
                                                <h2>Your Comment</h2>
                                            </div>
                                            <div className="content">
                                                {token ? (
                                                    <form onSubmit={handleSubmitReview}>
                                                        <div className="row">

                                                            <div className="col-lg-12">
                                                                <fieldset>
                                                                    <label htmlFor="rating">Rating:</label>
                                                                    <select 
                                                                        id="rating"
                                                                        value={rating}
                                                                        onChange={(e) => setRating(e.target.value)}
                                                                        required
                                                                    >
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                        <option value="4">4</option>
                                                                        <option value="5">5</option>
                                                                    </select>
                                                                </fieldset>
                                                            </div>

                                                            <div className="col-lg-12">
                                                                <fieldset>
                                                                    <textarea
                                                                        name="text"
                                                                        rows="6"
                                                                        placeholder="Type your comment"
                                                                        required
                                                                        value={comment}
                                                                        onChange={(e) => setComment(e.target.value)}
                                                                    ></textarea>
                                                                </fieldset>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <fieldset>
                                                                    <button type="submit" className="main-button">Submit</button>
                                                                </fieldset>
                                                            </div>
                                                        </div>
                                                    </form>
                                                ) : (
                                                    <p style={{ color: "red", textAlign: "center" }}>
                                                        Please <Link to="/login/">log in</Link> to post a review.
                                                    </p>
                                                )}
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4">
                            <div className="sidebar">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="sidebar-item recent-posts">
                                            <div className="sidebar-heading">
                                                <h2>Related Blogs</h2>
                                            </div>
                                            <div className="content">
                                                <ul>
                                                    {blog.related_blogs?.map((rel) => (
                                                        <li key={rel.slug}>
                                                            <Link to={`/blog-details/${rel.slug}`}>
                                                                <h5>{rel.title}</h5>
                                                                <span>{rel.created_date}</span>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-12">
                                        <div className="sidebar-item categories">
                                            <div className="sidebar-heading">
                                                <h2>Categories</h2>
                                            </div>
                                            <div className="content">
                                                <ul>
                                                    {categories.map(category => (
                                                        <li key={category.id}>
                                                            <Link to={`/categories/${category.slug}`}>
                                                                - {category.title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="sidebar-item tags">
                                            <div className="sidebar-heading">
                                                <h2>Tag Clouds</h2>
                                            </div>
                                            <div className="content">
                                                <ul>
                                                    {tags.map(tag => (
                                                        <li key={tag.id}>
                                                            <Link to={`/tags/${tag.slug}`}>{tag.title}</Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogDetailsPage;
