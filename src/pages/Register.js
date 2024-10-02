import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useLocation } from "react-router-dom";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state || {};

  const [error, setError] = useState(null);

  const validateInput = () => {
    if (email.trim() === "") {
      setError("Email field is required");
      return false;
    }
    if (password.trim() === "") {
      setError("Password field is required");
      return false;
    }

    if (role !== "recruiters" && role !== "job_seekers") {
      setError(`${role} is not allowed for user registration`);
      return false;
    }
    setError(""); // Clear error if valid
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (validateInput()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("userCredential", userCredential);
        const { uid } = userCredential.user;

        const response = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid, email, role }),
        });

        if (response.ok) {
          navigate("/registration-successful");
        } else {
          const errorData = await response.json();
          throw new Error(`${errorData.error} : ${errorData.status}`);
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
        console.log("ERO", err);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-fuchsia-600 to-violet-700">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-violet-600">
          Register as {role && role.slice(0, -1)}
        </h2>
        <div className="mb-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              placeholder="Enter your email"
              value={email}
              className="mt-1 p-2 border w-full rounded-md"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              className="mt-1 p-2 border w-full rounded-md"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <Button buttonType="submit">Register</Button>
        {error && <p className="py-1 text-red-500 text-xs text-center italic">{error}</p>}
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-violet-600 font-medium hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
