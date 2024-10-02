export const fetchOrganizations = async (id) => {
  const response = await fetch(`http://localhost:5000/api/organizations`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`${errorData.error} : ${errorData.status}`);
  }
  return response.json();
};
