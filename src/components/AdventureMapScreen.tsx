import React, { useEffect, useRef } from 'react';
import { soundEffects } from '../utils/audio';

interface AdventureMapScreenProps {
  onStartLevel: (levelNum: number) => void;
  activeLevel?: number;
}

export const AdventureMapScreen: React.FC<AdventureMapScreenProps> = ({
  onStartLevel,
  activeLevel = 4,
}) => {
  const activeNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll into the active node context
    if (activeNodeRef.current) {
      const timer = setTimeout(() => {
        activeNodeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="flex flex-col w-full max-w-md mx-auto select-none pb-28">
      {/* Top Month Status & Progression Banner */}
      <div className="px-3.5 pt-3 pb-2 w-full">
        <div className="bg-white rounded-2xl p-4 shadow-[0_4px_0_#d8e3fb] border border-[#d8e3fb]/60 flex flex-col gap-3 relative overflow-hidden">
          {/* Mascot Ambient Glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#dbe1ff]/50 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between relative z-10">
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-1.5 bg-[#dbe1ff]/70 px-2.5 py-0.5 rounded-full w-fit mb-1 border border-[#b4c5ff]/50">
                <span className="material-symbols-outlined text-[#004ac6] text-sm fill-1">calendar_month</span>
                <span className="font-rubik text-[11px] text-[#004ac6] font-bold tracking-wide uppercase">
                  Month 2 of 6
                </span>
              </div>
              <h2 className="font-extrabold text-xl text-[#111c2d] leading-tight">
                Everyday English &amp; Chatty Friends
              </h2>
            </div>
            <div className="flex flex-col items-end shrink-0 pl-1">
              <div className="flex items-center gap-1 bg-[#ffdf9f]/60 px-2.5 py-1 rounded-full shadow-[0_2px_0_#ffdf9f] border border-[#f9bd22]/40">
                <span className="material-symbols-outlined text-[#795900] text-base fill-1">stars</span>
                <span className="font-rubik text-sm text-[#261a00] font-bold">24/30</span>
              </div>
            </div>
          </div>

          {/* Linear Monthly Meter */}
          <div className="flex flex-col gap-1.5 pt-0.5 relative z-10">
            <div className="flex justify-between items-center font-rubik text-xs">
              <span className="text-[#004ac6] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">flag_circle</span> Level 4 of 10 Active
              </span>
              <span className="text-[#434655] font-semibold">40% Completed</span>
            </div>
            <div className="w-full h-3.5 bg-[#dee8ff] rounded-full overflow-hidden p-0.5 shadow-inner">
              <div
                className="h-full bg-[#004ac6] rounded-full transition-all duration-700 ease-out shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
                style={{ width: '40%' }}
              />
            </div>
          </div>

          {/* Mascot Tip Strip */}
          <div className="bg-[#f0f3ff] rounded-xl p-2.5 flex items-center gap-2.5 border border-[#d8e3fb]/50">
            <div className="w-10 h-10 rounded-full bg-[#ffdf9f] shrink-0 flex items-center justify-center shadow-[0_2px_0_#f9bd22]">
              <span className="material-symbols-outlined text-[#795900] text-xl fill-1">smart_toy</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-rubik text-xs text-[#795900] font-bold">WordHop Bunny Hint</span>
              <p className="text-xs text-[#434655] truncate">
                Tap the big microphone in dialogue steps to practice loud &amp; clear!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Boosters Shelf */}
      <div className="px-3.5 py-1">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-[0_3px_0_#d8e3fb] border border-[#d8e3fb]/60 shrink-0">
            <span className="material-symbols-outlined text-[#004ac6] text-base fill-1">ac_unit</span>
            <span className="font-rubik text-xs text-[#111c2d] font-bold">Freeze Shield: Active</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-[0_3px_0_#d8e3fb] border border-[#d8e3fb]/60 shrink-0">
            <span className="material-symbols-outlined text-[#795900] text-base fill-1">science</span>
            <span className="font-rubik text-xs text-[#111c2d] font-bold">2x Stars (12m left)</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-[0_3px_0_#d8e3fb] border border-[#d8e3fb]/60 shrink-0">
            <span className="material-symbols-outlined text-[#006242] text-base fill-1">bolt</span>
            <span className="font-rubik text-xs text-[#111c2d] font-bold">XP Surge x1.5</span>
          </div>
        </div>
      </div>

      {/* Gamified Vertical Path Map */}
      <div className="relative w-full px-4 py-6 flex flex-col items-center min-h-[1280px]">
        {/* SVG Winding Curved Trail */}
        <svg
          className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-[1240px] pointer-events-none z-0"
          fill="none"
          viewBox="0 0 288 1240"
        >
          {/* Inactive trail */}
          <path
            d="M 144 40 Q 60 110, 80 180 T 208 320 T 70 480 T 144 630 T 218 780 T 80 930 T 144 1080 L 144 1180"
            stroke="#c3c6d7"
            strokeDasharray="10 12"
            strokeLinecap="round"
            strokeWidth="8"
          />
          {/* Active completed colored trail up to Level 4 */}
          <path
            d="M 144 1180 L 144 1080 T 80 930 T 218 780 T 144 630"
            stroke="#4edea3"
            strokeLinecap="round"
            strokeWidth="8"
          />
        </svg>

        {/* Node 10: Grand Boss Trophy / Certificate */}
        <div className="relative z-10 flex flex-col items-center mb-16">
          <div
            onClick={() => soundEffects.playClick()}
            className="w-24 h-24 rounded-full bg-[#dee8ff] flex flex-col items-center justify-center shadow-[0_4px_0_#c3c6d7] text-[#737686] relative group cursor-pointer hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-4xl text-[#737686] mb-0.5">military_tech</span>
            <span className="font-rubik text-xs font-bold text-[#737686]">Level 10</span>
            <div className="absolute -top-3 bg-[#263143] text-[#ecf1ff] px-2.5 py-0.5 rounded-full shadow-sm">
              <span className="font-rubik text-xs font-bold">Grand Trophy</span>
            </div>
          </div>
          <span className="font-rubik text-xs text-[#434655] font-bold mt-2 text-center max-w-[140px]">
            Month 2 Champion Quest
          </span>
        </div>

        {/* Node 9: Locked */}
        <div className="relative z-10 flex flex-col items-center self-end mr-8 mb-16">
          <div
            onClick={() => soundEffects.playClick()}
            className="w-16 h-16 rounded-full bg-[#dee8ff] flex items-center justify-center shadow-[0_4px_0_#c3c6d7] text-[#737686] cursor-pointer hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-2xl">lock</span>
          </div>
          <span className="font-rubik text-xs text-[#737686] font-bold mt-1.5">L9 • Story Time</span>
        </div>

        {/* Node 8: Locked */}
        <div className="relative z-10 flex flex-col items-center self-start ml-8 mb-16">
          <div
            onClick={() => soundEffects.playClick()}
            className="w-16 h-16 rounded-full bg-[#dee8ff] flex items-center justify-center shadow-[0_4px_0_#c3c6d7] text-[#737686] cursor-pointer hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-2xl">lock</span>
          </div>
          <span className="font-rubik text-xs text-[#737686] font-bold mt-1.5">L8 • Weather Talk</span>
        </div>

        {/* Node 7: Locked */}
        <div className="relative z-10 flex flex-col items-center self-end mr-12 mb-16">
          <div
            onClick={() => soundEffects.playClick()}
            className="w-16 h-16 rounded-full bg-[#dee8ff] flex items-center justify-center shadow-[0_4px_0_#c3c6d7] text-[#737686] cursor-pointer hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-2xl">lock</span>
          </div>
          <span className="font-rubik text-xs text-[#737686] font-bold mt-1.5">L7 • Animal Pals</span>
        </div>

        {/* Node 6: Locked */}
        <div className="relative z-10 flex flex-col items-center self-start ml-12 mb-16">
          <div
            onClick={() => soundEffects.playClick()}
            className="w-16 h-16 rounded-full bg-[#dee8ff] flex items-center justify-center shadow-[0_4px_0_#c3c6d7] text-[#737686] cursor-pointer hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-2xl">lock</span>
          </div>
          <span className="font-rubik text-xs text-[#737686] font-bold mt-1.5">L6 • Family Tree</span>
        </div>

        {/* Node 5: Mini Boss Challenge (Locked) */}
        <div className="relative z-10 flex flex-col items-center mb-16">
          <div className="relative">
            <div
              onClick={() => soundEffects.playClick()}
              className="w-20 h-20 rounded-full bg-[#ffdf9f]/60 flex flex-col items-center justify-center shadow-[0_4px_0_#ffdf9f] text-[#795900] border border-[#f9bd22]/40 cursor-pointer hover:scale-105 transition-transform"
            >
              <span className="material-symbols-outlined text-3xl fill-1">workspace_premium</span>
              <span className="material-symbols-outlined text-base text-[#737686] -mt-1">lock</span>
            </div>
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#ffc329] text-[#6f5100] px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
              <span className="font-rubik text-xs font-bold">Mid-Boss Challenge</span>
            </div>
          </div>
          <span className="font-rubik text-xs text-[#111c2d] font-bold mt-2 text-center max-w-[150px]">
            L5 • Weekend Fun &amp; Hobby Talk
          </span>
        </div>

        {/* Node 4: CURRENT ACTIVE PLAY NODE */}
        <div ref={activeNodeRef} className="relative z-20 flex flex-col items-center self-start ml-6 mb-16">
          {/* Animated Bunny Mascot Pin Indicator */}
          <div className="flex flex-col items-center mb-2 animate-bounce">
            <div className="bg-[#004ac6] text-white px-3 py-1 rounded-full shadow-[0_3px_0_#003ea8] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base fill-1">play_arrow</span>
              <span className="font-rubik text-xs font-bold tracking-wide uppercase">READY TO PLAY</span>
            </div>
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#004ac6] -mt-0.5" />
          </div>

          {/* Pushable Big Tactile Active Button */}
          <button
            onClick={() => {
              soundEffects.playSuccess();
              onStartLevel(4);
            }}
            className="w-20 h-20 rounded-full bg-[#2563eb] text-white flex flex-col items-center justify-center shadow-[0_6px_0_#003ea8] active:translate-y-[4px] active:shadow-[0_2px_0_#003ea8] transition-all relative focus:outline-none cursor-pointer group"
            type="button"
          >
            <div className="absolute inset-0 rounded-full bg-[#2563eb] animate-ping opacity-30 pointer-events-none" />
            <span className="material-symbols-outlined text-3xl fill-1 group-hover:scale-110 transition-transform">
              restaurant
            </span>
            <span className="font-rubik text-xs font-bold">Level 4</span>
          </button>

          {/* Active Step Details Card */}
          <div className="mt-3 bg-white p-3 rounded-2xl shadow-[0_4px_0_#d8e3fb] border border-[#d8e3fb]/60 flex flex-col items-center text-center max-w-[190px]">
            <span className="font-rubik text-xs text-[#004ac6] font-bold leading-tight">
              Ordering Snacks &amp; Polite Words
            </span>
            <div className="flex items-center gap-1 mt-1 text-[#ffc329]">
              <span className="material-symbols-outlined text-base">star</span>
              <span className="material-symbols-outlined text-base">star</span>
              <span className="material-symbols-outlined text-base">star</span>
            </div>
          </div>
        </div>

        {/* Node 3: Completed (2 Stars) */}
        <div className="relative z-10 flex flex-col items-center self-end mr-6 mb-16">
          <button
            onClick={() => {
              soundEffects.playSuccess();
              onStartLevel(3);
            }}
            className="w-16 h-16 rounded-full bg-[#007d55] text-white flex items-center justify-center shadow-[0_4px_0_#005236] active:translate-y-1 active:shadow-[0_1px_0_#005236] transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-2xl fill-1">check_circle</span>
          </button>
          <div className="flex items-center gap-0.5 mt-1 text-[#ffc329]">
            <span className="material-symbols-outlined text-sm fill-1">star</span>
            <span className="material-symbols-outlined text-sm fill-1">star</span>
            <span className="material-symbols-outlined text-sm text-[#c3c6d7]">star</span>
          </div>
          <span className="font-rubik text-xs text-[#111c2d] font-bold mt-1 text-center max-w-[130px]">
            L3 • At Playground
          </span>
        </div>

        {/* Node 2: Completed (3 Stars) */}
        <div className="relative z-10 flex flex-col items-center self-start ml-10 mb-16">
          <button
            onClick={() => {
              soundEffects.playSuccess();
              onStartLevel(2);
            }}
            className="w-16 h-16 rounded-full bg-[#007d55] text-white flex items-center justify-center shadow-[0_4px_0_#005236] active:translate-y-1 active:shadow-[0_1px_0_#005236] transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-2xl fill-1">check_circle</span>
          </button>
          <div className="flex items-center gap-0.5 mt-1 text-[#ffc329]">
            <span className="material-symbols-outlined text-sm fill-1">star</span>
            <span className="material-symbols-outlined text-sm fill-1">star</span>
            <span className="material-symbols-outlined text-sm fill-1">star</span>
          </div>
          <span className="font-rubik text-xs text-[#111c2d] font-bold mt-1 text-center max-w-[130px]">
            L2 • In Classroom
          </span>
        </div>

        {/* Node 1: Completed (3 Stars) */}
        <div className="relative z-10 flex flex-col items-center mb-8">
          <button
            onClick={() => {
              soundEffects.playSuccess();
              onStartLevel(1);
            }}
            className="w-16 h-16 rounded-full bg-[#007d55] text-white flex items-center justify-center shadow-[0_4px_0_#005236] active:translate-y-1 active:shadow-[0_1px_0_#005236] transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-2xl fill-1">check_circle</span>
          </button>
          <div className="flex items-center gap-0.5 mt-1 text-[#ffc329]">
            <span className="material-symbols-outlined text-sm fill-1">star</span>
            <span className="material-symbols-outlined text-sm fill-1">star</span>
            <span className="material-symbols-outlined text-sm fill-1">star</span>
          </div>
          <span className="font-rubik text-xs text-[#111c2d] font-bold mt-1 text-center max-w-[130px]">
            L1 • Morning Routine
          </span>
        </div>
      </div>

      {/* Bottom Floating Call-To-Action Dock */}
      <div className="fixed bottom-22 left-0 right-0 max-w-md mx-auto px-3.5 z-40">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-[0_8px_20px_rgba(0,0,0,0.12)] border border-[#d8e3fb] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-[#dbe1ff] flex items-center justify-center shrink-0 shadow-[0_2px_0_#b4c5ff]">
              <span className="material-symbols-outlined text-[#004ac6] text-2xl fill-1">record_voice_over</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-rubik text-sm text-[#111c2d] font-extrabold truncate">
                Level 4: Snacks &amp; Manners
              </span>
              <span className="text-xs text-[#434655] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#007d55]">timer</span> ~4 mins • 3 new words
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playSuccess();
              onStartLevel(activeLevel);
            }}
            className="shrink-0 bg-[#004ac6] hover:bg-[#2563eb] text-white font-rubik text-sm px-5 py-3 rounded-full shadow-[0_4px_0_#003ea8] active:translate-y-1 active:shadow-[0_1px_0_#003ea8] transition-all flex items-center gap-1.5 cursor-pointer font-bold"
            type="button"
          >
            <span>Start</span>
            <span className="material-symbols-outlined text-xl">play_circle</span>
          </button>
        </div>
      </div>
    </div>
  );
};
