import { useQuery } from "@tanstack/react-query";
import { fetchOrganizations } from "../services/api/organizationApi";
import PaginatedComponent from "../components/PaginatedComponent";
import PageLayout from "../components/PageLayout";
import LoadingScreen from "./LoadingScreen";
import ErrorPage from "./ErrorPage";

const Organizations = () => {
  const {
    data: allOrganizations,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["allOrganizations"],
    queryFn: () => fetchOrganizations(),
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Cache for 30 minutes
  });

  if (isLoading) return <LoadingScreen />;
  if (error)
    return (
      <ErrorPage
        errorCode={`${error.message.split(" : ")[1]}`}
        errorMessage={`error: ${error.message.split(" : ")[0]}`}
      />
    );

  return (
    <PageLayout text="See organizations with job advertisements:">
      {allOrganizations.length > 0 && <PaginatedComponent data={allOrganizations} />}
    </PageLayout>
  );
};
export default Organizations;
