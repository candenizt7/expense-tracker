import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ExpenseContext } from "../context/ExpenseContext";

function ExpenseForm({ expenseToEdit = null }) {
    const { addExpense, updateExpense } = useContext(ExpenseContext);
    const navigate = useNavigate();

    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("yemek");
    const [date, setDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (expenseToEdit) {
            // Güncelleme işlemi
            const updatedExpense = {
                ...expenseToEdit,
                amount: parseFloat(amount),
                description: description,
                category: category,
                date: date,
            };
            updateExpense(updatedExpense);
            alert("Harcama başarıyla güncellendi!");
        } else {
            // Yeni ekleme modu
            const newExpense = {
                title: description,
                amount: parseFloat(amount),
                category: category,
                date: date,
                description: description,
            };
            addExpense(newExpense);
            alert("Harcama başarıyla eklendi! ✅");
        }

        // Dashbord'a dön
        navigate("/");
    };

    useEffect(() => {
        if (expenseToEdit) {
            setAmount(expenseToEdit.amount.toString());
            setDescription(expenseToEdit.description);
            setCategory(expenseToEdit.category);
            setDate(expenseToEdit.date);
        }
    }, [expenseToEdit]);

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
                <label style={styles.label}>Tutar (₺)</label>
                <input
                    type="number"
                    step="0.01"
                    placeholder="150.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={styles.input}
                    required
                />
            </div>

            <div style={styles.formGroup}>
                <label style={styles.label}>Kategori</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={styles.select}
                    required
                >
                    <option value="yemek">🍔 Yemek</option>
                    <option value="ulaşım">🚗 Ulaşım</option>
                    <option value="fatura">💡 Fatura</option>
                    <option value="eğlence">🎮 Eğlence</option>
                    <option value="alışveriş">🛒 Alışveriş</option>
                    <option value="sağlık">💊 Sağlık</option>
                    <option value="eğitim">📚 Eğitim</option>
                    <option value="diğer">💰 Diğer</option>
                </select>
            </div>

            <div style={styles.formGroup}>
                <label style={styles.label}>Açıklama</label>
                <input
                    type="text"
                    placeholder="Market alışverişi"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={styles.input}
                    required
                />
            </div>

            <div style={styles.formGroup}>
                <label style={styles.label}>Tarih</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={styles.input}
                    required
                />
            </div>

            <button type="submit" style={styles.button}>
                {expenseToEdit ? '💾 Güncelle' : '➕ Harcama Ekle'}
            </button>
        </form>
    );
}

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxWidth: '500px',
        margin: '0 auto',
        background: '#fff',
        padding: '30px',
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    label: {
        fontWeight: '600',
        fontSize: '14px',
        color: '#374151'
    },
    input: {
        padding: '12px 16px',
        fontSize: '15px',
        borderRadius: '10px',
        border: '1px solid #e5e7eb',
        outline: 'none',
        transition: 'border 0.2s',
    },
    select: {
        padding: '12px 16px',
        fontSize: '15px',
        borderRadius: '10px',
        border: '1px solid #e5e7eb',
        outline: 'none',
        cursor: 'pointer',
    },
    button: {
        padding: '14px',
        fontSize: '16px',
        fontWeight: '600',
        borderRadius: '10px',
        border: 'none',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: '#fff',
        cursor: 'pointer',
        marginTop: '10px',
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
        transition: 'transform 0.2s',
    }
};

export default ExpenseForm;