"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

type InstallMethod = "curl" | "npm" | "bun" | "brew" | "npx";

const installCommands: Record<
  InstallMethod,
  { command: string; highlight: string }
> = {
  curl: {
    command: "curl -fsSL https://supercli.vercel.app/install",
    highlight: "supercli.vercel.app/install",
  },
  npm: {
    command: "npm install -g supercode-cli@latest",
    highlight: "supercode-cli",
  },
  bun: { command: "bun install -g supercode-cli", highlight: "supercode-cli" },
  npx: { command: "npx supercode-cli", highlight: "supercode-cli" },
  brew: { command: "brew install supercode", highlight: "supercode" },
};

const DOCS_URL =
  process.env.NEXT_PUBLIC_DOCS_URL || "http://localhost:3001/docs/intro";

const HeroSection = () => {
  const [copied, setCopied] = useState(false);
  const [activeMethod, setActiveMethod] = useState<InstallMethod>("curl");

  const handleCopy = () => {
    const fullCommand =
      activeMethod === "curl"
        ? `${installCommands[activeMethod].command} | bash`
        : installCommands[activeMethod].command;
    navigator.clipboard.writeText(fullCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <section className="min-h-screen flex flex-col justify-center items-center px-4">
        <div className="max-w-[900px] mx-auto w-full text-center flex flex-col justify-center gap-y-12">
          <div className="flex flex-col justify-center gap-y-4">
            {/* Sponsored by tag */}
            <div className="flex justify-center">
              <a
                href="https://github.com/yashdev9274/supercli"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-base rounded-md hover:bg-primary/15 transition-colors"
              >
                <svg
                  viewBox="0 0 115 100"
                  height="10"
                  width="11"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="m57.5 0 57.5 100H0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>sponsored by vercel</span>
              </a>
            </div>

            {/* Main headline */}
            <h1 className="text-[28px] md:text-6xl text-[#A1A1AA] tracking-tighter font-medium">
              The open source SWE agent
            </h1>

            {/* Subheadline */}
            <p className="text-[17px] md:text-lg text-white/60 tracking-tight font-medium max-w-[700px] mx-auto">
              Free models included or connect any model from any provider,
              <br />
              including Claude, GPT, Gemini and more.
            </p>
          </div>

          <div className="w-full max-w-[540px] mx-auto flex flex-col justify-center gap-y-4">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              {/* Tabs */}
              <div className="flex items-center border-b border-border">
                {(Object.keys(installCommands) as InstallMethod[]).map(
                  (method) => (
                    <button
                      key={method}
                      onClick={() => setActiveMethod(method)}
                      className={`px-5 py-3 text-[14px] font-mono transition-colors relative ${
                        activeMethod === method
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {method}
                    </button>
                  ),
                )}
              </div>

              {/* Command display */}
              <div className="flex items-center justify-between px-5 py-4">
                <code className="text-[14px] font-mono">
                  <span className="text-muted-foreground">
                    {
                      installCommands[activeMethod].command.split(
                        installCommands[activeMethod].highlight,
                      )[0]
                    }
                  </span>
                  <span className="text-primary font-semibold">
                    {installCommands[activeMethod].highlight}
                  </span>
                  {activeMethod === "curl" && (
                    <>
                      <span className="text-muted-foreground"> | </span>
                      <span className="text-foreground">bash</span>
                    </>
                  )}
                </code>
                <button
                  onClick={handleCopy}
                  className="ml-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <p className="text-[14px] text-muted-foreground">
              Or read the{" "}
              <a
                href={DOCS_URL}
                className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
              >
                documentation
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
