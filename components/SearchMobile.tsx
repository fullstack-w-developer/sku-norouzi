import { Image } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiFilter, BiSearch } from "react-icons/bi";
import { useRecoilValue } from "recoil";
import { setRecoil } from "recoil-nexus";
import { filterSearchrModalState } from "../recoil/atom";
import fetchClient from "../utils/fetchClient";

const SearchMobile = () => {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [result, setResult] = useState<[] | null>(null);
    const open = useRecoilValue(filterSearchrModalState);
    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearch(value);
        try {
            const { data } = await fetchClient.get(`/post/search?q=${value}`);
            if (data.status) {
                setResult(data.data);
            }
        } catch (error) {}
    };
    return (
        <div className="px-5 mt-5">
            <div className="w-full gap-3 flex items-center ">
                <div className="relative w-full">
                    <input
                        value={search}
                        onChange={onChange}
                        placeholder="جستجو برا اساس نام کاربری و نام استاد"
                        className="w-full flex-1 outline-none px-2 bg-[#F9F9F9] text-xs  h-12 lg:h-9 border rounded-lg"
                    />
                </div>
                <div
                    onClick={() => setRecoil(filterSearchrModalState, !open)}
                    className="bg-sku cursor-pointer text-white h-12 lg:h-9 flex rounded-lg px-1 items-center justify-center"
                >
                    <BiFilter size={28} />
                </div>
            </div>
            {/* result for mobile */}
            <div className="mt-10 lg:hidden w-full">
                {result?.length === 0 ? (
                    <p className="text-center pt-10">بدون نتیجه</p>
                ) : (
                    result?.map((search: any) => (
                        <button
                            onClick={() => router.push(`/profile/${search._id}`)}
                            key={search._id}
                            className="hover:bg-gray-100 border-b w-full  py-2 text-black   flex justify-between items-center cursor-pointer"
                        >
                            <div className="flex item gap-2">
                                <Image src={search.profile.url} alt="" className="rounded-full border !w-[50px] !h-[50px]" />
                                <div className="text-[13px] flex gap-1 items-start flex-col text-gray-500">
                                    <p className="flex gap-1 ">{search.full_name}</p>
                                    <p>{search.role === "USER" ? "دانشجو" : "استاد"}</p>
                                </div>
                            </div>

                            <BiSearch size={19} />
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};

export default SearchMobile;
