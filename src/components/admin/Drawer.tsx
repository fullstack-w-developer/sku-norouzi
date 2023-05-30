import React from "react";
import { Drawer as DrawerAntd } from "antd";
import SidebarMenu from "./layout/SidebarMenu";
interface Props {
    countRequestWaiting?: number;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
}
const Drawer = ({ countRequestWaiting, open, setOpen }: Props) => {
    return (
        <DrawerAntd open={open} onClose={() => setOpen(false)} placement="right">
            <SidebarMenu countRequestWaiting={countRequestWaiting} />
        </DrawerAntd>
    );
};

export default Drawer;
