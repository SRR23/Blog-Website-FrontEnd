import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Guard from "./security/Guard";
import LayOut from "./layouts/LayOut";
import ProfilePage from "./pages/ProfilePage";
import MyBlogsPage from "./pages/MyBlogsPage";
import UpdateBlogPage from "./pages/UpdateBlogPage";
import AddBlogPage from "./pages/AddBlogPage";
import AllBlogPage from "./pages/AllBlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import MyFavouritePage from "./pages/MyFavouritePage";
import CategoryBlogFilterPage from "./pages/CategoryBlogFilterPage";
import TagBlogFilterPage from "./pages/TagBlogFilterPage";
import SearchBlogsPage from "./pages/SearchBlogsPage";
import NotFound404 from "./errorPages/NotFound404";
import Unauthorized401 from "./errorPages/Unauthorized401";

function App() {
  
  return (
    <div>

      <BrowserRouter>
        <Routes>
          {/* <Route path="/logout" element={<LogoutPage />} /> */}
          <Route element={<LayOut />}>

            <Route path="/" element={<HomePage />} />
            <Route path="/login/" element={<LoginPage />} />
            <Route path="/register/" element={<RegisterPage />} />
            <Route path="/blogs/" element={<AllBlogPage />} />
            <Route path="/blog-details/:slug/" element={<BlogDetailsPage />} />
            <Route path="/category-blogs" element={<CategoryBlogFilterPage />} />
            <Route path="/tag-blogs" element={<TagBlogFilterPage />} />
            <Route path="/search-blogs" element={<SearchBlogsPage />} />

            <Route element={<Guard />}>
                <Route path="/profile/" element={<ProfilePage />} />
                <Route path="/add-blog/" element={<AddBlogPage />} />
                <Route path="/my-blogs/" element={<MyBlogsPage />} />
                <Route path="/update-blog/:id/" element={<UpdateBlogPage />} />
                <Route path="/my-favourites/" element={<MyFavouritePage />} />
                
            </Route>

          </Route>

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound404 />} />
          {/* Catch-all route for 401 */}
          <Route path="/forbidden/" element={<Unauthorized401 />} />
          
          
        </Routes>
      </BrowserRouter>

    </div>
  );
};

export default App
