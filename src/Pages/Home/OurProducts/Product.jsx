import { Link } from "react-router-dom";
import Rating from "../../../components/Rating/Rating";
import { FaCartArrowDown } from "react-icons/fa";
// eslint-disable-next-line react/prop-types
const Product = ({ product }) => {
  const { img, title, rating, price } = product || {};

  return (
    <div className="card  bg-white mt-4 shadow-xl">
      <figure className=" relative bg-[#F3F3F3] rounded-lg my-5 mx-5 py-8 px-8">
        <img src={img} className="rounded-xl" />
        <div className="absolute top-10 right-10 bg-white py-3  px-3 rounded-md ">
        {/* link  */}
          <Link to="/">
            <FaCartArrowDown />
          </Link>
        </div>
      </figure>
      <div className="card-body mt-[-10px] items-center text-center">
        <Rating rating={rating} />
        <h2 className="text-xl font-bold text-[#444444]">{title}</h2>
        <p className="text-[#FF3811] font-semibold mt-[-10px]"> ${price}</p>
      </div>
    </div>
  );
};

export default Product;
