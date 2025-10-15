import { useEffect } from 'react';
import { useQuizStore } from '@/store/quizStore';
import QuizLanding from '@/components/QuizLanding';
import QuizQuestion from '@/components/QuizQuestion';
import SolutionChronobiology from '@/components/SolutionChronobiology';
import SolutionSpacedRepetition from '@/components/SolutionSpacedRepetition';
import SolutionRedacao from '@/components/SolutionRedacao';
import QuizAnalysis from '@/components/QuizAnalysis';
import QuizResult from '@/components/QuizResult';
import { quizQuestions } from '@/data/quizQuestions';

const Quiz = () => {
  const { currentPage, profile, nextPage, selectAnswer, calculateProfile, resetQuiz } = useQuizStore();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  
  // Página 1: Landing
  if (currentPage === 0) {
    return <QuizLanding onStart={nextPage} />;
  }
  
  // Páginas 2, 4, 6: Perguntas (índices 0, 1, 2 do array)
  const questionPages = [1, 3, 5];
  if (questionPages.includes(currentPage)) {
    const questionIndex = Math.floor((currentPage - 1) / 2);
    const question = quizQuestions[questionIndex];
    return (
      <QuizQuestion
        questionNumber={questionIndex + 1}
        totalQuestions={quizQuestions.length}
        title={question.title}
        subtitle={question.subtitle}
        videoSrc={question.videoSrc}
        videoPoster={question.videoPoster}
        options={question.options}
        onOptionSelect={(option) => {
          selectAnswer(question.id, option);
          nextPage();
        }}
      />
    );
  }
  
  // Página 3: Solução Cronobiologia
  if (currentPage === 2) {
    return <SolutionChronobiology onContinue={nextPage} />;
  }
  
  // Página 5: Solução Spaced Repetition
  if (currentPage === 4) {
    return <SolutionSpacedRepetition onContinue={nextPage} />;
  }
  
  // Página 6: Solução Redação
  if (currentPage === 6) {
    return <SolutionRedacao onContinue={nextPage} />;
  }
  
  // Página 7: Análise/Loading
  if (currentPage === 7) {
    return (
      <QuizAnalysis
        onComplete={() => {
          calculateProfile();
          nextPage();
        }}
      />
    );
  }
  
  // Página 8: Resultado Final + Oferta
  if (profile) {
    return <QuizResult profile={profile} onRestart={resetQuiz} />;
  }
  
  return null;
};

export default Quiz;
