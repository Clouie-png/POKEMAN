import { ReactNode } from 'react';
import { Users, UserPlus, Search, Menu, Settings, LogOut, User } from 'lucide-react';
import Dropdown from '@/components/ui/dropdown';

interface DashboardLayoutProps {
  children: ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
}

const DashboardLayout = ({ children, currentView, onViewChange }: DashboardLayoutProps) => {
  const menuItems = [
    { id: 'users', label: 'All Users', icon: Users },
    { id: 'add-user', label: 'Add User', icon: UserPlus },
    { id: 'search', label: 'Search Users', icon: Search },
  ];

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navigation */}
      <div className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start">
          <Dropdown
            trigger={
              <div className="btn btn-ghost lg:hidden">
                <Menu className="h-5 w-5" />
              </div>
            }
            className="lg:hidden"
          >
            <ul className="menu menu-sm p-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onViewChange(item.id)}
                    className={`flex items-center gap-2 w-full text-left ${
                      currentView === item.id ? 'active bg-primary text-primary-content' : ''
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </Dropdown>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral">UserFlow</h1>
              <p className="text-sm text-neutral/60">User Management System</p>
            </div>
          </div>
        </div>
        
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`btn btn-ghost gap-2 ${
                    currentView === item.id ? 'btn-primary' : ''
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="navbar-end">
          <Dropdown
            trigger={
              <div className="avatar placeholder cursor-pointer hover:scale-105 transition-transform">
                <div className="bg-primary text-primary-content rounded-full w-10">
                  <span className="text-sm">AD</span>
                </div>
              </div>
            }
            align="right"
          >
            <ul className="menu menu-sm p-2">
              <li>
                <button className="flex items-center gap-2 w-full text-left hover:bg-base-200">
                  <User className="h-4 w-4" />
                  Profile
                  <span className="badge badge-primary badge-sm ml-auto">New</span>
                </button>
              </li>
              <li>
                <button className="flex items-center gap-2 w-full text-left hover:bg-base-200">
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
              </li>
              <li>
                <button className="flex items-center gap-2 w-full text-left hover:bg-error hover:text-error-content">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </li>
            </ul>
          </Dropdown>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;