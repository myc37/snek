import { type FC } from "react";

const Navbar: FC = () => {
  return (
    <nav className="flex h-16 items-center justify-between gap-4 bg-white px-6 drop-shadow-lg">
      <img
        src="/nv-logo.png"
        alt="ninja van logo"
        className="w-32 cursor-pointer"
      />
      <div className="text-lg font-bold">Admin Dashboard</div>
    </nav>
  );
};
export default Navbar;
