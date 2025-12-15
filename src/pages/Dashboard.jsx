import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import ExpenseCard from "../components/ExpenseCard";

function Dashboard() {
  const { expenses, deleteExpense } = useContext(ExpenseContext);

  const handleDelete = (id) => {
    if (window.confirm("Bu harcamayı silmek istediğinize emin misiniz?")) {
      deleteExpense(id);
      alert("Harcama başarıyla silindi!");
    }
  };

  // 1. Toplam Harcama
  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  // 2. Bu ay
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });
  const thisMonthAmount = thisMonthExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  // 3. Bu hafta
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thisWeekExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= weekAgo && expenseDate <= today;
  });
  const thisWeekAmount = thisWeekExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
  <div style={styles.container}>
    <h1 style={styles.title}>Dashboard</h1>
    
    {/* Özet Kartları */}
    <div style={styles.statsContainer}>
      {/* Toplam */}
      <div style={styles.statCard}>
        <div style={styles.statIcon}>💰</div>
        <div style={styles.statInfo}>
          <p style={styles.statLabel}>Toplam Harcama</p>
          <p style={styles.statAmount}>{totalExpense.toFixed(2)} ₺</p>
          <p style={styles.statCount}>{expenses.length} harcama</p>
        </div>
      </div>
      
      {/* Bu Ay */}
      <div style={styles.statCard}>
        <div style={styles.statIcon}>📅</div>
        <div style={styles.statInfo}>
          <p style={styles.statLabel}>Bu Ay</p>
          <p style={styles.statAmount}>{thisMonthAmount.toFixed(2)} ₺</p>
          <p style={styles.statCount}>{thisMonthExpenses.length} harcama</p>
        </div>
      </div>
      
      {/* Bu Hafta */}
      <div style={styles.statCard}>
        <div style={styles.statIcon}>📊</div>
        <div style={styles.statInfo}>
          <p style={styles.statLabel}>Bu Hafta</p>
          <p style={styles.statAmount}>{thisWeekAmount.toFixed(2)} ₺</p>
          <p style={styles.statCount}>{thisWeekExpenses.length} harcama</p>
        </div>
      </div>
    </div>
    
    {/* Son Harcamalar Başlık */}
    <h2 style={styles.sectionTitle}>Son Harcamalar</h2>
    
    {/* Harcama Listesi */}
    <div style={styles.expenseList}>
      {expenses.length === 0 ? (
        <p style={styles.noExpenses}>Henüz harcama yok. Lütfen harcama ekleyin.</p>
      ) : (
        expenses.map((expense) => (
          <ExpenseCard 
            key={expense.id} 
            expense={expense}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  </div>
);
}

export default Dashboard;

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
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  },
  statCard: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
  },
  statIcon: {
    fontSize: '40px',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statInfo: {
    flex: 1,
  },
  statLabel: {
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: '0 0 4px 0',
    fontWeight: '500',
  },
  statAmount: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#fff',
    margin: '0 0 4px 0',
  },
  statCount: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: 0,
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '20px',
  },
  expenseList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  noExpenses: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#9ca3af',
    padding: '60px 20px',
    background: '#fff',
    borderRadius: '12px',
    border: '2px dashed #e5e7eb',
  },
};