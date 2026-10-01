import React from 'react';
import { GradeTrackId } from '../types';
import { soundEffects } from '../utils/audio';

interface GradesAndPlanScreenProps {
  currentGradeTrack: GradeTrackId;
  onSelectTrack: (track: GradeTrackId) => void;
  onHopToLesson: () => void;
}

export const GradesAndPlanScreen: React.FC<GradesAndPlanScreenProps> = ({
  currentGradeTrack,
  onSelectTrack,
  onHopToLesson,
}) => {
  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-3.5 space-y-4 pt-3 pb-8">
      {/* Learner Greeting Banner */}
      <div className="relative overflow-hidden bg-white rounded-2xl p-4 shadow-[0_4px_0_#d8e3fb] border border-[#d8e3fb]/60">
        <div className="flex items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mascot bunny with G4 badge */}
            <div className="relative w-14 h-14 shrink-0 rounded-full bg-[#ffdf9f] flex items-center justify-center shadow-[0_3px_0_#f9bd22] p-1">
              <img
                className="w-12 h-12 object-contain"
                alt="WordHop Bunny Mascot"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRG57vyWOWUpiKZVHUNsA6nmVkt3FGnfCvtSPnpQGnWI0mH5w_56XosiGhl6UhO05SJ_cF47XoQcHoBP2sVN7dX7QtB0yLd8nM-8bpQaas9qxdgxWCXEodjnce4c-W-51XRzMXwKBUVWAF2m3Q4p0MG2zUt-3DMzfQaxLoQu_S8SeLD2FWwPy2mQCiPTqQtOH8Zz2ljCTbFDSBuBUlFX_Z4-Kk1AK3feWaGVxhz-gpmxgOcBDYzyeXJQ"
              />
              <span className="absolute -bottom-1 -right-1 bg-[#006242] text-white text-[10px] font-rubik font-bold px-1.5 py-0.5 rounded-full shadow-[0_1px_0_#005236]">
                {currentGradeTrack === 'grades-1-3' ? 'G2' : currentGradeTrack === 'grades-7-9' ? 'G8' : 'G4'}
              </span>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-[#111c2d] truncate">Hi, Leo!</span>
                <span className="text-base select-none">🚀</span>
              </div>
              <span className="text-xs font-bold text-[#004ac6] truncate">
                {currentGradeTrack === 'grades-1-3'
                  ? 'Grade 2 • Early Starter Track'
                  : currentGradeTrack === 'grades-7-9'
                  ? 'Grade 8 • Fluent Master Track'
                  : 'Grade 4 • Young Explorer Track'}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              // Cycle tracks
              if (currentGradeTrack === 'grades-1-3') onSelectTrack('grades-4-6');
              else if (currentGradeTrack === 'grades-4-6') onSelectTrack('grades-7-9');
              else onSelectTrack('grades-1-3');
            }}
            className="shrink-0 flex items-center gap-1 bg-[#dee8ff] hover:bg-[#d8e3fb] active:translate-y-0.5 text-[#434655] px-3 py-1.5 rounded-full text-xs font-rubik font-bold shadow-[0_2px_0_#c3c6d7] transition-all"
            type="button"
          >
            <span>Switch</span>
            <span className="material-symbols-outlined text-sm">swap_horiz</span>
          </button>
        </div>

        {/* Micro Stats strip */}
        <div className="grid grid-cols-3 gap-2 mt-3.5 pt-2 bg-[#f0f3ff] rounded-xl p-2 text-center border border-[#d8e3fb]/40">
          <div className="flex flex-col items-center py-0.5">
            <span className="font-rubik text-xs text-[#434655] flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs text-[#ffc329] fill-1">timer</span>
              Target
            </span>
            <span className="font-rubik text-sm text-[#111c2d] font-bold">15m/day</span>
          </div>

          <div className="flex flex-col items-center py-0.5 border-x border-[#dee8ff]">
            <span className="font-rubik text-xs text-[#434655] flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs text-[#795900] fill-1">local_fire_department</span>
              Streak
            </span>
            <span className="font-rubik text-sm text-[#795900] font-bold">12 Days</span>
          </div>

          <div className="flex flex-col items-center py-0.5">
            <span className="font-rubik text-xs text-[#434655] flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs text-[#007d55] fill-1">spellcheck</span>
              Words
            </span>
            <span className="font-rubik text-sm text-[#007d55] font-bold">340 Hop!</span>
          </div>
        </div>
      </div>

      {/* Grade Track Switcher (Horizontal scrollable tabs) */}
      <div className="flex flex-col space-y-1.5">
        <div className="flex items-center justify-between px-1">
          <span className="font-rubik text-sm text-[#111c2d] font-bold">Choose Learning Track</span>
          <span className="font-rubik text-xs text-[#004ac6] font-semibold">Semester A</span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar">
          {/* Grades 1-3 */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onSelectTrack('grades-1-3');
            }}
            className={`shrink-0 flex flex-col items-start p-3 rounded-2xl min-w-[130px] text-left transition-all ${
              currentGradeTrack === 'grades-1-3'
                ? 'bg-[#004ac6] text-white shadow-[0_4px_0_#003ea8] translate-y-[-1px]'
                : 'bg-white text-[#111c2d] shadow-[0_3px_0_#d8e3fb] hover:bg-[#f0f3ff] active:translate-y-0.5'
            }`}
            type="button"
          >
            <div className="flex items-center gap-1 mb-1">
              <span
                className={`w-2 h-2 rounded-full ${
                  currentGradeTrack === 'grades-1-3' ? 'bg-[#ffc329]' : 'bg-[#c3c6d7]'
                }`}
              />
              <span
                className={`font-rubik text-xs ${
                  currentGradeTrack === 'grades-1-3' ? 'text-[#dbe1ff]' : 'text-[#434655]'
                }`}
              >
                Grades 1–3
              </span>
            </div>
            <span className="font-rubik text-sm font-bold">Early Starters</span>
            <span
              className={`text-[11px] ${
                currentGradeTrack === 'grades-1-3' ? 'text-[#b4c5ff]' : 'text-[#737686]'
              }`}
            >
              Ages 6–8
            </span>
          </button>

          {/* Grades 4-6 (Active default) */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onSelectTrack('grades-4-6');
            }}
            className={`shrink-0 flex flex-col items-start p-3 rounded-2xl min-w-[145px] text-left relative overflow-hidden transition-all ${
              currentGradeTrack === 'grades-4-6'
                ? 'bg-[#004ac6] text-white shadow-[0_4px_0_#003ea8] translate-y-[-1px]'
                : 'bg-white text-[#111c2d] shadow-[0_3px_0_#d8e3fb] hover:bg-[#f0f3ff] active:translate-y-0.5'
            }`}
            type="button"
          >
            {currentGradeTrack === 'grades-4-6' && (
              <div className="absolute -right-2 -top-2 w-9 h-9 rounded-full bg-[#2563eb]/40 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#ffdf9f] text-base fill-1">star</span>
              </div>
            )}
            <div className="flex items-center gap-1 mb-1">
              <span
                className={`w-2 h-2 rounded-full ${
                  currentGradeTrack === 'grades-4-6' ? 'bg-[#ffc329]' : 'bg-[#c3c6d7]'
                }`}
              />
              <span
                className={`font-rubik text-xs ${
                  currentGradeTrack === 'grades-4-6' ? 'text-[#dbe1ff]' : 'text-[#434655]'
                }`}
              >
                Grades 4–6
              </span>
            </div>
            <span className="font-rubik text-sm font-bold">Young Explorers</span>
            <span
              className={`text-[11px] ${
                currentGradeTrack === 'grades-4-6' ? 'text-[#b4c5ff] font-medium' : 'text-[#737686]'
              }`}
            >
              Ages 9–11 • Current
            </span>
          </button>

          {/* Grades 7-9 */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onSelectTrack('grades-7-9');
            }}
            className={`shrink-0 flex flex-col items-start p-3 rounded-2xl min-w-[130px] text-left transition-all ${
              currentGradeTrack === 'grades-7-9'
                ? 'bg-[#004ac6] text-white shadow-[0_4px_0_#003ea8] translate-y-[-1px]'
                : 'bg-white text-[#111c2d] shadow-[0_3px_0_#d8e3fb] hover:bg-[#f0f3ff] active:translate-y-0.5'
            }`}
            type="button"
          >
            <div className="flex items-center gap-1 mb-1">
              <span
                className={`w-2 h-2 rounded-full ${
                  currentGradeTrack === 'grades-7-9' ? 'bg-[#ffc329]' : 'bg-[#c3c6d7]'
                }`}
              />
              <span
                className={`font-rubik text-xs ${
                  currentGradeTrack === 'grades-7-9' ? 'text-[#dbe1ff]' : 'text-[#434655]'
                }`}
              >
                Grades 7–9
              </span>
            </div>
            <span className="font-rubik text-sm font-bold">Fluent Masters</span>
            <span
              className={`text-[11px] ${
                currentGradeTrack === 'grades-7-9' ? 'text-[#b4c5ff]' : 'text-[#737686]'
              }`}
            >
              Ages 12–14
            </span>
          </button>
        </div>
      </div>

      {/* Primary CTA Push Button */}
      <button
        onClick={() => {
          soundEffects.playSuccess();
          onHopToLesson();
        }}
        className="w-full bg-[#004ac6] hover:bg-[#2563eb] text-white rounded-full p-4 flex items-center justify-between shadow-[0_5px_0_#003ea8] active:translate-y-1 active:shadow-[0_1px_0_#003ea8] transition-all cursor-pointer group"
        type="button"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-2xl text-white fill-1">play_arrow</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-rubik text-base leading-tight font-bold">Hop into Today's Lesson</span>
            <span className="font-rubik text-xs text-[#dbe1ff] opacity-90">
              Month 2: Dialogues • Level 4
            </span>
          </div>
        </div>
        <span className="material-symbols-outlined text-[#ffdf9f] text-2xl animate-pulse">
          rocket_launch
        </span>
      </button>

      {/* 6-Month Semester Roadmap Card */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_4px_0_#d8e3fb] space-y-4 border border-[#d8e3fb]/60">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-extrabold text-lg text-[#111c2d] block leading-snug">
              6-Month Roadmap
            </span>
            <span className="text-xs text-[#434655]">Goal: Intermediate Speaker Level</span>
          </div>
          <div className="bg-[#6ffbbe] text-[#002113] px-2.5 py-1 rounded-full font-rubik text-xs font-bold flex items-center gap-1 shadow-[0_2px_0_#4edea3]">
            <span className="material-symbols-outlined text-xs fill-1">verified</span>
            B1 Target
          </div>
        </div>

        {/* Timeline Path List */}
        <div className="space-y-3 relative">
          {/* Track vertical line */}
          <div className="absolute left-4 top-4 bottom-8 w-1 bg-[#dee8ff] rounded-full -translate-x-1/2 z-0" />

          {/* Month 1: Mastered */}
          <div className="relative z-10 flex items-start gap-3 p-3 rounded-xl bg-[#f0f3ff] shadow-[0_2px_0_#dee8ff]">
            <div className="w-8 h-8 rounded-full bg-[#006242] text-white flex items-center justify-center shrink-0 shadow-[0_2px_0_#005236]">
              <span className="material-symbols-outlined text-lg font-bold">check</span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-rubik text-[11px] text-[#006242] font-bold uppercase tracking-wider">
                  Month 1 • Mastered
                </span>
                <span className="font-rubik text-xs text-[#434655] font-semibold">100%</span>
              </div>
              <span className="font-rubik text-sm text-[#111c2d] font-bold truncate">
                Phonetics &amp; Core Vocabulary
              </span>
              <span className="text-xs text-[#434655] mt-0.5">
                80 core roots, phonics rules &amp; word blend badges
              </span>
            </div>
          </div>

          {/* Month 2: Active Stage */}
          <div className="relative z-10 flex items-start gap-3 p-3.5 rounded-xl bg-[#d8e3fb] shadow-[0_4px_0_#b4c5ff] border border-[#b4c5ff]">
            <div className="w-8 h-8 rounded-full bg-[#004ac6] text-white flex items-center justify-center shrink-0 shadow-[0_3px_0_#003ea8] animate-bounce">
              <span className="material-symbols-outlined text-lg fill-1">star</span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-rubik text-[11px] text-[#004ac6] font-bold uppercase tracking-wider">
                  Month 2 • Active Stage
                </span>
                <span className="font-rubik text-xs text-[#004ac6] font-bold">Level 4 / 10</span>
              </div>
              <span className="font-rubik text-sm text-[#111c2d] font-bold truncate">
                Daily Dialogues &amp; Sentence Builders
              </span>
              <span className="text-xs text-[#434655] mt-0.5">
                Interactive speech practice with WordHop Bunny
              </span>
              {/* Progress bar */}
              <div className="w-full bg-[#e7eeff] h-2.5 rounded-full overflow-hidden mt-2 p-0.5">
                <div className="bg-[#ffc329] h-full rounded-full transition-all" style={{ width: '40%' }} />
              </div>
            </div>
          </div>

          {/* Month 3: Locked */}
          <div className="relative z-10 flex items-start gap-3 p-3 rounded-xl bg-[#e7eeff] opacity-80">
            <div className="w-8 h-8 rounded-full bg-[#c3c6d7] text-[#434655] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-base">lock</span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-rubik text-[11px] text-[#737686] font-bold uppercase tracking-wider">
                  Month 3
                </span>
                <span className="font-rubik text-[11px] text-[#737686]">Unlocks Day 60</span>
              </div>
              <span className="font-rubik text-sm text-[#111c2d] font-semibold truncate">
                Storytelling &amp; Past Tense Adventures
              </span>
              <span className="text-xs text-[#434655] mt-0.5">
                Narrative arcs, simple past, fairy tale re-tellings
              </span>
            </div>
          </div>

          {/* Month 4: Locked */}
          <div className="relative z-10 flex items-start gap-3 p-3 rounded-xl bg-[#e7eeff] opacity-80">
            <div className="w-8 h-8 rounded-full bg-[#c3c6d7] text-[#434655] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-base">lock</span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-rubik text-[11px] text-[#737686] font-bold uppercase tracking-wider">
                  Month 4
                </span>
                <span className="font-rubik text-[11px] text-[#737686]">Unlocks Day 90</span>
              </div>
              <span className="font-rubik text-sm text-[#111c2d] font-semibold truncate">
                Expressing Opinions &amp; Mini Debates
              </span>
              <span className="text-xs text-[#434655] mt-0.5">
                "Because", "I think", comparative word builders
              </span>
            </div>
          </div>

          {/* Month 5: Locked */}
          <div className="relative z-10 flex items-start gap-3 p-3 rounded-xl bg-[#e7eeff] opacity-80">
            <div className="w-8 h-8 rounded-full bg-[#c3c6d7] text-[#434655] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-base">lock</span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-rubik text-[11px] text-[#737686] font-bold uppercase tracking-wider">
                  Month 5
                </span>
                <span className="font-rubik text-[11px] text-[#737686]">Unlocks Day 120</span>
              </div>
              <span className="font-rubik text-sm text-[#111c2d] font-semibold truncate">
                Real-World Presentation Skills
              </span>
              <span className="text-xs text-[#434655] mt-0.5">
                Show &amp; Tell speeches with voice feedback
              </span>
            </div>
          </div>

          {/* Month 6: Capstone Finale */}
          <div className="relative z-10 flex items-start gap-3 p-3 rounded-xl bg-[#ffdf9f]/50 shadow-[0_2px_0_#f9bd22] border border-[#f9bd22]/40">
            <div className="w-8 h-8 rounded-full bg-[#ffc329] text-[#261a00] flex items-center justify-center shrink-0 shadow-[0_2px_0_#6f5100]">
              <span className="material-symbols-outlined text-lg fill-1">school</span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-rubik text-[11px] text-[#795900] font-bold uppercase tracking-wider">
                  Month 6 • Finale
                </span>
                <span className="font-rubik text-xs text-[#795900] font-bold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-xs">military_tech</span> Certificate
                </span>
              </div>
              <span className="font-rubik text-sm text-[#111c2d] font-bold truncate">
                Intermediate Speaker Capstone
              </span>
              <span className="text-xs text-[#434655] mt-0.5">
                Full conversation graduation with certified digital badge
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Milestone Card */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_4px_0_#d8e3fb] border border-[#d8e3fb]/60">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#795900] text-xl">event_available</span>
            <span className="font-rubik text-sm text-[#111c2d] font-bold">This Week's Goal</span>
          </div>
          <span className="font-rubik text-xs text-[#006242] font-bold">4 / 5 Days Completed</span>
        </div>

        <div className="flex justify-between items-center gap-1 pt-1">
          {['Mon', 'Tue', 'Wed', 'Thu'].map((day) => (
            <div key={day} className="flex flex-col items-center gap-1">
              <div className="w-9 h-9 rounded-full bg-[#006242] text-white flex items-center justify-center shadow-[0_2px_0_#005236]">
                <span className="material-symbols-outlined text-sm font-bold">check</span>
              </div>
              <span className="font-rubik text-[11px] text-[#434655] font-medium">{day}</span>
            </div>
          ))}

          {/* Today: Fri */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-9 h-9 rounded-full bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center shadow-[0_2px_0_#b4c5ff] animate-pulse">
              <span className="material-symbols-outlined text-base">local_fire_department</span>
            </div>
            <span className="font-rubik text-[11px] text-[#004ac6] font-bold">Fri</span>
          </div>

          {/* Sat & Sun */}
          {['Sat', 'Sun'].map((day) => (
            <div key={day} className="flex flex-col items-center gap-1">
              <div className="w-9 h-9 rounded-full bg-[#e7eeff] text-[#737686] flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">lock</span>
              </div>
              <span className="font-rubik text-[11px] text-[#737686] font-medium">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
