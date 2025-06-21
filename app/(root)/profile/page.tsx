import { Button } from "@/components/ui/button";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Settings, 
  Bell,
  Shield,
  Download,
  LogOut
} from "lucide-react";

import { getCurrentUser } from "@/lib/actions/auth.action";

async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Your Profile</h2>
          <p className="text-lg">
            Manage your account settings and personal information
          </p>
        </div>

        <div className="max-sm:hidden">
          <User className="w-32 h-32 text-primary-200" />
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Personal Information</h2>
        
        <div className="profile-grid">
          <div className="profile-card">
            <div className="profile-header">
              <User className="w-8 h-8 text-primary-200" />
              <div>
                <h3>Basic Information</h3>
                <p>Update your personal details</p>
              </div>
              <Button className="btn-secondary">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
            
            <div className="profile-info">
              <div className="info-item">
                <span className="info-label">Name</span>
                <span className="info-value">{user?.name || 'Not provided'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{user?.email || 'Not provided'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Phone</span>
                <span className="info-value">+1 (555) 123-4567</span>
              </div>
              <div className="info-item">
                <span className="info-label">Location</span>
                <span className="info-value">San Francisco, CA</span>
              </div>
            </div>
          </div>

          <div className="profile-card">
            <div className="profile-header">
              <Settings className="w-8 h-8 text-primary-200" />
              <div>
                <h3>Account Settings</h3>
                <p>Manage your preferences</p>
              </div>
            </div>
            
            <div className="settings-list">
              <div className="setting-item">
                <div className="setting-info">
                  <Bell className="w-5 h-5" />
                  <div>
                    <span className="setting-name">Email Notifications</span>
                    <span className="setting-desc">Receive updates about interviews</span>
                  </div>
                </div>
                <Button className="btn-secondary">Configure</Button>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <Shield className="w-5 h-5" />
                  <div>
                    <span className="setting-name">Privacy Settings</span>
                    <span className="setting-desc">Control your data visibility</span>
                  </div>
                </div>
                <Button className="btn-secondary">Manage</Button>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <Download className="w-5 h-5" />
                  <div>
                    <span className="setting-name">Export Data</span>
                    <span className="setting-desc">Download your information</span>
                  </div>
                </div>
                <Button className="btn-secondary">Export</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Interview Statistics</h2>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <h3>Total Interviews</h3>
            </div>
            <div className="stat-value">24</div>
            <div className="stat-change positive">+12% this month</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <h3>Average Score</h3>
            </div>
            <div className="stat-value">8.7/10</div>
            <div className="stat-change positive">+0.3 from last month</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <h3>Skills Mastered</h3>
            </div>
            <div className="stat-value">12</div>
            <div className="stat-change positive">+3 new skills</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <h3>Practice Hours</h3>
            </div>
            <div className="stat-value">48h</div>
            <div className="stat-change positive">+8h this week</div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Account Actions</h2>
        
        <div className="account-actions">
          <Button className="btn-secondary">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </section>
    </>
  );
}

export default ProfilePage; 