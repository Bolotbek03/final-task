import React, { useEffect, useState } from "react";
import PostList from "../../content/Posts/PostList";
import { useContent } from "../../context/ContentContextProvider";
import img from "../../../icons/cat.jpg";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "./Home.css";
import Rec from "../Rec/Rec";
const Home = () => {
  const { postsCreate, getPosts, posts } = useContent();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  useEffect(() => {
    getPosts();
  }, [posts]);
  const handleClick = () => {
    const newPosts = new FormData();
    newPosts.append("text", text);
    newPosts.append("image", image);
    postsCreate(newPosts);
    setText("");
    setImage(null);
  };
  return (
    <div className="sap">
      <div className="home-header">
        <div>
          <div>
            <h3>For you</h3>
          </div>
        </div>
        <div className="user-section">
          <div className="aa">
            <img src={img} alt="User" className="ll" />
          </div>
          <div className="tt">
            <div>
              <input
                type="text"
                placeholder="Что у вас нового?"
                onChange={(e) => setText(e.target.value)}
                className="pp"
              />
              <label style={{ color: "white" }} htmlFor="file">
                <CameraAltIcon className="cc" />
              </label>
              <input
                className="ww"
                id="file"
                type="file"
                placeholder="Файл"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div>
              <button className="zz" onClick={handleClick}>
                Опубликовать пост
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <Rec /> */}
      <PostList />
    </div>
  );
};

export default Home;
