import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HighConversionFunnel from './components/HighConversionFunnel';
import StripePayment from './components/payment/StripePayment';
import PaymentSuccess from './components/payment/PaymentSuccess';
import PaymentFailure from './components/payment/PaymentFailure';
import AdminPage from './pages/admin';
import TestPage from './components/TestPage';
import { StripeTest } from './components/StripeTest';
import { DiagnosticoStripe } from './components/DiagnosticoStripe';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TestPage />} />
          <Route path="/quiz" element={<HighConversionFunnel />} />
          <Route path="/vendas" element={<StripePayment />} />
          <Route path="/vendas/" element={<StripePayment />} />
          <Route path="/test-stripe" element={<StripeTest />} />
          <Route path="/diagnostico" element={<DiagnosticoStripe />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/failure" element={<PaymentFailure />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;