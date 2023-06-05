import { Technology } from './../../../types/Technology/index';
import { useMutation } from "react-query";
import { addTechology, deleteTechnology, updateTechnology } from "../../../services/technology";
import { successToast } from '../../../helpers/utils/error';
import useGlobalStroe from '../../../stores/global-store';
interface PropsMutate {
    id?: string, isDelete?: boolean, isUpdate: boolean, data: Technology
}
const useTechnologyActionMutation = () => {
    const {setCreateTechnology} = useGlobalStroe()
    return useMutation(async ({ id, isDelete, isUpdate, data }: PropsMutate) => (isDelete ? await deleteTechnology(id) : isUpdate ? await updateTechnology({ data, id }) : await addTechology(data)), {
        onSuccess({ message }) {
            successToast(message)
            setCreateTechnology({info:null,show:false})
        },
        onError: async function (error) {
        },
    });
};

export default useTechnologyActionMutation;
