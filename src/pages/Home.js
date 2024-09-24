import { useState, useEffect } from "react";
import PageLayout from "../components/PageLayout";
import LoadingScreen from "../components/LoadingScreen";
import JobSearch from "../components/JobSearch";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/jobs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const resData = await response.json();
          console.log("RES DATA", resData.jobs);
          setJobs(resData.jobs);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("error:", error);
        setError(error);
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <PageLayout>
      <h1 className="text-3xl text-center text-fuchsia-800 mt-16">
        See the job offer at our website
      </h1>
      <JobSearch jobs={jobs} />
    </PageLayout>
  );
};
export default Home;
