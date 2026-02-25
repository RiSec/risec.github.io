import { useEffect, useMemo, useState } from "react";
import { useRafScrollY } from "../components/useRafScrollY";
import { Section } from "../components/Section";
import { MockShell } from "../components/MockShell";

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function formatLocal(dt: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())} ${pad(dt.getHours())}:${pad(
    dt.getMinutes()
  )}`;
}

function pseudoCommitHash(seed: number) {
  const chars = "0123456789abcdef";
  let out = "";
  let x = seed >>> 0;
  for (let i = 0; i < 10; i++) {
    x = (1664525 * x + 1013904223) >>> 0;
    out += chars[x % chars.length];
  }
  return out;
}

export default function Index() {
  const scrollY = useRafScrollY();
  const heroProgress = clamp(scrollY / 260, 0, 1);
  const [lastLogin, setLastLogin] = useState<string>("<localstorage>から取得");
  const [dailyVisits, setDailyVisits] = useState<number>(0);
  const [seenOnce, setSeenOnce] = useState<boolean>(false);

  useEffect(() => {
    const now = new Date();
    const today = now.toISOString().slice(0, 10);

    const keyLast = "rist_last_login";
    const keySeen = "rist_seen_once";
    const keyVisits = `rist_visits_${today}`;

    const prev = localStorage.getItem(keyLast);
    if (prev) setLastLogin(prev);

    const seen = localStorage.getItem(keySeen) === "1";
    setSeenOnce(seen);

    // count visits per day (simple, local)
    const visits = Number(localStorage.getItem(keyVisits) ?? "0") + 1;
    localStorage.setItem(keyVisits, String(visits));
    setDailyVisits(visits);

    localStorage.setItem(keyLast, formatLocal(now));
  }, []);

  useEffect(() => {
    if (seenOnce) return;

    const target = document.getElementById("contact");
    if (!target) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        localStorage.setItem("rist_seen_once", "1");
        setSeenOnce(true);
        obs.disconnect();
      },
      { threshold: 0.55 }
    );

    obs.observe(target);
    return () => obs.disconnect();
  }, [seenOnce]);

  const consoleLines = useMemo(() => {
    const now = new Date();
    const ts = formatLocal(now);
    const commit = pseudoCommitHash(
      now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate()
    );

    const welcome = seenOnce
      ? `Welcome back, agent. revision <${commit}>`
      : `Welcome to RIST's Homepage revision <${commit}>`;

    return [
      `RIST login: user<${dailyVisits}> <一日の訪問者数>`,
      "Password: ************",
      welcome,
      "",
      "0 packages can be updated.",
      "0 updates are security updates.",
      ""
    ];
  }, [dailyVisits, lastLogin, seenOnce]);

  const visibleLines = clamp(Math.floor((scrollY - 30) / 28), 0, consoleLines.length);

  return (
    <div>
      <section id="home" className="relative scroll-mt-24 min-h-screen px-6 pb-16 pt-10">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col">
          <div className="mt-10">
            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-3">
                <div
                  className="font-mono text-[72px] font-black leading-none tracking-tight md:text-[92px]"
                  style={{
                    opacity: 0.75 + 0.25 * heroProgress,
                    transform: `translateX(${clamp(28 - heroProgress * 28, 0, 28)}px)`
                  }}
                >
                  -RIST
                </div>
                <div className="pb-3 text-sm text-black/55">
                  情報理工学部プロジェクト団体
                  <span className="ml-2 font-mono">Ritsumeikan Security Team</span>
                </div>
              </div>

              <div className="relative mt-2 h-3 w-full">
                <div
                  className="absolute left-0 top-1/2 h-[6px] w-full origin-left -translate-y-1/2 rounded-sm bg-black/70"
                  style={{
                    transform: `scaleX(${heroProgress})`
                  }}
                />
                <div
                  className="absolute left-0 top-1/2 h-[6px] w-full origin-left -translate-y-1/2 rounded-sm opacity-60"
                  style={{
                    transform: `scaleX(${heroProgress})`,
                    backgroundImage:
                      "repeating-linear-gradient(135deg, rgba(255,255,255,0.25) 0 4px, transparent 4px 8px)"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section
        id="information"
        title="INFORMATION"
        subtitle="RiSTはサイバーセキュリティに関する活動や研究をするために2019年に情報理工学部プロジェクト団体として認定された団体です。
2022年からは対面活動を再開し、現在は活発な活動を行っています。"
        mirror={
          <>
            RiSTはサイバーセキュリティに関する活動や研究をするために2019年に情報理工学部プロジェクト団体として認定された団体です。
            <br />
            2022年からは対面活動を再開し、現在は活発な活動を行っています。
          </>
        }
        barSide="left"
      >
        <p className="whitespace-pre-line">
          RiSTはセキュリティを「作ってみる」、「壊してみる」、「直してみる」の3ステップで学びます。
          このデザインは仮置きで、いつでも変えられます。
        </p>
      </Section>

      <Section
        id="member"
        title="MEMBER"
        subtitle="メンバーインフォはここに。 (仮置き)"
        mirror={<>新規入部や活動履歴、タグで検索できるページなどを予定。</>}
        barSide="left"
      >
        <ul className="mt-4 list-disc pl-6">
          <li>ソフトウェアセキュリティ</li>
          <li>CTF / 勉強会</li>
          <li>ツール開発</li>
          <li>イベント運営</li>
        </ul>
      </Section>

      <Section
        id="sponsor"
        title="SPONSOR"
        subtitle="スポンサー情報、協賛のご相談など。 (仮置き)"
        mirror={<>ロゴを並べるタイル、折り畳み形式など、ここも一緒に考えられます。</>}
        barSide="right"
      >
        <p>協賛企業様のご紹介エリア。「バーコード読めるようにする?」などはネタとしてはアリ。</p>
      </Section>

      <Section
        id="faq"
        title="FAQ"
        subtitle="よくある質問と答え。 (仮置き)"
        mirror={<>Q. 初心者でも大丈夫? A. 大丈夫。経験じゃなくて好奇心が大事。</>}
        barSide="left"
      >
        <div className="mt-4 space-y-4">
          <div>
            <div className="font-mono text-sm text-black/60">Q.</div>
            <div>活動日は?</div>
            <div className="mt-2 font-mono text-sm text-black/60">A.</div>
            <div>定期勉強会 + 不定期のハッカソン。</div>
          </div>
          <div>
            <div className="font-mono text-sm text-black/60">Q.</div>
            <div>入部条件は?</div>
            <div className="mt-2 font-mono text-sm text-black/60">A.</div>
            <div>学部学科によらず歓迎。</div>
          </div>
        </div>
      </Section>

      <Section
        id="contact"
        title="CONTACT"
        subtitle={
          seenOnce
            ? "イースターエッグ解除: 一度下まで見た人向けの文面に切り替えました。"
            : "連絡先の仮置き。"
        }
        barSide="right"
      >
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border border-black/10 bg-white/70 p-4 font-mono text-sm text-black/70">
            mail: contact@example.com
          </div>
          <div className="rounded-xl border border-black/10 bg-white/70 p-4 font-mono text-sm text-black/70">
            X: @rist_placeholder
          </div>
        </div>

        <div className="mt-10 text-xs text-black/45">
          メモ: スクロールドリブンのアニメーションは 主に requestAnimationFrame + scrollY で実装。
        </div>
      </Section>

      <Section id="console" title="CONSOLE" barSide="left">
        <div className="mt-auto">
          <div className="max-w-2xl">
            <MockShell
              autoLines={consoleLines}
              revealCount={visibleLines}
              promptUserLabel={`user<${dailyVisits}>`}
            />
          </div>
        </div>
      </Section>

      <footer className="px-6 pb-20">
        <div className="mx-auto max-w-6xl border-t border-black/10 pt-8 text-xs text-black/45">
          RiST / Ritsumeikan Security Team (mock)
        </div>
      </footer>
    </div>
  );
}
