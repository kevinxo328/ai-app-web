import App from "@/App";
import ChatBot from "@/pages/ChatBot";
// import Login from "@/pages/Login";
import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      // {
      //   path: "login",
      //   element: <Login />,
      // },
      {
        path: "chatbot",
        element: <ChatBot />,
      },
    ],
  },
];

export default routes;
