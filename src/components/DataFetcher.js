import { useState, useEffect } from "react";

const DataFetcher = ({
  apiUrl,
  method = "GET",
  headers = {},
  onDataFetched,
  renderLoading,
  renderError,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`${errorData.error} : ${errorData.status}`);
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
  }, [apiUrl, method, headers, onDataFetched]);

  if (loading) {
    return renderLoading ? renderLoading() : <div>Loading...</div>;
  }

  if (error) {
    return renderError ? renderError(error) : <div>Error: {error}</div>;
  }
  return null;
};

export default DataFetcher;
