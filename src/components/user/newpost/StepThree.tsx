import React from "react";
import { Result } from "antd";
import { useRouter } from "next/router";

const StepThree = () => {
    const router = useRouter();
    return (
        <div className="mt-10 mr-12">
            <Result
                status="success"
                className="font-ExtraBold"
                title="پست شما با موفقیت آپلود شد"
                subTitle="در نظر داشته باشید پست شما بعد از تائید استاده مربوطه در صحفه اصلی قرار خواهد گرفت"
                extra={
                    <button
                        onClick={() => router.push("/")}
                        key="btn_result"
                        className="bg-sku text-white px-10 py-3 mt-5 rounded-lg"
                    >
                        متوجه شدم
                    </button>
                }
            />
        </div>
    );
};

export default StepThree;
