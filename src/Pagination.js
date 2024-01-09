import React, { useState, useEffect } from "react";
import axios from "axios";

const rowsPerPage = 10;

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setMembers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate total number of pages
  const totalPages = Math.ceil(members.length / rowsPerPage);

  // Function to display data for current page
  const displayData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentPageData = members.slice(startIndex, endIndex);
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((member, index) => (
            <tr key={index}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Handlers for previous and next page buttons
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="pagination-container">
      <h1>Employee Data Table</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="data-container">
            {/* Display data for current page */}
            {displayData()}
          </div>
          <div className="pagination-buttons">
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>{currentPage}</span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
