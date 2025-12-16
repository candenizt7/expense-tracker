import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ExpenseCard({ expense, onDelete }) {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [isDeleteHovered, setIsDeleteHovered] = useState(false);
    const [isEditHovered, setIsEditHovered] = useState(false);

    // Kategori bilgilerini al
    const getCategoryInfo = (category) => {
        const categories = {
            // Gider kategorileri
            yemek: { icon: '🍔', name: 'Yemek', color: '#ef4444', type: 'gider' },
            ulasim: { icon: '🚗', name: 'Ulaşım', color: '#f59e0b', type: 'gider' },
            fatura: { icon: '💡', name: 'Fatura', color: '#dc2626', type: 'gider' },
            eglence: { icon: '🎮', name: 'Eğlence', color: '#8b5cf6', type: 'gider' },
            alisveris: { icon: '🛒', name: 'Alışveriş', color: '#ec4899', type: 'gider' },
            saglik: { icon: '💊', name: 'Sağlık', color: '#06b6d4', type: 'gider' },
            egitim: { icon: '📚', name: 'Eğitim', color: '#6366f1', type: 'gider' },
            diger: { icon: '💰', name: 'Diğer', color: '#6b7280', type: 'gider' },

            // Gelir kategorileri
            maas: { icon: '💼', name: 'Maaş', color: '#10b981', type: 'gelir' },
            freelance: { icon: '💻', name: 'Freelance', color: '#059669', type: 'gelir' },
            yatirim: { icon: '📈', name: 'Yatırım', color: '#14b8a6', type: 'gelir' },
            hediye: { icon: '🎁', name: 'Hediye', color: '#22c55e', type: 'gelir' },
            'diger-gelir': { icon: '💸', name: 'Diğer Gelir', color: '#16a34a', type: 'gelir' },
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

    const handleEdit = () => {
        navigate('/add', { state: { expenseToEdit: expense } });
    };

    // Kategori rengine göre kart arka planı
    const cardStyle = {
        ...styles.card,
        background: `linear-gradient(135deg, ${categoryInfo.color}15 0%, ${categoryInfo.color}05 100%)`,
        borderLeft: `4px solid ${categoryInfo.color}`
    };

    const amountColor = categoryInfo.type === 'gelir' ? '#10b981' : '#ef4444';

    return (
        <div style={{
            ...cardStyle,
            transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: isHovered
                ? `0 8px 16px rgba(0, 0, 0, 0.12)`
                : '0 1px 3px rgba(0, 0, 0, 0.08)',
        }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={styles.header}>
                <div style={styles.categoryBadge}>
                    <span style={styles.categoryIcon}>{categoryInfo.icon}</span>
                    <span style={styles.categoryName}>{categoryInfo.name}</span>
                </div>
                <div style={{ ...styles.amount, color: amountColor }}>
                    {categoryInfo.type === 'gelir' ? '+' : '-'}{expense.amount.toFixed(2)} ₺
                </div>
            </div>

            <div style={styles.body}>
                <p style={styles.description}>{expense.description}</p>
                <p style={styles.date}>{formatDate(expense.date)}</p>
            </div>

            {/* Butonlar */}
            <div style={{ display: 'flex', gap: '8px' }}>
                <button
                    onClick={handleEdit}
                    style={{
                        ...styles.editButton,
                        background: isEditHovered ? '#dbeafe' : 'transparent',
                        color: isEditHovered ? '#2563eb' : '#9ca3af',
                        transform: isEditHovered ? 'scale(1.1)' : 'scale(1)',
                    }}
                    onMouseEnter={() => setIsEditHovered(true)}
                    onMouseLeave={() => setIsEditHovered(false)}
                >
                    ✏️
                </button>

                <button
                    onClick={() => onDelete(expense.id)}
                    style={{
                        ...styles.deleteButton,
                        background: isDeleteHovered ? '#fee2e2' : 'transparent',
                        color: isDeleteHovered ? '#dc2626' : '#9ca3af',
                        transform: isDeleteHovered ? 'scale(1.1)' : 'scale(1)',
                    }}
                    onMouseEnter={() => setIsDeleteHovered(true)}
                    onMouseLeave={() => setIsDeleteHovered(false)}
                >
                    🗑️
                </button>
            </div>
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
        background: 'transparent',
        border: 'none',
        borderRadius: '8px',
        padding: '8px',
        fontSize: '18px',
        cursor: 'pointer',
        transition: 'all 0.3s',
        color: '#9ca3af',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editButton: {
        background: 'transparent',
        border: 'none',
        borderRadius: '8px',
        padding: '8px',
        fontSize: '18px',
        cursor: 'pointer',
        transition: 'all 0.3s',
        color: '#9ca3af',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
};

export default ExpenseCard;