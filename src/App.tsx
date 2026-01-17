import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';

// Placeholders for other pages
const Billing = () => <h1 className="text-3xl font-bold">💰 Smart Billing POS</h1>;
const CRM = () => <h1 className="text-3xl font-bold">👥 Customer Management</h1>;
const Services = () => <h1 className="text-3xl font-bold">✂️ Service Menu</h1>;
const Devices = () => <h1 className="text-3xl font-bold">📱 Device Manager</h1>;
const Settings = () => <h1 className="text-3xl font-bold">⚙️ Settings</h1>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="billing" element={<Billing />} />
          <Route path="crm" element={<CRM />} />
          <Route path="services" element={<Services />} />
          <Route path="devices" element={<Devices />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
