import { Link } from "react-router-dom";
import Button from "./Button";
const JobCard = ({
  id,
  title,
  location,
  starts,
  expires,
  type,
  skills,
  organizationName,
  organizationLogo,
}) => {
  return (
    <div key={id} className="md:w-1/2 mt-3 px-3 bg-white overflow-hidden">
      <Link to={{ pathname: `/job-details/${id}` }}>
        <div className="flex items-center p-4 bg-gray-100 rounded-t-lg border border-b-0 border-gray-200">
          <img
            className="w-16 h-16 object-cover rounded-full border-2 border-gray-300"
            src={organizationLogo}
            alt={`${organizationName} logo`}
          />
          <div className="ml-4">
            <h3 className="text-xl font-bold text-gray-800">{organizationName}</h3>
            <p className="text-sm text-gray-600">{location}</p>
          </div>
        </div>

        <div className="p-4 border border-gray-200">
          <h2 className="text-2xl font-semibold text-blue-500">{title}</h2>
          <p className="text-gray-600 mt-1">
            {starts} - {expires}
          </p>
          <p className="inline-block bg-yellow-100 text-tertiary-500 text-sm font-medium px-3 py-1 mt-2 rounded-full">
            {type}
          </p>

          <div className="mt-4">
            <h4 className="font-semibold text-tertiary-500">Skills:</h4>
            {skills.length > 0 ? (
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
        </div>
      </Link>
      <div className="p-4 bg-gray-50 text-right mb-auto border border-t-0 border-gray-200">
        <Button>Apply Now</Button>
      </div>
    </div>
  );
};

export default JobCard;
