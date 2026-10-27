/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { MarketingSection } from './components/MarketingSection';
import { DesignSection } from './components/DesignSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ContactSection } from './components/ContactSection';
import { AdminCMSDrawer } from './components/AdminCMSDrawer';
import { Toast, ToastMessage } from './components/Toast';
import { 
  SiteData, 
  Project, 
  ContactInquiry 
} from './types/portfolio';
import { 
  loadSiteData, 
  saveSiteData, 
  resetSiteData, 
  applyThemeToDOM, 
  applySEOToDOM 
} from './utils/portfolio-data';

export default function App() {
  const [siteData, setSiteData] = useState<SiteData>(() => loadSiteData());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCMSOpen, setIsCMSOpen] = useState<boolean>(false);
  const [prefillNewProject, setPrefillNewProject] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Show Toast Helper
  const showToast = useCallback((text: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Apply theme and SEO on load and whenever siteData changes
  useEffect(() => {
    applyThemeToDOM(siteData.theme);
    applySEOToDOM(siteData.seo);
  }, [siteData.theme, siteData.seo]);

  // Update site data and persist
  const handleUpdateSiteData = (newData: SiteData) => {
    setSiteData(newData);
    saveSiteData(newData);
  };

  // Reset to default data
  const handleResetDefaults = () => {
    const defaults = resetSiteData();
    setSiteData(defaults);
    applyThemeToDOM(defaults.theme);
    applySEOToDOM(defaults.seo);
  };

  // Copy email to clipboard
  const handleCopyEmail = () => {
    const email = siteData.socials.email || 'sansolll97@naver.com';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        showToast(`이메일(${email})이 클립보드에 복사되었습니다.`, 'success');
      }).catch(() => {
        showToast(`이메일: ${email}`, 'info');
      });
    } else {
      showToast(`이메일: ${email}`, 'info');
    }
  };

  // Scroll Helpers
  const scrollToMarketing = () => {
    const el = document.getElementById('marketing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDesign = () => {
    const el = document.getElementById('design');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f1f5f9] selection:bg-[var(--accent-color)] selection:text-black font-sans relative">
      {/* Global Navigation Bar */}
      <Navbar
        onOpenCMS={() => {
          setPrefillNewProject(false);
          setIsCMSOpen(true);
        }}
        statusBadge={siteData.theme.statusBadge}
      />

      <main>
        {/* Hero Section */}
        <HeroSection
          theme={siteData.theme}
          onExploreMarketing={scrollToMarketing}
          onExploreDesign={scrollToDesign}
          onOpenContact={scrollToContact}
        />

        {/* About & Profile Section (Licenses, Contact Info, Skills) */}
        <AboutSection 
          theme={siteData.theme} 
          profile={siteData.profile} 
        />

        {/* SECTION 01: Marketing Impact (Placed ABOVE Design as requested) */}
        <MarketingSection
          marketingProjects={siteData.marketingProjects}
          metrics={siteData.metrics}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* SECTION 02: Design Works (Placed BELOW Marketing as requested) */}
        <DesignSection
          designProjects={siteData.designProjects}
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenCMSForNewProject={() => {
            setPrefillNewProject(true);
            setIsCMSOpen(true);
          }}
        />

        {/* Contact & Footer Section */}
        <ContactSection
          socials={siteData.socials}
          onCopyEmail={handleCopyEmail}
        />
      </main>

      {/* Project Detail Popover Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Admin CMS & Live Customization Drawer */}
      <AdminCMSDrawer
        isOpen={isCMSOpen}
        onClose={() => {
          setIsCMSOpen(false);
          setPrefillNewProject(false);
        }}
        siteData={siteData}
        onUpdateSiteData={handleUpdateSiteData}
        onResetDefaults={handleResetDefaults}
        showToast={showToast}
        prefillNewProject={prefillNewProject}
      />

      {/* Toast Feedback Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
