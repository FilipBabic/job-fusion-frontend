export const checkAuth = async (login, setLoading, logout, navigate, setError) => {
  const currentPath = window.location.pathname;
  setLoading(true);
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
      console.log("RES DATA", resData);
      if (resData.msg !== "no_token") {
        login(resData);
        setLoading(false);
        if (currentPath === "/login") {
          if (resData.role === "head_admins") {
            navigate("/head-admin-dashboard");
          } else if (resData.role === "admins") {
            navigate("/admin-dashboard");
          } else if (resData.role === "recruiters") {
            navigate("/recruiter-dashboard");
          } else if (resData.role === "job_seekers") {
            navigate("/job-seeker-dashboard");
          }
        } else {
          // If user refreshes, take them back to their current path
          navigate(currentPath);
        }
      } else {
        const errorData = await response.json();
        setError(`${errorData.error} : ${errorData.status}`);

        setLoading(false);
        logout();
      }
    }
  } catch (err) {
    setError("err.message");
    logout();
    setLoading(false);
  }
};
