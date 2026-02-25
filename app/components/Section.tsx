import clsx from "clsx";
import type { ReactNode } from "react";

export function Section(props: {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  mirror?: ReactNode;
  barSide?: "left" | "right";
}) {
  const { id, title, subtitle, children, mirror, barSide = "left" } = props;
  const mainOnRight = barSide === "right";
  const mirrorOnRight = barSide === "left";

  return (
    <section id={id} className="relative scroll-mt-24 min-h-[110vh] overflow-hidden px-6 py-16">
      {/* side bar */}
      <div
        className={clsx(
          "pointer-events-none absolute top-24 h-[70vh] w-[10px] bg-black/60",
          barSide === "left" ? "left-6" : "right-6"
        )}
        aria-hidden="true"
      />
      <div
        className={clsx(
          "pointer-events-none absolute top-24 h-[70vh] w-[40px]",
          barSide === "left" ? "left-10" : "right-10"
        )}
        aria-hidden="true"
      >
        <div className="h-full w-[3px] bg-black/25" />
        <div className="absolute left-[10px] top-0 h-full w-[18px] bg-[repeating-linear-gradient(135deg,rgba(0,0,0,0.22)_0_2px,transparent_2px_7px)] opacity-70" />
        <div className="absolute left-[30px] top-0 h-full w-[2px] bg-black/20" />
        <div
          className={clsx(
            "absolute top-0 -translate-y-6 rotate-90 font-mono text-[10px] tracking-widest text-black/40",
            barSide === "left" ? "left-[-42px]" : "right-[-42px]"
          )}
        >
          r0c7-0x00DE
        </div>
      </div>

      <div className="mx-auto max-w-6xl">
        <div
          className={clsx(
            "max-w-3xl",
            mainOnRight ? "pr-14 ml-auto text-right" : "pl-14 text-left"
          )}
        >
          <h2
            className={clsx(
              "font-mono text-5xl font-black tracking-wideish text-black/70 md:text-6xl",
              mainOnRight ? "text-right" : "text-left"
            )}
          >
            {title}
          </h2>
          {subtitle ? (
            <p
              className={clsx(
                "mt-6 whitespace-pre-line text-sm font-mono text-black/55",
                mainOnRight ? "text-right" : "text-left"
              )}
            >
              {subtitle}
            </p>
          ) : null}
          <div className="mt-6 text-lg leading-relaxed text-black/80">{children}</div>
        </div>

        {mirror ? (
          <div className="mt-24">
            <div
              className={clsx(
                "max-w-3xl",
                mirrorOnRight ? "ml-auto pr-14 text-right" : "pl-14 text-left"
              )}
            >
              <h3
                className={clsx(
                  "font-mono text-5xl font-black tracking-wideish text-black/65 md:text-6xl",
                  mirrorOnRight ? "text-right" : "text-left"
                )}
              >
                {title}
              </h3>
              <div
                className={clsx(
                  "mt-6 text-lg leading-relaxed text-black/75",
                  mirrorOnRight ? "text-right" : "text-left"
                )}
              >
                {mirror}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
