import { useState } from 'react';
import { 
  FiUser, FiMail, FiPhone, FiMapPin, 
  FiEdit2, FiSave, FiUpload
} from 'react-icons/fi';

const EmployeeProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 234-567-8900',
    department: 'Engineering',
    position: 'Senior Developer',
    joinDate: '2022-03-15',
    address: '123 Main St, New York, NY 10001',
    emergencyContact: {
      name: 'Jane Doe',
      relation: 'Spouse',
      phone: '+1 234-567-8901'
    }
  });

  const handleSave = () => {
    setIsEditing(false);
    // Add API call to save profile changes
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          {isEditing ? (
            <>
              <FiSave className="mr-2" /> Save Changes
            </>
          ) : (
            <>
              <FiEdit2 className="mr-2" /> Edit Profile
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Photo & Basic Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <FiUser className="w-16 h-16 text-gray-400" />
              </div>
              {isEditing && (
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
                  <FiUpload className="mr-2" /> Upload Photo
                </button>
              )}
              <h2 className="text-xl font-medium mt-4">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-gray-500">{profile.position}</p>
              <p className="text-sm text-gray-500 mt-1">{profile.department}</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  value={profile.firstName}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={profile.lastName}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  value={profile.address}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <h2 className="text-lg font-medium mt-8 mb-4">Emergency Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={profile.emergencyContact.name}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Relation</label>
                <input
                  type="text"
                  value={profile.emergencyContact.relation}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={profile.emergencyContact.phone}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile; 