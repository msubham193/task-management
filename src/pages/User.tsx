import React, { useEffect, useState } from "react";

const User = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUserDetails({
        name: userData.firstname + userData.lastname,
        email: userData.email,
      });
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h2 className="text-2xl mb-4">User Details</h2>
        <p className="mb-2">
          <strong>Name:</strong> {userDetails.name}
        </p>
        <p>
          <strong>Email:</strong> {userDetails.email}
        </p>
      </div>
    </div>
  );
};

export default User;
