import { websiteRoutes } from "./website.routes";
import AxiosConfig from "../lib/axios/Axios";
import RootLayout from "../common/layout/root/RootLayout";
import NotFound from "@/features/app-status/pages/not-found/NotFound";
import ErrorBoundary from "@/features/error/ErrorBoundary";
import SeoProvider from "@/features/seo/SeoProvider";
export const rootRoutes = {
  path: "/",
  element: (
    <SeoProvider>
      <AxiosConfig />
      <RootLayout />
    </SeoProvider>
  ),
  errorElement: <ErrorBoundary />,
  children: [
    websiteRoutes,

    {
      path: "*",
      element: <NotFound />,
    },
  ],
};
