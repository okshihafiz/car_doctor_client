import { useEffect, useState } from "react";
import useAuth from "../../Firbase/Hook/useAuth";
import BookingRow from "./BookingRow";
import Swal from "sweetalert2";

const Bookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/bookings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
      });
  }, [user.email]);

  //Delete single service
  const handleDeleteService = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/bookings/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              // eslint-disable-next-line no-undef
              const remaning = bookings.filter((book) => book._id !== _id);
              setBookings(remaning);
              Swal.fire(
                "Deleted!",
                "Your booked service has been deleted.",
                "success"
              );
            }
          });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire("Cancelled", "Your imaginary service is safe :)", "error");
      }
    });
  };

  //Update status
  const handleBookingConfirm = (_id) => {
    fetch(`http://localhost:5000/bookings/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "confirm" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          const remaining = bookings.filter((booking) => booking._id !== _id);
          const updated = bookings.find((booking) => booking._id === _id);
          updated.status = "confirm";
          const newBookings = [updated, ...remaining];
          setBookings(newBookings);
        }
      });
  };

  return (
    <div className="h-screen">
      <div className="overflow-x-auto h-full">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-[#FF3811]">
              <th>Delete</th>
              <th>Image</th>
              <th>Service</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {bookings.map((booking) => (
              <BookingRow
                key={booking._id}
                booking={booking}
                handleDeleteService={handleDeleteService}
                handleBookingConfirm={handleBookingConfirm}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;