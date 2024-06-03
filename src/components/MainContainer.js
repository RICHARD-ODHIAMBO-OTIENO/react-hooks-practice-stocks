import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortType, setSortType] = useState("");
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((response) => response.json())
      .then((data) => setStocks(data));
  }, []);

  const handleBuyStock = (stockToAdd) => {
    setPortfolio([...portfolio, stockToAdd]);
  };

  const handleSellStock = (stockToRemove) => {
    setPortfolio(portfolio.filter(stock => stock.id !== stockToRemove.id));
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const sortedStocks = () => {
    let sortedStocks = [...stocks];
    if (sortType === "Alphabetically") {
      sortedStocks.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === "Price") {
      sortedStocks.sort((a, b) => a.price - b.price);
    }
    return sortedStocks;
  };

  const filteredStocks = () => {
    if (filterType === "All") {
      return sortedStocks();
    } else {
      return sortedStocks().filter(stock => stock.type === filterType);
    }
  };

  return (
    <div>
      <SearchBar onSortChange={handleSortChange} onFilterChange={handleFilterChange} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks()} onBuyStock={handleBuyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} onSellStock={handleSellStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;

