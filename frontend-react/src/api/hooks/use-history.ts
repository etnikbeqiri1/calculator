import {useQuery} from "react-query";
import {ApiClient} from "../index";

export const useHistory = () => {
    return useQuery('history', ApiClient.getHistory)
}