import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import ErrorPage from "./ErrorPage";
import PageLayout from "../components/PageLayout";
import Button from "../components/Button";
import RenderJobDescriptions from "../components/RenderJobDescriptions";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const resData = await response.json();
          setTimeout(() => setJob(resData), 100);
          setIsLoading(false);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch job details");
        }
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchJob();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorPage errorCode="error: 400" errorMessage={error.message} />;
  }

  if (!job) {
    return <LoadingScreen />;
  }
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 border border-gray-200">
        <div className="flex items-center space-x-4 pb-4 border-b border-gray-200">
          <img
            className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
            src={job.organizationLogo}
            alt={`${job.organizationName} logo`}
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
            <p className="text-gray-600">{job.organizationName}</p>
            <p className="text-gray-500">{job.location}</p>
            <span className="inline-block bg-yellow-100 text-tertiary-500 text-sm font-medium px-3 py-1 mt-2 rounded-full">
              {job.type}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Skills Required</h2>
          {!isLoading && job.skills.length > 0 ? (
            <ul className="flex flex-wrap mt-2">
              {job.skills.map((skill, index) => (
                <li
                  key={index}
                  className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded-lg m-1"
                >
                  {skill}
                </li>
              ))}
            </ul>
          ) : (
            <p>No skills listed</p>
          )}
        </div>

        <div className="mt-6">
          <ul className="mt-2 space-y-2">
            {!isLoading && job.jobDescriptions.length > 0 ? (
              <RenderJobDescriptions job={job.jobDescriptions} />
            ) : (
              <p>No description provided for this job</p>
            )}
          </ul>
        </div>

        <div className="mt-6 text-right">
          <Button>Apply Now</Button>
        </div>
      </div>
    </PageLayout>
  );
};
export default JobDetails;
