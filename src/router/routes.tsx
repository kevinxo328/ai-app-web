import App from "@/App";
import ChatBot from "@/pages/ChatBot";
import Login from "@/pages/Login";
import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "chatbot",
        element: <ChatBot />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
];

export default routes;
