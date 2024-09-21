import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
const JobSeekerDashboard = () => {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);
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
          setProfile(resData);
        }
      } catch (error) {
        setError(error);
      }
    };
    getUserProfile();
  }, []);
  return (
    <PageLayout>
      <h1>{profile.email} WELCOME TO JOB SEEKER DASHBOARD</h1>
      {console.log("PROFILE IS ", profile.email)}
      {console.log("PROFILE IS TYPE: ", typeof profile)}
    </PageLayout>
  );
};
export default JobSeekerDashboard;
