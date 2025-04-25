import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';

interface SideMenuProps {
  activeMenu: string;
}

const SideMenu: React.FC<SideMenuProps> = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext)!;

  return <div>SideMenu </div>;
};

export default SideMenu;
