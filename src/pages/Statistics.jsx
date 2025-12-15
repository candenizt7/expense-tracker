import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

function Statistics() {
  const { expenses } = useContext(ExpenseContext);

  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  // Kategorilere göre toplam
  const categoryTotals = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {});

  // Kategori bilgileri
  const categories = {
    yemek: { icon: '🍔', name: 'Yemek', color: '#f59e0b' },
    ulaşım: { icon: '🚗', name: 'Ulaşım', color: '#3b82f6' },
    fatura: { icon: '💡', name: 'Fatura', color: '#ef4444' },
    eğlence: { icon: '🎮', name: 'Eğlence', color: '#8b5cf6' },
    alışveriş: { icon: '🛒', name: 'Alışveriş', color: '#ec4899' },
    sağlık: { icon: '💊', name: 'Sağlık', color: '#10b981' },
    eğitim: { icon: '📚', name: 'Eğitim', color: '#6366f1' },
    diğer: { icon: '💰', name: 'Diğer', color: '#6b7280' }
  };

  const sortedCategories = Object.entries(categoryTotals)
  .map(([category, amount]) => {
    const categoryInfo = categories[category] || categories.diger;
    const percentage = totalExpense > 0 ? (amount / totalExpense) * 100 : 0;
    
    return {
      category,
      amount,
      percentage,
      ...categoryInfo
    };
  })
  .sort((a, b) => b.amount - a.amount);


  // En çok harcanan kategori
  const topCategory = sortedCategories[0];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>İstatistikler</h1>

      {expenses.length === 0 ? (
        <p style={styles.noData}>Henüz harcama yok. İstatistik gösterilemez.</p>
      ) : (
        <>
          {/* Toplam Özet */}
          <div style={styles.totalCard}>
            <div style={styles.totalIcon}>💰</div>
            <div>
              <p style={styles.totalLabel}>Toplam Harcama</p>
              <p style={styles.totalAmount}>{totalExpense.toFixed(2)} ₺</p>
              <p style={styles.totalCount}>{expenses.length} harcama</p>
            </div>
          </div>

          {/* En Çok Harcanan Kategori */}
          {topCategory && topCategory.percentage !== undefined && (
            <div style={styles.topCategoryCard}>
              <h2 style={styles.sectionTitle}>En Çok Harcanan Kategori</h2>
              <div style={styles.topCategoryContent}>
                <span style={styles.topCategoryIcon}>{topCategory.icon}</span>
                <div>
                  <p style={styles.topCategoryName}>{topCategory.name}</p>
                  <p style={styles.topCategoryAmount}>
                    {topCategory.amount?.toFixed(2) || '0.00'} ₺
                    <span style={styles.topCategoryPercentage}>
                      ({topCategory.percentage?.toFixed(1) || '0'}%)
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Kategori Listesi */}
          <h2 style={styles.sectionTitle}>Kategoriye Göre Harcamalar</h2>
          <div style={styles.categoriesGrid}>
            {sortedCategories.map((cat) => (
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

                <p style={styles.categoryAmount}>
                  {cat.amount?.toFixed(2) || '0.00'} ₺
                </p>

                <div style={styles.progressBar}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${cat.percentage || 0}%`,
                      background: cat.color || '#6b7280'
                    }}
                  />
                </div>
              </div>
            ))}
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