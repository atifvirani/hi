import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Placeholder Pages (We will build the real ones next)
const Dashboard = () => <h1 className="text-3xl font-bold text-slate-800">📊 Analytics Dashboard</h1>;
const Billing = () => <h1 className="text-3xl font-bold text-slate-800">💰 Smart Billing POS</h1>;
const CRM = () => <h1 className="text-3xl font-bold text-slate-800">👥 Customer Management</h1>;
const Services = () => <h1 className="text-3xl font-bold text-slate-800">✂️ Service Menu</h1>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="billing" element={<Billing />} />
          <Route path="crm" element={<CRM />} />
          <Route path="services" element={<Services />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;