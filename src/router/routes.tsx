import App from "@/App";
import Chatbot from "@/pages/Chatbot";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chatbot",
    element: <Chatbot />,
  },
];

export default routes;
