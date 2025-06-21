"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Header = () => {
  const pathname = usePathname();
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  // Check if sidebar is hidden by looking for the sidebar-hidden class
  useEffect(() => {
    const checkSidebarState = () => {
      const sidebarContainer = document.querySelector('.sidebar-container');
      if (sidebarContainer) {
        setIsSidebarHidden(sidebarContainer.classList.contains('sidebar-hidden'));
      }
    };

    // Check initially
    checkSidebarState();

    // Set up a mutation observer to watch for class changes
    const observer = new MutationObserver(checkSidebarState);
    const sidebarContainer = document.querySelector('.sidebar-container');
    
    if (sidebarContainer) {
      observer.observe(sidebarContainer, {
        attributes: true,
        attributeFilter: ['class']
      });
    }

    return () => observer.disconnect();
  }, []);

  // Hide header on interview pages or when sidebar is visible
  const isInterviewPage = pathname.includes('/interview');
  const shouldShowHeader = !isInterviewPage && isSidebarHidden;

  if (!shouldShowHeader) {
    return null;
  }

  return (
    <div className="main-header">
      <Link href="/" className="main-header-brand">
        <Image src="/logo.svg" alt="InterVeus Logo" width={38} height={32} />
        <h2 className="main-header-text">InterVeus</h2>
      </Link>
    </div>
  );
};

export default Header; 