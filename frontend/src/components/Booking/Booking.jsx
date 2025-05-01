import React, { useState } from "react";

function Booking() {
  const initialBookings = [
    { id: "B001", location: "Delhi", status: "pending" },
    { id: "B002", location: "Mumbai", status: "approved" },
    { id: "B003", location: "Pune", status: "denied" },
  ];

  const [bookings, setBookings] = useState(initialBookings);

  const handleStatusChange = (id, newStatus) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
  };

  return (
    <div className="w-full min-h-screen px-6 py-12 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">
        My Bookings
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Booking ID: {booking.id}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Location: {booking.location}
                </p>
              </div>
              <span
                className={`mt-2 md:mt-0 px-4 py-1 rounded-full text-sm font-medium w-fit ${
                  booking.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : booking.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {booking.status}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <button
                onClick={() => handleStatusChange(booking.id, "approved")}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusChange(booking.id, "pending")}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
              >
                Pending
              </button>
              <button
                onClick={() => handleStatusChange(booking.id, "denied")}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
              >
                Deny
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Booking;
