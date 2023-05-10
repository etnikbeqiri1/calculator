import {useMutation} from "react-query";
import {ApiClient} from "../index";
import {queryClient} from "../../App";

export const useDeleteHistoryItem = () => {
    return useMutation(ApiClient.deleteHistoryItem, {
        onSuccess: (_, variables) => {
            queryClient.setQueryData('history', (data) => {

                if(data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)){
                    const newHistoryList = data.data.filter((historyItem) => {
                        return typeof historyItem === 'object' && 'id' in historyItem && historyItem.id !== variables;
                    })

                    const newData = {...data};
                    newData.data = newHistoryList;
                    return newData
                }
            })
        }
    })
}