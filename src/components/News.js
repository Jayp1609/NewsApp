import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import propTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);

  const [page, setPage] = useState(1);
  const [totalResults, setTotalresults] = useState(0);

  const updateNews = async () => {
    // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ae08923d5d534f54b1239b2acc080538&page=${page}&pageSize=${props.pageSize}`;
    const url2 = `https://newsdata.io/api/1/news?apikey=pub_23848fb8c2947d462f41adfcea373028bcd57&country=${props.country}&language=en&category=${props.category}`;
    let data = await fetch(url2);
    let parsedData = await data.json();

    setPage(parsedData.nextPage);
    // setPage(page + 1);
    setArticles(parsedData.results);
    setTotalresults(parsedData.totalResults);
  };

  const fetchMoreData = async () => {
    try {
      // setPage(page + 1);
      //  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ae08923d5d534f54b1239b2acc080538&page=${page}&pageSize=${props.pageSize}`;
      const url2 = `https://newsdata.io/api/1/news?apikey=pub_23848fb8c2947d462f41adfcea373028bcd57&country=${props.country}&language=en&category=${props.category}&page=${page}`;

      let data = await fetch(url2);
      let parsedData = await data.json();
      setPage(parsedData.nextPage);
      setArticles(articles.concat(parsedData.results));
    } catch (err) {
      return err;
    }
  };

  const CapitalizeFirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `${CapitalizeFirstletter(props.category)} - NewsApp`;
    updateNews();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        NewsApp - Top {CapitalizeFirstletter(props.category)} Headlines
      </h1>

      <div className="container">
        <InfiniteScroll
          dataLength={articles.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
          endMessage={<h3 style={{ textAlign: "center" }}>NewsApp!!</h3>}
        >
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.link}>
                  <NewsItem
                    title={element.title}
                    description={
                      element.content ? element.content.slice(0, 188) : ""
                    }
                    imgurl={element.image_url}
                    newsUrl={element.link}
                    author={element.author}
                    date={element.pubDate}
                    source={element.source_id}
                    key={element.link}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};
News.defaultProps = {
  country: "in",
  category: "business",
};
News.propTypes = {
  country: propTypes.string,
  pageSize: propTypes.number,
  category: propTypes.string,
  author: propTypes.string,
  date: propTypes.element,
};

export default News;
