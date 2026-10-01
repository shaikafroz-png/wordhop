import React from 'react';
import { NavigationTab } from '../types';
import { soundEffects } from '../utils/audio';

interface BottomNavProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
}

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'grades-and-plan', label: 'Grades & Plan', icon: 'school' },
  { id: 'adventure-map', label: 'Adventure', icon: 'explore' },
  { id: 'daily-practice', label: 'Practice', icon: 'record_voice_over' },
  { id: 'progress', label: 'Progress', icon: 'insights' },
];

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#f9f9ff]/90 backdrop-blur-xl border-t border-[#dee8ff]/60 shadow-[0_-2px_12px_rgba(0,0,0,0.05)]">
      <div className="max-w-md mx-auto h-20 px-2 flex items-center justify-around pb-safe">
        {NAV_ITEMS.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (!isActive) {
                  soundEffects.playClick();
                  onSelectTab(item.id);
                }
              }}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[50px] py-1 px-1 rounded-xl transition-all ${
                isActive
                  ? 'text-[#004ac6] font-bold scale-105'
                  : 'text-[#434655] hover:text-[#111c2d] active:scale-95'
              }`}
            >
              <span
                className={`material-symbols-outlined text-2xl transition-transform ${
                  isActive ? 'fill-1 scale-110' : ''
                }`}
              >
                {item.icon}
              </span>
              <span className="font-rubik text-[11px] leading-tight mt-1 text-center font-bold">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#004ac6] mt-0.5 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
