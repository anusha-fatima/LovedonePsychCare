"use client";

import { useEffect, useRef } from "react";
import type { Conversation, Message } from "@/lib/types";
import type { Account } from "@/lib/types";
import { Bot, ShieldAlert, UserRound, BadgeCheck } from "lucide-react";

function fmtTime(t: number) {
  return new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

type Props = {
  viewerId: string;
  conversation: Conversation;
  messages: Message[];
  accountsById: Record<string, Account>;
};

export function ChatThread({ viewerId, conversation, messages, accountsById }: Props) {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, conversation.id]);

  const therapist =
    conversation.therapistId ? accountsById[conversation.therapistId] : null;

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-3 bg-cream/30">
      {messages.map((m) => {
        if (m.authorRole === "system") {
          return (
            <div key={m.id} className="text-center my-2">
              <span className="inline-block text-[11px] uppercase tracking-wider text-ink-400 bg-white rounded-full px-3 py-1 border border-ink-900/5">
                {m.text}
              </span>
            </div>
          );
        }

        const mine = m.authorId === viewerId;
        const author = accountsById[m.authorId];

        let bubble = "bg-white text-ink-900 border border-ink-900/5";
        let align = "justify-start";
        let label: React.ReactNode = null;

        if (mine) {
          bubble = "bg-midnight-600 text-white";
          align = "justify-end";
        } else if (m.authorRole === "bot") {
          bubble = "bg-white text-ink-900 border border-ink-900/5";
          label = (
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-midnight-700 mb-1">
              <Bot className="inline h-3 w-3 mr-1" />
              Sukoon · AI guide
            </span>
          );
        } else if (m.authorRole === "therapist") {
          bubble = "bg-periwinkle-300 text-ink-900 border border-periwinkle-400 shadow-soft";
          label = (
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-midnight-800 mb-1">
              <UserRound className="inline h-3 w-3 mr-1" />
              {author?.name ?? "Therapist"}
            </span>
          );
        } else if (m.authorRole === "admin") {
          bubble = "bg-ink-900 text-white";
          label = (
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/70 mb-1">
              <ShieldAlert className="inline h-3 w-3 mr-1" />
              Admin
            </span>
          );
        } else if (m.authorRole === "user") {
          label = (
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-ink-400 mb-1">
              {author?.name ?? "User"}
            </span>
          );
        }

        return (
          <div key={m.id} className={`flex ${align}`}>
            <div
              className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                mine ? "rounded-br-md" : "rounded-bl-md"
              } ${bubble}`}
            >
              {label}
              <p className="whitespace-pre-wrap">{m.text}</p>
              <span
                className={`block text-[10px] mt-1 ${
                  mine ? "text-white/70" : "text-ink-400"
                }`}
              >
                {fmtTime(m.createdAt)}
              </span>
            </div>
          </div>
        );
      })}

      {therapist && (
        <div className="text-center pt-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-midnight-700 font-semibold">
            <BadgeCheck className="h-3.5 w-3.5" />
            {therapist.name} is in this conversation
          </span>
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}
