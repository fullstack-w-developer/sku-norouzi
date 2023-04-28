import { Select } from "antd";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import CreateTechnology from "../../components/admin/CreateTechnology";
import DeleteTechnology from "../../components/admin/DeleteTechnology";
import Layout from "../../components/admin/layout/Layout";

interface Props {
    listMaster: {
        first_name: string;
        last_name: string;
        _id: string;
    }[];
    listTechnology: {
        name: string;
        _id: string;
    }[];
}
const Technology = ({ listTechnology }: Props) => {
    const [itemstechnology, setItemstechnology] = useState(listTechnology);
    const [showTechnology, setShowTechnology] = useState(false);
    const [showDeleteTechnology, setShowDeletetechnology] = useState(false);
    const [info, setInfo] = useState({});

    const editNameTechnology = async (info: object) => {
        await setInfo(info);
        setShowTechnology(true);
    };
    const deleteTechnology = async (info: object) => {
        await setInfo(info);
        setShowDeletetechnology(true);
    };
    return (
        <Layout>
            <Head>
                <title>دانشگاه شهر کرد | تکنولوژی ها</title>
            </Head>
            <div>
                <h1 className="text-lg pt-10 pr-4 font-ExtraBold text-gray-800">تعریف فناوری</h1>
                <div className="flex gap-10 justify-around items-center mt-10 w-[90%] mx-auto lg:w-[80%]">
                    <div className="flex-1 gap-3 h-[30px] flex items-center container_list_master">
                        <Select size="large" className="font-yekanBold w-full" value={"لیست  فناوری‌ها"}>
                            {itemstechnology.map((list: any) => (
                                <Select.Option key={list._id}>
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs font-yekanBold text-gray-700">{list.name}</p>
                                        <div className="flex items-center gap-2">
                                            <BiEdit
                                                onClick={() => editNameTechnology(list)}
                                                size={19}
                                                className="text-gray-700 mt-1"
                                            />
                                            <MdDelete onClick={() => deleteTechnology(list)} size={20} className="text-red-600" />
                                        </div>
                                    </div>
                                </Select.Option>
                            ))}
                        </Select>
                        <button
                            onClick={() => setShowTechnology(true)}
                            className="bg-[#0096f5] text-white px-7 h-[35px] rounded-lg text-xs"
                        >
                            جدید
                        </button>
                    </div>
                </div>
            </div>

            <CreateTechnology
                show={showTechnology}
                setShow={setShowTechnology}
                setItemstechnology={setItemstechnology}
                itemstechnology={itemstechnology}
                info={info}
                setinfo={setInfo}
            />
            <DeleteTechnology
                setItemstechnology={setItemstechnology}
                itemstechnology={itemstechnology}
                info={info}
                setShowDelete={setShowDeletetechnology}
                showDelete={showDeleteTechnology}
                setInfo={setInfo}
            />
        </Layout>
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
    const technology = await fetch(`${process.env.BASEURL}/list/technology`, {
        headers: {
            Authorization: token!,
        },
    }).then((res) => res.json());

    return {
        props: {
            listTechnology: technology.data.list,
        },
    };
};

export default Technology;
