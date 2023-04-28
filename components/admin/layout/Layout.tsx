import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Drawer from "../Drawer";
import SidebarMenu from "./SidebarMenu";

interface Props {
    children: React.ReactNode;
    countRequestWaiting?: number;
}
const Layout = ({ countRequestWaiting, children }: Props) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="flex flex-col lg:flex-row gap-2 min-h-screen">
                <div className="hidden lg:block">
                    <SidebarMenu countRequestWaiting={countRequestWaiting} />
                </div>
                <div className="pr-4 pt-5 md:hidden">
                    <FiMenu onClick={() => setOpen(!open)} size={20} />
                </div>
                <div className="flex-1">{children}</div>
            </div>
            <Drawer setOpen={setOpen} open={open} countRequestWaiting={countRequestWaiting} />
        </>
    );
};

export default Layout;
