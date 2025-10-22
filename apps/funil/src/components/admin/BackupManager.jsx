import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import backupSystem from '../../lib/backup';

export default function BackupManager() {
  const [backups, setBackups] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [backupDescription, setBackupDescription] = useState('');

  useEffect(() => {
    loadBackups();
  }, []);

  const loadBackups = async () => {
    try {
      setLoading(true);
      const backupList = backupSystem.getAllBackups();
      const backupStats = backupSystem.getBackupStats();
      
      setBackups(backupList);
      setStats(backupStats);
    } catch (error) {
      console.error('Error loading backups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBackup = async () => {
    try {
      setLoading(true);
      await backupSystem.createBackup('manual', backupDescription);
      setBackupDescription('');
      setShowCreateModal(false);
      await loadBackups();
    } catch (error) {
      console.error('Error creating backup:', error);
      alert('Erro ao criar backup: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreBackup = async (backupId) => {
    if (!confirm('Tem certeza que deseja restaurar este backup? Todos os dados atuais serão substituídos.')) {
      return;
    }

    try {
      setLoading(true);
      await backupSystem.restoreBackup(backupId);
      alert('Backup restaurado com sucesso!');
      await loadBackups();
    } catch (error) {
      console.error('Error restoring backup:', error);
      alert('Erro ao restaurar backup: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExportBackup = async (backupId) => {
    try {
      await backupSystem.exportBackup(backupId);
    } catch (error) {
      console.error('Error exporting backup:', error);
      alert('Erro ao exportar backup: ' + error.message);
    }
  };

  const handleDeleteBackup = async (backupId) => {
    if (!confirm('Tem certeza que deseja deletar este backup?')) {
      return;
    }

    try {
      setLoading(true);
      await backupSystem.deleteBackup(backupId);
      await loadBackups();
    } catch (error) {
      console.error('Error deleting backup:', error);
      alert('Erro ao deletar backup: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImportBackup = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    backupSystem.importBackup(file)
      .then(() => {
        alert('Backup importado com sucesso!');
        loadBackups();
      })
      .catch(error => {
        console.error('Error importing backup:', error);
        alert('Erro ao importar backup: ' + error.message);
      });
  };

  const getTypeIcon = (type) => {
    const icons = {
      manual: '👤',
      auto: '🤖',
      scheduled: '⏰'
    };
    return icons[type] || '📁';
  };

  const getTypeColor = (type) => {
    const colors = {
      manual: 'text-blue-400 bg-blue-400/10',
      auto: 'text-green-400 bg-green-400/10',
      scheduled: 'text-yellow-400 bg-yellow-400/10'
    };
    return colors[type] || 'text-gray-400 bg-gray-400/10';
  };

  if (loading && backups.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando backups...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">💾 Gerenciador de Backups</h2>
          <p className="text-gray-400 text-sm">
            Gerencie backups automáticos e manuais do sistema
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <label className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
            📥 Importar Backup
            <input
              type="file"
              accept=".json"
              onChange={handleImportBackup}
              className="hidden"
            />
          </label>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ➕ Criar Backup
          </button>
        </div>
      </div>

      {/* Estatísticas */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total de Backups</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <div className="text-3xl">📁</div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Tamanho Total</p>
                <p className="text-2xl font-bold text-white">{stats.totalSize.toFixed(1)} MB</p>
              </div>
              <div className="text-3xl">💾</div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Backup Mais Antigo</p>
                <p className="text-sm font-medium text-white">
                  {stats.oldest ? new Date(stats.oldest.timestamp).toLocaleDateString('pt-BR') : 'N/A'}
                </p>
              </div>
              <div className="text-3xl">📅</div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Backup Mais Recente</p>
                <p className="text-sm font-medium text-white">
                  {stats.newest ? new Date(stats.newest.timestamp).toLocaleDateString('pt-BR') : 'N/A'}
                </p>
              </div>
              <div className="text-3xl">🕒</div>
            </div>
          </div>
        </div>
      )}

      {/* Lista de Backups */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white">📋 Lista de Backups</h3>
        </div>
        
        <div className="divide-y divide-gray-700">
          {backups.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-4xl mb-4">📁</div>
              <p className="text-gray-400 text-lg">Nenhum backup encontrado</p>
              <p className="text-gray-500 text-sm">Crie seu primeiro backup para começar</p>
            </div>
          ) : (
            backups.map(backup => (
              <div key={backup.id} className="p-6 hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{getTypeIcon(backup.type)}</span>
                    <div>
                      <div className="flex items-center space-x-3">
                        <h4 className="text-white font-medium">{backup.id}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(backup.type)}`}>
                          {backup.type}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">
                        {backup.description || 'Sem descrição'}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {new Date(backup.timestamp).toLocaleString('pt-BR')} • {backup.size}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleExportBackup(backup.id)}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                    >
                      📤 Exportar
                    </button>
                    
                    <button
                      onClick={() => handleRestoreBackup(backup.id)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      🔄 Restaurar
                    </button>
                    
                    <button
                      onClick={() => handleDeleteBackup(backup.id)}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                    >
                      🗑️ Deletar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de Criação de Backup */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700"
            >
              <h3 className="text-xl font-bold text-white mb-4">Criar Novo Backup</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descrição (opcional)
                  </label>
                  <input
                    type="text"
                    value={backupDescription}
                    onChange={(e) => setBackupDescription(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="Ex: Backup antes da atualização"
                  />
                </div>
                
                <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/50">
                  <p className="text-blue-400 text-sm">
                    ℹ️ Este backup incluirá todos os dados de pagamentos, clientes, analytics e configurações.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
                
                <button
                  onClick={handleCreateBackup}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Criando...' : 'Criar Backup'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



