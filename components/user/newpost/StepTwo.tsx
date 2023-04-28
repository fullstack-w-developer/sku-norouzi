import { Input, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { BsFileZipFill } from "react-icons/bs";
import fetchClient from "../../../utils/fetchClient";
import ReactSelect from "react-select";
import { colourStyles } from "../../../utils/styles";
interface Props {
    setStep: React.Dispatch<React.SetStateAction<number>>;
    masters: {}[];
    setFormData: React.Dispatch<any>;
    formData: any;
    onSubmit: (e: any) => void;
    loading: boolean;
    showTechnology: boolean;
}
const StepTwo = ({ setStep, masters, formData, setFormData, onSubmit, loading, showTechnology }: Props) => {
    const { TextArea } = Input;
    const [list, setList] = useState([]);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const getList = async () => {
        const { data } = await fetchClient.get("/list/technology");
        setList(data.data.list);
    };
    useEffect(() => {
        getList();
    }, [showTechnology]);
    return (
        <div className="mt-20 mx-auto w-[95%] lg:w-[60%]">
            <Spin spinning={loading}>
                <form
                    onSubmit={onSubmit}
                    className="flex flex-col lg:grid lg:grid-cols-2  justify-between container_upload_post justify-items-center gap-6 pb-10 lg:pb-10 lg:gap-10 font-yekanBold text-xs"
                >
                    <div className="w-full">
                        <label className="mb-2 block">عنوان</label>
                        <Input value={formData.title} onChange={onChange} name="title" placeholder="عنوان پروژه" />
                    </div>
                    <div className="w-full ">
                        <label className="mb-2 block">استاد مربوطه</label>
                        <Select
                            value={formData.master}
                            onSelect={(value) => setFormData({ ...formData, master: value })}
                            className="w-full master_select"
                            placeholder="انتخاب استاد مربوطه"
                        >
                            {masters.map((master: any, index) => (
                                <Select.Option key={master._id}>
                                    <span className="text-xs font-yekanBold text-gray-500"> {master.full_name}</span>
                                </Select.Option>
                            ))}
                        </Select>
                    </div>

                    <div className={`   relative overflow-hidden w-full`}>
                        <p className="pb-2">فایل زیپ</p>
                        <label
                            className={`!flex  hover:border bg-white hover:border-blue-500   justify-between w-full border !leading-[46px] !h-[46px] px-2 rounded-lg items-center `}
                            htmlFor="upload-zip-file"
                        >
                            <span className="text-gray-300 ">{formData.zip ? "فایل زیپ انتخاب شد" : "انتخاب فایل زیپ"}</span>
                            {formData.zip && <BsFileZipFill size={20} className="text-[#0096f5]" />}
                        </label>

                        <input
                            type="file"
                            name="zip"
                            id="upload-zip-file"
                            accept=".zip,.rar,.7zip"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    // @ts-ignore
                                    zip: e.target.files[0],
                                })
                            }
                        />
                    </div>

                    <div className="w-full">
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
                    <div className="w-full col-span-2">
                        <label className="mb-2 block">توضیحات</label>
                        <TextArea
                            style={{ height: 120, resize: "none" }}
                            value={formData.description}
                            name="description"
                            onChange={(value) =>
                                setFormData({
                                    ...formData,
                                    description: value.target.value,
                                })
                            }
                            placeholder="توضیحات پروژه"
                        />
                    </div>
                    <div className="col-span-2 flex justify-end gap-10 w-full">
                        <button onClick={() => setStep(0)} type="button" className="w-[100px] border py-2 rounded-lg">
                            بازگشت
                        </button>
                        <button type="submit" className="w-[100px] border py-2 rounded-lg bg-blue-500 text-white">
                            بعدی
                        </button>
                    </div>
                </form>
            </Spin>
        </div>
    );
};

export default StepTwo;
