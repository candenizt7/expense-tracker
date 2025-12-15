import ExpenseForm from '../components/ExpenseForm';

function AddExpense() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Yeni Harcama Ekle</h1>
        <p style={styles.subtitle}>Harcama bilgilerinizi girin</p>
      </div>
      
      <ExpenseForm />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '15px',
    color: '#6b7280',
  },
};

export default AddExpense;