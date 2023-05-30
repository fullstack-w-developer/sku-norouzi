import { Alert, Modal } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const NotfiSignup = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (router.query?.new) {
            setOpen(!open);
            router.replace("/");
        }
    }, [router.query]);
    return (
        <Modal onCancel={() => setOpen(!open)} centered footer={false} open={open}>
            <div className="py-10">
                <h1 className="font-ExtraBold text-center mb-10 text-lg text-gray-700">ثبت نام شما با موفقیت انجام شد</h1>
                <Alert
                    message={
                        <span className="font-yekanBold">
                            *توجه داشته باشید، ویژگی های سایت بعد از تائید ادمین برای شما فعال خواهد شد
                        </span>
                    }
                    type="warning"
                />
            </div>
        </Modal>
    );
};

export default NotfiSignup;
