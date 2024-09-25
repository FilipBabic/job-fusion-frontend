import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import ErrorPage from "../pages/ErrorPage";
const DataFetcher = ({ apiUrl, method = "GET", headers = {}, onDataFetched }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(apiUrl, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        onDataFetched(data); // Pass the fetched data to the parent component
        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorPage errorCode="error: 400" errorMessage={error.message} />;
  }

  return null;
};

export default DataFetcher;
