import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserList } from '@/components/users/UserList';
import UserForm from '@/components/users/UserForm';
import { useToast } from '@/hooks/use-toast';

interface UserData {
  id: string;
  name: string;
  email: string;
}

const Index = () => {
  const [currentView, setCurrentView] = useState('users');
  const [users, setUsers] = useState<UserData[]>([]);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('http://192.168.100.76/POKEMAN/backend/get_users.php');
    const data = await response.json();
    setUsers(data.records);
  };

  const handleSaveUser = async (userData: UserData) => {
    if (userData.id) {
      // Edit existing user
      const response = await fetch('http://192.168.100.76/POKEMAN/backend/update_user.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      toast({
        title: "User updated",
        description: data.message,
      });
    } else {
      // Add new user
      const response = await fetch('http://192.168.100.76/POKEMAN/backend/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      toast({
        title: "User created",
        description: data.message,
      });
    }
    fetchUsers();
    setCurrentView('users');
    setEditingUser(null);
  };

  const handleEditUser = (user: UserData) => {
    setEditingUser(user);
    setCurrentView('add-user');
  };

  const handleDeleteUser = async (userId: string) => {
    const response = await fetch('http://192.168.100.76/POKEMAN/backend/delete_user.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userId }),
    });
    const data = await response.json();
    toast({
      title: "User deleted",
      description: data.message,
      variant: "destructive",
    });
    fetchUsers();
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
