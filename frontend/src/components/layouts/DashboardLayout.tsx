import { ReactNode, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

interface DashboardLayoutProps {
  children: ReactNode;
  activeMenu: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeMenu,
}) => {
  const { user } = useContext(UserContext)!;
  return (
    <div>
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>

          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
