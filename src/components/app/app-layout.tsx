import { ReactNode } from "react";

type Props = {
  aside?: ReactNode;
  children?: ReactNode;
};

const AppLayout = (props: Props) => {
  return (
    <div className="w-full h-screen max-h-screen overflow-hidden flex">
      <aside className="w-[300px] max-h-screen overflow-y-auto flex-shrink-0">
        {props.aside}
      </aside>
      <main className="w-full">{props.children}</main>
    </div>
  );
};

export default AppLayout;
