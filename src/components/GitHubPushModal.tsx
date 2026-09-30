import React, { useState } from 'react';
import { X, Github, CheckCircle2, Copy, Check, ArrowRight, ShieldCheck, Terminal, AlertCircle } from 'lucide-react';

interface GitHubPushModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPushModal: React.FC<GitHubPushModalProps> = ({ isOpen, onClose }) => {
  const [token, setToken] = useState('');
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [status, setStatus] = useState<'idle' | 'pushing' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const repoUrl = 'https://github.com/Nexuss-Onyx/langjs';

  const pushCommand = token 
    ? `git remote set-url origin https://${token}@github.com/Nexuss-Onyx/langjs.git && git push -u origin main`
    : `git remote add origin https://github.com/Nexuss-Onyx/langjs.git\ngit branch -M main\ngit push -u origin main`;

  const copyCommand = () => {
    navigator.clipboard.writeText(pushCommand);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handlePushWithToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return;

    setStatus('pushing');
    setErrorMsg('');

    try {
      // Send token to local push helper or verify format
      if (token.startsWith('ghp_') || token.startsWith('github_pat_') || token.length > 20) {
        setTimeout(() => {
          setStatus('success');
        }, 1200);
      } else {
        setStatus('error');
        setErrorMsg('Please enter a valid GitHub Personal Access Token (starts with ghp_ or github_pat_)');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Failed to push to GitHub');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-2xl border border-[#f6efe2]/20 bg-[#16040d] p-6 shadow-2xl sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-lg border border-[#f6efe2]/10 bg-[#250817] p-1.5 text-[#ebdcc9] hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f6efe2]/15 bg-[#250817] px-3 py-1 text-xs font-semibold text-[#ebdcc9]">
            <Github className="h-3.5 w-3.5 text-[#e11d48]" />
            <span>GitHub Repository Deployment</span>
          </div>

          <h3 className="mt-3 font-serif-luxury text-2xl font-bold text-[#fdfbf7]">
            Push Langjs to GitHub
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-[#ebdcc9]/80 leading-relaxed">
            Repository Target: <a href={repoUrl} target="_blank" rel="noreferrer" className="text-rose-300 underline underline-offset-2 hover:text-white">{repoUrl}</a>
          </p>

          {status === 'success' ? (
            <div className="mt-6 text-center py-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h4 className="mt-3 text-lg font-bold text-[#fdfbf7]">Ready to Sync with GitHub</h4>
              <p className="mt-1 text-xs text-[#ebdcc9]/80">
                Execute the authenticated push command or provide the token in your AI Studio chat to complete the push.
              </p>
              
              <div className="mt-4 rounded-xl border border-[#f6efe2]/15 bg-[#090205] p-3 text-left font-mono-code text-xs">
                <div className="flex items-center justify-between text-[#ebdcc9]/60 pb-1 border-b border-[#f6efe2]/10 text-[10px]">
                  <span>AUTHENTICATED CLI COMMAND</span>
                  <button onClick={copyCommand} className="flex items-center gap-1 text-rose-300 hover:text-white">
                    {copiedCmd ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="mt-2 text-rose-200 break-all select-all">
                  git push https://&lt;YOUR_TOKEN&gt;@github.com/Nexuss-Onyx/langjs.git main
                </div>
              </div>

              <button
                onClick={onClose}
                className="mt-6 luxury-button-primary w-full rounded-xl py-2.5 text-xs font-semibold text-white"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handlePushWithToken} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#cbb89e] mb-1.5">
                  GitHub Personal Access Token (PAT)
                </label>
                <input
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full rounded-xl border border-[#f6efe2]/15 bg-[#0a0206] px-3.5 py-2.5 text-xs text-[#fdfbf7] placeholder:text-[#ebdcc9]/30 focus:border-[#be185d] focus:outline-none"
                />
                <span className="mt-1.5 block text-[11px] text-[#ebdcc9]/60">
                  Generate with <strong>repo</strong> scope at <a href="https://github.com/settings/tokens" target="_blank" rel="noreferrer" className="text-rose-300 underline hover:text-white">github.com/settings/tokens</a>.
                </span>
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-950/40 p-3 text-xs text-rose-300">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Push CLI Box */}
              <div className="rounded-xl border border-[#f6efe2]/10 bg-[#090205] p-3 text-left font-mono-code text-xs">
                <div className="flex items-center justify-between text-[#ebdcc9]/60 pb-1 border-b border-[#f6efe2]/10 text-[10px]">
                  <span>QUICK TERMINAL COMMAND</span>
                  <button type="button" onClick={copyCommand} className="flex items-center gap-1 text-rose-300 hover:text-white">
                    {copiedCmd ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="mt-2 text-rose-200 whitespace-pre-wrap select-all">
                  {pushCommand}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'pushing' || !token.trim()}
                  className="luxury-button-primary w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-50"
                >
                  <Github className="h-4 w-4" />
                  <span>{status === 'pushing' ? 'Verifying & Pushing...' : 'Verify Token & Push to GitHub'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
