import { Link } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const RegistrationSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Registration Successful!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Your account has been created successfully. Please log in to explore new features.
          </p>
        </div>

        <div className="mt-8">
          <Link
            to="/login"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition duration-300"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
