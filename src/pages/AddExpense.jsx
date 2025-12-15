import ExpenseForm from '../components/ExpenseForm';
import { useLocation } from 'react-router-dom';

function AddExpense() {
  const location = useLocation();
  const expenseToEdit = location.state?.expenseToEdit || null;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          {expenseToEdit ? 'Harcamayı Düzenle' : 'Yeni Harcama Ekle'}
        </h1>
        <p style={styles.subtitle}>
          {expenseToEdit ? 'Harcama bilgilerini güncelleyin' : 'Harcama bilgilerinizi girin'}
        </p>
      </div>
      
      <ExpenseForm expenseToEdit={expenseToEdit} />
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