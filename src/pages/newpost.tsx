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
import useAddPostMutation from "../hooks/mutation/post/useAddPostMutation";
import useGlobalStroe from "../stores/global-store";
import { successToast } from "../helpers/utils/error";
import useAuthStore from "../stores/auth-store";

const NewPost = () => {
    const [step, setStep] = useState(0);
    const { mutate, isLoading } = useAddPostMutation({setState:setStep})
    const {user} = useAuthStore()
    const  {setCreateTechnology} = useGlobalStroe()
    const [formData, setFormData] = useState({
        file: null,
        title: "",
        technologies: [] as any,
        zip: null,
        master: "",
        description: "",
        student:user?.role === "USER" ? true : false
    });
    const userInfo = useRecoilValue(userState);
    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (!formData.file || !formData.zip || formData.technologies.length === 0 || !formData.title || !formData.master) {
           successToast("لطفا تمام فیلد ها را پر کنید")
        }
        mutate(formData)
    };

    return (
        <>
            <Head>
                <title>دانشگاه شهر کرد | پست جدید</title>
            </Head>
            <SideBarMenu>
                <div className="m-5 flex justify-between items-center">
                    <div className="flex gap-3 font-ExtraBold  items-center">
                        <div className="w-3 h-3 rounded-full bg-sku"></div>
                        <p>پست جدید</p>
                    </div>
                    {user?.role !== "USER" && (
                        <div className="w-fit">
                            <button
                                onClick={()=>setCreateTechnology({info:null,show:true})}
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
                            onSubmit={onSubmit}
                            setFormData={setFormData}
                            formData={formData}
                            setStep={setStep}
                            loading={isLoading}
                        />
                    )}
                    {step === 2 && <StepThree />}
                </div>
            </SideBarMenu>
            <CreateTechnology  />
        </>
    );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     const token = ctx.req.cookies["token"];
//     if (!token) {
//         return {
//             redirect: {
//                 destination: "/",
//                 permanent: false,
//             },
//         };
//     }
//     const res = await fetch(`${process.env.BASEURL}/masters`, {
//         headers: {
//             Authorization: token!,
//         },
//     });
//     const result = await res.json();
//     return {
//         props: {
//             masters: result?.data?.masters,
//         },
//     };
// };

export default NewPost;
