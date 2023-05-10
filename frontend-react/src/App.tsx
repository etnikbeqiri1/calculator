import {useEffect} from "react";
import {MantineProvider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import {useAuthStore} from "./store";
import {RouterProvider} from "react-router-dom";
import {getRouter} from "./routes";
import {axiosInstance} from "./api";
import {QueryClient, QueryClientProvider} from "react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

function App() {
    const token = useAuthStore((state) => state.token);

    useEffect(() => {
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }, [token])

  return (
      <QueryClientProvider
          client={queryClient}>
      <MantineProvider
          withGlobalStyles withNormalizeCSS>
          <Notifications/>
          <RouterProvider router={getRouter(!!token)} />
      </MantineProvider>
      </QueryClientProvider>
  )
}

export default App
