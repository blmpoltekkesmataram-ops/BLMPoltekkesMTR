import React, { useState } from 'react';

interface LoginProps {
  onLogin: (user: string) => void;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // --- DEMO LOGIN LOGIC ---
    // In a real application, this would be a secure API call to a backend server.
    if (email === 'blmpoltekkesmataram@gmail.com' && password === 'V1vaLegislativa') {
      onLogin('admin');
    } else {
      setError('Email atau password salah.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 animate-fade-in-down" style={{animationDuration: '0.3s'}}>
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-sm relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-2xl text-slate-400 hover:text-slate-800 transition-colors">&times;</button>
        
        <h2 className="text-2xl font-bold text-brand-blue text-center mb-4">Admin Login</h2>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-3 text-xs mb-6">
          <p><strong>Peringatan Keamanan:</strong> Ini adalah sistem login demo. Jangan gunakan sistem seperti ini pada website publik yang sebenarnya tanpa backend yang aman.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="pt-2">
            <button type="submit" className="w-full bg-brand-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-900 transition-colors">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
