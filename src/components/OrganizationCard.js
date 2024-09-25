const OrganizationCard = ({
  name,
  about,
  industry,
  type,
  country,
  city,
  address,
  email,
  website,
  logo,
}) => {
  return (
    <div className="bg-violet-100 p-6 rounded-lg min-h-full border border-violet-700">
      {/* Logo Section */}
      <div className="mx-auto w-60 h-30 overflow-hidden">
        <img
          src={logo}
          alt={`${name} Logo`}
          className="object-cover w-full h-full bg-white border-2 border-blue-500"
        />
      </div>

      {/* Company Info Section */}
      <div className="text-center mt-4">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {industry} - {type}
        </p>
      </div>

      {/* About Section */}
      <div className="mt-4">
        <p className="text-gray-800 text-justify">{about}</p>
      </div>

      {/* Location Section */}
      <div className="mt-4">
        <p className="text-gray-800">
          <strong>Location:</strong> {city}, {country}
        </p>
        <p className="text-gray-800">
          <strong>Address:</strong> {address}
        </p>
      </div>

      {/* Contact Section */}
      <div className="mt-4">
        <p className="text-gray-800">
          <strong>Email:</strong>{" "}
          <a href={`mailto:${email}`} className="text-blue-500">
            {email}
          </a>
        </p>
        <p className="text-gray-800">
          <strong>Website:</strong>{" "}
          <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            {website}
          </a>
        </p>
      </div>

      {/* CTA Button */}
      <div className="mt-6 text-center">
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-violet-700 text-white px-4 py-2 rounded-lg hover:bg-violet-800 transition duration-300"
        >
          Visit Website
        </a>
      </div>
    </div>
  );
};

export default OrganizationCard;
