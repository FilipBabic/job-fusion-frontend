import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import PageLayout from "../components/PageLayout";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  console.log("PARAM", id);
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
          console.log("RES DATA", resData);
          setTimeout(() => setJob(resData), 1000);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("error:", error);
        setError(error);
        setIsLoading(false);
      }
    };
    fetchJob();
  }, []);

  if (isLoading) {
    return <LoadingScreen />; // Show loading state while fetching data
  }

  if (!job) {
    return (
      <div>
        <LoadingScreen />
      </div>
    ); // Show a fallback if no job data
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
            <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 mt-2 rounded-full">
              {job.type}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Job Description</h2>
          {/* <p className="text-gray-700 mt-2 leading-relaxed">{job.jobDescriptions}</p> */}
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Skills Required</h2>
          {!isLoading && job.skills.length > 0 ? (
            <ul className="flex flex-wrap mt-2">
              {job.skills.map((skill, index) => (
                <li
                  key={index}
                  className="bg-blue-100 text-blue-700 text-sm font-medium px-2 py-1 rounded-lg m-1"
                >
                  {skill}
                </li>
              ))}
            </ul>
          ) : (
            <p>No skills listed</p>
          )}
          {console.log("skills", job.skills)}
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Benefits</h2>
          <ul className="mt-2 space-y-2">
            {/* {job.jobDescriptions.map((benefit, index) => (
              <li key={index} className="text-gray-600">
                • {benefit}
              </li>
            ))} */}
          </ul>
        </div>

        <div className="mt-6 text-right">
          <button className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none">
            Apply Now
          </button>
        </div>
      </div>
    </PageLayout>
  );
};
export default JobDetails;
