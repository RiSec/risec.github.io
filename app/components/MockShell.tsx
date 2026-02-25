import { useEffect, useMemo, useRef, useState } from "react";

type ShellLine =
  | { kind: "output"; text: string }
  | { kind: "command"; text: string };

function nowLocal() {
  const dt = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())} ${pad(dt.getHours())}:${pad(
    dt.getMinutes()
  )}`;
}

function normalize(cmd: string) {
  return cmd.trim().replace(/\s+/g, " ");
}

function runCommand(cmdRaw: string, who: string) {
  const cmd = normalize(cmdRaw);
  if (!cmd) return { clear: false, out: [] as string[] };

  const [bin, ...rest] = cmd.split(" ");
  const arg = rest.join(" ");

  switch (bin) {
    case "help":
      return {
        clear: false,
        out: [
          "available commands:",
          "  help            show this help",
          "  ls              list sections",
          "  cat <name>      show stub content",
          "  whoami          print current user",
          "  date            print local time",
          "  clear           clear the screen"
        ]
      };
    case "ls":
      return { clear: false, out: ["information member sponsor faq contact"] };
    case "cat": {
      const name = arg || "";
      const map: Record<string, string[]> = {
        information: [
          "RiST: cyber security activities / research",
          "status: active",
          "note: design is placeholder"
        ],
        member: ["member list: (placeholder)", "- software security", "- CTF", "- tooling"],
        sponsor: ["sponsor: (placeholder)", "contact us for collaboration"],
        faq: ["Q: beginners ok?", "A: ok.", "Q: when?", "A: regular study + irregular hacks"],
        contact: ["mail: contact@example.com", "X: @rist_placeholder"]
      };
      if (!name) return { clear: false, out: ["usage: cat <information|member|sponsor|faq|contact>"] };
      if (!map[name]) return { clear: false, out: [`cat: ${name}: No such file or directory`] };
      return { clear: false, out: map[name] };
    }
    case "date":
      return { clear: false, out: [nowLocal()] };
    case "whoami":
      return { clear: false, out: [who] };
    case "clear":
      return { clear: true, out: [] };
    default:
      return { clear: false, out: [`command not found: ${bin}`] };
  }
}

export function MockShell(props: {
  /** Lines that appear automatically (e.g. login banner). */
  autoLines: string[];
  /** How many autoLines are revealed (0..autoLines.length). */
  revealCount: number;
  /** Prompt label, e.g. "user<3>" */
  promptUserLabel: string;
}) {
  const { autoLines, revealCount, promptUserLabel } = props;

  const [lines, setLines] = useState<ShellLine[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);

  const revealedRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const boundedReveal = useMemo(
    () => Math.max(0, Math.min(autoLines.length, revealCount)),
    [autoLines.length, revealCount]
  );

  // Append newly revealed auto lines.
  useEffect(() => {
    const prev = revealedRef.current;
    if (boundedReveal <= prev) return;

    const nextChunk = autoLines.slice(prev, boundedReveal);
    revealedRef.current = boundedReveal;

    setLines((cur) => [
      ...cur,
      ...nextChunk.map((t) => ({ kind: "output", text: t || "\u00a0" }) as ShellLine)
    ]);
  }, [autoLines, boundedReveal]);

  // Keep view pinned to bottom.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lines.length]);

  const prompt = `${promptUserLabel} ~`;

  const submit = (cmd: string) => {
    const normalized = normalize(cmd);
    if (!normalized) return;

    setLines((cur) => [...cur, { kind: "command", text: `>> ${normalized}` }]);
    setCmdHistory((cur) => [...cur, normalized]);
    setHistoryIdx(-1);

    const result = runCommand(normalized, promptUserLabel);
    if (result.clear) {
      // Clear typed history but keep the already-revealed banner.
      const banner = autoLines.slice(0, boundedReveal).map((t) => ({ kind: "output", text: t || "\u00a0" }));
      setLines(banner);
      revealedRef.current = boundedReveal;
      return;
    }

    if (result.out.length) {
      setLines((cur) => [...cur, ...result.out.map((t) => ({ kind: "output", text: t }))]);
    }
  };

  return (
    <div
      className="rounded-xl border border-black/10 bg-white/60 p-5 font-mono text-[13px] leading-relaxed text-black/70 backdrop-blur"
      aria-label="mock shell"
      onMouseDown={() => inputRef.current?.focus()}
    >
      <div className="mb-2 text-[12px] text-black/50">{prompt}  (type: help)</div>

      <div ref={scrollRef} className="max-h-[240px] overflow-y-auto pr-2" style={{ scrollbarGutter: "stable" }}>
        {lines.map((l, i) => (
          <div
            key={i}
            className={l.kind === "command" ? "text-black/80" : "text-black/65"}
            style={{ whiteSpace: "pre-wrap" }}
          >
            {l.text}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="text-black/60">&gt;&gt;</span>
        <input
          ref={inputRef}
          className="w-full bg-transparent outline-none placeholder:text-black/25"
          value={input}
          placeholder="ls / help / cat information"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const cmd = input;
              setInput("");
              submit(cmd);
              return;
            }

            // history navigation
            if (e.key === "ArrowUp") {
              e.preventDefault();
              if (!cmdHistory.length) return;
              const next = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
              setHistoryIdx(next);
              setInput(cmdHistory[next] ?? "");
              return;
            }
            if (e.key === "ArrowDown") {
              e.preventDefault();
              if (!cmdHistory.length) return;
              if (historyIdx === -1) return;
              const next = historyIdx + 1;
              if (next >= cmdHistory.length) {
                setHistoryIdx(-1);
                setInput("");
              } else {
                setHistoryIdx(next);
                setInput(cmdHistory[next] ?? "");
              }
            }
          }}
        />
      </div>
    </div>
  );
}
