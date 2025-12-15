import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import ExpenseCard from "../components/ExpenseCard";

function Expenses() {
  const { expenses } = useContext(ExpenseContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredExpenses = expenses
    .filter((expense) =>
      expense.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((expense) =>
      categoryFilter === 'all' ? true : expense.category === categoryFilter
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'amount') {
        return b.amount - a.amount;
      }
      return 0;
    });

  return (
  <div style={styles.container}>
    <h1 style={styles.title}>Tüm Harcamalar</h1>
    
    {/* Filtreler */}
    <div style={styles.filtersContainer}>
      {/* Arama */}
      <input
        type="text"
        placeholder="🔍 Harcama ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />
      
      {/* Kategori Filtresi */}
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        style={styles.select}
      >
        <option value="all">Tüm Kategoriler</option>
        <option value="yemek">🍔 Yemek</option>
        <option value="ulaşım">🚗 Ulaşım</option>
        <option value="fatura">💡 Fatura</option>
        <option value="eğlence">🎮 Eğlence</option>
        <option value="alışveriş">🛒 Alışveriş</option>
        <option value="sağlık">💊 Sağlık</option>
        <option value="eğitim">📚 Eğitim</option>
        <option value="diğer">💰 Diğer</option>
      </select>
      
      {/* Sıralama */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={styles.select}
      >
        <option value="date">📅 Tarihe Göre</option>
        <option value="amount">💰 Tutara Göre</option>
      </select>
    </div>
    
    {/* Sonuç Sayısı */}
    <p style={styles.resultCount}>
      {filteredExpenses.length} harcama bulundu
    </p>
    
    {/* Harcama Listesi */}
    <div style={styles.expenseList}>
      {filteredExpenses.length === 0 ? (
        <p style={styles.noResults}>Harcama bulunamadı.</p>
      ) : (
        filteredExpenses.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))
      )}
    </div>
  </div>
);
}

export default Expenses;

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
  filtersContainer: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    gap: '15px',
    marginBottom: '20px',
  },
  searchInput: {
    padding: '12px 16px',
    fontSize: '15px',
    borderRadius: '10px',
    border: '1px solid #e5e7eb',
    outline: 'none',
  },
  select: {
    padding: '12px 16px',
    fontSize: '15px',
    borderRadius: '10px',
    border: '1px solid #e5e7eb',
    outline: 'none',
    cursor: 'pointer',
    background: '#fff',
  },
  resultCount: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '20px',
  },
  expenseList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  noResults: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#9ca3af',
    padding: '60px 20px',
    background: '#fff',
    borderRadius: '12px',
    border: '2px dashed #e5e7eb',
  },
};