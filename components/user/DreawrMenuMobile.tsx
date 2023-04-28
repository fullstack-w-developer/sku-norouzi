import { Drawer } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalSidebarMobileState, userState } from "../../recoil/atom";
import SidebarItems from "./SidebarItems";

const DreawrMenuMobile = () => {
    const [open, setOpen] = useRecoilState(modalSidebarMobileState);

    return (
        <Drawer open={open} onClose={() => setOpen(!open)}>
            <SidebarItems />
        </Drawer>
    );
};

export default DreawrMenuMobile;
