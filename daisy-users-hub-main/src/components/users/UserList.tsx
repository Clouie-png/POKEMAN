import { useState } from 'react';
import { Search, Filter, Users } from 'lucide-react';
import UserCard from './UserCard';

interface UserData {
  id: string;
  username: string;
  email: string;
  createdAt?: string;
  isActive?: boolean;
}

interface UserListProps {
  users: UserData[];
  onEdit: (user: UserData) => void;
  onDelete: (userId: string) => void;
}

const UserList = ({ users, onEdit, onDelete }: UserListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterActive === 'all' ||
      (filterActive === 'active' && user.isActive !== false) ||
      (filterActive === 'inactive' && user.isActive === false);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
          <Users className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-neutral">All Users</h2>
          <p className="text-neutral/60">{users.length} total users</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search Users
                </span>
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by username or email..."
                className="input input-bordered w-full"
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </span>
              </label>
              <select
                value={filterActive}
                onChange={(e) => setFilterActive(e.target.value as 'all' | 'active' | 'inactive')}
                className="select select-bordered"
              >
                <option value="all">All Users</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {filteredUsers.length === 0 ? (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body text-center py-12">
            <Users className="h-16 w-16 mx-auto text-neutral/30 mb-4" />
            <h3 className="text-xl font-semibold text-neutral mb-2">No users found</h3>
            <p className="text-neutral/60">
              {searchTerm || filterActive !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Start by adding your first user'
              }
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;