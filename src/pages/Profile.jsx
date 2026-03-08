import { useState } from 'react'
import { User, Mail, Phone, Cpu, Calendar, Save, Heart, FileText, CheckCircle } from 'lucide-react'
import { userProfile } from '../data/mockData'

export default function Profile() {
  const [profile, setProfile] = useState(userProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [showSaved, setShowSaved] = useState(false)

  const handleSave = () => {
    setIsEditing(false)
    setShowSaved(true)
    setTimeout(() => setShowSaved(false), 2000)
  }

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your health profile and device settings</p>
        </div>
        <div className="flex items-center gap-3">
          {showSaved && (
            <div className="flex items-center gap-2 text-success text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Saved!</span>
            </div>
          )}
          {isEditing ? (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-card border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">{profile.name}</h2>
            <p className="text-muted-foreground">Patient ID: P-{Math.floor(Math.random() * 10000)}</p>
            
            <div className="w-full mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">Age</span>
                <span className="text-sm font-medium text-foreground">{profile.age} years</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">Device Status</span>
                <span className="flex items-center gap-1 text-sm font-medium text-success">
                  <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-70 transition-all"
                />
              </div>
              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  Age
                </label>
                <input
                  type="number"
                  value={profile.age}
                  onChange={(e) => handleChange('age', parseInt(e.target.value))}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-70 transition-all"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-70 transition-all"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-70 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Health Information */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-6">Health Information</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-danger" />
                  <span className="font-medium text-foreground">Personal Diabetes History</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.diabetesHistory}
                    onChange={(e) => handleChange('diabetesHistory', e.target.checked)}
                    disabled={!isEditing}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-border rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary peer-disabled:opacity-70" />
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-warning" />
                  <span className="font-medium text-foreground">Family Diabetes History</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.familyHistory}
                    onChange={(e) => handleChange('familyHistory', e.target.checked)}
                    disabled={!isEditing}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-border rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary peer-disabled:opacity-70" />
                </label>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                  <FileText className="w-4 h-4" />
                  Medical Notes
                </label>
                <textarea
                  value={profile.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-70 resize-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Device Information */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-6">IoT Device Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 bg-muted rounded-xl">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Cpu className="w-4 h-4" />
                  <span className="text-sm">Device ID</span>
                </div>
                <p className="font-mono text-foreground">{profile.deviceId}</p>
              </div>

              <div className="p-4 bg-muted rounded-xl">
                <div className="text-sm text-muted-foreground mb-1">Last Sync</div>
                <p className="text-foreground">{profile.lastSync}</p>
              </div>

              <div className="p-4 bg-success-light rounded-xl sm:col-span-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                  <span className="font-medium text-success">Sensor Connected & Operational</span>
                </div>
                <p className="text-sm text-foreground/70 mt-1">
                  Your bathroom IoT sensor is actively monitoring and transmitting glucose data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
