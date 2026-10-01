import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { soundEffects, speakEnglishPhrase } from '../utils/audio';

interface DailyPracticeScreenProps {
  onCompleteLevel: (xpGained: number, starsGained: number) => void;
  onSaveToDrivePrompt?: (details: { title: string; type: 'audio' | 'certificate' }) => void;
}

interface PracticeStepData {
  step: number;
  phrase: string;
  phonetics: string;
  vocabulary: string;
  topic: string;
  coachPrompt: string;
  image: string;
  tokens: string[];
  correctTokens: string[];
}

const LESSON_STEPS: PracticeStepData[] = [
  {
    step: 1,
    phrase: 'Hello, good morning!',
    phonetics: '[ həˈloʊ ɡʊd ˈmɔːrnɪŋ ]',
    vocabulary: 'Polite Greetings',
    topic: 'Greeting the Baker',
    coachPrompt: 'Start with a warm hello!',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNJMk8zDdn-nSzYGFAhzkMz3IuYrFyS11s6Bjap1zNQ7Nx3U5Cehr-TTZ_rI7IjLumXY3FeDedmrY65Y7NIyd0CuGaiWkKuEtnbSlxfb_GrkT7dzJDPqFXW8NicNiuTjFBflSvIauKtfyjSHW0vDbHDbj0tiuTQSwRQNiQlFY7be8VVHwR-y7OB2nFGswFzwqYyyiqSNwuRji6HSFeTU5_IXhIyl_nhQ19L7fAweYh5RpVaPg3i1gT5Q',
    tokens: ['Hello,', 'good', 'morning!'],
    correctTokens: ['Hello,', 'good', 'morning!'],
  },
  {
    step: 2,
    phrase: 'I would like a snack, please.',
    phonetics: '[ aɪ wʊd laɪk ə snæk pliːz ]',
    vocabulary: 'Yummy Snacks',
    topic: 'Choosing at the Counter',
    coachPrompt: 'Ask nicely with "I would like"!',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNJMk8zDdn-nSzYGFAhzkMz3IuYrFyS11s6Bjap1zNQ7Nx3U5Cehr-TTZ_rI7IjLumXY3FeDedmrY65Y7NIyd0CuGaiWkKuEtnbSlxfb_GrkT7dzJDPqFXW8NicNiuTjFBflSvIauKtfyjSHW0vDbHDbj0tiuTQSwRQNiQlFY7be8VVHwR-y7OB2nFGswFzwqYyyiqSNwuRji6HSFeTU5_IXhIyl_nhQ19L7fAweYh5RpVaPg3i1gT5Q',
    tokens: ['I would', 'like', 'a snack,', 'please.'],
    correctTokens: ['I would', 'like', 'a snack,', 'please.'],
  },
  {
    step: 3,
    phrase: 'Can I please have two red apples?',
    phonetics: '[ kæn aɪ pliːz hæv tuː rɛd ˈæplz ]',
    vocabulary: 'Fresh Apples',
    topic: 'Ordering Yummy Snacks',
    coachPrompt: 'Listen and repeat after me!',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNJMk8zDdn-nSzYGFAhzkMz3IuYrFyS11s6Bjap1zNQ7Nx3U5Cehr-TTZ_rI7IjLumXY3FeDedmrY65Y7NIyd0CuGaiWkKuEtnbSlxfb_GrkT7dzJDPqFXW8NicNiuTjFBflSvIauKtfyjSHW0vDbHDbj0tiuTQSwRQNiQlFY7be8VVHwR-y7OB2nFGswFzwqYyyiqSNwuRji6HSFeTU5_IXhIyl_nhQ19L7fAweYh5RpVaPg3i1gT5Q',
    tokens: ['Can I', 'please', 'have', 'two', 'red', 'apples?'],
    correctTokens: ['Can I', 'please', 'have', 'two', 'red', 'apples?'],
  },
  {
    step: 4,
    phrase: 'Thank you very much!',
    phonetics: '[ θæŋk juː ˈvɛri mʌtʃ ]',
    vocabulary: 'Kind Manners',
    topic: 'Saying Thanks',
    coachPrompt: 'Always say thank you with a bright smile!',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNJMk8zDdn-nSzYGFAhzkMz3IuYrFyS11s6Bjap1zNQ7Nx3U5Cehr-TTZ_rI7IjLumXY3FeDedmrY65Y7NIyd0CuGaiWkKuEtnbSlxfb_GrkT7dzJDPqFXW8NicNiuTjFBflSvIauKtfyjSHW0vDbHDbj0tiuTQSwRQNiQlFY7be8VVHwR-y7OB2nFGswFzwqYyyiqSNwuRji6HSFeTU5_IXhIyl_nhQ19L7fAweYh5RpVaPg3i1gT5Q',
    tokens: ['Thank you', 'very', 'much!'],
    correctTokens: ['Thank you', 'very', 'much!'],
  },
  {
    step: 5,
    phrase: 'Have a wonderful day!',
    phonetics: '[ hæv ə ˈwʌndərfəl deɪ ]',
    vocabulary: 'Friendly Goodbyes',
    topic: 'Leaving the Shop',
    coachPrompt: 'Finish strong with kind cheer!',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNJMk8zDdn-nSzYGFAhzkMz3IuYrFyS11s6Bjap1zNQ7Nx3U5Cehr-TTZ_rI7IjLumXY3FeDedmrY65Y7NIyd0CuGaiWkKuEtnbSlxfb_GrkT7dzJDPqFXW8NicNiuTjFBflSvIauKtfyjSHW0vDbHDbj0tiuTQSwRQNiQlFY7be8VVHwR-y7OB2nFGswFzwqYyyiqSNwuRji6HSFeTU5_IXhIyl_nhQ19L7fAweYh5RpVaPg3i1gT5Q',
    tokens: ['Have', 'a wonderful', 'day!'],
    correctTokens: ['Have', 'a wonderful', 'day!'],
  },
];

export const DailyPracticeScreen: React.FC<DailyPracticeScreenProps> = ({
  onCompleteLevel,
  onSaveToDrivePrompt,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(2); // Start on Step 3 (matching mockup)
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [speechAccuracy, setSpeechAccuracy] = useState<number | null>(96);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [checkStatus, setCheckStatus] = useState<'idle' | 'checking' | 'correct' | 'try-again'>('idle');
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);

  const stepData = LESSON_STEPS[currentStepIndex];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset tokens on step change
  useEffect(() => {
    setSelectedTokens([]);
    setCheckStatus('idle');
    setSpeechAccuracy(96);
  }, [currentStepIndex]);

  const handleToggleToken = (token: string) => {
    soundEffects.playPop();
    if (selectedTokens.includes(token)) {
      setSelectedTokens(selectedTokens.filter((t) => t !== token));
    } else {
      setSelectedTokens([...selectedTokens, token]);
    }
  };

  const handleListen = (speed: number) => {
    soundEffects.playClick();
    setIsSpeaking(true);
    speakEnglishPhrase(
      stepData.phrase,
      speed,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const handleToggleRecord = () => {
    soundEffects.playClick();
    if (!isRecording) {
      setIsRecording(true);
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);

      // Simulate listening and evaluate
      setTimeout(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsRecording(false);
        const randomScore = Math.floor(Math.random() * 8) + 92; // 92-99%
        setSpeechAccuracy(randomScore);
        soundEffects.playStar();
      }, 3500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsRecording(false);
      soundEffects.playStar();
    }
  };

  const handleCheckAnswer = () => {
    if (checkStatus === 'checking') return;
    soundEffects.playClick();
    setCheckStatus('checking');

    setTimeout(() => {
      // Auto-fill or validate tokens
      const isCorrect =
        selectedTokens.length === stepData.correctTokens.length &&
        selectedTokens.every((val, idx) => val === stepData.correctTokens[idx]);

      if (isCorrect || selectedTokens.length === 0) {
        // If empty, auto populate correct tokens to be encouraging for the child
        setSelectedTokens(stepData.correctTokens);
      }

      setCheckStatus('correct');
      soundEffects.playSuccess();

      // Trigger confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#2563eb', '#ffc329', '#10b981', '#f43f5e'],
        });
      } catch {
        // ignore
      }

      // If last step, show celebration modal
      if (currentStepIndex === LESSON_STEPS.length - 1) {
        setTimeout(() => {
          setShowCelebrationModal(true);
        }, 1200);
      }
    }, 700);
  };

  const handleNextStep = () => {
    soundEffects.playClick();
    if (currentStepIndex < LESSON_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setShowCelebrationModal(true);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-3.5 space-y-3.5 pt-2 pb-28">
      {/* Top Lesson Track Bar & Status Hub */}
      <div className="flex flex-col space-y-1.5 pt-1">
        <div className="flex items-center justify-between">
          {/* Hearts / Lives */}
          <div className="flex items-center gap-1 bg-[#f0f3ff] px-2.5 py-1 rounded-full shadow-[0_2px_0_#dee8ff] border border-[#d8e3fb]/40">
            <span className="material-symbols-outlined text-[#ba1a1a] text-lg fill-1">favorite</span>
            <span className="material-symbols-outlined text-[#ba1a1a] text-lg fill-1">favorite</span>
            <span className="material-symbols-outlined text-[#ba1a1a] text-lg fill-1">favorite</span>
            <span className="font-rubik text-xs text-[#111c2d] font-bold ml-1">3/3</span>
          </div>

          {/* Question Counter & Unit Tag */}
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-[#ffdf9f] text-[#261a00] font-rubik text-xs font-bold shadow-[0_2px_0_#f9bd22] border border-[#f9bd22]/40">
              Level 4
            </span>
            <span className="font-rubik text-xs text-[#434655] font-bold">
              Step {stepData.step}/{LESSON_STEPS.length}
            </span>
          </div>

          {/* Live XP Counter */}
          <div className="flex items-center gap-1 bg-[#f0f3ff] px-2.5 py-1 rounded-full shadow-[0_2px_0_#dee8ff] border border-[#d8e3fb]/40">
            <span className="material-symbols-outlined text-[#ffc329] text-lg fill-1">bolt</span>
            <span className="font-rubik text-xs text-[#004ac6] font-bold">+200 XP</span>
          </div>
        </div>

        {/* Progress Track Bar */}
        <div className="w-full bg-[#d8e3fb] h-3 rounded-full overflow-hidden p-0.5 shadow-inner">
          <div
            className="h-full bg-[#2563eb] rounded-full transition-all duration-500 shadow-[0_2px_0_#004ac6]"
            style={{ width: `${(stepData.step / LESSON_STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Mascot Prompt Header Banner */}
      <div className="relative bg-[#f0f3ff] rounded-2xl p-3.5 shadow-[0_4px_0_#d8e3fb] border border-[#d8e3fb]/60 overflow-hidden">
        <div className="flex items-center gap-3">
          {/* Bunny Mascot Thumbnail */}
          <div className="relative w-15 h-15 shrink-0 rounded-full bg-[#ffdf9f] flex items-center justify-center shadow-[0_3px_0_#f9bd22] p-1 overflow-hidden">
            <img
              className="w-full h-full object-cover rounded-full"
              alt="Bunny Coach Hop"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2A8OofSZovqZzG2BGSlrS1Z8nRNEnLjmuwhz6WqHr6q6E8fU3UaF5SJyRKoWMtlcj62nTr53dqRD1w7tu4r6myrwMIjF99MFpgzDr016lAIvwxn0T_nhEh1vDshyV9fSG-JESy43VVITwik4jyI26PQkJ6gRfZb-rmsGWbRzi9DXxBANSYi-AYMXezK_Gccxl7OcxGG0D1qEZuVFeMmHeBR5zVVKTvHnn5c8XTS3-m3Ti-OS8KtzBxQ"
            />
            <div className="absolute -bottom-1 -right-1 bg-[#007d55] rounded-full p-0.5 text-white shadow-[0_2px_0_#005236]">
              <span className="material-symbols-outlined text-xs">record_voice_over</span>
            </div>
          </div>

          {/* Speech Bubble */}
          <div className="relative flex-1 bg-white rounded-xl p-2.5 shadow-[0_3px_0_#dee8ff] border border-[#dee8ff]">
            <div className="flex items-center justify-between mb-0.5">
              <span className="font-rubik text-xs text-[#004ac6] font-bold">Bunny Coach Hop</span>
              <span className="font-rubik text-[11px] text-[#434655] font-medium truncate max-w-[120px]">
                {stepData.topic}
              </span>
            </div>
            <p className="font-bold text-sm text-[#111c2d] leading-snug">
              {stepData.coachPrompt}
            </p>
          </div>
        </div>
      </div>

      {/* Primary Interactive Speech Challenge Card */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_4px_0_#dee8ff] border border-[#dee8ff] flex flex-col space-y-3.5 relative overflow-hidden">
        {/* Visual Snack Scene Preview */}
        <div className="relative w-full h-28 rounded-xl overflow-hidden shadow-[0_2px_0_#d8e3fb]">
          <img
            className="w-full h-full object-cover"
            alt={stepData.vocabulary}
            src={stepData.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#263143]/70 via-transparent to-transparent flex items-end p-2.5">
            <span className="bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[#111c2d] font-rubik text-xs font-bold shadow-[0_2px_0_#dee8ff]">
              🍎 Target Vocabulary: {stepData.vocabulary}
            </span>
          </div>
        </div>

        {/* English Phrase & Phonetics */}
        <div className="flex flex-col items-center text-center space-y-1">
          <h2 className="font-extrabold text-2xl text-[#004ac6] tracking-tight leading-snug">
            “{stepData.phrase}”
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e7eeff] rounded-full text-[#434655] font-rubik text-xs shadow-[0_2px_0_#d8e3fb]">
            <span className="material-symbols-outlined text-sm text-[#004ac6]">spellcheck</span>
            <span>{stepData.phonetics}</span>
          </div>
        </div>

        {/* Dual Audio Controllers (Normal & Turtle Pace) */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => handleListen(1.0)}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#dbe1ff] text-[#00174b] shadow-[0_3px_0_#b4c5ff] active:translate-y-0.5 active:shadow-[0_1px_0_#b4c5ff] transition-all cursor-pointer ${
              isSpeaking ? 'ring-2 ring-[#004ac6]' : ''
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-lg">volume_up</span>
            <span className="font-rubik text-xs font-bold">Listen (1.0x)</span>
          </button>

          <button
            onClick={() => handleListen(0.7)}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#dee8ff] text-[#111c2d] shadow-[0_3px_0_#d8e3fb] active:translate-y-0.5 active:shadow-[0_1px_0_#d8e3fb] transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-lg text-[#795900]">pest_control_rodent</span>
            <span className="font-rubik text-xs font-bold">Slow (0.7x)</span>
          </button>
        </div>

        {/* Voice Recording Engine & Pulse Ring */}
        <div className="flex flex-col items-center justify-center py-1 space-y-3">
          <div className="relative flex items-center justify-center">
            {/* Animated Ripple Rings */}
            {isRecording && (
              <>
                <div className="absolute w-24 h-24 rounded-full bg-[#ba1a1a]/30 animate-ping" />
                <div className="absolute w-20 h-20 rounded-full bg-[#ba1a1a]/40" />
              </>
            )}
            {!isRecording && (
              <>
                <div className="absolute w-24 h-24 rounded-full bg-[#2563eb]/20 animate-ping" />
                <div className="absolute w-20 h-20 rounded-full bg-[#2563eb]/30" />
              </>
            )}

            {/* Big Tactile Push Microphone Button */}
            <button
              onClick={handleToggleRecord}
              aria-label="Tap to speak"
              className={`relative w-16 h-16 rounded-full text-white flex items-center justify-center transition-all z-10 cursor-pointer ${
                isRecording
                  ? 'bg-[#ba1a1a] shadow-[0_5px_0_#93000a] scale-105'
                  : 'bg-[#2563eb] shadow-[0_5px_0_#004ac6] active:translate-y-1 active:shadow-[0_1px_0_#004ac6]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-3xl fill-1">
                {isRecording ? 'graphic_eq' : 'mic'}
              </span>
            </button>
          </div>

          {/* Action helper cue */}
          <div className="flex flex-col items-center">
            <span
              className={`font-rubik text-sm font-extrabold tracking-wide ${
                isRecording ? 'text-[#ba1a1a] animate-pulse' : 'text-[#111c2d]'
              }`}
            >
              {isRecording ? `Listening... (${recordingSeconds}s)` : 'Tap to Speak'}
            </span>
            <span className="text-xs text-[#434655]">
              {isRecording ? 'Speak loudly into the microphone' : 'Speak clearly into the microphone'}
            </span>
          </div>

          {/* Real-time Speech AI Feedback Pill */}
          {speechAccuracy !== null && (
            <div className="w-full flex items-center justify-between bg-[#6ffbbe] text-[#005236] px-3.5 py-2 rounded-full shadow-[0_3px_0_#4edea3]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl fill-1">verified</span>
                <span className="font-rubik text-xs font-bold">Accuracy: {speechAccuracy}%</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-rubik text-[11px] font-semibold">Fantastic pitch &amp; rhythm! 🌟</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sentence Builder Scramble Area */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_4px_0_#dee8ff] border border-[#dee8ff] flex flex-col space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-rubik text-xs text-[#111c2d] font-bold">Sentence Tap-Check</span>
          <span className="font-rubik text-xs text-[#004ac6] font-bold">Tap tokens in order</span>
        </div>

        {/* Tap Token Grid */}
        <div className="flex flex-wrap gap-2 pt-0.5">
          {stepData.tokens.map((token) => {
            const isSelected = selectedTokens.includes(token);
            return (
              <button
                key={token}
                onClick={() => handleToggleToken(token)}
                className={`px-3.5 py-2 rounded-xl font-rubik text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#dbe1ff] text-[#00174b] shadow-[0_2px_0_#b4c5ff] translate-y-0.5'
                    : 'bg-[#e7eeff] text-[#111c2d] shadow-[0_3px_0_#d8e3fb] hover:bg-[#d8e3fb] active:translate-y-0.5 active:shadow-[0_1px_0_#d8e3fb]'
                }`}
                type="button"
              >
                {token}
              </button>
            );
          })}
        </div>

        {/* Active Construction Display Line */}
        <div className="min-h-[46px] bg-[#f0f3ff] rounded-xl px-3 py-2 flex items-center gap-1.5 flex-wrap border border-[#dee8ff]">
          {selectedTokens.length === 0 ? (
            <span className="text-[#737686] text-xs italic">Tokens will appear here...</span>
          ) : (
            selectedTokens.map((t) => (
              <span
                key={t}
                onClick={() => handleToggleToken(t)}
                className="bg-[#d8e3fb] hover:bg-red-100 text-[#111c2d] font-rubik text-xs font-bold px-2.5 py-1 rounded-lg shadow-[0_2px_0_#dee8ff] cursor-pointer"
                title="Click to remove"
              >
                {t} ✕
              </span>
            ))
          )}
        </div>
      </div>

      {/* Bottom Action Dock: Large Primary Pill */}
      <div className="pt-1 pb-2 flex flex-col space-y-2">
        {checkStatus === 'correct' ? (
          <div className="flex gap-2">
            <button
              onClick={handleNextStep}
              className="flex-1 py-4 rounded-full bg-[#007d55] text-white font-rubik text-sm shadow-[0_5px_0_#005236] active:translate-y-1 active:shadow-[0_1px_0_#005236] flex items-center justify-center gap-2 tracking-wide font-extrabold transition-all cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-2xl fill-1">celebration</span>
              <span>
                {currentStepIndex < LESSON_STEPS.length - 1
                  ? 'CONTINUE TO NEXT STEP (+200 XP)'
                  : 'FINISH LEVEL 4'}
              </span>
            </button>
          </div>
        ) : (
          <button
            onClick={handleCheckAnswer}
            disabled={checkStatus === 'checking'}
            className="w-full py-4 rounded-full bg-[#007d55] hover:bg-[#006242] text-white font-rubik text-sm shadow-[0_5px_0_#005236] active:translate-y-1 active:shadow-[0_1px_0_#005236] flex items-center justify-center gap-2 tracking-wide font-extrabold transition-all cursor-pointer"
            type="button"
          >
            {checkStatus === 'checking' ? (
              <>
                <span className="material-symbols-outlined text-2xl animate-spin">autorenew</span>
                <span>EVALUATING SPEECH...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-2xl fill-1">check_circle</span>
                <span>CHECK ANSWER</span>
              </>
            )}
          </button>
        )}

        <div className="flex items-center justify-center gap-1 text-[#434655]">
          <span className="material-symbols-outlined text-sm text-[#ffc329] fill-1">stars</span>
          <span className="font-rubik text-xs font-semibold">
            Earn 3 Stars &amp; Bunny Snack Stamp upon completion
          </span>
        </div>
      </div>

      {/* Completion Modal */}
      {showCelebrationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border-4 border-[#ffc329] text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#ffdf9f] flex items-center justify-center shadow-[0_4px_0_#f9bd22] text-4xl animate-bounce">
              🏆
            </div>
            <h3 className="font-extrabold text-2xl text-[#111c2d]">Level 4 Mastered!</h3>
            <p className="text-xs text-[#434655]">
              You completed all 5 dialogue steps for <span className="font-bold">Ordering Snacks &amp; Polite Words</span>!
            </p>

            <div className="grid grid-cols-2 gap-2 bg-[#f0f3ff] p-3 rounded-2xl">
              <div>
                <span className="text-[11px] text-[#434655] font-rubik block">XP EARNED</span>
                <span className="font-rubik text-xl font-bold text-[#004ac6]">+1,000 XP</span>
              </div>
              <div>
                <span className="text-[11px] text-[#434655] font-rubik block">STARS</span>
                <span className="font-rubik text-xl font-bold text-[#795900]">⭐ 3 / 3</span>
              </div>
            </div>

            {/* Google Drive option */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  soundEffects.playStar();
                  if (onSaveToDrivePrompt) {
                    onSaveToDrivePrompt({
                      title: 'Level 4 Spoken Audio & Badge',
                      type: 'audio',
                    });
                  }
                }}
                className="w-full py-3 px-4 rounded-full bg-[#dbe1ff] text-[#00174b] font-rubik text-xs font-bold flex items-center justify-center gap-2 shadow-[0_3px_0_#b4c5ff] active:translate-y-0.5 cursor-pointer hover:bg-[#c6d3ff]"
              >
                <span className="material-symbols-outlined text-base">cloud_upload</span>
                <span>Save Audio Recording to Google Drive</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playSuccess();
                  setShowCelebrationModal(false);
                  onCompleteLevel(1000, 3);
                }}
                className="w-full py-3.5 px-4 rounded-full bg-[#004ac6] text-white font-rubik text-sm font-bold shadow-[0_4px_0_#003ea8] active:translate-y-1 cursor-pointer"
              >
                Return to Adventure Map
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
