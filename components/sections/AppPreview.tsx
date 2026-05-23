"use client";

import { useState } from "react";
import { Bot, UserRound, Sparkles } from "lucide-react";

type Sample = {
  id: string;
  label: string;
  messages: { from: "user" | "bot" | "th" | "sys"; text: string; time: string }[];
};

const SAMPLES: Sample[] = [
  {
    id: "anxiety",
    label: "Late-night anxiety",
    messages: [
      { from: "sys", text: "Sukoon (AI guide) joined", time: "" },
      { from: "user", text: "I can't sleep again. My chest feels tight.", time: "2:14 AM" },
      { from: "bot", text: "I'm here. Let's slow it down for a second. Can you describe what your body is doing right now — chest, breath, hands?", time: "2:14 AM" },
      { from: "user", text: "Heart racing. Shallow breaths.", time: "2:15 AM" },
      { from: "bot", text: "That sounds like a panic spike. Let's try a 4-7-8 breath together — I'll count.", time: "2:15 AM" },
    ],
  },
  {
    id: "human",
    label: "Bringing in a therapist",
    messages: [
      { from: "user", text: "I think I want to talk to a real person.", time: "8:02 PM" },
      { from: "sys", text: "Request sent. A licensed therapist will join shortly.", time: "8:02 PM" },
      { from: "sys", text: "Dr. Sarah Ahmed has joined the conversation.", time: "8:09 PM" },
      { from: "th", text: "Hi — I read your conversation with Sukoon. Take your time. What feels heaviest right now?", time: "8:09 PM" },
    ],
  },
  {
    id: "grief",
    label: "Grief, in Urdu",
    messages: [
      { from: "user", text: "ابو کے جانے کے بعد سب کچھ خالی لگتا ہے۔", time: "11:40 PM" },
      { from: "bot", text: "آپ کا غم بہت بڑا ہے۔ میں یہاں ہوں، جیسے بھی آپ بات کرنا چاہیں۔", time: "11:40 PM" },
      { from: "user", text: "I miss him.", time: "11:41 PM" },
      { from: "bot", text: "That ache is love that has nowhere to go for a moment. Tell me about him.", time: "11:41 PM" },
    ],
  },
];

export function AppPreview() {
  const [active, setActive] = useState(SAMPLES[0].id);
  const sample = SAMPLES.find((s) => s.id === active)!;

  return (
    <section id="app" className="section">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">Inside the app</p>
          <h2 className="h-display text-4xl md:text-5xl font-display">
            What a conversation feels like.
          </h2>
          <p className="mt-4 text-ink-500 text-lg font-sans">
            One chat, two presences. Switch tabs below to peek at real-world
            moments from the app.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
            {SAMPLES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`text-left rounded-2xl px-4 py-3 text-sm font-semibold transition font-sans ${
                  active === s.id
                    ? "bg-ink-900 text-white shadow-soft"
                    : "bg-white text-ink-700 border border-ink-900/5 hover:border-ink-900/15"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="lg:col-span-8">
            <div className="rounded-[32px] bg-ink-900 p-3 shadow-soft">
              <div className="rounded-[24px] bg-canvas overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-ink-900/5 bg-white">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-midnight-100 grid place-items-center text-midnight-700">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink-900 font-display">
                        Your conversation
                      </p>
                      <p className="text-xs text-midnight-700 font-sans">Online</p>
                    </div>
                  </div>
                  <span className="chip font-sans">private</span>
                </div>

                <div className="p-5 space-y-3 max-h-[440px] overflow-y-auto bg-cream/40">
                  {sample.messages.map((m, i) => {
                    if (m.from === "sys")
                      return (
                        <div key={i} className="text-center">
                          <span className="inline-block text-[11px] uppercase tracking-wider text-ink-400 bg-white rounded-full px-3 py-1 border border-ink-900/5 font-sans">
                            {m.text}
                          </span>
                        </div>
                      );
                    const mine = m.from === "user";
                    return (
                      <div
                        key={i}
                        className={`flex ${mine ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                            mine
                              ? "bg-midnight-600 text-white rounded-br-md"
                              : m.from === "th"
                              ? "bg-periwinkle-300 text-ink-900 border border-periwinkle-400 rounded-bl-md"
                              : "bg-white text-ink-900 border border-ink-900/5 rounded-bl-md"
                          }`}
                        >
                          {m.from === "th" && (
                            <span className="block text-[10px] font-semibold uppercase tracking-wider text-midnight-800 mb-1 font-sans">
                              <UserRound className="inline h-3 w-3 mr-1" />
                              Dr. Sarah Ahmed
                            </span>
                          )}
                          <span className="font-sans">{m.text}</span>
                          {m.time && (
                            <span
                              className={`block text-[10px] mt-1 font-sans ${
                                mine ? "text-white/70" : "text-ink-400"
                              }`}
                            >
                              {m.time}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="px-5 py-4 border-t border-ink-900/5 bg-white flex items-center gap-3">
                  <div className="flex-1 h-10 rounded-full bg-cream border border-ink-900/5 px-4 grid place-items-start content-center text-sm text-ink-400 font-sans">
                    Write what's on your mind…
                  </div>
                  <div className="h-10 px-4 rounded-full bg-midnight-600 text-white text-sm font-semibold grid place-items-center font-sans">
                    Send
                  </div>
                </div>

                {/* Friendly Disclaimer */}
                <div className="px-5 py-3 bg-cream/60 border-t border-ink-900/5">
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-midnight-500" />
                    <p className="text-xs text-ink-500 text-center font-sans">
                      Sukoon is an AI support tool — here to listen and guide. 
                      For urgent or complex concerns, our licensed therapists are just a tap away. 💙
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}