import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div className="app-container">
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
