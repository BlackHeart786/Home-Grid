import PropTypes from "prop-types";
import logo from "../assets/logo_home.png";

function Experts({ onGetStartedClick }) {
  return (
    <div className="max-w-[1240px] mx-auto my-2.5 md:grid grid-cols-2">
      <div className="col-span-1 md:w-[40%]">
        <img src={logo} alt="Logo" className="inline" />
      </div>
      <div className="col-span-1 flex flex-col justify-center">
        <h1 className="font-bold text-[#00df9a] text-3xl m-3">GRID</h1>
        <p className="m-2 text-justify text-black">
          Welcome to GRIDE, your ultimate destination for unlocking creativity
          and mastering new skills! Dive into our dynamic courses where you'll
          explore the art of drawing with hands-on tutorials, unleash your
          creative potential through innovative projects, and gain proficiency
          in coding with step-by-step guidance.
        </p>
        <div>
          <span className="text-[#3333b0] font-bold">Click here</span>
          <button
            onClick={onGetStartedClick}
            className="w-[150px] h-[50px] bg-[#a531af] text-white font-bold p-3 rounded-lg m-3 hover:bg-[#3f61da] hover:scale-110 transition-transform duration-100 animate-pulse"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

Experts.propTypes = {
  onGetStartedClick: PropTypes.func.isRequired,
};

export default Experts;
