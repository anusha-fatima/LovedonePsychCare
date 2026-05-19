"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlarmClock,
  BadgeCheck,
  HelpCircle,
  Inbox,
  LogOut,
  MessageCircle,
  ShieldAlert,
  UserRound,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/context/ChatContext";
import {
  assignTherapist,
  sendMessage,
  unassignTherapist,
} from "@/lib/store";
import { ChatThread } from "@/components/chat/ChatThread";
import { ChatComposer } from "@/components/chat/ChatComposer";

function timeAgo(ts: number) {
  const m = Math.floor((Date.now() - ts) / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function TherapistDashboard() {
  const router = useRouter();
  const { account, ready, allAccounts, signOut } = useAuth();
  const { conversations, messages } = useChat();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!ready) return;
    if (!account) router.replace("/auth");
    else if (account.role === "admin") router.replace("/admin");
    else if (account.role === "user") router.replace("/chat");
  }, [ready, account, router]);

  const accountsById = useMemo(() => {
    const map: Record<string, any> = {};
    allAccounts.forEach((a) => (map[a.id] = a));
    return map;
  }, [allAccounts]);

  const myActive = useMemo(
    () => conversations.filter((c) => c.therapistId === account?.id),
    [conversations, account]
  );

  const requests = useMemo(
    () =>
      conversations
        .filter((c) => !c.therapistId && c.requestedTherapistAt && c.status === "active")
        .sort((a, b) => (b.requestedTherapistAt ?? 0) - (a.requestedTherapistAt ?? 0)),
    [conversations]
  );

  useEffect(() => {
    if (!activeId && myActive.length) setActiveId(myActive[0].id);
  }, [myActive, activeId]);

  if (!ready || !account || account.role !== "therapist") {
    return (
      <div className="min-h-screen grid place-items-center text-ink-400">
        Loading…
      </div>
    );
  }

  const therapistProfile = account.therapist;
  const isApproved = therapistProfile?.status === "approved";

  if (!isApproved) {
    return (
      <PendingScreen
        status={(therapistProfile?.status ?? "pending") as "pending" | "suspended"}
        reason={therapistProfile?.suspendedReason}
        onSignOut={() => {
          signOut();
          router.push("/");
        }}
      />
    );
  }

  const activeConv = myActive.find((c) => c.id === activeId) ?? null;
  const activeMessages = activeConv
    ? messages.filter((m) => m.conversationId === activeConv.id)
    : [];
  const activeUser =
    activeConv ? accountsById[activeConv.userId] : null;

  function send(text: string) {
    if (!activeConv) return;
    sendMessage({
      conversationId: activeConv.id,
      authorId: account!.id,
      authorRole: "therapist",
      text,
    });
  }

  return (
    <div className="h-screen flex flex-col bg-canvas">
      <header className="border-b border-ink-900/5 bg-white">
        <div className="container-page h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-display text-lg text-ink-900">
              LovedOne · Clinician
            </Link>
            <span className="chip">
              <BadgeCheck className="h-3.5 w-3.5" /> Approved
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-ink-900">{account.name}</p>
              <p className="text-xs text-ink-400">
                {therapistProfile?.title}
              </p>
            </div>
            <button
              className="btn-ghost h-9 px-3 text-xs"
              onClick={() => {
                signOut();
                router.push("/");
              }}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex container-page gap-4 py-4 overflow-hidden">
        <aside className="w-80 shrink-0 flex flex-col gap-4 overflow-y-auto pr-1">
          <Section title="Incoming requests" icon={<Inbox className="h-4 w-4" />} count={requests.length}>
            {requests.length === 0 ? (
              <Empty label="No new requests." />
            ) : (
              requests.map((r) => {
                const u = accountsById[r.userId];
                return (
                  <div key={r.id} className="card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-ink-900">
                          {u?.name ?? "User"}
                        </p>
                        <p className="text-xs text-ink-400 mt-0.5">
                          <AlarmClock className="inline h-3 w-3 mr-1" />
                          {timeAgo(r.requestedTherapistAt!)}
                        </p>
                      </div>
                      <button
                        className="btn-primary h-8 px-3 text-xs"
                        onClick={() => {
                          assignTherapist(r.id, account.id);
                          setActiveId(r.id);
                        }}
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </Section>

          <Section
            title="My conversations"
            icon={<MessageCircle className="h-4 w-4" />}
            count={myActive.length}
          >
            {myActive.length === 0 ? (
              <Empty label="No active conversations yet." />
            ) : (
              myActive
                .slice()
                .sort((a, b) => b.lastActivity - a.lastActivity)
                .map((c) => {
                  const u = accountsById[c.userId];
                  const active = c.id === activeId;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setActiveId(c.id)}
                      className={`w-full text-left rounded-2xl px-4 py-3 transition border ${
                        active
                          ? "bg-ink-900 text-white border-ink-900"
                          : "bg-white border-ink-900/5 hover:border-ink-900/20"
                      }`}
                    >
                      <p
                        className={`text-sm font-semibold ${
                          active ? "text-white" : "text-ink-900"
                        }`}
                      >
                        {u?.name ?? "User"}
                      </p>
                      <p
                        className={`text-xs mt-0.5 ${
                          active ? "text-white/60" : "text-ink-400"
                        }`}
                      >
                        {timeAgo(c.lastActivity)}{" "}
                        {c.status === "terminated" && "· closed"}
                      </p>
                    </button>
                  );
                })
            )}
          </Section>
        </aside>

        <main className="flex-1 card overflow-hidden flex flex-col">
          {!activeConv ? (
            <div className="flex-1 grid place-items-center text-center px-6">
              <div>
                <HelpCircle className="h-8 w-8 text-ink-300 mx-auto" />
                <p className="mt-3 text-ink-500">
                  Pick a conversation, or accept a new request.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-ink-900/5 px-6 py-4 bg-white">
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-full grid place-items-center text-white font-semibold"
                    style={{ background: `hsl(${activeUser?.avatarHue ?? 120},45%,55%)` }}
                  >
                    {(activeUser?.name ?? "U").slice(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">
                      {activeUser?.name}
                    </p>
                    <p className="text-xs text-ink-400">
                      {activeUser?.email}
                    </p>
                  </div>
                </div>
                <button
                  className="btn-outline h-9 px-3 text-xs"
                  onClick={() => {
                    if (!activeConv) return;
                    unassignTherapist(
                      activeConv.id,
                      "Therapist has left the conversation. The AI guide is back online."
                    );
                  }}
                >
                  <X className="h-4 w-4" /> Leave conversation
                </button>
              </div>

              {activeConv.status === "terminated" ? (
                <div className="flex-1 grid place-items-center px-6 text-center">
                  <p className="text-sm text-ink-500">
                    <ShieldAlert className="inline h-4 w-4 mr-1 text-red-500" />
                    This conversation was closed by an admin.
                  </p>
                </div>
              ) : (
                <>
                  <ChatThread
                    viewerId={account.id}
                    conversation={activeConv}
                    messages={activeMessages}
                    accountsById={accountsById}
                  />
                  <ChatComposer
                    onSend={send}
                    placeholder={`Reply to ${activeUser?.name ?? "user"}…`}
                  />
                </>
              )}
            </>
          )}
        </main>

        <aside className="hidden xl:flex flex-col w-72 shrink-0">
          <div className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Your profile
            </p>
            <p className="mt-3 text-sm font-semibold text-ink-900">
              <UserRound className="inline h-4 w-4 mr-1 text-midnight-600" />
              {account.name}
            </p>
            <p className="text-xs text-ink-400 mt-1">
              {therapistProfile?.title}
            </p>
            <p className="text-xs text-ink-500 mt-3 leading-relaxed">
              {therapistProfile?.bio}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {therapistProfile?.specialties.map((s) => (
                <span key={s} className="chip-peri">{s}</span>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {therapistProfile?.languages.map((s) => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
            <p className="mt-4 text-xs text-ink-400 leading-relaxed">
              {therapistProfile?.credentials}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({
  title,
  icon,
  count,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-2 px-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-500 flex items-center gap-1.5">
          {icon}
          {title}
        </p>
        {typeof count === "number" && (
          <span className="text-[11px] font-semibold text-ink-400">{count}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-ink-900/10 bg-cream/30 px-4 py-6 text-center text-xs text-ink-400">
      {label}
    </div>
  );
}

function PendingScreen({
  status,
  reason,
  onSignOut,
}: {
  status: "pending" | "suspended";
  reason?: string;
  onSignOut: () => void;
}) {
  const isSuspended = status === "suspended";
  return (
    <section className="min-h-screen grid place-items-center p-6 bg-cream/40">
      <div className="card max-w-lg w-full p-8 text-center">
        <div
          className={`mx-auto h-12 w-12 rounded-full grid place-items-center ${
            isSuspended ? "bg-red-50 text-red-600" : "bg-midnight-50 text-midnight-700"
          }`}
        >
          {isSuspended ? <ShieldAlert className="h-6 w-6" /> : <AlarmClock className="h-6 w-6" />}
        </div>
        <h1 className="font-display text-3xl mt-4">
          {isSuspended ? "Your account is suspended" : "Application under review"}
        </h1>
        <p className="mt-3 text-ink-500">
          {isSuspended
            ? reason || "An admin has paused your access. Please contact support."
            : "Thanks for applying. Our admin team is verifying your credentials. You'll be able to see clients as soon as you're approved."}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/contact" className="btn-outline">
            Contact support
          </Link>
          <button onClick={onSignOut} className="btn-secondary">
            Sign out
          </button>
        </div>
      </div>
    </section>
  );
}
