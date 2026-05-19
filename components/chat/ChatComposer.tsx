"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

type Props = {
  disabled?: boolean;
  placeholder?: string;
  onSend: (text: string) => void;
};

export function ChatComposer({ disabled, placeholder, onSend }: Props) {
  const [text, setText] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const v = text.trim();
    if (!v || disabled) return;
    onSend(v);
    setText("");
  }

  return (
    <form
      onSubmit={submit}
      className="border-t border-ink-900/5 bg-white px-4 md:px-6 py-3 flex items-end gap-3"
    >
      <textarea
        rows={1}
        value={text}
        disabled={disabled}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit(e as any);
          }
        }}
        placeholder={placeholder ?? "Write what's on your mind…"}
        className="flex-1 resize-none rounded-2xl border border-ink-900/10 bg-cream/40 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-midnight-500 focus:outline-none focus:ring-2 focus:ring-midnight-200 max-h-40"
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="btn-primary h-11 px-5 shrink-0"
      >
        <Send className="h-4 w-4" />
        <span className="hidden sm:inline">Send</span>
      </button>
    </form>
  );
}
