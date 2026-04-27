// app/ai-chat/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Heart,
  User,
  Sparkles,
  Mic,
  Image as ImageIcon,
  ArrowRight,
  PenLine,
  Mail,
  Brain,
  ChevronDown,
  Shield,
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const suggestedPrompts = [
  "I'm feeling anxious about work",
  "Help me understand my emotions",
  "I need someone to talk to",
  "Tips for better sleep",
  "Managing family expectations",
];

// Reference-image style prompt cards (shown before first user message)
const promptCards = [
  {
    icon: PenLine,
    label: "I'm feeling anxious",
    sub: 'and need to talk it through',
  },
  {
    icon: Mail,
    label: 'Help me understand',
    sub: 'my emotions better',
  },
  {
    icon: Brain,
    label: 'Tips for managing',
    sub: 'stress and overthinking',
  },
];

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Assalam-o-Alaikum. I'm here to listen and support you. How are you feeling today? You can speak in Urdu or English, whatever feels comfortable.",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState('');
  const [language, setLanguage] = useState<'en' | 'ur'>('en');
  const [hasUserSent, setHasUserSent] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (hasUserSent) scrollToBottom();
  }, [messages, hasUserSent]);

  const handleSend = (text?: string) => {
    const msg = text ?? input;
    if (!msg.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: msg,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setHasUserSent(true);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for sharing that with me. I understand this might be difficult. Let's explore this together. Can you tell me more about how this is affecting your daily life?",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-32 md:pt-40 flex items-center justify-center">
      {/* ── Outer card — matches reference's rounded white container ── */}
      <div
       className="w-full max-w-4xl rounded-3xl overflow-visible shadow-2xl flex flex-col mx-auto"
        style={{
          height: 'calc(100vh - 6rem)',
          background: 'rgba(237, 242, 251, 0.55)',
          backdropFilter: 'blur(28px)',
          border: '1px solid rgba(237, 242, 251, 0.55)',
        }}
      >
        {/* ── Top bar ── */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid rgba(204, 219, 253, 0.35)' }}
        >
          {/* Brand mark */}
          <div className="flex items-center space-x-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm"
              style={{
                background: 'linear-gradient(135deg, rgb(204,219,253), rgb(171,196,255))',
              }}
            >
              <Heart className="w-4 h-4" style={{ color: 'rgba(50,60,100,0.9)' }} />
            </div>
            <span
              className="text-sm font-semibold tracking-tight"
              style={{ color: 'rgba(60,70,120,0.85)' }}
            >
              AI Companion
            </span>
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-3">
            {/* Language toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
              style={{
                background: 'rgba(204, 219, 253, 0.45)',
                color: 'rgba(60,70,130,0.9)',
                border: '1px solid rgba(171,196,255,0.4)',
              }}
            >
              <span>{language === 'en' ? '🇵🇰 اردو' : '🇬🇧 English'}</span>
            </button>

            {/* User avatar placeholder */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgb(193,211,254), rgb(171,196,255))',
              }}
            >
              <User className="w-4 h-4" style={{ color: 'rgba(50,60,110,0.8)' }} />
            </div>
          </div>
        </div>

        {/* ── Main content area ── */}
        <div className="flex flex-1 overflow-hidden">

          {/* ── Sidebar (desktop) ── */}
          <div
            className="hidden md:flex flex-col w-56 shrink-0 py-5 px-4"
            style={{ borderRight: '1px solid rgba(204, 219, 253, 0.3)' }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.18em] font-semibold mb-3"
              style={{ color: 'rgba(100,120,200,0.6)' }}
            >
              Suggestions
            </p>
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => setInput(prompt)}
                className="text-left text-xs px-3 py-2.5 mb-1 rounded-xl transition-all duration-200 leading-relaxed"
                style={{ color: 'rgba(60,75,140,0.8)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(204,219,253,0.35)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                {prompt}
              </button>
            ))}

            <div className="mt-auto flex items-center space-x-2 pt-4" style={{ borderTop: '1px solid rgba(204,219,253,0.3)' }}>
              <Shield className="w-3.5 h-3.5" style={{ color: 'rgba(100,120,200,0.5)' }} />
              <span className="text-[10px]" style={{ color: 'rgba(100,120,200,0.5)' }}>
                End-to-end encrypted
              </span>
            </div>
          </div>

          {/* ── Chat column ── */}
          <div className="flex-1 flex flex-col overflow-hidden">

            {/* ── WELCOME STATE (no user message yet) — matches reference image ── */}
            <AnimatePresence mode="wait">
              {!hasUserSent ? (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col items-center justify-center px-6 pb-4"
                >
                  {/* Greeting */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="text-center mb-10"
                  >
                    <p
                      className="text-base mb-1 font-light"
                      style={{ color: 'rgba(80,100,170,0.75)' }}
                    >
                      Assalam-o-Alaikum 🌿
                    </p>
                    <h1
                      className="font-semibold leading-tight"
                      style={{
                        fontSize: 'clamp(24px, 4vw, 36px)',
                        color: 'rgba(40,55,110,0.88)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      What would you like to talk about?
                    </h1>
                    <p
                      className="mt-2 text-sm font-light max-w-sm mx-auto leading-relaxed"
                      style={{ color: 'rgba(80,100,170,0.6)' }}
                    >
                      Use one of the prompts below, or share what's on your mind.
                    </p>
                  </motion.div>

                  {/* Prompt cards — 3-column grid, matches reference */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl mb-4">
                    {promptCards.map((card, i) => {
                      const Icon = card.icon;
                      return (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                          onClick={() => handleSend(card.label + ' ' + card.sub)}
                          className="flex flex-col items-start text-left px-4 py-4 rounded-2xl transition-all duration-200 group"
                          style={{
                            background: 'rgba(237, 242, 251, 0.7)',
                            border: '1px solid rgba(204, 219, 253, 0.5)',
                            boxShadow: '0 2px 12px rgba(171,196,255,0.12)',
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(237,242,251,0.95)';
                            (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(171,196,255,0.25)';
                            (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(237, 242, 251, 0.7)';
                            (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(171,196,255,0.12)';
                            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                          }}
                        >
                          <Icon
                            className="w-4 h-4 mb-2.5"
                            style={{ color: 'rgba(100,130,210,0.7)' }}
                          />
                          <span
                            className="text-xs font-medium leading-snug"
                            style={{ color: 'rgba(50,65,120,0.85)' }}
                          >
                            {card.label}
                          </span>
                          <span
                            className="text-[11px] mt-0.5 leading-snug"
                            style={{ color: 'rgba(100,120,190,0.6)' }}
                          >
                            {card.sub}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (

                /* ── CONVERSATION STATE ── */
                <motion.div
                  key="chat"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 overflow-y-auto px-6 py-5 space-y-5"
                >
                  <AnimatePresence>
                    {messages.map(message => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`flex items-end gap-2 max-w-sm ${
                            message.sender === 'user' ? 'flex-row-reverse' : ''
                          }`}
                        >
                          {/* Avatar */}
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm"
                            style={{
                              background:
                                message.sender === 'user'
                                  ? 'linear-gradient(135deg, rgb(204,219,253), rgb(171,196,255))'
                                  : 'linear-gradient(135deg, rgb(182,204,254), rgb(193,211,254))',
                            }}
                          >
                            {message.sender === 'user' ? (
                              <User className="w-3.5 h-3.5" style={{ color: 'rgba(50,60,110,0.85)' }} />
                            ) : (
                              <Heart className="w-3.5 h-3.5" style={{ color: 'rgba(50,60,110,0.85)' }} />
                            )}
                          </div>

                          {/* Bubble */}
                          <div
                            className={`px-4 py-3 text-sm leading-relaxed ${
                              message.sender === 'user' ? 'rounded-2xl rounded-br-sm' : 'rounded-2xl rounded-bl-sm'
                            }`}
                            style={
                              message.sender === 'user'
                                ? {
                                    background: 'linear-gradient(135deg, rgb(204,219,253), rgb(182,204,254))',
                                    color: 'rgba(40,55,110,0.9)',
                                    boxShadow: '0 2px 12px rgba(171,196,255,0.3)',
                                  }
                                : {
                                    background: 'rgba(237,242,251,0.75)',
                                    border: '1px solid rgba(204,219,253,0.4)',
                                    color: 'rgba(50,70,130,0.85)',
                                    boxShadow: '0 2px 8px rgba(171,196,255,0.15)',
                                  }
                            }
                          >
                            {message.text}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                      <motion.div
                        key="typing"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-end gap-2">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                            style={{
                              background: 'linear-gradient(135deg, rgb(182,204,254), rgb(193,211,254))',
                            }}
                          >
                            <Heart className="w-3.5 h-3.5" style={{ color: 'rgba(50,60,110,0.85)' }} />
                          </div>
                          <div
                            className="px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5"
                            style={{
                              background: 'rgba(237,242,251,0.75)',
                              border: '1px solid rgba(204,219,253,0.4)',
                            }}
                          >
                            {[0, 0.2, 0.4].map((delay, i) => (
                              <motion.span
                                key={i}
                                className="w-1.5 h-1.5 rounded-full block"
                                style={{ background: 'rgba(100,130,210,0.5)' }}
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 0.7, delay, repeat: Infinity }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Input bar — matches reference's bottom pill input ── */}
            <div
              className="px-5 py-4"
              style={{ borderTop: '1px solid rgba(204,219,253,0.3)' }}
            >
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-2xl transition-all duration-200"
                style={{
                  background: 'rgba(237,242,251,0.6)',
                  border: '1px solid rgba(204,219,253,0.45)',
                  boxShadow: '0 2px 12px rgba(171,196,255,0.1)',
                }}
              >
                {/* Mic */}
                <button
                  className="p-1.5 rounded-full transition-all duration-200 shrink-0"
                  style={{ color: 'rgba(100,130,210,0.6)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(204,219,253,0.4)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(60,90,190,0.9)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(100,130,210,0.6)';
                  }}
                >
                  <Mic className="w-4 h-4" />
                </button>

                {/* Image */}
                <button
                  className="p-1.5 rounded-full transition-all duration-200 shrink-0"
                  style={{ color: 'rgba(100,130,210,0.6)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(204,219,253,0.4)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(60,90,190,0.9)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(100,130,210,0.6)';
                  }}
                >
                  <ImageIcon className="w-4 h-4" />
                </button>

                {/* Text input */}
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder={
                    language === 'en'
                      ? 'Ask whatever you want…'
                      : 'جو دل میں ہے وہ لکھیں…'
                  }
                  className="flex-1 bg-transparent text-sm outline-none"
                  style={{
                    color: 'rgba(40,55,110,0.9)',
                  }}
                />

                {/* Send — arrow icon matching reference */}
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: input.trim()
                      ? 'linear-gradient(135deg, rgb(193,211,254), rgb(171,196,255))'
                      : 'rgba(204,219,253,0.3)',
                    boxShadow: input.trim() ? '0 2px 8px rgba(171,196,255,0.4)' : 'none',
                  }}
                >
                  <ArrowRight
                    className="w-4 h-4"
                    style={{ color: input.trim() ? 'rgba(40,55,110,0.9)' : 'rgba(100,130,190,0.5)' }}
                  />
                </button>
              </div>

              {/* Bottom hint */}
              <p
                className="text-center text-[10px] mt-2.5 flex items-center justify-center gap-1.5"
                style={{ color: 'rgba(120,145,210,0.5)' }}
              >
                <Sparkles className="w-3 h-3" />
                AI responses are for support only, not medical advice
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}