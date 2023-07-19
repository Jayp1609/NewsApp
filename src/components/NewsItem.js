import { Link } from "react-router-dom";

const NewsItem = (props) => {
  let { title, description, imgurl, newsUrl, date, author, source } = props;
  return (
    <div className="my-3">
      <div className="card">
        <img
          style={{ height: "240px" }}
          src={
            !imgurl
              ? "https://images.news9live.com/wp-content/uploads/2023/04/iss053e023965-Cropped.jpg"
              : imgurl
          }
          className="card-img-top"
          alt="..."
        />

        <div className="card-body">
          <div className="container text-center my-3">
            <span className="badge text-bg-danger text-center">{source}</span>
          </div>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <div className="container text-center">
            <Link
              to={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-primary btn-dark"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
