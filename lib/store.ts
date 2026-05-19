"use client";

import type { Account, Conversation, Message } from "./types";

const KEYS = {
  accounts: "lopc.accounts",
  sessionId: "lopc.sessionId",
  conversations: "lopc.conversations",
  messages: "lopc.messages",
} as const;

const BOT_REPLY = "Backend under development.";

function uid(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}

function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeWrite(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("lopc:store", { detail: { key } }));
}

export function getAccounts(): Account[] {
  return safeRead<Account[]>(KEYS.accounts, []);
}

export function setAccounts(list: Account[]) {
  safeWrite(KEYS.accounts, list);
}

export function getConversations(): Conversation[] {
  return safeRead<Conversation[]>(KEYS.conversations, []);
}

export function setConversations(list: Conversation[]) {
  safeWrite(KEYS.conversations, list);
}

export function getMessages(): Message[] {
  return safeRead<Message[]>(KEYS.messages, []);
}

export function setMessages(list: Message[]) {
  safeWrite(KEYS.messages, list);
}

export function getSessionId(): string | null {
  return safeRead<string | null>(KEYS.sessionId, null);
}

export function setSessionId(id: string | null) {
  safeWrite(KEYS.sessionId, id);
}

export function seedIfEmpty() {
  if (typeof window === "undefined") return;
  if (getAccounts().length > 0) return;

  const now = Date.now();
  const accounts: Account[] = [
    {
      id: "acc_admin",
      name: "Platform Admin",
      email: "admin@lopc.com",
      password: "admin123",
      role: "admin",
      createdAt: now,
      avatarHue: 220,
    },
    {
      id: "acc_th_sarah",
      name: "Dr. Sarah Ahmed",
      email: "dr.sarah@lopc.com",
      password: "therapist123",
      role: "therapist",
      createdAt: now,
      avatarHue: 140,
      therapist: {
        status: "approved",
        title: "Clinical Psychologist",
        bio: "10+ years working with anxiety, trauma, and culturally-rooted therapy in Pakistan.",
        specialties: ["Anxiety", "Trauma", "CBT"],
        yearsOfExperience: 11,
        credentials: "PhD Clinical Psychology, FJWU. Licensed by PMDC.",
        languages: ["English", "Urdu"],
      },
    },
    {
      id: "acc_th_omar",
      name: "Dr. Omar Khan",
      email: "dr.omar@lopc.com",
      password: "therapist123",
      role: "therapist",
      createdAt: now,
      avatarHue: 30,
      therapist: {
        status: "pending",
        title: "Counseling Psychologist",
        bio: "Specialises in young adults, relationships, and academic stress.",
        specialties: ["Relationships", "Stress", "Young Adults"],
        yearsOfExperience: 5,
        credentials: "MSc Counseling, LUMS. Awaiting license verification.",
        languages: ["English", "Urdu", "Pashto"],
      },
    },
    {
      id: "acc_user_demo",
      name: "Ayesha Demo",
      email: "demo@lopc.com",
      password: "demo123",
      role: "user",
      createdAt: now,
      avatarHue: 280,
    },
  ];
  setAccounts(accounts);

  const conv: Conversation = {
    id: "conv_demo",
    userId: "acc_user_demo",
    status: "active",
    botEnabled: true,
    createdAt: now,
    lastActivity: now,
    title: "First conversation",
  };
  setConversations([conv]);

  const msgs: Message[] = [
    {
      id: uid("m"),
      conversationId: conv.id,
      authorId: "system",
      authorRole: "system",
      text:
        "Welcome to LovedOne PsyCare. This is a safe space. I'm Sukoon, an AI guide here to listen. You can also request a human therapist anytime.",
      createdAt: now,
    },
  ];
  setMessages(msgs);
}

export function createAccount(
  partial: Omit<Account, "id" | "createdAt" | "avatarHue">
): Account {
  const accounts = getAccounts();
  if (accounts.some((a) => a.email.toLowerCase() === partial.email.toLowerCase())) {
    throw new Error("An account with that email already exists.");
  }
  const account: Account = {
    ...partial,
    id: uid("acc"),
    createdAt: Date.now(),
    avatarHue: Math.floor(Math.random() * 360),
  };
  setAccounts([...accounts, account]);
  return account;
}

export function updateAccount(id: string, patch: Partial<Account>) {
  const accounts = getAccounts().map((a) => (a.id === id ? { ...a, ...patch } : a));
  setAccounts(accounts);
}

export function getOrCreateUserConversation(userId: string): Conversation {
  const existing = getConversations().find((c) => c.userId === userId);
  if (existing) return existing;
  const conv: Conversation = {
    id: uid("conv"),
    userId,
    status: "active",
    botEnabled: true,
    createdAt: Date.now(),
    lastActivity: Date.now(),
    title: "Your conversation",
  };
  setConversations([...getConversations(), conv]);
  const greeting: Message = {
    id: uid("m"),
    conversationId: conv.id,
    authorId: "system",
    authorRole: "system",
    text:
      "Welcome. This is your private space. I'm Sukoon, an AI guide. You can request a human therapist anytime.",
    createdAt: Date.now(),
  };
  setMessages([...getMessages(), greeting]);
  return conv;
}

export function updateConversation(id: string, patch: Partial<Conversation>) {
  const list = getConversations().map((c) => (c.id === id ? { ...c, ...patch } : c));
  setConversations(list);
}

export function sendMessage(input: {
  conversationId: string;
  authorId: string;
  authorRole: Message["authorRole"];
  text: string;
}): Message {
  const text = input.text.trim();
  if (!text) throw new Error("Message is empty.");
  const m: Message = {
    id: uid("m"),
    conversationId: input.conversationId,
    authorId: input.authorId,
    authorRole: input.authorRole,
    text,
    createdAt: Date.now(),
  };
  setMessages([...getMessages(), m]);
  updateConversation(input.conversationId, { lastActivity: m.createdAt });
  return m;
}

export function sendBotReplyIfEnabled(conversationId: string): Message | null {
  const conv = getConversations().find((c) => c.id === conversationId);
  if (!conv) return null;
  if (!conv.botEnabled || conv.status !== "active") return null;
  if (conv.therapistId) return null;
  return sendMessage({
    conversationId,
    authorId: "bot",
    authorRole: "bot",
    text: BOT_REPLY,
  });
}

export function sendSystemMessage(conversationId: string, text: string): Message {
  return sendMessage({
    conversationId,
    authorId: "system",
    authorRole: "system",
    text,
  });
}

export function requestTherapist(conversationId: string) {
  updateConversation(conversationId, { requestedTherapistAt: Date.now() });
  sendSystemMessage(
    conversationId,
    "Request sent. A licensed therapist will join this chat as soon as someone is available."
  );
}

export function assignTherapist(conversationId: string, therapistId: string) {
  const acc = getAccounts().find((a) => a.id === therapistId);
  updateConversation(conversationId, {
    therapistId,
    botEnabled: false,
    requestedTherapistAt: undefined,
  });
  sendSystemMessage(
    conversationId,
    `${acc?.name ?? "Your therapist"} has joined the conversation.`
  );
}

export function unassignTherapist(conversationId: string, reason?: string) {
  updateConversation(conversationId, { therapistId: undefined });
  sendSystemMessage(
    conversationId,
    reason ?? "Your therapist has left this conversation. The AI guide is back online."
  );
  updateConversation(conversationId, { botEnabled: true });
}

export function terminateConversation(conversationId: string, reason?: string) {
  updateConversation(conversationId, { status: "terminated", botEnabled: false });
  sendSystemMessage(
    conversationId,
    reason ?? "This conversation has been closed by an administrator."
  );
}

export function resumeConversation(conversationId: string) {
  updateConversation(conversationId, { status: "active", botEnabled: true });
  sendSystemMessage(conversationId, "Conversation reopened.");
}

export function setBotEnabled(conversationId: string, enabled: boolean) {
  updateConversation(conversationId, { botEnabled: enabled });
  sendSystemMessage(
    conversationId,
    enabled ? "AI guide is enabled." : "AI guide has been disabled by an administrator."
  );
}

export function approveTherapist(accountId: string) {
  const acc = getAccounts().find((a) => a.id === accountId);
  if (!acc?.therapist) return;
  updateAccount(accountId, {
    therapist: { ...acc.therapist, status: "approved", suspendedReason: undefined },
  });
}

export function rejectTherapist(accountId: string, reason: string) {
  const acc = getAccounts().find((a) => a.id === accountId);
  if (!acc?.therapist) return;
  updateAccount(accountId, {
    therapist: { ...acc.therapist, status: "suspended", suspendedReason: reason },
  });
}

export function suspendTherapist(accountId: string, reason: string) {
  const acc = getAccounts().find((a) => a.id === accountId);
  if (!acc?.therapist) return;
  updateAccount(accountId, {
    therapist: { ...acc.therapist, status: "suspended", suspendedReason: reason },
  });
  getConversations()
    .filter((c) => c.therapistId === accountId)
    .forEach((c) => unassignTherapist(c.id, `Your therapist has been removed: ${reason}`));
}

export const STORE_EVENT = "lopc:store";
