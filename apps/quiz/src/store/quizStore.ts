import { create } from 'zustand';

export interface QuizOption {
  id: string;
  icon: string;
  text: string;
  subtext?: string;
  score: number;
  type: 'critical' | 'warning' | 'success' | 'info';
}

export interface UserProfile {
  type: 'critical' | 'warning' | 'success';
  title: string;
  badge: string;
  risk: number;
  description: string;
  solutionTitle: string;
  solutionText: string;
  features: Array<{ icon: string; text: string }>;
}

interface QuizStore {
  currentPage: number;
  userScore: number;
  userAnswers: Record<string, QuizOption>;
  profile: UserProfile | null;
  
  nextPage: () => void;
  selectAnswer: (questionId: string, answer: QuizOption) => void;
  calculateProfile: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  currentPage: 0,
  userScore: 0,
  userAnswers: {},
  profile: null,
  
  nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
  
  selectAnswer: (questionId, answer) => set((state) => ({
    userAnswers: { ...state.userAnswers, [questionId]: answer },
    userScore: state.userScore + answer.score
  })),
  
  calculateProfile: () => {
    const { userScore } = get();
    let profile: UserProfile;
    
    if (userScore >= 12) {
      profile = {
        type: 'critical',
        title: 'Cérebro desperdiçando 73% do potencial',
        badge: '🚨 ALERTA NEUROLÓGICO',
        risk: 73,
        description: 'Risco alto para procrastinação severa, perda de memória e bloqueio criativo.',
        solutionTitle: '💡 Receita Neurológica',
        solutionText: 'Técnicas neurocientíficas para hackear seu cérebro e multiplicar resultados.',
        features: [
          { icon: '🧬', text: 'Cronobiologia Personalizada' },
          { icon: '🧠', text: 'Spaced Repetition IA' },
          { icon: '📝', text: 'Fórmula Coringa Redação' },
          { icon: '⚡', text: 'Resultados em 28 dias' }
        ]
      };
    } else if (userScore >= 8) {
      profile = {
        type: 'warning',
        title: 'Potencial subutilizado em 54%',
        badge: '⚠️ ATENÇÃO URGENTE',
        risk: 54,
        description: 'Distração moderada e esquecimento parcial comprometem performance.',
        solutionTitle: '🚀 Otimização Cerebral',
        solutionText: 'Sistema para triplicar retenção e eliminar desperdício de tempo.',
        features: [
          { icon: '⏱️', text: 'Otimização cronobiológica' },
          { icon: '📈', text: 'Revisão inteligente' },
          { icon: '🎓', text: 'Estrutura redação' },
          { icon: '💪', text: 'Foco estratégico' }
        ]
      };
    } else {
      profile = {
        type: 'success',
        title: 'Base sólida, pronto para turbinar',
        badge: '✅ PERFIL ESTRATÉGICO',
        risk: 28,
        description: 'Fundamentos corretos. Falta sistemização científica para máxima performance.',
        solutionTitle: '🏆 Performance Máxima',
        solutionText: 'Refinamento técnico e automação IA para garantir aprovação.',
        features: [
          { icon: '🎯', text: 'Refinamento técnico' },
          { icon: '🔬', text: 'Automação IA' },
          { icon: '📝', text: 'Simulados realistas' },
          { icon: '🏅', text: 'Coaching personalizado' }
        ]
      };
    }
    
    set({ profile });
  },
  
  resetQuiz: () => set({
    currentPage: 0,
    userScore: 0,
    userAnswers: {},
    profile: null
  })
}));
