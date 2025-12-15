import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>💰</div>
          <div>
            <div style={styles.logoText}>MoneyTrack</div>
            <div style={styles.logoSubtext}>Akıllı Harcama Takibi</div>
          </div>
        </div>
      </Link>

      <div style={styles.links}>
        <Link 
          to="/" 
          style={{
            ...styles.link,
            ...(isActive('/') && styles.activeLink)
          }}
        >
          <span style={styles.linkIcon}>📊</span>
          <span>Dashboard</span>
        </Link>
        
        <Link 
          to="/expenses" 
          style={{
            ...styles.link,
            ...(isActive('/expenses') && styles.activeLink)
          }}
        >
          <span style={styles.linkIcon}>💳</span>
          <span>Harcamalar</span>
        </Link>
        
        <Link 
          to="/add" 
          style={{
            ...styles.link,
            ...styles.addButton,
            ...(isActive('/add') && styles.activeAddButton)
          }}
        >
          <span style={styles.addIcon}>+</span>
          <span>Yeni Harcama</span>
        </Link>
        
        <Link 
          to="/statistics" 
          style={{
            ...styles.link,
            ...(isActive('/statistics') && styles.activeLink)
          }}
        >
          <span style={styles.linkIcon}>📈</span>
          <span>İstatistikler</span>
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 60px',
    background: '#fff',
    borderBottom: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logo: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: '36px',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    borderRadius: '12px',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
  },
  logoText: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#111827',
    letterSpacing: '-0.5px',
  },
  logoSubtext: {
    fontSize: '11px',
    color: '#6b7280',
    fontWeight: '500',
    marginTop: '2px',
  },
  links: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#6b7280',
    fontWeight: '500',
    fontSize: '14px',
    padding: '10px 18px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    background: 'transparent',
  },
  linkIcon: {
    fontSize: '18px',
  },
  activeLink: {
    background: '#f3f4f6',
    color: '#111827',
    fontWeight: '600',
  },
  addButton: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: '#fff',
    fontWeight: '600',
    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
    marginLeft: '8px',
  },
  addIcon: {
    fontSize: '20px',
    fontWeight: '600',
  },
  activeAddButton: {
    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
  },
};

export default Navbar;