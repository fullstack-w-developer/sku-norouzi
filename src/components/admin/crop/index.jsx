import { Modal } from "antd";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./utils/cropImage";
import { Slider } from "antd";

const CropEasy = ({ imgSrc, setOpenCrop, setFile, openCrop, setImgSrc, setBlobFile }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };
    const fileToDataUri = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target.result);
            };
            reader.readAsDataURL(file);
        });
    const cropImage = async () => {
        try {
            const { file } = await getCroppedImg(imgSrc, croppedAreaPixels, rotation);
            setBlobFile(file);
            await fileToDataUri(file).then((data) => {
                setFile(data);
            });
            setOpenCrop(false);
            setImgSrc();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Modal footer={false} open={openCrop}>
            <div
                style={{
                    background: "#333",
                    position: "relative",
                    height: 300,
                    width: "auto",
                    minWidth: { sm: 500 },
                }}
            >
                <Cropper
                    image={imgSrc}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={1}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropChange={setCrop}
                    onCropComplete={cropComplete}
                />
            </div>

            <div>
                <div>
                    <div>Zoom: {zoomPercent(zoom)}</div>
                    <Slider min={1} max={3} step={0.1} value={zoom} onChange={(value) => setZoom(value)} />
                </div>
                <div>
                    <div>Rotation: {rotation + "°"}</div>
                    <Slider min={0} max={360} value={rotation} onChange={(value) => setRotation(value)} />
                </div>
            </div>
            <div className="flex justify-center items-center font-yekanBold mt-5">
                <button onClick={cropImage} className="bg-sku font-boldRobot text-white py-2 rounded-xl w-[300px]">
                    برش
                </button>
            </div>
        </Modal>
    );
};

export default CropEasy;

const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`;
};
