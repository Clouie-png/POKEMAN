import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import UserList from '@/components/users/UserList';
import UserForm from '@/components/users/UserForm';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Database } from 'lucide-react';

interface UserData {
  id: string;
  username: string;
  email: string;
  createdAt?: string;
  isActive?: boolean;
}

const Index = () => {
  const [currentView, setCurrentView] = useState('users');
  const [users, setUsers] = useState<UserData[]>([
    {
      id: '1',
      username: 'john_doe',
      email: 'john@example.com',
      createdAt: '2024-01-15',
      isActive: true,
    },
    {
      id: '2', 
      username: 'jane_smith',
      email: 'jane@example.com',
      createdAt: '2024-01-20',
      isActive: true,
    },
    {
      id: '3',
      username: 'mike_wilson',
      email: 'mike@example.com', 
      createdAt: '2024-01-25',
      isActive: false,
    },
  ]);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const { toast } = useToast();

  const handleSaveUser = (userData: UserData) => {
    if (userData.id) {
      // Edit existing user
      setUsers(users.map(user => 
        user.id === userData.id ? { ...user, ...userData } : user
      ));
      toast({
        title: "User updated",
        description: "User information has been successfully updated.",
      });
    } else {
      // Add new user
      const newUser = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        isActive: true,
      };
      setUsers([...users, newUser]);
      toast({
        title: "User created",
        description: "New user has been successfully added.",
      });
    }
    setCurrentView('users');
    setEditingUser(null);
  };

  const handleEditUser = (user: UserData) => {
    setEditingUser(user);
    setCurrentView('add-user');
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User deleted",
      description: "User has been successfully removed.",
      variant: "destructive",
    });
  };

  const handleCancel = () => {
    setEditingUser(null);
    setCurrentView('users');
  };

  const renderContent = () => {
    if (currentView === 'add-user') {
      return (
        <UserForm
          user={editingUser || undefined}
          onSave={handleSaveUser}
          onCancel={handleCancel}
        />
      );
    }

    return (
      <UserList
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
    );
  };

  return (
    <>
      {/* Supabase Integration Notice */}
      <div className="alert alert-warning shadow-lg mb-6 mx-4 mt-4">
        <AlertTriangle className="h-5 w-5" />
        <div>
          <h3 className="font-bold">Backend Integration Required</h3>
          <div className="text-sm">
            To enable full authentication and database functionality, connect to Supabase using the green button in the top right.
            Currently showing demo data - real users will be stored in your Supabase database.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4" />
          <span className="text-sm font-medium">Click Supabase → Connect</span>
        </div>
      </div>

      <DashboardLayout 
        currentView={currentView} 
        onViewChange={setCurrentView}
      >
        {renderContent()}
      </DashboardLayout>
    </>
  );
};

export default Index;
