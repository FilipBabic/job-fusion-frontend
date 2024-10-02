import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchJobById } from "../services/api/jobApi";
import PageLayout from "../components/PageLayout";
import LoadingScreen from "./LoadingScreen";
import ErrorPage from "./ErrorPage";
import JobDetailsCard from "../components/JobDetailsCard";

const JobDetails = () => {
  const { id } = useParams();
  const {
    data: job,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["jobDetails", id],
    queryFn: () => fetchJobById(id),
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Cache for 30 minutes
  });

  if (isLoading) return <LoadingScreen />;
  if (error)
    return (
      <ErrorPage
        errorCode={`${error.message.split(" : ")[1]}`}
        errorMessage={`error: ${error.message.split(" : ")[0]}`}
      />
    );
  return (
    <PageLayout>
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
