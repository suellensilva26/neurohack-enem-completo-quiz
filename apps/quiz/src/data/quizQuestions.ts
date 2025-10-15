import { QuizOption } from '@/store/quizStore';

export interface Question {
  id: string;
  title: string;
  subtitle?: string;
  videoSrc?: string;
  videoPoster?: string;
  options: QuizOption[];
}

export const quizQuestions: Question[] = [
  {
    id: 'q1',
    title: '📱 Seja BRUTALMENTE honesto. Quantas vezes por hora você pega o celular quando deveria estar estudando?',
    subtitle: 'NEUROCIÊNCIA REVELADA: Redes sociais sequestram seu sistema de recompensa, tornando IMPOSSÍVEL focar nos estudos por mais de 8 minutos consecutivos',
    videoSrc: '/videos/procrastinacao-dopamina-addiction.mp4',
    videoPoster: '/videos/procrastinacao-cerebro.jpg',
    options: [
      {
        id: 'q1-a',
        icon: '😵',
        text: '15+ vezes (VICIADO SEVERO)',
        subtext: 'Cérebro completamente sequestrado. Precisa detox neurológico urgente.',
        score: 6,
        type: 'critical'
      },
      {
        id: 'q1-b',
        icon: '😟',
        text: '8-15 vezes (DEPENDÊNCIA MODERADA)',
        subtext: 'Sistema de foco comprometido. Consegue reverter com técnica certa.',
        score: 4,
        type: 'warning'
      },
      {
        id: 'q1-c',
        icon: '😊',
        text: 'Menos de 8 vezes (CONTROLE PARCIAL)',
        subtext: 'Boa base neurológica. Pode otimizar para performance máxima.',
        score: 2,
        type: 'success'
      }
    ]
  },
  {
    id: 'q2',
    title: '🤔 Qual sua maior frustração com esquecimento nos estudos?',
    subtitle: 'Hermann Ebbinghaus descobriu: perdemos 89% do que aprendemos em 48h sem revisão estratégica',
    videoSrc: '/videos/curva-esquecimento-ebbinghaus.mp4',
    videoPoster: '/videos/curva-esquecimento.jpg',
    options: [
      {
        id: 'q2-a',
        icon: '😭',
        text: 'Esqueço TUDO que estudei ontem',
        subtext: 'Tenho que reestudiar o mesmo conteúdo várias vezes',
        score: 6,
        type: 'critical'
      },
      {
        id: 'q2-b',
        icon: '😤',
        text: 'Lembro parcialmente, mas confundo na prova',
        subtext: 'Sei que estudei, mas não consigo acessar na hora H',
        score: 4,
        type: 'warning'
      },
      {
        id: 'q2-c',
        icon: '🤨',
        text: 'Lembro o básico, mas quero otimizar',
        subtext: 'Preciso de técnica para fixar melhor os detalhes',
        score: 2,
        type: 'success'
      }
    ]
  },
  {
    id: 'q3',
    title: '😰 Qual seu MAIOR TERROR com a redação do ENEM?',
    subtitle: 'REALIDADE BRUTAL 2024: 573.094 pessoas zeraram a redação. Apenas 12 tiraram nota 1000.',
    videoSrc: '/videos/redacao-medo-branco.mp4',
    videoPoster: '/videos/redacao-nota-zero.jpg',
    options: [
      {
        id: 'q3-a',
        icon: '🥶',
        text: 'PÂNICO TOTAL: fico em branco na folha',
        subtext: 'Sei que vou zerar. Não consigo nem começar a escrever.',
        score: 6,
        type: 'critical'
      },
      {
        id: 'q3-b',
        icon: '😵‍💫',
        text: 'Escrevo, mas não sei se está certo',
        subtext: 'Tenho ideias, mas não sei como estruturar nem usar repertório.',
        score: 4,
        type: 'warning'
      },
      {
        id: 'q3-c',
        icon: '🤔',
        text: 'Tiro 600-700, mas quero 900+',
        subtext: 'Preciso da fórmula para chegar nota máxima.',
        score: 2,
        type: 'success'
      }
    ]
  }
];
