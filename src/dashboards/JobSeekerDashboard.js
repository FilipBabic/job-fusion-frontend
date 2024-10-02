import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import { AuthContext } from "../context/AuthContext";
const JobSeekerDashboard = () => {
  const [profile, setProfile] = useState({});
  const { user, login, logout } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/job-seekers/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const resData = await response.json();
          login(resData);
        }
      } catch (error) {
        setError(error);
      }
    };

    const checkAuth = async () => {
      console.log("PROSLO");
      try {
        const response = await fetch("http://localhost:5000/api/auth/check", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (response.ok) {
          const resData = await response.json();

          console.log("DATA SUCCESSS test", resData);
          login(resData);
          navigate("/job-seeker-dashboard");
        }
      } catch (error) {
        console.error("User is not authenticated");
        logout();
        return null;
      }
    };
    //checkAuth();
    // getUserProfile();
  }, []);

  return (
    <PageLayout>
      <h1>{profile.email} WELCOME TO JOB SEEKER DASHBOARD created at:</h1>
      {console.log("PROFILE IS ", profile.email)}
      {console.log("PROFILE IS TYPE: ", typeof profile)}
      {user && <p>SPORTSKI POZDRAV vi ste ulogovvani</p>}
      {user.role && <p>OVO JE USER ROLE{user.role}</p>}
    </PageLayout>
  );
};
export default JobSeekerDashboard;
