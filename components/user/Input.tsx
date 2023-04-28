import React from "react";
import { Input as InputAntd } from "antd";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
interface Props {
    name: string;
    type?: string;
    value: string;
    onChange: any;
    title: string;
    suffix: JSX.Element;
    input_ltr?: string;
    status?: string;
    error?: string | undefined | boolean;
}
const Input = ({ name, onChange, type = "text", value, title, suffix, input_ltr, status = "", error }: Props) => {
    return (
        <div>
            <label htmlFor={name}>{title}</label>
            {type === "password" ? (
                <>
                    <InputAntd.Password
                        value={value}
                        onChange={onChange}
                        type={type}
                        id={name}
                        name=""
                        suffix={suffix}
                        className={`${input_ltr}`}
                        // @ts-ignore
                        status={status}
                        iconRender={(visible) =>
                            visible ? (
                                <AiFillEye size={22} color="#9CA3AF" style={{ cursor: "pointer" }} />
                            ) : (
                                <AiFillEyeInvisible color="#9CA3AF" style={{ cursor: "pointer" }} size={22} />
                            )
                        }
                    />
                    <p className="text-[10px] pr-1 pt-1 text-red-500 font-yekanBold">{error}</p>
                </>
            ) : (
                <>
                    <InputAntd
                        value={value}
                        onChange={onChange}
                        type={type}
                        id={name}
                        name=""
                        suffix={suffix}
                        className={`${input_ltr}`}
                        // @ts-ignore
                        status={status}
                    />
                    <p className="text-[10px] pr-1 pt-1 text-red-500 font-yekanBold">{error}</p>
                </>
            )}
        </div>
    );
};

export default Input;
