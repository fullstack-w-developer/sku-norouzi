import { useMutation } from "react-query";
import { addSharePost } from "../../../services/actions";
import { errorToast, successToast } from "../../../helpers/utils/error";
import { typeShareMuation } from "../../../types/common";
import useGlobalStroe from "../../../stores/global-store";

const useSharepostActionMuation = () => {
    const { toggleShare } = useGlobalStroe();
    return useMutation(async (data: typeShareMuation) => await addSharePost(data), {
        onSuccess({ data, status }) {
            successToast("پیام شما با موفقیت ثبت شد");
            if (status) {
                successToast("پست با موفقت برای کاربران فرستاده شد");
                toggleShare();
            }
        },
        onError: async function (error) {
            errorToast("مشکلی در فرستادن پست  پیش آمده است");
        },
    });
};

export default useSharepostActionMuation;
