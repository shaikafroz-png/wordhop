import React from 'react';
import { NavigationTab } from '../types';
import { soundEffects } from '../utils/audio';

interface HeaderProps {
  currentTab: NavigationTab;
  streakCount: number;
  starCount: number;
  onOpenDriveModal: () => void;
  onOpenProfileModal?: () => void;
  driveFilesCount?: number;
}

const TAB_SUBTITLES: Record<NavigationTab, string> = {
  'grades-and-plan': '• Grades & Plan',
  'adventure-map': '• Adventure Map',
  'daily-practice': '• Daily Practice',
  progress: '• Progress',
};

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  streakCount,
  starCount,
  onOpenDriveModal,
  onOpenProfileModal,
  driveFilesCount = 2,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f9f9ff]/90 backdrop-blur-xl border-b border-[#dee8ff]/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between">
        {/* Brand & Logo */}
        <div className="flex items-center gap-2">
          <img
            alt="WordHop Logo"
            className="h-8 w-auto object-contain cursor-pointer hover:scale-105 transition-transform"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsJ_Op0RAtGGkCKfbhKX0LBgyJyMFTAI1EM5DSYznnzYI14LFdenttFmJ9fG8qtNpz3X3nyzCdvmKcHN0NP4O9TZWRbdpU7LBKdQynxYvsN00euQ5H2JdRoQ_yYNwL3O1bAV-VSMAAMgr1t9fxFFhkUGIQ5JtrqXQ8HKXSesqHhQ9oy9DX5zpbrwGuOtbp2H-mGOI3E8U3nAWnw5Z233BR0Lp62vxG3iDRpDDEH27esU40YCSwTlcebw"
            onClick={() => {
              soundEffects.playPop();
            }}
          />
          <span className="font-extrabold text-xl text-[#004ac6] tracking-tight">WordHop</span>
          <span className="hidden xs:inline-block text-xs font-semibold text-[#434655] font-rubik ml-0.5">
            {TAB_SUBTITLES[currentTab]}
          </span>
        </div>

        {/* Status Counters & Drive Sync & Profile */}
        <div className="flex items-center gap-2">
          {/* Flame streak */}
          <div
            title={`${streakCount} Day Streak!`}
            className="flex items-center gap-1 bg-[#e7eeff] px-2.5 py-1 rounded-full shadow-[0_2px_0_#d8e3fb] hover:bg-[#d8e3fb] transition-colors cursor-default"
          >
            <span className="material-symbols-outlined text-[#795900] text-lg fill-1">local_fire_department</span>
            <span className="font-rubik text-xs font-bold text-[#111c2d]">{streakCount}</span>
          </div>

          {/* Stars */}
          <div
            title={`${starCount} Stars collected`}
            className="flex items-center gap-1 bg-[#e7eeff] px-2.5 py-1 rounded-full shadow-[0_2px_0_#d8e3fb] hover:bg-[#d8e3fb] transition-colors cursor-default"
          >
            <span className="material-symbols-outlined text-[#ffc329] text-lg fill-1">star</span>
            <span className="font-rubik text-xs font-bold text-[#111c2d]">{starCount}</span>
          </div>

          {/* Google Drive quick access */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenDriveModal();
            }}
            title="Google Drive Learning Cloud"
            className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#dbe1ff] text-[#004ac6] shadow-[0_2px_0_#b4c5ff] active:translate-y-0.5 hover:bg-[#c6d3ff] transition-all"
          >
            <span className="material-symbols-outlined text-base">cloud_done</span>
            {driveFilesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#007d55] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm">
                {driveFilesCount}
              </span>
            )}
          </button>

          {/* Leo Avatar */}
          <button
            onClick={() => {
              soundEffects.playClick();
              if (onOpenProfileModal) onOpenProfileModal();
            }}
            className="p-0.5 rounded-full bg-[#dbe1ff] shadow-[0_2px_0_#b4c5ff] hover:scale-105 active:translate-y-0.5 transition-all"
            title="Leo's Profile (Grade 4)"
          >
            <img
              alt="Profile"
              className="w-7 h-7 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD44pfCkUDWG2uKkC397Kz1D_IV_vGTS-_uyFp_OVKvQX4vtPVj1N81fCLWfFeTnjqfOm8VriiDOt7TlGpBwiqpKqS4j0qYEeJjnxTQHbPie3-qFazIdJZuCo6V7i6fUTS1bvzNEQNZmXV9uaCWVyY3uE5w8Cv-UWUdawOoJDJoQehWkBUTppr2d52vZRhXIp2MFcs6MShOInZETbcGPPUCKrD4oploih__fTxiavz03XIdCQN4eq2YSA"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
