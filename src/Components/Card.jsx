/* eslint-disable react/prop-types */
import "./Card.css";
const Card = ({ author, title, image, downloadCount, ReadEbook }) => {
  return (
    <div className="card">
      <img src={image} />
      <div className="details">
        <h4>
          Author: <span>{author}</span>
        </h4>
        <h4>
          Title:<span>{title.substring(0, 30)}...</span>
        </h4>
        <h4>
          DownloadCount: <span>{downloadCount}</span>
        </h4>
        <a href={ReadEbook} color="#000">
          E-Book
        </a>
      </div>
    </div>
  );
};

export default Card;
