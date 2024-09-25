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
      <div className="w-full flex flex-row flex-wrap my-12 p-6 bg-white rounded-md border-2 border-violet-200">
        <div className="w-full md:w-1/3 my-3 px-4">
          <label htmlFor="location" className="block text-lg font-medium px-4 text-tertiary-500">
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
          <label htmlFor="location" className="block text-lg font-medium px-4 text-tertiary-500">
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
          <label
            htmlFor="organizationName"
            className="block text-lg px-4 font-medium text-tertiary-500"
          >
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
          <label htmlFor="type" className="block text-lg font-medium px-4 text-tertiary-500">
            Job Type
          </label>
          <select
            name="type"
            id="type"
            value={searchCriteria.type || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2  focus:ring-violet-400 focus:outline-none"
          >
            <option value="">All</option>
            <option value="full-time">Full-time</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div className="w-full md:w-1/2 my-3 px-4">
          <label htmlFor="skills" className="block text-lg font-medium px-4 text-tertiary-500">
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
      </div>
      <div className="w-full ">
        <h2>Search results:</h2>
        <div className="flex flex-wrap">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="md:w-1/2 mt-3 px-3 bg-white overflow-hidden">
                <Link to={{ pathname: `/job-details/${job.id}` }}>
                  <div className="flex items-center p-4 bg-gray-100 rounded-t-lg border border-b-0 border-gray-200">
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

                  <div className="p-4 border border-gray-200">
                    <h2 className="text-2xl font-semibold text-blue-500">{job.title}</h2>
                    <p className="text-gray-600 mt-1">
                      {job.starts} - {job.expires}
                    </p>
                    <p className="inline-block bg-yellow-100 text-tertiary-500 text-sm font-medium px-3 py-1 mt-2 rounded-full">
                      {job.type}
                    </p>

                    <div className="mt-4">
                      <h4 className="font-semibold text-tertiary-500">Skills:</h4>
                      {job.skills.length > 0 ? (
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
                  </div>

                  <div className="p-4 bg-gray-50 text-right mb-auto border border-t-0 border-gray-200">
                    <Button>Apply Now</Button>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      </div>
    </>
  );
};
export default JobSearch;
