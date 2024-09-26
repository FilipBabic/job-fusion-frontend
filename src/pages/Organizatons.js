import { useState, useMemo, useCallback } from "react";
import DataFetcher from "../components/DataFetcher";
import PaginatedComponent from "../components/PaginatedComponent";
import PageLayout from "../components/PageLayout";
import Heading from "./Heading";
import LoadingScreen from "../components/LoadingScreen";
import ErrorPage from "./ErrorPage";

const Organizations = () => {
  const apiUrl = "http://localhost:5000/api/organizations";
  const customHeaders = useMemo(() => {
    return {};
  }, []);

  const [organizationsData, setOrganizationsData] = useState([]);

  const handleDataFetched = useCallback((data) => {
    setOrganizationsData(data);
  }, []);

  return (
    <PageLayout>
      <Heading text="See organizations with job advertisements at" />

      <DataFetcher
        apiUrl={apiUrl}
        method="GET"
        headers={customHeaders}
        onDataFetched={handleDataFetched}
        renderLoading={() => <LoadingScreen />}
        renderError={(error) => (
          <ErrorPage
            errorCode={`${error.split(" : ")[1]}`}
            errorMessage={`error: ${error.split(" : ")[0]}`}
          />
        )}
      />

      {organizationsData.length > 0 && <PaginatedComponent data={organizationsData} />}
    </PageLayout>
  );
};
export default Organizations;
