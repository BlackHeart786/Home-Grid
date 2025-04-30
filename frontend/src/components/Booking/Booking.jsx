import React, { useState } from "react";

function Booking() {
  const bookingsData = [
    { id: "B001", location: "New York", status: "pending" },
    { id: "B002", location: "Los Angeles", status: "approved" },
    { id: "B003", location: "Chicago", status: "denied" },
  ];

  const [bookings, setBookings] = useState(bookingsData);

  const handleStatusChange = (id, newStatus) => {
    const updated = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    setBookings(updated);
  };

  const filteredBookings = (status) =>
    bookings.filter((booking) => booking.status === status);

  const renderBookingCard = (booking) => (
    <div
      key={booking.id}
      className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Booking ID: {booking.id}
      </h3>
      <p className="text-gray-700 dark:text-gray-300">
        Location: {booking.location}
      </p>
      <div className="mt-2 space-x-2">
        <button
          onClick={() => handleStatusChange(booking.id, "approved")}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
        >
          Approve
        </button>
        <button
          onClick={() => handleStatusChange(booking.id, "pending")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
        >
          Pending
        </button>
        <button
          onClick={() => handleStatusChange(booking.id, "denied")}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Deny
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Booking Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["approved", "pending", "denied"].map((status) => (
          <div key={status}>
            <h2 className="text-xl font-semibold mb-4 capitalize text-gray-700 dark:text-gray-200">
              {status}
            </h2>
            {filteredBookings(status).map(renderBookingCard)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Booking;
