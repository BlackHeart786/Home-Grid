import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure axios is installed

function Details() {
  const [roomDetails, setRoomDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace this URL with your actual backend API endpoint
    axios
      .get("https://your-backend-api.com/api/room-details")
      .then((response) => {
        setRoomDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching room details:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-300">
        Loading room details...
      </div>
    );
  }

  if (!roomDetails) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load room details.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-12 px-8 py-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Room Image */}
        <div>
          <img
            src={roomDetails.image}
            alt="Room"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Room Details */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Room Details
          </h2>

          <p className="text-lg text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Location:</span>{" "}
            {roomDetails.location}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Room Type:</span> {roomDetails.type}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Price:</span> {roomDetails.price}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Description:</span>{" "}
            {roomDetails.description}
          </p>

          <div className="mt-6 flex space-x-6">
            <button className="flex items-center justify-between px-6 py-3 text-white font-bold text-lg rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-pink-600 shadow-lg hover:opacity-90 transition duration-300">
              BOOK NOW
              <span className="ml-3 bg-white rounded-full p-2 text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </button>

            <button className="flex items-center justify-between px-6 py-3 text-white font-bold text-lg rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg hover:opacity-90 transition duration-300">
              CHART NOW
              <span className="ml-3 bg-white rounded-full p-2 text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
