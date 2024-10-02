import Logo from "../assets/logos/logo-job-fusion-800x160.png";
const Heading = ({ text }) => {
  return (
    <>
      <div className="bg-white py-4">
        <img src={`${Logo}`} className="h-20 mx-auto p-1" alt="Navbar Logo" />
        <h1 className="text-3xl text-center text-gray-800 py-1">{text}</h1>
      </div>
    </>
  );
};
export default Heading;
