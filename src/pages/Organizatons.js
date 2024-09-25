import { useState } from "react";
import DataFetcher from "../components/DataFetcher";
import PaginatedComponent from "../components/PaginatedComponent";
import PageLayout from "../components/PageLayout";
import Heading from "./Heading";

const Organizations = () => {
  const apiUrl = "http://localhost:5000/api/organizations"; // Example API URL
  const customHeaders = {
    // Authorization: "Bearer your-auth-token", // Example authorization token (optional)
  };

  // State to store the fetched data
  const [fetchedData, setFetchedData] = useState([]);

  // Callback function to handle fetched data
  const handleDataFetched = (data) => {
    setFetchedData(data);
  };

  return (
    <PageLayout>
      <Heading text="See organizations with job advertisements at" />

      <DataFetcher
        apiUrl={apiUrl}
        method="GET"
        headers={customHeaders}
        onDataFetched={handleDataFetched}
      />

      <div className="mt-6">
        <PaginatedComponent data={fetchedData} />
      </div>
    </PageLayout>
  );
};
export default Organizations;
