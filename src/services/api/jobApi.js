export const fetchJobById = async (id) => {
  const response = await fetch(`http://localhost:5000/api/jobs/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`${errorData.error} : ${errorData.status}`);
  }
  return response.json();
};

export const fetchJobs = async (id) => {
  const response = await fetch(`http://localhost:5000/api/jobs`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`${errorData.error} : ${errorData.status}`);
  }
  return response.json();
};
