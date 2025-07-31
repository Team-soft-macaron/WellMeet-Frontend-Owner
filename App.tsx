import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { BookingManagement } from './components/BookingManagement';
import { RestaurantManagement } from './components/RestaurantManagement';
import { CustomerManagement } from './components/CustomerManagement';
import { ReviewManagement } from './components/ReviewManagement';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';
import { NotificationCenter } from './components/NotificationCenter';

type Page = 'dashboard' | 'bookings' | 'restaurant' | 'customers' | 'reviews' | 'analytics' | 'settings' | 'notifications';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  useEffect(() => {
    const path = location.pathname.slice(1) || 'dashboard';
    if (['dashboard', 'bookings', 'restaurant', 'customers', 'reviews', 'analytics', 'settings', 'notifications'].includes(path)) {
      setCurrentPage(path as Page);
    }
  }, [location]);

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    navigate(`/${page}`);
  };


  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          unreadNotifications={unreadNotifications}
          onNotificationClick={() => handlePageChange('notifications')}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookings" element={<BookingManagement />} />
            <Route path="/restaurant" element={<RestaurantManagement />} />
            <Route path="/customers" element={<CustomerManagement />} />
            <Route path="/reviews" element={<ReviewManagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<NotificationCenter onNotificationsRead={() => setUnreadNotifications(0)} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}