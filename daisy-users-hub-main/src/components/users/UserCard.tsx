import { User, Mail, Edit, Trash2, UserCheck } from 'lucide-react';

interface UserData {
  id: string;
  username: string;
  email: string;
  createdAt?: string;
  isActive?: boolean;
}

interface UserCardProps {
  user: UserData;
  onEdit: (user: UserData) => void;
  onDelete: (userId: string) => void;
}

const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300">
      <div className="card-body">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-12">
                <span className="text-lg font-semibold">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div>
              <h3 className="card-title text-lg font-semibold text-neutral">
                {user.username}
              </h3>
              <div className="flex items-center gap-1 text-neutral/60">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{user.email}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {user.isActive !== false && (
              <div className="badge badge-success gap-1">
                <UserCheck className="h-3 w-3" />
                Active
              </div>
            )}
          </div>
        </div>
        
        {user.createdAt && (
          <div className="text-xs text-neutral/50 mt-2">
            Created: {new Date(user.createdAt).toLocaleDateString()}
          </div>
        )}
        
        <div className="card-actions justify-end mt-4 gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit(user);
            }}
            className="btn btn-outline btn-primary btn-sm gap-1 hover:scale-105 transition-transform"
          >
            <Edit className="h-3 w-3" />
            Edit
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (window.confirm('Are you sure you want to delete this user?')) {
                onDelete(user.id);
              }
            }}
            className="btn btn-outline btn-error btn-sm gap-1 hover:scale-105 transition-transform"
          >
            <Trash2 className="h-3 w-3" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;