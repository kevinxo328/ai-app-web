import { useEffect, useState } from "react";

import { useGetUser } from "./apis/api";
import AppLayout from "./components/app/app-layout";
import AppAside from "./components/app/app-aside";
import { Outlet, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/theme-toggle";

function App() {
  const { data, error } = useGetUser();
  const location = useLocation();

  const [asideItems, setAsideItems] = useState([
    { label: "home", path: "/", active: false },
    {
      label: "chatbot",
      path: "/chatbot",
      active: false,
    },
    { label: "login", path: "/login", active: false },
  ]);

  useEffect(() => {
    setAsideItems((pre) =>
      pre.map((item) => ({ ...item, active: item.path === location.pathname }))
    );
  }, [location]);

  console.log(data, error);

  const aside = (
    <div className="p-4">
      <div className="mb-4">
        <ThemeToggle />
      </div>
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
