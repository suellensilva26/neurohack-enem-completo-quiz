import { useState } from 'react';
import QuizScreen from './QuizScreen';
import DiagnosticScreen from './DiagnosticScreen';
import SolutionReveal from './SolutionReveal';
import SocialProofDemo from './SocialProofDemo';
import VSLScreen from './VSLScreen';
import SuperCheckout from './SuperCheckout';

export default function HighConversionFunnel() {
  const [currentScreen, setCurrentScreen] = useState('quiz');
  const [funnelData, setFunnelData] = useState({});

  const screenFlow = {
    'quiz': () => setCurrentScreen('diagnosis'),
    'diagnosis': () => setCurrentScreen('solution-reveal'),
    'solution-reveal': () => setCurrentScreen('social-proof'),
    'social-proof': () => setCurrentScreen('vsl'),
    'vsl': () => setCurrentScreen('checkout'),
    'checkout': () => console.log('Purchase completed!')
  };

  const nextScreen = () => {
    const currentFlow = screenFlow[currentScreen];
    if (currentFlow) currentFlow();
  };

  const updateFunnelData = (data) => {
    setFunnelData(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="funnel-container min-h-screen">
      {currentScreen === 'quiz' && (
        <QuizScreen 
          onComplete={nextScreen} 
          onDataUpdate={updateFunnelData}
        />
      )}
      {currentScreen === 'diagnosis' && (
        <DiagnosticScreen 
          onNext={nextScreen}
          funnelData={funnelData}
        />
      )}
      {currentScreen === 'solution-reveal' && (
        <SolutionReveal 
          onNext={nextScreen}
          funnelData={funnelData}
        />
      )}
      {currentScreen === 'social-proof' && (
        <SocialProofDemo 
          onNext={nextScreen}
          funnelData={funnelData}
        />
      )}
      {currentScreen === 'vsl' && (
        <VSLScreen 
          onNext={nextScreen}
          funnelData={funnelData}
        />
      )}
      {currentScreen === 'checkout' && (
        <SuperCheckout 
          funnelData={funnelData}
        />
      )}
    </div>
  );
}