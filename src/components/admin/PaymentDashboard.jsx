import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import paymentDB from '../../lib/database';
import notificationSystem from '../../lib/notifications';
import realtimeMonitor from '../../lib/realtime';
import BackupManager from './BackupManager';

export default function PaymentDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [payments, setPayments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    method: '',
    dateFrom: '',
    dateTo: ''
  });

  useEffect(() => {
    loadDashboardData();
    
    // Atualizar dados a cada 30 segundos
    const interval = setInterval(loadDashboardData, 30000);
    
    // Escutar notificações em tempo real
    const handleNotification = (notification) => {
      setNotifications(prev => [notification, ...prev.slice(0, 49)]);
    };
    
    notificationSystem.subscribe(handleNotification);
    
    // Escutar eventos em tempo real
    const handleRealtimeEvent = (event) => {
      console.log('🔄 Realtime event received:', event);
      
      switch (event.type) {
        case 'payment_update':
          // Atualizar lista de pagamentos
          loadDashboardData();
          break;
        case 'analytics_update':
          // Atualizar analytics
          loadDashboardData();
          break;
        case 'notification_update':
          // Atualizar notificações
          loadDashboardData();
          break;
        case 'system_alert':
          // Mostrar alerta do sistema
          console.log('🚨 System alert:', event.data);
          break;
        case 'connection':
          console.log('🔄 Connection status:', event.status);
          break;
      }
    };
    
    const unsubscribe = realtimeMonitor.subscribe(handleRealtimeEvent);
    
    return () => {
      clearInterval(interval);
      notificationSystem.unsubscribe(handleNotification);
      unsubscribe();
    };
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Carregar analytics
      const analyticsData = await paymentDB.getAnalytics();
      setAnalytics(analyticsData);
      
      // Carregar pagamentos
      const paymentsData = await paymentDB.getAllPayments(filters);
      setPayments(paymentsData);
      
      // Carregar notificações
      const notificationsData = notificationSystem.getNotifications();
      setNotifications(notificationsData);
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getStatusColor = (status) => {
    const colors = {
      approved: 'text-green-400 bg-green-400/10',
      pending: 'text-yellow-400 bg-yellow-400/10',
      rejected: 'text-red-400 bg-red-400/10',
      cancelled: 'text-gray-400 bg-gray-400/10'
    };
    return colors[status] || 'text-gray-400 bg-gray-400/10';
  };

  const getMethodIcon = (method) => {
    const icons = {
      pix: '💚',
      credit_card: '💳',
      boleto: '🏦'
    };
    return icons[method] || '💳';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              🚀 Central de Pagamento NeuroHack ENEM
            </h1>
            <p className="text-gray-400 text-sm">
              Monitoramento em tempo real • Última atualização: {new Date().toLocaleString('pt-BR')}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={loadDashboardData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              🔄 Atualizar
            </button>
            
            <button
              onClick={() => paymentDB.exportData()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              📊 Exportar Dados
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 border-b border-gray-700 px-6">
        <div className="flex space-x-8">
          {[
            { id: 'overview', name: '📊 Visão Geral', icon: '📊' },
            { id: 'payments', name: '💳 Pagamentos', icon: '💳' },
            { id: 'notifications', name: '🔔 Notificações', icon: '🔔' },
            { id: 'analytics', name: '📈 Analytics', icon: '📈' },
            { id: 'backup', name: '💾 Backup', icon: '💾' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Cards de Resumo */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 rounded-xl p-6 border border-green-500/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-400 text-sm font-medium">Receita Total</p>
                      <p className="text-2xl font-bold text-white">
                        {formatCurrency(analytics?.totalRevenue || 0)}
                      </p>
                    </div>
                    <div className="text-3xl">💰</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 rounded-xl p-6 border border-blue-500/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-400 text-sm font-medium">Total de Transações</p>
                      <p className="text-2xl font-bold text-white">
                        {analytics?.totalTransactions || 0}
                      </p>
                    </div>
                    <div className="text-3xl">📊</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 rounded-xl p-6 border border-yellow-500/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-400 text-sm font-medium">Taxa de Conversão</p>
                      <p className="text-2xl font-bold text-white">
                        {analytics?.conversionRate?.toFixed(1) || 0}%
                      </p>
                    </div>
                    <div className="text-3xl">🎯</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 rounded-xl p-6 border border-purple-500/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-400 text-sm font-medium">Ticket Médio</p>
                      <p className="text-2xl font-bold text-white">
                        {formatCurrency(analytics?.averageTicket || 0)}
                      </p>
                    </div>
                    <div className="text-3xl">🎫</div>
                  </div>
                </div>
              </div>

              {/* Gráfico de Métodos de Pagamento */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">💳 Distribuição por Método de Pagamento</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(analytics?.methodBreakdown || {}).map(([method, count]) => (
                    <div key={method} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium capitalize">{method.replace('_', ' ')}</p>
                          <p className="text-2xl font-bold text-blue-400">{count}</p>
                        </div>
                        <div className="text-3xl">{getMethodIcon(method)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagamentos Recentes */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">🕒 Pagamentos Recentes</h3>
                <div className="space-y-3">
                  {payments.slice(0, 5).map(payment => (
                    <div key={payment.id} className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{getMethodIcon(payment.method)}</span>
                        <div>
                          <p className="text-white font-medium">{payment.customer.name}</p>
                          <p className="text-gray-400 text-sm">{payment.customer.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">{formatCurrency(payment.amount)}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'payments' && (
            <motion.div
              key="payments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Filtros */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">🔍 Filtros</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    className="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600"
                  >
                    <option value="">Todos os Status</option>
                    <option value="approved">Aprovado</option>
                    <option value="pending">Pendente</option>
                    <option value="rejected">Rejeitado</option>
                    <option value="cancelled">Cancelado</option>
                  </select>

                  <select
                    value={filters.method}
                    onChange={(e) => setFilters({...filters, method: e.target.value})}
                    className="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600"
                  >
                    <option value="">Todos os Métodos</option>
                    <option value="pix">PIX</option>
                    <option value="credit_card">Cartão</option>
                    <option value="boleto">Boleto</option>
                  </select>

                  <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                    className="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600"
                    placeholder="Data Inicial"
                  />

                  <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                    className="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600"
                    placeholder="Data Final"
                  />
                </div>
              </div>

              {/* Lista de Pagamentos */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-700">
                  <h3 className="text-xl font-bold text-white">💳 Todos os Pagamentos</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Cliente
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Método
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Valor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Data
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {payments.map(payment => (
                        <tr key={payment.id} className="hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-white">{payment.customer.name}</div>
                              <div className="text-sm text-gray-400">{payment.customer.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-xl mr-2">{getMethodIcon(payment.method)}</span>
                              <span className="text-sm text-white capitalize">
                                {payment.method.replace('_', ' ')}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                            {formatCurrency(payment.amount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                              {payment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {formatDate(payment.created_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-gray-800 rounded-xl border border-gray-700">
                <div className="p-6 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">🔔 Notificações do Sistema</h3>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-400">
                        {notifications.filter(n => !n.read).length} não lidas
                      </span>
                      <button
                        onClick={() => notificationSystem.markAllAsRead()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Marcar todas como lidas
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-700">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-6 ${!notification.read ? 'bg-blue-900/20' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h4 className="text-white font-medium">{notification.title}</h4>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm mt-1">{notification.message}</p>
                          <p className="text-gray-500 text-xs mt-2">
                            {formatDate(notification.timestamp)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            notification.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                            notification.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {notification.priority}
                          </span>
                          {!notification.read && (
                            <button
                              onClick={() => notificationSystem.markAsRead(notification.id)}
                              className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                            >
                              Marcar como lida
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Estatísticas Diárias */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">📅 Estatísticas Diárias</h3>
                  <div className="space-y-3">
                    {Object.entries(analytics?.dailyStats || {})
                      .slice(-7) // Últimos 7 dias
                      .map(([date, stats]) => (
                        <div key={date} className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                          <span className="text-white text-sm">{new Date(date).toLocaleDateString('pt-BR')}</span>
                          <div className="text-right">
                            <p className="text-white font-medium">{stats.count} transações</p>
                            <p className="text-green-400 text-sm">{formatCurrency(stats.revenue)}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Estatísticas Mensais */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">📊 Estatísticas Mensais</h3>
                  <div className="space-y-3">
                    {Object.entries(analytics?.monthlyStats || {})
                      .slice(-6) // Últimos 6 meses
                      .map(([month, stats]) => (
                        <div key={month} className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                          <span className="text-white text-sm">
                            {new Date(month + '-01').toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                          </span>
                          <div className="text-right">
                            <p className="text-white font-medium">{stats.count} transações</p>
                            <p className="text-green-400 text-sm">{formatCurrency(stats.revenue)}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'backup' && (
            <motion.div
              key="backup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <BackupManager />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
