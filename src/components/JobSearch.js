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
  }, [jobs, searchJobs]); // Include searchJobs in the dependency array

  // useEffect to re-filter jobs whenever search criteria changes
  useEffect(() => {
    searchJobs(); // Re-run search when search criteria changes
  }, [searchCriteria, searchJobs]);
  return (
    <>
      <div className="w-full flex flex-row flex-wrap my-8 p-6 bg-white rounded-md border-2 border-violet-200">
        <TextInput
          label="Job Title"
          type="text"
          name="title"
          id="title"
          value={searchCriteria.title || ""}
          placeholder="Enter job title"
          onChange={handleInputChange}
        />

        <TextInput
          label="Location"
          type="text"
          name="location"
          id="location"
          value={searchCriteria.location || ""}
          placeholder="Enter location"
          onChange={handleInputChange}
        />

        <TextInput
          label="Organization Name"
          type="text"
          name="organizationName"
          id="organizationName"
          value={searchCriteria.organizationName || ""}
          placeholder="Enter organization name"
          onChange={handleInputChange}
        />

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

        <TextInput
          label="Skills (comma separated)"
          type="text"
          name="skills"
          id="skills"
          value={searchCriteria.skills || ""}
          placeholder="e.g. JavaScript, React"
          onChange={handleInputChange}
        />
      </div>
      <div className="text-center">
        <Button onClick={(e) => searchJobs()}>Search</Button>
      </div>

      <div className="w-full ">
        <h2>Search results:</h2>
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
            <p>No jobs found.</p>
          )}
        </div>
      </div>
    </>
  );
};
export default JobSearch;
