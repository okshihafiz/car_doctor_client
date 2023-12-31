import { useEffect } from "react";
import { useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  //Service state
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch(`https://car-doctor-server-nine-red.vercel.app/services`)
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  return (
    <div className="mb-14">
      <div className="text-center mx-auto max-w-2xl">
        <h3 className="text-xl font-bold text-[#FF512F]">Services</h3>
        <h2 className="text-5xl font-bold my-4">Our Services</h2>
        <p className="text-[#737373] my-4">
          The majority have suffered alteration in some form, by injected
          humour, or <br /> randomised words which do not look even slightly
          believable.{" "}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
