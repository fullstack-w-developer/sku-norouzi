import React from "react";
import { BsImage } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { TbFileDescription } from "react-icons/tb";

const Steps = ({ step }: { step: number }) => {
    return (
        <div className=" !max-w-[70%] flex justify-center items-center lg:w-[50%] mx-auto relative">
            <div className="w-full flex justify-between items-center -mr-10">
                <div className={`w-full h-1 flex relative  ${step === 1 || step === 2 ? "bg-sku" : "bg-gray-300"}`}>
                    <div
                        className={` w-12 h-12 absolute -top-6 rounded-full flex items-center justify-center  text-white bg-sku`}
                    >
                        <BsImage size={18} />
                    </div>
                </div>
                <div className={`w-full relative h-1 ${step === 2 ? "bg-sku" : "bg-gray-300"}`}>
                    <div
                        className={` w-12 h-12 absolute -top-6 rounded-full flex items-center justify-center text-white ${
                            step === 1 || step === 2 ? "bg-sku" : "bg-gray-300"
                        }`}
                    >
                        <TbFileDescription size={26} />
                    </div>
                </div>
                <div className=" h-1 relative">
                    <div
                        className={` w-12 h-12 absolute -top-6 rounded-full flex items-center justify-center text-white ${
                            step === 2 ? "bg-sku" : "bg-gray-300"
                        }`}
                    >
                        <GiCheckMark size={22} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Steps;
