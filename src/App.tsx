import { useMemo } from "react";

import { useGetUser } from "./apis/api";
import AppLayout from "./components/app/app-layout";
import AppAside from "./components/app/app-aside";
import { Outlet } from "react-router-dom";
import ThemeToggle from "@/components/theme-toggle";

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

  const aside = (
    <div className="p-4">
      <ThemeToggle />
      <AppAside items={asideItems} />
    </div>
  );

  return (
    <AppLayout aside={aside}>
      <Outlet />
    </AppLayout>
  );
}

export default App;
