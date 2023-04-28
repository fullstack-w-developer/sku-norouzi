import { useState } from "react";
import SideBarMenu from "../components/user/Layout/SideBarMenu";
import Steps from "../components/user/newpost/Steps";
import StepOne from "../components/user/newpost/StepOne";
import StepTwo from "../components/user/newpost/StepTwo";
import StepThree from "../components/user/newpost/StepThree";
import { message } from "antd";
import { GetServerSideProps } from "next";
import fetchClient from "../utils/fetchClient";
import CreateTechnology from "../components/admin/CreateTechnology";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atom";
import Head from "next/head";

const NewPost = ({ masters = [] }: any) => {
    const [showTechnology, setShowTechnology] = useState(false);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        file: null,
        title: "",
        technologies: [] as any,
        zip: null,
        master: "",
        description: "",
    });
    const [step, setStep] = useState(0);
    const [messageApi, contextHolder] = message.useMessage();
    const userInfo = useRecoilValue(userState);
    const onSubmit = async (e: any) => {
        e.preventDefault();
        if(!formData.file || !formData.zip || formData.technologies.length===0 || !formData.title || !formData.master){
            return null
        }
        const form = new FormData();
        form.append("file", formData.file!);
        form.append("zip", formData.zip!);
        form.append("master", formData.master);
        form.append("title", formData.title);
        form.append(
            "type",
            // @ts-ignore
            formData?.file?.type?.split("/")[0]
        );
        form.append("technologies", JSON.stringify(formData.technologies!));
        form.append("description", formData.description!);
        form.append(
            "student",
            // @ts-ignore
            userInfo.role === "USER" ? true : false
        );
        setLoading(true);

        try {
            const { data } = await fetchClient.post("/post/add", form);
            if (data.status) {
                setStep((prev) => prev + 1);
            }
            setLoading(false);
        } catch (error: any) {
            messageApi.open({
                type: "error",
                duration: 5,
                content: error.response.data.message!,
                className: "font-yekanBold !text-xs",
            });
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>دانشگاه شهر کرد | پست جدید</title>
            </Head>
            {contextHolder}
            <SideBarMenu>
                <div className="m-5 flex justify-between items-center">
                    <div className="flex gap-3 font-ExtraBold  items-center">
                        <div className="w-3 h-3 rounded-full bg-sku"></div>
                        <p>پست جدید</p>
                    </div>
                    {userInfo.role !== "USER" && (
                        <div className="w-fit">
                            <button
                                onClick={() => setShowTechnology(!showTechnology)}
                                className="bg-sku text-white text-xs px-2 py-2 rounded-lg"
                            >
                                تعریف فناوری جدید
                            </button>
                        </div>
                    )}
                </div>
                <div className="w-full mt-20">
                    <Steps step={step} />

                    {/* step one */}
                    {step === 0 && <StepOne setFormData={setFormData} formData={formData} setStep={setStep} />}
                    {step === 1 && (
                        <StepTwo
                            showTechnology={showTechnology}
                            onSubmit={onSubmit}
                            setFormData={setFormData}
                            formData={formData}
                            masters={masters}
                            setStep={setStep}
                            loading={loading}
                        />
                    )}
                    {step === 2 && <StepThree />}
                </div>
            </SideBarMenu>
            <CreateTechnology show={showTechnology} setShow={setShowTechnology} />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const token = ctx.req.cookies["token"];
    if (!token) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    const res = await fetch(`${process.env.BASEURL}/masters`, {
        headers: {
            Authorization: token!,
        },
    });
    const result = await res.json();
    return {
        props: {
            masters: result?.data?.masters,
        },
    };
};

export default NewPost;