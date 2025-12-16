import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

function Statistics() {
  const { expenses } = useContext(ExpenseContext);
  console.log('TÜM HARCAMALAR:', expenses);
console.log('HARCAMA KATEGORİLERİ:', expenses.map(e => e.category));

  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  // Gelir ve gider kategorileri
  const gelirKategorileri = ['maas', 'freelance', 'yatirim', 'hediye', 'diger-gelir'];
  const giderKategorileri = ['yemek', 'ulasim', 'fatura', 'eglence', 'alisveris', 'saglik', 'egitim', 'diger'];
  console.log('Aranan gider kategorileri:', giderKategorileri);

  // Gelir ve gider ayrı hesapla
  const incomeExpenses = expenses.filter(e => gelirKategorileri.includes(e.category));
  const expenseExpenses = expenses.filter(e => giderKategorileri.includes(e.category));

  const totalIncome = incomeExpenses.reduce((t, e) => t + e.amount, 0);
  const totalExpenseAmount = expenseExpenses.reduce((t, e) => t + e.amount, 0);

  // Gelir kategorileri için toplam
  const incomeCategoryTotals = incomeExpenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {});

  // Gider kategorileri için toplam
  const expenseCategoryTotals = expenseExpenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {});

  // Kategori bilgileri
  const categories = {
    //Gider kategorileri
    yemek: { icon: '🍔', name: 'Yemek', color: '#f59e0b', type: 'gider' },
    ulaşım: { icon: '🚗', name: 'Ulaşım', color: '#3b82f6', type: 'gider' },
    fatura: { icon: '💡', name: 'Fatura', color: '#ef4444', type: 'gider' },
    eğlence: { icon: '🎮', name: 'Eğlence', color: '#8b5cf6', type: 'gider' },
    alışveriş: { icon: '🛒', name: 'Alışveriş', color: '#ec4899', type: 'gider' },
    sağlık: { icon: '💊', name: 'Sağlık', color: '#10b981', type: 'gider' },
    eğitim: { icon: '📚', name: 'Eğitim', color: '#6366f1', type: 'gider' },
    diğer: { icon: '💰', name: 'Diğer', color: '#6b7280', type: 'gider' },

    //Gelir kategorileri
    maas: { icon: '💼', name: 'Maaş', color: '#10b981', type: 'gelir' },
    freelance: { icon: '💻', name: 'Freelance', color: '#059669', type: 'gelir' },
    yatirim: { icon: '📈', name: 'Yatırım', color: '#14b8a6', type: 'gelir' },
    hediye: { icon: '🎁', name: 'Hediye', color: '#22c55e', type: 'gelir' },
    'diger-gelir': { icon: '💸', name: 'Diğer Gelir', color: '#16a34a', type: 'gelir' },
  };

  // Gelir kategorileri sıralı
  const sortedIncomeCategories = Object.entries(incomeCategoryTotals)
    .map(([category, amount]) => {
      const categoryInfo = categories[category] || categories.diger;
      const percentage = totalIncome > 0 ? (amount / totalIncome) * 100 : 0;

      return {
        category,
        amount,
        percentage,
        ...categoryInfo
      };
    })
    .sort((a, b) => b.amount - a.amount);

  // Gider kategorileri sıralı
  const sortedExpenseCategories = Object.entries(expenseCategoryTotals)
    .map(([category, amount]) => {
      const categoryInfo = categories[category] || categories.diger;
      const percentage = totalExpenseAmount > 0 ? (amount / totalExpenseAmount) * 100 : 0;

      return {
        category,
        amount,
        percentage,
        ...categoryInfo
      };
    })
    .sort((a, b) => b.amount - a.amount);


  // En çok harcanan kategori
  const topIncomeCategory = sortedIncomeCategories[0];
  const topExpenseCategory = sortedExpenseCategories[0];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>İstatistikler</h1>

      {expenses.length === 0 ? (
        <p style={styles.noData}>Henüz harcama yok. İstatistik gösterilemez.</p>
      ) : (
        <>
          {/* Toplam Gelir */}
          <div style={{
            ...styles.totalCard,
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          }}>
            <div style={styles.totalIcon}>💵</div>
            <div>
              <p style={styles.totalLabel}>Toplam Gelir</p>
              <p style={styles.totalAmount}>+{totalIncome.toFixed(2)} ₺</p>
              <p style={styles.totalCount}>{incomeExpenses.length} işlem</p>
            </div>
          </div>

          {/* Toplam Gider */}
          <div style={{
            ...styles.totalCard,
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          }}>
            <div style={styles.totalIcon}>💸</div>
            <div>
              <p style={styles.totalLabel}>Toplam Gider</p>
              <p style={styles.totalAmount}>-{totalExpenseAmount.toFixed(2)} ₺</p>
              <p style={styles.totalCount}>{expenseExpenses.length} işlem</p>
            </div>
          </div>

          {/* En Çok Gelir */}
          {topIncomeCategory && (
            <div style={{
              ...styles.topCategoryCard,
              borderColor: '#10b981',
            }}>
              <h2 style={styles.sectionTitle}>💵 En Çok Gelir Getiren</h2>
              <div style={styles.topCategoryContent}>
                <span style={styles.topCategoryIcon}>{topIncomeCategory.icon}</span>
                <div>
                  <p style={styles.topCategoryName}>{topIncomeCategory.name}</p>
                  <p style={{ ...styles.topCategoryAmount, color: '#10b981' }}>
                    +{topIncomeCategory.amount?.toFixed(2) || '0.00'} ₺
                    <span style={styles.topCategoryPercentage}>
                      ({topIncomeCategory.percentage?.toFixed(1) || '0'}%)
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* En Çok Gider */}
          {topExpenseCategory && (
            <div style={{
              ...styles.topCategoryCard,
              borderColor: '#ef4444',
            }}>
              <h2 style={styles.sectionTitle}>💸 En Çok Gider Yapılan</h2>
              <div style={styles.topCategoryContent}>
                <span style={styles.topCategoryIcon}>{topExpenseCategory.icon}</span>
                <div>
                  <p style={styles.topCategoryName}>{topExpenseCategory.name}</p>
                  <p style={{ ...styles.topCategoryAmount, color: '#ef4444' }}>
                    -{topExpenseCategory.amount?.toFixed(2) || '0.00'} ₺
                    <span style={styles.topCategoryPercentage}>
                      ({topExpenseCategory.percentage?.toFixed(1) || '0'}%)
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Kategori Listesi */}
          <h2 style={styles.sectionTitle}>Kategoriye Göre Harcamalar</h2>
          {/* Gelir Kategorileri */}
          <h2 style={styles.sectionTitle}>💵 Gelir Kategorileri</h2>
          <div style={styles.categoriesGrid}>
            {sortedIncomeCategories.length === 0 ? (
              <p style={styles.noData}>Henüz gelir kaydı yok.</p>
            ) : (
              sortedIncomeCategories.map((cat) => (
                <div key={cat.category} style={styles.categoryCard}>
                  <div style={styles.categoryHeader}>
                    <div style={styles.categoryInfo}>
                      <span style={styles.categoryIcon}>{cat.icon || '💰'}</span>
                      <span style={styles.categoryName}>{cat.name || 'Kategori'}</span>
                    </div>
                    <span style={styles.categoryPercentage}>
                      {cat.percentage?.toFixed(1) || '0'}%
                    </span>
                  </div>

                  <p style={{ ...styles.categoryAmount, color: '#10b981' }}>
                    +{cat.amount?.toFixed(2) || '0.00'} ₺
                  </p>

                  <div style={styles.progressBar}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${cat.percentage || 0}%`,
                        background: cat.color || '#10b981'
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Gider Kategorileri */}
          <h2 style={styles.sectionTitle}>💸 Gider Kategorileri</h2>
          <div style={styles.categoriesGrid}>
            {sortedExpenseCategories.length === 0 ? (
              <p style={styles.noData}>Henüz gider kaydı yok.</p>
            ) : (
              sortedExpenseCategories.map((cat) => (
                <div key={cat.category} style={styles.categoryCard}>
                  <div style={styles.categoryHeader}>
                    <div style={styles.categoryInfo}>
                      <span style={styles.categoryIcon}>{cat.icon || '💰'}</span>
                      <span style={styles.categoryName}>{cat.name || 'Kategori'}</span>
                    </div>
                    <span style={styles.categoryPercentage}>
                      {cat.percentage?.toFixed(1) || '0'}%
                    </span>
                  </div>

                  <p style={{ ...styles.categoryAmount, color: '#ef4444' }}>
                    -{cat.amount?.toFixed(2) || '0.00'} ₺
                  </p>

                  <div style={styles.progressBar}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${cat.percentage || 0}%`,
                        background: cat.color || '#ef4444'
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Statistics;

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '30px',
  },
  noData: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#9ca3af',
    padding: '60px 20px',
    background: '#fff',
    borderRadius: '12px',
    border: '2px dashed #e5e7eb',
  },
  totalCard: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    borderRadius: '16px',
    padding: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '30px',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
  },
  totalIcon: {
    fontSize: '50px',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalLabel: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: '0 0 8px 0',
  },
  totalAmount: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#fff',
    margin: '0 0 4px 0',
  },
  totalCount: {
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: 0,
  },
  topCategoryCard: {
    background: '#fff',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '30px',
    border: '2px solid #10b981',
  },
  topCategoryContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginTop: '12px',
  },
  topCategoryIcon: {
    fontSize: '48px',
  },
  topCategoryName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    margin: '0 0 4px 0',
  },
  topCategoryAmount: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#10b981',
    margin: 0,
  },
  topCategoryPercentage: {
    fontSize: '16px',
    color: '#6b7280',
    marginLeft: '8px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '20px',
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  categoryCard: {
    background: '#fff',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #f3f4f6',
  },
  categoryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  categoryInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  categoryIcon: {
    fontSize: '24px',
  },
  categoryName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
  },
  categoryPercentage: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#6b7280',
  },
  categoryAmount: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#10b981',
    margin: '0 0 12px 0',
  },
  progressBar: {
    width: '100%',
    height: '8px',
    background: '#f3f4f6',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },
};