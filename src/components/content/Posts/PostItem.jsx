import React, { useEffect, useState } from "react";
import still from "../../../icons/still.svg";
import bookmark from "../../../icons/bookmark.svg";
import like from "../../../icons/like.svg";
import comment from "../../../icons/comment.svg";
import { useContent } from "../../context/ContentContextProvider";
import "./PostItem.css"; // Импортируем файл стилей
import img from "../../../icons/cat.jpg";
const PostItem = ({ elem }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showAddComment, setShowAddComment] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false); // Добавляем состояние для отслеживания подписки

  useEffect(() => {
    const storedComments = localStorage.getItem("comments");

    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  const handleDeleteComment = (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
  };

  const handleToggleAddComment = () => {
    setShowAddComment(!showAddComment);
  };

  const handleToggleFollow = () => {
    setIsFollowing(!isFollowing);
    // В этом месте вы можете использовать API /profiles/{id}/follow/ для отправки запроса на сервер
    // и обновления состояния подписки
  };

  const {
    postsDelete,
    postsPartialUpdate,
    addToFavorites,
    removeFromFavorites,
    favorites,
  } = useContent();
  const [showDeleteWindow, setShowDeleteWindow] = useState(false);
  const isFavorite = favorites && favorites.includes(elem.id);
  const [text, setText] = useState("");
  const [isOpen, setOpen] = useState(true);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(elem.id);
    } else {
      addToFavorites(elem.id);
    }
  };

  const handleStillClick = () => {
    setShowDeleteWindow(true);
  };

  const handleDeleteClick = () => {
    postsDelete(elem.id);
    setShowDeleteWindow(false);
  };

  const handleClick = () => {
    const formData = new FormData();
    formData.append("text", text);
    postsPartialUpdate(elem.id, formData);
    setText("");
  };

  return (
    <div className="post-item">
      <div className="post-header">
        <img
          src="https://placekitten.com/40/40"
          alt="User Avatar"
          className="user-avatar"
        />
        <span className="username">{elem.author_username}</span>
      </div>
      <div className="still-icon" onClick={handleStillClick}>
        <img src={still} alt="" onClick={() => setOpen(!isOpen)} />
        <div className={`toggle ${isOpen ? "active" : ""}`}>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      </div>
      <div className="post-content">
        <p className="post-text">{elem.text}</p>
        {elem.image && (
          <img src={elem.image} alt="Post Image" className="post-image" />
        )}
        {elem.video && (
          <video src={elem.video} controls className="post-video" />
        )}
        <div className="post-info">
          <span className="pub-date">{elem.pub_date}</span>
          <div className="post-icons">
            <img src={like} alt="" className="icon" />
            <span className="likes-counter">{elem.likes}</span>
            <img src={comment} alt="" className="icon" />
            <span className="comments-counter">{elem.comments}</span>
            <img
              src={bookmark}
              alt=""
              className={`icon bookmark ${isFavorite ? "favorite" : ""}`}
              onClick={handleFavoriteClick}
            />
          </div>
        </div>
      </div>
      <div className={`toggle ${isOpen ? "active" : ""}`}>
        <input
          onChange={(e) => setText(e.target.value)}
          type="text"
          name=""
          id=""
        />
        <button onClick={handleClick} className="save-button">
          Save
        </button>
      </div>
      <div className="comment-section">
        <ul className="comment-list">
          {comments.map((comment, index) => (
            <li key={index} className="comment-item">
              {comment}
              <button
                className="delete-button"
                onClick={() => handleDeleteComment(index)}
              >
                <img className="img1" src={img} alt="" />
              </button>
            </li>
          ))}
        </ul>
        <button className="follow-button" onClick={handleToggleFollow}>
          {isFollowing ? "Отписаться" : "Подписаться"}
        </button>
        <button className="add-comment-button" onClick={handleToggleAddComment}>
          {showAddComment ? "Отмена" : "Комент"}
        </button>
        {showAddComment && (
          <div className="add-comment-input">
            <textarea
              className="oo"
              value={newComment}
              onChange={handleInputChange}
              placeholder="Напишите комментарий..."
            ></textarea>
            <button className="add-button" onClick={handleAddComment}>
              Добавить
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostItem;
