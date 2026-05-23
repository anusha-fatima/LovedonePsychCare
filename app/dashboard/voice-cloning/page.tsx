"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mic,
  Upload,
  Trash2,
  Play,
  Pause,
  Clock,
  Shield,
  CheckCircle,
  Plus,
  LogOut,
  Home,
  Settings,
  MessageCircle,
  User,
  ShieldCheck,
} from "lucide-react";

interface VoiceClone {
  id: string;
  name: string;
  relation: string;
  createdAt: Date;
  expiresAt: Date;
  sessionsUsed: number;
  status: "active" | "pending" | "expired";
  audioFile?: string;
}

interface VoiceCloneRequest {
  id: string;
  name: string;
  relation: string;
  audioFileName: string;
  requestedAt: Date;
  status: "pending" | "approved" | "rejected";
}

// Hardcoded initial data kept safe outside or handled if localStorage is empty
const INITIAL_CLONES: VoiceClone[] = [
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
];

export default function VoiceCloningPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("my-clones");
  const [isRecording, setIsRecording] = useState(false);
  const [cloneName, setCloneName] = useState("");
  const [selectedRelation, setSelectedRelation] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [playingCloneId, setPlayingCloneId] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const [newApprovalBadge, setNewApprovalBadge] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Initialize with initial clones; hydration fallback handled in useEffect
  const [voiceClones, setVoiceClones] = useState<VoiceClone[]>(INITIAL_CLONES);
  const [pendingRequests, setPendingRequests] = useState<VoiceCloneRequest[]>([]);

  const accountName = "Ayesha Demo";
  const accountEmail = "demo@lopc.com";
  const avatarHue = 280;

  // Show notification
  const showNotification = (type: "success" | "error" | "info", text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 4000);
  };

  // Check for approvals function
  const checkForApprovals = useCallback(() => {
    const savedRequests = localStorage.getItem("voiceCloneRequests");
    if (!savedRequests) return;
    
    const currentRequests = JSON.parse(savedRequests).map((req: any) => ({
      ...req,
      requestedAt: new Date(req.requestedAt),
    }));
    
    // Sync current requests state
    setPendingRequests(currentRequests);
    
    const approved = currentRequests.filter((req: VoiceCloneRequest) => req.status === "approved");
    const rejected = currentRequests.filter((req: VoiceCloneRequest) => req.status === "rejected");
    
    if (approved.length > 0) {
    const newClones: VoiceClone[] = approved.map((req: VoiceCloneRequest) => ({
        id: req.id,
        name: req.name,
        relation: req.relation,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        sessionsUsed: 0,
        status: "active",
      }));
      
      setVoiceClones((prev) => {
        const existingIds = new Set(prev.map(c => c.id));
        const uniqueNewClones = newClones.filter(c => !existingIds.has(c.id));
        const updated = [...prev, ...uniqueNewClones];
        
        // Save to localStorage so it persists safely
        localStorage.setItem("userVoiceClones", JSON.stringify(updated.map(c => ({
          ...c,
          createdAt: c.createdAt.toISOString(),
          expiresAt: c.expiresAt.toISOString(),
        }))));
        
        return updated;
      });
      
      // Clean up requests: Remove approved requests completely out of the pipeline
      const approvedIds = new Set(approved.map(r => r.id));
      const remainingRequests = currentRequests.filter((req: VoiceCloneRequest) => !approvedIds.has(req.id));
      localStorage.setItem("voiceCloneRequests", JSON.stringify(remainingRequests));
      setPendingRequests(remainingRequests);
      
      // Show notification and badge
      showNotification("success", `Your voice clone${approved.length > 1 ? "s have" : " has"} been approved!`);
      setNewApprovalBadge(true);
      
      // Auto switch to My Clones tab
      if (activeTab !== "my-clones") {
        setTimeout(() => {
          setActiveTab("my-clones");
          setTimeout(() => setNewApprovalBadge(false), 3000);
        }, 2000);
      } else {
        setTimeout(() => setNewApprovalBadge(false), 4000);
      }
    }
    
    if (rejected.length > 0) {
      const rejectedIds = new Set(rejected.map(r => r.id));
      const remainingRequests = currentRequests.filter((req: VoiceCloneRequest) => !rejectedIds.has(req.id));
      localStorage.setItem("voiceCloneRequests", JSON.stringify(remainingRequests));
      setPendingRequests(remainingRequests);
      showNotification("error", "Your voice clone request was not approved. Please contact support.");
    }
  }, [activeTab]);

  // Load saved voice clones from localStorage on mount
  useEffect(() => {
    const savedClones = localStorage.getItem("userVoiceClones");
    if (savedClones) {
      const parsed = JSON.parse(savedClones);
      setVoiceClones(parsed.map((clone: any) => ({
        ...clone,
        createdAt: new Date(clone.createdAt),
        expiresAt: new Date(clone.expiresAt),
      })));
    } else {
      // If nothing exists in storage yet, save our default hardcoded items so they stick around
      localStorage.setItem("userVoiceClones", JSON.stringify(INITIAL_CLONES));
    }
    
    const savedRequests = localStorage.getItem("voiceCloneRequests");
    if (savedRequests) {
      const parsed = JSON.parse(savedRequests);
      setPendingRequests(parsed.map((req: any) => ({
        ...req,
        requestedAt: new Date(req.requestedAt),
      })));
    }
  }, []);

  // Listen for storage changes (when admin approves from another tab/window)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "voiceCloneRequests") {
        setTimeout(() => checkForApprovals(), 100);
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [checkForApprovals]);

  // Check for approvals periodically (every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      checkForApprovals();
    }, 5000);
    return () => clearInterval(interval);
  }, [checkForApprovals]);

  // Check when tab changes to my-clones
  useEffect(() => {
    if (activeTab === "my-clones") {
      checkForApprovals();
    }
  }, [activeTab, checkForApprovals]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("audio")) {
      setUploadMessage({ type: "error", text: "Please upload an audio file (MP3, WAV, M4A)" });
      setTimeout(() => setUploadMessage(null), 3000);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadMessage({ type: "error", text: "File too large. Maximum size is 10MB" });
      setTimeout(() => setUploadMessage(null), 3000);
      return;
    }

    setUploadedFile(file);
    setUploadMessage({ type: "success", text: `File "${file.name}" uploaded successfully!` });
    setTimeout(() => setUploadMessage(null), 3000);
  };

  const handleRequestClone = () => {
    if (!uploadedFile) {
      setUploadMessage({ type: "error", text: "Please upload an audio file first" });
      setTimeout(() => setUploadMessage(null), 3000);
      return;
    }

    if (!cloneName || !selectedRelation || !agreedToTerms) {
      setUploadMessage({ type: "error", text: "Please fill in all fields and accept terms" });
      setTimeout(() => setUploadMessage(null), 3000);
      return;
    }

    const newRequest: VoiceCloneRequest = {
      id: Date.now().toString(),
      name: cloneName,
      relation: selectedRelation,
      audioFileName: uploadedFile.name,
      requestedAt: new Date(),
      status: "pending",
    };

    const existingRequests = localStorage.getItem("voiceCloneRequests");
    let updatedRequests = [];
    if (existingRequests) {
      updatedRequests = [...JSON.parse(existingRequests), newRequest];
    } else {
      updatedRequests = [newRequest];
    }
    
    localStorage.setItem("voiceCloneRequests", JSON.stringify(updatedRequests));
    setPendingRequests(updatedRequests);
    
    showNotification("success", "Your request has been submitted for admin approval.");
    
    setCloneName("");
    setSelectedRelation("");
    setAgreedToTerms(false);
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDeleteClone = (id: string) => {
    const updated = voiceClones.filter((clone) => clone.id !== id);
    setVoiceClones(updated);
    localStorage.setItem("userVoiceClones", JSON.stringify(updated.map(c => ({
      ...c,
      createdAt: c.createdAt.toISOString(),
      expiresAt: c.expiresAt.toISOString(),
    }))));
    showNotification("info", "Voice clone deleted successfully.");
  };

  const handlePlayPreview = (id: string) => {
    setPlayingCloneId(playingCloneId === id ? null : id);
  };

  const waitingForApproval = pendingRequests.filter(req => req.status === "pending").length;

  return (
    <div className="h-screen flex flex-col bg-canvas">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
          <div className={`rounded-2xl px-4 py-3 shadow-lg flex items-center gap-2 ${
            notification.type === "success" ? "bg-green-600 text-white" :
            notification.type === "error" ? "bg-red-600 text-white" :
            "bg-blue-600 text-white"
          }`}>
            {notification.type === "success" && <CheckCircle className="h-4 w-4" />}
            {notification.type === "error" && <Shield className="h-4 w-4" />}
            {notification.type === "info" && <Clock className="h-4 w-4" />}
            <span className="text-sm font-medium">{notification.text}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-ink-900/5 bg-white">
        <div className="container-page h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="btn-ghost px-2 py-2" aria-label="Home">
              <Home className="h-4 w-4" />
            </Link>
            <div>
              <p className="text-sm font-semibold text-ink-900 leading-tight font-display">
                Voice Cloning
              </p>
              <p className="text-xs text-midnight-700 font-sans">
                Grief support through loved ones' voices
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/dashboard")}
              className="btn btn-secondary h-9 px-4 text-xs font-sans"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Chat</span>
            </button>
            <button
              onClick={() => router.push("/")}
              className="btn-ghost h-9 px-3 text-xs font-sans"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex container-page py-4 gap-4 overflow-hidden">
        
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-72 shrink-0">
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-full grid place-items-center text-white font-semibold"
                style={{ background: `hsl(${avatarHue},45%,55%)` }}
              >
                {accountName.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-ink-900 font-display">
                  {accountName}
                </p>
                <p className="text-xs text-ink-400 font-sans">{accountEmail}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-xs text-ink-500 font-sans">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-midnight-600" />
                Private to you
              </div>
              <div className="flex items-center gap-2">
                <Mic className="h-4 w-4 text-midnight-600" />
                Voice cloning active
              </div>
            </div>
          </div>

          <div className="card mt-4 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500 font-sans">
              Quick links
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <Link
                href="/dashboard"
                className="rounded-2xl border border-ink-900/5 bg-cream/50 px-3 py-2 text-sm text-ink-700 hover:border-midnight-300 font-sans"
              >
                <MessageCircle className="inline h-3.5 w-3.5 mr-1" />
                Chat with Sukoon
              </Link>
             
              <Link
                href="/psychologists"
                className="rounded-2xl border border-ink-900/5 bg-cream/50 px-3 py-2 text-sm text-ink-700 hover:border-midnight-300 font-sans"
              >
                <User className="inline h-3.5 w-3.5 mr-1" />
                Browse therapists
              </Link>
              <Link
                href="/services"
                className="rounded-2xl border border-ink-900/5 bg-cream/50 px-3 py-2 text-sm text-ink-700 hover:border-midnight-300 font-sans"
              >
                What we offer
              </Link>
              <Link
                href="/contact"
                className="rounded-2xl border border-ink-900/5 bg-cream/50 px-3 py-2 text-sm text-ink-700 hover:border-midnight-300"
              >
                <Settings className="inline h-3.5 w-3.5 mr-1" />
                Get help
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col card overflow-hidden">
          
          {/* Welcome Section */}
          <div className="border-b border-ink-900/5 bg-white px-6 py-4">
            <p className="text-xs text-midnight-600 font-semibold uppercase tracking-widest mb-1 font-sans">
              WELCOME TO LOVEDONE PSYCARE
            </p>
            <h2 className="text-lg font-semibold text-ink-900 mb-1 font-display">
              This is a safe space.
            </h2>
            <p className="text-sm text-ink-600 font-sans">
              Create voice clones of your loved ones to receive therapeutic support in their familiar voices. 
              All cloning is done with explicit legal consent and is protected by strict privacy guidelines.
            </p>
          </div>

          {/* Security Banner */}
          <div className="border-b border-ink-900/5 bg-amber-50/50 px-6 py-3">
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-amber-800 font-sans">
                  Admin approval required • Legal consent required • 30-day expiry
                </p>
              </div>
            </div>
          </div>

          {/* Tabs with visual badge for new approval */}
          <div className="border-b border-ink-900/5 bg-white px-6">
            <div className="flex gap-6">
              <button
                onClick={() => {
                  setActiveTab("my-clones");
                  setNewApprovalBadge(false);
                }}
                className={`py-3 text-sm font-medium border-b-2 transition-colors relative ${
                  activeTab === "my-clones"
                    ? "border-midnight-700 text-midnight-700"
                    : "border-transparent text-ink-400 hover:text-ink-600"
                }`}
              >
                My Voice Clones ({voiceClones.length})
                {newApprovalBadge && (
                  <span className="absolute -top-1 -right-4 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("new-clone")}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "new-clone"
                    ? "border-midnight-700 text-midnight-700"
                    : "border-transparent text-ink-400 hover:text-ink-600"
                }`}
              >
                Request New Clone
                {waitingForApproval > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 text-xs bg-amber-500 text-white rounded-full">
                    {waitingForApproval}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            
            {/* My Clones Tab */}
            {activeTab === "my-clones" && (
              <div>
                {voiceClones.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-midnight-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mic className="h-8 w-8 text-midnight-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-ink-900 mb-2 font-display">
                      No voice clones yet
                    </h3>
                    <p className="text-sm text-ink-500 mb-4 font-sans">
                      Create your first voice clone to start your healing journey.
                    </p>
                    <button
                      onClick={() => setActiveTab("new-clone")}
                      className="inline-flex items-center gap-2 rounded-2xl bg-midnight-600 text-white px-4 py-2 text-sm font-medium hover:bg-midnight-700 transition font-sans"
                    >
                      <Plus className="h-4 w-4" />
                      Create Your First Clone
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {voiceClones.map((clone) => (
                      <div
                        key={clone.id}
                        className="card p-4 hover:bg-cream/30 transition"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 flex-1">
                            <div
                              className="h-10 w-10 rounded-full grid place-items-center text-white font-semibold text-sm"
                              style={{ background: `hsl(${avatarHue},45%,55%)` }}
                            >
                              {clone.name.slice(0, 1).toUpperCase()}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-ink-900 font-display">
                                {clone.name}
                              </p>
                              <p className="text-xs text-ink-500 font-sans">
                                {clone.relation} • Created {clone.createdAt.toLocaleDateString()}
                              </p>
                              <div className="flex items-center gap-2 mt-1 text-xs font-sans">
                                <span className="text-ink-400">
                                  {clone.sessionsUsed} sessions
                                </span>
                                <span className="text-ink-200">•</span>
                                <span className="text-amber-600">
                                  Expires {clone.expiresAt.toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handlePlayPreview(clone.id)}
                              className="btn-ghost h-8 w-8 p-0"
                              aria-label="Play preview"
                            >
                              {playingCloneId === clone.id ? (
                                <Pause className="h-4 w-4 text-midnight-600" />
                              ) : (
                                <Play className="h-4 w-4 text-midnight-600" />
                              )}
                            </button>
                            <button
                              onClick={() => handleDeleteClone(clone.id)}
                              className="btn-ghost h-8 w-8 p-0 text-red-500 hover:bg-red-50"
                              aria-label="Delete clone"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* New Clone Tab */}
            {activeTab === "new-clone" && (
              <div className="max-w-2xl space-y-5">
                
                {/* Step 1 */}
                <div>
                  <label className="block text-sm font-semibold text-ink-900 mb-2 font-sans">
                    Who are you cloning?
                  </label>
                  <input
                    type="text"
                    placeholder="Name (e.g., Ammi Jan, Abbu)"
                    className="w-full px-3 py-2 text-sm border border-ink-900/10 rounded-xl focus:border-midnight-400 focus:outline-none font-sans"
                    value={cloneName}
                    onChange={(e) => setCloneName(e.target.value)}
                  />
                  <select
                    className="w-full mt-3 px-3 py-2 text-sm border border-ink-900/10 rounded-xl focus:border-midnight-400 focus:outline-none font-sans"
                    value={selectedRelation}
                    onChange={(e) => setSelectedRelation(e.target.value)}
                  >
                    <option value="">Select relationship</option>
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Sibling">Sibling</option>
                  </select>
                </div>

                {/* Step 2 - Audio Upload */}
                <div>
                  <label className="block text-sm font-semibold text-ink-900 mb-2 font-sans">
                    Upload Voice Samples
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div 
                    className="border-2 border-dashed border-ink-900/10 rounded-xl p-6 text-center hover:border-midnight-300 transition cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-6 w-6 text-ink-400 mx-auto mb-2" />
                    <p className="text-xs text-ink-600 font-medium font-sans">
                      Upload 30-60 seconds of clear speech
                    </p>
                    <p className="text-xs text-ink-400 mt-1 font-sans">
                      MP3, WAV, or M4A format (max 10MB)
                    </p>
                    {uploadedFile && (
                      <p className="text-xs text-green-600 mt-2 font-sans">
                        ✓ {uploadedFile.name}
                      </p>
                    )}
                  </div>
                  {uploadMessage && (
                    <div className={`mt-2 p-2 rounded-lg text-xs font-sans ${
                      uploadMessage.type === "success" 
                        ? "bg-green-50 text-green-700 border border-green-200" 
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      {uploadMessage.text}
                    </div>
                  )}
                </div>

                {/* Step 3 */}
                <div>
                  <label className="block text-sm font-semibold text-ink-900 mb-2 font-sans">
                    Record Your Legal Consent
                  </label>
                  <div className="bg-midnight-50 rounded-xl p-3 mb-3 border border-ink-900/5">
                    <p className="text-xs text-ink-700 leading-relaxed font-sans">
                      You must record: "I, [Your Name], give my legal consent to clone 
                      the voice of {cloneName || "[Name]"} for therapeutic purposes only."
                    </p>
                  </div>
                  <button
                    className={`w-full py-2 rounded-xl text-sm font-medium transition font-sans ${
                      isRecording
                        ? "bg-red-500 text-white"
                        : "bg-midnight-600 text-white hover:bg-midnight-700"
                    }`}
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    {isRecording
                      ? "Recording... Click to Stop"
                      : "Start Recording Consent"}
                  </button>
                </div>

                {/* Step 4 */}
                <div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                    />
                    <span className="text-xs text-ink-700 font-sans">
                      I confirm I have legal authority to clone this voice and 
                      understand misuse is punishable under Pakistani law.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  className="w-full py-2 rounded-xl bg-midnight-600 text-white text-sm font-medium hover:bg-midnight-700 transition disabled:opacity-50 font-sans"
                  onClick={handleRequestClone}
                  disabled={
                    !cloneName ||
                    !selectedRelation ||
                    !uploadedFile ||
                    !agreedToTerms
                  }
                >
                  Submit for Admin Approval
                </button>
                
                <p className="text-xs text-ink-400 text-center font-sans">
                  Your request will be reviewed by an admin. You'll be notified once approved.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
