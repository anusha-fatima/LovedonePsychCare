"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  PenLine,
  Mail,
  Brain,
  Shield,
  Paperclip,
  Book,
  Upload,
  Sun,
  Moon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  resources?: { type: string; title: string; icon: React.ReactNode }[];
}

const suggestedPrompts = [
  "I'm feeling anxious about work",
  "Help me understand my emotions",
  "I need someone to talk to",
  "Tips for better sleep",
  "Managing family expectations",
];

const promptCards = [
  {
    icon: PenLine,
    label: "I'm feeling anxious",
    sub: "and need to talk it through",
  },
  { icon: Mail, label: "Help me understand", sub: "my emotions better" },
  { icon: Brain, label: "Tips for managing", sub: "stress and overthinking" },
];

const workspaceTools = [
  {
    id: "mood-tracker",
    label: "Mood Tracker",
    icon: Sparkles,
    description: "Track your daily emotions",
  },
  {
    id: "prescription-log",
    label: "Prescription Log",
    icon: Book,
    description: "Manage your medications",
  },
  {
    id: "meditation",
    label: "Meditation Guides",
    icon: Brain,
    description: "Guided calming sessions",
  },
];

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Assalam-o-Alaikum. I'm here to listen and support you. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [language, setLanguage] = useState<"en" | "ur">("en");
  const [hasUserSent, setHasUserSent] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTools, setActiveTools] = useState<string[]>([]);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    window.addEventListener("themeChange", checkDarkMode);
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });
    return () => {
      window.removeEventListener("themeChange", checkDarkMode);
      observer.disconnect();
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (hasUserSent || isTyping) {
      scrollToBottom();
    }
  }, [messages, hasUserSent, isTyping]);

  const handleSend = (text?: string) => {
    const msg = text ?? input;
    if (!msg.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: msg,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setHasUserSent(true);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I hear you, and it's completely valid to feel this way. Let's explore what might be triggering this. Would you like to try a grounding exercise?",
        sender: "ai",
        timestamp: new Date(),
        resources: [
          {
            type: "meditation",
            title: "5-Min Grounding",
            icon: <Brain className="w-4 h-4" />,
          },
        ],
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      document.body.style.background =
        "linear-gradient(180deg, rgb(15,23,42) 0%, rgb(30,41,59) 100%)";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.background =
        "linear-gradient(135deg, rgb(171,196,255) 0%, rgb(182,204,254) 50%, rgb(193,211,254) 100%)";
    }
    window.dispatchEvent(new CustomEvent("themeChange"));
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
    userBubble: "linear-gradient(135deg, rgb(120,137,179), rgb(100,115,155))",
    aiBubble: "rgba(255,255,255,0.7)",
    headerBg: "rgba(255,255,255,0.6)",
    sidebarBg: "rgba(255,255,255,0.3)",
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
    userBubble: "linear-gradient(135deg, rgb(171,196,255), rgb(193,211,254))",
    aiBubble: "rgba(255,255,255,0.08)",
    headerBg: "rgba(15,23,42,0.8)",
    sidebarBg: "rgba(15,23,42,0.4)",
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ background: colors.bgGradient }}
    >
      <div
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20"
        style={{ background: colors.accentColor }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20"
        style={{ background: colors.accentColor }}
      />

      <header
        className="h-16 flex items-center justify-between px-6 border-b backdrop-blur-md z-10 shrink-0"
        style={{
          background: colors.headerBg,
          borderColor: isDark
            ? "rgba(200,220,255,0.1)"
            : "rgba(171,196,255,0.2)",
        }}
      >
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full transition-all duration-300 flex items-center gap-2"
              style={{
                background: colors.cardBg,
                border: colors.cardBorder,
                color: colors.textPrimary,
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Back</span>
            </motion.button>
          </Link>

          <div className="h-6 w-px" style={{ background: colors.cardBorder }} />

          <Link href="/" className="flex-shrink-0 group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative w-28 h-14 md:w-32 md:h-16"
            >
              <Image
                src="/logo.png"
                alt="LovedOne PsyCare Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-all duration-300"
            style={{
              background: colors.cardBg,
              border: colors.cardBorder,
              color: colors.textPrimary,
            }}
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => setLanguage(language === "en" ? "ur" : "en")}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300"
            style={{
              background: colors.cardBg,
              border: colors.cardBorder,
              color: colors.textPrimary,
            }}
          >
            {language === "en" ? "اردو" : "English"}
          </button>

          <div
            className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden"
            style={{
              background: colors.cardBg,
              border: colors.cardBorder,
            }}
          >
            <User className="w-4 h-4" style={{ color: colors.textPrimary }} />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className="hidden lg:flex flex-col w-72 border-r backdrop-blur-sm overflow-y-auto shrink-0"
          style={{
            background: colors.sidebarBg,
            borderColor: colors.cardBorder,
          }}
        >
          <div className="p-6 space-y-6">
            <div>
              <p
                className="text-[10px] uppercase tracking-widest font-bold mb-4"
                style={{ color: colors.textTertiary }}
              >
                Quick Insights
              </p>
              <div className="space-y-2">
                {suggestedPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(p)}
                    className="w-full text-left p-3 rounded-xl text-xs transition-all duration-300 hover:translate-x-1"
                    style={{
                      color: colors.textSecondary,
                      background: isDark
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(171,196,255,0.08)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = isDark
                        ? "rgba(171,196,255,0.1)"
                        : "rgba(171,196,255,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = isDark
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(171,196,255,0.08)";
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="pt-4 border-t"
              style={{ borderColor: colors.cardBorder }}
            >
              <p
                className="text-[10px] uppercase tracking-widest font-bold mb-4"
                style={{ color: colors.textTertiary }}
              >
                Wellness Workspace
              </p>
              <div className="space-y-2">
                {workspaceTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      className="w-full text-left p-3 rounded-xl transition-all duration-300 group"
                      style={{
                        background: activeTools.includes(tool.id)
                          ? colors.buttonGradient
                          : isDark
                            ? "rgba(255,255,255,0.03)"
                            : "rgba(171,196,255,0.08)",
                      }}
                      onClick={() => {
                        if (activeTools.includes(tool.id)) {
                          setActiveTools(
                            activeTools.filter((t) => t !== tool.id),
                          );
                        } else {
                          setActiveTools([...activeTools, tool.id]);
                        }
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className="w-4 h-4"
                          style={{
                            color: activeTools.includes(tool.id)
                              ? isDark
                                ? "#0f172a"
                                : "#fff"
                              : colors.accentColor,
                          }}
                        />
                        <div>
                          <p
                            className="text-xs font-medium"
                            style={{
                              color: activeTools.includes(tool.id)
                                ? isDark
                                  ? "#0f172a"
                                  : "#fff"
                                : colors.textPrimary,
                            }}
                          >
                            {tool.label}
                          </p>
                          <p
                            className="text-[10px]"
                            style={{
                              color: activeTools.includes(tool.id)
                                ? isDark
                                  ? "rgba(15,23,42,0.7)"
                                  : "rgba(255,255,255,0.7)"
                                : colors.textTertiary,
                            }}
                          >
                            {tool.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              className="pt-4 border-t"
              style={{ borderColor: colors.cardBorder }}
            >
              <button
                className="w-full p-3 rounded-xl flex items-center gap-3 transition-all duration-300 hover:translate-x-1"
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(171,196,255,0.08)",
                }}
              >
                <Upload
                  className="w-4 h-4"
                  style={{ color: colors.accentColor }}
                />
                <div className="text-left">
                  <p
                    className="text-xs font-medium"
                    style={{ color: colors.textPrimary }}
                  >
                    Share Prescription
                  </p>
                  <p
                    className="text-[10px]"
                    style={{ color: colors.textTertiary }}
                  >
                    Upload securely for review
                  </p>
                </div>
              </button>
            </div>
          </div>
        </aside>
        {/* MAIN CHAT BOX */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="text-center pt-6 pb-2 shrink-0">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-3 backdrop-blur-md"
              style={{
                background: colors.cardBg,
                border: colors.cardBorder,
              }}
            >
              <Sparkles
                className="w-4 h-4"
                style={{ color: colors.accentColor }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: colors.textSecondary }}
              >
                AI-Powered Support
              </span>
            </div>
            <h2
              className="text-2xl md:text-3xl font-light tracking-tight"
              style={{ color: colors.textPrimary }}
            >
              Your Safe Space to
              <span
                className="block font-semibold"
                style={{ color: colors.accentColor }}
              >
                Speak Freely
              </span>
            </h2>
            <p className="text-xs mt-1" style={{ color: colors.textTertiary }}>
              Every conversation is confidential and encrypted
            </p>
          </div>

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-4 py-4"
          >
            <div className="max-w-3xl mx-auto space-y-6">
              <AnimatePresence mode="wait">
                {!hasUserSent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center text-center pt-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                      {promptCards.map((card, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ y: -5 }}
                          onClick={() =>
                            handleSend(card.label + " " + card.sub)
                          }
                          className="p-4 rounded-2xl text-left flex flex-col gap-2 transition-all duration-300"
                          style={{
                            background: colors.cardBg,
                            border: colors.cardBorder,
                          }}
                        >
                          <card.icon
                            className="w-5 h-5"
                            style={{ color: colors.accentColor }}
                          />
                          <div>
                            <p
                              className="font-bold text-sm"
                              style={{ color: colors.textPrimary }}
                            >
                              {card.label}
                            </p>
                            <p
                              className="text-xs"
                              style={{ color: colors.textTertiary }}
                            >
                              {card.sub}
                            </p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex gap-3 max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                        >
                          <div
                            className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center"
                            style={{
                              background:
                                msg.sender === "user"
                                  ? colors.buttonGradient
                                  : colors.cardBg,
                              border: colors.cardBorder,
                            }}
                          >
                            {msg.sender === "user" ? (
                              <User
                                className="w-4 h-4"
                                style={{ color: "#fff" }}
                              />
                            ) : (
                              <Sparkles
                                className="w-4 h-4"
                                style={{ color: colors.accentColor }}
                              />
                            )}
                          </div>
                          <div
                            className="p-4 rounded-2xl text-sm leading-relaxed"
                            style={{
                              background:
                                msg.sender === "user"
                                  ? colors.userBubble
                                  : colors.aiBubble,
                              color:
                                msg.sender === "user"
                                  ? "#fff"
                                  : colors.textPrimary,
                              borderRadius:
                                msg.sender === "user"
                                  ? "1rem 1rem 0.25rem 1rem"
                                  : "1rem 1rem 1rem 0.25rem",
                            }}
                          >
                            {msg.text}
                            {msg.resources && (
                              <div
                                className="mt-3 pt-2 border-t"
                                style={{ borderColor: "rgba(0,0,0,0.1)" }}
                              >
                                <p className="text-xs opacity-70 mb-2">
                                  Recommended for you:
                                </p>
                                <div className="flex gap-2">
                                  {msg.resources.map((res, i) => (
                                    <button
                                      key={i}
                                      className="text-xs px-3 py-1 rounded-full flex items-center gap-1"
                                      style={{
                                        background: "rgba(120,137,179,0.15)",
                                      }}
                                    >
                                      {res.icon}
                                      {res.title}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{
                            background: colors.cardBg,
                            border: colors.cardBorder,
                          }}
                        >
                          <Sparkles
                            className="w-4 h-4"
                            style={{ color: colors.accentColor }}
                          />
                        </div>
                        <div
                          className="p-4 rounded-2xl flex gap-1"
                          style={{
                            background: colors.aiBubble,
                            border: colors.cardBorder,
                          }}
                        >
                          <span
                            className="w-2 h-2 rounded-full animate-bounce"
                            style={{ background: colors.accentColor }}
                          />
                          <span
                            className="w-2 h-2 rounded-full animate-bounce [animation-delay:0.2s]"
                            style={{ background: colors.accentColor }}
                          />
                          <span
                            className="w-2 h-2 rounded-full animate-bounce [animation-delay:0.4s]"
                            style={{ background: colors.accentColor }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-6 shrink-0">
            <div
              className="max-w-3xl mx-auto rounded-2xl backdrop-blur-xl p-2 flex items-center gap-2 shadow-2xl"
              style={{
                background: colors.cardBg,
                border: colors.cardBorder,
              }}
            >
              <button
                className="p-3 rounded-xl transition-colors"
                style={{ color: colors.textTertiary }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = isDark
                    ? "rgba(171,196,255,0.1)"
                    : "rgba(171,196,255,0.15)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "transparent")
                }
              >
                <Paperclip className="w-5 h-5" />
              </button>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Share what's on your mind..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm outline-none"
                style={{ color: colors.textPrimary }}
              />

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="p-3 rounded-xl transition-all disabled:opacity-40"
                style={{
                  background: input.trim()
                    ? colors.buttonGradient
                    : isDark
                      ? "rgba(171,196,255,0.1)"
                      : "rgba(171,196,255,0.2)",
                }}
              >
                <ArrowRight
                  className="w-5 h-5"
                  style={{ color: input.trim() ? "#fff" : colors.textTertiary }}
                />
              </motion.button>
            </div>
            <p
              className="text-center text-[10px] mt-3 font-medium"
              style={{ color: colors.textTertiary }}
            >
              <Shield className="w-3 h-3 inline mr-1" />
              Privacy First: AI can make mistakes. Consider checking important
              info.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
