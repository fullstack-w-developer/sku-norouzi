import { Image } from "antd";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { BiFilter, BiSearch } from "react-icons/bi";
import { useRecoilState } from "recoil";
import { filterSearchrModalState } from "../../recoil/atom";
import fetchClient from "../../utils/fetchClient";
import FilterSearch from "./FilterSearch";
const Search = () => {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState<[] | null>([]);
    const [showMenu, setShowMenu] = useState(false);
    const [open, setOpen] = useRecoilState(filterSearchrModalState);
    let menuRef = useRef(null);
    useEffect(() => {
        let handler = (e: any) => {
            // @ts-ignore
            if (!menuRef?.current?.contains(e?.target)) {
                setShowMenu(false);
                setResult([]);
            }
        };
        document.addEventListener("mousedown", handler);
    }, []);

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
        <>
            <div className="  rounded-lg w-[60%]">
                <div className="w-full gap-3 flex items-center ">
                    <div className="relative w-full" ref={menuRef}>
                        <input
                            value={search}
                            onClick={() => setShowMenu(true)}
                            onChange={onChange}
                            placeholder="جستجو بر اساس نام پروژه و نام کاربری"
                            className="w-full flex-1 outline-none px-2 bg-[#F9F9F9] text-xs h-9 border rounded-lg"
                        />
                        <div
                            className={`w-full   bg-white absolute shadow-sm h-[300px] top-12 left-0 overflow-auto rounded-xl font-reqularRobot border text-black px-3 pt-2 text-[14px] transition-all duration-150 ${
                                showMenu ? "opacity-100 z-50 block" : "hidden -z-[9999]"
                            }`}
                        >
                            <div>
                                {result?.length === 0 ? (
                                    <p className="text-center pt-10">بدون نتیجه</p>
                                ) : (
                                    result?.map((search: any) => (
                                        <Link
                                            href={`/profile/${search._id}`}
                                            key={search._id}
                                            className="hover:bg-gray-100 border-b  px-4 py-2 text-black   flex justify-between items-center cursor-pointer"
                                        >
                                            <div className="flex item gap-2">
                                                <Image
                                                    src={search.profile.url}
                                                    alt=""
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full border !w-[30px] !h-[30px]"
                                                />
                                                <div className="text-[10px] flex gap-1 flex-col text-gray-500">
                                                    <p className="flex gap-1 ">{search.full_name}</p>
                                                    <p>{search.role === "USER" ? "دانشجو" : "استاد"}</p>
                                                </div>
                                            </div>

                                            <BiSearch size={17} />
                                        </Link>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={() => setOpen(!open)}
                        className="bg-sku cursor-pointer text-white h-9 flex rounded-lg px-1 items-center justify-center"
                    >
                        <BiFilter size={28} />
                    </div>
                </div>
            </div>
            <FilterSearch />
        </>
    );
};

export default Search;
