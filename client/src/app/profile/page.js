'use client';

import { useAuth } from '@/hooks/useAuth';
import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import { User, Phone, Mail, Camera, Lock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfilePage() {
    const { user } = useSelector((state) => state.auth);
    const { updateProfile, changePassword, isUpdating, isChangingPassword } = useAuth();

    const [activeTab, setActiveTab] = useState('profile');
    const [profileData, setProfileData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        phone: user?.phone || '',
        image: user?.image || '',
    });

    const [passwordData, setPasswordData] = useState({
        oldPass: '',
        newPass: '',
        confirmPass: '',
    });

    const [message, setMessage] = useState({ type: '', text: '' });
    const fileInputRef = useRef(null);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(profileData);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Update failed' });
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordData.newPass !== passwordData.confirmPass) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }
        try {
            await changePassword({ oldPass: passwordData.oldPass, newPass: passwordData.newPass });
            setMessage({ type: 'success', text: 'Password changed successfully!' });
            setPasswordData({ oldPass: '', newPass: '', confirmPass: '' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Password change failed' });
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData({ ...profileData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-neutral-950 pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 space-y-2">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'profile' ? 'bg-white text-neutral-900 font-semibold' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                                }`}
                        >
                            <User className="w-5 h-5" />
                            Profile Details
                        </button>
                        <button
                            onClick={() => setActiveTab('password')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'password' ? 'bg-white text-neutral-900 font-semibold' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                                }`}
                        >
                            <Lock className="w-5 h-5" />
                            Security
                        </button>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                        <AnimatePresence mode="wait">
                            {message.text && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                        }`}
                                >
                                    {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                    {message.text}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {activeTab === 'profile' ? (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-full overflow-hidden bg-neutral-800 border-2 border-neutral-700 group-hover:border-white transition-all">
                                            {profileData.image ? (
                                                <img src={profileData.image} alt="Avatar" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-neutral-500">
                                                    <User className="w-10 h-10" />
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="absolute bottom-0 right-0 p-2 bg-white text-neutral-900 rounded-full shadow-lg hover:scale-110 transition-transform"
                                        >
                                            <Camera className="w-4 h-4" />
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-1">{user.firstName} {user.lastName}</h2>
                                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-semibold uppercase tracking-wider">
                                            {user.role?.name || user.role || 'Client'}
                                        </span>
                                    </div>
                                </div>

                                <form onSubmit={handleProfileUpdate} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-400 mb-2">First Name</label>
                                            <input
                                                type="text"
                                                value={profileData.firstName}
                                                onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-all"
                                                placeholder="John"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-400 mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                value={profileData.lastName}
                                                onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-all"
                                                placeholder="Doe"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-2">Email (Read-only)</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                                            <input
                                                type="email"
                                                value={user.email}
                                                disabled
                                                className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl px-4 py-3 pl-12 text-neutral-500 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-2">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                                            <input
                                                type="tel"
                                                value={profileData.phone}
                                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 pl-12 text-white focus:outline-none focus:border-white transition-all"
                                                placeholder="+1 234 567 890"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isUpdating}
                                        className="w-full md:w-auto bg-white text-neutral-900 font-bold px-8 py-3 rounded-xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
                                    >
                                        {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Changes'}
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="password"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-white mb-2">Update Password</h2>
                                    <p className="text-neutral-400 text-sm">Ensure your account is using a long, random password to stay secure.</p>
                                </div>

                                <form onSubmit={handlePasswordChange} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-2">Current Password</label>
                                        <input
                                            type="password"
                                            value={passwordData.oldPass}
                                            onChange={(e) => setPasswordData({ ...passwordData, oldPass: e.target.value })}
                                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-2">New Password</label>
                                        <input
                                            type="password"
                                            value={passwordData.newPass}
                                            onChange={(e) => setPasswordData({ ...passwordData, newPass: e.target.value })}
                                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-2">Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={passwordData.confirmPass}
                                            onChange={(e) => setPasswordData({ ...passwordData, confirmPass: e.target.value })}
                                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-all"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isChangingPassword}
                                        className="w-full md:w-auto bg-white text-neutral-900 font-bold px-8 py-3 rounded-xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
                                    >
                                        {isChangingPassword ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Update Password'}
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
