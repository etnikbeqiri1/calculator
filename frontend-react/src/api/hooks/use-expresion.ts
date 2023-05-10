import {useMutation} from "react-query";
import {ApiClient} from "../index";
import {queryClient} from "../../App";
import {notifications} from "@mantine/notifications";

export const useExpression = () => {
    return useMutation(ApiClient.calculate, {
        onSuccess: (data) => {
            notifications.show({
                color: 'green',
                title: data.data.result,
                message: 'Calculation finished',
            })
            queryClient.refetchQueries('history').then(() => {});
        }
    })
}