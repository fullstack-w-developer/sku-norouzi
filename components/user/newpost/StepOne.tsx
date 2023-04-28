import Image from "next/image";
import { FiUploadCloud } from "react-icons/fi";
interface Props {
    setStep: React.Dispatch<React.SetStateAction<number>>;
    setFormData: React.Dispatch<any>;
    formData: any;
}
const StepOne = ({ setStep, formData, setFormData }: Props) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            // @ts-ignore
            file: e.target.files[0],
        });
    };

    const onClick = () => {
        if (formData.file) {
            setStep((prev) => prev + 1);
        }
    };

    return (
        <div className="w-[95%] lg:w-[60%] mx-auto">
            <div className="w-[95%] lg:w-[70%] m-auto mt-20 rounded-lg h-[300px] bg-gray-200/40 p-3">
                <div className="m-auto border-2 border-dashed rounded-lg overflow-hidden border-[#0096f5] h-full">
                    <div
                        className={`container_newpost_upload   relative overflow-hidden ${
                            formData.image ? "bg-black" : "bg-transparent"
                        } `}
                    >
                        <label className={`flex flex-col justify-center items-center `} htmlFor="upload-photo">
                            {formData?.file ? (
                                formData?.file?.type?.split("/")[0] === "video" ? (
                                    <video controls disablePictureInPicture controlsList="nodownload">
                                        <source src={URL.createObjectURL(formData?.file)} type="video/mp4" />
                                        <source src={URL.createObjectURL(formData?.file)} type="video/ogg" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <Image className="object-contain" fill alt="" src={URL.createObjectURL(formData.file)} />
                                )
                            ) : (
                                <>
                                    <FiUploadCloud size={90} className="text-[#0096f5]" />
                                    <span className="font-ExtraBold text-gray-400 pt-5">عکس پست شما</span>
                                </>
                            )}
                        </label>

                        <input
                            type="file"
                            name="photo"
                            id="upload-photo"
                            // accept=".png, .jpg, .jpeg, .webp"
                            onChange={onChange}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-14">
                <button onClick={onClick} className="bg-sku text-white text-xs w-[100px] py-3 rounded-lg">
                    بعدی
                </button>
            </div>
        </div>
    );
};

export default StepOne;
