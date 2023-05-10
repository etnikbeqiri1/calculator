import {useMutation} from "react-query";
import {ApiClient} from "../index";
import {queryClient} from "../../App";

export const useDeleteHistory = () => {
    return useMutation(ApiClient.deleteHistory, {
        onSuccess: () => {
            queryClient.setQueryData('history', (data) => {
                if(data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)){
                    const newData = {...data};
                    newData.data = [];
                    return newData
                }
            })
        }
    })
}