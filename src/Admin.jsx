import React, { useState, useMemo } from 'react';
import { useProducts } from './ProductContext';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Trash2, Save, X, Pencil, Users, AlertCircle } from 'lucide-react';

const Admin = () => {
  const { staff, addStaff, updateStaff, deleteStaff, user, updateUser } = useProducts();
  const navigate = useNavigate();
  
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', // Ism maydoni qo'shildi
    email: '',
    password: '',
    role: 'staff'
  });

  // Ro'yxatda joriy foydalanuvchini ham ko'rsatish
  const allMembers = useMemo(() => {
    const mappedStaff = staff.map(s => ({
      ...s,
      isMe: s.email === user?.email
    }));

    const isUserInStaff = staff.some(s => s.email === user?.email);
    if (!isUserInStaff && user) {
      return [{ ...user, id: 'current-admin', isMe: true, name: user.name || 'Admin' }, ...mappedStaff];
    }
    
    return mappedStaff;
  }, [staff, user]);

  // Ism bandligini tekshirish (Real-time validation)
  const isNameTaken = useMemo(() => {
    if (!formData.name.trim()) return false;
    
    return allMembers.some(member => {
      // Tahrirlashda o'zining joriy ismini hisobga olmaymiz
      if (editingId && member.id === editingId) return false;
      
      return member.name?.toLowerCase() === formData.name.trim().toLowerCase() ||
             member.email?.toLowerCase().split('@')[0] === formData.name.trim().toLowerCase();
    });
  }, [formData.name, allMembers, editingId]);

  // Tugma holati
  const isFormChanged = useMemo(() => {
    if (!formData.email.trim() || !formData.password.trim() || !formData.name.trim() || isNameTaken) return false;
    
    const original = allMembers.find(m => m.id === editingId);
    if (!original) return true;
    
    return formData.name !== (original.name || '') ||
           formData.email !== original.email || 
           formData.password !== original.password || 
           formData.role !== original.role;
  }, [formData, editingId, allMembers, isNameTaken]);

  const handleStaffSubmit = (e) => {
    e.preventDefault();
    
    if (isNameTaken) {
      alert('Bu ismli foydalanuvchi allaqachon mavjud! Iltimos, boshqa ism tanlang.');
      return;
    }

    const selectedMember = allMembers.find(m => m.id === editingId);
    const isEditingSelf = selectedMember?.isMe;

    if (isEditingSelf && formData.role === 'staff') {
      const confirmChange = window.confirm('Diqqat! Rolingizni o\'zgartirsangiz, ushbu sahibaga qayta kira olmaysiz. Tasdiqlaysizmi?');
      if (!confirmChange) return;
    }

    const updatedData = { ...formData };

    if (editingId) {
      if (isEditingSelf) {
        updateUser(updatedData);
      }
      if (editingId !== 'current-admin') {
        updateStaff(editingId, updatedData);
      }
      alert('Ma\'lumotlar muvaffaqiyatli yangilandi!');
      if (isEditingSelf && formData.role === 'staff') navigate('/products');
    } else {
      const success = addStaff(formData.email, formData.password, formData.role);
      if (success) {
        // Staff ro'yxatida name yo'qligi sababli, uni ham yangilash kerak bo'lishi mumkin
        // Lekin hozircha context dagi addStaff faqat email/pass oladi. 
        // Uni updateStaff bilan boyitish mumkin yoki contextni o'zgartirish kerak.
        const newStaffMember = staff.find(s => s.email === formData.email);
        if (newStaffMember) {
            updateStaff(newStaffMember.id, { name: formData.name });
        }
        alert('Yangi xodim muvaffaqiyatli qo\'shildi!');
      }
    }

    resetForm();
  };

  const startEdit = (member) => {
    setEditingId(member.id);
    setFormData({
      name: member.name || member.email.split('@')[0],
      email: member.email,
      password: member.password || '',
      role: member.role
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'staff'
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-md border border-gray-50">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-700">
            {editingId ? <Pencil className="w-8 h-8" /> : <UserPlus className="w-8 h-8" />}
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900">
              {editingId ? 'Ma\'lumotlarni tahrirlash' : 'Yangi xodim qo\'shish'}
            </h2>
            <p className="text-gray-500 text-sm font-bold">Xodimlar va adminlarni boshqarish tizimi</p>
          </div>
        </div>

        <form onSubmit={handleStaffSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Ism (Username)</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full px-5 py-4 bg-slate-50 border ${isNameTaken ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100'} rounded-2xl outline-none focus:ring-2 ${isNameTaken ? 'focus:ring-red-200' : 'focus:ring-indigo-200'} font-bold transition-all`}
                  placeholder="Admin ismi"
                />
                {isNameTaken && (
                  <div className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-500 text-[10px] font-bold italic animate-pulse">
                    <AlertCircle className="w-3 h-3" /> Bu ism band!
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-5 py-4 bg-slate-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-200 font-bold"
                placeholder="misol@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Parol</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-5 py-4 bg-slate-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-200 font-bold"
                placeholder="******"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Rol</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full px-5 py-4 bg-slate-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-200 font-bold cursor-pointer"
              >
                <option value="staff">Staff (Xodim)</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-black text-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" /> Bekor qilish
              </button>
            )}
            <button
              type="submit"
              disabled={!isFormChanged || isNameTaken}
              className={`flex-[2] py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 ${
                isFormChanged && !isNameTaken
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Save className="w-6 h-6" /> 
              {editingId ? 'O\'zgarishlarni saqlash' : 'Xodimni saqlash'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-md overflow-hidden border border-gray-50">
        <div className="px-8 py-6 border-b border-gray-50 flex items-center gap-3">
          <Users className="text-indigo-600 w-6 h-6" />
          <h3 className="font-black text-xl text-gray-900">Barcha xodimlar</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Foydalanuvchi</th>
              <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Rol</th>
              <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {allMembers.map((member) => (
              <tr 
                key={member.id} 
                className={`hover:bg-indigo-50/50 transition-colors cursor-pointer group ${editingId === member.id ? 'bg-indigo-50' : ''}`}
                onClick={() => startEdit(member)}
              >
                <td className="px-8 py-5">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-700 flex items-center gap-2">
                      {member.name || member.email.split('@')[0]}
                      {member.isMe && (
                        <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-black uppercase shadow-sm">Siz</span>
                      )}
                    </span>
                    <span className="text-xs text-gray-400 font-bold">{member.email}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter ${
                    member.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {member.role}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); startEdit(member); }}
                      className="text-gray-300 hover:text-indigo-600 transition-colors p-2"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    {!member.isMe && (
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteStaff(member.id); }}
                        className="text-gray-300 hover:text-red-600 transition-colors p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
