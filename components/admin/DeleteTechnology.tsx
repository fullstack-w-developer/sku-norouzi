import { message, Modal } from "antd";
import React from "react";
import { MdOutlineClose } from "react-icons/md";
import fetchClient from "../../utils/fetchClient";
interface Props {
    showDelete: boolean;
    setShowDelete: React.Dispatch<React.SetStateAction<boolean>>;
    info: any;
    itemstechnology: {
        _id: string;
        name: string;
    }[];
    setItemstechnology: React.Dispatch<
        React.SetStateAction<
            {
                name: string;
                _id: string;
            }[]
        >
    >;
    setInfo: React.Dispatch<object>;
}
const DeleteTechnology = ({ showDelete, setShowDelete, itemstechnology, setItemstechnology, info, setInfo }: Props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const onClone = async () => {
        await setInfo({});
        setShowDelete(false);
    };
    const deleteMaster = async () => {
        const filterList = itemstechnology.filter((item) => item._id !== info._id);
        try {
            const { data: deleteItem } = await fetchClient.delete(`/list/technology/delete?id=${info._id}`);

            if (deleteItem.status) {
                await setInfo({});
                setItemstechnology(filterList);
                setShowDelete(false);
                messageApi.open({
                    type: "success",
                    duration: 5,
                    content: "با موفقیت حذف  شد",
                    className: "font-yekanBold",
                });
            }
        } catch (error: any) {
            messageApi.open({
                type: "error",
                duration: 5,
                content: error.response.data.message!,
                className: "font-yekanBold !py-4",
            });
        }
    };
    return (
        <>
            {contextHolder}
            <Modal
                onCancel={onClone}
                centered
                open={showDelete}
                footer={false}
                closeIcon={<MdOutlineClose className="text-gray-600 mr-1" />}
            >
                <div>
                    <h1 className="text-center text-lg text-gray-600 font-yekanBold pt-3">
                        آیا مطمعن هستید که میخواهید این تکنولوژی را حذف کنید؟
                    </h1>
                    <div className="text-cenetr flex items-center justify-center gap-2 text-lg pt-3 font-ExtraBold text-sku">
                        <p>{info.name}</p>
                    </div>
                    <div className="flex justify-center items-center  gap-4 mt-8">
                        <button
                            onClick={onClone}
                            type="button"
                            className="border border-gray-200 w-[100px] font-yekanBold py-2 text-xs rounded-lg"
                        >
                            انصراف
                        </button>
                        <button
                            onClick={deleteMaster}
                            className="bg-blue-500 font-yekanBold w-[100px] text-white text-xs  py-2 rounded-lg"
                        >
                            تائید
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default DeleteTechnology;
