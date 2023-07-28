import { useNavigate, useLocation } from 'react-router-dom'
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('栏目 1', '/demo1', <PieChartOutlined />),
  getItem('栏目 2', '/demo2', <DesktopOutlined />),
  getItem('栏目3', 'demo3', <UserOutlined />, [
    getItem('栏目301', '/demo3/demo301'),
    getItem('栏目302', '/demo3/demo302'),
    getItem('栏目303', '/demo3/demo303'),
  ]),
  getItem('栏目4', 'demo4', <TeamOutlined />, [getItem('栏目401', '/demo4/demo401'), getItem('栏目402', '/demo4/demo402')]),
  getItem('Files', '9', <FileOutlined />),
];

const MainMenu: React.FC = () => {
  const navigate = useNavigate()
  const currentRoute = useLocation()
  // console.log(currentRoute)
  const menuClick = (e: any) => {
    // console.log(key)
    navigate(e.key)
  }
  return <Menu theme="dark" defaultSelectedKeys={[currentRoute.pathname]} mode="inline" items={items} onClick={menuClick} />
}
export default MainMenu