import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LanguageToggle from '../components/common/LanguageToggle';
import { useApp } from '../context/AppContext';

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 text-xs font-semibold text-emerald-900 border border-emerald-100 shadow-sm">
    {children}
  </span>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-white/80 backdrop-blur-sm p-6 shadow-[0_10px_40px_rgba(12,53,43,0.08)] transition-transform duration-200 hover:-translate-y-1">
    <div className="absolute inset-x-0 -top-10 h-24 bg-gradient-to-b from-emerald-50/70 to-transparent" aria-hidden />
    <div className="flex items-center gap-3">
      <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl font-semibold shadow-inner">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-emerald-950">{title}</h3>
    </div>
    <p className="mt-4 text-sm leading-relaxed text-emerald-900/80">{description}</p>
  </div>
);

const StepCard = ({ number, title, description }) => (
  <div className="flex gap-4 items-start">
    <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center justify-center shadow-inner">
      {number}
    </div>
    <div>
      <h4 className="text-base font-semibold text-emerald-950">{title}</h4>
      <p className="text-sm text-emerald-900/80 mt-1">{description}</p>
    </div>
  </div>
);

const StatCard = ({ label, value, detail }) => (
  <div className="rounded-2xl border border-emerald-100 bg-white/80 backdrop-blur-sm p-6 text-center shadow-[0_10px_40px_rgba(12,53,43,0.08)]">
    <div className="text-3xl font-bold text-emerald-900">{value}</div>
    <p className="mt-2 text-sm font-semibold text-emerald-800">{label}</p>
    <p className="text-xs text-emerald-900/70 mt-1">{detail}</p>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useApp();

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f4f1e6] text-emerald-950">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute top-[-10%] left-[10%] h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute top-[20%] right-[5%] h-64 w-64 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="absolute bottom-[-5%] left-[25%] h-64 w-64 rounded-full bg-emerald-100/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-emerald-900 text-white font-semibold flex items-center justify-center">MI</div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-emerald-900">MicroInvest</p>
              <p className="text-xs text-emerald-900/70">{t('landing.brand_tagline', 'Finance for everyone')}</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-emerald-900/80">
            <button onClick={() => scrollToId('features')} className="hover:text-emerald-900 transition-colors">{t('landing.nav.product', 'Product')}</button>
            <button onClick={() => scrollToId('process')} className="hover:text-emerald-900 transition-colors">{t('landing.nav.how', 'How it works')}</button>
            <button onClick={() => scrollToId('benefits')} className="hover:text-emerald-900 transition-colors">{t('landing.nav.benefits', 'Benefits')}</button>
            <button onClick={() => scrollToId('social-proof')} className="hover:text-emerald-900 transition-colors">{t('landing.nav.trust', 'Trust')}</button>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Link to="/login" className="text-sm font-semibold text-emerald-900/80 hover:text-emerald-900">{t('common.log_in', 'Log in')}</Link>
            <button
              onClick={() => navigate('/signup')}
              className="rounded-full bg-emerald-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 hover:bg-emerald-800 transition-colors"
            >
              {t('common.get_started', 'Get started')}
            </button>
          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white/80 backdrop-blur-sm px-6 py-12 sm:px-10 sm:py-14 shadow-[0_18px_60px_rgba(12,53,43,0.12)]">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <Pill>
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {t('landing.nav.product', 'Product')}
              </Pill>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-emerald-950">
                {t('landing.hero.title', 'A calm, confident platform to manage and grow what matters.')}
              </h1>
              <p className="text-lg text-emerald-900/80 max-w-xl">
                {t('landing.hero.subtitle', 'MicroInvest brings structure, clarity, and trust to your financial operations with thoughtful design, reliable workflows, and a focus on real outcomes.')}
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/signup')}
                  className="rounded-full bg-emerald-900 px-5 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-emerald-900/20 hover:bg-emerald-800 transition-colors"
                >
                  {t('landing.hero.primary', 'Start free')}
                </button>
                <button
                  onClick={() => scrollToId('features')}
                  className="rounded-full border border-emerald-200 bg-white px-5 py-3 text-sm sm:text-base font-semibold text-emerald-900 hover:border-emerald-300 transition-colors"
                >
                  {t('landing.hero.secondary', 'See product')}
                </button>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-emerald-900/70">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {t('landing.hero.security', 'Bank-grade security')}
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  {t('landing.hero.support', 'Human support')}
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {t('landing.hero.scale', 'Built for scale')}
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-emerald-100/60 blur-2xl" aria-hidden />
              <div className="absolute -right-8 -bottom-12 h-32 w-32 rounded-full bg-amber-100/60 blur-2xl" aria-hidden />
              <div className="relative rounded-2xl border border-emerald-100 bg-emerald-950 text-white p-6 shadow-[0_18px_60px_rgba(12,53,43,0.25)]">
                <div className="flex items-center justify-between text-sm text-white/80">
                  <p>Live overview</p>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs">Realtime</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="text-xs text-white/60">Assets</p>
                    <p className="mt-2 text-xl font-semibold">₹48.2L</p>
                    <p className="text-xs text-emerald-200">+12.4% vs last month</p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="text-xs text-white/60">Liquidity</p>
                    <p className="mt-2 text-xl font-semibold">₹8.5L</p>
                    <p className="text-xs text-amber-200">3d average</p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="text-xs text-white/60">Confidence</p>
                    <p className="mt-2 text-xl font-semibold">98%</p>
                    <p className="text-xs text-emerald-200">Risk-checked</p>
                  </div>
                </div>
                <div className="mt-6 rounded-xl bg-white/5 p-4">
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <p>Pipeline</p>
                    <p>Healthy</p>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/10">
                    <div className="h-2 w-4/5 rounded-full bg-emerald-300" />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-white/70">
                    <div className="rounded-lg bg-white/10 px-3 py-2">Onboarding</div>
                    <div className="rounded-lg bg-white/10 px-3 py-2">Compliance</div>
                    <div className="rounded-lg bg-white/10 px-3 py-2">Payouts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mt-16 sm:mt-20 lg:mt-24 space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Pill>{t('landing.nav.trust', 'Trust')}</Pill>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-emerald-950">{t('landing.features.heading', 'Clarity, control, and confidence in every workflow.')}</h2>
              <p className="mt-2 text-sm sm:text-base text-emerald-900/75 max-w-2xl">
                {t('landing.features.subheading', 'Purpose-built tools that stay out of your way while keeping you informed.')}
              </p>
            </div>
            <button
              onClick={() => navigate('/signup')}
              className="self-start sm:self-auto rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-900 hover:border-emerald-300 transition-colors"
            >
              {t('common.create_account', 'Create your account')}
            </button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon="🧭"
              title="Guided onboarding"
              description="Role-based checklists, reminders, and approvals keep teams aligned from day one without extra overhead."
            />
            <FeatureCard
              icon="🛡️"
              title="Secure by default"
              description="Multi-layer protection, audit trails, and permissions baked into every action—no add-ons required."
            />
            <FeatureCard
              icon="📊"
              title="Clear oversight"
              description="Live dashboards and concise summaries give leaders the signal they need, minus the noise."
            />
            <FeatureCard
              icon="⚙️"
              title="Configurable workflows"
              description="Adaptable templates that match your processes, from onboarding to compliance to payouts."
            />
            <FeatureCard
              icon="🤝"
              title="Human support"
              description="Specialists on-call with practical guidance—not scripts—whenever you need a second set of eyes."
            />
            <FeatureCard
              icon="🚀"
              title="Ready to scale"
              description="Built to stay fast and reliable as your volume grows, with thoughtful defaults to keep teams moving."
            />
          </div>
        </section>

        {/* How it works */}
        <section id="process" className="mt-16 sm:mt-20 lg:mt-24 rounded-3xl border border-emerald-100 bg-white/80 backdrop-blur-sm p-8 shadow-[0_18px_60px_rgba(12,53,43,0.1)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Pill>{t('landing.nav.how', 'How it works')}</Pill>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-emerald-950">{t('landing.how.heading', 'A simple path to dependable outcomes.')}</h2>
            </div>
            <Link to="/signup" className="text-sm font-semibold text-emerald-800 hover:text-emerald-900">{t('landing.how.subheading', 'Start in minutes →')}</Link>
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <StepCard
              number="1"
              title="Set up"
              description="Define your goals, roles, and guardrails. Import existing data without breaking what works."
            />
            <StepCard
              number="2"
              title="Align"
              description="Assign responsibilities, automate reminders, and keep everyone on the same page with clean comms."
            />
            <StepCard
              number="3"
              title="Execute"
              description="Approve, track, and reconcile with confidence using structured workflows and built-in checks."
            />
            <StepCard
              number="4"
              title="Learn"
              description="Review insights, spot bottlenecks, and continuously improve with clear, actionable data."
            />
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="mt-16 sm:mt-20 lg:mt-24 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <Pill>{t('landing.nav.benefits', 'Benefits')}</Pill>
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950">{t('landing.benefits.heading', 'Built for operators, finance teams, and leaders who need clarity.')}</h2>
            <p className="text-sm sm:text-base text-emerald-900/75">
              {t('landing.benefits.subheading', "Whether you're consolidating tools or establishing process rigor, MicroInvest keeps your workflows tidy and your stakeholders aligned.")}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-100 bg-white/80 p-4 shadow-sm">
                <p className="text-sm font-semibold text-emerald-900">For Finance</p>
                <p className="mt-2 text-sm text-emerald-900/75">Controlled approvals, audit-ready records, and dependable reporting without manual chase.</p>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-white/80 p-4 shadow-sm">
                <p className="text-sm font-semibold text-emerald-900">For Operations</p>
                <p className="mt-2 text-sm text-emerald-900/75">Clear ownership, automated nudges, and consistent execution across distributed teams.</p>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-white/80 p-4 shadow-sm">
                <p className="text-sm font-semibold text-emerald-900">For Leadership</p>
                <p className="mt-2 text-sm text-emerald-900/75">Signal over noise: concise dashboards, outcomes, and risk posture in one place.</p>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-white/80 p-4 shadow-sm">
                <p className="text-sm font-semibold text-emerald-900">For Customers</p>
                <p className="mt-2 text-sm text-emerald-900/75">Reliable delivery and communication that earn trust with every interaction.</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-emerald-950 text-white p-8 shadow-[0_18px_60px_rgba(12,53,43,0.25)]">
            <p className="text-sm text-white/70">Outcome spotlight</p>
            <h3 className="mt-3 text-2xl font-bold">“We trimmed cycle times by 38% while improving oversight.”</h3>
            <p className="mt-3 text-sm text-white/80">Ops Lead, mid-market fintech</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs text-white/60">Cycle time</p>
                <p className="text-2xl font-semibold">-38%</p>
                <p className="text-xs text-emerald-100 mt-1">Across onboarding & payouts</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs text-white/60">Stakeholder trust</p>
                <p className="text-2xl font-semibold">↑</p>
                <p className="text-xs text-emerald-100 mt-1">Fewer escalations, clearer SLAs</p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section id="social-proof" className="mt-16 sm:mt-20 lg:mt-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Pill>Trusted where rigor matters</Pill>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-emerald-950">Teams rely on MicroInvest to stay precise and calm.</h2>
            </div>
            <div className="flex gap-3">
              <button onClick={() => scrollToId('features')} className="hover:text-emerald-900">{t('landing.nav.product', 'Product')}</button>
              <button onClick={() => scrollToId('process')} className="hover:text-emerald-900">{t('landing.nav.how', 'How it works')}</button>
              <button onClick={() => scrollToId('benefits')} className="hover:text-emerald-900">{t('landing.nav.benefits', 'Benefits')}</button>
            </div>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-emerald-100 bg-white/80 p-6 shadow-sm">
              <p className="text-sm text-emerald-900/80">“Calm, clear, and trustworthy. Our auditors finally smiled.”</p>
              <p className="mt-4 text-xs font-semibold text-emerald-900">Head of Finance</p>
              <p className="text-xs text-emerald-900/70">Growth-stage marketplace</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-white/80 p-6 shadow-sm">
              <p className="text-sm text-emerald-900/80">“The playbooks cut onboarding time without adding noise.”</p>
              <p className="mt-4 text-xs font-semibold text-emerald-900">Operations Director</p>
              <p className="text-xs text-emerald-900/70">Logistics platform</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-white/80 p-6 shadow-sm">
              <p className="text-sm text-emerald-900/80">“Leadership gets the signal, teams get the guardrails. It just works.”</p>
              <p className="mt-4 text-xs font-semibold text-emerald-900">COO</p>
              <p className="text-xs text-emerald-900/70">B2B SaaS</p>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="mt-16 sm:mt-20 lg:mt-24 rounded-3xl border border-emerald-100 bg-emerald-900 text-white p-10 shadow-[0_18px_60px_rgba(12,53,43,0.25)] flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-white/70">Ready to begin?</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold">{t('landing.cta.title', 'Ship with confidence, not chaos.')}</h2>
            <p className="mt-2 text-sm sm:text-base text-white/75">{t('landing.cta.subtitle', 'Start with a focused plan, and scale without rework.')}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/signup')}
              className="rounded-full bg-white px-5 py-3 text-sm sm:text-base font-semibold text-emerald-900 shadow-lg shadow-black/10 hover:bg-emerald-50 transition-colors"
            >
              {t('landing.cta.primary', 'Start free')}
            </button>
            <button
              onClick={() => navigate('/login')}
              className="rounded-full border border-white/30 bg-transparent px-5 py-3 text-sm sm:text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              {t('landing.cta.secondary', 'Log in')}
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 sm:mt-16 lg:mt-20 mb-10 grid gap-6 sm:grid-cols-3 sm:items-center text-sm text-emerald-900/80">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-emerald-900 text-white font-semibold flex items-center justify-center">MI</div>
            <div>
              <p className="font-semibold text-emerald-900">MicroInvest</p>
              <p className="text-xs text-emerald-900/70">Purpose-built for modern teams</p>
            </div>
          </div>
          <div className="flex gap-6">
            <button onClick={() => scrollToId('features')} className="hover:text-emerald-900">{t('landing.nav.product', 'Product')}</button>
            <button onClick={() => scrollToId('process')} className="hover:text-emerald-900">{t('landing.nav.how', 'How it works')}</button>
            <button onClick={() => scrollToId('benefits')} className="hover:text-emerald-900">{t('landing.nav.benefits', 'Benefits')}</button>
          </div>
          <div className="flex gap-4 sm:justify-end text-xs text-emerald-900/70">
            <Link to="/login" className="hover:text-emerald-900">{t('landing.footer.support', 'Support')}</Link>
            <span>•</span>
            <Link to="/login" className="hover:text-emerald-900">{t('landing.footer.privacy', 'Privacy')}</Link>
            <span>•</span>
            <Link to="/login" className="hover:text-emerald-900">{t('landing.footer.terms', 'Terms')}</Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
