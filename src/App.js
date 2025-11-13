import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  
  // Current active tab
  const [activeTab, setActiveTab] = useState('customers');
  

  const [customers, setCustomers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [payments, setPayments] = useState([]);
  
  // Form states for each entity
  const [customerForm, setCustomerForm] = useState({
    name: '',
    email: '',
    dob: ''
  });
  
  const [policyForm, setPolicyForm] = useState({
    customerId: '',
    policyType: '',
    premium: ''
  });
  
  const [claimForm, setClaimForm] = useState({
    policyId: '',
    claimAmount: '',
    incidentDate: ''
  });
  
  const [paymentForm, setPaymentForm] = useState({
    customerId: '',
    amount: '',
    paymentMethod: ''
  });
  
  // Message for success/error feedback
  const [message, setMessage] = useState('');
  
  // Api
  const API_BASE ='https://insurance-backened.onrender.com/api';

  // Load data when tab changes
  useEffect(() => {
    if (activeTab === 'customers') fetchCustomers();
    if (activeTab === 'policies') fetchPolicies();
    if (activeTab === 'claims') fetchClaims();
    if (activeTab === 'payments') fetchPayments();
  }, [activeTab]);

  //Get requests
  
  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${API_BASE}/customer`);
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setMessage('Error loading customers');
    }
  };

  const fetchPolicies = async () => {
    try {
      const response = await fetch(`${API_BASE}/policy`);
      const data = await response.json();
      setPolicies(data);
    } catch (error) {
      console.error('Error fetching policies:', error);
      setMessage('Error loading policies');
    }
  };

  const fetchClaims = async () => {
    try {
      const response = await fetch(`${API_BASE}/claim`);
      const data = await response.json();
      setClaims(data);
    } catch (error) {
      console.error('Error fetching claims:', error);
      setMessage('Error loading claims');
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await fetch(`${API_BASE}/payment`);
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error);
      setMessage('Error loading payments');
    }
  };

  // Create functions
  
  const createCustomer = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_BASE}/customer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerForm)
      });
      
      const result = await response.text();
      setMessage(result);
      setCustomerForm({ name: '', email: '', dob: '' });
      fetchCustomers();
    } catch (error) {
      setMessage('Error creating customer');
    }
  };

  const createPolicy = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_BASE}/policy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(policyForm)
      });
      
      const result = await response.text();
      setMessage(result);
      setPolicyForm({ customerId: '', policyType: '', premium: '' });
      fetchPolicies();
    } catch (error) {
      setMessage('Error creating policy');
    }
  };

  const createClaim = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_BASE}/claim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(claimForm)
      });
      
      const result = await response.text();
      setMessage(result);
      setClaimForm({ policyId: '', claimAmount: '', incidentDate: '' });
      fetchClaims();
    } catch (error) {
      setMessage('Error creating claim');
    }
  };

  const createPayment = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_BASE}/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentForm)
      });
      
      const result = await response.text();
      setMessage(result);
      setPaymentForm({ customerId: '', amount: '', paymentMethod: '' });
      fetchPayments();
    } catch (error) {
      setMessage('Error processing payment');
    }
  };

  // Delete
  
  const deleteCustomer = async (id) => {
    if (!window.confirm('Delete this customer?')) return;
    
    try {
      const response = await fetch(`${API_BASE}/customer/${id}`, {
        method: 'DELETE'
      });
      
      const result = await response.text();
      setMessage(result);
      fetchCustomers();
    } catch (error) {
      setMessage('Error deleting customer');
    }
  };

  const deletePolicy = async (id) => {
    if (!window.confirm('Delete this policy?')) return;
    
    try {
      const response = await fetch(`${API_BASE}/policy/${id}`, {
        method: 'DELETE'
      });
      
      const result = await response.text();
      setMessage(result);
      fetchPolicies();
    } catch (error) {
      setMessage('Error deleting policy');
    }
  };

// UI
  
  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <h1> Insurance Management System</h1>
      </header>

      {/* Message Display */}
      {message && (
        <div className="message">
          {message}
          <button onClick={() => setMessage('')}>✖</button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="tabs">
        <button 
          className={activeTab === 'customers' ? 'active' : ''} 
          onClick={() => setActiveTab('customers')}
        >
          👥 Customers
        </button>
        <button 
          className={activeTab === 'policies' ? 'active' : ''} 
          onClick={() => setActiveTab('policies')}
        >
          📋 Policies
        </button>
        <button 
          className={activeTab === 'claims' ? 'active' : ''} 
          onClick={() => setActiveTab('claims')}
        >
          🏥 Claims
        </button>
        <button 
          className={activeTab === 'payments' ? 'active' : ''} 
          onClick={() => setActiveTab('payments')}
        >
          💳 Payments
        </button>
      </div>

      {/* Main Content */}
      <div className="content">
        
        {/* Customers */}
        {activeTab === 'customers' && (
          <div>
            <h2>Create New Customer</h2>
            <form onSubmit={createCustomer}>
              <input
                type="text"
                placeholder="Full Name"
                value={customerForm.name}
                onChange={(e) => setCustomerForm({...customerForm, name: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={customerForm.email}
                onChange={(e) => setCustomerForm({...customerForm, email: e.target.value})}
                required
              />
              <input
                type="date"
                placeholder="Date of Birth"
                value={customerForm.dob}
                onChange={(e) => setCustomerForm({...customerForm, dob: e.target.value})}
                required
              />
              <button type="submit">Create Customer</button>
            </form>

            <h2>All Customers ({customers.length})</h2>
            <div className="grid">
              {customers.map(customer => (
                <div key={customer.id} className="card">
                  <h3>{customer.name}</h3>
                  <p>📧 {customer.email}</p>
                  <p>🎂 {customer.dob}</p>
                  <p className="id">Customer ID: {customer.id}</p>
                  <button onClick={() => deleteCustomer(customer.id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Policies */}
        {activeTab === 'policies' && (
          <div>
            <h2>Create New Policy</h2>
            <form onSubmit={createPolicy}>
              <input
                type="number"
                placeholder="Customer ID"
                value={policyForm.customerId}
                onChange={(e) => setPolicyForm({...policyForm, customerId: e.target.value})}
                required
              />
              <select
                value={policyForm.policyType}
                onChange={(e) => setPolicyForm({...policyForm, policyType: e.target.value})}
                required
              >
                <option value="">Select Policy Type</option>
                <option value="HEALTH">Health Insurance</option>
                <option value="AUTO">Auto Insurance</option>
                <option value="LIFE">Life Insurance</option>
                <option value="HOME">Home Insurance</option>
              </select>
              <input
                type="number"
                placeholder="Premium Amount ($)"
                value={policyForm.premium}
                onChange={(e) => setPolicyForm({...policyForm, premium: e.target.value})}
                required
              />
              <button type="submit">Create Policy</button>
            </form>

            <h2>All Policies ({policies.length})</h2>
            <div className="grid">
              {policies.map(policy => (
                <div key={policy.id} className="card">
                  <h3>{policy.policyType} Policy</h3>
                  <p>👤 Customer ID: {policy.customerId}</p>
                  <p>💰 Premium: ${policy.premium}</p>
                  <p>🛡️ Coverage: ${policy.policyLimit}</p>
                  <p className="id">Policy ID: {policy.id}</p>
                  <button onClick={() => deletePolicy(policy.id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Claims */}
        {activeTab === 'claims' && (
          <div>
            <h2>Submit New Claim</h2>
            <form onSubmit={createClaim}>
              <input
                type="number"
                placeholder="Policy ID"
                value={claimForm.policyId}
                onChange={(e) => setClaimForm({...claimForm, policyId: e.target.value})}
                required
              />
              <input
                type="number"
                placeholder="Claim Amount ($)"
                value={claimForm.claimAmount}
                onChange={(e) => setClaimForm({...claimForm, claimAmount: e.target.value})}
                required
              />
              <input
                type="date"
                placeholder="Incident Date"
                value={claimForm.incidentDate}
                onChange={(e) => setClaimForm({...claimForm, incidentDate: e.target.value})}
                required
              />
              <button type="submit">Submit Claim</button>
            </form>

            <h2>All Claims ({claims.length})</h2>
            <div className="grid">
              {claims.map(claim => (
                <div key={claim.id} className="card">
                  <h3>Claim #{claim.id}</h3>
                  <p>📋 Policy ID: {claim.policyId}</p>
                  <p>💵 Amount: ${claim.claimAmount}</p>
                  <p>📅 Incident: {claim.incidentDate}</p>
                  <p className={`status ${claim.status.toLowerCase()}`}>
                    Status: {claim.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payments */}
        {activeTab === 'payments' && (
          <div>
            <h2>Process New Payment</h2>
            <form onSubmit={createPayment}>
              <input
                type="number"
                placeholder="Customer ID"
                value={paymentForm.customerId}
                onChange={(e) => setPaymentForm({...paymentForm, customerId: e.target.value})}
                required
              />
              <input
                type="number"
                placeholder="Payment Amount ($)"
                value={paymentForm.amount}
                onChange={(e) => setPaymentForm({...paymentForm, amount: e.target.value})}
                required
              />
              <select
                value={paymentForm.paymentMethod}
                onChange={(e) => setPaymentForm({...paymentForm, paymentMethod: e.target.value})}
                required
              >
                <option value="">Select Payment Method</option>
                <option value="CREDIT_CARD">Credit Card</option>
                <option value="DEBIT_CARD">Debit Card</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
                <option value="UPI">UPI</option>
              </select>
              <button type="submit">Process Payment</button>
            </form>

            <h2>All Payments ({payments.length})</h2>
            <div className="grid">
              {payments.map(payment => (
                <div key={payment.id} className="card">
                  <h3>Payment #{payment.id}</h3>
                  <p>👤 Customer ID: {payment.customerId}</p>
                  <p>💰 Amount: ${payment.amount}</p>
                  <p>💳 Method: {payment.paymentMethod}</p>
                  <p>🔖 Transaction: {payment.transactionId}</p>
                  <p className={`status ${payment.status.toLowerCase()}`}>
                    {payment.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;