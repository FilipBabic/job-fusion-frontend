import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
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
    return <LoadingScreen />; // Show loading state while fetching data
  }
  return (
    <>
      <h1 className="text-3xl text-center text-fuchsia-800 mt-16">
        See the job offer on our website
      </h1>
      ;
      {jobs.map((job) => (
        <div
          key={job.id}
          className="max-w-sm mx-auto mt-3 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
        >
          <Link to={{ pathname: `/job-details/${job.id}` }}>
            <div className="flex items-center p-4 bg-gray-100">
              <img
                className="w-16 h-16 object-cover rounded-full border-2 border-gray-300"
                src={job.organizationLogo}
                alt={`${job.organizationName} logo`}
              />
              <div className="ml-4">
                <h3 className="text-xl font-bold text-gray-800">{job.organizationName}</h3>
                <p className="text-sm text-gray-600">{job.location}</p>
              </div>
            </div>

            <div className="p-4">
              <h2 className="text-2xl font-semibold text-violet-800">{job.title}</h2>
              <p className="text-gray-600 mt-1">
                {job.starts} - {job.expires}
              </p>
              <p className="text-gray-600 mt-1">
                <span className="font-semibold">Type:</span> {job.type}
              </p>

              <div className="mt-4">
                <h4 className="font-semibold text-fuchsia-700">Skills:</h4>
                {/* <ul className="flex flex-wrap mt-2">
                {skills.map((skill, index) => (
                  <li
                    key={index}
                    className="bg-blue-100 text-blue-700 text-sm font-medium px-2 py-1 rounded-lg m-1"
                  >
                    {skill}
                  </li>
                ))}
              </ul> */}
              </div>
            </div>

            <div className="p-4 bg-gray-50 text-right">
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none">
                Apply Now
              </button>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};
export default Home;
