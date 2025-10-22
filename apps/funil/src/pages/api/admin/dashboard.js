// 🔐 API ADMINISTRATIVA - DASHBOARD DE PAGAMENTOS
// Endpoint para acessar dados do dashboard administrativo

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Verificar autenticação (em produção, implementar JWT ou similar)
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== 'Bearer neurohack_admin_2025') {
    return res.status(401).json({
      success: false,
      error: 'Acesso não autorizado'
    });
  }

  try {
    if (req.method === 'GET') {
      // Retornar dados do dashboard
      const dashboardData = await getDashboardData();
      
      res.status(200).json({
        success: true,
        data: dashboardData
      });
    } else if (req.method === 'POST') {
      // Ações administrativas
      const { action, data } = req.body;
      
      switch (action) {
        case 'export_data':
          const exportData = await exportAllData();
          res.status(200).json({
            success: true,
            data: exportData
          });
          break;
          
        case 'clear_old_data':
          const result = await clearOldData(data.days);
          res.status(200).json({
            success: true,
            message: `Dados anteriores a ${data.days} dias foram removidos`,
            data: result
          });
          break;
          
        case 'update_settings':
          const settings = await updateSettings(data);
          res.status(200).json({
            success: true,
            data: settings
          });
          break;
          
        default:
          res.status(400).json({
            success: false,
            error: 'Ação não reconhecida'
          });
      }
    } else {
      res.status(405).json({
        success: false,
        error: 'Método não permitido'
      });
    }
  } catch (error) {
    console.error('Dashboard API error:', error);
    
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Funções auxiliares (simuladas - em produção usar banco de dados real)
async function getDashboardData() {
  // Simular dados do dashboard
  // Em produção, buscar do banco de dados real
  return {
    analytics: {
      totalRevenue: 15750.00,
      totalTransactions: 89,
      conversionRate: 78.5,
      averageTicket: 177.00,
      lastUpdated: new Date().toISOString(),
      methodBreakdown: {
        pix: 45,
        credit_card: 32,
        boleto: 12
      },
      dailyStats: {
        [new Date().toDateString()]: { count: 8, revenue: 1416.00 },
        [new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString()]: { count: 12, revenue: 2124.00 },
        [new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toDateString()]: { count: 6, revenue: 1062.00 }
      },
      monthlyStats: {
        [new Date().toISOString().substring(0, 7)]: { count: 89, revenue: 15750.00 }
      }
    },
    recentPayments: [
      {
        id: 'pay_1',
        customer: { name: 'João Silva', email: 'joao@email.com' },
        method: 'pix',
        amount: 188.58,
        status: 'approved',
        created_at: new Date().toISOString()
      },
      {
        id: 'pay_2',
        customer: { name: 'Maria Santos', email: 'maria@email.com' },
        method: 'credit_card',
        amount: 198.50,
        status: 'approved',
        created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString()
      }
    ],
    notifications: [
      {
        id: 'notif_1',
        type: 'payment_approved',
        title: '🎉 Pagamento Aprovado!',
        message: 'Pagamento de R$ 188,58 aprovado para João Silva',
        timestamp: new Date().toISOString(),
        read: false,
        priority: 'high'
      }
    ],
    systemHealth: {
      status: 'healthy',
      uptime: '99.9%',
      lastError: null,
      activeConnections: 156
    }
  };
}

async function exportAllData() {
  // Simular exportação de dados
  return {
    message: 'Dados exportados com sucesso',
    downloadUrl: '/api/admin/export/download',
    timestamp: new Date().toISOString()
  };
}

async function clearOldData(days) {
  // Simular limpeza de dados antigos
  return {
    removedRecords: 45,
    freedSpace: '2.3 MB',
    timestamp: new Date().toISOString()
  };
}

async function updateSettings(newSettings) {
  // Simular atualização de configurações
  return {
    ...newSettings,
    updatedAt: new Date().toISOString()
  };
}



