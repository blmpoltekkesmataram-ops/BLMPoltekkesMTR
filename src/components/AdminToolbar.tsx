import React from 'react';

interface AdminToolbarProps {
  currentUser: string | null;
  onLogout: () => void;
  isEditMode: boolean;
  toggleEditMode: () => void;
  onSaveAll: () => void;
  isSaving: boolean;
}

const AdminToolbar: React.FC<AdminToolbarProps> = ({ currentUser, onLogout, isEditMode, toggleEditMode, onSaveAll, isSaving }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-slate-900 text-white h-14 z-50 shadow-lg flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold">Welcome, <span className="text-brand-gold">{currentUser}</span></span>
      </div>
      <div className="flex items-center gap-4">
        {isEditMode && (
          <button
            onClick={onSaveAll}
            disabled={isSaving}
            className="px-3 py-2 rounded-md text-sm font-medium bg-green-600 hover:bg-green-700 transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Menyimpan...' : 'Simpan Semua Perubahan'}
          </button>
        )}
        <button
          onClick={toggleEditMode}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isEditMode
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isEditMode ? 'Batal & Keluar Mode Edit' : 'Enter Edit Mode'}
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