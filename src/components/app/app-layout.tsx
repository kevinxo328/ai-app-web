type Props = {
  aside?: JSX.Element;
  children?: JSX.Element;
};

const AppLayout = (props: Props) => {
  return (
    <div className="w-full h-screen max-h-screen overflow-hidden flex">
      <aside className="w-[300px] max-h-screen overflow-y-auto flex-shrink-0 border-r">
        {props.aside}
      </aside>
      <main className="w-full">{props.children}</main>
    </div>
  );
};

export default AppLayout;
