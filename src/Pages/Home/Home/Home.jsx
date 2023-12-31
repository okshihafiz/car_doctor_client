import About from "../About/About";
import Banner from "../Banner/Banner";
import Hotline from "../Hotline/Hotline";
import OurProducts from "../OurProducts/OurProducts";
import OurTeam from "../OurTeam/OurTeam";
import Services from "../Services/Services";

const Home = () => {
  return (
    <div>
      <Banner />
      <About />
      <Services />
      <Hotline />
      <OurProducts />
      <OurTeam />
    </div>
  );
};

export default Home;
