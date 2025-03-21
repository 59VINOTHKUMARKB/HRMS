import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { User, Mail, Calendar, Building, Briefcase, Hash, Clock } from "lucide-react"

const EmployeeProfile = () => {
  const { currentUser } = useSelector((state) => state.user)
  const userId = currentUser.id

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/users/profile/employee/${userId}`)
        const data = await response.json()
        setProfile(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching profile:", error)
        setLoading(false)
      }
    }

    fetchProfile()
  }, [userId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg text-gray-500">Profile not found</p>
      </div>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 overflow-hidden rounded-lg bg-white shadow-md">
          <div className="px-6 pb-6 mt-10">
            <div className="flex justify-center">
              <div className="w-28 h-28 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  <User className="w-12 h-12 text-gray-400" strokeWidth={1.5} />
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {profile.role}
              </div>
              <p className="text-sm text-gray-500 mt-2">{profile.email}</p>
            </div>

            <div className="h-px bg-gray-200 my-4"></div>

            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-gray-500">Last login:</span>
                <span className="ml-auto font-medium">{formatDate(profile.lastLogin)}</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-gray-500">Joined:</span>
                <span className="ml-auto font-medium">{formatDate(profile.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Information Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Information */}
          <div className="rounded-lg bg-white shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-xl font-semibold flex items-center">
                <User className="w-5 h-5 mr-2" />
                Account Information
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <div className="flex items-center p-3 rounded-md bg-gray-50">
                    <Mail className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{profile.email}</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-500">User ID</label>
                  <div className="flex items-center p-3 rounded-md bg-gray-50">
                    <Hash className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm font-mono">{profile.id}</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="flex items-center p-3 rounded-md bg-gray-50">
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${profile.isActive ? "bg-green-500" : "bg-red-500"}`}
                    ></div>
                    <span>{profile.isActive ? "Active" : "Inactive"}</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-500">Role</label>
                  <div className="flex items-center p-3 rounded-md bg-gray-50">
                    <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{profile.role}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Organization Information */}
          {profile.organization && (
            <div className="rounded-lg bg-white shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-xl font-semibold flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Organization Details
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-500">Organization Name</label>
                    <div className="p-3 rounded-md bg-gray-50">{profile.organization.name}</div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-500">Organization Code</label>
                    <div className="p-3 rounded-md bg-gray-50 font-medium">{profile.organization.code}</div>
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-sm font-medium text-gray-500">Description</label>
                    <div className="p-3 rounded-md bg-gray-50 text-sm">{profile.organization.description}</div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-500">Organization ID</label>
                    <div className="p-3 rounded-md bg-gray-50 text-sm font-mono">{profile.organization.id}</div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-500">Created At</label>
                    <div className="p-3 rounded-md bg-gray-50 text-sm">
                      {formatDate(profile.organization.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmployeeProfile

