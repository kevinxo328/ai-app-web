import React from "react";
import { Link } from "react-router-dom";

type Props = {
  items: Array<{
    label: string;
    path: string;
  }>;
};

const AppAside = React.memo((props: Props) => {
  return (
    <div>
      {props.items.map(({ label, path }) => (
        <Link to={path} key={label}>
          {label}
        </Link>
      ))}
    </div>
  );
});

export default AppAside;
