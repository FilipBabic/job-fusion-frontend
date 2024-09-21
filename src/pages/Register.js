import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const Register = ({ role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (role !== "recruiters" && role !== "job_seekers") {
      return alert(`${role} is not allowed for user registration`);
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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
        alert(`User registered successfully in ${role}`);
      } else {
        console.log("THIS IS RESPONSE", response);
        alert("Error registering user", response.error);
      }
    } catch (error) {
      alert("Firebase registration error: " + error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-fuchsia-600 to-violet-700">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-violet-600">
          Register as {role.slice(0, -1)}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            className="mt-1 p-2 border w-full rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
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
          Register
        </button>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-violet-600 font-medium hover:underline"
          >
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
