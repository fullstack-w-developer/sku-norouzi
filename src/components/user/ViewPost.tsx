import Image from "next/image";
import React, { useState } from "react";

const ViewPost = () => {
    return (
        <>
            <div className="!bg-white p-1 h-fit shadow-md border border-gray-100 rounded-lg">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 ">
                        <Image
                            src="https://farzanehnorouzi.ir/wp-content/uploads/2022/09/20220605_203404-e1663798913688-560x560.jpg"
                            alt=""
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <div className="text-xs flex flex-col gap-2">
                            <p className="text-[13px] text-gray-700">پگاه نوروزی</p>
                            <p className="text-gray-600">دانشجو</p>
                        </div>
                    </div>
                </div>

                <div className="w-full relative h-[250px] mt-2 ">
                    <Image
                        fill
                        alt=""
                        className="object-cover"
                        src="https://farzanehnorouzi.ir/wp-content/uploads/2022/09/20220605_203404-e1663798913688-560x560.jpg"
                    />
                </div>
            </div>
        </>
    );
};

export default ViewPost;
