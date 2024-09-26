import { useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import DataFetcher from "../components/DataFetcher";
import PageLayout from "../components/PageLayout";
import LoadingScreen from "../components/LoadingScreen";
import ErrorPage from "./ErrorPage";
import JobDetailsCard from "../components/JobDetailsCard";

const JobDetails = () => {
  const { id } = useParams();
  const apiUrl = `http://localhost:5000/api/jobs/${id}`;
  const customHeaders = useMemo(() => {
    return {};
  }, []);

  const [job, setJob] = useState([]);

  const handleDataFetched = useCallback((data) => {
    setJob(data);
  }, []);

  return (
    <PageLayout>
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

      {job && (
        <JobDetailsCard
          title={job.title}
          location={job.location}
          type={job.type}
          skills={job.skills}
          jobDescriptions={job.jobDescriptions}
          organizationName={job.organizationName}
          organizationLogo={job.organizationLogo}
        />
      )}
    </PageLayout>
  );
};
export default JobDetails;
