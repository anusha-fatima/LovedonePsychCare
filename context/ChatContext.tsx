"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  STORE_EVENT,
  getConversations,
  getMessages,
} from "@/lib/store";
import type { Conversation, Message } from "@/lib/types";

type ChatCtx = {
  ready: boolean;
  conversations: Conversation[];
  messages: Message[];
  refresh: () => void;
};

const Ctx = createContext<ChatCtx | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const refresh = useCallback(() => {
    setConversations(getConversations());
    setMessages(getMessages());
  }, []);

  useEffect(() => {
    refresh();
    setReady(true);
    const onStore = () => refresh();
    window.addEventListener(STORE_EVENT, onStore);
    window.addEventListener("storage", onStore);
    return () => {
      window.removeEventListener(STORE_EVENT, onStore);
      window.removeEventListener("storage", onStore);
    };
  }, [refresh]);

  const value = useMemo<ChatCtx>(
    () => ({ ready, conversations, messages, refresh }),
    [ready, conversations, messages, refresh]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useChat() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
