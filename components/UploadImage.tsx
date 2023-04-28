import { Avatar } from "antd";
import { AiOutlineCloudUpload } from "react-icons/ai";
interface Props {
    profile: any;
    onSelectFile: (e: any) => void;
    file: any;
}

const UploadImage = ({ profile, onSelectFile, file }: Props) => {
    return (
        <div className="flex items-center flex-col justify-center pb-5">
            <label className="custom-file-upload relative overflow-hidden !p-0">
                <input onChange={onSelectFile} type="file" />
                {profile ? (
                    <Avatar className="w-full h-full" src={file ? file : profile} alt="" />
                ) : (
                    <AiOutlineCloudUpload className="text-gray-800" size={60} />
                )}
            </label>
            <p className="text-gray-700 font-yekanBold text-xs pt-2">عکس پروفایل</p>
        </div>
    );
};

export default UploadImage;
