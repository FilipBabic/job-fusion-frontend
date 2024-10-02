import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "../services/api/jobApi";
import PageLayout from "../components/PageLayout";
import JobSearch from "../components/JobSearch";
import LoadingScreen from "./LoadingScreen";
import ErrorPage from "./ErrorPage";

const Home = () => {
  const {
    data: allJobs,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["allJobs"],
    queryFn: () => fetchJobs(),
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
    <PageLayout text="Search for the job offers:">
      {allJobs.jobs.length > 0 && <JobSearch jobs={allJobs.jobs} />}
    </PageLayout>
  );
};
export default Home;
