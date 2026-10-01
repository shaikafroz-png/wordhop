import React, { useRef } from 'react';
import { soundEffects } from '../utils/audio';

interface CertificateViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveToDrive: () => void;
}

export const CertificateViewerModal: React.FC<CertificateViewerModalProps> = ({
  isOpen,
  onClose,
  onSaveToDrive,
}) => {
  const certRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrintDownload = () => {
    soundEffects.playStar();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-5 max-w-md w-full shadow-2xl border border-[#d8e3fb] space-y-4 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-[#dee8ff]">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <h3 className="font-extrabold text-base text-[#111c2d]">WordHop Official Certificate</h3>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#f0f3ff] text-[#434655] flex items-center justify-center font-bold hover:bg-[#dee8ff] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Certificate Canvas / Card */}
        <div
          ref={certRef}
          className="relative bg-gradient-to-br from-[#fffdf7] via-[#fffbf0] to-[#f9f9ff] p-5 rounded-2xl border-4 border-[#ffc329] shadow-inner text-center space-y-3"
        >
          {/* Top Banner & Seal */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-[#ffdf9f] flex items-center justify-center shadow-[0_2px_0_#f9bd22] text-2xl">
              🌟
            </div>
          </div>

          <div className="space-y-0.5">
            <span className="font-rubik text-[10px] tracking-widest text-[#795900] uppercase font-bold">
              WordHop Academic Board
            </span>
            <h2 className="font-extrabold text-xl text-[#004ac6] tracking-tight">
              Certificate of Achievement
            </h2>
            <p className="text-[11px] text-[#434655]">This honors the outstanding speaking progress of</p>
          </div>

          {/* Student Name */}
          <div className="py-2 border-b-2 border-dashed border-[#ffdf9f]">
            <h1 className="font-extrabold text-2xl text-[#111c2d] tracking-wide">
              Leo Alexander
            </h1>
            <span className="font-rubik text-xs text-[#007d55] font-bold">
              Grade 4 • Young Explorer Track
            </span>
          </div>

          {/* Achievement Description */}
          <p className="text-xs text-[#434655] leading-relaxed px-2">
            For successfully completing <span className="font-bold text-[#111c2d]">Month 1: Phonetics &amp; Core Vocabulary</span> with a{' '}
            <span className="font-bold text-[#006242]">92% Pronunciation Cadence</span> and completing 50 interactive spoken dialogues.
          </p>

          {/* Footer Details */}
          <div className="pt-2 flex items-center justify-between text-left text-[10px] text-[#737686] border-t border-[#dee8ff]">
            <div>
              <span className="block font-bold text-[#111c2d]">Date Issued:</span>
              <span>October 2026</span>
            </div>
            <div className="text-center">
              <span className="material-symbols-outlined text-xl text-[#ffc329] fill-1">verified</span>
              <span className="block font-rubik text-[9px] font-bold text-[#795900]">Verified B1</span>
            </div>
            <div className="text-right">
              <span className="block font-bold text-[#111c2d]">WordHop Bunny Coach</span>
              <span className="italic">Certified Curriculum</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handlePrintDownload}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-[#004ac6] hover:bg-[#2563eb] py-3.5 px-4 text-white font-rubik text-xs font-bold shadow-[0_4px_0_#003ea8] active:translate-y-1 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">print</span>
            <span>Print or Save as PDF</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
              onSaveToDrive();
            }}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-[#dbe1ff] hover:bg-[#c6d3ff] py-3 px-4 text-[#00174b] font-rubik text-xs font-bold shadow-[0_3px_0_#b4c5ff] active:translate-y-0.5 transition-all cursor-pointer border border-[#b4c5ff]"
          >
            <span className="material-symbols-outlined text-lg text-[#004ac6]">cloud_sync</span>
            <span>Save Directly to Google Drive</span>
          </button>
        </div>
      </div>
    </div>
  );
};
