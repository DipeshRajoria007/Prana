import { FaUserShield, FaHandHoldingHeart } from "react-icons/fa";

import { RiHealthBookFill, RiLoginBoxFill } from "react-icons/ri";
function Benifits() {
  return (
    <div className="mt-10">
      <p className="text-center text-5xl font-bold ">Why PRANA?🤔</p>
      <div className="grid ">
        <div className="relative grid w-full gap-4 text-3xl  text-blackk md:grid-cols-3  ">
          <div className="absolute bottom-[50%] right-[50%] -z-10 h-[550px] w-[550px] translate-x-[50%] translate-y-[50%] bg-greenn opacity-40 blur-[80px] "></div>
          <div className="col-span-2 mt-16 flex w-full items-center justify-center gap-6 place-self-end rounded-lg bg-white p-8 md:mt-0 md:h-[220px] ">
            <FaUserShield className="text-[5rem]" />
            <p>Unique & Trustable Identity</p>
          </div>
          <div className="flex w-full flex-col items-center justify-end gap-6 rounded-lg bg-white p-8 text-center md:h-[400px] ">
            <FaHandHoldingHeart className="text-[5rem]" />
            <p>Unified Benefits</p>
          </div>
          <div className="flex  w-full flex-col items-center  justify-start gap-6 place-self-start rounded-lg  bg-white p-8 text-center md:h-[400px] ">
            <RiLoginBoxFill className="text-[5rem] font-black " />
            <p>Easy PHR Sign Up</p>
          </div>
          <div className="col-span-2  flex w-full items-center justify-center gap-6 place-self-start rounded-lg bg-white p-8 md:h-[220px] ">
            <RiHealthBookFill className="text-[5rem]" />
            <p>Hasle Free Access</p>
          </div>
        </div>
        {/* <div></div> */}
      </div>
    </div>
  );
}

export default Benifits;
