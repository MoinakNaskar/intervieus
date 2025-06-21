"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  Home, 
  Briefcase, 
  FileText, 
  User,
  Upload,
  Star,
  Sparkles,
  Building2,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Crown
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  // Hide sidebar on interview pages
  const isInterviewPage = pathname.includes('/interview');

  const navigationItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
      description: "Dashboard"
    },
    {
      name: "Jobs",
      href: "/jobs",
      icon: Briefcase,
      description: "Find opportunities"
    },
    {
      name: "Resume",
      href: "/resume",
      icon: FileText,
      description: "CV & AI feedback"
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
      description: "Your account"
    },
    {
      name: "Pricing",
      href: "/pricing",
      icon: Crown,
      description: "Subscription plans"
    }
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const handleNavClick = () => {
    setIsMobileOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  // Don't render sidebar on interview pages
  if (isInterviewPage) {
    return null;
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className={`sidebar-container ${isMobileOpen ? 'sidebar-mobile-open' : ''} ${isSidebarHidden ? 'sidebar-hidden' : ''}`}>
        <div className="sidebar">
          <div className="sidebar-header">
            <Link href="/" className="sidebar-brand">
              <Image src="/logo.svg" alt="InterVeus Logo" width={38} height={32} />
              <h2 className="sidebar-brand-text">InterVeus</h2>
            </Link>
            <button 
              className="sidebar-toggle-btn"
              onClick={toggleSidebar}
              title={isSidebarHidden ? "Show sidebar" : "Hide sidebar"}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
          
          <nav className="sidebar-nav">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              const isPricing = item.name === "Pricing";
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`sidebar-item ${active ? 'sidebar-item-active' : ''} ${isPricing ? 'sidebar-item-premium' : ''}`}
                  onClick={handleNavClick}
                >
                  <div className="sidebar-item-content">
                    <Icon className={`sidebar-icon ${isPricing ? 'text-yellow-400' : ''}`} />
                    <div className="sidebar-item-text">
                      <span className="sidebar-item-name">{item.name}</span>
                      <span className="sidebar-item-description">{item.description}</span>
                    </div>
                    {isPricing && (
                      <div className="premium-badge">
                        <Crown className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="sidebar-footer">
            <div className="sidebar-features">
              <h4 className="sidebar-features-title">Quick Actions</h4>
              <div className="sidebar-features-grid">
                <div className="sidebar-feature">
                  <Upload className="sidebar-feature-icon" />
                  <span>Upload CV</span>
                </div>
                <div className="sidebar-feature">
                  <Star className="sidebar-feature-icon" />
                  <span>Get Score</span>
                </div>
                <div className="sidebar-feature">
                  <Sparkles className="sidebar-feature-icon" />
                  <span>AI CV</span>
                </div>
                <div className="sidebar-feature">
                  <Building2 className="sidebar-feature-icon" />
                  <span>Job Match</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Show sidebar button when hidden - positioned outside sidebar container */}
      {isSidebarHidden && (
        <button 
          className="sidebar-show-btn"
          onClick={toggleSidebar}
          title="Show sidebar"
        >
          <ChevronRight className="w-5 h-5" />
          <span className="sidebar-show-text">Menu</span>
        </button>
      )}
    </>
  );
};

export default Sidebar; 