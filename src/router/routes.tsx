import App from "@/App";
import { AppAuthGuard } from "@/components/app/app-auth-guard";
import ChatBot from "@/pages/ChatBot";
import Login from "@/pages/Login";
import { RouteObject } from "react-router-dom";

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <AppAuthGuard />,
    children: [
      {
        path: "chatbot",
        element: <ChatBot />,
      },
    ],
  },
];

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: protectedRoutes,
  },
  {
    path: "login",
    element: <Login />,
  },
];

export default routes;
