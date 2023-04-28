import { Input, Modal, Select, Tooltip, message, Spin, Image } from "antd";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { RiFileZipFill } from "react-icons/ri";
import { useMutation, useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { setRecoil } from "recoil-nexus";
import { editWaitingProperties } from "../../recoil/atom";
import { statusUsers } from "../../utils/data";
import { editPostApi } from "../../utils/fetch/requests";
import fetchClient from "../../utils/fetchClient";
import ReactSelect from "react-select";
import { colourStyles } from "../../utils/styles";
import PreviewVideo from "../PreviewVideo";
import useWaitPostVerify from "../../hooks/useWaitPostVerify";

const initData = {
    user: {
        profile: {
            url: "",
            id: "",
        },
        first_name: "",
        last_name: "",
    },
    file: { url: "", type: "", id: "" },
    zip: { url: "", id: "" },
    technologies: [],
    title: "",
    description: "",
    status: "",
    _id: "",
};
const EditPost = ({ page }: { page: number }) => {
    const [showPre, setShowPre] = useState(false);
    const [list, setList] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();
    const data = useRecoilValue(editWaitingProperties);
    const { refetch } = useWaitPostVerify({ page });
    const [formData, setFormData] = useState(initData);
    const onClose = () =>
        setRecoil(editWaitingProperties, {
            ...data,
            data: initData,
            open: false,
        });

    useEffect(() => {
        setFormData({
            ...formData,
            file: { ...data.data.file },
            zip: data.data.zip,
            technologies: data.data?.technologies,
            title: data.data.title,
            description: data.data.description,
            // @ts-ignore
            status: statusUsers.find((item) => item.value === data.data.status)?.value,
        });
    }, [data]);

    const { mutate, isLoading } = useMutation((dataUpload: any) => editPostApi(dataUpload), {
        onSuccess: () => {
            refetch();
            close();
        },
        onError(err: any) {
            messageApi.open({
                type: "error",
                duration: 5,
                content: err.response.data.message!,
                className: "font-yekanBold !text-xs !py-4",
            });
        },
    });
    const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setFormData({
            ...formData,
            [name]: {
                // @ts-ignore
                url: e.target.files[0],
                // @ts-ignore
                type: e.target.files[0]?.type?.split("/")[0],
            },
        });
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const editPost = async () => {
        const dataUpload = new FormData();
        if (typeof formData.file.url !== "string") {
            dataUpload.append("file", formData.file.url);
            dataUpload.append("fileId", data.data.file.id);
            dataUpload.append("type", formData.file.type);
        }
        if (typeof formData.zip.url !== "string") {
            dataUpload.append("zip", formData.zip.url);
            dataUpload.append("zipId", data.data.zip.id);
        }
        dataUpload.append("title", formData.title);
        dataUpload.append("id", data.data._id);
        dataUpload.append("description", formData.description);

        dataUpload.append("technologies", JSON.stringify(formData.technologies));
        // @ts-ignore
        dataUpload.append("status", formData.status);
        mutate(dataUpload);
    };

    const getList = async () => {
        const { data } = await fetchClient.get("/list/technology");
        setList(data.data.list);
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <>
            {contextHolder}
            <Modal closeIcon={<MdOutlineClose />} centered onCancel={onClose} footer={false} open={data.open}>
                <h1 className="text-center font-yekanBold text-lg text-gray-700">ویرایش و تغیر وضعیت پست</h1>
                <div className="mt-7">
                    <div className="flex items-start border-b pb-3 justify-between w-full">
                        <div className="flex items-center gap-2">
                            <Image src={data.data?.user?.profile.url} alt="" width={60} height={60} className="rounded-full" />
                            <div className="text-xs flex flex-col gap-2 font-yekanBold">
                                <p className="text-[13px] flex gap-1  text-gray-700">
                                    <span>{data.data?.user?.first_name}</span>
                                    <span>{data.data?.user?.last_name}</span>
                                </p>
                                <p className="text-gray-600">دانشجو</p>
                            </div>
                        </div>

                        <div>
                            {formData.file.type === "video" ? (
                                <div
                                    onClick={() => setShowPre(!showPre)}
                                    className="w-full cursor-pointer h-[80px] border font-yekanBold text-white text-[10px] flex justify-center items-center rounded-lg bg-black"
                                >
                                    <p>نمایش ویدیو</p>
                                </div>
                            ) : (
                                <Image
                                    width={80}
                                    height={80}
                                    loading="lazy"
                                    className="object-cover rounded-lg !w-20 !h-20"
                                    src={
                                        typeof formData.file.url === "string"
                                            ? formData.file.url
                                            : URL.createObjectURL(formData.file.url)
                                    }
                                    alt=""
                                />
                            )}
                            <label className={` cursor-pointer mt-1 text-[10px]`} htmlFor="edit-upload-photo-master">
                                تغیر {formData.file.type === "video" ? "ویدیو" : "عکس"} پروژه
                            </label>

                            <input type="file" name="file" id="edit-upload-photo-master" onChange={onChangeFile} />
                        </div>
                    </div>
                    <div className="flex justify-between items-center font-yekanBold mt-3 border-b pb-3 text-gray-700">
                        <p>فایل زیپ</p>
                        <div className="flex flex-col items-center">
                            <Tooltip
                                className="font-yekanBold text-xs"
                                title="برای مشاهده فایل میتوانید بر روی آن کلیک کرده و دانلود نمایید"
                            >
                                <a className="flex gap-1" href={formData.zip.url} download>
                                    {/* @ts-ignore */}
                                    {formData.zip?.url?.name}
                                    <RiFileZipFill size={19} />
                                </a>
                            </Tooltip>

                            <div className={`mt-1`}>
                                <label
                                    className=" border p-1 border-transparent hover:border-gray-400 rounded-md cursor-pointer"
                                    htmlFor="edit-upload-zip-file"
                                >
                                    تغیر فایل پروژه
                                </label>

                                <input
                                    type="file"
                                    name="zip"
                                    id="edit-upload-zip-file"
                                    accept=".zip,.rar,.7zip"
                                    onChange={onChangeFile}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col mt-4 container_form_edit_profile_master">
                        <div className="w-full flex gap-3 container_upload_post">
                            <div className="min-w-[50%] flex-1">
                                <label className="mb-2 block">عنوان</label>
                                <Input value={formData.title} onChange={onChange} name="title" placeholder="عنوان پروژه" />
                            </div>
                            <div className="min-w-[50%] flex-1">
                                <label className="mb-2 block"> فناوری‌ها</label>
                                <ReactSelect
                                    isMulti
                                    isClearable={false}
                                    value={formData.technologies}
                                    placeholder=" "
                                    className="w-full"
                                    styles={colourStyles}
                                    options={list}
                                    getOptionValue={(option: any) => option._id}
                                    getOptionLabel={(option: any) => option.name}
                                    onChange={(value: any) =>
                                        setFormData({
                                            ...formData,
                                            technologies: value,
                                        })
                                    }
                                    noOptionsMessage={() => <span>لیست خالی است</span>}
                                />
                            </div>
                        </div>
                        <div className="w-full mt-3">
                            <label className="mb-2 block">توضیحات</label>
                            <Input.TextArea
                                style={{ height: 120, resize: "none" }}
                                value={formData.description}
                                name="description"
                                className="font-yekanBold text-xs"
                                onChange={onChange}
                                placeholder="توضیحات پروژه"
                            />
                        </div>
                        {router.pathname === "/waitingpost" && (
                            <div className="w-full mt-5">
                                <label className="mb-2 block">تغیر وضعیت</label>
                                <Select
                                    value={formData.status}
                                    onChange={(value: any) =>
                                        setFormData({
                                            ...formData,
                                            status: value,
                                        })
                                    }
                                    className="w-full master_select"
                                >
                                    {statusUsers.map((status: any, index) => (
                                        <Select.Option key={status.value}>
                                            <span className="text-xs font-yekanBold text-gray-500"> {status.label}</span>
                                        </Select.Option>
                                    ))}
                                </Select>
                            </div>
                        )}

                        <div className="flex justify-end mt-6 gap-3">
                            <button onClick={onClose} className="text-xs font-yekanBold  border w-[100px] py-2 rounded-lg">
                                انصراف
                            </button>
                            <button
                                disabled={isLoading ? true : false}
                                onClick={editPost}
                                className="text-xs  loding_white font-yekanBold bg-sku text-white w-[100px]    py-2 rounded-lg"
                            >
                                {isLoading ? <Spin className="mt-[4px]" /> : "ویرایش"}
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
            {showPre && <PreviewVideo open={showPre} setOpen={setShowPre} src={formData.file} />}
        </>
    );
};

export default EditPost;
