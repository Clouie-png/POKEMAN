import { UserCard, UserProps } from './UserCard';

interface UserListProps {
  users: UserProps[];
  onEdit: (user: UserProps) => void;
  onDelete: (userId: string) => void;
}

export function UserList({ users, onEdit, onDelete }: UserListProps) {
  if (users.length === 0) {
    return <div className="text-center">No users found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

