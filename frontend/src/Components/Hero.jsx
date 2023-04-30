import HeroLogo from "../assets/Hero.svg";
const Hero = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="mt-28 flex flex-col gap-4 text-5xl  ">
        <p className="text-[2rem]">
          Establishing India's Digital Health Ecosystem
        </p>
        <p className=" font-bold ">PRANA - A Pledge To Life</p>
        <p className="text-3xl">Key to your digital healthcare journey</p>
      </div>
      <div>
        <img src={HeroLogo} alt="Hero Img" className="drop-shadow-2xl" />
      </div>
    </div>
  );
};

export default Hero;
