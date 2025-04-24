// src/components/CryptoGraph.js
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";  // Make sure axios is imported
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

function CryptoGraph({ coinId }) {
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch historical data for the coin
  const fetchHistoricalData = async () => {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
      );
      setHistoricalData(res.data.prices);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching historical data", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [coinId]);

  // Prepare the chart data from the fetched historical data
  const chartData = {
    labels: historicalData.map((dataPoint) => new Date(dataPoint[0]).toLocaleDateString()),
    datasets: [
      {
        label: "Price (USD)",
        data: historicalData.map((dataPoint) => dataPoint[1]),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (USD)",
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="crypto-graph">
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <Line data={chartData} options={options} /> 
      )}
    </div>
  );
}

export default CryptoGraph;
