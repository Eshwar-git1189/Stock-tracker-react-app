// src/pages/Home.js
import StockSearch from "../Components/StockSearch";
import StockCard from "../Components/StockCard";
import NewsSection from "../Components/NewsSection";

const Home = ({ symbol, data, onSearch }) => {

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Search for Stocks</h1>
      <StockSearch onSearch={onSearch} />
      {data && <StockCard symbol={symbol} data={data} />}
      {symbol && <NewsSection symbol={symbol} />}
    </div>
  );
};

export default Home;
