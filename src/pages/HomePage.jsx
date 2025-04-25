import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import myaxios from "../utils/myaxios";
import OwlCarousel from "react-owl-carousel"; // Import Owl Carousel
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SkeletonBanner = () => (
  <div className="item placeholder">
    <div className="skeleton-banner"></div>
    <div className="item-content">
      <div className="main-content">
        <div className="meta-category">
          <span className="skeleton skeleton-text short"></span>
        </div>
        <h4 className="skeleton skeleton-text"></h4>
        <ul className="post-info">
          <li>
            <span className="skeleton skeleton-text tiny"></span>
          </li>
          <li>
            <span className="skeleton skeleton-text tiny"></span>
          </li>
          <li>
            <span className="skeleton skeleton-text tiny"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const SkeletonBlogPost = () => (
  <div className="col-lg-12">
    <div className="blog-post">
      <div className="blog-thumb">
        <div className="skeleton-banner"></div>
      </div>
      <div className="down-content">
        <span className="skeleton skeleton-text short"></span>
        <h4 className="skeleton skeleton-text"></h4>
        <ul className="post-info">
          <li>
            <span className="skeleton skeleton-text tiny"></span>
          </li>
          <li>
            <span className="skeleton skeleton-text tiny"></span>
          </li>
          <li>
            <span className="skeleton skeleton-text tiny"></span>
          </li>
        </ul>
        <div className="post-options">
          <div className="row">
            <div className="col-6">
              <ul className="post-tags">
                <li>
                  <i className="fa fa-tags"></i>
                </li>
                <li>
                  <span className="skeleton skeleton-text short"></span>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <ul className="post-share">
                <li>
                  <span className="skeleton skeleton-text short"></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SkeletonSidebar = () => (
  <div className="sidebar-item">
    <div className="sidebar-heading">
      <h2 className="skeleton skeleton-text short"></h2>
    </div>
    <div className="content">
      <ul>
        {[1, 2, 3].map((i) => (
          <li key={i}>
            <span className="skeleton skeleton-text short"></span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const HomePage = () => {
  const [blogs, setBlogs] = useState([]); // Initialize as an array
  const [categories, setCategories] = useState([]); // For fetching blog categories
  const [tags, setTags] = useState([]); // For fetching blog categories
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch blogs, categories, and tags simultaneously
        const [blogsRes, categoriesRes, tagsRes] = await Promise.all([
          myaxios.get("/all-blogs/?latest=4"),
          myaxios.get("/categories/"),
          myaxios.get("/tags/"),
        ]);

        console.log(
          "Blogs Response:",
          blogsRes.data.map((blog) => ({
            id: blog.id,
            title: blog.title,
            banner: blog.banner,
          }))
        );
        // Set state for all data
        setBlogs(blogsRes.data || []);
        setCategories(categoriesRes.data || []);
        setTags(tagsRes.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        {/* Skeleton Loading */}
        <div className="main-banner header-text">
          <div className="container-fluid">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={10}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop
              breakpoints={{
                0: { slidesPerView: 1 },
                600: { slidesPerView: 2 },
                1000: { slidesPerView: 3 },
              }}
              className="swiper-banner"
            >
              {[1, 2, 3].map((i) => (
                <SwiperSlide key={i}>
                  <SkeletonBanner />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <section className="blog-posts">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="all-blog-posts">
                  <div className="row">
                    {[1, 2, 3].map((i) => (
                      <SkeletonBlogPost key={i} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="sidebar">
                  <SkeletonSidebar />
                  <SkeletonSidebar />
                  <SkeletonSidebar />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <div className="main-banner header-text">
        <div className="container-fluid">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={Math.min(blogs.length || 1, 3)}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={blogs.length > 3}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: Math.min(blogs.length || 1, 2) },
              1000: { slidesPerView: Math.min(blogs.length || 1, 3) },
            }}
            className="swiper-banner"
          >
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <SwiperSlide key={blog.id}>
                  <div className="item">
                    <img src={blog.banner} alt="banner" />
                    <div className="item-content">
                      <div className="main-content">
                        <div className="meta-category">
                          <span>{blog.category_title}</span>
                        </div>
                        <Link to={`/blog-details/${blog.slug}/`}>
                          <h4>{blog.title}</h4>
                        </Link>
                        <ul className="post-info">
                          <li>
                            <Link to={`/blog-details/${blog.slug}/`}>
                              {blog.user}
                            </Link>
                          </li>
                          <li>
                            <Link to={`/blog-details/${blog.slug}/`}>
                              {blog.created_date}
                            </Link>
                          </li>
                          <li>
                            <Link to={`/blog-details/${blog.slug}/`}>
                              {blog.reviews.length} Comments
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="item">
                  <div className="item-content">
                    <p>No blogs available</p>
                  </div>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </div>

      <section className="blog-posts">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="all-blog-posts">
                <div className="row">
                  {blogs.map((blog) => (
                    <div className="col-lg-12" key={blog.id}>
                      <div className="blog-post">
                        <div className="blog-thumb">
                          <img
                            style={{ height: "300px" }}
                            src={blog.banner}
                            alt="Blog banner"
                          />
                        </div>
                        <div className="down-content">
                          <span>{blog.category_title}</span>
                          <Link to={`/blog-details/${blog.slug}/`}>
                            <h4>{blog.title}</h4>
                          </Link>
                          <ul className="post-info">
                            <li>
                              <Link to={`/blog-details/${blog.slug}/`}>
                                {blog.user}
                              </Link>
                            </li>
                            <li>
                              <Link to={`/blog-details/${blog.slug}/`}>
                                {blog.created_date}
                              </Link>
                            </li>
                            <li>
                              <Link to={`/blog-details/${blog.slug}/`}>
                                {blog.reviews.length} Comments
                              </Link>
                            </li>
                          </ul>
                          {/* <p>{blog.description}</p> */}
                          <div className="post-options">
                            <div className="row">
                              <div className="col-6">
                                <ul className="post-tags">
                                  <li>
                                    <i className="fa fa-tags"></i>
                                  </li>
                                  <li>{blog.tag_title.join(", ")}</li>
                                  {/* Convert the tags array to a comma-separated string */}
                                </ul>
                              </div>
                              <div className="col-6">
                                <ul className="post-share">
                                  {/* <li><i className="fa fa-share-alt"></i></li>
                                                        <li><a href="#">Facebook</a>,</li>
                                                        <li><a href="#"> Twitter</a></li> */}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="col-lg-12">
                    <div className="main-button">
                      <Link to="/blogs/">View All Blogs</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* side bar */}
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
                          {blogs.map((blog) => (
                            <li key={blog.id}>
                              <Link to={`/blog-details/${blog.slug}/`}>
                                <h5>{blog.title}</h5>
                                <span>{blog.created_date}</span>
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
                          {categories.map((category) => (
                            <li key={category.id}>
                              <Link
                                to={`/category-blogs/?category=${category.id}`}
                              >
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
                          {tags.map((tag) => (
                            <li key={tag.id}>
                              <Link to={`/tag-blogs/?tags=${tag.slug}`}>
                                {tag.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* side bar end */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
