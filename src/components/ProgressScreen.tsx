import React, { useState } from 'react';
import { soundEffects } from '../utils/audio';

interface ProgressScreenProps {
  onOpenCertificateViewer: () => void;
  onSaveCertificateToDrive: () => void;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({
  onOpenCertificateViewer,
  onSaveCertificateToDrive,
}) => {
  const [isParentView, setIsParentView] = useState(true);
  const [showAllBadgesModal, setShowAllBadgesModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-3.5 space-y-4 pt-2 pb-28">
      {/* Child Summary Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-[0_4px_0_#d8e3fb] border border-[#d8e3fb]/60">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex-shrink-0">
              <img
                className="w-16 h-16 rounded-full object-cover bg-[#dbe1ff] shadow-[0_3px_0_#b4c5ff] border-2 border-white"
                alt="Leo Mascot Avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1zRqB4VrzWcJXSqXp6_t1utqkQTnYZzNjM3OOtIZvf8OL1TF1zNmi_TFKlnaX5lDmUCzAAA3TiFszSSGuVpC2F4B_5TUSuxfQct2PAXI0hWvQn1ABLYCqzxgZF4ZCskUdt47EWcFJ9z5nsWbHeLrgf5GRyaChJ9GGn1UANDOp5hLPMFeiJJWTYWpKtnKVF8iHkrlOztnYuoy0lkHAXXVow9B0rzr7_acAdyV_GOewqn6Y9X7t5szxZw"
              />
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#ffc329] text-[#6f5100] shadow-[0_2px_0_#f9bd22] text-xs font-bold">
                🏅
              </span>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-extrabold text-xl text-[#111c2d] truncate">Leo's Report</span>
                <span className="inline-flex items-center rounded-full bg-[#6ffbbe] px-2 py-0.5 font-rubik text-xs text-[#002113] font-bold">
                  Grade 4
                </span>
              </div>
              <p className="text-xs text-[#434655] font-medium mt-0.5">
                Month 2 Track • English Explorer
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              setIsParentView(!isParentView);
            }}
            className="flex-shrink-0 flex items-center gap-1 rounded-full bg-[#dee8ff] hover:bg-[#d8e3fb] px-3 py-1.5 text-[#434655] active:translate-y-0.5 transition-all shadow-[0_2px_0_#d8e3fb] cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-sm text-[#004ac6]">
              {isParentView ? 'family_restroom' : 'face'}
            </span>
            <span className="font-rubik text-xs font-bold text-[#004ac6]">
              {isParentView ? 'Parent View' : 'Student View'}
            </span>
          </button>
        </div>

        {/* Quick Motivation Banner */}
        <div className="mt-3 flex items-center justify-between rounded-xl bg-[#dbe1ff]/50 p-2.5 border border-[#b4c5ff]/50">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#004ac6] text-base fill-1">auto_awesome</span>
            <span className="text-xs text-[#004ac6] font-bold">Top 8% active speaking learner this week!</span>
          </div>
          <span className="font-rubik text-xs text-[#004ac6] font-bold">Keep it up! ✨</span>
        </div>
      </div>

      {/* Fluency Meter Hub */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_4px_0_#d8e3fb] border border-[#d8e3fb]/60 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-rubik text-[11px] text-[#004ac6] font-bold uppercase tracking-wider">
              6-Month Pathway
            </span>
            <h2 className="font-extrabold text-lg text-[#111c2d]">Fluency Readiness</h2>
          </div>
          <span className="rounded-full bg-[#006242] px-3 py-1 font-rubik text-xs text-white font-bold shadow-[0_2px_0_#005236]">
            On Track
          </span>
        </div>

        {/* Circular Radial Chart Presentation */}
        <div className="flex flex-col items-center justify-center py-2">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                fill="transparent"
                r="66"
                stroke="#e7eeff"
                strokeLinecap="round"
                strokeWidth="15"
              />
              <circle
                className="transition-all duration-1000 ease-out"
                cx="80"
                cy="80"
                fill="transparent"
                r="66"
                stroke="#2563eb"
                strokeDasharray="282 414.7"
                strokeLinecap="round"
                strokeWidth="15"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-extrabold text-4xl text-[#111c2d] leading-none">68%</span>
              <span className="font-rubik text-xs text-[#434655] font-bold mt-1">Intermediate</span>
              <span className="font-rubik text-xs text-[#004ac6] font-bold">Speaking Ready</span>
            </div>
          </div>
          <p className="text-xs text-[#434655] text-center mt-2 font-medium">
            Target: Grade 4 B1 CEFR Conversation by Month 6
          </p>
        </div>

        {/* Fluency Metrics 2x2 Bento */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          {/* Metric 1 */}
          <div className="rounded-xl bg-[#f0f3ff] p-3 shadow-[0_2px_0_#dee8ff] border border-[#dee8ff] flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-[#004ac6]">
              <span className="material-symbols-outlined text-lg fill-1">menu_book</span>
              <span className="font-rubik text-xs font-bold">Vocabulary</span>
            </div>
            <div className="mt-2">
              <div className="font-extrabold text-lg text-[#111c2d]">480 Words</div>
              <div className="flex items-center gap-1 text-[#007d55] font-rubik text-xs font-bold mt-0.5">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                <span>+65 this week</span>
              </div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="rounded-xl bg-[#f0f3ff] p-3 shadow-[0_2px_0_#dee8ff] border border-[#dee8ff] flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-[#795900]">
              <span className="material-symbols-outlined text-lg fill-1">record_voice_over</span>
              <span className="font-rubik text-xs font-bold">Pronunciation</span>
            </div>
            <div className="mt-2">
              <div className="font-extrabold text-lg text-[#111c2d]">92%</div>
              <span className="text-[11px] text-[#434655] font-medium">Native-like cadence</span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="rounded-xl bg-[#f0f3ff] p-3 shadow-[0_2px_0_#dee8ff] border border-[#dee8ff] flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-[#ba1a1a]">
              <span className="material-symbols-outlined text-lg fill-1">local_fire_department</span>
              <span className="font-rubik text-xs font-bold">Daily Streak</span>
            </div>
            <div className="mt-2">
              <div className="font-extrabold text-lg text-[#111c2d]">12 Days 🔥</div>
              <span className="text-[11px] text-[#007d55] font-bold">Super consistent!</span>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="rounded-xl bg-[#f0f3ff] p-3 shadow-[0_2px_0_#dee8ff] border border-[#dee8ff] flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-[#006242]">
              <span className="material-symbols-outlined text-lg fill-1">headphones</span>
              <span className="font-rubik text-xs font-bold">Listening</span>
            </div>
            <div className="mt-2">
              <div className="font-extrabold text-lg text-[#111c2d]">88%</div>
              <span className="text-[11px] text-[#434655] font-medium">Understands audio stories</span>
            </div>
          </div>
        </div>
      </div>

      {/* Month 2 Level Completion Card */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_4px_0_#d8e3fb] border border-[#d8e3fb]/60 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-[#ffdf9f] flex items-center justify-center text-[#261a00] shadow-[0_2px_0_#f9bd22]">
              <span className="material-symbols-outlined text-lg">flag</span>
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#111c2d]">Month 2 Mastery</h3>
              <p className="text-xs text-[#434655] font-medium">4 of 10 Quest Levels Finished</p>
            </div>
          </div>
          <span className="font-rubik text-xs text-[#004ac6] font-bold bg-[#dbe1ff] px-2 py-1 rounded-full">
            40%
          </span>
        </div>

        {/* Segmented Level Bar Indicator */}
        <div className="mt-1 flex gap-1.5">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`h-3 flex-1 rounded-full ${
                i < 4
                  ? 'bg-[#2563eb] shadow-[0_2px_0_#1d4ed8]'
                  : 'bg-[#dee8ff] shadow-[0_2px_0_#d8e3fb]'
              }`}
            />
          ))}
        </div>

        {/* Estimation Footnote */}
        <div className="mt-1 flex items-center justify-between rounded-xl bg-[#f0f3ff] px-3 py-2 border border-[#dee8ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-base">schedule</span>
            <span className="text-xs text-[#111c2d] font-semibold">Estimated Month 3 Graduation</span>
          </div>
          <span className="font-rubik text-xs text-[#006242] font-bold bg-[#6ffbbe] px-2 py-0.5 rounded-full">
            In 6 days
          </span>
        </div>
      </div>

      {/* Recent Achievements & Badges Shelf */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ffc329] fill-1">military_tech</span>
            <h3 className="font-extrabold text-base text-[#111c2d]">Recent Badges Unlocked</h3>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              setShowAllBadgesModal(true);
            }}
            className="font-rubik text-xs text-[#004ac6] font-bold hover:underline cursor-pointer"
          >
            View All (18)
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {/* Badge 1 */}
          <div
            onClick={() => soundEffects.playStar()}
            className="flex flex-col items-center text-center p-3 rounded-2xl bg-white shadow-[0_4px_0_#d8e3fb] border border-[#d8e3fb]/60 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-[#ffdf9f] flex items-center justify-center shadow-[0_3px_0_#f9bd22] text-2xl mb-2">
              🦜
            </div>
            <span className="font-rubik text-xs text-[#111c2d] font-bold leading-tight">
              Chatty Parrot
            </span>
            <span className="text-[11px] text-[#434655] leading-tight mt-1">Spoke 50 full sentences</span>
          </div>

          {/* Badge 2 */}
          <div
            onClick={() => soundEffects.playStar()}
            className="flex flex-col items-center text-center p-3 rounded-2xl bg-white shadow-[0_4px_0_#d8e3fb] border border-[#d8e3fb]/60 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-[#ffc329] flex items-center justify-center shadow-[0_3px_0_#795900] text-2xl mb-2">
              ☀️
            </div>
            <span className="font-rubik text-xs text-[#111c2d] font-bold leading-tight">
              Early Bird
            </span>
            <span className="text-[11px] text-[#434655] leading-tight mt-1">Practiced before 9 AM</span>
          </div>

          {/* Badge 3 */}
          <div
            onClick={() => soundEffects.playStar()}
            className="flex flex-col items-center text-center p-3 rounded-2xl bg-white shadow-[0_4px_0_#d8e3fb] border border-[#d8e3fb]/60 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-[#6ffbbe] flex items-center justify-center shadow-[0_3px_0_#007d55] text-2xl mb-2">
              🎯
            </div>
            <span className="font-rubik text-xs text-[#111c2d] font-bold leading-tight">
              Speech Pro
            </span>
            <span className="text-[11px] text-[#434655] leading-tight mt-1">95%+ in Speech Lab</span>
          </div>
        </div>
      </div>

      {/* Parent Corner & Insights Section */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_4px_0_#d8e3fb] border border-[#d8e3fb]/60 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-[#dbe1ff] flex items-center justify-center text-[#004ac6] shadow-[0_2px_0_#b4c5ff]">
              <span className="material-symbols-outlined text-base">psychology</span>
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#111c2d]">Parent Corner Insights</h3>
              <span className="font-rubik text-[11px] text-[#434655]">AI Teacher Diagnostic</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#737686]">verified</span>
        </div>

        {/* Weekly Diagnostic Box */}
        <div className="rounded-xl bg-[#f0f3ff] p-3.5 shadow-[0_2px_0_#dee8ff] border border-[#dee8ff] flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-[#111c2d] font-rubik text-xs font-bold">
            <span className="material-symbols-outlined text-[#006242] text-lg">check_circle</span>
            <span>Weekly Performance Summary</span>
          </div>
          <p className="text-xs text-[#434655] leading-relaxed">
            Leo shows great enthusiasm formulating{' '}
            <span className="font-bold text-[#111c2d]">open questions</span> and has mastered{' '}
            <span className="font-bold text-[#111c2d]">food &amp; dining vocabulary</span>.
          </p>

          <div className="mt-2 rounded-xl bg-[#ffdf9f]/50 p-2.5 flex items-start gap-2 border border-[#f9bd22]/40">
            <span className="material-symbols-outlined text-[#795900] text-base mt-0.5">lightbulb</span>
            <p className="text-xs text-[#261a00] font-medium leading-snug">
              <span className="font-bold">Recommended Family Practice:</span> Try past-tense storytelling during dinner
              ("What was the funnest thing you saw today?").
            </p>
          </div>
        </div>

        {/* Visual Monthly Certificate Teaser */}
        <div className="relative overflow-hidden rounded-xl bg-[#dee8ff] p-3 flex items-center justify-between shadow-[0_2px_0_#d8e3fb] border border-[#d8e3fb]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl flex-shrink-0 shadow-[0_2px_0_#dee8ff]">
              📜
            </div>
            <div className="min-w-0">
              <h4 className="font-rubik text-xs text-[#111c2d] font-extrabold truncate">
                Month 1 Official Certificate
              </h4>
              <p className="text-[11px] text-[#434655] truncate">Validated by WordHop Academic Board</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#004ac6] text-xl">workspace_premium</span>
        </div>

        {/* Action Buttons: Download PDF Certificate AND Save to Google Drive */}
        <div className="space-y-2">
          <button
            onClick={() => {
              soundEffects.playSuccess();
              onOpenCertificateViewer();
            }}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-[#004ac6] hover:bg-[#2563eb] py-3.5 px-4 text-white font-rubik text-xs font-bold shadow-[0_4px_0_#003ea8] active:translate-y-1 active:shadow-[0_1px_0_#003ea8] transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-xl">download</span>
            <span>Download PDF Certificate</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onSaveCertificateToDrive();
            }}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-[#dbe1ff] hover:bg-[#c6d3ff] py-3 px-4 text-[#00174b] font-rubik text-xs font-bold shadow-[0_3px_0_#b4c5ff] active:translate-y-0.5 transition-all cursor-pointer border border-[#b4c5ff]"
            type="button"
          >
            <span className="material-symbols-outlined text-lg text-[#004ac6]">cloud_sync</span>
            <span>Archive Certificate to Google Drive</span>
          </button>
        </div>

        {toastMessage && (
          <div className="rounded-full bg-[#006242] px-4 py-2 text-center font-rubik text-xs text-white font-bold shadow-md transition-all animate-fade-in">
            {toastMessage}
          </div>
        )}
      </div>

      {/* All Badges Modal */}
      {showAllBadgesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl border border-[#d8e3fb] space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎖️</span>
                <h3 className="font-extrabold text-lg text-[#111c2d]">Leo's Badge Collection</h3>
              </div>
              <button
                onClick={() => setShowAllBadgesModal(false)}
                className="w-8 h-8 rounded-full bg-[#f0f3ff] text-[#434655] flex items-center justify-center font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {[
                { emoji: '🦜', name: 'Chatty Parrot', desc: '50 full sentences' },
                { emoji: '☀️', name: 'Early Bird', desc: 'Practice before 9am' },
                { emoji: '🎯', name: 'Speech Pro', desc: '95%+ Accuracy' },
                { emoji: '🚀', name: 'Fast Learner', desc: 'Completed 10 steps' },
                { emoji: '📚', name: 'Bookworm', desc: 'Read 20 stories' },
                { emoji: '🐰', name: 'Bunny Friend', desc: '7 days with Hop' },
                { emoji: '🍎', name: 'Snack Master', desc: 'Passed Ordering' },
                { emoji: '🌟', name: 'Star Catcher', desc: '100 stars collected' },
                { emoji: '🛡️', name: 'Streak Guard', desc: 'Used freeze shield' },
              ].map((badge, idx) => (
                <div
                  key={idx}
                  onClick={() => soundEffects.playStar()}
                  className="flex flex-col items-center text-center p-2 rounded-xl bg-[#f0f3ff] border border-[#d8e3fb] cursor-pointer hover:scale-105 transition-transform"
                >
                  <span className="text-3xl mb-1">{badge.emoji}</span>
                  <span className="font-rubik text-[11px] font-bold text-[#111c2d] leading-tight">
                    {badge.name}
                  </span>
                  <span className="text-[9px] text-[#434655] mt-0.5">{badge.desc}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setShowAllBadgesModal(false);
                triggerToast('Badge progress synced to your profile!');
              }}
              className="w-full py-3 rounded-full bg-[#004ac6] text-white font-rubik text-xs font-bold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
