import { useState } from "react";
import { Table, Tabs, TabsProps } from "antd";
import { columns } from "../../utils/dataTable";
import { useQuery } from "react-query";
import { getStudents } from "../../utils/fetch/requests";
import { optionQuery } from "../../utils/data";
import { BiSearch } from "react-icons/bi";
import Edit from "./Edit";
import AddUser from "./AddUser";
import { useRecoilValue } from "recoil";
import { addNewUserModalState, editModalAdminState } from "../../recoil/atom";
import { v4 as uuidv4 } from "uuid";

interface Props {
    role: string;
    title: string;
    url: string;
    setUrl: React.Dispatch<React.SetStateAction<string>>;
    setDataTable: any;
    dataTable: object;
    itemsTab: any;
}
const TabPanel = ({ url, setUrl, setDataTable, itemsTab, role, title }: Props) => {
    const modal = useRecoilValue(editModalAdminState);
    const open = useRecoilValue(addNewUserModalState);
    const [search, setSearch] = useState("");
    const [skip, setSkip] = useState(1);
    const requestData = async (url: string) => {
        await setSkip(1);
        await setUrl(`${url}`);
        await setDataTable([]);
        refetch();
    };

    const stateEditAdmin = useRecoilValue(editModalAdminState);

    const { refetch, isFetching, isLoading } = useQuery(
        ["stduentList", url, skip, search],
        () =>
            getStudents({
                url: `${url}&skip=${skip}&q=${search}`,
            }),
        {
            ...optionQuery,
            enabled: false,
            onSuccess: ({ data }) => {
                setDataTable({
                    users: data.data[0].paginatedResults,
                    total: data.data[0].totalCount[0]?.Total,
                });
            },
        }
    );

    const onChangePagination = async (count: number) => {
        await setSkip(count);
        refetch();
    };

    const onChangeSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        await setSearch(e.target.value);
        refetch();
    };

    return (
        <>
            <div className="flex lg:max-w-[50%] h-10 rounded-lg overflow-hidden border mb-12">
                <input
                    value={search}
                    onChange={onChangeSearch}
                    className="w-full text-xs px-2 outline-none"
                    placeholder="بر اساس ایمیل، نام، نام‌خانوادگی جستجو کنید"
                />
                <div className="bg-blue-500 px-3 text-white flex justify-center items-center">
                    <BiSearch size={24} />
                </div>
            </div>
            <Tabs
                defaultActiveKey="1"
                items={itemsTab.map((user: any, i: any) => {
                    return {
                        key: user.key,
                        label: (
                            <span onClick={() => requestData(user.url)} className="flex items-center gap-1 px-5 font-yekanBold">
                                <user.icon />
                                {user.name}
                            </span>
                        ),

                        children: (
                            <Table
                                locale={{
                                    emptyText: () => <p className="py-10 ">لیست خالی است</p>,
                                }}
                                pagination={{
                                    pageSize: 8,
                                    total: user.data.total,
                                    current: skip,
                                    onChange: onChangePagination,
                                }}
                                columns={columns}
                                dataSource={user.data.users}
                                rowKey={uuidv4()}
                                loading={isLoading || isFetching}
                                className={`${modal.open || open ? "!max-w-[0px] lg:!max-w-full" : "!w-full"} !overflow-auto`}
                            />
                        ),
                    };
                })}
            />
            {stateEditAdmin.open && <Edit refetch={refetch} />}

            <AddUser refetch={refetch} role={role} title={title} />
        </>
    );
};

export default TabPanel;
