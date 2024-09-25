import { useState, useEffect } from "react";
import OrganizationCard from "./OrganizationCard";

const PaginatedComponent = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2); // Default for mobile

  // Adjust itemsPerPage based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 640) {
        // Mobile screens
        setItemsPerPage(1); // 1 item per row on mobile
      } else if (screenWidth >= 640 && screenWidth < 1024) {
        // Small to medium screens
        setItemsPerPage(1); // 2 items per row on tablets
      } else {
        // Large screens
        setItemsPerPage(1); // 4 items per row on desktop
      }
    };

    // Call function on initial load and on window resize
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const handleNext = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedData = data.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto min-h-full ">
        <div className="w-full flex">
          {paginatedData.map((item) => {
            return (
              <div key={item.id} className="w-full p-2">
                {/* Your component */}
                <OrganizationCard
                  key={item.id}
                  name={item.name}
                  about={item.about}
                  industry={item.industry}
                  type={item.type}
                  country={item.country}
                  city={item.city}
                  address={item.address}
                  email={item.email}
                  website={item.website}
                  logo={item.logo}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-violet-700 text-white rounded disabled:bg-violet-300"
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-violet-700 text-white rounded disabled:bg-violet-300"
          disabled={currentPage >= Math.ceil(data.length / itemsPerPage) - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedComponent;
