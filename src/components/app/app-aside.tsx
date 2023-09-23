import React from "react";
import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";

type Props = {
  items: Array<{
    label: string;
    path: string;
    active?: boolean;
  }>;
};

const AppAside = React.memo((props: Props) => {
  return (
    <div className="flex flex-col space-y-2">
      {props.items.map(({ label, path, active }) => (
        <Link
          to={path}
          key={label}
          className={`${buttonVariants({
            variant: active ? "secondary" : "ghost",
          })}`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
});

export default AppAside;
