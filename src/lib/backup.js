// 💾 SISTEMA DE BACKUP E RECUPERAÇÃO
// Sistema completo de backup para dados de pagamento

class BackupSystem {
  constructor() {
    this.backupKey = 'neurohack_backups';
    this.maxBackups = 10; // Manter apenas os últimos 10 backups
    this.autoBackupInterval = 24 * 60 * 60 * 1000; // 24 horas
    this.init();
  }

  init() {
    // Inicializar sistema de backup automático
    this.startAutoBackup();
  }

  // 🔄 BACKUP AUTOMÁTICO
  startAutoBackup() {
    // Executar backup automático a cada 24 horas
    setInterval(() => {
      this.createAutoBackup();
    }, this.autoBackupInterval);
  }

  async createAutoBackup() {
    try {
      console.log('🔄 Creating automatic backup...');
      
      const backup = await this.createBackup('auto');
      console.log('✅ Automatic backup created:', backup.id);
      
      return backup;
    } catch (error) {
      console.error('❌ Automatic backup failed:', error);
    }
  }

  // 💾 CRIAR BACKUP
  async createBackup(type = 'manual', description = '') {
    try {
      const timestamp = new Date().toISOString();
      const backupId = `backup_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Coletar todos os dados
      const data = await this.collectAllData();
      
      const backup = {
        id: backupId,
        type: type, // 'manual', 'auto', 'scheduled'
        description: description,
        timestamp: timestamp,
        size: this.calculateDataSize(data),
        version: '1.0.0',
        data: data,
        checksum: this.calculateChecksum(data)
      };

      // Salvar backup
      await this.saveBackup(backup);
      
      // Limpar backups antigos
      await this.cleanupOldBackups();
      
      console.log('✅ Backup created successfully:', backupId);
      return backup;
      
    } catch (error) {
      console.error('❌ Backup creation failed:', error);
      throw error;
    }
  }

  // 📊 COLETAR DADOS
  async collectAllData() {
    const data = {
      payments: [],
      customers: [],
      analytics: {},
      settings: {},
      notifications: [],
      emailLogs: [],
      smsLogs: [],
      metadata: {
        backupVersion: '1.0.0',
        timestamp: new Date().toISOString(),
        source: 'neurohack_payment_system'
      }
    };

    try {
      // Coletar dados de pagamentos
      const payments = await paymentDB.getAllPayments();
      data.payments = payments;

      // Coletar analytics
      const analytics = await paymentDB.getAnalytics();
      data.analytics = analytics;

      // Coletar configurações
      const settings = await paymentDB.getSettings();
      data.settings = settings;

      // Coletar notificações
      const notifications = notificationSystem.getNotifications();
      data.notifications = notifications;

      // Coletar logs de email
      const emailLogs = JSON.parse(localStorage.getItem('neurohack_email_logs') || '[]');
      data.emailLogs = emailLogs;

      // Coletar logs de SMS
      const smsLogs = JSON.parse(localStorage.getItem('neurohack_sms_logs') || '[]');
      data.smsLogs = smsLogs;

      // Coletar clientes (se disponível)
      const customers = JSON.parse(localStorage.getItem('neurohack_customers') || '[]');
      data.customers = customers;

    } catch (error) {
      console.error('Error collecting data for backup:', error);
    }

    return data;
  }

  // 💾 SALVAR BACKUP
  async saveBackup(backup) {
    try {
      const backups = this.getAllBackups();
      backups.push(backup);
      
      // Manter apenas os últimos backups
      if (backups.length > this.maxBackups) {
        backups.splice(0, backups.length - this.maxBackups);
      }
      
      localStorage.setItem(this.backupKey, JSON.stringify(backups));
      
      return backup;
    } catch (error) {
      console.error('Error saving backup:', error);
      throw error;
    }
  }

  // 📥 RESTAURAR BACKUP
  async restoreBackup(backupId) {
    try {
      const backup = this.getBackup(backupId);
      
      if (!backup) {
        throw new Error('Backup not found');
      }

      // Verificar integridade
      if (!this.verifyBackup(backup)) {
        throw new Error('Backup integrity check failed');
      }

      console.log('🔄 Restoring backup:', backupId);

      // Restaurar dados
      await this.restoreData(backup.data);

      console.log('✅ Backup restored successfully');
      return backup;
      
    } catch (error) {
      console.error('❌ Backup restoration failed:', error);
      throw error;
    }
  }

  // 🔄 RESTAURAR DADOS
  async restoreData(data) {
    try {
      // Restaurar pagamentos
      if (data.payments) {
        localStorage.setItem('neurohack_payments', JSON.stringify({
          payments: data.payments,
          customers: data.customers || [],
          analytics: data.analytics || {},
          settings: data.settings || {}
        }));
      }

      // Restaurar notificações
      if (data.notifications) {
        localStorage.setItem('neurohack_notifications', JSON.stringify(data.notifications));
      }

      // Restaurar logs de email
      if (data.emailLogs) {
        localStorage.setItem('neurohack_email_logs', JSON.stringify(data.emailLogs));
      }

      // Restaurar logs de SMS
      if (data.smsLogs) {
        localStorage.setItem('neurohack_sms_logs', JSON.stringify(data.smsLogs));
      }

      console.log('✅ Data restored successfully');
      
    } catch (error) {
      console.error('❌ Data restoration failed:', error);
      throw error;
    }
  }

  // 📋 LISTAR BACKUPS
  getAllBackups() {
    try {
      const backups = localStorage.getItem(this.backupKey);
      return backups ? JSON.parse(backups) : [];
    } catch (error) {
      console.error('Error getting backups:', error);
      return [];
    }
  }

  getBackup(backupId) {
    const backups = this.getAllBackups();
    return backups.find(backup => backup.id === backupId);
  }

  // 🗑️ LIMPEZA DE BACKUPS
  async cleanupOldBackups() {
    const backups = this.getAllBackups();
    
    if (backups.length > this.maxBackups) {
      // Ordenar por timestamp e remover os mais antigos
      backups.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      const toRemove = backups.slice(0, backups.length - this.maxBackups);
      
      console.log(`🗑️ Removing ${toRemove.length} old backups`);
      
      const remainingBackups = backups.slice(backups.length - this.maxBackups);
      localStorage.setItem(this.backupKey, JSON.stringify(remainingBackups));
    }
  }

  // ✅ VERIFICAÇÃO DE INTEGRIDADE
  verifyBackup(backup) {
    try {
      // Verificar se o backup tem a estrutura necessária
      if (!backup.id || !backup.timestamp || !backup.data) {
        return false;
      }

      // Verificar checksum
      const calculatedChecksum = this.calculateChecksum(backup.data);
      if (backup.checksum !== calculatedChecksum) {
        console.warn('⚠️ Backup checksum mismatch');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error verifying backup:', error);
      return false;
    }
  }

  // 🔢 CALCULAR CHECKSUM
  calculateChecksum(data) {
    const str = JSON.stringify(data);
    let hash = 0;
    
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return hash.toString(36);
  }

  // 📏 CALCULAR TAMANHO DOS DADOS
  calculateDataSize(data) {
    const str = JSON.stringify(data);
    const bytes = new Blob([str]).size;
    
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  // 📤 EXPORTAR BACKUP
  async exportBackup(backupId) {
    try {
      const backup = this.getBackup(backupId);
      
      if (!backup) {
        throw new Error('Backup not found');
      }

      const dataStr = JSON.stringify(backup, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(dataBlob);
      link.download = `neurohack_backup_${backupId}_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      
      console.log('✅ Backup exported:', backupId);
      return backup;
      
    } catch (error) {
      console.error('❌ Backup export failed:', error);
      throw error;
    }
  }

  // 📥 IMPORTAR BACKUP
  async importBackup(file) {
    try {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = async (e) => {
          try {
            const backup = JSON.parse(e.target.result);
            
            // Verificar integridade
            if (!this.verifyBackup(backup)) {
              throw new Error('Invalid backup file');
            }

            // Salvar backup
            await this.saveBackup(backup);
            
            console.log('✅ Backup imported successfully:', backup.id);
            resolve(backup);
            
          } catch (error) {
            reject(error);
          }
        };
        
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
      });
      
    } catch (error) {
      console.error('❌ Backup import failed:', error);
      throw error;
    }
  }

  // 🗑️ DELETAR BACKUP
  async deleteBackup(backupId) {
    try {
      const backups = this.getAllBackups();
      const filteredBackups = backups.filter(backup => backup.id !== backupId);
      
      localStorage.setItem(this.backupKey, JSON.stringify(filteredBackups));
      
      console.log('✅ Backup deleted:', backupId);
      return true;
      
    } catch (error) {
      console.error('❌ Backup deletion failed:', error);
      throw error;
    }
  }

  // 📊 ESTATÍSTICAS DE BACKUP
  getBackupStats() {
    const backups = this.getAllBackups();
    
    const stats = {
      total: backups.length,
      totalSize: 0,
      oldest: null,
      newest: null,
      byType: {}
    };

    if (backups.length > 0) {
      // Calcular tamanho total
      stats.totalSize = backups.reduce((sum, backup) => {
        const size = parseFloat(backup.size) || 0;
        return sum + size;
      }, 0);

      // Encontrar mais antigo e mais novo
      const sorted = backups.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      stats.oldest = sorted[0];
      stats.newest = sorted[sorted.length - 1];

      // Contar por tipo
      backups.forEach(backup => {
        stats.byType[backup.type] = (stats.byType[backup.type] || 0) + 1;
      });
    }

    return stats;
  }

  // 🛠️ UTILITÁRIOS
  formatDate(dateString) {
    return new Date(dateString).toLocaleString('pt-BR');
  }

  formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}

// Instância global do sistema de backup
const backupSystem = new BackupSystem();

export default backupSystem;



