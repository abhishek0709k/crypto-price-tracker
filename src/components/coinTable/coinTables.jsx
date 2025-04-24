import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./coinTables.css";
import CryptoGraph from "../cryptoGraph/cryptoGraph";
const CoinTables = () => {
  const { assets, status } = useSelector((state) => state.crypto);
  if (status === "loading")
    return <div className="loading-state">Loading...</div>;
  if (status === "rejected"){
    return <div className="Error-state">Error Loading Data.</div>;
  }
    
  return (
    <div className="table-container">
  <div className="overflow-auto">
    <table className="min-w-full">
      <thead>
        <tr>
          <th>#</th>
          <th>Logo</th>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>1h %</th>
          <th>24h %</th>
          <th>7d %</th>
          <th>Market Cap</th>
          <th>24h Volume</th>
          <th>Circulating</th>
          <th>Graph</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((coin, index) => (
          <tr key={coin.id} className="text-center">
            <td>{index + 1}</td>
            <td className="coin-image"><img src={coin.image} alt={coin.symbol} width={24} /></td>
            <td>{coin.name}</td>
            <td>{coin.symbol.toUpperCase()}</td>
            <td>${coin.current_price.toLocaleString()}</td>
            <td className={coin.price_change_percentage_1h_in_currency >= 0 ? 'text-green-600' : 'text-red-600'}>
              {coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
            </td>
            <td className={coin.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}>
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </td>
            <td className={coin.price_change_percentage_7d_in_currency >= 0 ? 'text-green-600' : 'text-red-600'}>
              {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
            </td>
            <td>${coin.market_cap.toLocaleString()}</td>
            <td>${coin.total_volume.toLocaleString()}</td>
            <td>{coin.circulating_supply?.toLocaleString()}</td>
            <td><CryptoGraph coinId={coin.id} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default CoinTables;
