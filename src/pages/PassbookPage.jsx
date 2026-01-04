import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestment } from '../context/InvestmentContext';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/common/BottomNav';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PageShell from '../components/common/PageShell';

/**
 * Passbook Page
 * Complete transaction history in simple format
 */
const PassbookPage = () => {
  const navigate = useNavigate();
  const { transactions, getPortfolioSummary, isLoading, updateInvestmentValues } = useInvestment();
  const { t } = useApp();
  const [activeNav, setActiveNav] = React.useState('passbook');
  const [filter, setFilter] = React.useState('all'); // Add filter state
  const [exporting, setExporting] = React.useState(false);

  // Auto-refresh for updated values
  React.useEffect(() => {
    updateInvestmentValues();
    
    const interval = setInterval(() => {
      updateInvestmentValues();
    }, 10000); // 0.1 minutes
    
    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (page) => {
    setActiveNav(page);
    if (page === 'home') {
      navigate('/home');
    } else {
      navigate(`/${page}`);
    }
  };

  const summary = getPortfolioSummary();

  const downloadCSV = (rows) => {
    const headers = ['Date', 'Type', 'Investment', 'Amount', 'Status'];
    const lines = rows.map((t) => [
      new Date(t.date).toISOString(),
      t.type,
      t.investment || t.investmentName || '',
      t.amount,
      t.status,
    ]);
    const csv = [headers, ...lines]
      .map((r) => r.map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `passbook_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    setExporting(true);
    try {
      downloadCSV(filteredTransactions);
    } finally {
      setExporting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message={t('passbook.loading', 'Loading transactions...')} />;
  }

  const getIcon = (type) => {
    switch (type) {
      case 'credit':
        return '💰';
      case 'debit':
        return '💸';
      case 'interest':
        return '📈';
      default:
        return '📝';
    }
  };

  const totalInvested = summary.totalInvested;
  const totalInterest = summary.totalGain;

  // Filter transactions based on selected filter
  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === 'all') return true;
    if (filter === 'investments') return transaction.type === 'credit';
    if (filter === 'interest') return transaction.type === 'interest';
    if (filter === 'withdrawals') return transaction.type === 'debit' || transaction.type === 'withdrawal';
    return true;
  });

  return (
    <PageShell
      title={t('passbook.title', 'Your Passbook')}
      subtitle={t('passbook.subtitle', 'All transactions in one calm, clear view.')}
      actions={(
        <button
          className="rounded-full border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-emerald-900 hover:border-emerald-300 transition-colors disabled:opacity-60"
          onClick={handleExport}
          disabled={filteredTransactions.length === 0 || exporting}
        >
          {exporting ? '…' : '📄'} {t('passbook.export', 'Export')}
        </button>
      )}
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-emerald-100 bg-white/80 backdrop-blur-sm p-4 shadow-sm">
          <div className="text-xs text-emerald-900/70 mb-1">{t('passbook.total_invested', 'Total invested')}</div>
          <div className="text-2xl font-bold text-emerald-900">₹{totalInvested}</div>
          <p className="text-xs text-emerald-900/60 mt-1">{t('passbook.updated_now', 'Updated now')}</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-white/80 backdrop-blur-sm p-4 shadow-sm">
          <div className="text-xs text-emerald-900/70 mb-1">{t('passbook.interest_earned', 'Interest earned')}</div>
          <div className="text-2xl font-bold text-emerald-800">₹{totalInterest}</div>
          <p className="text-xs text-emerald-900/60 mt-1">{t('passbook.all_time', 'All time')}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', label: t('passbook.filter.all', 'All') },
          { id: 'investments', label: t('passbook.filter.investments', 'Investments') },
          { id: 'interest', label: t('passbook.filter.interest', 'Interest') },
          { id: 'withdrawals', label: t('passbook.filter.withdrawals', 'Withdrawals') },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${
              filter === item.id
                ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm shadow-emerald-900/20'
                : 'bg-white text-emerald-900 border-emerald-200 hover:border-emerald-300'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-10 rounded-2xl border border-dashed border-emerald-200 bg-white/70">
            <span className="text-5xl block mb-3">📭</span>
            <p className="text-emerald-900/75 font-semibold">{t('passbook.empty.title', 'No transactions found')}</p>
            <p className="text-sm text-emerald-900/60">{t('passbook.empty.subtitle', 'Try changing filters or make your first investment.')}</p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="rounded-2xl border border-emerald-100 bg-white/85 backdrop-blur-sm p-4 shadow-[0_10px_32px_rgba(12,53,43,0.06)]"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{getIcon(transaction.type)}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-emerald-950">{transaction.title}</h3>
                    <span className={`font-bold ${
                      transaction.type === 'debit' ? 'text-red-600' : 'text-emerald-800'
                    }`}>
                      {transaction.type === 'debit' ? '-' : '+'}₹{transaction.amount}
                    </span>
                  </div>
                  <p className="text-sm text-emerald-900/70">{transaction.investment}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-emerald-900/70">
                    <span>
                      {new Date(transaction.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="rounded-full bg-emerald-50 text-emerald-800 px-2 py-1 font-semibold">{t('passbook.status', '✓ {status}', { status: transaction.status })}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNav active={activeNav} onNavigate={handleNavigation} />
    </PageShell>
  );
};

export default PassbookPage;
