function ExpenseCard({ expense, onDelete }) {
    // Kategori bilgilerini al
    const getCategoryInfo = (category) => {
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
        return categories[category] || categories.diger;
    };

    const categoryInfo = getCategoryInfo(expense.category);

    // Tarih formatlama
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div style={styles.card}>
            <div style={styles.header}>
                <div style={styles.categoryBadge}>
                    <span style={styles.categoryIcon}>{categoryInfo.icon}</span>
                    <span style={styles.categoryName}>{categoryInfo.name}</span>
                </div>
                <div style={styles.amount}>
                    {expense.amount.toFixed(2)} ₺
                </div>
            </div>

            <div style={styles.body}>
                <p style={styles.description}>{expense.description}</p>
                <p style={styles.date}>{formatDate(expense.date)}</p>
            </div>

            <button
                onClick={() => onDelete(expense.id)}
                style={styles.deleteButton}
            >
                🗑️
            </button>
        </div>
    );
}

const styles = {
    card: {
        background: '#fff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        border: '1px solid #f3f4f6',
        transition: 'all 0.2s',
        cursor: 'pointer',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
    },
    categoryBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: '#f9fafb',
        padding: '6px 12px',
        borderRadius: '8px',
    },
    categoryIcon: {
        fontSize: '18px',
    },
    categoryName: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#374151',
    },
    amount: {
        fontSize: '20px',
        fontWeight: '700',
        color: '#10b981',
    },
    body: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    description: {
        fontSize: '15px',
        color: '#111827',
        fontWeight: '500',
        margin: 0,
    },
    date: {
        fontSize: '13px',
        color: '#9ca3af',
        margin: 0,
    },
    deleteButton: {
        background: '#fee2e2',
        border: 'none',
        borderRadius: '8px',
        padding: '8px 12px',
        fontSize: '18px',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
};

export default ExpenseCard;