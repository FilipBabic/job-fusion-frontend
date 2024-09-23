import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const validateInput = () => {
    if (email.trim() === "") {
      setError("Email field is required"); // Set error if input is empty
      return false;
    }
    if (password.trim() === "") {
      setError("Password field is required"); // Set error if input is empty
      return false;
    }
    setError(""); // Clear error if valid
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (validateInput()) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        console.log("TOKEN", token);
        console.log("userCredential.user", userCredential.user);
        // Send token to backend
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const resData = await response.json();
          if (resData.role === "head_admins") {
            await login(resData);
            navigate("/head-admin-dashboard");
          } else if (resData.role === "admins") {
            await login(resData);
            navigate("/admin-dashboard");
          } else if (resData.role === "recruiters") {
            await login(resData);
            navigate("/recruiter-dashboard");
          } else if (resData.role === "job_seekers") {
            await login(resData);
            navigate("/job-seeker-dashboard");
          }
        } else {
          alert("Login failed: Invalid TOKEN");
        }
      } catch (error) {
        setError(error.message);
        console.log("Firebase login error: " + error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-fuchsia-600 to-violet-700">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-violet-600">Login</h2>
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
        <Button buttonType="submit">Login</Button>
        {error && <p className="py-1 text-red-500 text-xs text-center italic">{error}</p>}
        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-violet-600 font-medium hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Login;
