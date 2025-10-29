import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { useData } from '../contexts/DataContext';
import { Member, MembersData } from '../data/initialData';


interface LeadershipStructureProps {
  isEditMode: boolean;
}

const MemberCard: React.FC<{ member: Member; size?: 'sm' | 'md'; isEditMode: boolean; onEdit: () => void; }> = ({ member, size = 'md', isEditMode, onEdit }) => {
    const { role, name, imageUrl, tupoksi, skills } = member;
    const sizeClasses = {
        md: { card: 'w-52 h-64', image: 'w-24 h-24', role: 'text-lg', name: 'text-sm' },
        sm: { card: 'w-40 h-52', image: 'w-16 h-16', role: 'text-base', name: 'text-xs' },
    };
    const s = sizeClasses[size];

    const editIndicator = (
      <div className="absolute inset-0 border-2 border-dashed border-blue-400 rounded-lg pointer-events-none">
        <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-1 shadow-lg">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg>
        </div>
      </div>
    );

    return (
        <div className={`relative group [perspective:1000px] ${s.card}`} onClick={isEditMode ? onEdit : undefined} style={{ cursor: isEditMode ? 'pointer' : 'default' }}>
            <div className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ease-in-out ${!isEditMode && 'group-hover:[transform:rotateY(180deg)]'}`}>
                {/* Front Side */}
                <div className="absolute w-full h-full [backface-visibility:hidden] bg-white text-center p-3 rounded-lg shadow-lg flex flex-col items-center justify-center">
                    <img src={imageUrl} alt={name} className={`${s.image} rounded-full object-cover mx-auto mb-3 shadow-md border-4 border-slate-200`} />
                    <h4 className={`font-bold text-slate-800 ${s.role}`}>{role}</h4>
                    <p className={`text-slate-600 ${s.name}`}>{name}</p>
                </div>
                {/* Back Side */}
                <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-brand-blue text-white p-4 rounded-lg shadow-lg flex flex-col justify-center">
                    <h4 className="font-bold text-brand-gold text-sm mb-2 border-b border-brand-gold/50 pb-1">
                        {tupoksi ? 'Tugas Pokok' : 'Kemampuan'}
                    </h4>
                    <ul className="text-xs space-y-1 text-left list-disc list-inside">
                        {(tupoksi || skills)?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
            {isEditMode && editIndicator}
        </div>
    );
};

const ConnectingLine: React.FC<{ height?: string }> = ({ height = 'h-12' }) => (
    <div className={`w-px bg-slate-300 mx-auto ${height}`}></div>
);

const CommissionGroup: React.FC<{ coordinator: Member; isEditMode: boolean; onEditMember: (member: Member) => void; }> = ({ coordinator, isEditMode, onEditMember }) => (
    <div className="relative flex flex-col items-center pt-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-slate-300"></div>
        <MemberCard member={coordinator} isEditMode={isEditMode} onEdit={() => onEditMember(coordinator)} />
        {coordinator.members && coordinator.members.length > 0 && (
            <>
                <ConnectingLine height="h-8" />
                <div className="flex flex-wrap justify-center gap-4">
                    {coordinator.members.map((member) => (
                        <MemberCard key={member.id} member={member} size="sm" isEditMode={isEditMode} onEdit={() => onEditMember(member)} />
                    ))}
                </div>
            </>
        )}
    </div>
);

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const EditMemberModal: React.FC<{ member: Member; onSave: (updatedMember: Member) => void; onClose: () => void; }> = ({ member, onSave, onClose }) => {
  const [formData, setFormData] = useState(member);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value }));
  }
  
  const handleListChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value.split('\n').filter(s => s.trim() !== '')}))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImageFile(file);
      setFormData(prev => ({...prev, imageUrl: URL.createObjectURL(file)}));
    }
  }

  const handleSave = async () => {
    let finalData = { ...formData };
    if (newImageFile) {
        try {
            const base64 = await fileToBase64(newImageFile);
            finalData.imageUrl = base64;
        } catch (err) {
            console.error(err);
            alert("Gagal memproses gambar.");
            return;
        }
    }
    onSave(finalData);
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[101] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md relative animate-fade-in-down" style={{animationDuration: '0.3s'}}>
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-slate-500 hover:text-slate-800">&times;</button>
        <h3 className="text-2xl font-bold text-brand-blue mb-6">Edit Anggota</h3>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Foto</label>
              <div className="mt-1 flex items-center gap-4">
                  <img src={formData.imageUrl} alt="preview" className="w-20 h-20 rounded-full object-cover border-2 border-slate-200" />
                  <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
              </div>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">Nama</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleTextChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue" />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-slate-700">Jabatan</label>
              <input type="text" name="role" id="role" value={formData.role} onChange={handleTextChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue" />
            </div>
            {formData.tupoksi && (
              <div>
                <label htmlFor="tupoksi" className="block text-sm font-medium text-slate-700">Tugas Pokok (satu per baris)</label>
                <textarea name="tupoksi" id="tupoksi" rows={4} value={formData.tupoksi.join('\n')} onChange={handleListChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"></textarea>
              </div>
            )}
            {formData.skills && (
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-slate-700">Kemampuan (satu per baris)</label>
                <textarea name="skills" id="skills" rows={4} value={formData.skills.join('\n')} onChange={handleListChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"></textarea>
              </div>
            )}
        </div>
        <div className="text-right pt-6 mt-4 border-t">
            <button onClick={handleSave} className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors">Terapkan Perubahan</button>
        </div>
      </div>
    </div>
  );
};


const LeadershipStructure: React.FC<LeadershipStructureProps> = ({ isEditMode }) => {
    const { editedData, setEditedLeadership } = useData();
    const [editingMember, setEditingMember] = useState<Member | null>(null);

    const handleEditMember = (member: Member) => {
        setEditingMember(member);
    };

    const handleSaveMember = (updatedMember: Member) => {
        if (!editedData) return;

        const updateRecursive = (memberList: Member[]): Member[] => {
            return memberList.map(m => {
                if (m.id === updatedMember.id) {
                    return updatedMember;
                }
                if (m.members) {
                    return { ...m, members: updateRecursive(m.members) };
                }
                return m;
            });
        };
        
        const newLeadershipData: MembersData = {
            top: updateRecursive(editedData.leadership.top),
            mid: updateRecursive(editedData.leadership.mid),
            commissions: updateRecursive(editedData.leadership.commissions)
        };
        
        setEditedLeadership(newLeadershipData);
        setEditingMember(null);
    };

  return (
    <SectionWrapper id="leadership" title="Struktur Kepemimpinan" bgClass="bg-slate-50">
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-center items-center flex-col">
            <div className="flex flex-wrap justify-center gap-8">
                {editedData.leadership.top.map(member => <MemberCard key={member.id} member={member} isEditMode={isEditMode} onEdit={() => handleEditMember(member)} />)}
            </div>
            <ConnectingLine />
            <div className="flex flex-wrap justify-center gap-8">
                {editedData.leadership.mid.map(member => <MemberCard key={member.id} member={member} isEditMode={isEditMode} onEdit={() => handleEditMember(member)} />)}
            </div>
            <ConnectingLine />
            <div className="w-full h-px bg-slate-300"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 w-full mt-4">
                {editedData.leadership.commissions.map(commission => <CommissionGroup key={commission.id} coordinator={commission} isEditMode={isEditMode} onEditMember={handleEditMember} />)}
            </div>
            </div>
        </div>
      {editingMember && (
          <EditMemberModal
            member={editingMember}
            onSave={handleSaveMember}
            onClose={() => setEditingMember(null)}
          />
      )}
    </SectionWrapper>
  );
};

export default LeadershipStructure;
