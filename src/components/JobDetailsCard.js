import RenderJobDescriptions from "./RenderJobDescriptions";
import Button from "./Button";
const JobDetailsCard = ({
  title,
  location,
  type,
  skills,
  jobDescriptions,
  organizationName,
  organizationLogo,
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 border border-gray-200">
      <div className="flex items-center space-x-4 pb-4 border-b border-gray-200">
        <img
          className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
          src={organizationLogo}
          alt={`${organizationName} logo`}
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600">{organizationName}</p>
          <p className="text-gray-500">{location}</p>
          <span className="inline-block bg-yellow-100 text-tertiary-500 text-sm font-medium px-3 py-1 mt-2 rounded-full">
            {type}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Skills Required</h2>
        {skills ? (
          <ul className="flex flex-wrap mt-2">
            {skills.map((skill, index) => (
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
          {jobDescriptions ? (
            <RenderJobDescriptions job={jobDescriptions} />
          ) : (
            <p>No description provided for this job</p>
          )}
        </ul>
      </div>

      <div className="mt-6 text-right">
        <Button>Apply Now</Button>
      </div>
    </div>
  );
};
export default JobDetailsCard;
