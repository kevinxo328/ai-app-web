import { useMemo } from "react";

import { useGetUser } from "./apis/api";
import AppLayout from "./components/app/app-layout";
import AppAside from "./components/app/app-aside";
import { Outlet } from "react-router-dom";

function App() {
  const { data, error } = useGetUser();
  const asideItems = useMemo(
    () => [
      { label: "home", path: "/" },
      {
        label: "chatbot",
        path: "/chatbot",
      },
      { label: "login", path: "/login" },
    ],
    []
  );

  console.log(data, error);

  return (
    <AppLayout aside={<AppAside items={asideItems} />}>
      <Outlet />
    </AppLayout>
  );
}

export default App;
