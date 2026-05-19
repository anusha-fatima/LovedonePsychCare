"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  Bot,
  Check,
  LogOut,
  MessageSquare,
  Power,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserX,
  Users,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/context/ChatContext";
import {
  approveTherapist,
  rejectTherapist,
  resumeConversation,
  sendMessage,
  setBotEnabled,
  suspendTherapist,
  terminateConversation,
  unassignTherapist,
} from "@/lib/store";
import { ChatThread } from "@/components/chat/ChatThread";

type Tab = "overview" | "therapists" | "chats" | "users";

export default function AdminDashboard() {
  const router = useRouter();
  const { account, ready, allAccounts, signOut } = useAuth();
  const { conversations, messages } = useChat();
  const [tab, setTab] = useState<Tab>("overview");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  useEffect(() => {
    if (!ready) return;
    if (!account) router.replace("/auth");
    else if (account.role !== "admin") router.replace("/");
  }, [ready, account, router]);

  const accountsById = useMemo(() => {
    const map: Record<string, any> = {};
    allAccounts.forEach((a) => (map[a.id] = a));
    return map;
  }, [allAccounts]);

  const therapists = useMemo(
    () => allAccounts.filter((a) => a.role === "therapist"),
    [allAccounts]
  );
  const users = useMemo(
    () => allAccounts.filter((a) => a.role === "user"),
    [allAccounts]
  );
  const pendingTherapists = therapists.filter((t) => t.therapist?.status === "pending");
  const suspendedTherapists = therapists.filter((t) => t.therapist?.status === "suspended");
  const activeConvCount = conversations.filter((c) => c.status === "active").length;

  if (!ready || !account || account.role !== "admin") {
    return (
      <div className="min-h-screen grid place-items-center text-ink-400">Loading…</div>
    );
  }

  const selected = selectedChat
    ? conversations.find((c) => c.id === selectedChat)
    : null;
  const selectedMessages = selected
    ? messages.filter((m) => m.conversationId === selected.id)
    : [];

  return (
    <div className="min-h-screen bg-canvas">
      <header className="border-b border-ink-900/5 bg-white sticky top-0 z-30">
        <div className="container-page h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-display text-lg text-ink-900">
              LovedOne · Admin
            </Link>
            <span className="chip-peri">
              <ShieldAlert className="h-3.5 w-3.5" /> Full control
            </span>
          </div>
          <div className="flex items-center gap-3">
            <p className="hidden sm:block text-sm text-ink-500">{account.email}</p>
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
        <nav className="container-page flex gap-1 pb-2 -mt-1 overflow-x-auto">
          {(
            [
              { id: "overview", label: "Overview", icon: Activity },
              { id: "therapists", label: "Therapists", icon: BadgeCheck, badge: pendingTherapists.length },
              { id: "chats", label: "Conversations", icon: MessageSquare },
              { id: "users", label: "Users", icon: Users },
            ] as { id: Tab; label: string; icon: any; badge?: number }[]
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shrink-0 ${
                tab === t.id
                  ? "bg-ink-900 text-white"
                  : "text-ink-500 hover:text-ink-900"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
              {!!t.badge && (
                <span className="rounded-full bg-periwinkle-500 text-white text-[10px] px-1.5 py-0.5">
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </header>

      <div className="container-page py-8">
        {tab === "overview" && (
          <Overview
            stats={[
              { label: "Active conversations", value: activeConvCount, icon: MessageSquare },
              { label: "Pending therapist apps", value: pendingTherapists.length, icon: AlertTriangle },
              { label: "Approved therapists", value: therapists.filter((t) => t.therapist?.status === "approved").length, icon: BadgeCheck },
              { label: "Total users", value: users.length, icon: Users },
            ]}
            pendingTherapists={pendingTherapists}
            recentConversations={conversations
              .slice()
              .sort((a, b) => b.lastActivity - a.lastActivity)
              .slice(0, 5)}
            accountsById={accountsById}
            onOpenChat={(id) => {
              setSelectedChat(id);
              setTab("chats");
            }}
            onApprove={approveTherapist}
            onReject={(id) => rejectTherapist(id, "Application rejected.")}
          />
        )}

        {tab === "therapists" && (
          <TherapistsPanel
            therapists={therapists}
            pendingTherapists={pendingTherapists}
            suspendedTherapists={suspendedTherapists}
          />
        )}

        {tab === "chats" && (
          <ChatsPanel
            adminId={account.id}
            conversations={conversations}
            messages={messages}
            accountsById={accountsById}
            selectedId={selectedChat}
            setSelectedId={setSelectedChat}
            selected={selected}
            selectedMessages={selectedMessages}
          />
        )}

        {tab === "users" && (
          <UsersPanel users={users} conversations={conversations} />
        )}
      </div>
    </div>
  );
}

function Overview({
  stats,
  pendingTherapists,
  recentConversations,
  accountsById,
  onOpenChat,
  onApprove,
  onReject,
}: {
  stats: { label: string; value: number; icon: any }[];
  pendingTherapists: any[];
  recentConversations: any[];
  accountsById: Record<string, any>;
  onOpenChat: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <s.icon className="h-5 w-5 text-midnight-600" />
            <p className="mt-3 font-display text-3xl text-ink-900">{s.value}</p>
            <p className="text-xs uppercase tracking-wider text-ink-400">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-xl text-ink-900">Pending therapists</h3>
            <span className="chip">{pendingTherapists.length}</span>
          </div>
          {pendingTherapists.length === 0 ? (
            <p className="text-sm text-ink-400">No applications to review.</p>
          ) : (
            <ul className="space-y-3">
              {pendingTherapists.map((t) => (
                <li key={t.id} className="rounded-2xl border border-ink-900/5 p-4">
                  <p className="text-sm font-semibold text-ink-900">{t.name}</p>
                  <p className="text-xs text-ink-400">{t.therapist?.title}</p>
                  <p className="mt-2 text-xs text-ink-500 line-clamp-2">{t.therapist?.bio}</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      className="btn-primary h-8 px-3 text-xs"
                      onClick={() => onApprove(t.id)}
                    >
                      <Check className="h-4 w-4" /> Approve
                    </button>
                    <button
                      className="btn-outline h-8 px-3 text-xs"
                      onClick={() => onReject(t.id)}
                    >
                      <X className="h-4 w-4" /> Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card p-6">
          <h3 className="font-display text-xl text-ink-900 mb-4">Latest activity</h3>
          <ul className="space-y-3">
            {recentConversations.length === 0 && (
              <p className="text-sm text-ink-400">No conversations yet.</p>
            )}
            {recentConversations.map((c) => {
              const u = accountsById[c.userId];
              const th = c.therapistId ? accountsById[c.therapistId] : null;
              return (
                <li key={c.id} className="rounded-2xl border border-ink-900/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-ink-900">
                        {u?.name}
                      </p>
                      <p className="text-xs text-ink-400 mt-0.5">
                        {th ? `with ${th.name}` : c.botEnabled ? "with Sukoon" : "paused"}
                        {" · "}
                        {new Date(c.lastActivity).toLocaleString()}
                      </p>
                    </div>
                    <button
                      className="btn-outline h-8 px-3 text-xs"
                      onClick={() => onOpenChat(c.id)}
                    >
                      Open
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function TherapistsPanel({
  therapists,
  pendingTherapists,
  suspendedTherapists,
}: {
  therapists: any[];
  pendingTherapists: any[];
  suspendedTherapists: any[];
}) {
  const [view, setView] = useState<"all" | "pending" | "suspended">("pending");
  const list =
    view === "all" ? therapists : view === "pending" ? pendingTherapists : suspendedTherapists;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {(
          [
            ["pending", `Pending (${pendingTherapists.length})`],
            ["all", `All (${therapists.length})`],
            ["suspended", `Suspended (${suspendedTherapists.length})`],
          ] as [typeof view, string][]
        ).map(([v, l]) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${
              view === v
                ? "bg-ink-900 text-white"
                : "bg-white border border-ink-900/10 text-ink-700"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {list.length === 0 && (
          <p className="text-sm text-ink-400">Nothing here.</p>
        )}
        {list.map((t) => (
          <TherapistCard key={t.id} t={t} />
        ))}
      </div>
    </div>
  );
}

function TherapistCard({ t }: { t: any }) {
  const status = t.therapist?.status as "pending" | "approved" | "suspended";
  return (
    <article className="card p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-xl text-ink-900">{t.name}</p>
          <p className="text-xs text-ink-400">{t.therapist?.title}</p>
        </div>
        <StatusPill status={status} />
      </div>

      <p className="mt-3 text-sm text-ink-500 leading-relaxed">{t.therapist?.bio}</p>
      <p className="mt-3 text-xs text-ink-400">
        <strong className="text-ink-700">Credentials:</strong>{" "}
        {t.therapist?.credentials}
      </p>
      <p className="text-xs text-ink-400">
        <strong className="text-ink-700">Experience:</strong>{" "}
        {t.therapist?.yearsOfExperience} years · {t.email}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {t.therapist?.specialties.map((s: string) => (
          <span key={s} className="chip-peri">{s}</span>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {t.therapist?.languages.map((s: string) => (
          <span key={s} className="chip">{s}</span>
        ))}
      </div>

      {t.therapist?.suspendedReason && (
        <p className="mt-3 rounded-2xl bg-red-50 text-red-700 text-xs px-3 py-2">
          <ShieldAlert className="inline h-3.5 w-3.5 mr-1" />
          {t.therapist.suspendedReason}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {status !== "approved" && (
          <button
            className="btn-primary h-8 px-3 text-xs"
            onClick={() => approveTherapist(t.id)}
          >
            <UserCheck className="h-4 w-4" />
            Approve
          </button>
        )}
        {status === "approved" && (
          <button
            className="btn-outline h-8 px-3 text-xs"
            onClick={() => {
              const reason = prompt("Reason for suspension?") ?? "Account suspended.";
              suspendTherapist(t.id, reason);
            }}
          >
            <UserX className="h-4 w-4" />
            Suspend
          </button>
        )}
        {status === "pending" && (
          <button
            className="btn-outline h-8 px-3 text-xs"
            onClick={() => {
              const reason = prompt("Reason for rejection?") ?? "Application rejected.";
              rejectTherapist(t.id, reason);
            }}
          >
            <X className="h-4 w-4" />
            Reject
          </button>
        )}
      </div>
    </article>
  );
}

function StatusPill({ status }: { status: "pending" | "approved" | "suspended" }) {
  if (status === "approved")
    return (
      <span className="chip">
        <ShieldCheck className="h-3.5 w-3.5" />
        Approved
      </span>
    );
  if (status === "pending")
    return (
      <span className="rounded-full bg-periwinkle-50 ring-1 ring-periwinkle-200 px-3 py-1 text-xs font-semibold text-periwinkle-500 inline-flex items-center gap-1.5">
        Pending
      </span>
    );
  return (
    <span className="rounded-full bg-red-50 ring-1 ring-red-200 px-3 py-1 text-xs font-semibold text-red-600 inline-flex items-center gap-1.5">
      <ShieldAlert className="h-3.5 w-3.5" />
      Suspended
    </span>
  );
}

function ChatsPanel({
  adminId,
  conversations,
  messages,
  accountsById,
  selectedId,
  setSelectedId,
  selected,
  selectedMessages,
}: {
  adminId: string;
  conversations: any[];
  messages: any[];
  accountsById: Record<string, any>;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  selected: any;
  selectedMessages: any[];
}) {
  const sorted = conversations
    .slice()
    .sort((a, b) => b.lastActivity - a.lastActivity);

  function sendAdmin(text: string) {
    if (!selected) return;
    sendMessage({
      conversationId: selected.id,
      authorId: adminId,
      authorRole: "admin",
      text,
    });
  }

  return (
    <div className="grid lg:grid-cols-12 gap-4">
      <aside className="lg:col-span-4 card p-3 max-h-[70vh] overflow-y-auto">
        <ul className="space-y-1.5">
          {sorted.map((c) => {
            const u = accountsById[c.userId];
            const th = c.therapistId ? accountsById[c.therapistId] : null;
            const last = messages
              .filter((m) => m.conversationId === c.id)
              .slice(-1)[0];
            const isSel = c.id === selectedId;
            return (
              <li key={c.id}>
                <button
                  onClick={() => setSelectedId(c.id)}
                  className={`w-full text-left rounded-2xl p-3 transition border ${
                    isSel
                      ? "bg-ink-900 text-white border-ink-900"
                      : "bg-white border-ink-900/5 hover:border-ink-900/20"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`text-sm font-semibold ${
                        isSel ? "text-white" : "text-ink-900"
                      }`}
                    >
                      {u?.name}
                    </p>
                    {c.status === "terminated" ? (
                      <span className={`text-[10px] uppercase ${isSel ? "text-red-200" : "text-red-500"}`}>
                        closed
                      </span>
                    ) : c.therapistId ? (
                      <span className={`text-[10px] uppercase ${isSel ? "text-periwinkle-200" : "text-periwinkle-500"}`}>
                        human
                      </span>
                    ) : (
                      <span className={`text-[10px] uppercase ${isSel ? "text-midnight-200" : "text-midnight-600"}`}>
                        ai
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs mt-1 truncate ${
                      isSel ? "text-white/60" : "text-ink-400"
                    }`}
                  >
                    {th ? `${th.name} · ` : ""}
                    {last?.text ?? "—"}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <main className="lg:col-span-8 card overflow-hidden flex flex-col min-h-[70vh]">
        {!selected ? (
          <div className="flex-1 grid place-items-center text-ink-400 text-sm">
            Pick a conversation to inspect.
          </div>
        ) : (
          <>
            <div className="border-b border-ink-900/5 px-6 py-4 flex flex-wrap items-center justify-between gap-2 bg-white">
              <div>
                <p className="text-sm font-semibold text-ink-900">
                  {accountsById[selected.userId]?.name}
                </p>
                <p className="text-xs text-ink-400">
                  {selected.therapistId
                    ? `Therapist: ${accountsById[selected.therapistId]?.name}`
                    : selected.botEnabled
                    ? "AI guide active"
                    : "AI guide paused"}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setBotEnabled(selected.id, !selected.botEnabled)}
                  className="btn-outline h-8 px-3 text-xs"
                  title="Toggle AI guide"
                >
                  <Bot className="h-4 w-4" />
                  {selected.botEnabled ? "Pause AI" : "Enable AI"}
                </button>

                {selected.therapistId && (
                  <button
                    onClick={() =>
                      unassignTherapist(
                        selected.id,
                        "Therapist removed from the conversation by admin."
                      )
                    }
                    className="btn-outline h-8 px-3 text-xs"
                  >
                    <UserX className="h-4 w-4" />
                    Remove therapist
                  </button>
                )}

                {selected.status === "active" ? (
                  <button
                    onClick={() =>
                      terminateConversation(
                        selected.id,
                        "This conversation has been closed by an administrator."
                      )
                    }
                    className="btn h-8 px-3 text-xs bg-red-50 text-red-700 ring-1 ring-red-200 hover:bg-red-100"
                  >
                    <Power className="h-4 w-4" />
                    Terminate
                  </button>
                ) : (
                  <button
                    onClick={() => resumeConversation(selected.id)}
                    className="btn-primary h-8 px-3 text-xs"
                  >
                    <Power className="h-4 w-4" />
                    Reopen
                  </button>
                )}
              </div>
            </div>

            <ChatThread
              viewerId={adminId}
              conversation={selected}
              messages={selectedMessages}
              accountsById={accountsById}
            />

            <form
              className="border-t border-ink-900/5 bg-white px-4 md:px-6 py-3 flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                const text = String(f.get("t") ?? "").trim();
                if (!text) return;
                sendAdmin(text);
                (e.currentTarget as HTMLFormElement).reset();
              }}
            >
              <input
                name="t"
                placeholder="Send a system note as Admin…"
                className="input"
              />
              <button className="btn-secondary h-11 px-4" type="submit">
                Send
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}

function UsersPanel({ users, conversations }: { users: any[]; conversations: any[] }) {
  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-cream/60">
          <tr className="text-left text-xs uppercase tracking-wider text-ink-500">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Joined</th>
            <th className="px-4 py-3">Chats</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-900/5">
          {users.map((u) => {
            const chats = conversations.filter((c) => c.userId === u.id).length;
            return (
              <tr key={u.id}>
                <td className="px-4 py-3 font-medium text-ink-900">{u.name}</td>
                <td className="px-4 py-3 text-ink-500">{u.email}</td>
                <td className="px-4 py-3 text-ink-400">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">{chats}</td>
              </tr>
            );
          })}
          {users.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-ink-400">
                No users yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

