import { useState } from 'react';
import { User, Mail, Lock, Save, X } from 'lucide-react';

interface UserData {
  id?: string;
  name: string;
  email: string;
}

interface UserFormProps {
  user?: UserData;
  onSave: (userData: UserData) => void;
  onCancel: () => void;
}

const UserForm = ({ user, onSave, onCancel }: UserFormProps) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!user && !formData.password) {
      newErrors.password = 'Password is required for new users';
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        id: user?.id,
        name: formData.name,
        email: formData.email,
      });
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="card-title text-2xl text-neutral">
              {user ? 'Edit User' : 'Add New User'}
            </h2>
            <p className="text-neutral/60">
              {user ? 'Update user information' : 'Create a new user account'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Name
              </span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter name"
              className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
            />
            {errors.name && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.name}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email address"
              className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
            />
            {errors.email && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.email}</span>
              </label>
            )}
          </div>

          {!user && (
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </span>
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter password"
                className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
              />
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.password}</span>
                </label>
              )}
            </div>
          )}

          <div className="card-actions justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onCancel();
              }}
              className="btn btn-outline btn-neutral gap-2 hover:scale-105 transition-transform"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary gap-2 hover:scale-105 transition-transform"
              disabled={Object.keys(errors).length > 0}
            >
              <Save className="h-4 w-4" />
              {user ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;