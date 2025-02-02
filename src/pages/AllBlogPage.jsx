import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import myaxios from "../utils/myaxios";

const AllBlogPage = () => {
    const [blogs, setBlogs] = useState([]); // Blogs array
    const [latest, setLatest] = useState([]); // Latest blog array
    const [categories, setCategories] = useState([]); // Blog categories
    const [tags, setTags] = useState([]); // Blog tags
    const [loading, setLoading] = useState(true); // Loading state
    const [nextPage, setNextPage] = useState(null); // Next page URL
    const [previousPage, setPreviousPage] = useState(null); // Previous page URL
  
    const location = useLocation();
    const navigate = useNavigate();
  
    // Extract page number from query params
    const searchParams = new URLSearchParams(location.search);
    const currentPage = searchParams.get("page") || 1;
  
    const fetchBlogs = async (url = `/all-blogs/?page=${currentPage}`) => {
      setLoading(true); // Start loading before the request
  
      try {
          const response = await myaxios.get(url);
          const data = response.data;
  
          if (data) {
              setBlogs(data.results);
              setNextPage(data.next);
              setPreviousPage(data.previous);
          }
      } catch (error) {
          console.error("Error fetching blogs:", error);
      } finally {
          setLoading(false); // Set loading to false after the request is completed
      }
    };
  
    useEffect(() => {
      fetchBlogs(); // Fetch blogs based on current page
    }, [currentPage]); // Only re-fetch when currentPage changes


    useEffect(() => {
      const fetchData = async () => {
          try {
              // Fetch blogs, categories, and tags simultaneously
              const [blogsRes, categoriesRes, tagsRes] = await Promise.all([
                  myaxios.get("/all-blogs/?latest=3"),
                  myaxios.get("/categories/"),
                  myaxios.get("/tags/")
              ]);
  
              // Set state for all data
              setLatest(blogsRes.data || []);
              setCategories(categoriesRes.data || []);
              setTags(tagsRes.data || []);
          } catch (error) {
              console.error("Error fetching data:", error);
          } finally {
              setLoading(false);
          }
      };
  
      fetchData();
    }, []); // Empty dependency array, so this runs once on mount
  
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    // Updated handlePagination function
    const handlePagination = (pageUrl) => {
        if (pageUrl) {
        fetchBlogs(pageUrl); // Fetch blogs for the provided page URL
        const urlParams = new URL(pageUrl);
        const page = urlParams.searchParams.get("page") || 1;
        navigate(`?page=${page}`); // Update the URL in the browser
        }
    };

  return (
    <div>
      <div className="heading-page header-text">
        <section className="page-heading">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-content">
                    <h4>Blogs</h4>
                    <h4>Page-{currentPage}</h4>
                    <h2>List of all blogs</h2>
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
                  {blogs.map((blog) => (
                    <div className="col-lg-6" key={blog.id}>
                      <div className="blog-post">
                        <div className="blog-thumb">
                          <img
                            src={blog.banner}
                            style={{ height: "300px" }}
                            alt="Blog Banner"
                          />
                        </div>
                        <div className="down-content">
                          <span>{blog.category_title}</span>
                          <Link to={`/blog-details/${blog.slug}`}>
                            <h4>{blog.title}</h4>
                          </Link>
                          <ul className="post-info">
                              <li><Link to={`/blog-details/${blog.slug}/`}>{blog.user}</Link></li>
                              <li><Link to={`/blog-details/${blog.slug}/`}>{blog.created_date}</Link></li>
                              <li><Link to={`/blog-details/${blog.slug}/`}>{blog.reviews.length} Comments</Link></li>
                          </ul>
                          <div className="post-options">
                            <div className="row">
                              <div className="col-lg-12">
                                <ul className="post-tags">
                                  <li>
                                    <i className="fa fa-tags"></i>
                                  </li>
                                  <li>{blog.tag_title.join(", ")}</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="col-lg-12">
                        <div className="pagination">
                            <button
                                className="btn btn-primary"
                                onClick={() => handlePagination(previousPage)}
                                disabled={!previousPage} // Disable if there's no previous page
                            >
                                Prev
                            </button>

                            <div>
                                <span>page-{currentPage}</span>
                                {/* <span>&nbsp;&nbsp;&nbsp;</span> Add 3 spaces here */}
                            </div>

                            <button
                                className="btn btn-primary"
                                onClick={() => handlePagination(nextPage)}
                                disabled={!nextPage} // Disable if there's no next page
                            >
                                Next
                            </button>
                        </div>
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Sidebar content */}
            <div className="col-lg-4">
              <div className="sidebar">
                <div className="row">
                                    
                    <div className="col-lg-12">
                        <div className="sidebar-item recent-posts">
                            <div className="sidebar-heading">
                                <h2>Recent Blogs</h2>
                            </div>
                            <div className="content">
                            
                                <ul>
                                {latest.map((blog) => (
                                    <li key={blog.id}><Link to={`/blog-details/${blog.slug}/`}>
                                    <h5>{blog.title}</h5>
                                    <span>{blog.created_date}</span>
                                    </Link></li>
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
                                        <Link to={`/category-blogs/?category=${category.id}`}>
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
                                        <Link to={`/tag-blogs/?tags=${tag.slug}`}>{tag.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    </div>
                </div>
              </div>
            </div>
            {/* end Sidebar content */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllBlogPage;