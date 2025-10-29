import React from 'react';

interface AdminToolbarProps {
  currentUser: string | null;
  onLogout: () => void;
  isEditMode: boolean;
  toggleEditMode: () => void;
}

const AdminToolbar: React.FC<AdminToolbarProps> = ({ currentUser, onLogout, isEditMode, toggleEditMode }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-slate-900 text-white h-14 z-50 shadow-lg flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold">Welcome, <span className="text-brand-gold">{currentUser}</span></span>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleEditMode}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isEditMode
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
        </button>
        <button
          onClick={onLogout}
          className="px-3 py-2 rounded-md text-sm font-medium bg-slate-700 hover:bg-slate-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminToolbar;
