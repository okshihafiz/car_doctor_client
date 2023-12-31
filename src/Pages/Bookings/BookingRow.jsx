// eslint-disable-next-line react/prop-types
const BookingRow = ({ booking, handleDeleteService, handleBookingConfirm }) => {
  const { _id, img, price, date, title, status } = booking || {};
  return (
    <tr>
      <th>
        <button
          onClick={() => handleDeleteService(_id)}
          className="btn btn-sm btn-circle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={img} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
        </div>
      </td>
      <td>
        <div>
          <div className="font-bold">{title}</div>
        </div>
      </td>
      <td className="font-bold">{price}</td>
      <td>{date}</td>
      <th>
        {
          // eslint-disable-next-line no-constant-condition
          status === "confirm" ? (
            <span className="text-green font-bold">Confirm</span>
          ) : (
            <button
              onClick={() => handleBookingConfirm(_id)}
              className="btn btn-ghost btn-xs"
            >
              Please Confirm
            </button>
          )
        }
      </th>
    </tr>
  );
};

export default BookingRow;
