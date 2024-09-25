const Heading = ({ text }) => {
  return (
    <>
      <div>
        <h1 className="text-3xl text-center text-blue-500 mt-16">
          {text}
          <p className="text-6xl text-blue-700">
            job
            <span className="text-6xl text-violet-500"> fusion</span>
          </p>
        </h1>
      </div>
    </>
  );
};
export default Heading;
