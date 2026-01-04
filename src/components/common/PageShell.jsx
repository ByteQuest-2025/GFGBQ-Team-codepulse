import React from 'react';
import LanguageToggle from './LanguageToggle';

const DecorativeBg = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
    <div className="absolute top-[-15%] left-[5%] h-56 w-56 rounded-full bg-emerald-200/30 blur-3xl" />
    <div className="absolute top-[25%] right-[0%] h-56 w-56 rounded-full bg-amber-200/30 blur-3xl" />
    <div className="absolute bottom-[-10%] left-[30%] h-64 w-64 rounded-full bg-emerald-100/30 blur-3xl" />
  </div>
);

const PageShell = ({ title, subtitle, actions, children }) => {
  return (
    <div className="relative min-h-screen bg-[#f4f1e6] text-emerald-950 pb-24">
      <DecorativeBg />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-6">
        {(title || subtitle || actions) && (
          <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-6">
            <div>
              {title && <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-emerald-950">{title}</h1>}
              {subtitle && <p className="mt-1 text-sm sm:text-base text-emerald-900/75 max-w-2xl">{subtitle}</p>}
            </div>
            <div className="flex flex-wrap items-start gap-3 justify-end">
              <LanguageToggle />
              {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
            </div>
          </header>
        )}
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default PageShell;
