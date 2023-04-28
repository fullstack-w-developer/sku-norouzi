import { Drawer } from "antd";
import { useState, useEffect } from "react";
interface typeVideo {
    url: string;
    type: string;
    id: string;
}
interface Props {
    src: typeVideo;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const PreviewVideo = ({ src, open, setOpen }: Props) => {
    const [data, setData] = useState<typeVideo>({
        id: "",
        type: "",
        url: "",
    });
    useEffect(() => {
        setData(src);
    }, [src]);

    return (
        <Drawer footer={false} open={open} onClose={() => setOpen(!open)} width="100vw" className="container_preview">
            {data.url && (
                <video className="w-fit h-fit" controls disablePictureInPicture controlsList="nodownload">
                    <source src={typeof data.url === "string" ? data.url : URL.createObjectURL(data.url)} type="video/mp4" />
                    <source src={typeof data?.url === "string" ? data.url : URL.createObjectURL(data.url)} type="video/ogg" />
                    Your browser does not support the video tag.
                </video>
            )}
        </Drawer>
    );
};

export default PreviewVideo;
