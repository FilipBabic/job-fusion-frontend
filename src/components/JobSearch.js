import { useState, useEffect, useCallback } from "react";
import JobCard from "./JobCard";
import Button from "./Button";
import TextInput from "./TextInput";
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

  const searchJobs = useCallback(() => {
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
  }, [jobs, searchCriteria]);

  useEffect(() => {
    searchJobs(); // Call searchJobs to filter jobs based on initial criteria
  }, [jobs, searchJobs]);

  useEffect(() => {
    searchJobs(); // Re-run search when search criteria changes
  }, [searchCriteria, searchJobs]);
  return (
    <>
      <div className="w-full flex flex-row flex-wrap items-center my-4 p-6 bg-gradient-to-r from-blue-700 to-violet-700 rounded-md border border-gray-200">
        <div className="w-full md:w-1/3 my-3 px-4">
          <TextInput
            label="Job Title"
            type="text"
            name="title"
            id="title"
            value={searchCriteria.title || ""}
            placeholder="Enter job title"
            onChange={handleInputChange}
            className2="w-full md:w-1/3 my-3 px-4"
          />
        </div>
        <div className="w-full md:w-1/3 my-3 px-4">
          <TextInput
            label="Location"
            type="text"
            name="location"
            id="location"
            value={searchCriteria.location || ""}
            placeholder="Enter location"
            onChange={handleInputChange}
            className2="w-full md:w-1/3 my-3 px-4"
          />
        </div>
        <div className="w-full md:w-1/3 my-3 px-4">
          <TextInput
            label="Organization Name"
            type="text"
            name="organizationName"
            id="organizationName"
            value={searchCriteria.organizationName || ""}
            placeholder="Enter organization name"
            onChange={handleInputChange}
            className2="w-full md:w-1/3 my-3 px-4"
          />
        </div>
        <div className="w-full md:w-1/4 my-3 px-4">
          <label htmlFor="type" className="block text-base font-medium px-4 text-white">
            Job Type
          </label>
          <select
            name="type"
            id="type"
            value={searchCriteria.type || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border bg-blue-100 text-gray-800 text-base rounded-md focus:ring-2  focus:ring-yellow-100 focus:outline-none"
          >
            <option value="">All</option>
            <option value="full-time">Full-time</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div className="w-full md:w-3/4 my-3 px-4">
          <TextInput
            label="Skills (comma separated)"
            type="text"
            name="skills"
            id="skills"
            value={searchCriteria.skills || ""}
            placeholder="e.g. JavaScript, React"
            onChange={handleInputChange}
            className2="w-full md:w-1/3 my-3 px-4"
          />
        </div>
      </div>
      <div className="text-center">
        <Button
          onClick={() =>
            setSearchCriteria({
              title: "",
              location: "",
              organizationName: "",
              type: "",
              skills: "",
            })
          }
        >
          All jobs
        </Button>
      </div>

      <div className="w-full ">
        <h2 className="text-center text-xl m-5">Search results:</h2>
        <div className="flex flex-wrap">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                location={job.location}
                starts={job.starts}
                expires={job.expires}
                type={job.type}
                skills={job.skills}
                organizationName={job.organizationName}
                organizationLogo={job.organizationLogo}
              />
            ))
          ) : (
            <div className="min-h-80 w-full">
              <p className="text-xl text-center mt-10">No jobs found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default JobSearch;
