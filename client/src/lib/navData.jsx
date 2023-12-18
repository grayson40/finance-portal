import HomeIcon from '@mui/icons-material/Home'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import BarChartIcon from '@mui/icons-material/BarChart'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

export const navData = [
  {
    id: 0,
    icon: <HomeIcon />,
    text: 'Home',
    link: '/'
  },
  {
    id: 1,
    icon: <MoneyOffIcon />,
    text: 'Expenses',
    link: '/expenses'
  },
  {
    id: 2,
    icon: <AttachMoneyIcon />,
    text: 'Income',
    link: '/income'
  },
  {
    id: 3,
    icon: <BarChartIcon />,
    text: 'Investments',
    link: '/investments'
  },
  {
    id: 4,
    icon: <SettingsIcon />,
    text: 'Settings',
    link: '/profile'
  },
  {
    id: 5,
    icon: <LogoutIcon />,
    text: 'Logout',
    link: '/login'
  },
]
