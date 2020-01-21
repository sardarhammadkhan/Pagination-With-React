import React, { useState, useEffect } from "react";
import axios from "axios";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);
  //Get current post
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5 ">
      <h1 className="text-primary mb-3">My blog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postPerPage={postPerPage}
        totalPost={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
