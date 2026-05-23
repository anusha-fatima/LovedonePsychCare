"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bot,
  HeartHandshake,
  LogOut,
  ShieldCheck,
  Home,
  Settings,
  Mic,
  User,
  
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/context/ChatContext";
import {
  getOrCreateUserConversation,
  requestTherapist,
  sendBotReplyIfEnabled,
  sendMessage,
} from "@/lib/store";
import { ChatThread } from "@/components/chat/ChatThread";
import { ChatComposer } from "@/components/chat/ChatComposer";

export default function UserChatPage() {
  const router = useRouter();
  const { account, ready, signOut, allAccounts } = useAuth();
  const { conversations, messages } = useChat();
  const ensuredRef = useRef(false);

  useEffect(() => {
    if (!ready) return;
    if (!account) {
      router.replace("/auth");
      return;
    }
    if (account.role === "admin") {
      router.replace("/admin");
      return;
    }
    if (account.role === "therapist") {
      router.replace("/dashboard");
      return;
    }
    if (!ensuredRef.current) {
      ensuredRef.current = true;
      getOrCreateUserConversation(account.id);
    }
  }, [ready, account, router]);

  const conv = useMemo(
    () => (account ? conversations.find((c) => c.userId === account.id) : null),
    [conversations, account]
  );

  const convMessages = useMemo(
    () => (conv ? messages.filter((m) => m.conversationId === conv.id) : []),
    [messages, conv]
  );

  const accountsById = useMemo(() => {
    const map: Record<string, any> = {};
    allAccounts.forEach((a) => (map[a.id] = a));
    return map;
  }, [allAccounts]);

  if (!ready || !account || account.role !== "user" || !conv) {
    return (
      <div className="min-h-screen grid place-items-center text-ink-400">
        Loading…
      </div>
    );
  }

  const terminated = conv.status === "terminated";
  const therapist = conv.therapistId ? accountsById[conv.therapistId] : null;
  const requested = !!conv.requestedTherapistAt;

  function onSend(text: string) {
    if (!conv) return;
    sendMessage({
      conversationId: conv.id,
      authorId: account!.id,
      authorRole: "user",
      text,
    });
    setTimeout(() => sendBotReplyIfEnabled(conv.id), 600);
  }

  return (
    <div className="h-screen flex flex-col bg-canvas">
      <header className="border-b border-ink-900/5 bg-white">
        <div className="container-page h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="btn-ghost px-2 py-2" aria-label="Home">
              <Home className="h-4 w-4" />
            </Link>
            <div>
              <p className="text-sm font-semibold text-ink-900 leading-tight">
                {therapist ? `Chat with ${therapist.name}` : "Sukoon · AI guide"}
              </p>
              <p className="text-xs text-midnight-700">
                {terminated
                  ? "This chat is closed"
                  : therapist
                  ? "Human therapist online"
                  : conv.botEnabled
                  ? "Online · replies in seconds"
                  : "AI guide paused"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!therapist && !terminated && (
              <button
                onClick={() => requestTherapist(conv.id)}
                disabled={requested}
                className={`btn ${
                  requested ? "btn-outline" : "btn-secondary"
                } h-9 px-4 text-xs`}
              >
                <HeartHandshake className="h-4 w-4" />
                {requested ? "Therapist requested" : "Talk to a therapist"}
              </button>
            )}
            <button
              onClick={() => {
                signOut();
                router.push("/");
              }}
              className="btn-ghost h-9 px-3 text-xs"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex container-page py-4 gap-4 overflow-hidden">
        <aside className="hidden md:flex flex-col w-72 shrink-0">
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-full grid place-items-center text-white font-semibold"
                style={{ background: `hsl(${account.avatarHue},45%,55%)` }}
              >
                {account.name.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-ink-900">
                  {account.name}
                </p>
                <p className="text-xs text-ink-400">{account.email}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-xs text-ink-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-midnight-600" />
                Private to you
              </div>
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-midnight-600" />
                AI guide{" "}
                {conv.botEnabled ? "active" : "paused by admin"}
              </div>
            </div>
          </div>

          <div className="card mt-4 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Quick links
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <Link
                href="/psychologists"
                className="rounded-2xl border border-ink-900/5 bg-cream/50 px-3 py-2 text-sm text-ink-700 hover:border-midnight-300"
              >
                <User className="inline h-3.5 w-3.5 mr-1" />

                Browse therapists
              </Link>
              <Link
                href="/services"
                className="rounded-2xl border border-ink-900/5 bg-cream/50 px-3 py-2 text-sm text-ink-700 hover:border-midnight-300"
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
              <Link
  href="/dashboard/voice-cloning"
  className="rounded-2xl border border-ink-900/5 bg-cream/50 px-3 py-2 text-sm text-ink-700 hover:border-midnight-300 font-sans"
>
  <Mic className="inline h-3.5 w-3.5 mr-1" />
  Voice cloning
</Link>

            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col card overflow-hidden">
          <ChatThread
            viewerId={account.id}
            conversation={conv}
            messages={convMessages}
            accountsById={accountsById}
          />

          {terminated ? (
            <div className="border-t border-ink-900/5 bg-white px-6 py-5 text-center text-sm text-ink-500">
              This conversation has been closed.{" "}
              <Link href="/contact" className="text-midnight-700 font-semibold">
                Contact support
              </Link>
            </div>
          ) : (
            <ChatComposer
              onSend={onSend}
              placeholder={
                therapist
                  ? `Reply to ${therapist.name}…`
                  : "Tell Sukoon what's on your mind…"
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
