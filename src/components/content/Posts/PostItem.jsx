import React from "react";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import "./PostItem.css";

const PostItem = ({ elem }) => {
  const { image, video } = elem;

  return (
    <div className="post-item">
      <div className="post-header">
        {/* Иконка пользователя (замените на вашу собственную иконку) */}
        <img
          src="https://placekitten.com/40/40" // Пример изображения (замените на реальный URL)
          alt="User Avatar"
          className="user-avatar"
        />
        <span className="username">{elem.author_username}</span>
      </div>

      <div className="post-content">
        {/* Отображение текста поста */}
        <p className="post-text">{elem.text}</p>

        {/* Отображение изображения или видео (выберите один из них) */}
        {image && (
          <img src={elem.image} alt="Post Image" className="post-image" />
        )}
        {video && <video src={elem.video} controls className="post-video" />}

        {/* Отображение информации о посте (дата, лайки, комментарии) */}
        <div className="post-info">
          <span className="pub-date">{elem.pub_date}</span>
          <div className="post-icons">
            <AiOutlineHeart className="icon" />
            <span className="likes-counter">{elem.likes}</span>{" "}
            {/* Счетчик лайков */}
            <AiOutlineMessage className="icon" />
            <span className="comments-counter">{elem.comments}</span>{" "}
            {/* Счетчик комментариев */}
            <FiSend className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
