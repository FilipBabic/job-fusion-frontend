import { useState, useMemo, useCallback } from "react";
import PageLayout from "../components/PageLayout";
import Heading from "./Heading";
import DataFetcher from "../components/DataFetcher";
import JobSearch from "../components/JobSearch";
import LoadingScreen from "../components/LoadingScreen";
import ErrorPage from "./ErrorPage";

const Home = () => {
  const apiUrl = "http://localhost:5000/api/jobs";
  const customHeaders = useMemo(() => {
    return {};
  }, []);

  const [jobsData, setJobsData] = useState([]);

  const handleDataFetched = useCallback((data) => {
    setJobsData(data.jobs);
  }, []);

  return (
    <PageLayout>
      <Heading text="Search for the job offers at" />

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

      {jobsData.length > 0 && <JobSearch jobs={jobsData} />}
    </PageLayout>
  );
};
export default Home;
