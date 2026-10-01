import React, { useState } from 'react';
import { DriveItem } from '../types';
import {
  getSavedDriveItems,
  saveDriveItemToStorage,
  uploadToGoogleDrive,
  getAccessTokenInMemory,
  setAccessTokenInMemory,
} from '../services/driveService';
import { soundEffects } from '../utils/audio';

interface GoogleDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAction?: { title: string; type: 'audio' | 'certificate' } | null;
}

export const GoogleDriveModal: React.FC<GoogleDriveModalProps> = ({
  isOpen,
  onClose,
  defaultAction,
}) => {
  const [items, setItems] = useState<DriveItem[]>(() => getSavedDriveItems());
  const [isSignedIn, setIsSignedIn] = useState<boolean>(() => !!getAccessTokenInMemory());
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [pendingConfirm, setPendingConfirm] = useState<{
    action: () => void;
    title: string;
    description: string;
    type: 'upload' | 'delete';
  } | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSignIn = () => {
    soundEffects.playClick();
    // Simulate/set client-side access token
    const token = 'mock_google_oauth_token_' + Date.now();
    setAccessTokenInMemory(token);
    setIsSignedIn(true);
    setStatusMessage('Connected to Google Drive as Leo (shaikafroz@narayanagroup.com)');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleSignOut = () => {
    soundEffects.playClick();
    setAccessTokenInMemory(null);
    setIsSignedIn(false);
    setStatusMessage('Signed out of Google Drive');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // User confirmation dialog for saving/modifying Google Drive
  const requestUploadCertificate = () => {
    soundEffects.playClick();
    setPendingConfirm({
      title: 'Save Month 1 Certificate to Google Drive?',
      description:
        'This will create "WordHop_Month1_Certificate_Leo.pdf" in your Google Drive under "My Drive > WordHop Learning Portfolio".',
      type: 'upload',
      action: async () => {
        setIsUploading(true);
        const result = await uploadToGoogleDrive(
          'WordHop_Month1_Certificate_Leo.pdf',
          'application/pdf',
          'Certificate content for Leo - Grade 4 WordHop Adventure'
        );
        setIsUploading(false);
        if (result.success) {
          const newItem: DriveItem = {
            id: result.fileId,
            name: 'WordHop_Month1_Certificate_Leo.pdf',
            mimeType: 'application/pdf',
            size: '312 KB',
            updatedAt: 'Just now',
            type: 'certificate',
            driveUrl: result.webViewLink || 'https://drive.google.com',
          };
          const updated = saveDriveItemToStorage(newItem);
          setItems(updated);
          soundEffects.playSuccess();
          setStatusMessage('Certificate saved to Google Drive!');
          setTimeout(() => setStatusMessage(null), 3000);
        }
      },
    });
  };

  const requestUploadAudio = () => {
    soundEffects.playClick();
    setPendingConfirm({
      title: 'Save Audio Recording to Google Drive?',
      description:
        'This will upload "Leo_Speech_OrderingSnacks_L4.m4a" to your Google Drive learning folder.',
      type: 'upload',
      action: async () => {
        setIsUploading(true);
        const result = await uploadToGoogleDrive(
          'Leo_Speech_OrderingSnacks_L4.m4a',
          'audio/mp4',
          'Spoken audio sample for Level 4'
        );
        setIsUploading(false);
        if (result.success) {
          const newItem: DriveItem = {
            id: result.fileId,
            name: 'Leo_Speech_OrderingSnacks_L4.m4a',
            mimeType: 'audio/mp4',
            size: '1.4 MB',
            updatedAt: 'Just now',
            type: 'audio',
            driveUrl: result.webViewLink || 'https://drive.google.com',
          };
          const updated = saveDriveItemToStorage(newItem);
          setItems(updated);
          soundEffects.playSuccess();
          setStatusMessage('Audio practice file saved to Google Drive!');
          setTimeout(() => setStatusMessage(null), 3000);
        }
      },
    });
  };

  const requestDeleteItem = (item: DriveItem) => {
    soundEffects.playClick();
    setPendingConfirm({
      title: `Remove "${item.name}" from WordHop Drive Sync?`,
      description: 'This will unlink and remove this file reference from your local Drive sync list.',
      type: 'delete',
      action: () => {
        const next = items.filter((i) => i.id !== item.id);
        localStorage.setItem('wordhop_drive_saved_files_v1', JSON.stringify(next));
        setItems(next);
        soundEffects.playClick();
        setStatusMessage(`Removed "${item.name}"`);
        setTimeout(() => setStatusMessage(null), 3000);
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-5 max-w-md w-full shadow-2xl border border-[#d8e3fb] space-y-4 max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#dee8ff]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#dbe1ff] flex items-center justify-center text-[#004ac6] shadow-[0_2px_0_#b4c5ff]">
              <span className="material-symbols-outlined text-2xl">cloud_sync</span>
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#111c2d]">Google Drive Sync</h3>
              <p className="text-xs text-[#434655]">Archiving Leo's certificates &amp; speech audio</p>
            </div>
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

        {/* Status Toast */}
        {statusMessage && (
          <div className="rounded-xl bg-[#006242] p-2.5 text-center font-rubik text-xs text-white font-bold shadow-md animate-fade-in">
            {statusMessage}
          </div>
        )}

        {/* Auth Section */}
        <div className="bg-[#f0f3ff] rounded-2xl p-3.5 border border-[#dee8ff] space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  isSignedIn ? 'bg-[#007d55] animate-pulse' : 'bg-[#c3c6d7]'
                }`}
              />
              <span className="font-rubik text-xs font-bold text-[#111c2d]">
                {isSignedIn ? 'Connected to Google Drive' : 'Connect Your Google Drive'}
              </span>
            </div>
            {isSignedIn && (
              <button
                onClick={handleSignOut}
                className="text-[11px] font-rubik text-[#737686] hover:text-[#ba1a1a] cursor-pointer"
              >
                Disconnect
              </button>
            )}
          </div>

          {!isSignedIn ? (
            <div className="space-y-2 pt-1">
              <p className="text-xs text-[#434655]">
                Sign in with Google to automatically backup certificates, speaking recordings, and
                monthly progress reports to your Google Drive account.
              </p>
              {/* Official Google Sign-In Styled Button per skill guidelines */}
              <button
                onClick={handleSignIn}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-full py-2.5 px-4 shadow-[0_2px_0_#d8e3fb] active:translate-y-0.5 cursor-pointer transition-all"
                type="button"
              >
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                </svg>
                <span className="font-rubik text-xs font-bold text-gray-700">
                  Sign in with Google
                </span>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs text-[#434655] pt-0.5">
              <span className="flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-sm text-[#007d55]">folder</span>
                Target: My Drive &gt; WordHop Learning
              </span>
              <span className="text-[#007d55] font-bold">Online</span>
            </div>
          )}
        </div>

        {/* Quick Action Upload Buttons */}
        <div className="space-y-2">
          <span className="font-rubik text-xs text-[#111c2d] font-bold block">
            Save Documents to Google Drive
          </span>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={requestUploadCertificate}
              disabled={isUploading}
              className="flex flex-col items-center p-3 rounded-2xl bg-white border border-[#d8e3fb] shadow-[0_3px_0_#d8e3fb] hover:bg-[#f0f3ff] active:translate-y-0.5 cursor-pointer text-center transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-2xl text-[#004ac6] mb-1">
                workspace_premium
              </span>
              <span className="font-rubik text-xs font-bold text-[#111c2d]">Save Certificate</span>
              <span className="text-[10px] text-[#737686]">Month 1 PDF</span>
            </button>

            <button
              onClick={requestUploadAudio}
              disabled={isUploading}
              className="flex flex-col items-center p-3 rounded-2xl bg-white border border-[#d8e3fb] shadow-[0_3px_0_#d8e3fb] hover:bg-[#f0f3ff] active:translate-y-0.5 cursor-pointer text-center transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-2xl text-[#795900] mb-1">
                record_voice_over
              </span>
              <span className="font-rubik text-xs font-bold text-[#111c2d]">Save Speech Audio</span>
              <span className="text-[10px] text-[#737686]">Level 4 .m4a</span>
            </button>
          </div>
        </div>

        {/* Synced Drive Files List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-rubik text-xs text-[#111c2d] font-bold">
              Synced Files in Drive ({items.length})
            </span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#f0f3ff] border border-[#dee8ff]"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-xl">
                    {item.type === 'certificate' ? '📜' : item.type === 'audio' ? '🎙️' : '📊'}
                  </span>
                  <div className="min-w-0">
                    <p className="font-rubik text-xs font-bold text-[#111c2d] truncate">
                      {item.name}
                    </p>
                    <span className="text-[10px] text-[#737686]">
                      {item.size} • {item.updatedAt}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <a
                    href={item.driveUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="View in Google Drive"
                    className="p-1 text-[#004ac6] hover:bg-[#dee8ff] rounded-lg"
                  >
                    <span className="material-symbols-outlined text-base">open_in_new</span>
                  </a>
                  <button
                    onClick={() => requestDeleteItem(item)}
                    title="Remove from sync"
                    className="p-1 text-[#737686] hover:text-[#ba1a1a] hover:bg-[#dee8ff] rounded-lg cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confirmation Modal for Destructive/Mutating Operations per Skill */}
        {pendingConfirm && (
          <div className="absolute inset-0 bg-white/95 rounded-3xl p-6 z-20 flex flex-col justify-center items-center text-center space-y-3 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-[#ffdf9f] text-[#795900] flex items-center justify-center text-2xl shadow-[0_2px_0_#f9bd22]">
              <span className="material-symbols-outlined text-2xl">
                {pendingConfirm.type === 'delete' ? 'delete_forever' : 'cloud_upload'}
              </span>
            </div>
            <h4 className="font-extrabold text-base text-[#111c2d]">{pendingConfirm.title}</h4>
            <p className="text-xs text-[#434655] leading-relaxed">{pendingConfirm.description}</p>

            <div className="flex gap-2 w-full pt-2">
              <button
                onClick={() => setPendingConfirm(null)}
                className="flex-1 py-2.5 rounded-full bg-[#dee8ff] text-[#434655] font-rubik text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const act = pendingConfirm.action;
                  setPendingConfirm(null);
                  act();
                }}
                className={`flex-1 py-2.5 rounded-full text-white font-rubik text-xs font-bold cursor-pointer ${
                  pendingConfirm.type === 'delete' ? 'bg-[#ba1a1a]' : 'bg-[#004ac6]'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
