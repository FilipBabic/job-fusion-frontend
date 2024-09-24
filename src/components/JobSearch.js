import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
const JobSearch = ({ jobs }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    title: "",
    location: "",
    organizationName: "",
    type: "",
    skills: "",
  });
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({
      ...searchCriteria,
      [name]: value,
    });
  };

  const searchJobs = () => {
    const { title, location, organizationName, type, skills } = searchCriteria;

    const result = jobs.filter((job) => {
      console.log("job type", job.type);
      console.log("type", type);
      const matchesTitle = title ? job.title.toLowerCase().includes(title.toLowerCase()) : true;
      const matchesLocation = location
        ? job.location.toLowerCase().includes(location.toLowerCase())
        : true;
      const matchesorganizationName = organizationName
        ? job.organizationName.toLowerCase().includes(organizationName.toLowerCase())
        : true;
      const matchesType = type ? job.type.toLowerCase().includes(type.toLowerCase()) : true;
      const matchesSkills = skills
        ? skills
            .split(",")
            .every((skill) =>
              job.skills.map((s) => s.trim().toLowerCase()).includes(skill.trim().toLowerCase())
            )
        : true;

      return (
        matchesTitle && matchesLocation && matchesorganizationName && matchesType && matchesSkills
      );
    });
    setFilteredJobs(result);
  };
  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-6">Search Jobs</h1>
      <div className="flex flex-col justify-center items-center bg-gray-100">
        <div className="flex flex-row flex-wrap w-full p-6 bg-white shadow-md">
          <div className="w-full md:w-1/3 my-3 px-4">
            <label htmlFor="location" className="block text-lg font-medium text-violet-700">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={searchCriteria.title || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-400 focus:outline-none"
              placeholder="Enter job title"
            />
          </div>
          <div className="w-full md:w-1/3 my-3 px-4">
            <label htmlFor="location" className="block text-lg font-medium text-violet-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={searchCriteria.location || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-400 focus:outline-none"
              placeholder="Enter location"
            />
          </div>
          <div className="w-full md:w-1/3 my-3 px-4">
            <label htmlFor="organizationName" className="block text-lg font-medium text-violet-700">
              Organization Name
            </label>
            <input
              type="text"
              name="organizationName"
              id="organizationName"
              value={searchCriteria.organizationName || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-400 focus:outline-none"
              placeholder="Enter organization name"
            />
          </div>
          <div className="w-full md:w-1/2 my-3 px-4">
            <label htmlFor="type" className="block text-lg font-medium text-violet-700">
              Job Type
            </label>
            <select
              name="type"
              id="type"
              value={searchCriteria.type || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-400 focus:outline-none"
            >
              <option value="">All</option>
              <option value="full-time">Full-time</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div className="w-full md:w-1/2 my-3 px-4">
            <label htmlFor="skills" className="block text-lg font-medium text-violet-700">
              Skills (comma separated)
            </label>
            <input
              type="text"
              name="skills"
              id="skills"
              value={searchCriteria.skills}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-400 focus:outline-none"
              placeholder="e.g. JavaScript, React"
            />

            <div className="text-right mt-3">
              <Button onClick={(e) => searchJobs()}>Search</Button>
            </div>
          </div>

          <div className="w-full ">
            <h2>Search results:</h2>
            <div className="flex flex-wrap">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className=" md:w-1/2 mt-3 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
                  >
                    <Link to={{ pathname: `/job-details/${job.id}` }}>
                      <div className="flex items-center p-4 bg-gray-100">
                        <img
                          className="w-16 h-16 object-cover rounded-full border-2 border-gray-300"
                          src={job.organizationLogo}
                          alt={`${job.organizationName} logo`}
                        />
                        <div className="ml-4">
                          <h3 className="text-xl font-bold text-gray-800">
                            {job.organizationName}
                          </h3>
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
                          {job.skills.length > 0 ? (
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
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 text-right">
                        <Button>Apply Now</Button>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <p>No jobs found.</p>
              )}
            </div>
            {/* {filteredJobs.length > 0 ? (
            <ul>
              {filteredJobs.map((job, index) => (
                <li key={index}>
                  <h3>{job.title}</h3>
                  <p>{job.location}</p>
                  <p>{job.organizationName}</p>
                  <p>{job.type}</p>
                  <p>Skills: {job.skills.join(", ")}</p>
                </li>
              ))}
            </ul>
          ) : (
            
          )} */}
          </div>
        </div>
      </div>
    </>
  );
};
export default JobSearch;
