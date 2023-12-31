import { useEffect, useState } from "react";
import useAuth from "../../Firbase/Hook/useAuth";
import BookingRow from "./BookingRow";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import IndicatorHeader from "../../components/IndicatorHeader/IndicatorHeader";

const Bookings = () => {
  //navigate user
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(
      `https://car-doctor-server-nine-red.vercel.app/bookings?email=${user.email}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("car-access-token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setBookings(data);
        } else {
          navigate("/");
        }
      });
  }, [user.email, logOut, navigate]);

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
        fetch(`https://car-doctor-server-nine-red.vercel.app/bookings/${_id}`, {
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
    fetch(`https://car-doctor-server-nine-red.vercel.app/bookings/${_id}`, {
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
    <>
      <IndicatorHeader home="Home" serviceDetails="My Bookigns" />
      <div className="h-screen mt-8">
        <div className="overflow-x-auto  h-full">
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
    </>
  );
};

export default Bookings;
