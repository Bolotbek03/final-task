import React from "react";
import { useContent } from "../../context/ContentContextProvider";
import PostItem from "./PostItem";

const PostList = () => {
  const { posts } = useContent();
  if (!Array.isArray(posts)) {
    console.error("posts is not an array:", posts);
    return null; // Return an appropriate fallback or loading component
  }
  return (
    <div>
      {posts &&
        posts.length > 0 &&
        posts.map((elem) => <PostItem elem={elem} key={elem.id} />)}
    </div>
  );
};

export default PostList;
