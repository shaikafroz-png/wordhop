/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavigationTab, GradeTrackId } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { GradesAndPlanScreen } from './components/GradesAndPlanScreen';
import { AdventureMapScreen } from './components/AdventureMapScreen';
import { DailyPracticeScreen } from './components/DailyPracticeScreen';
import { ProgressScreen } from './components/ProgressScreen';
import { GoogleDriveModal } from './components/GoogleDriveModal';
import { CertificateViewerModal } from './components/CertificateViewerModal';
import { soundEffects } from './utils/audio';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('adventure-map');
  const [currentGradeTrack, setCurrentGradeTrack] = useState<GradeTrackId>('grades-4-6');
  const [streakCount, setStreakCount] = useState<number>(12);
  const [starCount, setStarCount] = useState<number>(128);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState<boolean>(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState<boolean>(false);
  const [driveActionPrompt, setDriveActionPrompt] = useState<{
    title: string;
    type: 'audio' | 'certificate';
  } | null>(null);

  const handleHopToLesson = () => {
    soundEffects.playSuccess();
    setCurrentTab('daily-practice');
  };

  const handleStartLevel = (_levelNum: number) => {
    soundEffects.playSuccess();
    setCurrentTab('daily-practice');
  };

  const handleCompleteLevel = (xpGained: number, starsGained: number) => {
    setStarCount((prev) => prev + starsGained);
    setStreakCount((prev) => prev + 1);
    setCurrentTab('adventure-map');
  };

  const handleSaveToDrivePrompt = (details: { title: string; type: 'audio' | 'certificate' }) => {
    setDriveActionPrompt(details);
    setIsDriveModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#111c2d] flex flex-col antialiased selection:bg-blue-100">
      {/* Top Fixed Header */}
      <Header
        currentTab={currentTab}
        streakCount={streakCount}
        starCount={starCount}
        onOpenDriveModal={() => {
          setDriveActionPrompt(null);
          setIsDriveModalOpen(true);
        }}
        onOpenProfileModal={() => setCurrentTab('progress')}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-16 pb-20 overflow-x-hidden">
        {currentTab === 'grades-and-plan' && (
          <GradesAndPlanScreen
            currentGradeTrack={currentGradeTrack}
            onSelectTrack={setCurrentGradeTrack}
            onHopToLesson={handleHopToLesson}
          />
        )}

        {currentTab === 'adventure-map' && (
          <AdventureMapScreen onStartLevel={handleStartLevel} activeLevel={4} />
        )}

        {currentTab === 'daily-practice' && (
          <DailyPracticeScreen
            onCompleteLevel={handleCompleteLevel}
            onSaveToDrivePrompt={handleSaveToDrivePrompt}
          />
        )}

        {currentTab === 'progress' && (
          <ProgressScreen
            onOpenCertificateViewer={() => setIsCertModalOpen(true)}
            onSaveCertificateToDrive={() => {
              setDriveActionPrompt({
                title: 'WordHop Month 1 Official Certificate',
                type: 'certificate',
              });
              setIsDriveModalOpen(true);
            }}
          />
        )}
      </main>

      {/* Bottom Fixed Navigation */}
      <BottomNav currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Google Drive Integration Modal */}
      <GoogleDriveModal
        isOpen={isDriveModalOpen}
        onClose={() => setIsDriveModalOpen(false)}
        defaultAction={driveActionPrompt}
      />

      {/* Certificate Viewer & Printer Modal */}
      <CertificateViewerModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        onSaveToDrive={() => {
          setDriveActionPrompt({
            title: 'WordHop Month 1 Official Certificate',
            type: 'certificate',
          });
          setIsDriveModalOpen(true);
        }}
      />
    </div>
  );
}
