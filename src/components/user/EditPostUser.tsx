import { Input, Modal, Tooltip, Image, message } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { RiFileZipFill } from "react-icons/ri";
import { useQuery } from "react-query";
import { typePost } from "../../tying";
import { getPostUserProfile } from "../../utils/fetch/requests";
import fetchClient from "../../utils/fetchClient";
import { colourStyles } from "../../utils/styles";
import ReactSelect from "react-select";
import PreviewVideo from "../PreviewVideo";

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    post: typePost;
    status: string;
    setDataProject: any;
}
const EditPostUser = ({ post, open, setOpen, status, setDataProject }: Props) => {
    const [showPre, setShowPre] = useState(false);
    const [list, setList] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [formData, setFormData] = useState<any>({
        file: { url: "" },
    });
    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        console.log("pegah", post);
        if (Object.keys(post).length !== 0) {
            setFormData({
                ...formData,
                file: {
                    url: post?.file.url,
                    type: post?.file.type,
                    id: post?.file?.id,
                },
                zip: {
                    url: post?.zip.url,
                    id: post?.zip?.id,
                },
                // @ts-ignore
                technologies: post?.technologies,
                title: post?.title,
                description: post?.description,
            });
        }
    }, [post]);
    const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            // @ts-ignore
            file: {
                // @ts-ignore
                data: e.target.files[0],
                // @ts-ignore
                type: e.target.files[0]?.type?.split("/")[0],
            },
        });
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const editPost = async () => {
        const dataUpload = new FormData();
        if (typeof formData.file.url !== "string") {
            dataUpload.append("file", formData.file.url);
            dataUpload.append("fileId", post.file.id);
            dataUpload.append("type", formData.file.type);
        }
        if (typeof formData.zip.url !== "string") {
            dataUpload.append("zip", formData.zip.url);
            dataUpload.append("ZipId", post.zip.id);
        }
        dataUpload.append("title", formData.title);
        dataUpload.append("id", post._id);
        dataUpload.append("description", formData.description);
        // @ts-ignore
        dataUpload.append("technologies", JSON.stringify(formData.technologies));
        // @ts-ignore
        dataUpload.append("status", "editing");

        try {
            const { data: res } = await fetchClient.put(`/masters/mystudents`, dataUpload);

            if (res.status) {
                refetch();
                messageApi.open({
                    type: "success",
                    duration: 5,
                    content: "پست با موفقیت آپدیت شد",
                    className: "font-yekanBold !text-xs !py-4",
                });
                setOpen(!open);
            }
        } catch (error: any) {
            messageApi.open({
                type: "error",
                duration: 5,
                content: error.response.data.message!,
                className: "font-yekanBold !text-xs !py-4",
            });
        }
    };

    const { refetch } = useQuery(
        ["request__posts"],
        () =>
            getPostUserProfile({
                url: `/myproject?skip=1&status=${status}`,
            }),
        {
            enabled: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            retry: 2,
            onSuccess: ({ data }) => {
                setDataProject({
                    posts: data.data[0].paginatedResults,
                    total: data.data[0].totalCount[0].Total,
                });
            },
        }
    );

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
            <Modal
                centered
                onCancel={onClose}
                footer={false}
                open={open}
                closeIcon={<MdOutlineClose className="text-gray-600 mr-1" />}
            >
                <h1 className="text-center font-yekanBold text-lg text-gray-700">ویرایش پست</h1>
                <div className="mt-7">
                    <div className="flex items-start border-b pb-3 justify-between w-full">
                        <div className="flex items-center gap-2 ">
                            <Image src={post.user?.profile?.url} alt="" width={40} height={40} className="rounded-full" />
                            <div className="text-xs flex flex-col gap-2 font-yekanBold">
                                <p className="text-[13px] flex gap-1  text-gray-700">
                                    <span>{post.user?.first_name}</span>
                                    <span>{post.user?.last_name}</span>
                                </p>
                                <p className="text-gray-600">دانشجو</p>
                            </div>
                        </div>

                        <div>
                            <div>
                                {formData?.file?.type === "video" ? (
                                    <div
                                        onClick={() => setShowPre(!showPre)}
                                        className="w-full cursor-pointer h-[80px] border font-yekanBold text-white text-[10px] flex justify-center items-center rounded-lg bg-black"
                                    >
                                        <p>نمایش ویدیو</p>
                                    </div>
                                ) : (
                                    <Image
                                        className="object-cover rounded-lg !w-20 !h-20"
                                        src={
                                            typeof formData?.file?.url === "string"
                                                ? formData?.file?.url
                                                : URL.createObjectURL(formData?.file?.url)
                                        }
                                        alt=""
                                    />
                                )}

                                <input type="file" name="image" id="edit-upload-photo-master" onChange={onChangeImage} />
                            </div>
                            <label className={` cursor-pointer mt-1`} htmlFor="edit-upload-photo-master">
                                تغیر {formData?.file?.type === "video" ? "ویدیو" : "عکس"} پروژه{" "}
                            </label>

                            <input
                                type="file"
                                name="image"
                                id="edit-upload-photo-master"
                                accept=".png, .jpg, .jpeg, .webp"
                                onChange={onChangeImage}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center font-yekanBold mt-3 border-b pb-3 text-gray-700">
                        <p>فایل زیپ</p>
                        <div className="flex flex-col items-center">
                            <Tooltip
                                className="font-yekanBold text-xs"
                                title="برای مشاهده فایل میتوانید بر روی آن کلیک کرده و دانلود نمایید"
                            >
                                <a className="flex gap-1" href={formData?.zip?.url} download>
                                    {/* @ts-ignore */}
                                    {formData?.zip?.name}
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
                                    onChange={onChangeImage}
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
                                onChange={onChange}
                                placeholder="توضیحات پروژه"
                            />
                        </div>

                        <div className="flex justify-end mt-6 gap-3">
                            <button onClick={onClose} className="text-xs font-yekanBold  border px-4 py-2 rounded-lg">
                                انصراف
                            </button>
                            <button onClick={editPost} className="text-xs font-yekanBold bg-sku text-white px-4 py-2 rounded-lg">
                                ویرایش
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
            {showPre && <PreviewVideo open={showPre} setOpen={setShowPre} src={formData.file} />}
        </>
    );
};

export default EditPostUser;
