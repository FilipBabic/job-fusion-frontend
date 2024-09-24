const RenderJobDescriptions = ({ job }) => {
  return (
    <>
      {job.map((description) => {
        let descValue = description.value;
        return (
          <div key={description.key}>
            <h2 className="mb-2 text-xl font-semibold text-gray-800">{description.key}</h2>
            {typeof descValue === "object" && descValue.length > 0 ? (
              <ul className="list-inside list-disc mb-4">
                {descValue.map((desc, index) => (
                  <li key={`${index}${description.key}`}>{desc}</li>
                ))}
              </ul>
            ) : (
              <p className="mb-4">{descValue}</p>
            )}
          </div>
        );
      })}
    </>
  );
};

export default RenderJobDescriptions;
