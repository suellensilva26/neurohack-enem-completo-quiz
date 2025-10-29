// Sistema de contagem regressiva dinâmica para o ENEM 2025
export const getENEMCountdown = () => {
  const today = new Date();
  const enemDate = new Date('2025-11-09T08:00:00'); // 9 de novembro 2025, 8h

  const diffTime = enemDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Se já passou do ENEM
  if (diffDays <= 0) {
    return {
      days: 0,
      urgency: 'EXPIRADO',
      message: 'ENEM 2025 já aconteceu!',
      color: 'gray'
    };
  }

  // Níveis de urgência baseados nos dias restantes
  let urgency, color;
  if (diffDays <= 7) {
    urgency = 'EXTREMA';
    color = 'red';
  } else if (diffDays <= 15) {
    urgency = 'CRÍTICA';
    color = 'red';
  } else if (diffDays <= 30) {
    urgency = 'ALTA';
    color = 'orange';
  } else {
    urgency = 'MODERADA';
    color = 'yellow';
  }

  return {
    days: diffDays,
    urgency,
    color,
    message: `Restam apenas ${diffDays} dias para o ENEM 2025!`
  };
};

// Função para obter opções dinâmicas baseadas nos dias restantes
export const getTimeOptions = (days) => {
  if (days <= 7) return ['Menos de 7 dias', '7-15 dias', '15-30 dias', 'Mais de 30 dias'];
  if (days <= 15) return ['Menos de 15 dias', '15-30 dias', '1-2 meses', 'Mais de 2 meses'];
  if (days <= 30) return ['Menos de 30 dias', '1-2 meses', '2-3 meses', 'Mais de 3 meses'];
  return ['30 dias', '20 dias', '15 dias', '7 dias'];
};

// Função para obter cor de urgência
export const getUrgencyColor = (days) => {
  if (days <= 7) return 'from-red-900/60 to-red-800/60 border-red-500';
  if (days <= 15) return 'from-red-900/60 to-red-800/60 border-red-500';
  if (days <= 30) return 'from-orange-900/60 to-orange-800/60 border-orange-500';
  return 'from-yellow-900/60 to-yellow-800/60 border-yellow-500';
};

// Função para obter mensagem de urgência
export const getUrgencyMessage = (days) => {
  if (days <= 7) return '💀 SITUAÇÃO EXTREMAMENTE CRÍTICA:';
  if (days <= 15) return '💀 SITUAÇÃO EXTREMAMENTE CRÍTICA:';
  if (days <= 30) return '🚨 SITUAÇÃO CRÍTICA:';
  return '⏰ ATENÇÃO - TEMPO LIMITADO:';
};