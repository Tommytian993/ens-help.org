import { NavLink } from "react-router-dom";

interface NavLinkItemProps {
  to: string;
  children: React.ReactNode;
}

const NavLinkItem = ({ to, children }: NavLinkItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `nav-link px-3 py-2 rounded-2 text-decoration-none transition ${
          isActive
            ? "text-primary fw-semibold bg-primary bg-opacity-10"
            : "text-dark fw-medium"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default NavLinkItem;

