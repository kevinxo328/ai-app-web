import App from "@/App";
import Chatbot from "@/pages/Chatbot";
import Login from "@/pages/Login";
import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "chatbot",
        element: <Chatbot />,
      },
    ],
  },
];

export default routes;
