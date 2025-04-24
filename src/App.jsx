import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CoinTables from "./components/coinTable/coinTables";
import axios from "axios";
import { setLoading, addData, setError } from "./features/cryptoSlice.js"; // Import actions

function App() {
  const dispatch = useDispatch();

  const fetchCryptoData = async () => {
    try {
      dispatch(setLoading()); // Set loading state
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false"
      );
      dispatch(addData(res.data)); // Dispatch success action with data
    } catch (error) {
      console.error("Error fetching crypto data:", error); // Log the complete error object
      dispatch(setError(error.message || "An error occurred")); // Dispatch error action with a default error message
    }
  };

  useEffect(() => {
    fetchCryptoData(); // Dispatch the initial data fetch

    const interval = setInterval(() => {
      fetchCryptoData(); // Periodically fetch new data every 30 seconds
    }, 30000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div>
      <CoinTables />
    </div>
  );
}

export default App;
