import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Components/Card";
import "./Home.css";

const Home = () => {
  const [pagedData, setPagedData] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [searcheDData, setSearchedData] = useState([]);

  useEffect(() => {
    const book_details = async () => {
      try {
        const res = await axios.get("https://gutendex.com/books?page=1");
        setPagedData(res?.data?.results);
        console.log(res?.data?.results);

        setNextPage(res?.data?.next);
      } catch (error) {
        console.log(error);
      }
    };
    book_details();
  }, []);
  const getMoreData = async () => {
    try {
      const res = await axios.get(nextPage);
      setPagedData([...pagedData, ...res.data.results]);
      setSearchedData([...pagedData, ...res.data.results]);
      res.data.next !== "" ? setHasMore(true) : setHasMore(false);
      setNextPage(res?.data?.next);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://gutendex.com/books?search=${search}`
      );
      setSearchedData(res?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const timeOut = setTimeout(() => {
      handleSearch();
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [search]);
  return (
    <InfiniteScroll
      dataLength={pagedData.length}
      next={getMoreData}
      hasMore={hasMore}
      loader={<h4>Loading....</h4>}
    >
      <div className="header">
        <h1>Book Store</h1>
        <input
          className="input"
          placeholder="Search Your book..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="container ">
        {searcheDData &&
          searcheDData.map((item) => (
            <div className="row" key={item.id}>
              <div className="card-container">
                <Card
                  author={item.authors[0]?.name}
                  title={item.title}
                  downloadCount={item.download_count}
                  image={item.formats["image/jpeg"]}
                  ReadEbook={item.formats["application/octet-stream"]}
                />
              </div>
            </div>
          ))}
      </div>
    </InfiniteScroll>
  );
};

export default Home;
