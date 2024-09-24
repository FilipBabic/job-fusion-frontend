import { Link } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
const ErrorPage = ({ errorCode, errorMessage }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          <ExclamationCircleIcon className="mx-auto h-16 w-16 text-red-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{errorCode}</h2>
          <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
        </div>

        <div className="mt-8">
          <Link
            to="/"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition duration-300"
          >
            Go Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
