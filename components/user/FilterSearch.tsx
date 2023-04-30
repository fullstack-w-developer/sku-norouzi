import DatePicker, { DateObject } from "react-multi-date-picker";
import { Modal } from "antd";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useRecoilValue } from "recoil";
import { filterSearchrModalState } from "../../recoil/atom";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { setRecoil } from "recoil-nexus";
import fetchClient from "../../utils/fetchClient";
import { useRouter } from "next/router";
import { MdOutlineClose } from "react-icons/md";
const FilterSearch = () => {
    const open = useRecoilValue(filterSearchrModalState);
    const router = useRouter();
    const [listMasters, setListMasters] = useState([]);
    const [listTechnologies, setListTechnologies] = useState();
    const [formData, setFormData] = useState({
        form: "",
        formPer: "",
        to: "",
        toPer: "",
        master: { _id: "" },
        technologies: { name: "" },
    });

    const handleChangeFrom = (value: any) => {
        const newDateFrom = new DateObject(value).convert(gregorian, gregorian_en).format();
        setFormData({
            ...formData,
            form: newDateFrom,
            formPer: value,
        });
    };

    const handleChangeTo = (value: any) => {
        const newDateFrom = new DateObject(value).convert(gregorian, gregorian_en).format();
        setFormData({
            ...formData,
            to: newDateFrom,
            toPer: value,
        });
    };

    const getMasterName = async () => {
        try {
            const { data } = await fetchClient.get("/masters");
            if (data.status) {
                setListMasters(data.data.masters);
            }
        } catch (error) {}
    };
    const getList = async () => {
        const { data } = await fetchClient.get("/list/technology");
        if (data.status) {
            setListTechnologies(data.data.list);
        }
    };

    useEffect(() => {
        getList();
        getMasterName();
    }, []);

    const clickSearch = () => {
        const data = {
            from: formData.form,
            to: formData.to,
            masterId: formData.master?._id,
            technologies: formData.technologies.name,
        };

        router.push({
            query: { search: JSON.stringify(data) },
            pathname: "/search/result",
        });
        onClose();
    };
    const onClose = () => setRecoil(filterSearchrModalState, !open);
    return (
        <Modal
            onCancel={onClose}
            footer={false}
            centered
            open={open}
            closeIcon={<MdOutlineClose className="text-gray-600 mr-1" />}
        >
            <h1 className="text-center font-ExtraBold text-xl text-gray-700"> جستجوی پیشرفته</h1>
            {/* date */}

            <div className="container_serach_filter">
                <div className="w-full">
                    <p className="">از تاریخ:</p>
                    <DatePicker
                        value={formData.formPer}
                        // calendar={persian}
                        // locale={persian_fa}
                        onChange={handleChangeFrom}
                        className="text-center w-full !text-xs"
                    />
                </div>
                <div>
                    <p>تا تاریخ:</p>
                    <DatePicker
                        // calendar={persian}
                        // locale={persian_fa}
                        value={formData.toPer}
                        onChange={handleChangeTo}
                        className="text-center !text-xs"
                    />
                </div>
                <div className="w-full">
                    <p>نام استاد:</p>
                    <Select
                        value={formData.master}
                        placeholder="نام استاد"
                        className="w-full"
                        onChange={(value: any) => setFormData({ ...formData, master: value })}
                        getOptionLabel={(option: any) => option.full_name}
                        getOptionValue={(option: any) => option._id}
                        options={listMasters}
                        noOptionsMessage={() => <span>لیست خالی است</span>}
                    />
                </div>
                <div className="w-full">
                    <p>نام فناوری:</p>
                    <Select
                        isClearable={false}
                        value={formData.technologies}
                        placeholder=" "
                        className="w-full ltr"
                        options={listTechnologies}
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

            <div className="mt-10 font-yekanBold flex justify-end gap-5">
                <button onClick={onClose} className="border w-[100px] py-2 rounded-lg">
                    انصراف
                </button>
                <button onClick={clickSearch} className="bg-sku text-white w-[100px] py-2 rounded-lg">
                    تائید
                </button>
            </div>
        </Modal>
    );
};

export default FilterSearch;
