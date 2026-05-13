// app/dashboard/voice-cloning/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  Mic,
  Upload,
  Trash2,
  Play,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

// Voice Clone Data Types
interface VoiceClone {
  id: string;
  name: string;
  relation: string;
  createdAt: Date;
  expiresAt: Date;
  sessionsUsed: number;
  status: "active" | "pending" | "expired";
  audioPreview?: string;
}

export default function VoiceCloningPage() {
  const [activeTab, setActiveTab] = useState("my-clones");
  const [coolingEndTime, setCoolingEndTime] = useState<Date | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [consentAudio, setConsentAudio] = useState<Blob | null>(null);
  const [uploadedAudio, setUploadedAudio] = useState<File[]>([]);
  const [selectedRelation, setSelectedRelation] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToSecondTerm, setAgreedToSecondTerm] = useState(false);
  const [cloneName, setCloneName] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    setMounted(true);

    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    window.addEventListener("themeChange", checkDarkMode);

    const observer = new MutationObserver(checkDarkMode);

    observer.observe(document.documentElement, {
      attributes: true,
    });

    return () => {
      window.removeEventListener("themeChange", checkDarkMode);
      observer.disconnect();
    };
  }, []);

  //ITS A MOCK DATA SO REPLACE WITH API FROM DATABASE
  const [voiceClones, setVoiceClones] = useState<VoiceClone[]>([
    {
      id: "1",
      name: "Ammi Jan",
      relation: "Mother",
      createdAt: new Date("2026-03-15"),
      expiresAt: new Date("2026-04-14"),
      sessionsUsed: 12,
      status: "active",
    },
    {
      id: "2",
      name: "Abbu",
      relation: "Father",
      createdAt: new Date("2026-04-01"),
      expiresAt: new Date("2026-05-01"),
      sessionsUsed: 3,
      status: "active",
    },
  ]);

  // COOLING PERIOD FOR SERVER OKAY!
  useEffect(() => {
    const savedCoolingEnd = localStorage.getItem("voiceCloneCoolingEnd");

    if (savedCoolingEnd) {
      setCoolingEndTime(new Date(savedCoolingEnd));
    }
  }, []);

  const isCoolingActive = coolingEndTime && new Date() < coolingEndTime;

  const getTimeRemaining = () => {
    if (!coolingEndTime) return null;

    const diff = coolingEndTime.getTime() - new Date().getTime();

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return { hours, minutes };
  };

  const timeRemaining = getTimeRemaining();

  const handleRequestClone = () => {
    // HERE IS IT SET FOR 24HR COOLING PERIOD CHANGE IT ACCORDINGLY
    const coolingEnd = new Date();

    coolingEnd.setHours(coolingEnd.getHours() + 24);

    localStorage.setItem("voiceCloneCoolingEnd", coolingEnd.toISOString());

    setCoolingEndTime(coolingEnd);

    alert(
      "Your voice clone request has been submitted. Cooling period active.",
    );
  };

  const handleDeleteClone = (id: string) => {
    setVoiceClones((prev) => prev.filter((clone) => clone.id !== id));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length > 0) {
      setUploadedAudio((prev) => [...prev, ...files]);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });

        setConsentAudio(audioBlob);

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();

      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);

      alert("Please allow microphone access to record your consent.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();

      setIsRecording(false);
    }
  };

  const handleRecordConsent = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  if (!mounted) return null;

  // Theme colors
  const lightColors = {
    bgGradient: "linear-gradient(135deg, rgb(237,242,251), rgb(226,234,252))",
    cardBg: "rgba(255,255,255,0.7)",
    cardBorder: "1px solid rgba(171,196,255,0.25)",
    textPrimary: "#0f172a",
    textSecondary: "#334155",
    textTertiary: "#475569",
    accentColor: "rgb(120,137,179)",
    buttonGradient:
      "linear-gradient(135deg, rgb(120,137,179), rgb(100,115,155))",
    inputBg: "rgba(255,255,255,0.9)",
    inputBorder: "1px solid rgba(171,196,255,0.3)",
  };

  const darkColors = {
    bgGradient: "linear-gradient(135deg, rgb(15,23,42), rgb(30,41,59))",
    cardBg: "rgba(255,255,255,0.08)",
    cardBorder: "1px solid rgba(200,220,255,0.15)",
    textPrimary: "#f1f5f9",
    textSecondary: "#cbd5e1",
    textTertiary: "#94a3b8",
    accentColor: "rgb(171,196,255)",
    buttonGradient:
      "linear-gradient(135deg, rgb(171,196,255), rgb(193,211,254))",
    inputBg: "rgba(255,255,255,0.08)",
    inputBorder: "1px solid rgba(171,196,255,0.2)",
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <div
      className="min-h-screen pt-24 pb-12 relative overflow-hidden"
      style={{ background: colors.bgGradient }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-0 w-[450px] h-[450px] rounded-full blur-3xl opacity-20"
          style={{
            background: isDark ? "rgb(120,137,179)" : "rgb(171,196,255)",
          }}
        />

        <div
          className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full blur-3xl opacity-20"
          style={{
            background: isDark ? "rgb(100,115,155)" : "rgb(193,211,254)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-5 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/dashboard">
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 group"
              style={{
                background: colors.cardBg,
                border: colors.cardBorder,
                color: colors.textPrimary,
                backdropFilter: "blur(10px)",
              }}
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="font-medium">Back to Dashboard</span>
            </button>
          </Link>
        </motion.div>

        {/* MAIN SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20 relative"
        >
          {/* PRODUCT STYLE BADGE */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: isDark
                ? "rgba(171,196,255,0.12)"
                : "rgba(255,255,255,0.7)",
              border: colors.cardBorder,
              backdropFilter: "blur(10px)",
            }}
          >
            <Sparkles
              className="w-4 h-4"
              style={{ color: colors.accentColor }}
            />

            <span
              className="text-sm font-medium"
              style={{ color: colors.textSecondary }}
            >
              Voice-Powered Comfort
            </span>
          </div>

          <h1
            className="font-serif font-light leading-[1.05] tracking-tight mb-6"
            style={{
              fontSize: "clamp(48px, 8vw, 96px)",
              color: colors.textPrimary,
            }}
          >
            Voice that{" "}
            <span
              className="font-bold italic"
              style={{ color: colors.accentColor }}
            >
              stays
            </span>
            <br />
            with you
          </h1>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light italic"
            style={{ color: colors.textTertiary }}
          >
            "Keep their voice close to your heart. Safely clone a loved one's
            voice for therapeutic support during grief."
          </p>

          {/* SOOTHING VOICE VISUALS */}
          <div className="relative mt-20 flex items-center justify-center">
            {/* LEFT AUDIO WAVE */}
            <motion.div
              animate={{
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="hidden lg:flex absolute left-10 items-center gap-1"
            >
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-[3px] rounded-full"
                  style={{
                    height: `${Math.random() * 45 + 15}px`,
                    background: colors.accentColor,
                    opacity: 0.4,
                  }}
                  animate={{
                    height: [
                      Math.random() * 45 + 15,
                      Math.random() * 60 + 20,
                      Math.random() * 45 + 15,
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.05,
                  }}
                />
              ))}
            </motion.div>

            {/* CENTER MIC */}
            <motion.div
              animate={{
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="relative"
            >
              <div
                className="w-40 h-40 rounded-full flex items-center justify-center"
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(255,255,255,0.7)",
                  border: colors.cardBorder,
                  backdropFilter: "blur(20px)",
                }}
              >
                <div
                  className="w-28 h-28 rounded-full flex items-center justify-center"
                  style={{
                    background: isDark
                      ? "rgba(171,196,255,0.08)"
                      : "rgba(255,255,255,0.85)",
                    border: colors.cardBorder,
                  }}
                >
                  <Mic
                    className="w-10 h-10"
                    style={{ color: colors.accentColor }}
                  />
                </div>
              </div>

              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  border: `1px solid ${colors.accentColor}`,
                  opacity: 0.15,
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block absolute right-0 top-8"
            >
              <div
                className="w-[280px] rounded-3xl p-6 text-left"
                style={{
                  background: colors.cardBg,
                  border: colors.cardBorder,
                  backdropFilter: "blur(18px)",
                }}
              >
                <p
                  className="text-xs mb-2 font-light"
                  style={{ color: colors.textTertiary }}
                >
                  A gentle memory
                </p>

                <h3
                  className="text-2xl font-light leading-snug mb-3"
                  style={{ color: colors.textPrimary }}
                >
                  A Voice
                  <br />
                  <span
                    className="font-serif italic"
                    style={{ color: colors.accentColor }}
                  >
                    Full Of Comfort
                  </span>
                </h3>

                <p
                  className="text-sm leading-relaxed font-light"
                  style={{ color: colors.textTertiary }}
                >
                  Hear familiar warmth again through safe, thoughtful, and
                  therapeutic voice support.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="mb-8">
          <div
            className="flex gap-2 border-b"
            style={{
              borderColor: isDark
                ? "rgba(200,220,255,0.15)"
                : "rgba(171,196,255,0.25)",
            }}
          >
            <button
              onClick={() => setActiveTab("my-clones")}
              className={`px-8 py-4 text-base font-medium transition-all duration-300 ${
                activeTab === "my-clones" ? "border-b-2" : "opacity-60"
              }`}
              style={{
                borderColor:
                  activeTab === "my-clones"
                    ? colors.accentColor
                    : "transparent",
                color:
                  activeTab === "my-clones"
                    ? colors.accentColor
                    : colors.textSecondary,
              }}
            >
              My Voice Clones
            </button>
            <button
              onClick={() => setActiveTab("new-clone")}
              className={`px-8 py-4 text-base font-medium transition-all duration-300 ${
                activeTab === "new-clone" ? "border-b-2" : "opacity-60"
              }`}
              style={{
                borderColor:
                  activeTab === "new-clone"
                    ? colors.accentColor
                    : "transparent",
                color:
                  activeTab === "new-clone"
                    ? colors.accentColor
                    : colors.textSecondary,
              }}
            >
              Request New Clone
            </button>
          </div>
        </div>

        {activeTab === "my-clones" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {voiceClones.length === 0 ? (
              <div
                className="rounded-2xl p-12 text-center"
                style={{
                  background: colors.cardBg,
                  border: colors.cardBorder,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: isDark
                      ? "rgba(171,196,255,0.1)"
                      : "rgba(171,196,255,0.15)",
                  }}
                >
                  <Mic
                    className="w-10 h-10"
                    style={{ color: colors.textTertiary }}
                  />
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: colors.textPrimary }}
                >
                  No voice clones yet
                </h3>
                <p className="mb-4" style={{ color: colors.textTertiary }}>
                  Create your first voice clone to start your healing journey.
                </p>
                <button
                  onClick={() => setActiveTab("new-clone")}
                  className="px-6 py-2.5 rounded-full font-medium transition-all duration-300"
                  style={{
                    background: colors.buttonGradient,
                    color: isDark ? "#0f172a" : "#ffffff",
                  }}
                >
                  Create Your First Clone
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {voiceClones.map((clone, index) => (
                  <motion.div
                    key={clone.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="rounded-2xl overflow-hidden transition-all duration-300"
                    style={{
                      background: colors.cardBg,
                      border: colors.cardBorder,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3
                            className="font-semibold text-xl"
                            style={{ color: colors.textPrimary }}
                          >
                            {clone.name}
                          </h3>
                          <p
                            className="text-sm"
                            style={{ color: colors.textTertiary }}
                          >
                            {clone.relation}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            clone.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {clone.status === "active" ? "Active" : "Expired"}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span style={{ color: colors.textTertiary }}>
                            Created
                          </span>
                          <span style={{ color: colors.textPrimary }}>
                            {clone.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span style={{ color: colors.textTertiary }}>
                            Expires
                          </span>
                          <span
                            style={{ color: isDark ? "#ef4444" : "#dc2626" }}
                          >
                            {clone.expiresAt.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span style={{ color: colors.textTertiary }}>
                            Therapy sessions
                          </span>
                          <span style={{ color: colors.textPrimary }}>
                            {clone.sessionsUsed} uses
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                          style={{
                            background: isDark
                              ? "rgba(171,196,255,0.1)"
                              : "rgba(171,196,255,0.15)",
                            color: colors.textPrimary,
                          }}
                        >
                          <Play className="w-4 h-4 inline mr-1" /> Preview
                        </button>
                        <button
                          className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                          style={{
                            background: isDark
                              ? "rgba(239,68,68,0.15)"
                              : "rgba(239,68,68,0.1)",
                            color: "#ef4444",
                          }}
                          onClick={() => handleDeleteClone(clone.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div
                      className="px-6 py-3 border-t"
                      style={{
                        borderColor: isDark
                          ? "rgba(200,220,255,0.1)"
                          : "rgba(171,196,255,0.15)",
                        background: isDark
                          ? "rgba(0,0,0,0.2)"
                          : "rgba(0,0,0,0.02)",
                      }}
                    >
                      <p
                        className="text-xs"
                        style={{ color: colors.textTertiary }}
                      >
                        ⚠️ Clone will be automatically deleted on{" "}
                        {clone.expiresAt.toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "new-clone" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: colors.cardBg,
              border: colors.cardBorder,
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="p-6 md:p-8">
              <div className="max-w-2xl mx-auto">
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ color: colors.textPrimary }}
                >
                  Create a Voice Clone
                </h2>
                <p className="mb-6" style={{ color: colors.textTertiary }}>
                  Follow the steps below to request a voice clone. The 24-hour
                  cooling period ensures ethical use and gives you time to
                  reflect.
                </p>

                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-white"
                      style={{ background: colors.buttonGradient }}
                    >
                      1
                    </div>
                    <h3
                      className="font-semibold text-lg"
                      style={{ color: colors.textPrimary }}
                    >
                      Who are you cloning?
                    </h3>
                  </div>
                  <div className="space-y-4 ml-11">
                    <input
                      type="text"
                      placeholder="Name (e.g., Ammi Jan, Abbu)"
                      className="w-full p-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2"
                      style={{
                        background: colors.inputBg,
                        border: colors.inputBorder,
                        color: colors.textPrimary,
                      }}
                      value={cloneName}
                      onChange={(e) => setCloneName(e.target.value)}
                    />
                    <select
                      className="w-full p-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2"
                      style={{
                        background: colors.inputBg,
                        border: colors.inputBorder,
                        color: colors.textPrimary,
                      }}
                      value={selectedRelation}
                      onChange={(e) => setSelectedRelation(e.target.value)}
                    >
                      <option value="">Select relationship</option>
                      <option value="Mother">Mother</option>
                      <option value="Father">Father</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Child">Child</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Grandparent">Grandparent</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                {/* AUDIO UPLOAD SECTION PUT DATABASE API HERE */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-white"
                      style={{ background: colors.buttonGradient }}
                    >
                      2
                    </div>
                    <h3
                      className="font-semibold text-lg"
                      style={{ color: colors.textPrimary }}
                    >
                      Upload Voice Samples
                    </h3>
                  </div>
                  <div className="ml-11">
                    <label
                      className="border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer block"
                      style={{
                        borderColor: isDark
                          ? "rgba(171,196,255,0.3)"
                          : "rgba(171,196,255,0.4)",
                        background: isDark
                          ? "rgba(171,196,255,0.05)"
                          : "rgba(171,196,255,0.03)",
                      }}
                    >
                      <input
                        type="file"
                        accept="audio/*"
                        multiple
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <Upload
                        className="w-8 h-8 mx-auto mb-3"
                        style={{ color: colors.textTertiary }}
                      />
                      <p
                        className="mb-2"
                        style={{ color: colors.textSecondary }}
                      >
                        Upload 30-60 seconds of clear speech
                      </p>
                      <p
                        className="text-sm mb-4"
                        style={{ color: colors.textTertiary }}
                      >
                        MP3, WAV, or M4A format. No background noise.
                      </p>
                      <span
                        className="px-4 py-2 rounded-lg text-sm font-medium inline-block transition-all duration-300"
                        style={{
                          background: isDark
                            ? "rgba(171,196,255,0.15)"
                            : "rgba(171,196,255,0.2)",
                          color: colors.textPrimary,
                        }}
                      >
                        Choose File
                      </span>
                    </label>
                    {uploadedAudio.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {uploadedAudio.map((file, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-3 rounded-lg"
                            style={{
                              background: isDark
                                ? "rgba(171,196,255,0.05)"
                                : "rgba(171,196,255,0.08)",
                            }}
                          >
                            <span
                              className="text-sm"
                              style={{ color: colors.textPrimary }}
                            >
                              {file.name}
                            </span>
                            <CheckCircle
                              className="w-4 h-4"
                              style={{ color: "#22c55e" }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    <p
                      className="text-xs mt-2"
                      style={{ color: colors.textTertiary }}
                    >
                      Requirements: Clear speech, single speaker, no background
                      music
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-white"
                      style={{ background: colors.buttonGradient }}
                    >
                      3
                    </div>
                    <h3
                      className="font-semibold text-lg"
                      style={{ color: colors.textPrimary }}
                    >
                      Record Your Legal Consent
                    </h3>
                  </div>
                  <div className="ml-11">
                    <div
                      className="p-4 rounded-lg mb-4"
                      style={{
                        background: isDark
                          ? "rgba(171,196,255,0.05)"
                          : "rgba(171,196,255,0.08)",
                      }}
                    >
                      <p
                        className="text-sm mb-2"
                        style={{ color: colors.textSecondary }}
                      >
                        You must record yourself saying:
                      </p>
                      <p
                        className="text-sm font-mono p-3 rounded border"
                        style={{
                          background: colors.inputBg,
                          border: colors.inputBorder,
                          color: colors.textPrimary,
                        }}
                      >
                        "I, [Your Name], give my legal consent to clone the
                        voice of {cloneName || "[Name]"}
                        for therapeutic purposes only. I understand this clone
                        will be deleted after 30 days and misuse is punishable
                        under Pakistani law."
                      </p>
                    </div>

                    <button
                      className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                        isRecording ? "bg-red-600 hover:bg-red-700" : ""
                      }`}
                      style={{
                        background: !isRecording
                          ? colors.buttonGradient
                          : "#dc2626",
                        color: "#ffffff",
                      }}
                      onClick={handleRecordConsent}
                    >
                      {isRecording ? (
                        <>
                          <Mic className="w-4 h-4 animate-pulse" /> Recording...
                          Click to Stop
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4" /> Start Recording Consent
                        </>
                      )}
                    </button>

                    {consentAudio && (
                      <div
                        className="mt-3 p-3 rounded-lg flex items-center gap-2"
                        style={{ background: "rgba(34,197,94,0.1)" }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span
                          className="text-sm"
                          style={{ color: colors.textSecondary }}
                        >
                          Consent recorded successfully
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-white"
                      style={{ background: colors.buttonGradient }}
                    >
                      4
                    </div>
                    <h3
                      className="font-semibold text-lg"
                      style={{ color: colors.textPrimary }}
                    >
                      Accept Terms
                    </h3>
                  </div>
                  <div className="ml-11 space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-1"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                      />
                      <span
                        className="text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        I confirm I have legal authority to clone this voice
                        (either my own, a deceased family member, or with
                        explicit consent from the person)
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-1"
                        checked={agreedToSecondTerm}
                        onChange={(e) =>
                          setAgreedToSecondTerm(e.target.checked)
                        }
                      />
                      <span
                        className="text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        I understand this voice clone is for therapeutic/grief
                        support only and will not be used for impersonation or
                        fraud
                      </span>
                    </label>
                  </div>
                </div>

                <div
                  className="border-t pt-6 mt-6"
                  style={{ borderColor: colors.cardBorder }}
                >
                  {isCoolingActive && timeRemaining ? (
                    <div
                      className="rounded-lg p-4 text-center"
                      style={{
                        background: isDark
                          ? "rgba(120,137,179,0.15)"
                          : "rgba(251,191,36,0.1)",
                      }}
                    >
                      <Clock
                        className="w-8 h-8 mx-auto mb-2"
                        style={{ color: colors.accentColor }}
                      />
                      <p
                        className="font-semibold"
                        style={{ color: colors.textPrimary }}
                      >
                        Cooling Period Active
                      </p>
                      <p
                        className="text-2xl font-bold my-2"
                        style={{ color: colors.accentColor }}
                      >
                        {String(timeRemaining.hours).padStart(2, "0")}:
                        {String(timeRemaining.minutes).padStart(2, "0")}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: colors.textTertiary }}
                      >
                        Your voice clone will be available after the 24-hour
                        cooling period. This helps ensure thoughtful,
                        consent-driven use.
                      </p>
                    </div>
                  ) : (
                    <button
                      className="w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-[1.02]"
                      style={{
                        background: colors.buttonGradient,
                        color: isDark ? "#0f172a" : "#ffffff",
                        opacity:
                          !cloneName ||
                          !selectedRelation ||
                          uploadedAudio.length === 0 ||
                          !consentAudio ||
                          !agreedToTerms ||
                          !agreedToSecondTerm
                            ? 0.6
                            : 1,
                        cursor:
                          !cloneName ||
                          !selectedRelation ||
                          uploadedAudio.length === 0 ||
                          !consentAudio ||
                          !agreedToTerms ||
                          !agreedToSecondTerm
                            ? "not-allowed"
                            : "pointer",
                      }}
                      onClick={handleRequestClone}
                      disabled={
                        !cloneName ||
                        !selectedRelation ||
                        uploadedAudio.length === 0 ||
                        !consentAudio ||
                        !agreedToTerms ||
                        !agreedToSecondTerm
                      }
                    >
                      Request Voice Clone (24hr Cooling Period Starts Now)
                    </button>
                  )}

                  {(!cloneName ||
                    !selectedRelation ||
                    uploadedAudio.length === 0 ||
                    !consentAudio ||
                    !agreedToTerms ||
                    !agreedToSecondTerm) && (
                    <p
                      className="text-sm text-center mt-3"
                      style={{ color: isDark ? "#f87171" : "#dc2626" }}
                    >
                      Please complete all steps above to request a voice clone
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div
            className="rounded-lg p-4 max-w-2xl mx-auto"
            style={{
              background: isDark
                ? "rgba(239,68,68,0.1)"
                : "rgba(239,68,68,0.05)",
              border: `1px solid ${isDark ? "rgba(239,68,68,0.2)" : "rgba(239,68,68,0.2)"}`,
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertTriangle
                className="w-5 h-5"
                style={{ color: isDark ? "#f87171" : "#dc2626" }}
              />
              <span
                className="font-semibold"
                style={{ color: isDark ? "#f87171" : "#dc2626" }}
              >
                Legal Notice
              </span>
            </div>
            <p
              className="text-sm"
              style={{ color: isDark ? "#fca5a5" : "#991b1b" }}
            >
              Misuse of voice cloning technology for fraud, harassment, or
              impersonation is a criminal offense under Pakistan's PECA Act
              2016. All activities are monitored and logged.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
