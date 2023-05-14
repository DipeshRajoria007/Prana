import { FaUserShield, FaHandHoldingHeart } from "react-icons/fa";

import { RiHealthBookFill, RiLoginBoxFill } from "react-icons/ri";
function Benifits() {
  return (
    <div className="mt-10">
      <p className="text-center text-5xl font-bold ">Why PRANA?🤔</p>
      <div className="grid ">
        <div className="relative grid w-full grid-cols-3 gap-4  text-3xl text-blackk  ">
          <div className="absolute bottom-[50%] right-[50%] -z-10 h-[550px] w-[550px] translate-x-[50%] translate-y-[50%] bg-greenn opacity-40 blur-[80px] "></div>
          <div className="col-span-2 flex h-[220px] w-full  items-center justify-center gap-6 place-self-end rounded-lg bg-white p-8 ">
            <FaUserShield className="text-[5rem]" />
            <p>Unique & Trustable Identity</p>
          </div>
          <div className="flex h-[400px] w-full flex-col items-center justify-end gap-6 rounded-lg bg-white p-8 text-center ">
            <FaHandHoldingHeart className="text-[5rem]" />
            <p>Unified Benefits</p>
          </div>
          <div className="flex  h-[400px] w-full flex-col  items-center justify-start gap-6 place-self-start  rounded-lg bg-white p-8 text-center ">
            <RiLoginBoxFill className="text-[5rem] font-black " />
            <p>Easy PHR Sign Up</p>
          </div>
          <div className="col-span-2  flex h-[220px] w-full items-center justify-center gap-6 place-self-start rounded-lg bg-white p-8 ">
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
