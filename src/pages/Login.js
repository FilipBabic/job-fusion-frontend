import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

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
      console.log("Firebase login error: " + error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-fuchsia-600 to-violet-700">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-violet-600">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            className="mt-1 p-2 border w-full rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            className="mt-1 p-2 border w-full rounded-md"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition duration-300"
        >
          Login
        </button>
        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-violet-600 font-medium hover:underline">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};
export default Login;
