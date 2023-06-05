import { message, Modal, Spin } from "antd";
import { useFormik } from "formik";
import { FaSignLanguage } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import Input from "../user/Input";
import useTechnologyActionMutation from "../../hooks/mutation/actions/useTechnologyActionMutation";
import useGlobalStroe from "../../stores/global-store";

const CreateTechnology = () => {
    const {createTechnology:{info,show},setCreateTechnology} = useGlobalStroe()
    const { isLoading, mutate } = useTechnologyActionMutation()
    const listMasterValues = {
        name: info?.name ? info?.name : "",
    };
    const formik = useFormik({
        initialValues: listMasterValues,
        enableReinitialize: true,
        onSubmit: async (values: any, actions) => {
            if (info?.name) {
                mutate({ data: values, isUpdate: true, id: info?._id })
            } else {
                mutate({ data: values, isUpdate: false, isDelete: false })
            }
        },
    });


    const onClose = ()=>setCreateTechnology({info:null,show:false})
    return (
        <>
            <Modal
                onCancel={onClose}
                footer={false}
                centered
                open={show}
                closeIcon={<MdOutlineClose className="text-gray-600 mr-1" />}
            >
                <div>
                    <h1 className="text-center text-gray-700 font-yekanBold text-lg pt-5">
                        {info?.name ? "ویرایش نام تکنولوژی" : "لطفا نام تکنولوژی را وارد کنید"}
                    </h1>
                    <Spin spinning={isLoading}>
                        <form onSubmit={formik.handleSubmit} className="container_auth !mt-5">
                            <Input
                                input_ltr="ltr"
                                onChange={formik.handleChange}
                                title="نام تکنولوژی"
                                name="name"
                                value={formik.values.name}
                                suffix={<FaSignLanguage className="text-gray-400" size={22} />}
                                status={formik.touched.name && formik.errors.name ? "error" : ""}
                            />

                            <div className="flex justify-end w-[200px] gap-4 mt-8">
                                <button
                                    onClick={onClose}
                                    type="button"
                                    className="border border-gray-200 font-yekanBold w-full py-2 text-xs rounded-lg"
                                >
                                    انصراف
                                </button>
                                <button
                                    disabled={isLoading ? true : false}
                                    className="bg-blue-500 font-yekanBold text-white text-xs w-full py-2 rounded-lg"
                                >
                                    تائید
                                </button>
                            </div>
                        </form>
                    </Spin>
                </div>
            </Modal>
        </>
    );
};

export default CreateTechnology;
