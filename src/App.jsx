import React, { useState, useMemo } from 'react';
import { Home, Users, DollarSign, Shield, Plus, Search, ChevronRight, ChevronLeft, Edit2, AlertTriangle, CheckCircle, Clock, Building, Building2, Moon, Sun, ShieldCheck, ShieldOff, X, ChevronDown, Landmark, Receipt, Wrench, Star, Phone, Mail, MapPin, Trash2, Settings, LayoutGrid, List, CreditCard, Upload, Image, GripVertical } from 'lucide-react';

const props = [
  { id: 1, addr: '123 Oak Street', city: 'Dallas', state: 'TX', zip: '75201', beds: 3, baths: 2, sqft: 1850, year: 1998, purchPrice: 245000, value: 310000, status: 'leased', loanId: 1, images: [] },
  { id: 2, addr: '456 Maple Avenue', city: 'Dallas', state: 'TX', zip: '75202', beds: 4, baths: 2.5, sqft: 2200, year: 2005, purchPrice: 320000, value: 385000, status: 'leased', loanId: 2, images: [] },
  { id: 3, addr: '789 Pine Road', city: 'Plano', state: 'TX', zip: '75023', beds: 3, baths: 2, sqft: 1650, year: 1992, purchPrice: 198000, value: 275000, status: 'leased', loanId: 3, images: [] },
  { id: 4, addr: '321 Elm Court', city: 'Frisco', state: 'TX', zip: '75034', beds: 4, baths: 3, sqft: 2600, year: 2015, purchPrice: 425000, value: 480000, status: 'vacant', loanId: 3, images: [] },
  { id: 5, addr: '555 Cedar Lane', city: 'McKinney', state: 'TX', zip: '75070', beds: 2, baths: 1, sqft: 1800, year: 1985, purchPrice: 175000, value: 245000, status: 'leased', loanId: 3, images: [] },
];

const lenders = [
  { id: 1, name: 'Wells Fargo', contact: 'John Smith', phone: '800-555-0100', email: 'jsmith@wellsfargo.com' },
  { id: 2, name: 'Chase Bank', contact: 'Mary Johnson', phone: '800-555-0200', email: 'mjohnson@chase.com' },
  { id: 3, name: 'First National Bank', contact: 'Robert Davis', phone: '972-555-0300', email: 'rdavis@fnb.com' },
];

const loans = [
  { id: 1, lenderId: 1, name: 'Oak Street Loan', type: 'Conventional', origDate: '2020-03-15', maturityDate: '2050-03-15', firstPaymentDate: '2020-05-01', origAmount: 196000, currBalance: 175000, rate: 6.5, term: 30, amortization: 30, pi: 1238, escrowTax: true, escrowIns: true, tax: 433, ins: 154, hoa: 0, accountNum: 'WF-2020-78432', loanOfficer: 'John Smith', loanOfficerEmail: 'jsmith@wellsfargo.com', loanOfficerPhone: '800-555-0101', 
    servicer: { name: 'Mr. Cooper', phone: '888-480-2432', email: 'support@mrcooper.com', website: 'www.mrcooper.com', accountNum: 'MC-78432-2021' },
    servicerHistory: [
      { id: 2, name: 'Mr. Cooper', accountNum: 'MC-78432-2021', phone: '888-480-2432', email: 'support@mrcooper.com', website: 'www.mrcooper.com', transferDate: '2021-06-01', notes: 'Wells Fargo sold servicing rights' },
      { id: 1, name: 'Wells Fargo (Original)', accountNum: 'WF-2020-78432', phone: '800-555-0100', email: 'servicing@wellsfargo.com', website: 'www.wellsfargo.com', transferDate: '2020-03-15', notes: 'Original lender' },
    ],
    taxHistory: [
      { id: 3, amount: 433, effectiveDate: '2024-01-01', notes: '2024 tax assessment increase' },
      { id: 2, amount: 398, effectiveDate: '2023-01-01', notes: '2023 assessment' },
      { id: 1, amount: 375, effectiveDate: '2020-03-15', notes: 'Original escrow amount' },
    ],
    insHistory: [
      { id: 2, amount: 154, effectiveDate: '2024-03-15', notes: 'Policy renewal - rate increase' },
      { id: 1, amount: 142, effectiveDate: '2020-03-15', notes: 'Original policy' },
    ],
    balanceHistory: [
      { id: 1, date: '2025-01-15', balance: 175000, source: 'statement', enteredBy: 'Preston', notes: 'Annual statement' },
      { id: 2, date: '2024-10-03', balance: 176800, source: 'statement', enteredBy: 'Preston', notes: '' },
      { id: 3, date: '2024-07-01', balance: 178500, source: 'statement', enteredBy: 'Preston', notes: 'Mid-year check' },
      { id: 4, date: '2024-01-10', balance: 181200, source: 'statement', enteredBy: 'Preston', notes: 'Annual statement' },
    ]},
  { id: 2, lenderId: 2, name: 'Maple Ave Loan', type: 'Conventional', origDate: '2021-08-01', maturityDate: '2051-08-01', firstPaymentDate: '2021-10-01', origAmount: 256000, currBalance: 245000, rate: 5.875, term: 30, amortization: 30, pi: 1746, escrowTax: true, escrowIns: true, tax: 650, ins: 200, hoa: 150, accountNum: 'CH-2021-45678', loanOfficer: 'Mary Johnson', loanOfficerEmail: 'mjohnson@chase.com', loanOfficerPhone: '800-555-0201', 
    servicer: null,
    servicerHistory: [
      { id: 1, name: 'Chase Bank (Original)', accountNum: 'CH-2021-45678', phone: '800-555-0200', email: 'servicing@chase.com', website: 'www.chase.com', transferDate: '2021-08-01', notes: 'Original lender - still servicing' },
    ],
    taxHistory: [
      { id: 2, amount: 650, effectiveDate: '2024-01-01', notes: '2024 assessment' },
      { id: 1, amount: 580, effectiveDate: '2021-08-01', notes: 'Original escrow' },
    ],
    insHistory: [
      { id: 1, amount: 200, effectiveDate: '2021-08-01', notes: 'Original policy' },
    ],
    balanceHistory: [
      { id: 1, date: '2025-01-20', balance: 245000, source: 'statement', enteredBy: 'Preston', notes: 'January statement' },
      { id: 2, date: '2024-07-15', balance: 248200, source: 'statement', enteredBy: 'Preston', notes: '' },
    ]},
  { id: 3, lenderId: 3, name: 'Portfolio Blanket Loan', type: 'Commercial Blanket', origDate: '2022-01-10', maturityDate: '2027-01-10', firstPaymentDate: '2022-03-01', origAmount: 650000, currBalance: 575000, rate: 7.25, term: 5, amortization: 25, pi: 4010, escrowTax: false, escrowIns: false, tax: 1500, ins: 492, hoa: 75, accountNum: 'FNB-2022-99001', loanOfficer: 'Robert Davis', loanOfficerEmail: 'rdavis@fnb.com', loanOfficerPhone: '972-555-0301', 
    servicer: { name: 'LoanCare', phone: '800-274-6600', email: 'customerservice@loancare.net', website: 'www.myloancare.com', accountNum: 'LC-99001-2022' }, 
    servicerHistory: [
      { id: 3, name: 'LoanCare', accountNum: 'LC-99001-2022', phone: '800-274-6600', email: 'customerservice@loancare.net', website: 'www.myloancare.com', transferDate: '2024-01-01', notes: 'Transferred from Cenlar' },
      { id: 2, name: 'Cenlar FSB', accountNum: 'CEN-99001-2023', phone: '800-250-2539', email: 'support@cenlar.com', website: 'www.cenlar.com', transferDate: '2023-03-01', notes: 'Transferred from FNB' },
      { id: 1, name: 'First National Bank (Original)', accountNum: 'FNB-2022-99001', phone: '972-555-0300', email: 'servicing@fnb.com', website: 'www.fnb.com', transferDate: '2022-01-10', notes: 'Original lender' },
    ],
    taxHistory: [
      { id: 2, amount: 1500, effectiveDate: '2024-01-01', notes: '2024 combined assessment for 3 properties' },
      { id: 1, amount: 1350, effectiveDate: '2022-01-10', notes: 'Original combined tax estimate' },
    ],
    insHistory: [
      { id: 3, amount: 492, effectiveDate: '2024-06-01', notes: 'Added umbrella coverage' },
      { id: 2, amount: 425, effectiveDate: '2023-06-01', notes: 'Policy renewal' },
      { id: 1, amount: 380, effectiveDate: '2022-01-10', notes: 'Original blanket policy' },
    ],
    notes: 'Cross-collateralized - 3 properties. Balloon payment due at maturity. Renewal option available 6 months prior.', 
    balanceHistory: [
      { id: 1, date: '2025-01-05', balance: 575000, source: 'statement', enteredBy: 'Preston', notes: 'January statement' },
      { id: 2, date: '2024-10-01', balance: 582000, source: 'statement', enteredBy: 'Preston', notes: '' },
      { id: 3, date: '2024-07-01', balance: 589000, source: 'statement', enteredBy: 'Preston', notes: '' },
      { id: 4, date: '2024-04-01', balance: 596000, source: 'statement', enteredBy: 'Preston', notes: 'Q1 statement' },
      { id: 5, date: '2024-01-02', balance: 603000, source: 'statement', enteredBy: 'Preston', notes: 'Annual review with bank' },
    ]},
];

const tenantsData = [
  { id: 1, name: 'Michael Williams', email: 'mwilliams@email.com', phone: '214-555-0101', ri: true },
  { id: 2, name: 'Jennifer Garcia', email: 'jgarcia@email.com', phone: '214-555-0201', ri: true },
  { id: 3, name: 'David Chen', email: 'dchen@email.com', phone: '469-555-0301', ri: false },
  { id: 4, name: 'Amanda Foster', email: 'afoster@email.com', phone: '972-555-0401', ri: true },
  { id: 5, name: 'Kevin Martinez', email: 'kmartinez@email.com', phone: '214-555-0901', ri: true },
  { id: 6, name: 'Sarah Johnson', email: 'sjohnson@email.com', phone: '214-555-0601', ri: true },
  { id: 7, name: 'Robert Brown', email: 'rbrown@email.com', phone: '469-555-0701', ri: false },
];

// Lease history with deposit tracking
const leasesData = [
  // Property 1 - two tenants over time
  { id: 1, propId: 1, tenantId: 6, start: '2020-01-15', end: '2022-12-31', rent: 1650, dueDay: 1, paymentMethod: 'Check', deposit: { amount: 1650, method: 'Check', paidDate: '2020-01-10', returned: true, returnedDate: '2023-01-15', returnedAmount: 1500, notes: 'Deducted $150 for carpet cleaning' }, status: 'ended' },
  { id: 2, propId: 1, tenantId: 1, start: '2023-04-01', end: '2025-03-31', rent: 1850, dueDay: 1, paymentMethod: 'Zelle', deposit: { amount: 1850, method: 'Zelle', paidDate: '2023-03-25', returned: false }, status: 'active' },
  // Property 2
  { id: 3, propId: 2, tenantId: 2, start: '2022-08-15', end: '2025-08-14', rent: 2400, dueDay: 15, paymentMethod: 'Zillow', deposit: { amount: 2400, method: 'Cashier Check', paidDate: '2022-08-10', returned: false }, status: 'active' },
  // Property 3 - three tenants over time, current tenant behind on rent
  { id: 4, propId: 3, tenantId: 7, start: '2019-06-01', end: '2021-05-31', rent: 1400, dueDay: 1, paymentMethod: 'Check', deposit: { amount: 1400, method: 'Money Order', paidDate: '2019-05-25', returned: true, returnedDate: '2021-06-15', returnedAmount: 1400, notes: 'Full refund, good tenant' }, status: 'ended' },
  { id: 5, propId: 3, tenantId: 6, start: '2021-07-01', end: '2023-06-30', rent: 1500, dueDay: 1, paymentMethod: 'Zelle', deposit: { amount: 1500, method: 'Zelle', paidDate: '2021-06-25', returned: true, returnedDate: '2023-07-10', returnedAmount: 1200, notes: 'Deducted $300 for wall repairs' }, status: 'ended' },
  { id: 6, propId: 3, tenantId: 3, start: '2023-08-01', end: '2025-07-31', rent: 1650, dueDay: 1, paymentMethod: 'CashApp', deposit: { amount: 1650, method: 'CashApp', paidDate: '2023-07-28', returned: false }, status: 'active' },
  // Property 4 - was leased, now vacant
  { id: 7, propId: 4, tenantId: 7, start: '2022-03-01', end: '2024-11-30', rent: 2800, dueDay: 1, paymentMethod: 'Direct Deposit', deposit: { amount: 2800, method: 'Check', paidDate: '2022-02-20', returned: true, returnedDate: '2024-12-15', returnedAmount: 2100, notes: 'Deducted $700 for damages and cleaning' }, status: 'ended' },
  // Property 5 - duplex with two units
  { id: 8, propId: 5, tenantId: 4, unit: 'A', start: '2024-01-15', end: '2025-01-14', rent: 1100, dueDay: 15, paymentMethod: 'Venmo', deposit: { amount: 1100, method: 'Venmo', paidDate: '2024-01-10', returned: false }, status: 'active' },
  { id: 9, propId: 5, tenantId: 5, unit: 'B', start: '2023-06-01', end: '2025-05-31', rent: 1050, dueDay: 1, paymentMethod: 'Zelle', deposit: { amount: 1050, method: 'Zelle', paidDate: '2023-05-28', returned: false }, status: 'active' },
];

// Payments with method tracking - David Chen (lease 6) is behind
const payments = [
  // Property 1 - current tenant (Michael Williams) - paid up
  { id: 1, leaseId: 2, amt: 1850, due: '2025-02-01', paid: '2025-02-01', method: 'Zelle', status: 'paid' },
  { id: 2, leaseId: 2, amt: 1850, due: '2025-01-01', paid: '2025-01-01', method: 'Zelle', status: 'paid' },
  { id: 3, leaseId: 2, amt: 1850, due: '2024-12-01', paid: '2024-12-01', method: 'Zelle', status: 'paid' },
  { id: 4, leaseId: 2, amt: 1850, due: '2024-11-01', paid: '2024-11-03', method: 'Zelle', status: 'paid', daysLate: 2 },
  // Property 1 - previous tenant (Sarah Johnson)
  { id: 5, leaseId: 1, amt: 1650, due: '2022-12-01', paid: '2022-12-01', method: 'Check', status: 'paid' },
  { id: 6, leaseId: 1, amt: 1650, due: '2022-11-01', paid: '2022-11-05', method: 'Check', status: 'paid', daysLate: 4 },
  // Property 2 - Jennifer Garcia - paid but sometimes late
  { id: 7, leaseId: 3, amt: 2400, due: '2025-01-15', paid: '2025-01-20', method: 'Zillow', status: 'paid', daysLate: 5, lateFee: 120 },
  { id: 8, leaseId: 3, amt: 2400, due: '2024-12-15', paid: '2024-12-15', method: 'Zillow', status: 'paid' },
  // Property 3 - David Chen - 2 MONTHS BEHIND
  { id: 9, leaseId: 6, amt: 1650, due: '2025-02-01', paid: null, method: null, status: 'due' },
  { id: 10, leaseId: 6, amt: 1650, due: '2025-01-01', paid: null, method: null, status: 'overdue', daysLate: 31 },
  { id: 11, leaseId: 6, amt: 1650, due: '2024-12-01', paid: '2024-12-08', method: 'CashApp', status: 'paid', daysLate: 7, lateFee: 82 },
  { id: 12, leaseId: 6, amt: 1650, due: '2024-11-01', paid: '2024-11-01', method: 'CashApp', status: 'paid' },
  // Property 3 - previous tenant payments
  { id: 13, leaseId: 5, amt: 1500, due: '2023-06-01', paid: '2023-06-01', method: 'Zelle', status: 'paid' },
  // Property 4 - previous tenant (Robert Brown) before vacancy
  { id: 14, leaseId: 7, amt: 2800, due: '2024-11-01', paid: '2024-11-01', method: 'Direct Deposit', status: 'paid' },
  { id: 15, leaseId: 7, amt: 2800, due: '2024-10-01', paid: '2024-10-15', method: 'Direct Deposit', status: 'paid', daysLate: 14, lateFee: 140 },
  // Property 5 - Unit A (Amanda Foster)
  { id: 16, leaseId: 8, amt: 1100, due: '2025-01-15', paid: '2025-01-15', method: 'Venmo', status: 'paid' },
  // Property 5 - Unit B (Kevin Martinez)
  { id: 17, leaseId: 9, amt: 1050, due: '2025-01-01', paid: '2025-01-03', method: 'Zelle', status: 'paid', daysLate: 2 },
];

const defaultPaymentMethods = ['Zelle', 'CashApp', 'Venmo', 'Check', 'Direct Deposit', 'Zillow', 'Money Order', 'Cash', 'ACH', 'Wire', 'Credit Card', 'Other'];

const defaultExpenseCategories = ['Repairs', 'Maintenance', 'Capital Improvement', 'Insurance', 'Property Tax', 'HOA', 'Utilities', 'Property Management', 'Legal', 'Advertising', 'Supplies', 'Other'];

const expenses = [
  { id: 1, propId: 1, date: '2024-12-15', amount: 450, category: 'Repairs', payee: 'ABC Plumbing', contractorId: 1, method: 'Check', checkNum: '1042', description: 'Fixed leaking water heater', notes: 'Annual inspection recommended', receipt: null },
  { id: 2, propId: 1, date: '2024-08-20', amount: 8500, category: 'Capital Improvement', payee: 'Cool Air HVAC', contractorId: 2, method: 'Check', checkNum: '1038', description: 'New HVAC system installed', notes: '10 year warranty, registered with manufacturer', receipt: null },
  { id: 3, propId: 2, date: '2025-01-05', amount: 150, category: 'HOA', payee: 'Maple Avenue HOA', contractorId: null, method: 'Direct Deposit', checkNum: null, description: 'Monthly HOA dues - January', notes: '', receipt: null },
  { id: 4, propId: 2, date: '2024-11-10', amount: 275, category: 'Maintenance', payee: 'Green Lawn Care', contractorId: 3, method: 'Zelle', checkNum: null, description: 'Fall cleanup and leaf removal', notes: 'Quarterly service', receipt: null },
  { id: 5, propId: 3, date: '2024-10-01', amount: 1200, category: 'Repairs', payee: 'Roof Masters', contractorId: 6, method: 'Check', checkNum: '1035', description: 'Repaired roof leak over bedroom', notes: 'May need full replacement in 2-3 years', receipt: null },
  { id: 6, propId: 4, date: '2025-01-20', amount: 2800, category: 'Maintenance', payee: 'Fresh Start Painting', contractorId: 9, method: 'Check', checkNum: '1040', description: 'Full interior paint - turnover', notes: 'Sherwin Williams Agreeable Gray throughout', receipt: null },
  { id: 7, propId: 4, date: '2025-01-22', amount: 1950, category: 'Maintenance', payee: 'Carpet World', contractorId: null, method: 'Check', checkNum: '1041', description: 'New carpet in bedrooms and stairs', notes: 'Receipt saved for taxes', receipt: null },
  { id: 8, propId: 5, date: '2024-09-15', amount: 325, category: 'Repairs', payee: 'Handy Dan', contractorId: 10, method: 'CashApp', checkNum: null, description: 'Fixed garbage disposal Unit A', notes: '', receipt: null },
  { id: 9, propId: 5, date: '2024-06-01', amount: 185, category: 'Maintenance', payee: 'Pest Control Pro', contractorId: 7, method: 'Zelle', checkNum: null, description: 'Quarterly pest treatment', notes: 'Both units', receipt: null },
  { id: 10, propId: 3, date: '2024-07-15', amount: 95, category: 'Supplies', payee: 'Home Depot', contractorId: null, method: 'Credit Card', checkNum: null, description: 'Air filters, smoke detector batteries', notes: 'Stock for all properties', receipt: null },
];

const contractorsData = [
  { id: 1, name: 'ABC Plumbing', category: 'Plumbing', phone: '214-555-1001', email: 'service@abcplumbing.com', address: '123 Main St, Dallas, TX', notes: 'Available 24/7 emergency', rating: 5, active: true },
  { id: 2, name: 'Cool Air HVAC', category: 'HVAC', phone: '214-555-2002', email: 'info@coolairhvac.com', address: '456 Oak Ave, Dallas, TX', notes: 'Licensed and insured', rating: 4, active: true },
  { id: 3, name: 'Green Lawn Care', category: 'Landscaping', phone: '469-555-3003', email: 'greencare@email.com', address: '789 Elm Rd, Plano, TX', notes: 'Monthly service $175', rating: 5, active: true },
  { id: 4, name: 'Dallas Flooring Co', category: 'Flooring', phone: '972-555-4004', email: 'sales@dallasflooring.com', address: '321 Cedar Ln, Frisco, TX', notes: 'Good prices on laminate', rating: 4, active: true },
  { id: 5, name: 'SecureHome Systems', category: 'Security', phone: '214-555-5005', email: 'install@securehome.com', address: '555 Pine St, Dallas, TX', notes: '', rating: 4, active: true },
  { id: 6, name: 'Roof Masters', category: 'Roofing', phone: '469-555-6006', email: 'quotes@roofmasters.com', address: '777 Maple Dr, McKinney, TX', notes: 'Storm damage specialists', rating: 5, active: true },
  { id: 7, name: 'Pest Control Pro', category: 'Pest Control', phone: '972-555-7007', email: 'service@pestpro.com', address: '888 Birch Blvd, Richardson, TX', notes: 'Quarterly treatments', rating: 4, active: true },
  { id: 8, name: 'Sparkle Electric', category: 'Electrical', phone: '214-555-8008', email: 'sparky@sparkleelectric.com', address: '999 Walnut Way, Dallas, TX', notes: 'Master electrician', rating: 5, active: true },
  { id: 9, name: 'Fresh Start Painting', category: 'Painting', phone: '469-555-9009', email: 'jobs@freshstartpainting.com', address: '111 Ash Ct, Plano, TX', notes: 'Turnover specialist', rating: 4, active: true },
  { id: 10, name: 'Handy Dan', category: 'General', phone: '214-555-0010', email: 'dan@handydan.com', address: '222 Commerce St, Dallas, TX', notes: 'Good for small jobs', rating: 3, active: true },
];

const contractorCategories = ['All', 'Plumbing', 'HVAC', 'Electrical', 'Roofing', 'Landscaping', 'Painting', 'Flooring', 'Security', 'Pest Control', 'General'];

const fmt = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n || 0);
const fmtDate = d => d ? new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
const daysUntil = d => d ? Math.ceil((new Date(d) - new Date()) / 86400000) : null;

export default function App() {
  const [dark, setDark] = useState(false);
  const [view, setView] = useState('properties');
  const [selId, setSelId] = useState(null);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [paymentMethodFilter, setPaymentMethodFilter] = useState([]);
  const [paymentMethodOpen, setPaymentMethodOpen] = useState(false);
  const [propertyViewMode, setPropertyViewMode] = useState('table');
  const [gridColumns, setGridColumns] = useState(3);
  const [showGridColumnPicker, setShowGridColumnPicker] = useState(false);
  const [cardLayout, setCardLayout] = useState('A');
  const [cityOpen, setCityOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState('asc');
  const [tab, setTab] = useState('overview');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentForm, setPaymentForm] = useState({ leaseId: '', amt: '', date: new Date().toISOString().split('T')[0], method: 'Zelle', periodStart: '', periodEnd: '', notes: '', lateFee: '' });
  const [allPayments, setAllPayments] = useState(payments);
  const [allExpenses, setAllExpenses] = useState(expenses);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expenseForm, setExpenseForm] = useState({ propId: '', date: new Date().toISOString().split('T')[0], amount: '', category: 'Repairs', payee: '', contractorId: '', method: 'Check', checkNum: '', description: '', notes: '', receipt: null });
  const [allLoans, setAllLoans] = useState(loans);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [balanceForm, setBalanceForm] = useState({ loanId: '', balance: '', date: new Date().toISOString().split('T')[0], source: 'statement', notes: '' });
  const [showLoanEditModal, setShowLoanEditModal] = useState(false);
  const [loanEditForm, setLoanEditForm] = useState(null);
  const [showServicerModal, setShowServicerModal] = useState(false);
  const [servicerForm, setServicerForm] = useState({ loanId: '', name: '', accountNum: '', phone: '', email: '', website: '', transferDate: new Date().toISOString().split('T')[0], notes: '' });
  const [showTaxUpdateModal, setShowTaxUpdateModal] = useState(false);
  const [taxForm, setTaxForm] = useState({ loanId: '', amount: '', effectiveDate: new Date().toISOString().split('T')[0], notes: '' });
  const [showInsUpdateModal, setShowInsUpdateModal] = useState(false);
  const [insForm, setInsForm] = useState({ loanId: '', amount: '', effectiveDate: new Date().toISOString().split('T')[0], notes: '' });
  const [expandedLoan, setExpandedLoan] = useState(null);
  const [loanSearch, setLoanSearch] = useState('');
  const [loanSort, setLoanSort] = useState('balance');
  const [allTenants, setAllTenants] = useState(tenantsData);
  const [showTenantEditModal, setShowTenantEditModal] = useState(false);
  const [tenantEditForm, setTenantEditForm] = useState(null);
  const [allLeases, setAllLeases] = useState(leasesData);
  const [showLeaseEditModal, setShowLeaseEditModal] = useState(false);
  const [leaseEditForm, setLeaseEditForm] = useState(null);
  const [allContractors, setAllContractors] = useState(contractorsData);
  const [showContractorModal, setShowContractorModal] = useState(false);
  const [contractorForm, setContractorForm] = useState(null);
  const [contractorSearch, setContractorSearch] = useState('');
  const [contractorCategoryFilter, setContractorCategoryFilter] = useState([]);
  const [contractorFilterOpen, setContractorFilterOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [expenseCategories, setExpenseCategories] = useState(defaultExpenseCategories);
  const [paymentMethods, setPaymentMethods] = useState(defaultPaymentMethods);
  const [newCategory, setNewCategory] = useState('');
  const [newPaymentMethod, setNewPaymentMethod] = useState('');
  const [expenseDropdowns, setExpenseDropdowns] = useState({ property: false, category: false, contractor: false, method: false });
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenseDateFrom, setExpenseDateFrom] = useState('');
  const [expenseDateTo, setExpenseDateTo] = useState('');
  const [expenseSort, setExpenseSort] = useState({ col: 'date', dir: 'desc' });
  const [paymentDateFrom, setPaymentDateFrom] = useState('');
  const [paymentDateTo, setPaymentDateTo] = useState('');
  const [paymentSort, setPaymentSort] = useState({ col: 'due', dir: 'desc' });
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');
  const [paymentSearch, setPaymentSearch] = useState('');
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [addPaymentForm, setAddPaymentForm] = useState({ leaseId: '', amt: '', method: 'Zelle', date: '', due: '', status: 'paid', lateFee: '', periodStart: '', periodEnd: '', notes: '' });
  const [addPaymentSearch, setAddPaymentSearch] = useState('');
  const [addPaymentDropdownOpen, setAddPaymentDropdownOpen] = useState(false);
  const [showTenantModal, setShowTenantModal] = useState(false);
  const [tenantForm, setTenantForm] = useState({ name: '', email: '', phone: '', propId: '', leaseStart: '', leaseEnd: '', rent: '', unit: '', ri: false, depositAmount: '', depositMethod: '', depositDate: '', paymentMethod: 'Zelle' });
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [tenantSearch, setTenantSearch] = useState('');
  const [tenantPaymentMethodFilter, setTenantPaymentMethodFilter] = useState([]);
  const [tenantPaymentMethodOpen, setTenantPaymentMethodOpen] = useState(false);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [propertyForm, setPropertyForm] = useState({ addr: '', city: '', state: 'TX', zip: '', beds: '', baths: '', sqft: '', year: '', purchPrice: '', value: '', status: 'vacant', images: [] });
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [loanForm, setLoanForm] = useState({ propId: '', name: '', lenderId: '', type: 'Conventional', origDate: '', origAmount: '', rate: '', term: '30', pi: '' });
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [policyForm, setPolicyForm] = useState({ propId: '', type: 'Homeowners', provider: '', policyNum: '', premium: '', deductible: '', start: '', end: '' });

  const tenants = allTenants;
  const leases = allLeases;
  const contractors = allContractors;

  const th = {
    bg: dark ? 'bg-slate-950' : 'bg-gray-100',
    card: dark ? 'bg-slate-900' : 'bg-white',
    card2: dark ? 'bg-slate-800' : 'bg-gray-50',
    txt: dark ? 'text-white' : 'text-gray-900',
    txt2: dark ? 'text-slate-300' : 'text-gray-600',
    mut: dark ? 'text-slate-400' : 'text-gray-500',
    bdr: dark ? 'border-slate-700' : 'border-gray-200',
    hov: dark ? 'hover:bg-slate-800' : 'hover:bg-gray-50',
  };

  const getTenants = pid => tenants.filter(t => leases.some(l => l.propId === pid && l.tenantId === t.id && l.status === 'active'));
  const getActiveLeases = pid => leases.filter(l => l.propId === pid && l.status === 'active');
  const getAllLeases = pid => leases.filter(l => l.propId === pid).sort((a, b) => new Date(b.start) - new Date(a.start));
  const getLeasePayments = leaseId => allPayments.filter(p => p.leaseId === leaseId).sort((a, b) => new Date(b.due) - new Date(a.due));
  const getPropPayments = pid => {
    const propLeaseIds = leases.filter(l => l.propId === pid).map(l => l.id);
    return allPayments.filter(p => propLeaseIds.includes(p.leaseId)).sort((a, b) => new Date(b.due) - new Date(a.due));
  };
  const getOutstandingBalance = leaseId => {
    const unpaid = allPayments.filter(p => p.leaseId === leaseId && (p.status === 'overdue' || p.status === 'due'));
    const total = unpaid.reduce((s, p) => s + p.amt + (p.lateFee || 0), 0);
    return { count: unpaid.length, total, payments: unpaid };
  };
  const getNextDueDate = lease => {
    if (!lease || lease.status !== 'active') return null;
    const today = new Date();
    const dueDay = lease.dueDay || 1;
    let nextDue = new Date(today.getFullYear(), today.getMonth(), dueDay);
    if (nextDue <= today) {
      nextDue = new Date(today.getFullYear(), today.getMonth() + 1, dueDay);
    }
    return nextDue.toISOString().split('T')[0];
  };
  const getRent = pid => getActiveLeases(pid).reduce((s, l) => s + l.rent, 0);
  const getLeaseEnd = pid => {
    const active = getActiveLeases(pid);
    if (active.length === 0) return null;
    return active.reduce((earliest, l) => l.end < earliest ? l.end : earliest, active[0].end);
  };
  const getPay = p => { const loan = getLoan(p.id); if (!loan) return 0; const propCount = getPropsOnLoan(loan.id).length; return (loan.pi + loan.tax + loan.ins + loan.hoa) / propCount; };
  const getCash = p => getRent(p.id) - getPay(p);
  const getEq = p => { const loan = getLoan(p.id); if (!loan) return p.value; const propCount = getPropsOnLoan(loan.id).length; return p.value - (loan.currBalance / propCount); };
  const getTenantById = id => tenants.find(t => t.id === id);
  const getLoan = propId => { const p = props.find(pr => pr.id === propId); return p ? allLoans.find(l => l.id === p.loanId) : null; };
  const getLender = loanId => { const loan = allLoans.find(l => l.id === loanId); return loan ? lenders.find(le => le.id === loan.lenderId) : null; };
  const getPropsOnLoan = loanId => props.filter(p => p.loanId === loanId);
  const getPropExpenses = propId => allExpenses.filter(e => e.propId === propId).sort((a, b) => new Date(b.date) - new Date(a.date));
  const getTotalExpenses = propId => getPropExpenses(propId).reduce((s, e) => s + e.amount, 0);

  const cities = [...new Set(props.map(p => p.city))];
  const statuses = ['leased', 'vacant'];

  const filtered = useMemo(() => {
    let r = [...props];
    if (search) { const q = search.toLowerCase(); r = r.filter(p => p.addr.toLowerCase().includes(q) || p.city.toLowerCase().includes(q) || p.zip.includes(q)); }
    if (cityFilter.length > 0) r = r.filter(p => cityFilter.includes(p.city));
    if (statusFilter.length > 0) r = r.filter(p => statusFilter.includes(p.status));
    if (paymentMethodFilter.length > 0) {
      r = r.filter(p => {
        const activeLeases = allLeases.filter(l => l.propId === p.id && l.status === 'active');
        return activeLeases.some(l => paymentMethodFilter.includes(l.paymentMethod));
      });
    }
    
    r.sort((a, b) => {
      let aVal, bVal;
      if (sortBy === 'id') { aVal = a.id; bVal = b.id; }
      else if (sortBy === 'leaseEnd') { aVal = getLeaseEnd(a.id) || '9999'; bVal = getLeaseEnd(b.id) || '9999'; }
      else if (sortBy === 'rent') { aVal = getRent(a.id); bVal = getRent(b.id); }
      else if (sortBy === 'cash') { aVal = getCash(a); bVal = getCash(b); }
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return r;
  }, [search, cityFilter, statusFilter, paymentMethodFilter, sortBy, sortDir, allLeases]);

  const activePaymentMethods = useMemo(() => {
    const methods = new Set();
    allLeases.filter(l => l.status === 'active' && l.paymentMethod).forEach(l => methods.add(l.paymentMethod));
    return [...methods].sort();
  }, [allLeases]);

  const togglePaymentMethod = m => setPaymentMethodFilter(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
  const toggleTenantPaymentMethod = m => setTenantPaymentMethodFilter(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);

  const filteredTenants = useMemo(() => {
    let r = [...allTenants];
    if (tenantSearch) {
      const q = tenantSearch.toLowerCase();
      r = r.filter(t => {
        const lease = allLeases.find(l => l.tenantId === t.id && l.status === 'active');
        const prop = lease ? props.find(p => p.id === lease.propId) : null;
        return t.name.toLowerCase().includes(q) || 
               t.email?.toLowerCase().includes(q) || 
               t.phone?.includes(q) ||
               prop?.addr.toLowerCase().includes(q);
      });
    }
    if (tenantPaymentMethodFilter.length > 0) {
      r = r.filter(t => {
        const lease = allLeases.find(l => l.tenantId === t.id && l.status === 'active');
        return lease && tenantPaymentMethodFilter.includes(lease.paymentMethod);
      });
    }
    return r;

  const selectedContractorData = useMemo(() => {
    if (!selectedContractor) return null;
    const c = contractors.find(ct => ct.id === selectedContractor);
    if (!c) return null;
    const contractorExpenses = getContractorExpenses(c.id);
    const totalPaid = contractorExpenses.reduce((s, e) => s + e.amount, 0);
    return { c, contractorExpenses, totalPaid };
  }, [selectedContractor, contractors, expenses]);

  const filteredLoans = useMemo(() => {
    return allLoans.filter(l => {
      if (!loanSearch) return true;
      const q = loanSearch.toLowerCase();
      const lender = lenders.find(le => le.id === l.lenderId);
      const loanProps = getPropsOnLoan(l.id);
      return l.name.toLowerCase().includes(q) || 
             lender?.name.toLowerCase().includes(q) ||
             l.accountNum.toLowerCase().includes(q) ||
             loanProps.some(p => p.addr.toLowerCase().includes(q));
    }).sort((a, b) => {
      if (loanSort === 'balance') return b.currBalance - a.currBalance;
      if (loanSort === 'payment') return (b.pi + b.tax + b.ins + b.hoa) - (a.pi + a.tax + a.ins + a.hoa);
      if (loanSort === 'rate') return b.rate - a.rate;
      if (loanSort === 'properties') return getPropsOnLoan(b.id).length - getPropsOnLoan(a.id).length;
      return 0;
    });
  }, [allLoans, loanSearch, loanSort]);
  }, [allTenants, allLeases, tenantSearch, tenantPaymentMethodFilter]);

  const metrics = {
    total: props.length,
    leased: props.filter(p => p.status === 'leased').length,
    rent: leases.filter(l => l.status === 'active').reduce((s, l) => s + l.rent, 0),
    cash: props.reduce((s, p) => s + getCash(p), 0),
    equity: props.reduce((s, p) => s + p.value, 0) - loans.reduce((s, l) => s + l.currBalance, 0),
    value: props.reduce((s, p) => s + p.value, 0),
    overdue: allPayments.filter(p => p.status === 'overdue').length,
  };

  const toggleCity = c => setCityFilter(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  const toggleStatus = s => setStatusFilter(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const toggleSort = col => { if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc'); else { setSortBy(col); setSortDir('asc'); } };

  const openPaymentModal = (leaseId = '', amt = '') => {
    const activeLeases = prop ? getActiveLeases(prop.id) : [];
    setPaymentForm({ 
      leaseId: leaseId || (activeLeases.length === 1 ? activeLeases[0].id : ''), 
      amt: amt || (activeLeases.length === 1 ? activeLeases[0].rent : ''),
      date: new Date().toISOString().split('T')[0],
      method: 'Zelle'
    });
    setShowPaymentModal(true);
  };

  const recordPayment = () => {
    if (!paymentForm.leaseId || !paymentForm.amt || !paymentForm.method) return;
    const lease = leases.find(l => l.id === parseInt(paymentForm.leaseId));
    if (!lease) return;
    
    // Calculate if payment is late
    const dueDay = lease.dueDay || 1;
    const payDate = new Date(paymentForm.date);
    const dueDate = new Date(payDate.getFullYear(), payDate.getMonth(), dueDay);
    const daysLate = payDate > dueDate ? Math.ceil((payDate - dueDate) / 86400000) : 0;
    
    const newPayment = {
      id: Math.max(...allPayments.map(p => p.id)) + 1,
      leaseId: parseInt(paymentForm.leaseId),
      amt: parseFloat(paymentForm.amt),
      due: `${payDate.getFullYear()}-${String(payDate.getMonth() + 1).padStart(2, '0')}-${String(dueDay).padStart(2, '0')}`,
      paid: paymentForm.date,
      method: paymentForm.method,
      status: 'paid',
      daysLate: daysLate || undefined,
      lateFee: paymentForm.lateFee ? parseFloat(paymentForm.lateFee) : undefined,
      periodStart: paymentForm.periodStart || undefined,
      periodEnd: paymentForm.periodEnd || undefined,
      notes: paymentForm.notes || undefined
    };
    
    // Also mark any overdue/due payments for this lease as paid if they match the amount
    const updatedPayments = allPayments.map(p => {
      if (p.leaseId === parseInt(paymentForm.leaseId) && (p.status === 'overdue' || p.status === 'due') && p.amt === parseFloat(paymentForm.amt)) {
        return { ...p, status: 'paid', paid: paymentForm.date, method: paymentForm.method };
      }
      return p;
    });
    
    setAllPayments([newPayment, ...updatedPayments.filter(p => p.id !== newPayment.id)]);
    setShowPaymentModal(false);
    setPaymentForm({ leaseId: '', amt: '', date: new Date().toISOString().split('T')[0], method: 'Zelle', periodStart: '', periodEnd: '', notes: '', lateFee: '' });
  };

  const openExpenseModal = (propId = '', expense = null) => {
    if (expense) {
      // Editing existing expense
      setExpenseForm({
        id: expense.id,
        propId: expense.propId || '',
        date: expense.date,
        amount: expense.amount,
        category: expense.category,
        payee: expense.payee,
        contractorId: expense.contractorId || '',
        method: expense.method,
        checkNum: expense.checkNum || '',
        description: expense.description,
        notes: expense.notes,
        receipt: expense.receipt
      });
    } else {
      // New expense
      setExpenseForm({
        id: null,
        propId: propId || (prop ? prop.id : ''),
        date: new Date().toISOString().split('T')[0],
        amount: '',
        category: 'Repairs',
        payee: '',
        contractorId: '',
        method: 'Check',
        checkNum: '',
        description: '',
        notes: '',
        receipt: null
      });
    }
    setShowExpenseModal(true);
  };

  const recordExpense = () => {
    if (!expenseForm.amount || !expenseForm.category || !expenseForm.payee) return;
    
    if (expenseForm.id) {
      // Update existing
      setAllExpenses(allExpenses.map(e => {
        if (e.id === expenseForm.id) {
          return {
            ...e,
            propId: expenseForm.propId ? parseInt(expenseForm.propId) : null,
            date: expenseForm.date,
            amount: parseFloat(expenseForm.amount),
            category: expenseForm.category,
            payee: expenseForm.payee,
            contractorId: expenseForm.contractorId ? parseInt(expenseForm.contractorId) : null,
            method: expenseForm.method,
            checkNum: expenseForm.checkNum,
            description: expenseForm.description,
            notes: expenseForm.notes,
            receipt: expenseForm.receipt
          };
        }
        return e;
      }));
    } else {
      // Create new
      const newExpense = {
        id: Math.max(...allExpenses.map(e => e.id), 0) + 1,
        propId: expenseForm.propId ? parseInt(expenseForm.propId) : null,
        date: expenseForm.date,
        amount: parseFloat(expenseForm.amount),
        category: expenseForm.category,
        payee: expenseForm.payee,
        contractorId: expenseForm.contractorId ? parseInt(expenseForm.contractorId) : null,
        method: expenseForm.method,
        checkNum: expenseForm.checkNum,
        description: expenseForm.description,
        notes: expenseForm.notes,
        receipt: expenseForm.receipt
      };
      setAllExpenses([newExpense, ...allExpenses]);
    }
    
    setShowExpenseModal(false);
    setExpenseForm({ id: null, propId: '', date: new Date().toISOString().split('T')[0], amount: '', category: 'Repairs', payee: '', contractorId: '', method: 'Check', checkNum: '', description: '', notes: '', receipt: null });
  };

  const openBalanceModal = (loanId) => {
    const loan = allLoans.find(l => l.id === loanId);
    setBalanceForm({
      loanId: loanId,
      balance: loan?.currBalance || '',
      date: new Date().toISOString().split('T')[0],
      source: 'statement',
      notes: ''
    });
    setShowBalanceModal(true);
  };

  const recordBalanceUpdate = () => {
    if (!balanceForm.loanId || !balanceForm.balance) return;
    
    const newEntry = {
      id: Date.now(),
      date: balanceForm.date,
      balance: parseFloat(balanceForm.balance),
      source: balanceForm.source,
      enteredBy: 'User',
      notes: balanceForm.notes
    };
    
    setAllLoans(allLoans.map(loan => {
      if (loan.id === balanceForm.loanId) {
        return {
          ...loan,
          currBalance: parseFloat(balanceForm.balance),
          balanceHistory: [newEntry, ...(loan.balanceHistory || [])]
        };
      }
      return loan;
    }));
    
    setShowBalanceModal(false);
    setBalanceForm({ loanId: '', balance: '', date: new Date().toISOString().split('T')[0], source: 'statement', notes: '' });
  };

  const openLoanEditModal = (loan) => {
    setLoanEditForm({
      ...loan,
      hasServicer: !!loan.servicer,
      servicerName: loan.servicer?.name || '',
      servicerPhone: loan.servicer?.phone || '',
      servicerEmail: loan.servicer?.email || '',
      servicerWebsite: loan.servicer?.website || '',
      servicerAccountNum: loan.servicer?.accountNum || ''
    });
    setShowLoanEditModal(true);
  };

  const saveLoanEdit = () => {
    if (!loanEditForm) return;
    setAllLoans(allLoans.map(l => {
      if (l.id === loanEditForm.id) {
        return {
          ...l,
          name: loanEditForm.name,
          type: loanEditForm.type,
          accountNum: loanEditForm.accountNum,
          rate: parseFloat(loanEditForm.rate) || l.rate,
          pi: parseFloat(loanEditForm.pi) || l.pi,
          tax: parseFloat(loanEditForm.tax) || l.tax,
          ins: parseFloat(loanEditForm.ins) || l.ins,
          hoa: parseFloat(loanEditForm.hoa) || l.hoa,
          escrowTax: loanEditForm.escrowTax,
          escrowIns: loanEditForm.escrowIns,
          maturityDate: loanEditForm.maturityDate,
          loanOfficer: loanEditForm.loanOfficer,
          loanOfficerPhone: loanEditForm.loanOfficerPhone,
          loanOfficerEmail: loanEditForm.loanOfficerEmail,
          notes: loanEditForm.notes,
          servicer: loanEditForm.hasServicer ? {
            name: loanEditForm.servicerName,
            phone: loanEditForm.servicerPhone,
            email: loanEditForm.servicerEmail,
            website: loanEditForm.servicerWebsite,
            accountNum: loanEditForm.servicerAccountNum
          } : null
        };
      }
      return l;
    }));
    setShowLoanEditModal(false);
    setLoanEditForm(null);
  };

  const openServicerModal = (loanId) => {
    setServicerForm({ loanId, name: '', accountNum: '', phone: '', email: '', website: '', transferDate: new Date().toISOString().split('T')[0], notes: '' });
    setShowServicerModal(true);
  };

  const addServicerTransfer = () => {
    if (!servicerForm.loanId || !servicerForm.name) return;
    const newServicer = {
      id: Date.now(),
      name: servicerForm.name,
      accountNum: servicerForm.accountNum,
      phone: servicerForm.phone,
      email: servicerForm.email,
      website: servicerForm.website,
      transferDate: servicerForm.transferDate,
      notes: servicerForm.notes
    };
    setAllLoans(allLoans.map(l => {
      if (l.id === servicerForm.loanId) {
        return {
          ...l,
          servicer: { name: servicerForm.name, accountNum: servicerForm.accountNum, phone: servicerForm.phone, email: servicerForm.email, website: servicerForm.website },
          servicerHistory: [newServicer, ...(l.servicerHistory || [])]
        };
      }
      return l;
    }));
    setShowServicerModal(false);
  };

  const openTaxUpdateModal = (loanId) => {
    const loan = allLoans.find(l => l.id === loanId);
    setTaxForm({ loanId, amount: loan?.tax || '', effectiveDate: new Date().toISOString().split('T')[0], notes: '' });
    setShowTaxUpdateModal(true);
  };

  const addTaxUpdate = () => {
    if (!taxForm.loanId || !taxForm.amount) return;
    const newTax = {
      id: Date.now(),
      amount: parseFloat(taxForm.amount),
      effectiveDate: taxForm.effectiveDate,
      notes: taxForm.notes
    };
    setAllLoans(allLoans.map(l => {
      if (l.id === taxForm.loanId) {
        return {
          ...l,
          tax: parseFloat(taxForm.amount),
          taxHistory: [newTax, ...(l.taxHistory || [])]
        };
      }
      return l;
    }));
    setShowTaxUpdateModal(false);
  };

  const openInsUpdateModal = (loanId) => {
    const loan = allLoans.find(l => l.id === loanId);
    setInsForm({ loanId, amount: loan?.ins || '', effectiveDate: new Date().toISOString().split('T')[0], notes: '' });
    setShowInsUpdateModal(true);
  };

  const addInsUpdate = () => {
    if (!insForm.loanId || !insForm.amount) return;
    const newIns = {
      id: Date.now(),
      amount: parseFloat(insForm.amount),
      effectiveDate: insForm.effectiveDate,
      notes: insForm.notes
    };
    setAllLoans(allLoans.map(l => {
      if (l.id === insForm.loanId) {
        return {
          ...l,
          ins: parseFloat(insForm.amount),
          insHistory: [newIns, ...(l.insHistory || [])]
        };
      }
      return l;
    }));
    setShowInsUpdateModal(false);
  };

  const openTenantModal = () => {
    setTenantForm({ name: '', email: '', phone: '', propId: '', leaseStart: '', leaseEnd: '', rent: '', unit: '', ri: false, depositAmount: '', depositMethod: 'Check', depositDate: '' });
    setShowTenantModal(true);
  };

  const saveTenant = () => {
    if (!tenantForm.name || !tenantForm.propId || !tenantForm.rent) return;
    const newTenantId = Math.max(...allTenants.map(t => t.id), 0) + 1;
    const newLeaseId = Math.max(...allLeases.map(l => l.id), 0) + 1;
    
    const newTenant = {
      id: newTenantId,
      name: tenantForm.name,
      email: tenantForm.email,
      phone: tenantForm.phone,
      ri: tenantForm.ri
    };
    
    const newLease = {
      id: newLeaseId,
      propId: parseInt(tenantForm.propId),
      tenantId: newTenantId,
      unit: tenantForm.unit || null,
      start: tenantForm.leaseStart,
      end: tenantForm.leaseEnd,
      rent: parseFloat(tenantForm.rent),
      dueDay: 1,
      paymentMethod: tenantForm.paymentMethod || 'Zelle',
      status: 'active',
      deposit: tenantForm.depositAmount ? {
        amount: parseFloat(tenantForm.depositAmount),
        method: tenantForm.depositMethod,
        paidDate: tenantForm.depositDate,
        returned: false
      } : null
    };
    
    setAllTenants([...allTenants, newTenant]);
    setAllLeases([...allLeases, newLease]);
    setShowTenantModal(false);
  };

  const openPropertyModal = () => {
    setPropertyForm({ addr: '', city: '', state: 'TX', zip: '', beds: '', baths: '', sqft: '', year: '', purchPrice: '', value: '', status: 'vacant' });
    setShowPropertyModal(true);
  };

  const saveProperty = () => {
    if (!propertyForm.addr || !propertyForm.city) return;
    const newId = Math.max(...props.map(p => p.id), 0) + 1;
    const newProperty = {
      id: newId,
      addr: propertyForm.addr,
      city: propertyForm.city,
      state: propertyForm.state,
      zip: propertyForm.zip,
      beds: parseInt(propertyForm.beds) || 0,
      baths: parseFloat(propertyForm.baths) || 0,
      sqft: parseInt(propertyForm.sqft) || 0,
      year: parseInt(propertyForm.year) || new Date().getFullYear(),
      purchPrice: parseFloat(propertyForm.purchPrice) || 0,
      value: parseFloat(propertyForm.value) || parseFloat(propertyForm.purchPrice) || 0,
      status: propertyForm.status,
      loanId: null,
      images: propertyForm.images
    };
    props.push(newProperty);
    setShowPropertyModal(false);
    setPropertyForm({ addr: '', city: '', state: 'TX', zip: '', beds: '', baths: '', sqft: '', year: '', purchPrice: '', value: '', status: 'vacant', images: [] });
    setSelId(newId);
  };

  const handlePropertyImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPropertyForm(prev => ({ ...prev, images: [...prev.images, reader.result] }));
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const removePropertyFormImage = (index) => {
    setPropertyForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const reorderPropertyFormImages = (fromIndex, toIndex) => {
    setPropertyForm(prev => {
      const newImages = [...prev.images];
      const [moved] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, moved);
      return { ...prev, images: newImages };
    });
  };

  const handlePropertyImageAdd = (propId, e) => {
    const files = Array.from(e.target.files);
    const prop = props.find(p => p.id === propId);
    if (!prop) return;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        prop.images = [...(prop.images || []), reader.result];
        setSelId(null);
        setTimeout(() => setSelId(propId), 0);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const removePropertyImage = (propId, index) => {
    const prop = props.find(p => p.id === propId);
    if (prop) {
      prop.images = prop.images.filter((_, i) => i !== index);
      setSelId(null);
      setTimeout(() => setSelId(propId), 0);
    }
  };

  const reorderPropertyImages = (propId, fromIndex, toIndex) => {
    const prop = props.find(p => p.id === propId);
    if (prop) {
      const newImages = [...prop.images];
      const [moved] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, moved);
      prop.images = newImages;
      setSelId(null);
      setTimeout(() => setSelId(propId), 0);
    }
  };

  const [activeImageIndex, setActiveImageIndex] = useState({});
  const getActiveImage = (propId) => activeImageIndex[propId] || 0;
  const setActiveImage = (propId, index) => setActiveImageIndex(prev => ({ ...prev, [propId]: index }));

  const openLoanModal = (propId = '') => {
    setLoanForm({ propId: propId, name: '', lenderId: '', type: 'Conventional', origDate: '', origAmount: '', rate: '', term: '30', pi: '' });
    setShowLoanModal(true);
  };

  const saveLoan = () => {
    if (!loanForm.origAmount || !loanForm.rate) return;
    const newId = Math.max(...loans.map(l => l.id), 0) + 1;
    const newLoan = {
      id: newId,
      lenderId: parseInt(loanForm.lenderId) || null,
      name: loanForm.name || `Loan ${newId}`,
      type: loanForm.type,
      origDate: loanForm.origDate,
      maturityDate: '',
      firstPaymentDate: '',
      origAmount: parseFloat(loanForm.origAmount),
      currBalance: parseFloat(loanForm.origAmount),
      rate: parseFloat(loanForm.rate),
      term: parseInt(loanForm.term),
      amortization: parseInt(loanForm.term),
      pi: parseFloat(loanForm.pi) || 0,
      escrowTax: false,
      escrowIns: false,
      tax: 0,
      ins: 0,
      hoa: 0,
      accountNum: '',
      servicer: null,
      servicerHistory: [],
      taxHistory: [],
      insHistory: [],
      balanceHistory: []
    };
    loans.push(newLoan);
    if (loanForm.propId) {
      const prop = props.find(p => p.id === parseInt(loanForm.propId));
      if (prop) prop.loanId = newId;
    }
    setShowLoanModal(false);
  };

  const openPolicyModal = (propId = '') => {
    setPolicyForm({ propId: propId, type: 'Homeowners', provider: '', policyNum: '', premium: '', deductible: '', start: '', end: '' });
    setShowPolicyModal(true);
  };

  const savePolicy = () => {
    if (!policyForm.provider || !policyForm.propId) return;
    const newId = Math.max(...insurance.map(i => i.id), 0) + 1;
    const newPolicy = {
      id: newId,
      propId: parseInt(policyForm.propId),
      type: policyForm.type,
      provider: policyForm.provider,
      policy: policyForm.policyNum,
      premium: parseFloat(policyForm.premium) || 0,
      deductible: parseFloat(policyForm.deductible) || 0,
      start: policyForm.start,
      end: policyForm.end,
      status: 'active'
    };
    insurance.push(newPolicy);
    setShowPolicyModal(false);
  };

  const openAddPaymentModal = () => {
    const today = new Date().toISOString().split('T')[0];
    setAddPaymentForm({ leaseId: '', amt: '', method: 'Zelle', date: today, due: '', status: 'paid', lateFee: '', periodStart: '', periodEnd: '', notes: '' });
    setAddPaymentSearch('');
    setAddPaymentDropdownOpen(false);
    setShowAddPaymentModal(true);
  };

  const saveAddPayment = () => {
    if (!addPaymentForm.leaseId || !addPaymentForm.amt) return;
    const newId = Math.max(...allPayments.map(p => p.id), 0) + 1;
    const lease = allLeases.find(l => l.id === parseInt(addPaymentForm.leaseId));
    const dueDate = addPaymentForm.due || addPaymentForm.date;
    const paidDate = addPaymentForm.status === 'paid' ? addPaymentForm.date : null;
    
    // Calculate days late if paid
    let daysLate = 0;
    if (paidDate && dueDate && new Date(paidDate) > new Date(dueDate)) {
      daysLate = Math.floor((new Date(paidDate) - new Date(dueDate)) / (1000 * 60 * 60 * 24));
    }
    
    const newPayment = {
      id: newId,
      leaseId: parseInt(addPaymentForm.leaseId),
      amt: parseFloat(addPaymentForm.amt),
      due: dueDate,
      paid: paidDate,
      method: paidDate ? addPaymentForm.method : null,
      status: addPaymentForm.status,
      daysLate: daysLate > 0 ? daysLate : undefined,
      lateFee: addPaymentForm.lateFee ? parseFloat(addPaymentForm.lateFee) : undefined,
      periodStart: addPaymentForm.periodStart || undefined,
      periodEnd: addPaymentForm.periodEnd || undefined,
      notes: addPaymentForm.notes || undefined
    };
    
    setAllPayments([...allPayments, newPayment]);
    setShowAddPaymentModal(false);
  };

  const openTenantEditModal = (tenant) => {
    setTenantEditForm({ ...tenant });
    setShowTenantEditModal(true);
  };

  const saveTenantEdit = () => {
    if (!tenantEditForm) return;
    setAllTenants(allTenants.map(t => {
      if (t.id === tenantEditForm.id) {
        return {
          ...t,
          name: tenantEditForm.name,
          email: tenantEditForm.email,
          phone: tenantEditForm.phone,
          ri: tenantEditForm.ri
        };
      }
      return t;
    }));
    setShowTenantEditModal(false);
    setTenantEditForm(null);
  };

  const openLeaseEditModal = (lease) => {
    setLeaseEditForm({
      ...lease,
      depositAmount: lease.deposit?.amount || '',
      depositMethod: lease.deposit?.method || 'Check',
      depositPaidDate: lease.deposit?.paidDate || '',
      depositReturned: lease.deposit?.returned || false,
      depositReturnedDate: lease.deposit?.returnedDate || '',
      depositReturnedAmount: lease.deposit?.returnedAmount || '',
      depositNotes: lease.deposit?.notes || ''
    });
    setShowLeaseEditModal(true);
  };

  const saveLeaseEdit = () => {
    if (!leaseEditForm) return;
    setAllLeases(allLeases.map(l => {
      if (l.id === leaseEditForm.id) {
        return {
          ...l,
          start: leaseEditForm.start,
          end: leaseEditForm.end,
          rent: parseFloat(leaseEditForm.rent) || l.rent,
          deposit: {
            amount: parseFloat(leaseEditForm.depositAmount) || 0,
            method: leaseEditForm.depositMethod,
            paidDate: leaseEditForm.depositPaidDate,
            returned: leaseEditForm.depositReturned,
            returnedDate: leaseEditForm.depositReturnedDate,
            returnedAmount: parseFloat(leaseEditForm.depositReturnedAmount) || 0,
            notes: leaseEditForm.depositNotes
          }
        };
      }
      return l;
    }));
    setShowLeaseEditModal(false);
    setLeaseEditForm(null);
  };

  const openContractorModal = (contractor = null) => {
    if (contractor) {
      setContractorForm({ ...contractor });
    } else {
      setContractorForm({ id: null, name: '', category: 'General', phone: '', email: '', address: '', notes: '', rating: 3, active: true });
    }
    setShowContractorModal(true);
  };

  const saveContractor = () => {
    if (!contractorForm || !contractorForm.name) return;
    if (contractorForm.id) {
      setAllContractors(allContractors.map(c => c.id === contractorForm.id ? contractorForm : c));
    } else {
      setAllContractors([...allContractors, { ...contractorForm, id: Date.now() }]);
    }
    setShowContractorModal(false);
    setContractorForm(null);
  };

  const deleteContractor = (id) => {
    if (confirm('Are you sure you want to delete this contractor?')) {
      setAllContractors(allContractors.filter(c => c.id !== id));
    }
  };

  const getContractor = (id) => contractors.find(c => c.id === id);
  
  const getContractorExpenses = (contractorId) => allExpenses.filter(e => e.contractorId === contractorId).sort((a, b) => new Date(b.date) - new Date(a.date));

  const toggleContractorCategory = (cat) => {
    if (contractorCategoryFilter.includes(cat)) {
      setContractorCategoryFilter(contractorCategoryFilter.filter(c => c !== cat));
    } else {
      setContractorCategoryFilter([...contractorCategoryFilter, cat]);
    }
  };

  const Stat = ({ label, value, color, sub }) => (
    <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
      <p className={`text-xs font-medium uppercase tracking-wide ${th.mut}`}>{label}</p>
      <p className={`text-2xl font-semibold mt-1 ${color || th.txt}`}>{value}</p>
      {sub && <p className={`text-sm ${th.mut}`}>{sub}</p>}
    </div>
  );

  const MultiSelect = ({ label, options, selected, toggle, open, setOpen }) => (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className={`flex items-center justify-between gap-4 px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm min-w-[180px]`}>
        <span>{selected.length === 0 ? `All ${label}` : `${selected.length} ${label}`}</span>
        <ChevronDown className={`w-4 h-4 ${th.mut} transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className={`absolute top-full left-0 mt-2 ${th.card} border ${th.bdr} rounded-lg shadow-lg z-20 min-w-[220px] py-2`}>
            {options.map(opt => (
              <label key={opt} className={`flex items-center gap-3 px-4 py-2.5 ${th.hov} cursor-pointer`}>
                <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggle(opt)} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className={`text-sm ${th.txt} capitalize`}>{opt}</span>
              </label>
            ))}
            {selected.length > 0 && (
              <button onClick={() => selected.forEach(s => toggle(s))} className={`w-full text-left px-4 py-2.5 text-sm text-blue-600 ${th.hov} border-t ${th.bdr} mt-1`}>
                Clear all
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );

  const SortHeader = ({ col, children, align }) => (
    <th className={`${align === 'right' ? 'text-right' : 'text-left'} px-5 py-4 font-medium cursor-pointer select-none ${th.hov} transition`} onClick={() => toggleSort(col)}>
      <span className="inline-flex items-center gap-1">
        {children}
        {sortBy === col && <span className="text-blue-600">{sortDir === 'asc' ? '↑' : '↓'}</span>}
      </span>
    </th>
  );

  const prop = props.find(p => p.id === selId);

  return (
    <div className={`h-screen flex ${th.bg}`} style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-5 flex items-center gap-3 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center"><Building2 className="w-5 h-5" /></div>
          <span className="text-lg font-semibold">PropertyHub</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: 'dashboard', icon: Home, label: 'Dashboard' },
            { id: 'properties', icon: Building, label: 'Properties', cnt: props.length },
            { id: 'tenants', icon: Users, label: 'Tenants', cnt: tenants.length },
            { id: 'payments', icon: DollarSign, label: 'Payments', badge: metrics.overdue },
            { id: 'expenses', icon: Receipt, label: 'Expenses' },
            { id: 'contractors', icon: Wrench, label: 'Contractors', cnt: contractors.length },
            { id: 'financing', icon: Landmark, label: 'Financing', cnt: allLoans.length },
            { id: 'insurance', icon: Shield, label: 'Insurance' },
          ].map(i => (
            <button key={i.id} onClick={() => { setView(i.id); setSelId(null); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${view === i.id ? 'bg-blue-600' : 'text-slate-300 hover:bg-slate-800'}`}>
              <i.icon className="w-5 h-5" />
              <span className="flex-1 text-left font-medium">{i.label}</span>
              {i.cnt && <span className="text-xs text-slate-500">{i.cnt}</span>}
              {i.badge > 0 && <span className="text-xs px-2 py-0.5 rounded-full bg-red-500">{i.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800 space-y-1">
          <button onClick={() => { setView('settings'); setSelId(null); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${view === 'settings' ? 'bg-blue-600' : 'text-slate-300 hover:bg-slate-800'}`}>
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button onClick={() => setDark(!dark)} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-slate-300 hover:bg-slate-800">
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard */}
          {view === 'dashboard' && (
            <div className="space-y-8">
              <div><h1 className={`text-3xl font-semibold ${th.txt}`}>Dashboard</h1><p className={`${th.mut} mt-1`}>Portfolio overview</p></div>
              <div className="grid grid-cols-4 gap-6">
                <Stat label="Properties" value={metrics.total} sub={`${metrics.total - metrics.leased} vacant`} color="text-blue-600" />
                <Stat label="Occupancy" value={`${Math.round(metrics.leased / metrics.total * 100)}%`} sub={`${metrics.leased} leased`} color="text-emerald-600" />
                <Stat label="Monthly Cash Flow" value={fmt(metrics.cash)} color={metrics.cash >= 0 ? 'text-emerald-600' : 'text-red-600'} />
                <Stat label="Total Equity" value={fmt(metrics.equity)} color="text-violet-600" />
              </div>
              <div className="grid grid-cols-4 gap-6">
                <Stat label="Monthly Revenue" value={fmt(metrics.rent)} />
                <Stat label="Portfolio Value" value={fmt(metrics.value)} />
                <Stat label="Overdue Payments" value={metrics.overdue} color={metrics.overdue > 0 ? 'text-red-600' : 'text-emerald-600'} />
                <Stat label="Uninsured" value="0" color="text-emerald-600" />
              </div>
            </div>
          )}

          {/* Properties List */}
          {view === 'properties' && !selId && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div><h1 className={`text-3xl font-semibold ${th.txt}`}>Properties</h1><p className={`${th.mut} mt-1`}>{filtered.length} properties</p></div>
                <div className="flex items-center gap-3">
                  {/* View Toggle */}
                  <div className={`flex rounded-lg border ${th.bdr} overflow-hidden`}>
                    <button 
                      onClick={() => setPropertyViewMode('table')} 
                      className={`p-2.5 ${propertyViewMode === 'table' ? 'bg-blue-600 text-white' : `${th.card} ${th.txt} ${th.hov}`}`}
                      title="Table View"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setPropertyViewMode('grid')}
                      className={`p-2.5 ${propertyViewMode === 'grid' ? 'bg-blue-600 text-white' : `${th.card} ${th.txt} ${th.hov}`}`}
                      title="Grid View"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                  </div>
                  {propertyViewMode === 'grid' && (
                    <div className={`flex items-center gap-2`}>
                      <select 
                        value={gridColumns} 
                        onChange={e => setGridColumns(Number(e.target.value))}
                        className={`px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                      >
                        <option value={3}>3 cols</option>
                        <option value={4}>4 cols</option>
                        <option value={5}>5 cols</option>
                        <option value={6}>6 cols</option>
                      </select>
                      <select 
                        value={cardLayout} 
                        onChange={e => setCardLayout(e.target.value)}
                        className={`px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                      >
                        <option value="A">Standard</option>
                        <option value="B">Compact</option>
                        <option value="C">Minimal</option>
                      </select>
                    </div>
                  )}
                  <button onClick={openPropertyModal} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4" />Add Property</button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <Stat label="Total Properties" value={props.length} color="text-blue-600" />
                <Stat label="Leased" value={props.filter(p => p.status === 'leased').length} color="text-emerald-600" />
                <Stat label="Vacant" value={props.filter(p => p.status === 'vacant').length} color={props.filter(p => p.status === 'vacant').length > 0 ? 'text-amber-600' : 'text-emerald-600'} />
              </div>
              <div className="flex gap-4 flex-wrap">
                <div className="flex-1 relative min-w-[200px]">
                  <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${th.mut}`} />
                  <input type="text" placeholder="Search by address, city, ZIP..." value={search} onChange={e => setSearch(e.target.value)} className={`w-full pl-12 pr-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
                <MultiSelect label="Cities" options={cities} selected={cityFilter} toggle={toggleCity} open={cityOpen} setOpen={setCityOpen} />
                <MultiSelect label="Status" options={statuses} selected={statusFilter} toggle={toggleStatus} open={statusOpen} setOpen={setStatusOpen} />
                <MultiSelect label="Payment Method" options={activePaymentMethods} selected={paymentMethodFilter} toggle={togglePaymentMethod} open={paymentMethodOpen} setOpen={setPaymentMethodOpen} />
              </div>
              
              {/* Table View */}
              {propertyViewMode === 'table' && (
                <div className={`${th.card} rounded-xl border ${th.bdr} overflow-hidden`}>
                  <table className="w-full">
                    <thead><tr className={`${th.card2} text-xs ${th.mut} uppercase`}>
                      <th className="text-left px-5 py-4 font-medium">#</th>
                      <th className="text-left px-5 py-4 font-medium">Property</th>
                      <th className="text-left px-5 py-4 font-medium">Tenant(s)</th>
                      <th className="text-left px-5 py-4 font-medium">Pays Via</th>
                      <SortHeader col="rent" align="right">Rent</SortHeader>
                      <SortHeader col="cash" align="right">Cash Flow</SortHeader>
                      <SortHeader col="leaseEnd">Lease Expires</SortHeader>
                      <th className="text-center px-5 py-4 font-medium">Status</th>
                      <th className="w-12"></th>
                    </tr></thead>
                    <tbody className={`divide-y ${th.bdr}`}>
                      {filtered.map((p, idx) => {
                        const pts = getTenants(p.id);
                        const cash = getCash(p);
                        const leaseEnd = getLeaseEnd(p.id);
                        const daysLeft = leaseEnd ? Math.ceil((new Date(leaseEnd) - new Date()) / 86400000) : null;
                        const expiringSoon = daysLeft !== null && daysLeft <= 60 && daysLeft > 0;
                        const activeLease = allLeases.find(l => l.propId === p.id && l.status === 'active');
                        return (
                          <tr key={p.id} className={`${th.hov} cursor-pointer`} onClick={() => setSelId(p.id)}>
                            <td className={`px-5 py-4 ${th.mut}`}>{idx + 1}</td>
                            <td className="px-5 py-4">
                              <p className={`text-sm font-medium ${th.txt}`}>{p.addr}</p>
                              <p className={`text-xs ${th.mut}`}>{p.city}, {p.state} {p.zip}</p>
                              <p className={`text-xs ${th.mut}`}>Property ID: {p.id}</p>
                            </td>
                            <td className="px-5 py-4">{pts.length ? pts.map(t => <p key={t.id} className={`text-sm ${th.txt}`}>{t.name}</p>) : <span className={th.mut}>—</span>}</td>
                            <td className="px-5 py-4">
                              {activeLease?.paymentMethod ? (
                                <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${dark ? 'bg-slate-700' : 'bg-gray-100'} ${th.txt}`}>
                                  <CreditCard className="w-3 h-3" />
                                  {activeLease.paymentMethod}
                                </span>
                              ) : <span className={th.mut}>—</span>}
                            </td>
                            <td className={`px-5 py-4 text-right text-sm font-medium ${th.txt}`}>{fmt(getRent(p.id))}</td>
                            <td className={`px-5 py-4 text-right text-sm font-semibold ${cash >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmt(cash)}</td>
                            <td className="px-5 py-4">
                              {leaseEnd ? (
                                <span className={`text-sm ${expiringSoon ? 'text-amber-600 font-medium' : th.txt}`}>
                                  {fmtDate(leaseEnd)}
                                  {expiringSoon && <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">{daysLeft}d</span>}
                                </span>
                              ) : <span className={th.mut}>—</span>}
                            </td>
                            <td className="px-5 py-4 text-center"><span className={`text-xs px-3 py-1 rounded-full font-medium ${p.status === 'leased' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{p.status}</span></td>
                            <td className="px-5 py-4"><ChevronRight className={`w-5 h-5 ${th.mut}`} /></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              
              {/* Grid View */}
              {propertyViewMode === 'grid' && (
                <div className={`grid gap-6 ${gridColumns === 3 ? 'grid-cols-3' : gridColumns === 4 ? 'grid-cols-4' : gridColumns === 5 ? 'grid-cols-5' : 'grid-cols-6'}`}>
                  {filtered.map(p => {
                    const pts = getTenants(p.id);
                    const cash = getCash(p);
                    const leaseEnd = getLeaseEnd(p.id);
                    const daysLeft = leaseEnd ? Math.ceil((new Date(leaseEnd) - new Date()) / 86400000) : null;
                    const expiringSoon = daysLeft !== null && daysLeft <= 60 && daysLeft > 0;
                    const lease = leases.find(l => l.propId === p.id && l.status === 'active');
                    const leaseExpiry = lease ? new Date(lease.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : null;
                    
                    // Layout A: Standard - rent/cashflow in middle section
                    if (cardLayout === 'A') return (
                      <div key={p.id} onClick={() => setSelId(p.id)} className={`${th.card} rounded-xl border ${th.bdr} overflow-hidden cursor-pointer transition hover:shadow-lg`}>
                        {p.images && p.images.length > 0 ? (
                          <div className="relative">
                            <img src={p.images[0]} alt={p.addr} className="aspect-video w-full object-cover" />
                            {p.images.length > 1 && <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">+{p.images.length - 1}</span>}
                          </div>
                        ) : (
                          <div className={`aspect-video ${dark ? 'bg-slate-800' : 'bg-gradient-to-br from-slate-100 to-slate-200'} flex items-center justify-center`}>
                            <Building2 className={`w-16 h-16 ${dark ? 'text-slate-600' : 'text-slate-300'}`} />
                          </div>
                        )}
                        <div className="p-3">
                          <p className={`text-sm font-medium ${th.txt} truncate`}>{p.addr}</p>
                          <p className={`text-xs ${th.mut}`}>{p.city}, {p.state} {p.zip}</p>
                          <p className={`text-xs ${th.mut} mt-1`}>{p.beds} bd | {p.baths} ba | {p.sqft.toLocaleString()} sqft</p>
                          <div className={`flex items-center justify-between mt-2 pt-2 border-t ${th.bdr}`}>
                            <span className={`text-base font-bold ${th.txt}`}>{fmt(getRent(p.id))}<span className={`text-xs font-normal ${th.mut}`}>/mo</span></span>
                            <span className={`text-sm font-semibold ${cash >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>{cash >= 0 ? '+' : ''}{fmt(cash)}</span>
                          </div>
                          <div className={`flex items-center justify-between mt-2 text-xs`}>
                            <span className={`px-2 py-0.5 rounded font-medium ${p.status === 'leased' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                              {p.status === 'leased' ? 'Leased' : 'Vacant'}
                            </span>
                            {lease ? (
                              <span className={`${th.mut} flex items-center gap-2`}>
                                <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" />{lease.paymentMethod || '—'}</span>
                                <span>·</span>
                                <span>{expiringSoon ? <span className="text-red-500 font-medium">{daysLeft}d left</span> : leaseExpiry}</span>
                              </span>
                            ) : (
                              pts.length > 0 && <span className={`${th.mut} truncate max-w-[100px]`}>{pts[0].name}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                    
                    // Layout B: Compact Header - rent/cashflow next to address
                    if (cardLayout === 'B') return (
                      <div key={p.id} onClick={() => setSelId(p.id)} className={`${th.card} rounded-xl border ${th.bdr} overflow-hidden cursor-pointer transition hover:shadow-lg`}>
                        {p.images && p.images.length > 0 ? (
                          <div className="relative">
                            <img src={p.images[0]} alt={p.addr} className="aspect-video w-full object-cover" />
                            {p.images.length > 1 && <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">+{p.images.length - 1}</span>}
                            <span className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded font-medium ${p.status === 'leased' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                              {p.status === 'leased' ? 'Leased' : 'Vacant'}
                            </span>
                          </div>
                        ) : (
                          <div className={`aspect-video ${dark ? 'bg-slate-800' : 'bg-gradient-to-br from-slate-100 to-slate-200'} flex items-center justify-center relative`}>
                            <Building2 className={`w-16 h-16 ${dark ? 'text-slate-600' : 'text-slate-300'}`} />
                            <span className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded font-medium ${p.status === 'leased' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                              {p.status === 'leased' ? 'Leased' : 'Vacant'}
                            </span>
                          </div>
                        )}
                        <div className="p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <p className={`text-sm font-medium ${th.txt} truncate`}>{p.addr}</p>
                              <p className={`text-xs ${th.mut}`}>{p.city}, {p.state} {p.zip}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className={`text-sm font-bold ${th.txt}`}>{fmt(getRent(p.id))}</p>
                              <p className={`text-xs font-semibold ${cash >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>{cash >= 0 ? '+' : ''}{fmt(cash)}</p>
                            </div>
                          </div>
                          <p className={`text-xs ${th.mut} mt-2`}>{p.beds} bd | {p.baths} ba | {p.sqft.toLocaleString()} sqft</p>
                          {lease && (
                            <div className={`flex items-center justify-between mt-2 pt-2 border-t ${th.bdr} text-xs ${th.mut}`}>
                              <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" />{lease.paymentMethod || '—'}</span>
                              <span>{expiringSoon ? <span className="text-red-500 font-medium">{daysLeft}d left</span> : leaseExpiry}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                    
                    // Layout C: Minimal - clean, less info
                    if (cardLayout === 'C') return (
                      <div key={p.id} onClick={() => setSelId(p.id)} className={`${th.card} rounded-xl border ${th.bdr} overflow-hidden cursor-pointer transition hover:shadow-lg`}>
                        {p.images && p.images.length > 0 ? (
                          <div className="relative">
                            <img src={p.images[0]} alt={p.addr} className="aspect-video w-full object-cover" />
                            {p.images.length > 1 && <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">+{p.images.length - 1}</span>}
                            <div className="absolute top-2 right-2 text-right">
                              <p className="text-lg font-bold text-white drop-shadow-lg">{fmt(getRent(p.id))}<span className="text-xs font-normal">/mo</span></p>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
                              <p className="text-sm font-medium text-white truncate">{p.addr}</p>
                              <p className="text-xs text-white/80">{p.city}, {p.state} {p.zip}</p>
                            </div>
                          </div>
                        ) : (
                          <div className={`aspect-video ${dark ? 'bg-slate-800' : 'bg-gradient-to-br from-slate-100 to-slate-200'} flex items-center justify-center relative`}>
                            <Building2 className={`w-16 h-16 ${dark ? 'text-slate-600' : 'text-slate-300'}`} />
                            <div className="absolute top-2 right-2 text-right">
                              <p className={`text-lg font-bold ${th.txt}`}>{fmt(getRent(p.id))}<span className={`text-xs font-normal ${th.mut}`}>/mo</span></p>
                            </div>
                            <div className={`absolute bottom-0 left-0 right-0 ${dark ? 'bg-slate-900/80' : 'bg-white/90'} p-3`}>
                              <p className={`text-sm font-medium ${th.txt} truncate`}>{p.addr}</p>
                              <p className={`text-xs ${th.mut}`}>{p.city}, {p.state} {p.zip}</p>
                            </div>
                          </div>
                        )}
                        <div className="p-3">
                          <div className="flex items-center justify-between">
                            <span className={`text-xs ${th.mut}`}>{p.beds} bd | {p.baths} ba | {p.sqft.toLocaleString()} sqft</span>
                            <span className={`text-xs px-2 py-0.5 rounded font-medium ${p.status === 'leased' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                              {p.status === 'leased' ? 'Leased' : 'Vacant'}
                            </span>
                          </div>
                          {lease && (
                            <div className={`flex items-center justify-between mt-2 text-xs ${th.mut}`}>
                              <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" />{lease.paymentMethod || '—'}</span>
                              <span className={`font-medium ${cash >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>{cash >= 0 ? '+' : ''}{fmt(cash)}</span>
                              <span>{expiringSoon ? <span className="text-red-500 font-medium">{daysLeft}d</span> : leaseExpiry}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                    
                    return null;
                  })}
                </div>
              )}
            </div>
          )}

          {/* Property Detail */}
          {view === 'properties' && prop && (
            <div className="space-y-6">
              {/* Back button */}
              <button onClick={() => setSelId(null)} className={`inline-flex items-center gap-2 text-sm ${th.mut} hover:${th.txt} transition`}>
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back to Properties
              </button>

              {/* Property Image Gallery */}
              <div className={`${th.card} rounded-xl border ${th.bdr} overflow-hidden`}>
                {prop.images && prop.images.length > 0 ? (
                  <div>
                    {/* Main Image with Navigation */}
                    <div className="relative">
                      <img src={prop.images[getActiveImage(prop.id)] || prop.images[0]} alt={prop.addr} className="w-full h-72 object-cover" />
                      {prop.images.length > 1 && (
                        <>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setActiveImage(prop.id, (getActiveImage(prop.id) - 1 + prop.images.length) % prop.images.length); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setActiveImage(prop.id, (getActiveImage(prop.id) + 1) % prop.images.length); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {prop.images.map((_, i) => (
                              <button 
                                key={i} 
                                onClick={(e) => { e.stopPropagation(); setActiveImage(prop.id, i); }}
                                className={`w-2 h-2 rounded-full transition ${i === getActiveImage(prop.id) ? 'bg-white' : 'bg-white/50'}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    {/* Thumbnail Strip with Reorder/Delete */}
                    <div className={`p-3 border-t ${th.bdr} flex gap-2 overflow-x-auto`}>
                      {prop.images.map((img, i) => (
                        <div key={i} className="relative flex-shrink-0 group">
                          <img 
                            src={img} 
                            alt={`${prop.addr} ${i + 1}`} 
                            onClick={() => setActiveImage(prop.id, i)}
                            className={`w-20 h-14 object-cover rounded cursor-pointer ${i === getActiveImage(prop.id) ? 'ring-2 ring-blue-500' : ''}`}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition rounded flex items-center justify-center opacity-0 group-hover:opacity-100">
                            {i > 0 && (
                              <button onClick={() => reorderPropertyImages(prop.id, i, i - 1)} className="p-1 text-white hover:scale-110">
                                <ChevronLeft className="w-4 h-4" />
                              </button>
                            )}
                            <button onClick={() => removePropertyImage(prop.id, i)} className="p-1 text-red-400 hover:text-red-300 hover:scale-110">
                              <X className="w-4 h-4" />
                            </button>
                            {i < prop.images.length - 1 && (
                              <button onClick={() => reorderPropertyImages(prop.id, i, i + 1)} className="p-1 text-white hover:scale-110">
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          {i === 0 && <span className="absolute -top-1 -left-1 bg-blue-500 text-white text-xs px-1 rounded">Main</span>}
                        </div>
                      ))}
                      <label className={`flex-shrink-0 w-20 h-14 border-2 border-dashed ${th.bdr} rounded flex items-center justify-center cursor-pointer ${th.hov}`}>
                        <Plus className={`w-5 h-5 ${th.mut}`} />
                        <input type="file" accept="image/*" multiple onChange={(e) => handlePropertyImageAdd(prop.id, e)} className="hidden" />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className={`flex flex-col items-center justify-center w-full h-48 cursor-pointer ${th.hov} ${dark ? 'bg-slate-800' : 'bg-gradient-to-br from-slate-100 to-slate-200'}`}>
                    <Upload className={`w-12 h-12 ${th.mut} mb-3`} />
                    <span className={`text-sm font-medium ${th.txt}`}>Add Property Photos</span>
                    <span className={`text-xs ${th.mut} mt-1`}>Click to upload (multiple allowed)</span>
                    <input type="file" accept="image/*" multiple onChange={(e) => handlePropertyImageAdd(prop.id, e)} className="hidden" />
                  </label>
                )}
              </div>

              {/* Header Card */}
              <div className={`${th.card} rounded-xl border ${th.bdr} p-6`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center">
                      <Building className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h1 className={`text-xl font-semibold ${th.txt}`}>{prop.addr}</h1>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${prop.status === 'leased' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{prop.status}</span>
                      </div>
                      <p className={`${th.mut} text-sm`}>{prop.city}, {prop.state} {prop.zip}</p>
                      <p className={`text-xs ${th.mut} mt-1`}>Property ID: {prop.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => openPaymentModal()} className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium flex items-center gap-2"><DollarSign className="w-4 h-4" />Record Payment</button>
                    <button className={`px-4 py-2.5 rounded-lg border ${th.bdr} ${th.txt} text-sm font-medium ${th.hov} flex items-center gap-2`}><Edit2 className="w-4 h-4" />Edit Property</button>
                  </div>
                </div>

                {/* Stats Row - Compact */}
                <div className={`flex items-center gap-8 mt-6 pt-6 border-t ${th.bdr}`}>
                  <div><p className={`text-xs ${th.mut}`}>Rent</p><p className={`text-lg font-semibold ${th.txt}`}>{fmt(getRent(prop.id))}</p></div>
                  <div className={`h-8 w-px ${th.bdr}`} />
                  <div><p className={`text-xs ${getCash(prop) >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>Cash Flow</p><p className={`text-lg font-semibold ${getCash(prop) >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmt(getCash(prop))}</p></div>
                  <div className={`h-8 w-px ${th.bdr}`} />
                  <div><p className="text-xs text-violet-600">Equity</p><p className="text-lg font-semibold text-violet-600">{fmt(getEq(prop))}</p></div>
                  <div className={`h-8 w-px ${th.bdr}`} />
                  <div><p className={`text-xs ${th.mut}`}>Value</p><p className={`text-lg font-semibold ${th.txt}`}>{fmt(prop.value)}</p></div>
                  <div className={`h-8 w-px ${th.bdr}`} />
                  {(() => { const loan = getLoan(prop.id); const dscr = loan && loan.pi > 0 ? (getRent(prop.id) / loan.pi).toFixed(2) : 'N/A'; return (
                  <div><p className={`text-xs ${th.mut}`}>DSCR</p><p className={`text-lg font-semibold ${dscr !== 'N/A' && parseFloat(dscr) >= 1.25 ? 'text-emerald-600' : 'text-amber-600'}`}>{dscr}</p></div>
                  );})()}
                  <div className={`h-8 w-px ${th.bdr}`} />
                  {(() => { const loan = getLoan(prop.id); const ltv = loan ? Math.round(loan.currBalance / (getPropsOnLoan(loan.id).reduce((s, p) => s + p.value, 0)) * 100) : 0; return (
                  <div><p className={`text-xs ${th.mut}`}>LTV</p><p className={`text-lg font-semibold ${th.txt}`}>{ltv}%</p></div>
                  );})()}
                </div>
              </div>

              {/* Tabs */}
              <div className={`flex gap-1 ${th.card} rounded-xl border ${th.bdr} p-1.5`}>
                {['overview', 'tenants', 'payments', 'expenses', 'insurance', 'loan', 'taxes', 'documents'].map(t => (
                  <button key={t} onClick={() => setTab(t)} className={`flex-1 px-5 py-2.5 rounded-lg text-sm font-medium capitalize transition ${tab === t ? 'bg-blue-600 text-white' : `${th.txt2} ${th.hov}`}`}>{t}</button>
                ))}
              </div>

              {/* Overview Tab - Visual Summary */}
              {tab === 'overview' && (() => {
                const activeLeases = getActiveLeases(prop.id);
                const leaseEnd = getLeaseEnd(prop.id);
                const daysLeft = leaseEnd ? Math.ceil((new Date(leaseEnd) - new Date()) / 86400000) : null;
                
                return (
                  <div className="grid grid-cols-3 gap-6">
                    {/* Current Status */}
                    <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                      <h3 className={`text-xs font-medium ${th.mut} uppercase tracking-wide mb-4`}>Current Tenants</h3>
                      {activeLeases.length > 0 ? (
                        <div className="space-y-4">
                          {activeLeases.map(lease => {
                            const tenant = getTenantById(lease.tenantId);
                            const outstanding = getOutstandingBalance(lease.id);
                            const nextDue = getNextDueDate(lease);
                            return (
                              <div key={lease.id} className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                                    {tenant?.name.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <div className="flex-1">
                                    <p className={`text-sm font-medium ${th.txt}`}>{tenant?.name}{lease.unit && ` (Unit ${lease.unit})`}</p>
                                    <p className={`text-xs ${th.mut}`}>{fmt(lease.rent)}/mo · Due on the {lease.dueDay || 1}{lease.dueDay === 1 ? 'st' : lease.dueDay === 2 ? 'nd' : lease.dueDay === 3 ? 'rd' : 'th'}</p>
                                  </div>
                                  {tenant?.ri ? <ShieldCheck className="w-4 h-4 text-emerald-500" /> : <ShieldOff className="w-4 h-4 text-red-500" />}
                                </div>
                                
                                {/* Outstanding Balance Alert */}
                                {outstanding.count > 0 && (
                                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                    <div className="flex items-center gap-2 text-red-700">
                                      <AlertTriangle className="w-4 h-4" />
                                      <span className="text-sm font-medium">{outstanding.count} month{outstanding.count > 1 ? 's' : ''} overdue</span>
                                    </div>
                                    <p className="text-lg font-bold text-red-700 mt-1">{fmt(outstanding.total)} outstanding</p>
                                  </div>
                                )}
                                
                                {/* Next Payment Due */}
                                {nextDue && outstanding.count === 0 && (
                                  <div className={`${th.card2} rounded-lg p-3`}>
                                    <p className={`text-xs ${th.mut}`}>Next payment due</p>
                                    <p className={`text-sm font-medium ${th.txt}`}>{fmtDate(nextDue)}</p>
                                  </div>
                                )}
                                
                                {/* Security Deposit */}
                                <div className={`${th.card2} rounded-lg p-3`}>
                                  <p className={`text-xs ${th.mut}`}>Security Deposit</p>
                                  <div className="flex items-center justify-between mt-1">
                                    <span className={`text-sm font-medium ${th.txt}`}>{fmt(lease.deposit.amount)}</span>
                                    <span className={`text-xs ${th.mut}`}>{lease.deposit.method} · {fmtDate(lease.deposit.paidDate)}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          {leaseEnd && (
                            <div className={`mt-4 pt-4 border-t ${th.bdr}`}>
                              <p className={`text-xs ${th.mut}`}>Lease Expires</p>
                              <p className={`text-sm font-medium ${daysLeft <= 60 ? 'text-amber-600' : th.txt}`}>
                                {fmtDate(leaseEnd)}
                                {daysLeft <= 60 && daysLeft > 0 && <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">{daysLeft} days</span>}
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
                            <Home className="w-6 h-6 text-amber-600" />
                          </div>
                          <p className={`text-sm font-medium ${th.txt}`}>Vacant</p>
                          <p className={`text-xs ${th.mut} mt-1`}>No active lease</p>
                        </div>
                      )}
                    </div>

                    {/* Property Info */}
                    <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                      <h3 className={`text-xs font-medium ${th.mut} uppercase tracking-wide mb-4`}>Property Info</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between"><span className={`text-sm ${th.mut}`}>Type</span><span className={`text-sm ${th.txt}`}>{prop.beds}bd / {prop.baths}ba</span></div>
                        <div className="flex justify-between"><span className={`text-sm ${th.mut}`}>Size</span><span className={`text-sm ${th.txt}`}>{prop.sqft.toLocaleString()} sqft</span></div>
                        <div className="flex justify-between"><span className={`text-sm ${th.mut}`}>Year Built</span><span className={`text-sm ${th.txt}`}>{prop.year}</span></div>
                        <div className={`pt-3 border-t ${th.bdr}`}>
                          <div className="flex justify-between"><span className={`text-sm ${th.mut}`}>Purchased</span><span className={`text-sm ${th.txt}`}>{fmt(prop.purchPrice)}</span></div>
                          <div className="flex justify-between mt-2"><span className={`text-sm ${th.mut}`}>Current Value</span><span className="text-sm font-medium text-emerald-600">{fmt(prop.value)}</span></div>
                          <div className="flex justify-between mt-2"><span className={`text-sm ${th.mut}`}>Equity</span><span className="text-sm font-medium text-violet-600">{fmt(getEq(prop))}</span></div>
                        </div>
                      </div>
                    </div>

                    {/* Key Dates & Notes */}
                    <div className="space-y-6">
                      {/* Key Dates */}
                      <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                        <h3 className={`text-xs font-medium ${th.mut} uppercase tracking-wide mb-4`}>Key Dates</h3>
                        <div className="space-y-3">
                          {(() => {
                            const nextDue = activeLeases.length > 0 ? getNextDueDate(activeLeases[0]) : null;
                            const loan = getLoan(prop.id);
                            return (
                              <>
                                <div className="flex justify-between">
                                  <span className={`text-sm ${th.mut}`}>Next Rent Due</span>
                                  <span className={`text-sm ${th.txt}`}>{nextDue ? fmtDate(nextDue) : '—'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className={`text-sm ${th.mut}`}>Lease Expires</span>
                                  <span className={`text-sm ${daysLeft && daysLeft <= 60 ? 'text-amber-600 font-medium' : th.txt}`}>
                                    {leaseEnd ? fmtDate(leaseEnd) : '—'}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className={`text-sm ${th.mut}`}>Insurance Renewal</span>
                                  <span className={`text-sm ${th.txt}`}>Mar 15, 2025</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className={`text-sm ${th.mut}`}>Loan Maturity</span>
                                  <span className={`text-sm ${loan && Math.ceil((new Date(loan.maturityDate) - new Date()) / 86400000) < 365 * 2 ? 'text-amber-600 font-medium' : th.txt}`}>
                                    {loan ? fmtDate(loan.maturityDate) : '—'}
                                  </span>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>

                      {/* Notes */}
                      <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className={`text-xs font-medium ${th.mut} uppercase tracking-wide`}>Notes</h3>
                          <button className={`text-xs text-blue-600 font-medium`}>Edit</button>
                        </div>
                        <p className={`text-sm ${th.txt}`}>
                          {prop.id === 1 && "Great tenant, always pays on time. New HVAC installed 2023. Consider raising rent at renewal."}
                          {prop.id === 2 && "HOA strict on landscaping. Tenant requested new dishwasher - approved for next month."}
                          {prop.id === 3 && "Tenant behind on payments - sent notice. Follow up by Feb 15."}
                          {prop.id === 4 && "Recently vacated. Needs paint and carpet before re-listing. Get quotes this week."}
                          {prop.id === 5 && "Duplex - both units occupied. Unit B lease expires soon, start renewal conversation."}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Payments Tab */}
              {tab === 'payments' && (() => {
                const allLeases = getAllLeases(prop.id);
                const allPropPayments = getPropPayments(prop.id);
                
                return (
                  <div className="space-y-6">
                    {/* Tenant History */}
                    <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                      <h3 className={`text-sm font-medium ${th.txt} mb-4`}>Tenant History</h3>
                      <div className="space-y-4">
                        {allLeases.map((lease, idx) => {
                          const tenant = getTenantById(lease.tenantId);
                          const leasePayments = getLeasePayments(lease.id);
                          const onTime = leasePayments.filter(p => p.status === 'paid' && !p.daysLate).length;
                          const late = leasePayments.filter(p => p.daysLate).length;
                          const totalCollected = leasePayments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amt, 0);
                          const outstanding = getOutstandingBalance(lease.id);
                          
                          // Calculate vacancy before this lease
                          const nextLease = allLeases[idx + 1];
                          const vacancyDays = nextLease ? Math.ceil((new Date(lease.start) - new Date(nextLease.end)) / 86400000) : 0;
                          
                          return (
                            <div key={lease.id}>
                              {vacancyDays > 30 && lease.status === 'ended' && (
                                <div className={`flex items-center gap-3 py-3 px-4 rounded-lg bg-amber-50 border border-amber-200 mb-3`}>
                                  <Clock className="w-5 h-5 text-amber-600" />
                                  <span className="text-sm text-amber-700">Vacant for {vacancyDays} days</span>
                                </div>
                              )}
                              <div className={`p-4 rounded-lg ${lease.status === 'active' ? 'bg-blue-50 border border-blue-200' : th.card2}`}>
                                <div className="flex items-start gap-4">
                                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                                    {tenant?.name.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <p className={`text-sm font-medium ${th.txt}`}>{tenant?.name}</p>
                                      {lease.unit && <span className={`text-xs ${th.mut}`}>Unit {lease.unit}</span>}
                                      {lease.status === 'active' && <span className="text-xs px-2 py-0.5 rounded bg-blue-600 text-white">Current</span>}
                                      {outstanding.count > 0 && <span className="text-xs px-2 py-0.5 rounded bg-red-600 text-white">{outstanding.count} overdue</span>}
                                    </div>
                                    <p className={`text-xs ${th.mut} mt-1`}>{fmtDate(lease.start)} → {fmtDate(lease.end)}</p>
                                    <div className="flex items-center gap-4 mt-2">
                                      <span className={`text-xs ${th.mut}`}>{fmt(lease.rent)}/mo</span>
                                      <span className={`text-xs ${th.mut}`}>·</span>
                                      <span className="text-xs text-emerald-600">{onTime} on time</span>
                                      {late > 0 && <><span className={`text-xs ${th.mut}`}>·</span><span className="text-xs text-amber-600">{late} late</span></>}
                                      <span className={`text-xs ${th.mut}`}>·</span>
                                      <span className={`text-xs ${th.txt}`}>{fmt(totalCollected)} collected</span>
                                    </div>
                                    
                                    {/* Deposit Info */}
                                    <div className={`mt-3 pt-3 border-t ${th.bdr}`}>
                                      <p className={`text-xs font-medium ${th.mut} mb-2`}>Security Deposit</p>
                                      <div className="flex items-center gap-4 text-xs">
                                        <span className={th.txt}>{fmt(lease.deposit.amount)}</span>
                                        <span className={th.mut}>·</span>
                                        <span className={th.mut}>{lease.deposit.method}</span>
                                        <span className={th.mut}>·</span>
                                        <span className={th.mut}>Paid {fmtDate(lease.deposit.paidDate)}</span>
                                        {lease.deposit.returned ? (
                                          <>
                                            <span className={th.mut}>·</span>
                                            <span className="text-emerald-600">Returned {fmt(lease.deposit.returnedAmount)} on {fmtDate(lease.deposit.returnedDate)}</span>
                                          </>
                                        ) : lease.status === 'active' ? (
                                          <>
                                            <span className={th.mut}>·</span>
                                            <span className="text-blue-600">Held</span>
                                          </>
                                        ) : (
                                          <>
                                            <span className={th.mut}>·</span>
                                            <span className="text-amber-600">Pending return</span>
                                          </>
                                        )}
                                      </div>
                                      {lease.deposit.notes && (
                                        <p className={`text-xs ${th.mut} mt-1 italic`}>"{lease.deposit.notes}"</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Payment History */}
                    <div className={`${th.card} rounded-xl border ${th.bdr} overflow-hidden`}>
                      <div className={`px-5 py-4 border-b ${th.bdr} flex justify-between items-center`}>
                        <h3 className={`text-sm font-medium ${th.txt}`}>All Payments</h3>
                        <button onClick={() => openPaymentModal()} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium flex items-center gap-1.5"><Plus className="w-4 h-4" />Record Payment</button>
                      </div>
                      <table className="w-full">
                        <thead><tr className={`${th.card2} text-xs ${th.mut} uppercase`}>
                          <th className="text-left px-5 py-3">Date</th>
                          <th className="text-left px-5 py-3">Tenant</th>
                          <th className="text-left px-5 py-3">Method</th>
                          <th className="text-right px-5 py-3">Amount</th>
                          <th className="text-center px-5 py-3">Status</th>
                        </tr></thead>
                        <tbody className={`divide-y ${th.bdr}`}>
                          {allPropPayments.map(pay => {
                            const lease = leases.find(l => l.id === pay.leaseId);
                            const tenant = getTenantById(lease?.tenantId);
                            return (
                              <tr key={pay.id} className={pay.status === 'overdue' || pay.status === 'due' ? 'bg-red-50' : ''}>
                                <td className={`px-5 py-3 text-sm ${th.txt}`}>{fmtDate(pay.due)}</td>
                                <td className={`px-5 py-3 text-sm ${th.txt}`}>{tenant?.name}{lease?.unit && ` (${lease.unit})`}</td>
                                <td className={`px-5 py-3 text-sm ${th.mut}`}>{pay.method || '—'}</td>
                                <td className={`px-5 py-3 text-sm font-medium ${th.txt} text-right`}>
                                  {fmt(pay.amt)}
                                  {pay.lateFee && <span className="text-red-600 text-xs ml-1">+{fmt(pay.lateFee)}</span>}
                                </td>
                                <td className="px-5 py-3 text-center">
                                  {pay.status === 'paid' ? (
                                    <span className={`text-xs px-2 py-1 rounded-full ${pay.daysLate ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                      {pay.daysLate ? `${pay.daysLate}d late` : 'On time'}
                                    </span>
                                  ) : pay.status === 'due' ? (
                                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">Due</span>
                                  ) : (
                                    <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">Overdue</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}

              {/* Expenses Tab */}
              {tab === 'expenses' && (() => {
                const propExpenses = getPropExpenses(prop.id);
                const totalSpent = propExpenses.reduce((s, e) => s + e.amount, 0);
                const thisYear = propExpenses.filter(e => new Date(e.date).getFullYear() === new Date().getFullYear());
                const thisYearTotal = thisYear.reduce((s, e) => s + e.amount, 0);
                const filteredPropExpenses = propExpenses
                  .filter(exp => {
                    if (expenseDateFrom && exp.date < expenseDateFrom) return false;
                    if (expenseDateTo && exp.date > expenseDateTo) return false;
                    return true;
                  })
                  .sort((a, b) => {
                    if (expenseSort.col === 'date') {
                      return expenseSort.dir === 'asc' 
                        ? new Date(a.date) - new Date(b.date)
                        : new Date(b.date) - new Date(a.date);
                    }
                    if (expenseSort.col === 'amount') {
                      return expenseSort.dir === 'asc' ? a.amount - b.amount : b.amount - a.amount;
                    }
                    return 0;
                  });
                
                return (
                  <div className="space-y-6">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6">
                      <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                        <p className={`text-xs font-medium uppercase tracking-wide ${th.mut}`}>Total Expenses</p>
                        <p className={`text-2xl font-bold text-red-600 mt-1`}>{fmt(totalSpent)}</p>
                      </div>
                      <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                        <p className={`text-xs font-medium uppercase tracking-wide ${th.mut}`}>This Year</p>
                        <p className={`text-2xl font-bold ${th.txt} mt-1`}>{fmt(thisYearTotal)}</p>
                      </div>
                      <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                        <p className={`text-xs font-medium uppercase tracking-wide ${th.mut}`}># of Expenses</p>
                        <p className={`text-2xl font-bold ${th.txt} mt-1`}>{propExpenses.length}</p>
                      </div>
                    </div>

                    {/* Date Filters */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <label className={`text-sm ${th.mut}`}>From</label>
                        <input 
                          type="date" 
                          value={expenseDateFrom} 
                          onChange={e => setExpenseDateFrom(e.target.value)}
                          className={`px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className={`text-sm ${th.mut}`}>To</label>
                        <input 
                          type="date" 
                          value={expenseDateTo} 
                          onChange={e => setExpenseDateTo(e.target.value)}
                          className={`px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                        />
                      </div>
                      {(expenseDateFrom || expenseDateTo) && (
                        <button 
                          onClick={() => { setExpenseDateFrom(''); setExpenseDateTo(''); }}
                          className={`text-sm text-blue-600 hover:underline`}
                        >
                          Clear dates
                        </button>
                      )}
                    </div>

                    {/* Expenses Table */}
                    <div className={`${th.card} rounded-xl border ${th.bdr} overflow-hidden`}>
                      <div className={`px-5 py-4 border-b ${th.bdr} flex justify-between items-center`}>
                        <h3 className={`text-sm font-medium ${th.txt}`}>All Expenses</h3>
                        <button onClick={() => openExpenseModal(prop.id)} className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium flex items-center gap-1.5"><Plus className="w-4 h-4" />Add Expense</button>
                      </div>
                      {filteredPropExpenses.length > 0 ? (
                        <table className="w-full">
                          <thead><tr className={`${th.card2} text-xs ${th.mut} uppercase`}>
                            <th 
                              className={`text-left px-5 py-3 cursor-pointer select-none ${th.hov}`}
                              onClick={() => setExpenseSort({ col: 'date', dir: expenseSort.col === 'date' && expenseSort.dir === 'desc' ? 'asc' : 'desc' })}
                            >
                              <span className="inline-flex items-center gap-1">
                                Date
                                {expenseSort.col === 'date' && <span className="text-blue-600">{expenseSort.dir === 'asc' ? '↑' : '↓'}</span>}
                              </span>
                            </th>
                            <th className="text-left px-5 py-3">Category</th>
                            <th className="text-left px-5 py-3">Payee</th>
                            <th className="text-left px-5 py-3">Description</th>
                            <th className="text-left px-5 py-3">Method</th>
                            <th 
                              className={`text-right px-5 py-3 cursor-pointer select-none ${th.hov}`}
                              onClick={() => setExpenseSort({ col: 'amount', dir: expenseSort.col === 'amount' && expenseSort.dir === 'desc' ? 'asc' : 'desc' })}
                            >
                              <span className="inline-flex items-center gap-1 justify-end">
                                Amount
                                {expenseSort.col === 'amount' && <span className="text-blue-600">{expenseSort.dir === 'asc' ? '↑' : '↓'}</span>}
                              </span>
                            </th>
                            <th className="w-12"></th>
                          </tr></thead>
                          <tbody className={`divide-y ${th.bdr}`}>
                            {filteredPropExpenses.map(exp => {
                              const isExpanded = selectedExpense === exp.id;
                              return (
                              <React.Fragment key={exp.id}>
                              <tr className={`${th.hov} cursor-pointer`} onClick={() => setSelectedExpense(isExpanded ? null : exp.id)}>
                                <td className={`px-5 py-3 text-sm ${th.txt}`}>{fmtDate(exp.date)}</td>
                                <td className="px-5 py-3">
                                  <span className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap ${
                                    exp.category === 'Capital Improvement' ? 'bg-violet-100 text-violet-700' :
                                    exp.category === 'Repairs' ? 'bg-red-100 text-red-700' :
                                    exp.category === 'Maintenance' ? 'bg-amber-100 text-amber-700' :
                                    'bg-gray-100 text-gray-700'
                                  }`}>{exp.category}</span>
                                </td>
                                <td className={`px-5 py-3 text-sm ${th.txt}`}>{exp.payee}</td>
                                <td className="px-5 py-3">
                                  <p className={`text-sm ${th.txt}`}>{exp.description}</p>
                                  {exp.notes && <p className={`text-xs ${th.mut} mt-0.5 italic`}>{exp.notes}</p>}
                                </td>
                                <td className={`px-5 py-3 text-sm ${th.mut}`}>
                                  {exp.method}
                                  {exp.checkNum && <span className="ml-1">#{exp.checkNum}</span>}
                                </td>
                                <td className={`px-5 py-3 text-sm font-semibold text-red-600 text-right`}>{fmt(exp.amount)}</td>
                                <td className="px-5 py-3">
                                  <ChevronDown className={`w-4 h-4 ${th.mut} transition ${isExpanded ? 'rotate-180' : ''}`} />
                                </td>
                              </tr>
                              {isExpanded && (
                                <tr>
                                  <td colSpan={7} className={`px-5 py-4 ${th.card2}`}>
                                    <div className="flex gap-8">
                                      <div className="space-y-2">
                                        <p className={`text-xs ${th.mut}`}>Expense ID</p>
                                        <p className={`text-sm font-medium ${th.txt}`}>{exp.id}</p>
                                      </div>
                                      <div className="space-y-2">
                                        <p className={`text-xs ${th.mut}`}>Property ID</p>
                                        <p className={`text-sm font-medium ${th.txt}`}>{prop.id}</p>
                                      </div>
                                      {exp.receipt && (
                                        <div className="space-y-2">
                                          <p className={`text-xs ${th.mut}`}>Receipt</p>
                                          <p className="text-sm text-blue-600">{exp.receipt}</p>
                                        </div>
                                      )}
                                      <div className="ml-auto">
                                        <button onClick={(e) => { e.stopPropagation(); openExpenseModal(prop.id, exp); }} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"><Edit2 className="w-4 h-4" />Edit</button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                              </React.Fragment>
                            );})}
                          </tbody>
                        </table>
                      ) : (
                        <div className="p-12 text-center">
                          <Receipt className={`w-12 h-12 mx-auto ${th.mut} opacity-50`} />
                          <p className={`${th.mut} mt-3`}>{propExpenses.length > 0 ? 'No expenses match your filters' : 'No expenses recorded'}</p>
                          {propExpenses.length === 0 && <button onClick={() => openExpenseModal(prop.id)} className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium">Add Expense</button>}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Loan Tab */}
              {tab === 'loan' && (() => {
                const loan = getLoan(prop.id);
                const lender = loan ? getLender(loan.id) : null;
                const linkedProps = loan ? getPropsOnLoan(loan.id) : [];
                const totalValue = linkedProps.reduce((s, p) => s + p.value, 0);
                const ltv = loan ? Math.round(loan.currBalance / totalValue * 100) : 0;
                const maturityDays = loan?.maturityDate ? Math.ceil((new Date(loan.maturityDate) - new Date()) / 86400000) : null;
                const maturityYears = maturityDays ? (maturityDays / 365).toFixed(1) : null;
                
                return loan ? (
                <div className="space-y-6">
                  {/* Loan Summary */}
                  <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className={`text-lg font-medium ${th.txt}`}>{loan.name}</h3>
                        <p className={`text-sm ${th.mut}`}>{loan.type} · Account #{loan.accountNum}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {linkedProps.length > 1 && (
                          <span className="text-xs px-3 py-1 rounded-full bg-violet-100 text-violet-700 font-medium">
                            {linkedProps.length} Properties
                          </span>
                        )}
                        {maturityDays && maturityDays < 365 * 2 && (
                          <span className="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-medium">
                            Matures in {maturityYears}yr
                          </span>
                        )}
                        <button onClick={() => openLoanEditModal(loan)} className={`px-3 py-1.5 rounded-lg border ${th.bdr} ${th.txt} text-sm font-medium ${th.hov} flex items-center gap-1.5`}>
                          <Edit2 className="w-4 h-4" />Edit
                        </button>
                      </div>
                    </div>
                    
                    {/* Key Dates */}
                    <div className={`grid grid-cols-4 gap-6 pb-4 mb-4 border-b ${th.bdr}`}>
                      <div><p className={`text-xs ${th.mut}`}>Origination Date</p><p className={`text-sm font-medium ${th.txt} mt-1`}>{fmtDate(loan.origDate)}</p></div>
                      <div><p className={`text-xs ${th.mut}`}>First Payment</p><p className={`text-sm font-medium ${th.txt} mt-1`}>{fmtDate(loan.firstPaymentDate)}</p></div>
                      <div>
                        <p className={`text-xs ${th.mut}`}>Maturity Date</p>
                        <p className={`text-sm font-medium ${maturityDays && maturityDays < 365 * 2 ? 'text-amber-600' : th.txt} mt-1`}>{fmtDate(loan.maturityDate)}</p>
                      </div>
                      <div><p className={`text-xs ${th.mut}`}>Time Remaining</p><p className={`text-sm font-medium ${th.txt} mt-1`}>{maturityYears} years</p></div>
                    </div>

                    {/* Loan Terms */}
                    <div className="grid grid-cols-4 gap-6">
                      <div><p className={`text-xs ${th.mut}`}>Lender</p><p className={`text-sm font-medium ${th.txt} mt-1`}>{lender?.name}</p></div>
                      <div><p className={`text-xs ${th.mut}`}>Interest Rate</p><p className={`text-sm font-medium ${th.txt} mt-1`}>{loan.rate}%</p></div>
                      <div><p className={`text-xs ${th.mut}`}>Loan Term</p><p className={`text-sm font-medium ${th.txt} mt-1`}>{loan.term} years</p></div>
                      <div><p className={`text-xs ${th.mut}`}>Amortization</p><p className={`text-sm font-medium ${th.txt} mt-1`}>{loan.amortization} years</p></div>
                      <div><p className={`text-xs ${th.mut}`}>Original Amount</p><p className={`text-sm font-medium ${th.txt} mt-1`}>{fmt(loan.origAmount)}</p></div>
                      <div><p className={`text-xs ${th.mut}`}>Current Balance</p><p className={`text-sm font-medium ${th.txt} mt-1`}>{fmt(loan.currBalance)}</p></div>
                      <div><p className={`text-xs ${th.mut}`}>Total Equity</p><p className="text-sm font-medium text-violet-600 mt-1">{fmt(totalValue - loan.currBalance)}</p></div>
                      <div><p className={`text-xs ${th.mut}`}>LTV</p><p className={`text-sm font-medium ${ltv > 80 ? 'text-amber-600' : 'text-emerald-600'} mt-1`}>{ltv}%</p></div>
                    </div>
                    {loan.notes && (
                      <div className={`mt-4 pt-4 border-t ${th.bdr}`}>
                        <p className={`text-xs ${th.mut}`}>Notes</p>
                        <p className={`text-sm ${th.txt} mt-1`}>{loan.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Monthly Payment Breakdown */}
                  <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                    <h3 className={`text-sm font-medium ${th.txt} mb-4`}>Monthly Payment Breakdown</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className={th.mut}>Principal & Interest</span>
                        <span className={th.txt}>{fmt(loan.pi)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={th.mut}>Property Tax {loan.escrowTax && <span className="text-xs text-blue-600">(escrowed)</span>}</span>
                        <span className={th.txt}>{fmt(loan.tax)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={th.mut}>Insurance {loan.escrowIns && <span className="text-xs text-blue-600">(escrowed)</span>}</span>
                        <span className={th.txt}>{fmt(loan.ins)}</span>
                      </div>
                      {loan.hoa > 0 && (
                        <div className="flex justify-between items-center">
                          <span className={th.mut}>HOA</span>
                          <span className={th.txt}>{fmt(loan.hoa)}</span>
                        </div>
                      )}
                      <div className={`flex justify-between items-center pt-2 border-t ${th.bdr} font-semibold`}>
                        <span className={th.txt}>Total Payment</span>
                        <span className="text-blue-600">{fmt(loan.pi + loan.tax + loan.ins + loan.hoa)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Linked Properties */}
                  {linkedProps.length > 1 && (
                    <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                      <h3 className={`text-sm font-medium ${th.txt} mb-4`}>Properties on this Loan</h3>
                      <div className="space-y-2">
                        {linkedProps.map(lp => (
                          <div key={lp.id} className={`flex items-center justify-between p-3 rounded-lg ${lp.id === prop.id ? 'bg-blue-50 border border-blue-200' : th.card2}`}>
                            <div className="flex items-center gap-3">
                              <Building className={`w-4 h-4 ${lp.id === prop.id ? 'text-blue-600' : th.mut}`} />
                              <span className={`text-sm ${lp.id === prop.id ? 'text-blue-600 font-medium' : th.txt}`}>{lp.addr}</span>
                              {lp.id === prop.id && <span className="text-xs text-blue-600">(current)</span>}
                            </div>
                            <span className={`text-sm ${th.txt}`}>{fmt(lp.value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Loan Officer */}
                  <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                    <h3 className={`text-sm font-medium ${th.txt} mb-4`}>Loan Officer (Original Lender)</h3>
                    <div className="grid grid-cols-4 gap-6">
                      <div><p className={`text-xs ${th.mut}`}>Lender</p><p className={`text-sm ${th.txt} mt-1`}>{lender?.name}</p></div>
                      <div><p className={`text-xs ${th.mut}`}>Loan Officer</p><p className={`text-sm ${th.txt} mt-1`}>{loan.loanOfficer}</p></div>
                      <div><p className={`text-xs ${th.mut}`}>Phone</p><p className={`text-sm ${th.txt} mt-1`}>{loan.loanOfficerPhone}</p></div>
                      <div><p className={`text-xs ${th.mut}`}>Email</p><p className="text-sm text-blue-600 mt-1">{loan.loanOfficerEmail}</p></div>
                    </div>
                  </div>

                  {/* Servicer Info */}
                  {loan.servicer ? (
                    <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className={`text-sm font-medium ${th.txt}`}>Loan Servicer</h3>
                        <span className="text-xs px-2 py-1 rounded bg-amber-100 text-amber-700">Servicing Transferred</span>
                      </div>
                      <div className="grid grid-cols-5 gap-6">
                        <div><p className={`text-xs ${th.mut}`}>Servicer</p><p className={`text-sm font-medium ${th.txt} mt-1`}>{loan.servicer.name}</p></div>
                        <div><p className={`text-xs ${th.mut}`}>Account #</p><p className={`text-sm font-mono ${th.txt} mt-1`}>{loan.servicer.accountNum}</p></div>
                        <div><p className={`text-xs ${th.mut}`}>Phone</p><p className={`text-sm ${th.txt} mt-1`}>{loan.servicer.phone}</p></div>
                        <div><p className={`text-xs ${th.mut}`}>Email</p><p className="text-sm text-blue-600 mt-1">{loan.servicer.email}</p></div>
                        <div><p className={`text-xs ${th.mut}`}>Website</p><p className="text-sm text-blue-600 mt-1">{loan.servicer.website}</p></div>
                      </div>
                      <p className={`text-xs ${th.mut} mt-3`}>Make payments to the servicer. Original lender info retained for records.</p>
                    </div>
                  ) : (
                    <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-medium ${th.txt}`}>Loan Servicer</h3>
                        <span className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700">Serviced by Original Lender</span>
                      </div>
                      <p className={`text-xs ${th.mut} mt-2`}>This loan is still serviced by {lender?.name}. Make payments directly to them.</p>
                    </div>
                  )}

                  {/* Balance History */}
                  <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className={`text-sm font-medium ${th.txt}`}>Balance History</h3>
                        <p className={`text-xs ${th.mut} mt-0.5`}>Last verified: {loan.balanceHistory?.[0] ? fmtDate(loan.balanceHistory[0].date) : 'Never'}</p>
                      </div>
                      <button onClick={() => openBalanceModal(loan.id)} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-1.5">
                        <Plus className="w-4 h-4" />Update Balance
                      </button>
                    </div>
                    {loan.balanceHistory && loan.balanceHistory.length > 0 ? (
                      <table className="w-full">
                        <thead><tr className={`text-xs ${th.mut} uppercase`}>
                          <th className="text-left py-2">Date</th>
                          <th className="text-right py-2">Balance</th>
                          <th className="text-left py-2 pl-4">Source</th>
                          <th className="text-left py-2">Notes</th>
                        </tr></thead>
                        <tbody className={`divide-y ${th.bdr}`}>
                          {loan.balanceHistory.map((entry, idx) => {
                            const prevEntry = loan.balanceHistory[idx + 1];
                            const paydown = prevEntry ? prevEntry.balance - entry.balance : null;
                            return (
                              <tr key={entry.id}>
                                <td className={`py-2 text-sm ${th.txt}`}>{fmtDate(entry.date)}</td>
                                <td className={`py-2 text-sm font-medium ${th.txt} text-right`}>
                                  {fmt(entry.balance)}
                                  {paydown > 0 && <span className="text-emerald-600 text-xs ml-2">↓{fmt(paydown)}</span>}
                                </td>
                                <td className="py-2 pl-4">
                                  <span className={`text-xs px-2 py-0.5 rounded ${entry.source === 'statement' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                                    {entry.source}
                                  </span>
                                </td>
                                <td className={`py-2 text-sm ${th.mut}`}>{entry.notes || '—'}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <p className={`text-sm ${th.mut} text-center py-4`}>No balance history recorded</p>
                    )}
                  </div>

                  {/* Servicer History */}
                  <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className={`text-sm font-medium ${th.txt}`}>Servicer History</h3>
                        <p className={`text-xs ${th.mut} mt-0.5`}>{loan.servicerHistory?.length || 0} transfer(s)</p>
                      </div>
                      <button onClick={() => openServicerModal(loan.id)} className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium flex items-center gap-1.5">
                        <Plus className="w-4 h-4" />Add Transfer
                      </button>
                    </div>
                    {loan.servicerHistory && loan.servicerHistory.length > 0 ? (
                      <div className="space-y-3">
                        {loan.servicerHistory.map((s, idx) => (
                          <div key={s.id} className={`p-3 rounded-lg ${idx === 0 ? (dark ? 'bg-amber-900/20 border border-amber-700' : 'bg-amber-50 border border-amber-200') : th.card2}`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-medium ${th.txt}`}>{s.name}</span>
                                {idx === 0 && <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-700">Current</span>}
                              </div>
                              <span className={`text-xs ${th.mut}`}>{fmtDate(s.transferDate)}</span>
                            </div>
                            <p className={`text-xs ${th.mut} mt-1`}>Acct: {s.accountNum} · {s.phone}</p>
                            {s.notes && <p className={`text-xs ${th.mut} mt-1 italic`}>{s.notes}</p>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className={`text-sm ${th.mut} text-center py-4`}>No servicer changes recorded</p>
                    )}
                  </div>

                  {/* Tax & Insurance History */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Tax History */}
                    <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className={`text-sm font-medium ${th.txt}`}>Tax History</h3>
                        <button onClick={() => openTaxUpdateModal(loan.id)} className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded font-medium">Update</button>
                      </div>
                      {loan.taxHistory && loan.taxHistory.length > 0 ? (
                        <div className="space-y-2">
                          {loan.taxHistory.map((t, idx) => (
                            <div key={t.id} className={`flex items-center justify-between py-2 ${idx < loan.taxHistory.length - 1 ? `border-b ${th.bdr}` : ''}`}>
                              <div>
                                <span className={`text-sm ${idx === 0 ? 'font-medium' : ''} ${th.txt}`}>{fmt(t.amount)}/mo</span>
                                {idx === 0 && <span className="text-xs text-emerald-600 ml-2">current</span>}
                                {t.notes && <p className={`text-xs ${th.mut} mt-0.5`}>{t.notes}</p>}
                              </div>
                              <span className={`text-xs ${th.mut}`}>{fmtDate(t.effectiveDate)}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className={`text-sm ${th.mut} text-center py-2`}>No history</p>
                      )}
                    </div>

                    {/* Insurance History */}
                    <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className={`text-sm font-medium ${th.txt}`}>Insurance History</h3>
                        <button onClick={() => openInsUpdateModal(loan.id)} className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded font-medium">Update</button>
                      </div>
                      {loan.insHistory && loan.insHistory.length > 0 ? (
                        <div className="space-y-2">
                          {loan.insHistory.map((i, idx) => (
                            <div key={i.id} className={`flex items-center justify-between py-2 ${idx < loan.insHistory.length - 1 ? `border-b ${th.bdr}` : ''}`}>
                              <div>
                                <span className={`text-sm ${idx === 0 ? 'font-medium' : ''} ${th.txt}`}>{fmt(i.amount)}/mo</span>
                                {idx === 0 && <span className="text-xs text-emerald-600 ml-2">current</span>}
                                {i.notes && <p className={`text-xs ${th.mut} mt-0.5`}>{i.notes}</p>}
                              </div>
                              <span className={`text-xs ${th.mut}`}>{fmtDate(i.effectiveDate)}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className={`text-sm ${th.mut} text-center py-2`}>No history</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`${th.card} rounded-xl border ${th.bdr} p-12 text-center`}>
                  <Landmark className={`w-12 h-12 mx-auto ${th.mut} opacity-50`} />
                  <p className={`${th.mut} mt-3`}>No loan attached to this property</p>
                  <button onClick={() => openLoanModal(prop.id)} className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">Add Loan</button>
                </div>
              );
              })()}

              {/* Tenants Tab */}
              {tab === 'tenants' && (() => {
                const activeLeases = getActiveLeases(prop.id);
                const pastLeases = leases.filter(l => l.propId === prop.id && l.status === 'ended').sort((a, b) => new Date(b.end) - new Date(a.end));
                return (
                <div className="space-y-6">
                  {/* Current Tenants */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className={`text-lg font-medium ${th.txt}`}>Current Tenants ({activeLeases.length})</h3>
                      <button onClick={() => { setTenantForm({ name: '', email: '', phone: '', propId: prop.id, leaseStart: '', leaseEnd: '', rent: '', unit: '', ri: false, depositAmount: '', depositMethod: 'Check', depositDate: '' }); setShowTenantModal(true); }} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4" />Add Tenant</button>
                    </div>
                    {activeLeases.length > 0 ? activeLeases.map(lease => {
                      const tenant = getTenantById(lease.tenantId);
                      const leasePayments = getLeasePayments(lease.id);
                      const onTimeCount = leasePayments.filter(p => p.status === 'paid' && !p.daysLate).length;
                      const lateCount = leasePayments.filter(p => p.daysLate).length;
                      const dep = lease.deposit;
                      return (
                      <div key={lease.id} className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">{tenant?.name.split(' ').map(n => n[0]).join('')}</div>
                            <div>
                              <p className={`text-base font-medium ${th.txt}`}>{tenant?.name}{lease.unit && ` (Unit ${lease.unit})`}</p>
                              <p className={`text-sm ${th.mut}`}>{tenant?.email} · {tenant?.phone}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className={`text-lg font-semibold ${th.txt}`}>{fmt(lease.rent)}/mo</p>
                              {tenant?.ri ? <span className="inline-flex items-center gap-1 text-xs text-emerald-600"><ShieldCheck className="w-4 h-4" />Insured</span> : <span className="inline-flex items-center gap-1 text-xs text-red-600"><ShieldOff className="w-4 h-4" />No Insurance</span>}
                            </div>
                            <button onClick={() => openTenantEditModal(tenant)} className={`p-2 rounded-lg border ${th.bdr} ${th.hov}`} title="Edit Tenant"><Edit2 className={`w-4 h-4 ${th.mut}`} /></button>
                          </div>
                        </div>
                        <div className={`grid grid-cols-4 gap-4 mt-4 pt-4 border-t ${th.bdr}`}>
                          <div><p className={`text-xs ${th.mut}`}>Lease Start</p><p className={`text-sm ${th.txt} mt-1`}>{fmtDate(lease.start)}</p></div>
                          <div><p className={`text-xs ${th.mut}`}>Lease End</p><p className={`text-sm ${th.txt} mt-1`}>{fmtDate(lease.end)}</p></div>
                          <div><p className={`text-xs ${th.mut}`}>On Time</p><p className="text-sm text-emerald-600 mt-1">{onTimeCount} payments</p></div>
                          <div><p className={`text-xs ${th.mut}`}>Late</p><p className={`text-sm ${lateCount > 0 ? 'text-amber-600' : th.txt} mt-1`}>{lateCount} payments</p></div>
                        </div>
                        {/* Deposit Section */}
                        <div className={`mt-4 pt-4 border-t ${th.bdr}`}>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className={`text-sm font-medium ${th.txt}`}>Security Deposit</h4>
                            <button onClick={() => openLeaseEditModal(lease)} className={`text-xs text-blue-600 hover:text-blue-700 font-medium`}>Edit Lease & Deposit</button>
                          </div>
                          <div className="grid grid-cols-4 gap-4">
                            <div><p className={`text-xs ${th.mut}`}>Amount</p><p className={`text-sm ${th.txt} mt-1`}>{fmt(dep?.amount)}</p></div>
                            <div><p className={`text-xs ${th.mut}`}>Method</p><p className={`text-sm ${th.txt} mt-1`}>{dep?.method || '—'}</p></div>
                            <div><p className={`text-xs ${th.mut}`}>Received</p><p className={`text-sm ${th.txt} mt-1`}>{fmtDate(dep?.paidDate)}</p></div>
                            <div><p className={`text-xs ${th.mut}`}>Status</p><p className="text-sm text-emerald-600 mt-1">Held</p></div>
                          </div>
                        </div>
                      </div>
                    );}) : (
                      <div className={`${th.card} rounded-xl border ${th.bdr} p-12 text-center`}>
                        <Users className={`w-12 h-12 mx-auto ${th.mut} opacity-50`} />
                        <p className={`${th.mut} mt-3`}>No current tenants</p>
                        <button onClick={() => { setTenantForm({ name: '', email: '', phone: '', propId: prop.id, leaseStart: '', leaseEnd: '', rent: '', unit: '', ri: false, depositAmount: '', depositMethod: 'Check', depositDate: '' }); setShowTenantModal(true); }} className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">Add Tenant</button>
                      </div>
                    )}
                  </div>

                  {/* Tenant History */}
                  {pastLeases.length > 0 && (
                    <div className="space-y-4">
                      <h3 className={`text-lg font-medium ${th.txt}`}>Tenant History ({pastLeases.length})</h3>
                      <div className={`${th.card} rounded-xl border ${th.bdr} overflow-hidden`}>
                        <table className="w-full">
                          <thead><tr className={`${th.card2} text-xs ${th.mut} uppercase`}>
                            <th className="text-left px-5 py-3">Tenant</th>
                            <th className="text-left px-5 py-3">Lease Period</th>
                            <th className="text-right px-5 py-3">Rent</th>
                            <th className="text-left px-5 py-3">Deposit</th>
                            <th className="text-left px-5 py-3">Notes</th>
                            <th className="w-12"></th>
                          </tr></thead>
                          <tbody className={`divide-y ${th.bdr}`}>
                            {pastLeases.map(lease => {
                              const tenant = getTenantById(lease.tenantId);
                              const dep = lease.deposit;
                              return (
                                <tr key={lease.id} className={th.hov}>
                                  <td className="px-5 py-3">
                                    <p className={`text-sm font-medium ${th.txt}`}>{tenant?.name}</p>
                                    <p className={`text-xs ${th.mut}`}>{tenant?.email}</p>
                                  </td>
                                  <td className="px-5 py-3">
                                    <p className={`text-sm ${th.txt}`}>{fmtDate(lease.start)} - {fmtDate(lease.end)}</p>
                                  </td>
                                  <td className={`px-5 py-3 text-right text-sm ${th.txt}`}>{fmt(lease.rent)}/mo</td>
                                  <td className="px-5 py-3">
                                    {dep?.returned ? (
                                      <div>
                                        <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">Returned</span>
                                        <p className={`text-xs ${th.mut} mt-1`}>{fmt(dep.returnedAmount)} on {fmtDate(dep.returnedDate)}</p>
                                      </div>
                                    ) : (
                                      <span className={`text-sm ${th.txt}`}>{fmt(dep?.amount || dep)}</span>
                                    )}
                                  </td>
                                  <td className={`px-5 py-3 text-sm ${th.mut}`}>{dep?.notes || '—'}</td>
                                  <td className="px-5 py-3">
                                    <button onClick={() => openLeaseEditModal(lease)} className={`p-1.5 rounded-lg ${th.hov}`}><Edit2 className={`w-4 h-4 ${th.mut}`} /></button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );})()}

              {/* Insurance Tab */}
              {tab === 'insurance' && (() => {
                const activeLeases = getActiveLeases(prop.id);
                const activeTenants = activeLeases.map(l => getTenantById(l.tenantId)).filter(Boolean);
                return (
                <div className="space-y-6">
                  <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className={`text-sm font-medium ${th.txt}`}>Landlord Insurance</h3>
                      <span className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700">Active</span>
                    </div>
                    <div className="grid grid-cols-4 gap-6">
                      <div><p className={`text-xs ${th.mut}`}>Provider</p><p className={`text-sm ${th.txt} mt-1`}>State Farm</p></div>
                      <div><p className={`text-xs ${th.mut}`}>Policy Number</p><p className={`text-sm font-mono ${th.txt} mt-1`}>SF-2024-78432</p></div>
                      <div><p className={`text-xs ${th.mut}`}>Annual Premium</p><p className={`text-sm ${th.txt} mt-1`}>{fmt(prop.loan.ins * 12)}</p></div>
                      <div><p className={`text-xs ${th.mut}`}>Monthly Cost</p><p className={`text-sm ${th.txt} mt-1`}>{fmt(prop.loan.ins)}</p></div>
                      <div><p className={`text-xs ${th.mut}`}>Dwelling Coverage</p><p className={`text-sm ${th.txt} mt-1`}>{fmt(prop.value)}</p></div>
                      <div><p className={`text-xs ${th.mut}`}>Liability</p><p className={`text-sm ${th.txt} mt-1`}>$300,000</p></div>
                      <div><p className={`text-xs ${th.mut}`}>Deductible</p><p className={`text-sm ${th.txt} mt-1`}>$2,500</p></div>
                      <div><p className={`text-xs ${th.mut}`}>Expiration</p><p className={`text-sm ${th.txt} mt-1`}>Mar 15, 2025</p></div>
                    </div>
                  </div>
                  <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                    <h3 className={`text-sm font-medium ${th.txt} mb-4`}>Tenant Renters Insurance</h3>
                    {activeTenants.length > 0 ? activeTenants.map(t => (
                      <div key={t.id} className={`flex items-center justify-between p-4 rounded-lg ${t.ri ? 'bg-emerald-50' : 'bg-red-50'}`}>
                        <div className="flex items-center gap-3">
                          {t.ri ? <ShieldCheck className="w-5 h-5 text-emerald-600" /> : <ShieldOff className="w-5 h-5 text-red-500" />}
                          <span className={`text-sm font-medium ${th.txt}`}>{t.name}</span>
                        </div>
                        {t.ri ? <span className="text-sm text-emerald-600">Verified</span> : <span className="text-sm text-red-600">Missing</span>}
                      </div>
                    )) : <p className={`text-sm ${th.mut}`}>No current tenants</p>}
                  </div>
                </div>
              );})()}

              {/* Taxes Tab */}
              {tab === 'taxes' && (
                <div className="space-y-6">
                  <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                    <h3 className={`text-sm font-medium ${th.txt} mb-4`}>Property Tax Information</h3>
                    <div className="grid grid-cols-4 gap-6">
                      <div><p className={`text-xs ${th.mut}`}>Annual Amount</p><p className={`text-xl font-semibold ${th.txt} mt-1`}>{fmt(prop.loan.tax * 12)}</p></div>
                      <div><p className={`text-xs ${th.mut}`}>Monthly Amount</p><p className={`text-sm ${th.txt} mt-1`}>{fmt(prop.loan.tax)}</p></div>
                      <div><p className={`text-xs ${th.mut}`}>Tax Authority</p><p className={`text-sm ${th.txt} mt-1`}>Dallas County</p></div>
                      <div><p className={`text-xs ${th.mut}`}>Account Number</p><p className={`text-sm font-mono ${th.txt} mt-1`}>DC-2019-78432</p></div>
                      <div><p className={`text-xs ${th.mut}`}>Payment Schedule</p><p className={`text-sm ${th.txt} mt-1`}>Annual</p></div>
                      <div><p className={`text-xs ${th.mut}`}>Payment Method</p><span className={`text-xs px-2 py-0.5 rounded ${prop.loan.escTax !== false ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{prop.loan.escTax !== false ? 'Escrowed' : 'Paid Separately'}</span></div>
                      <div><p className={`text-xs ${th.mut}`}>Next Due Date</p><p className={`text-sm ${th.txt} mt-1`}>Jan 31, 2025</p></div>
                    </div>
                  </div>
                  <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className={`text-sm font-medium ${th.txt}`}>Payment History</h3>
                      <button className="text-sm text-blue-600 font-medium">+ Add Payment</button>
                    </div>
                    <table className="w-full">
                      <thead><tr className={`text-xs ${th.mut} uppercase`}><th className="text-left py-2">Period</th><th className="text-right py-2">Amount</th><th className="text-left py-2">Paid By</th><th className="text-left py-2">Status</th></tr></thead>
                      <tbody className={`divide-y ${th.bdr}`}>
                        <tr><td className={`py-3 text-sm ${th.txt}`}>2024</td><td className={`py-3 text-sm ${th.txt} text-right`}>{fmt(prop.loan.tax * 12)}</td><td className={`py-3 text-sm ${th.txt}`}>Escrow</td><td className="py-3"><span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">Paid</span></td></tr>
                        <tr><td className={`py-3 text-sm ${th.txt}`}>2023</td><td className={`py-3 text-sm ${th.txt} text-right`}>{fmt(prop.loan.tax * 12 * 0.95)}</td><td className={`py-3 text-sm ${th.txt}`}>Escrow</td><td className="py-3"><span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">Paid</span></td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Documents Tab */}
              {tab === 'documents' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className={`text-lg font-medium ${th.txt}`}>Documents</h3>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4" />Upload</button>
                  </div>
                  <div className={`${th.card} rounded-xl border ${th.bdr} overflow-hidden`}>
                    <table className="w-full">
                      <thead><tr className={`${th.card2} text-xs ${th.mut} uppercase`}><th className="text-left px-5 py-3">Name</th><th className="text-left px-5 py-3">Category</th><th className="text-left px-5 py-3">Date</th><th className="text-left px-5 py-3">Size</th></tr></thead>
                      <tbody className={`divide-y ${th.bdr}`}>
                        <tr className={th.hov}><td className={`px-5 py-3 text-sm ${th.txt}`}>Lease Agreement.pdf</td><td className={`px-5 py-3 text-sm ${th.mut}`}>Lease</td><td className={`px-5 py-3 text-sm ${th.mut}`}>Apr 1, 2023</td><td className={`px-5 py-3 text-sm ${th.mut}`}>245 KB</td></tr>
                        <tr className={th.hov}><td className={`px-5 py-3 text-sm ${th.txt}`}>Insurance Policy.pdf</td><td className={`px-5 py-3 text-sm ${th.mut}`}>Insurance</td><td className={`px-5 py-3 text-sm ${th.mut}`}>Mar 15, 2024</td><td className={`px-5 py-3 text-sm ${th.mut}`}>180 KB</td></tr>
                        <tr className={th.hov}><td className={`px-5 py-3 text-sm ${th.txt}`}>Inspection Report.pdf</td><td className={`px-5 py-3 text-sm ${th.mut}`}>Inspection</td><td className={`px-5 py-3 text-sm ${th.mut}`}>Feb 10, 2023</td><td className={`px-5 py-3 text-sm ${th.mut}`}>1.2 MB</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tenants */}
          {view === 'tenants' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div><h1 className={`text-3xl font-semibold ${th.txt}`}>Tenants</h1><p className={`${th.mut} mt-1`}>{filteredTenants.length} tenants</p></div>
                <button onClick={openTenantModal} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4" />Add Tenant</button>
              </div>
              <div className="grid grid-cols-4 gap-6">
                <Stat label="Total Tenants" value={allTenants.length} color="text-blue-600" />
                <Stat label="Active Leases" value={allLeases.filter(l => l.status === 'active').length} color="text-emerald-600" />
                <Stat label="With Insurance" value={allTenants.filter(t => t.ri).length} color="text-emerald-600" />
                <Stat label="Missing Insurance" value={allTenants.filter(t => !t.ri).length} color="text-red-600" />
              </div>
              
              {/* Search and Filters */}
              <div className="flex gap-4 flex-wrap">
                <div className="flex-1 relative min-w-[200px]">
                  <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${th.mut}`} />
                  <input type="text" placeholder="Search by name, email, phone, or property..." value={tenantSearch} onChange={e => setTenantSearch(e.target.value)} className={`w-full pl-12 pr-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
                <MultiSelect label="Payment Method" options={activePaymentMethods} selected={tenantPaymentMethodFilter} toggle={toggleTenantPaymentMethod} open={tenantPaymentMethodOpen} setOpen={setTenantPaymentMethodOpen} />
                {(tenantSearch || tenantPaymentMethodFilter.length > 0) && (
                  <button onClick={() => { setTenantSearch(''); setTenantPaymentMethodFilter([]); }} className="text-sm text-blue-600 hover:underline">Clear filters</button>
                )}
              </div>
              
              <div className={`${th.card} rounded-xl border ${th.bdr} overflow-hidden`}>
                <table className="w-full">
                  <thead><tr className={`${th.card2} text-xs ${th.mut} uppercase`}>
                    <th className="text-left px-5 py-3">Tenant</th>
                    <th className="text-left px-5 py-3">Property</th>
                    <th className="text-left px-5 py-3">Lease Period</th>
                    <th className="text-left px-5 py-3">Pays Via</th>
                    <th className="text-right px-5 py-3">Rent</th>
                    <th className="text-center px-5 py-3">Insurance</th>
                    <th className="w-12"></th>
                  </tr></thead>
                  <tbody className={`divide-y ${th.bdr}`}>
                    {filteredTenants.map(t => {
                      const activeLease = allLeases.find(l => l.tenantId === t.id && l.status === 'active');
                      const anyLease = activeLease || allLeases.find(l => l.tenantId === t.id);
                      const allTenantLeases = allLeases.filter(l => l.tenantId === t.id);
                      const p = anyLease ? props.find(x => x.id === anyLease.propId) : null;
                      const isExpanded = selectedTenant === t.id;
                      
                      // Get all payments for this tenant's leases
                      const tenantPayments = allPayments.filter(pay => allTenantLeases.some(l => l.id === pay.leaseId));
                      const paidPayments = tenantPayments.filter(pay => pay.status === 'paid');
                      const onTimePayments = paidPayments.filter(pay => !pay.daysLate);
                      const latePayments = paidPayments.filter(pay => pay.daysLate);
                      const totalPaid = paidPayments.reduce((s, pay) => s + pay.amt, 0);
                      const totalLateFees = tenantPayments.reduce((s, pay) => s + (pay.lateFee || 0), 0);
                      const overduePayments = tenantPayments.filter(pay => pay.status === 'overdue');
                      
                      return (
                        <React.Fragment key={t.id}>
                        <tr className={`${th.hov} cursor-pointer`} onClick={() => setSelectedTenant(isExpanded ? null : t.id)}>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">{t.name.split(' ').map(n => n[0]).join('')}</div>
                              <div>
                                <p className={`text-sm font-medium ${th.txt}`}>{t.name}</p>
                                <p className={`text-xs ${th.mut}`}>{t.email}</p>
                                <p className={`text-xs ${th.mut}`}>{t.phone}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            {p ? (
                              <>
                                <p className={`text-sm ${th.txt}`}>{p.addr}{anyLease?.unit && ` - Unit ${anyLease.unit}`}</p>
                                <p className={`text-xs ${th.mut}`}>{p.city}, {p.state}</p>
                                <p className={`text-xs ${th.mut}`}>Property ID: {p.id}</p>
                              </>
                            ) : (
                              <span className={th.mut}>—</span>
                            )}
                          </td>
                          <td className="px-5 py-3">
                            {anyLease ? (
                              <>
                                <p className={`text-sm ${th.txt}`}>{fmtDate(anyLease.start)} - {fmtDate(anyLease.end)}</p>
                                <p className={`text-xs ${anyLease.status === 'active' ? 'text-emerald-600' : th.mut}`}>{anyLease.status === 'active' ? 'Active' : 'Ended'}</p>
                              </>
                            ) : (
                              <span className={th.mut}>—</span>
                            )}
                          </td>
                          <td className="px-5 py-3">
                            {activeLease?.paymentMethod ? (
                              <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${dark ? 'bg-slate-700' : 'bg-gray-100'} ${th.txt}`}>
                                <CreditCard className="w-3 h-3" />
                                {activeLease.paymentMethod}
                              </span>
                            ) : <span className={th.mut}>—</span>}
                          </td>
                          <td className={`px-5 py-3 text-right text-sm font-semibold ${th.txt}`}>{anyLease ? fmt(anyLease.rent) : '—'}</td>
                          <td className="px-5 py-3 text-center">
                            {t.ri ? (
                              <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-medium"><ShieldCheck className="w-4 h-4" />Verified</span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-red-100 text-red-700 font-medium"><ShieldOff className="w-4 h-4" />Missing</span>
                            )}
                          </td>
                          <td className="px-5 py-3">
                            <ChevronDown className={`w-4 h-4 ${th.mut} transition ${isExpanded ? 'rotate-180' : ''}`} />
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr>
                            <td colSpan={7} className={`px-5 py-4 ${th.card2}`}>
                              <div className="space-y-4">
                                {/* Stats Row */}
                                <div className="grid grid-cols-6 gap-4">
                                  <div className="space-y-1">
                                    <p className={`text-xs ${th.mut}`}>Tenant ID</p>
                                    <p className={`text-sm font-medium ${th.txt}`}>{t.id}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className={`text-xs ${th.mut}`}>Move-in Date</p>
                                    <p className={`text-sm font-medium ${th.txt}`}>{anyLease ? fmtDate(anyLease.start) : '—'}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className={`text-xs ${th.mut}`}>Total Paid</p>
                                    <p className={`text-sm font-medium text-emerald-600`}>{fmt(totalPaid)}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className={`text-xs ${th.mut}`}>On-Time Payments</p>
                                    <p className={`text-sm font-medium text-emerald-600`}>{onTimePayments.length}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className={`text-xs ${th.mut}`}>Late Payments</p>
                                    <p className={`text-sm font-medium ${latePayments.length > 0 ? 'text-amber-600' : th.txt}`}>{latePayments.length}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className={`text-xs ${th.mut}`}>Late Fees Paid</p>
                                    <p className={`text-sm font-medium ${totalLateFees > 0 ? 'text-red-600' : th.txt}`}>{fmt(totalLateFees)}</p>
                                  </div>
                                </div>
                                
                                {/* Overdue Alert */}
                                {overduePayments.length > 0 && (
                                  <div className={`flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200`}>
                                    <AlertTriangle className="w-4 h-4 text-red-600" />
                                    <span className="text-sm text-red-700 font-medium">{overduePayments.length} overdue payment{overduePayments.length > 1 ? 's' : ''} totaling {fmt(overduePayments.reduce((s, p) => s + p.amt, 0))}</span>
                                  </div>
                                )}
                                
                                {/* Deposit Info */}
                                {anyLease?.deposit && (
                                  <div className="grid grid-cols-4 gap-4 pt-3 border-t border-dashed" style={{ borderColor: dark ? '#374151' : '#e5e7eb' }}>
                                    <div className="space-y-1">
                                      <p className={`text-xs ${th.mut}`}>Security Deposit</p>
                                      <p className={`text-sm font-medium ${th.txt}`}>{fmt(anyLease.deposit.amount)}</p>
                                    </div>
                                    <div className="space-y-1">
                                      <p className={`text-xs ${th.mut}`}>Deposit Method</p>
                                      <p className={`text-sm font-medium ${th.txt}`}>{anyLease.deposit.method || '—'}</p>
                                    </div>
                                    <div className="space-y-1">
                                      <p className={`text-xs ${th.mut}`}>Deposit Received</p>
                                      <p className={`text-sm font-medium ${th.txt}`}>{anyLease.deposit.paidDate ? fmtDate(anyLease.deposit.paidDate) : '—'}</p>
                                    </div>
                                    <div className="space-y-1">
                                      <p className={`text-xs ${th.mut}`}>Deposit Status</p>
                                      <p className={`text-sm font-medium ${anyLease.deposit.returned ? 'text-amber-600' : 'text-emerald-600'}`}>{anyLease.deposit.returned ? 'Returned' : 'Held'}</p>
                                    </div>
                                  </div>
                                )}
                                
                                {/* Actions */}
                                <div className="flex gap-2 pt-2">
                                  <button onClick={(e) => { e.stopPropagation(); openTenantEditModal(t); }} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"><Edit2 className="w-4 h-4" />Edit Tenant</button>
                                  {p && <button onClick={(e) => { e.stopPropagation(); setView('properties'); setSelId(p.id); }} className={`px-4 py-2 rounded-lg border ${th.bdr} ${th.txt} text-sm font-medium ${th.hov} flex items-center gap-2`}><Building2 className="w-4 h-4" />View Property</button>}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Payments */}
          {view === 'payments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div><h1 className={`text-3xl font-semibold ${th.txt}`}>Payments</h1><p className={`${th.mut} mt-1`}>{allPayments.length} payment records</p></div>
                <button onClick={openAddPaymentModal} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4" />Record Payment</button>
              </div>
              
              {/* Clickable Stats */}
              <div className="grid grid-cols-4 gap-6">
                <div 
                  onClick={() => setPaymentStatusFilter(paymentStatusFilter === 'paid' ? 'all' : 'paid')}
                  className={`${th.card} rounded-xl border ${paymentStatusFilter === 'paid' ? 'border-emerald-500 ring-2 ring-emerald-500/20' : th.bdr} p-5 cursor-pointer transition hover:shadow-lg`}
                >
                  <p className={`text-xs font-medium uppercase tracking-wide ${th.mut}`}>Collected</p>
                  <p className={`text-2xl font-bold text-emerald-600 mt-1`}>{fmt(allPayments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amt, 0))}</p>
                  <p className={`text-xs ${th.mut} mt-1`}>{allPayments.filter(p => p.status === 'paid').length} payments</p>
                </div>
                <div 
                  onClick={() => setPaymentStatusFilter(paymentStatusFilter === 'due' ? 'all' : 'due')}
                  className={`${th.card} rounded-xl border ${paymentStatusFilter === 'due' ? 'border-amber-500 ring-2 ring-amber-500/20' : th.bdr} p-5 cursor-pointer transition hover:shadow-lg`}
                >
                  <p className={`text-xs font-medium uppercase tracking-wide ${th.mut}`}>Pending</p>
                  <p className={`text-2xl font-bold text-amber-600 mt-1`}>{fmt(allPayments.filter(p => p.status === 'due').reduce((s, p) => s + p.amt, 0))}</p>
                  <p className={`text-xs ${th.mut} mt-1`}>{allPayments.filter(p => p.status === 'due').length} payments</p>
                </div>
                <div 
                  onClick={() => setPaymentStatusFilter(paymentStatusFilter === 'overdue' ? 'all' : 'overdue')}
                  className={`${th.card} rounded-xl border ${paymentStatusFilter === 'overdue' ? 'border-red-500 ring-2 ring-red-500/20' : th.bdr} p-5 cursor-pointer transition hover:shadow-lg`}
                >
                  <p className={`text-xs font-medium uppercase tracking-wide ${th.mut}`}>Overdue</p>
                  <p className={`text-2xl font-bold text-red-600 mt-1`}>{fmt(allPayments.filter(p => p.status === 'overdue').reduce((s, p) => s + p.amt, 0))}</p>
                  <p className={`text-xs ${th.mut} mt-1`}>{allPayments.filter(p => p.status === 'overdue').length} payments</p>
                </div>
                <div 
                  onClick={() => setPaymentStatusFilter(paymentStatusFilter === 'late' ? 'all' : 'late')}
                  className={`${th.card} rounded-xl border ${paymentStatusFilter === 'late' ? 'border-violet-500 ring-2 ring-violet-500/20' : th.bdr} p-5 cursor-pointer transition hover:shadow-lg`}
                >
                  <p className={`text-xs font-medium uppercase tracking-wide ${th.mut}`}>Late Fees</p>
                  <p className={`text-2xl font-bold text-violet-600 mt-1`}>{fmt(allPayments.filter(p => p.lateFee).reduce((s, p) => s + (p.lateFee || 0), 0))}</p>
                  <p className={`text-xs ${th.mut} mt-1`}>{allPayments.filter(p => p.daysLate).length} late payments</p>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="relative flex-1 min-w-[200px] max-w-md">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${th.mut}`} />
                  <input 
                    type="text" 
                    placeholder="Search tenant or property..." 
                    value={paymentSearch}
                    onChange={e => setPaymentSearch(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className={`text-sm ${th.mut}`}>From</label>
                  <input 
                    type="date" 
                    value={paymentDateFrom} 
                    onChange={e => setPaymentDateFrom(e.target.value)}
                    className={`px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className={`text-sm ${th.mut}`}>To</label>
                  <input 
                    type="date" 
                    value={paymentDateTo} 
                    onChange={e => setPaymentDateTo(e.target.value)}
                    className={`px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                  />
                </div>
                {(paymentDateFrom || paymentDateTo || paymentStatusFilter !== 'all' || paymentSearch) && (
                  <button 
                    onClick={() => { setPaymentDateFrom(''); setPaymentDateTo(''); setPaymentStatusFilter('all'); setPaymentSearch(''); }}
                    className={`text-sm text-blue-600 hover:underline`}
                  >
                    Clear all filters
                  </button>
                )}
              </div>

              {/* Active Filter Badge */}
              {paymentStatusFilter !== 'all' && (
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${th.mut}`}>Showing:</span>
                  <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium ${
                    paymentStatusFilter === 'paid' ? 'bg-emerald-100 text-emerald-700' : 
                    paymentStatusFilter === 'due' ? 'bg-amber-100 text-amber-700' :
                    paymentStatusFilter === 'overdue' ? 'bg-red-100 text-red-700' :
                    'bg-violet-100 text-violet-700'
                  }`}>
                    {paymentStatusFilter === 'paid' ? 'Collected' : paymentStatusFilter === 'due' ? 'Pending' : paymentStatusFilter === 'overdue' ? 'Overdue' : 'Late Payments'}
                    <button onClick={() => setPaymentStatusFilter('all')} className="ml-1 hover:opacity-70">×</button>
                  </span>
                </div>
              )}

              <div className={`${th.card} rounded-xl border ${th.bdr} overflow-hidden`}>
                <table className="w-full">
                  <thead><tr className={`${th.card2} text-xs ${th.mut} uppercase`}>
                    <th 
                      className={`text-left px-5 py-3 cursor-pointer select-none ${th.hov}`}
                      onClick={() => setPaymentSort({ col: 'due', dir: paymentSort.col === 'due' && paymentSort.dir === 'desc' ? 'asc' : 'desc' })}
                    >
                      <span className="inline-flex items-center gap-1">
                        Due Date
                        {paymentSort.col === 'due' && <span className="text-blue-600">{paymentSort.dir === 'asc' ? '↑' : '↓'}</span>}
                      </span>
                    </th>
                    <th className="text-left px-5 py-3">Property</th>
                    <th className="text-left px-5 py-3">Tenant</th>
                    <th className="text-left px-5 py-3">Paid Date</th>
                    <th className="text-left px-5 py-3">Method</th>
                    <th 
                      className={`text-right px-5 py-3 cursor-pointer select-none ${th.hov}`}
                      onClick={() => setPaymentSort({ col: 'amt', dir: paymentSort.col === 'amt' && paymentSort.dir === 'desc' ? 'asc' : 'desc' })}
                    >
                      <span className="inline-flex items-center gap-1 justify-end">
                        Amount
                        {paymentSort.col === 'amt' && <span className="text-blue-600">{paymentSort.dir === 'asc' ? '↑' : '↓'}</span>}
                      </span>
                    </th>
                    <th className="text-center px-5 py-3">Status</th>
                    <th className="w-12"></th>
                  </tr></thead>
                  <tbody className={`divide-y ${th.bdr}`}>
                    {(() => {
                      const filtered = allPayments
                        .filter(pay => {
                          // Status filter
                          if (paymentStatusFilter === 'paid' && pay.status !== 'paid') return false;
                          if (paymentStatusFilter === 'due' && pay.status !== 'due') return false;
                          if (paymentStatusFilter === 'overdue' && pay.status !== 'overdue') return false;
                          if (paymentStatusFilter === 'late' && !pay.daysLate) return false;
                          // Date filter
                          if (paymentDateFrom && pay.due < paymentDateFrom) return false;
                          if (paymentDateTo && pay.due > paymentDateTo) return false;
                          // Search filter
                          if (paymentSearch) {
                            const lease = allLeases.find(l => l.id === pay.leaseId);
                            const tenant = lease ? allTenants.find(t => t.id === lease.tenantId) : null;
                            const prop = lease ? props.find(p => p.id === lease.propId) : null;
                            const searchLower = paymentSearch.toLowerCase();
                            const matchesTenant = tenant?.name.toLowerCase().includes(searchLower);
                            const matchesProperty = prop?.addr.toLowerCase().includes(searchLower) || prop?.city.toLowerCase().includes(searchLower);
                            if (!matchesTenant && !matchesProperty) return false;
                          }
                          return true;
                        })
                        .sort((a, b) => {
                          if (paymentSort.col === 'due') {
                            return paymentSort.dir === 'asc' 
                              ? new Date(a.due) - new Date(b.due)
                              : new Date(b.due) - new Date(a.due);
                          }
                          if (paymentSort.col === 'amt') {
                            return paymentSort.dir === 'asc' ? a.amt - b.amt : b.amt - a.amt;
                          }
                          return 0;
                        });
                      
                      if (filtered.length === 0) {
                        return (
                          <tr>
                            <td colSpan={8} className="px-5 py-12 text-center">
                              <DollarSign className={`w-12 h-12 mx-auto ${th.mut} opacity-50`} />
                              <p className={`${th.mut} mt-3`}>No payments match your filters</p>
                              <button onClick={() => { setPaymentDateFrom(''); setPaymentDateTo(''); setPaymentStatusFilter('all'); setPaymentSearch(''); }} className="mt-2 text-sm text-blue-600 hover:underline">Clear filters</button>
                            </td>
                          </tr>
                        );
                      }
                      
                      return filtered.map(pay => {
                        const lease = allLeases.find(l => l.id === pay.leaseId);
                        const t = lease ? allTenants.find(x => x.id === lease.tenantId) : null;
                        const p = lease ? props.find(x => x.id === lease.propId) : null;
                        const isExpanded = selectedPayment === pay.id;
                        return (
                          <React.Fragment key={pay.id}>
                          <tr className={`${th.hov} cursor-pointer ${pay.status === 'overdue' ? (dark ? 'bg-red-900/20' : 'bg-red-50') : ''}`} onClick={() => setSelectedPayment(isExpanded ? null : pay.id)}>
                            <td className={`px-5 py-3 text-sm ${th.txt}`}>{fmtDate(pay.due)}</td>
                            <td className="px-5 py-3">
                              <p className={`text-sm font-medium ${th.txt}`}>{p?.addr || '—'}</p>
                              <p className={`text-xs ${th.mut}`}>{p ? `${p.city}, ${p.state}` : ''}</p>
                            </td>
                            <td className={`px-5 py-3 text-sm ${th.txt}`}>{t?.name || '—'}</td>
                            <td className={`px-5 py-3 text-sm ${pay.paid ? th.txt : th.mut}`}>
                              {pay.paid ? fmtDate(pay.paid) : '—'}
                              {pay.daysLate && pay.status === 'paid' && <span className={`text-xs text-amber-600 ml-1`}>({pay.daysLate}d late)</span>}
                            </td>
                            <td className={`px-5 py-3 text-sm ${th.mut}`}>{pay.method || '—'}</td>
                            <td className={`px-5 py-3 text-right text-sm font-semibold ${th.txt}`}>{fmt(pay.amt)}</td>
                            <td className="px-5 py-3 text-center">
                              <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium ${
                                pay.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 
                                pay.status === 'due' ? 'bg-amber-100 text-amber-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {pay.status === 'paid' ? <CheckCircle className="w-3.5 h-3.5" /> : pay.status === 'due' ? <Clock className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                                {pay.status === 'paid' ? 'Paid' : pay.status === 'due' ? 'Due' : `${pay.daysLate}d Overdue`}
                              </span>
                            </td>
                            <td className="px-5 py-3">
                              <ChevronDown className={`w-4 h-4 ${th.mut} transition ${isExpanded ? 'rotate-180' : ''}`} />
                            </td>
                          </tr>
                          {isExpanded && (
                            <tr>
                              <td colSpan={8} className={`px-5 py-4 ${th.card2}`}>
                                <div className="space-y-3">
                                  <div className="flex gap-8 items-center flex-wrap">
                                    <div className="space-y-1">
                                      <p className={`text-xs ${th.mut}`}>Payment ID</p>
                                      <p className={`text-sm font-medium ${th.txt}`}>{pay.id}</p>
                                    </div>
                                    {p && (
                                      <div className="space-y-1">
                                        <p className={`text-xs ${th.mut}`}>Property ID</p>
                                        <p className={`text-sm font-medium ${th.txt}`}>{p.id}</p>
                                      </div>
                                    )}
                                    {lease && (
                                      <div className="space-y-1">
                                        <p className={`text-xs ${th.mut}`}>Lease ID</p>
                                        <p className={`text-sm font-medium ${th.txt}`}>{lease.id}</p>
                                      </div>
                                    )}
                                    {pay.lateFee && (
                                      <div className="space-y-1">
                                        <p className={`text-xs ${th.mut}`}>Late Fee</p>
                                        <p className={`text-sm font-medium text-red-600`}>{fmt(pay.lateFee)}</p>
                                      </div>
                                    )}
                                    {(pay.periodStart || pay.periodEnd) && (
                                      <div className="space-y-1">
                                        <p className={`text-xs ${th.mut}`}>Period Covered</p>
                                        <p className={`text-sm font-medium ${th.txt}`}>
                                          {pay.periodStart ? fmtDate(pay.periodStart) : '?'} - {pay.periodEnd ? fmtDate(pay.periodEnd) : '?'}
                                        </p>
                                      </div>
                                    )}
                                    {t && (
                                      <div className="space-y-1">
                                        <p className={`text-xs ${th.mut}`}>Contact</p>
                                        <p className={`text-sm ${th.txt}`}>{t.phone}</p>
                                      </div>
                                    )}
                                    <div className="ml-auto flex gap-2">
                                      {pay.status !== 'paid' && (
                                        <button 
                                          onClick={(e) => { 
                                            e.stopPropagation(); 
                                            const today = new Date().toISOString().split('T')[0];
                                            setAllPayments(allPayments.map(p => p.id === pay.id ? { ...p, status: 'paid', paid: today, method: 'Zelle' } : p));
                                          }} 
                                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium"
                                        >
                                          Mark as Paid
                                        </button>
                                      )}
                                      {p && <button onClick={(e) => { e.stopPropagation(); setView('properties'); setSelId(p.id); }} className={`px-4 py-2 rounded-lg border ${th.bdr} ${th.txt} text-sm font-medium ${th.hov}`}>View Property</button>}
                                    </div>
                                  </div>
                                  {pay.notes && (
                                    <div className={`p-3 rounded-lg ${dark ? 'bg-slate-800' : 'bg-gray-100'}`}>
                                      <p className={`text-xs ${th.mut} mb-1`}>Notes</p>
                                      <p className={`text-sm ${th.txt}`}>{pay.notes}</p>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                          </React.Fragment>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Expenses */}
          {view === 'expenses' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div><h1 className={`text-3xl font-semibold ${th.txt}`}>Expenses</h1><p className={`${th.mut} mt-1`}>{allExpenses.length} expenses across {props.length} properties</p></div>
                <button onClick={() => openExpenseModal()} className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4" />Add Expense</button>
              </div>
              
              {/* Summary Stats */}
              <div className="grid grid-cols-4 gap-6">
                <Stat label="Total Expenses" value={fmt(allExpenses.reduce((s, e) => s + e.amount, 0))} color="text-red-600" />
                <Stat label="This Year" value={fmt(allExpenses.filter(e => new Date(e.date).getFullYear() === new Date().getFullYear()).reduce((s, e) => s + e.amount, 0))} />
                <Stat label="Capital Improvements" value={fmt(allExpenses.filter(e => e.category === 'Capital Improvement').reduce((s, e) => s + e.amount, 0))} color="text-violet-600" />
                <Stat label="Repairs & Maintenance" value={fmt(allExpenses.filter(e => e.category === 'Repairs' || e.category === 'Maintenance').reduce((s, e) => s + e.amount, 0))} color="text-amber-600" />
              </div>

              {/* Date Filters */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className={`text-sm ${th.mut}`}>From</label>
                  <input 
                    type="date" 
                    value={expenseDateFrom} 
                    onChange={e => setExpenseDateFrom(e.target.value)}
                    className={`px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className={`text-sm ${th.mut}`}>To</label>
                  <input 
                    type="date" 
                    value={expenseDateTo} 
                    onChange={e => setExpenseDateTo(e.target.value)}
                    className={`px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                  />
                </div>
                {(expenseDateFrom || expenseDateTo) && (
                  <button 
                    onClick={() => { setExpenseDateFrom(''); setExpenseDateTo(''); }}
                    className={`text-sm text-blue-600 hover:underline`}
                  >
                    Clear dates
                  </button>
                )}
              </div>

              {/* Expenses Table */}
              <div className={`${th.card} rounded-xl border ${th.bdr} overflow-hidden`}>
                <table className="w-full">
                  <thead><tr className={`${th.card2} text-xs ${th.mut} uppercase`}>
                    <th 
                      className={`text-left px-5 py-3 cursor-pointer select-none ${th.hov}`}
                      onClick={() => setExpenseSort({ col: 'date', dir: expenseSort.col === 'date' && expenseSort.dir === 'desc' ? 'asc' : 'desc' })}
                    >
                      <span className="inline-flex items-center gap-1">
                        Date
                        {expenseSort.col === 'date' && <span className="text-blue-600">{expenseSort.dir === 'asc' ? '↑' : '↓'}</span>}
                      </span>
                    </th>
                    <th className="text-left px-5 py-3">Category</th>
                    <th className="text-left px-5 py-3">Property</th>
                    <th className="text-left px-5 py-3">Payee</th>
                    <th className="text-left px-5 py-3">Description</th>
                    <th className="text-left px-5 py-3">Method</th>
                    <th 
                      className={`text-right px-5 py-3 cursor-pointer select-none ${th.hov}`}
                      onClick={() => setExpenseSort({ col: 'amount', dir: expenseSort.col === 'amount' && expenseSort.dir === 'desc' ? 'asc' : 'desc' })}
                    >
                      <span className="inline-flex items-center gap-1 justify-end">
                        Amount
                        {expenseSort.col === 'amount' && <span className="text-blue-600">{expenseSort.dir === 'asc' ? '↑' : '↓'}</span>}
                      </span>
                    </th>
                    <th className="w-12"></th>
                  </tr></thead>
                  <tbody className={`divide-y ${th.bdr}`}>
                    {allExpenses
                      .filter(exp => {
                        if (expenseDateFrom && exp.date < expenseDateFrom) return false;
                        if (expenseDateTo && exp.date > expenseDateTo) return false;
                        return true;
                      })
                      .sort((a, b) => {
                        if (expenseSort.col === 'date') {
                          return expenseSort.dir === 'asc' 
                            ? new Date(a.date) - new Date(b.date)
                            : new Date(b.date) - new Date(a.date);
                        }
                        if (expenseSort.col === 'amount') {
                          return expenseSort.dir === 'asc' ? a.amount - b.amount : b.amount - a.amount;
                        }
                        return 0;
                      })
                      .map((exp) => {
                      const p = props.find(x => x.id === exp.propId);
                      const isExpanded = selectedExpense === exp.id;
                      return (
                        <React.Fragment key={exp.id}>
                        <tr className={`${th.hov} cursor-pointer`} onClick={() => setSelectedExpense(isExpanded ? null : exp.id)}>
                          <td className={`px-5 py-3 text-sm ${th.txt}`}>{fmtDate(exp.date)}</td>
                          <td className="px-5 py-3">
                            <span className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap ${
                              exp.category === 'Capital Improvement' ? 'bg-violet-100 text-violet-700' :
                              exp.category === 'Repairs' ? 'bg-red-100 text-red-700' :
                              exp.category === 'Maintenance' ? 'bg-amber-100 text-amber-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>{exp.category}</span>
                          </td>
                          <td className={`px-5 py-3 text-sm ${th.txt}`}>{p ? p.addr : <span className={th.mut}>Portfolio-wide</span>}</td>
                          <td className={`px-5 py-3 text-sm ${th.txt}`}>{exp.payee}</td>
                          <td className="px-5 py-3">
                            <p className={`text-sm ${th.txt}`}>{exp.description}</p>
                            {exp.notes && <p className={`text-xs ${th.mut} mt-0.5 italic`}>{exp.notes}</p>}
                          </td>
                          <td className={`px-5 py-3 text-sm ${th.mut}`}>
                            {exp.method}
                            {exp.checkNum && <span className="ml-1">#{exp.checkNum}</span>}
                          </td>
                          <td className={`px-5 py-3 text-sm font-semibold text-red-600 text-right`}>{fmt(exp.amount)}</td>
                          <td className="px-5 py-3">
                            <ChevronDown className={`w-4 h-4 ${th.mut} transition ${isExpanded ? 'rotate-180' : ''}`} />
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr>
                            <td colSpan={8} className={`px-5 py-4 ${th.card2}`}>
                              <div className="flex gap-8">
                                <div className="space-y-2">
                                  <p className={`text-xs ${th.mut}`}>Expense ID</p>
                                  <p className={`text-sm font-medium ${th.txt}`}>{exp.id}</p>
                                </div>
                                {p && (
                                  <div className="space-y-2">
                                    <p className={`text-xs ${th.mut}`}>Property ID</p>
                                    <p className={`text-sm font-medium ${th.txt}`}>{p.id}</p>
                                  </div>
                                )}
                                {exp.receipt && (
                                  <div className="space-y-2">
                                    <p className={`text-xs ${th.mut}`}>Receipt</p>
                                    <p className="text-sm text-blue-600">{exp.receipt}</p>
                                  </div>
                                )}
                                <div className="ml-auto">
                                  <button onClick={(e) => { e.stopPropagation(); openExpenseModal(exp.propId, exp); }} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"><Edit2 className="w-4 h-4" />Edit</button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          )}

          {/* Contractors */}
          {view === 'contractors' && !selectedContractor && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div><h1 className={`text-3xl font-semibold ${th.txt}`}>Contractors</h1><p className={`${th.mut} mt-1`}>{contractors.length} contractors</p></div>
                <button onClick={() => openContractorModal()} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4" />Add Contractor</button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-6">
                <Stat label="Total Contractors" value={contractors.length} color="text-blue-600" />
                <Stat label="Active" value={contractors.filter(c => c.active).length} color="text-emerald-600" />
                <Stat label="Categories" value={[...new Set(contractors.map(c => c.category))].length} color="text-violet-600" />
                <Stat label="5-Star Rated" value={contractors.filter(c => c.rating === 5).length} color="text-amber-600" />
              </div>

              {/* Search and Filter */}
              <div className="flex gap-4 items-start">
                <div className="relative w-80">
                  <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${th.mut}`} />
                  <input type="text" placeholder="Search contractors..." value={contractorSearch} onChange={e => setContractorSearch(e.target.value)} className={`w-full pl-12 pr-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
                <div className="relative">
                  <button onClick={() => setContractorFilterOpen(!contractorFilterOpen)} className={`px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm flex items-center gap-3 min-w-[200px]`}>
                    <span className="flex-1 text-left">{contractorCategoryFilter.length === 0 ? 'All Categories' : `${contractorCategoryFilter.length} selected`}</span>
                    <ChevronDown className={`w-4 h-4 ${th.mut} transition ${contractorFilterOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {contractorFilterOpen && (
                    <div className={`absolute top-full left-0 mt-1 w-56 ${th.card} rounded-lg border ${th.bdr} shadow-lg z-20 py-2`}>
                      {contractorCategories.filter(c => c !== 'All').map(cat => (
                        <label key={cat} className={`flex items-center gap-3 px-4 py-2 ${th.hov} cursor-pointer`}>
                          <input type="checkbox" checked={contractorCategoryFilter.includes(cat)} onChange={() => toggleContractorCategory(cat)} className="rounded" />
                          <span className={`text-sm ${th.txt}`}>{cat}</span>
                        </label>
                      ))}
                      {contractorCategoryFilter.length > 0 && (
                        <button onClick={() => setContractorCategoryFilter([])} className={`w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 border-t ${th.bdr} mt-2`}>Clear All</button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Contractors Grid */}
              <div className="grid grid-cols-2 gap-4">
                {contractors.filter(c => {
                  if (contractorCategoryFilter.length > 0 && !contractorCategoryFilter.includes(c.category)) return false;
                  if (contractorSearch) {
                    const q = contractorSearch.toLowerCase();
                    return c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
                  }
                  return true;
                }).map(c => {
                  const contractorExpenses = getContractorExpenses(c.id);
                  const totalPaid = contractorExpenses.reduce((s, e) => s + e.amount, 0);
                  return (
                  <div key={c.id} className={`${th.card} rounded-xl border ${th.bdr} p-5 cursor-pointer ${th.hov}`} onClick={() => setSelectedContractor(c.id)}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.active ? 'bg-blue-600' : 'bg-gray-400'}`}>
                          <Wrench className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className={`text-base font-medium ${th.txt}`}>{c.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${dark ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'}`}>{c.category}</span>
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < c.rating ? 'text-amber-400 fill-amber-400' : th.mut}`} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                        <button onClick={() => openContractorModal(c)} className={`p-2 rounded-lg ${th.hov}`}><Edit2 className={`w-4 h-4 ${th.mut}`} /></button>
                        <button onClick={() => deleteContractor(c.id)} className={`p-2 rounded-lg hover:bg-red-50`}><Trash2 className="w-4 h-4 text-red-500" /></button>
                      </div>
                    </div>
                    <div className={`mt-4 pt-4 border-t ${th.bdr} space-y-2`}>
                      <div className="flex items-center gap-2">
                        <Phone className={`w-4 h-4 ${th.mut}`} />
                        <span className={`text-sm ${th.txt}`}>{c.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className={`w-4 h-4 ${th.mut}`} />
                        <span className="text-sm text-blue-600">{c.email}</span>
                      </div>
                      {contractorExpenses.length > 0 && (
                        <div className={`flex items-center justify-between pt-2 mt-2 border-t ${th.bdr}`}>
                          <span className={`text-xs ${th.mut}`}>{contractorExpenses.length} expenses</span>
                          <span className={`text-sm font-medium ${th.txt}`}>{fmt(totalPaid)} paid</span>
                        </div>
                      )}
                    </div>
                  </div>
                );})}
              </div>
            </div>
          )}

          {/* Contractor Detail View */}
          {view === 'contractors' && selectedContractor && selectedContractorData && (
            <div className="space-y-6">
              <button onClick={() => setSelectedContractor(null)} className={`inline-flex items-center gap-2 text-sm ${th.mut} hover:${th.txt} transition`}>
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back to Contractors
              </button>

              {/* Header Card */}
              <div className={`${th.card} rounded-xl border ${th.bdr} p-6`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${selectedContractorData.c.active ? 'bg-blue-600' : 'bg-gray-400'}`}>
                      <Wrench className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h1 className={`text-2xl font-semibold ${th.txt}`}>{selectedContractorData.c.name}</h1>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${selectedContractorData.c.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>{selectedContractorData.c.active ? 'Active' : 'Inactive'}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`text-sm px-3 py-1 rounded-full ${dark ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'}`}>{selectedContractorData.c.category}</span>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < selectedContractorData.c.rating ? 'text-amber-400 fill-amber-400' : th.mut}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => openContractorModal(selectedContractorData.c)} className={`px-4 py-2.5 rounded-lg border ${th.bdr} ${th.txt} text-sm font-medium ${th.hov} flex items-center gap-2`}><Edit2 className="w-4 h-4" />Edit</button>
                </div>
                <div className={`grid grid-cols-4 gap-6 mt-6 pt-6 border-t ${th.bdr}`}>
                  <div>
                    <p className={`text-xs ${th.mut}`}>Phone</p>
                    <p className={`text-sm ${th.txt} mt-1`}>{selectedContractorData.c.phone}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${th.mut}`}>Email</p>
                    <p className="text-sm text-blue-600 mt-1">{selectedContractorData.c.email}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${th.mut}`}>Address</p>
                    <p className={`text-sm ${th.txt} mt-1`}>{selectedContractorData.c.address || '—'}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${th.mut}`}>Notes</p>
                    <p className={`text-sm ${th.txt} mt-1`}>{selectedContractorData.c.notes || '—'}</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-6">
                <Stat label="Total Paid" value={fmt(selectedContractorData.totalPaid)} color="text-red-600" />
                <Stat label="Expenses" value={selectedContractorData.contractorExpenses.length} color="text-blue-600" />
                <Stat label="Properties Serviced" value={[...new Set(selectedContractorData.contractorExpenses.map(e => e.propId).filter(Boolean))].length} color="text-violet-600" />
                <Stat label="Avg per Job" value={selectedContractorData.contractorExpenses.length > 0 ? fmt(selectedContractorData.totalPaid / selectedContractorData.contractorExpenses.length) : '$0'} color="text-amber-600" />
              </div>

              {/* Payment History */}
              <div className={`${th.card} rounded-xl border ${th.bdr} overflow-hidden`}>
                <div className={`px-5 py-4 border-b ${th.bdr}`}>
                  <h3 className={`text-lg font-medium ${th.txt}`}>Payment History</h3>
                </div>
                {selectedContractorData.contractorExpenses.length > 0 ? (
                  <table className="w-full">
                    <thead><tr className={`${th.card2} text-xs ${th.mut} uppercase`}>
                      <th className="text-left px-5 py-3">ID</th>
                      <th className="text-left px-5 py-3">Date</th>
                      <th className="text-left px-5 py-3">Property</th>
                      <th className="text-left px-5 py-3">Description</th>
                      <th className="text-left px-5 py-3">Method</th>
                      <th className="text-right px-5 py-3">Amount</th>
                      <th className="w-12"></th>
                    </tr></thead>
                    <tbody className={`divide-y ${th.bdr}`}>
                      {selectedContractorData.contractorExpenses.map(e => {
                        const property = props.find(p => p.id === e.propId);
                        return (
                          <tr key={e.id} className={th.hov}>
                            <td className={`px-5 py-3 text-xs font-mono ${th.mut}`}>#{e.id}</td>
                            <td className={`px-5 py-3 text-sm ${th.txt}`}>{fmtDate(e.date)}</td>
                            <td className={`px-5 py-3 text-sm ${th.txt}`}>{property ? property.addr : <span className={th.mut}>Portfolio-wide</span>}</td>
                            <td className="px-5 py-3">
                              <p className={`text-sm ${th.txt}`}>{e.description}</p>
                              <p className={`text-xs ${th.mut}`}>{e.category}</p>
                            </td>
                            <td className={`px-5 py-3 text-sm ${th.txt}`}>
                              {e.method}
                              {e.checkNum && <span className={`text-xs ${th.mut} ml-1`}>#{e.checkNum}</span>}
                            </td>
                            <td className={`px-5 py-3 text-sm font-medium text-right text-red-600`}>{fmt(e.amount)}</td>
                            <td className="px-5 py-3">
                              <button onClick={() => openExpenseModal(e.propId, e)} className={`p-1.5 rounded-lg ${th.hov}`}><Edit2 className={`w-4 h-4 ${th.mut}`} /></button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-12 text-center">
                    <Receipt className={`w-12 h-12 mx-auto ${th.mut} opacity-50`} />
                    <p className={`${th.mut} mt-3`}>No expenses recorded for this contractor</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Financing */}
          {view === 'financing' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div><h1 className={`text-3xl font-semibold ${th.txt}`}>Financing</h1><p className={`${th.mut} mt-1`}>{allLoans.length} loans · {props.length} properties</p></div>
                <button onClick={() => openLoanModal()} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4" />Add Loan</button>
              </div>
              
              {/* Summary Stats */}
              <div className="grid grid-cols-4 gap-6">
                <Stat label="Portfolio Value" value={fmt(props.reduce((s, p) => s + p.value, 0))} color="text-blue-600" />
                <Stat label="Total Debt" value={fmt(allLoans.reduce((s, l) => s + l.currBalance, 0))} color="text-red-600" />
                <Stat label="Total Equity" value={fmt(props.reduce((s, p) => s + p.value, 0) - allLoans.reduce((s, l) => s + l.currBalance, 0))} color="text-violet-600" />
                <Stat label="Monthly Cash Flow" value={fmt(leases.filter(l => l.status === 'active').reduce((s, l) => s + l.rent, 0) - allLoans.reduce((s, l) => s + l.pi + l.tax + l.ins + l.hoa, 0))} color={leases.filter(l => l.status === 'active').reduce((s, l) => s + l.rent, 0) - allLoans.reduce((s, l) => s + l.pi + l.tax + l.ins + l.hoa, 0) >= 0 ? 'text-emerald-600' : 'text-red-600'} />
              </div>

              {/* Monthly Breakdown */}
              <div className={`${th.card} rounded-xl border ${th.bdr} p-4`}>
                <div className="grid grid-cols-6 gap-4 text-center">
                  <div className={`py-2 px-3 rounded-lg ${dark ? 'bg-emerald-900/30' : 'bg-emerald-50'}`}>
                    <p className={`text-xs ${th.mut}`}>Rents</p>
                    <p className="text-sm font-semibold text-emerald-600 mt-0.5">{fmt(leases.filter(l => l.status === 'active').reduce((s, l) => s + l.rent, 0))}</p>
                  </div>
                  <div className={`py-2 px-3 rounded-lg ${th.card2}`}>
                    <p className={`text-xs ${th.mut}`}>P&I</p>
                    <p className={`text-sm font-medium ${th.txt} mt-0.5`}>{fmt(allLoans.reduce((s, l) => s + l.pi, 0))}</p>
                  </div>
                  <div className={`py-2 px-3 rounded-lg ${th.card2}`}>
                    <p className={`text-xs ${th.mut}`}>Taxes</p>
                    <p className={`text-sm font-medium ${th.txt} mt-0.5`}>{fmt(allLoans.reduce((s, l) => s + l.tax, 0))}</p>
                  </div>
                  <div className={`py-2 px-3 rounded-lg ${th.card2}`}>
                    <p className={`text-xs ${th.mut}`}>Insurance</p>
                    <p className={`text-sm font-medium ${th.txt} mt-0.5`}>{fmt(allLoans.reduce((s, l) => s + l.ins, 0))}</p>
                  </div>
                  <div className={`py-2 px-3 rounded-lg ${th.card2}`}>
                    <p className={`text-xs ${th.mut}`}>HOA</p>
                    <p className={`text-sm font-medium ${th.txt} mt-0.5`}>{fmt(allLoans.reduce((s, l) => s + l.hoa, 0))}</p>
                  </div>
                  <div className={`py-2 px-3 rounded-lg ${dark ? 'bg-amber-900/30' : 'bg-amber-50'}`}>
                    <p className={`text-xs ${th.mut}`}>Payments</p>
                    <p className="text-sm font-semibold text-amber-600 mt-0.5">{fmt(allLoans.reduce((s, l) => s + l.pi + l.tax + l.ins + l.hoa, 0))}</p>
                  </div>
                </div>
              </div>

              {/* Search and Sort */}
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${th.mut}`} />
                  <input type="text" placeholder="Search loans, lenders, properties..." value={loanSearch} onChange={e => setLoanSearch(e.target.value)} className={`w-full pl-12 pr-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
                <select value={loanSort} onChange={e => setLoanSort(e.target.value)} className={`px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm min-w-[180px]`}>
                  <option value="balance">Sort by Balance</option>
                  <option value="payment">Sort by Payment</option>
                  <option value="rate">Sort by Rate</option>
                  <option value="properties">Sort by # Properties</option>
                </select>
              </div>

              {/* Loans Table */}
              <div className={`${th.card} rounded-xl border ${th.bdr} overflow-hidden`}>
                <table className="w-full">
                  <thead><tr className={`${th.card2} text-xs ${th.mut} uppercase`}>
                    <th className="text-left px-5 py-3 w-8"></th>
                    <th className="text-left px-5 py-3">Loan</th>
                    <th className="text-left px-5 py-3">Lender</th>
                    <th className="text-center px-5 py-3">Properties</th>
                    <th className="text-right px-5 py-3">Rate</th>
                    <th className="text-right px-5 py-3">Balance</th>
                    <th className="text-right px-5 py-3">Payment</th>
                    <th className="text-right px-5 py-3">LTV</th>
                  </tr></thead>
                  <tbody className={`divide-y ${th.bdr}`}>
                    {filteredLoans.map(loan => {
                      const lender = lenders.find(le => le.id === loan.lenderId);
                      const loanProps = getPropsOnLoan(loan.id);
                      const totalValue = loanProps.reduce((s, p) => s + p.value, 0);
                      const ltv = Math.round(loan.currBalance / totalValue * 100);
                      const isExpanded = expandedLoan === loan.id;
                      const totalPayment = loan.pi + loan.tax + loan.ins + loan.hoa;
                      
                      return (
                        <React.Fragment key={loan.id}>
                          <tr className={`${th.hov} cursor-pointer ${isExpanded ? (dark ? 'bg-slate-800' : 'bg-blue-50') : ''}`} onClick={() => setExpandedLoan(isExpanded ? null : loan.id)}>
                            <td className="px-5 py-4">
                              <ChevronRight className={`w-4 h-4 ${th.mut} transition ${isExpanded ? 'rotate-90' : ''}`} />
                            </td>
                            <td className="px-5 py-4">
                              <p className={`text-sm font-medium ${th.txt}`}>{loan.name}</p>
                              <p className={`text-xs ${th.mut}`}>{loan.type} · #{loan.accountNum}</p>
                            </td>
                            <td className={`px-5 py-4 text-sm ${th.txt}`}>{lender?.name}</td>
                            <td className={`px-5 py-4 text-center text-sm ${th.txt}`}>{loanProps.length}</td>
                            <td className={`px-5 py-4 text-right text-sm ${th.txt}`}>{loan.rate}%</td>
                            <td className={`px-5 py-4 text-right text-sm font-semibold ${th.txt}`}>{fmt(loan.currBalance)}</td>
                            <td className={`px-5 py-4 text-right text-sm ${th.txt}`}>{fmt(totalPayment)}</td>
                            <td className={`px-5 py-4 text-right text-sm font-medium ${ltv > 80 ? 'text-amber-600' : ltv > 60 ? th.txt : 'text-emerald-600'}`}>{ltv}%</td>
                          </tr>
                          
                          {/* Expanded Details */}
                          {isExpanded && (
                            <tr>
                              <td colSpan={8} className={`p-6 ${dark ? 'bg-slate-900' : 'bg-white'} border-t ${th.bdr}`}>
                                <div className="grid grid-cols-3 gap-6">
                                  
                                  {/* Left Column - Key Dates & Terms */}
                                  <div className="space-y-4">
                                    <div className={`rounded-xl p-4 ${dark ? 'bg-slate-800' : 'bg-gray-50'}`}>
                                      <h4 className={`text-xs font-semibold ${th.mut} uppercase tracking-wide mb-3`}>Key Dates</h4>
                                      <div className="space-y-3">
                                        <div className="flex justify-between">
                                          <span className={`text-sm ${th.mut}`}>Originated</span>
                                          <span className={`text-sm font-medium ${th.txt}`}>{fmtDate(loan.origDate)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className={`text-sm ${th.mut}`}>First Payment</span>
                                          <span className={`text-sm font-medium ${th.txt}`}>{fmtDate(loan.firstPaymentDate)}</span>
                                        </div>
                                        <div className={`flex justify-between pt-2 border-t ${th.bdr}`}>
                                          <span className={`text-sm ${th.mut}`}>Maturity</span>
                                          <span className={`text-sm font-semibold ${Math.ceil((new Date(loan.maturityDate) - new Date()) / 86400000) < 365 * 2 ? 'text-amber-600' : 'text-emerald-600'}`}>
                                            {fmtDate(loan.maturityDate)}
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className={`rounded-xl p-4 ${dark ? 'bg-slate-800' : 'bg-gray-50'}`}>
                                      <h4 className={`text-xs font-semibold ${th.mut} uppercase tracking-wide mb-3`}>Loan Terms</h4>
                                      <div className="space-y-3">
                                        <div className="flex justify-between">
                                          <span className={`text-sm ${th.mut}`}>Term</span>
                                          <span className={`text-sm font-medium ${th.txt}`}>{loan.term} years</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className={`text-sm ${th.mut}`}>Amortization</span>
                                          <span className={`text-sm font-medium ${th.txt}`}>{loan.amortization} years</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className={`text-sm ${th.mut}`}>Escrow Tax</span>
                                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${loan.escrowTax ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {loan.escrowTax ? 'Yes' : 'No'}
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className={`text-sm ${th.mut}`}>Escrow Insurance</span>
                                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${loan.escrowIns ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {loan.escrowIns ? 'Yes' : 'No'}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Middle Column - Financials */}
                                  <div className="space-y-4">
                                    <div className={`rounded-xl p-4 ${dark ? 'bg-slate-800' : 'bg-gray-50'}`}>
                                      <h4 className={`text-xs font-semibold ${th.mut} uppercase tracking-wide mb-3`}>Balance</h4>
                                      <div className="space-y-3">
                                        <div className="flex justify-between">
                                          <span className={`text-sm ${th.mut}`}>Original</span>
                                          <span className={`text-sm font-medium ${th.txt}`}>{fmt(loan.origAmount)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className={`text-sm ${th.mut}`}>Current</span>
                                          <span className={`text-sm font-medium ${th.txt}`}>{fmt(loan.currBalance)}</span>
                                        </div>
                                        <div className={`flex justify-between pt-2 border-t ${th.bdr}`}>
                                          <span className={`text-sm ${th.mut}`}>Paid Down</span>
                                          <span className="text-sm font-semibold text-emerald-600">{fmt(loan.origAmount - loan.currBalance)}</span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className={`rounded-xl p-4 ${dark ? 'bg-slate-800' : 'bg-gray-50'}`}>
                                      <h4 className={`text-xs font-semibold ${th.mut} uppercase tracking-wide mb-3`}>Equity Position</h4>
                                      <div className="space-y-3">
                                        <div className="flex justify-between">
                                          <span className={`text-sm ${th.mut}`}>Property Value</span>
                                          <span className={`text-sm font-medium ${th.txt}`}>{fmt(totalValue)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className={`text-sm ${th.mut}`}>Loan Balance</span>
                                          <span className={`text-sm font-medium ${th.txt}`}>({fmt(loan.currBalance)})</span>
                                        </div>
                                        <div className={`flex justify-between pt-2 border-t ${th.bdr}`}>
                                          <span className={`text-sm ${th.mut}`}>Total Equity</span>
                                          <span className="text-sm font-semibold text-violet-600">{fmt(totalValue - loan.currBalance)}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Right Column - Contacts */}
                                  <div className="space-y-4">
                                    <div className={`rounded-xl p-4 ${dark ? 'bg-slate-800' : 'bg-gray-50'}`}>
                                      <div className="flex items-center justify-between mb-3">
                                        <h4 className={`text-xs font-semibold ${th.mut} uppercase tracking-wide`}>Original Lender</h4>
                                      </div>
                                      <p className={`text-sm font-medium ${th.txt}`}>{lender?.name}</p>
                                      <p className={`text-sm ${th.txt} mt-2`}>{loan.loanOfficer}</p>
                                      <p className={`text-xs ${th.mut} mt-1`}>{loan.loanOfficerPhone}</p>
                                      <p className="text-xs text-blue-600 mt-0.5">{loan.loanOfficerEmail}</p>
                                    </div>

                                    {loan.servicer ? (
                                      <div className={`rounded-xl p-4 border-2 border-amber-200 ${dark ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
                                        <div className="flex items-center justify-between mb-3">
                                          <h4 className={`text-xs font-semibold uppercase tracking-wide ${dark ? 'text-amber-400' : 'text-amber-700'}`}>Servicer (Pay Here)</h4>
                                        </div>
                                        <p className={`text-sm font-semibold ${th.txt}`}>{loan.servicer.name}</p>
                                        <p className={`text-xs ${th.mut} mt-1`}>Acct: {loan.servicer.accountNum}</p>
                                        <div className="mt-3 space-y-1">
                                          <p className={`text-xs ${th.mut}`}>{loan.servicer.phone}</p>
                                          <p className="text-xs text-blue-600">{loan.servicer.email}</p>
                                          <p className="text-xs text-blue-600">{loan.servicer.website}</p>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className={`rounded-xl p-4 border-2 border-emerald-200 ${dark ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
                                        <div className="flex items-center gap-2">
                                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                                          <span className={`text-sm font-medium ${dark ? 'text-emerald-400' : 'text-emerald-700'}`}>Serviced by Original Lender</span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Properties Row */}
                                <div className="mt-6">
                                  <h4 className={`text-xs font-semibold ${th.mut} uppercase tracking-wide mb-3`}>Properties on this Loan ({loanProps.length})</h4>
                                  <div className="grid grid-cols-3 gap-3">
                                    {loanProps.map(lp => (
                                      <div key={lp.id} className={`flex items-center justify-between p-3 rounded-xl ${dark ? 'bg-slate-800' : 'bg-gray-50'}`}>
                                        <div className="flex items-center gap-3">
                                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${lp.status === 'leased' ? 'bg-emerald-100' : 'bg-amber-100'}`}>
                                            <Building className={`w-4 h-4 ${lp.status === 'leased' ? 'text-emerald-600' : 'text-amber-600'}`} />
                                          </div>
                                          <div>
                                            <p className={`text-sm font-medium ${th.txt}`}>{lp.addr}</p>
                                            <p className={`text-xs ${th.mut}`}>{lp.city}, {lp.state}</p>
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <p className={`text-sm font-semibold ${th.txt}`}>{fmt(lp.value)}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                
                                {/* Notes */}
                                {loan.notes && (
                                  <div className={`mt-4 p-4 rounded-xl ${dark ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
                                    <p className={`text-sm ${dark ? 'text-blue-300' : 'text-blue-800'}`}>
                                      <span className="font-semibold">Note:</span> {loan.notes}
                                    </p>
                                  </div>
                                )}

                                {/* Actions */}
                                <div className="mt-4 flex justify-end gap-3">
                                  <button onClick={(e) => { e.stopPropagation(); openBalanceModal(loan.id); }} className={`px-4 py-2 border ${th.bdr} ${th.txt} text-sm font-medium rounded-lg ${th.hov}`}>Update Balance</button>
                                  <button onClick={(e) => { e.stopPropagation(); openLoanEditModal(loan); }} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg">Edit Loan</button>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Lenders Summary */}
              <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                <h3 className={`text-sm font-medium ${th.txt} mb-4`}>Lenders Overview</h3>
                <div className="grid grid-cols-3 gap-4">
                  {lenders.map(lender => {
                    const lenderLoans = allLoans.filter(l => l.lenderId === lender.id);
                    if (lenderLoans.length === 0) return null;
                    const totalBalance = lenderLoans.reduce((s, l) => s + l.currBalance, 0);
                    const propCount = lenderLoans.reduce((s, l) => s + getPropsOnLoan(l.id).length, 0);
                    
                    return (
                      <div key={lender.id} className={`p-4 rounded-lg ${th.card2}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <Landmark className="w-5 h-5 text-blue-600" />
                          <p className={`text-sm font-medium ${th.txt}`}>{lender.name}</p>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className={th.mut}>{lenderLoans.length} loan{lenderLoans.length > 1 ? 's' : ''} · {propCount} properties</span>
                          <span className={`font-medium ${th.txt}`}>{fmt(totalBalance)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Insurance */}
          {view === 'insurance' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className={`text-3xl font-semibold ${th.txt}`}>Insurance</h1>
                <button onClick={() => openPolicyModal()} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4" />Add Policy</button>
              </div>
              <div className="grid grid-cols-4 gap-6">
                <Stat label="Landlord Policies" value={props.length} color="text-blue-600" />
                <Stat label="Annual Premiums" value={fmt(allLoans.reduce((s, l) => s + l.ins * 12, 0))} color="text-violet-600" />
                <Stat label="Expiring Soon" value="0" color="text-emerald-600" />
                <Stat label="Missing Renter Ins" value={tenants.filter(t => !t.ri).length} color={tenants.filter(t => !t.ri).length > 0 ? 'text-red-600' : 'text-emerald-600'} />
              </div>
              <div className={`${th.card} rounded-xl border ${th.bdr} p-5`}>
                <h3 className={`text-sm font-medium ${th.txt} mb-4`}>Tenant Renters Insurance</h3>
                <div className="space-y-3">
                  {tenants.map(t => {
                    const activeLease = leases.find(l => l.tenantId === t.id && l.status === 'active');
                    const p = activeLease ? props.find(pr => pr.id === activeLease.propId) : null;
                    return (
                    <div key={t.id} className={`flex items-center justify-between p-4 rounded-xl ${t.ri ? 'bg-emerald-50' : 'bg-red-50'}`}>
                      <div className="flex items-center gap-4">
                        {t.ri ? <ShieldCheck className="w-6 h-6 text-emerald-600" /> : <ShieldOff className="w-6 h-6 text-red-500" />}
                        <div><p className={`text-sm font-medium ${th.txt}`}>{t.name}</p><p className={`text-sm ${th.mut}`}>{p?.addr || 'No active lease'}</p></div>
                      </div>
                      {t.ri ? <span className="text-sm text-emerald-600 font-medium">Verified</span> : <span className="text-sm text-red-600 font-medium">Missing</span>}
                    </div>
                  );})}
                </div>
              </div>
            </div>
          )}

          {/* Settings View */}
          {view === 'settings' && (
            <div className="space-y-6">
              <div>
                <h1 className={`text-3xl font-semibold ${th.txt}`}>Settings</h1>
                <p className={`${th.mut} mt-1`}>Manage your application preferences</p>
              </div>

              {/* Payment Methods */}
              <div className={`${th.card} rounded-xl border ${th.bdr} p-6`}>
                <h3 className={`text-lg font-semibold ${th.txt} mb-4`}>Payment Methods</h3>
                <p className={`text-sm ${th.mut} mb-4`}>Configure the payment methods available when recording payments.</p>
                <div className="flex gap-3 mb-4">
                  <input 
                    type="text" 
                    value={newPaymentMethod} 
                    onChange={e => setNewPaymentMethod(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && newPaymentMethod.trim() && !paymentMethods.includes(newPaymentMethod.trim())) {
                        setPaymentMethods([...paymentMethods, newPaymentMethod.trim()]);
                        setNewPaymentMethod('');
                      }
                    }}
                    placeholder="Add new payment method..."
                    className={`flex-1 px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                  />
                  <button 
                    onClick={() => {
                      if (newPaymentMethod.trim() && !paymentMethods.includes(newPaymentMethod.trim())) {
                        setPaymentMethods([...paymentMethods, newPaymentMethod.trim()]);
                        setNewPaymentMethod('');
                      }
                    }}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {paymentMethods.map((method, idx) => (
                    <div key={idx} className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${th.card2} border ${th.bdr}`}>
                      <CreditCard className={`w-4 h-4 ${th.mut}`} />
                      <span className={`text-sm ${th.txt}`}>{method}</span>
                      <button 
                        onClick={() => {
                          if (confirm(`Delete "${method}" payment method?`)) {
                            setPaymentMethods(paymentMethods.filter(m => m !== method));
                          }
                        }}
                        className={`p-1 rounded-full hover:bg-red-100`}
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expense Categories */}
              <div className={`${th.card} rounded-xl border ${th.bdr} p-6`}>
                <h3 className={`text-lg font-semibold ${th.txt} mb-4`}>Expense Categories</h3>
                <p className={`text-sm ${th.mut} mb-4`}>Manage categories for tracking property expenses.</p>
                <div className="flex gap-3 mb-4">
                  <input 
                    type="text" 
                    value={newCategory} 
                    onChange={e => setNewCategory(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && newCategory.trim() && !expenseCategories.includes(newCategory.trim())) {
                        setExpenseCategories([...expenseCategories, newCategory.trim()]);
                        setNewCategory('');
                      }
                    }}
                    placeholder="Add new category..."
                    className={`flex-1 px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                  />
                  <button 
                    onClick={() => {
                      if (newCategory.trim() && !expenseCategories.includes(newCategory.trim())) {
                        setExpenseCategories([...expenseCategories, newCategory.trim()]);
                        setNewCategory('');
                      }
                    }}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                  >
                    Add
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {expenseCategories.map((cat, idx) => (
                    <div key={idx} className={`flex items-center justify-between px-4 py-3 rounded-lg ${th.card2} border ${th.bdr}`}>
                      <span className={`text-sm ${th.txt}`}>{cat}</span>
                      <button 
                        onClick={() => {
                          if (confirm(`Delete "${cat}" category?`)) {
                            setExpenseCategories(expenseCategories.filter(c => c !== cat));
                          }
                        }}
                        className={`p-1.5 rounded hover:bg-red-100`}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contractor Categories */}
              <div className={`${th.card} rounded-xl border ${th.bdr} p-6`}>
                <h3 className={`text-lg font-semibold ${th.txt} mb-4`}>Contractor Categories</h3>
                <p className={`text-sm ${th.mut} mb-2`}>Categories used for organizing contractors:</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {contractorCategories.filter(c => c !== 'All').map((cat, idx) => (
                    <span key={idx} className={`px-3 py-1.5 rounded-lg ${th.card2} border ${th.bdr} text-sm ${th.txt}`}>{cat}</span>
                  ))}
                </div>
                <p className={`text-xs ${th.mut} italic mt-4`}>Contact support to modify contractor categories.</p>
              </div>

              {/* Appearance */}
              <div className={`${th.card} rounded-xl border ${th.bdr} p-6`}>
                <h3 className={`text-lg font-semibold ${th.txt} mb-4`}>Appearance</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${th.txt}`}>Dark Mode</p>
                    <p className={`text-xs ${th.mut}`}>Switch between light and dark themes</p>
                  </div>
                  <button 
                    onClick={() => setDark(!dark)} 
                    className={`px-4 py-2 rounded-lg border ${th.bdr} ${th.txt} text-sm font-medium ${th.hov} flex items-center gap-2`}
                  >
                    {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    {dark ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Payment Modal */}
      {showPaymentModal && prop && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPaymentModal(false)}>
          <div className={`${th.card} rounded-xl w-full max-w-md shadow-2xl flex flex-col max-h-[85vh]`} onClick={e => e.stopPropagation()}>
            <div className={`px-6 py-4 border-b ${th.bdr} flex justify-between items-center flex-shrink-0`}>
              <h3 className={`text-lg font-semibold ${th.txt}`}>Record Payment</h3>
              <button onClick={() => setShowPaymentModal(false)} className={`p-1.5 rounded-lg ${th.hov}`}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Tenant</label>
                <select 
                  value={paymentForm.leaseId} 
                  onChange={e => {
                    const lease = leases.find(l => l.id === parseInt(e.target.value));
                    setPaymentForm({ ...paymentForm, leaseId: e.target.value, amt: lease?.rent || '' });
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                >
                  <option value="">Select tenant...</option>
                  {getActiveLeases(prop.id).map(lease => {
                    const tenant = getTenantById(lease.tenantId);
                    const outstanding = getOutstandingBalance(lease.id);
                    return <option key={lease.id} value={lease.id}>{tenant?.name}{lease.unit ? ` (Unit ${lease.unit})` : ''} - {fmt(lease.rent)}/mo {outstanding.count > 0 ? `⚠️ ${outstanding.count} overdue` : ''}</option>;
                  })}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Amount</label>
                  <input 
                    type="number" 
                    value={paymentForm.amt} 
                    onChange={e => setPaymentForm({ ...paymentForm, amt: e.target.value })}
                    placeholder="0.00"
                    step="0.01"
                    className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Late Fee</label>
                  <input 
                    type="number" 
                    value={paymentForm.lateFee} 
                    onChange={e => setPaymentForm({ ...paymentForm, lateFee: e.target.value })}
                    placeholder="0.00"
                    className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Payment Method</label>
                  <select 
                    value={paymentForm.method} 
                    onChange={e => setPaymentForm({ ...paymentForm, method: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                  >
                    {paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Date Received</label>
                  <input 
                    type="date" 
                    value={paymentForm.date} 
                    onChange={e => setPaymentForm({ ...paymentForm, date: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                  />
                </div>
              </div>
              
              {/* Period Coverage */}
              <div className={`border-t ${th.bdr} pt-4`}>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Period Covered <span className={`font-normal ${th.mut}`}>(for partial/back payments)</span></label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs ${th.mut} mb-1`}>From</label>
                    <input 
                      type="date" 
                      value={paymentForm.periodStart} 
                      onChange={e => setPaymentForm({ ...paymentForm, periodStart: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs ${th.mut} mb-1`}>To</label>
                    <input 
                      type="date" 
                      value={paymentForm.periodEnd} 
                      onChange={e => setPaymentForm({ ...paymentForm, periodEnd: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                    />
                  </div>
                </div>
              </div>
              
              {/* Notes */}
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Notes</label>
                <textarea 
                  value={paymentForm.notes} 
                  onChange={e => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                  placeholder="e.g., Partial payment for Nov-Dec..."
                  rows={2}
                  className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm resize-none`}
                />
              </div>
            </div>
            <div className={`px-6 py-4 border-t ${th.bdr} flex justify-end gap-3 flex-shrink-0`}>
              <button onClick={() => setShowPaymentModal(false)} className={`px-5 py-2.5 rounded-lg border ${th.bdr} ${th.txt} text-sm font-medium ${th.hov}`}>Cancel</button>
              <button onClick={recordPayment} className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium">Record Payment</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Property Modal */}
      {showPropertyModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPropertyModal(false)}>
          <div className={`${th.card} rounded-xl w-full max-w-lg shadow-2xl flex flex-col max-h-[85vh]`} onClick={e => e.stopPropagation()}>
            <div className={`px-6 py-4 border-b ${th.bdr} flex justify-between items-center flex-shrink-0`}>
              <h3 className={`text-lg font-semibold ${th.txt}`}>Add Property</h3>
              <button onClick={() => setShowPropertyModal(false)} className={`p-1.5 rounded-lg ${th.hov}`}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Street Address *</label>
                <input type="text" value={propertyForm.addr} onChange={e => setPropertyForm({ ...propertyForm, addr: e.target.value })} placeholder="123 Main Street" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>City *</label>
                  <input type="text" value={propertyForm.city} onChange={e => setPropertyForm({ ...propertyForm, city: e.target.value })} placeholder="Dallas" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>State</label>
                  <input type="text" value={propertyForm.state} onChange={e => setPropertyForm({ ...propertyForm, state: e.target.value })} placeholder="TX" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>ZIP</label>
                  <input type="text" value={propertyForm.zip} onChange={e => setPropertyForm({ ...propertyForm, zip: e.target.value })} placeholder="75201" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Beds</label>
                  <input type="number" value={propertyForm.beds} onChange={e => setPropertyForm({ ...propertyForm, beds: e.target.value })} placeholder="3" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Baths</label>
                  <input type="number" step="0.5" value={propertyForm.baths} onChange={e => setPropertyForm({ ...propertyForm, baths: e.target.value })} placeholder="2" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Sq Ft</label>
                  <input type="number" value={propertyForm.sqft} onChange={e => setPropertyForm({ ...propertyForm, sqft: e.target.value })} placeholder="1800" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Year Built</label>
                  <input type="number" value={propertyForm.year} onChange={e => setPropertyForm({ ...propertyForm, year: e.target.value })} placeholder="2000" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Purchase Price</label>
                  <input type="number" value={propertyForm.purchPrice} onChange={e => setPropertyForm({ ...propertyForm, purchPrice: e.target.value })} placeholder="250000" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Current Value</label>
                  <input type="number" value={propertyForm.value} onChange={e => setPropertyForm({ ...propertyForm, value: e.target.value })} placeholder="300000" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Status</label>
                <select value={propertyForm.status} onChange={e => setPropertyForm({ ...propertyForm, status: e.target.value })} className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}>
                  <option value="vacant">Vacant</option>
                  <option value="leased">Leased</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Property Photos</label>
                {propertyForm.images && propertyForm.images.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex gap-2 flex-wrap">
                      {propertyForm.images.map((img, i) => (
                        <div key={i} className="relative group">
                          <img src={img} alt={`Property ${i + 1}`} className="w-24 h-16 object-cover rounded-lg" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition rounded-lg flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                            {i > 0 && (
                              <button type="button" onClick={() => reorderPropertyFormImages(i, i - 1)} className="p-1 text-white hover:scale-110">
                                <ChevronLeft className="w-3 h-3" />
                              </button>
                            )}
                            <button type="button" onClick={() => removePropertyFormImage(i)} className="p-1 text-red-400 hover:text-red-300">
                              <X className="w-3 h-3" />
                            </button>
                            {i < propertyForm.images.length - 1 && (
                              <button type="button" onClick={() => reorderPropertyFormImages(i, i + 1)} className="p-1 text-white hover:scale-110">
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                          {i === 0 && <span className="absolute -top-1 -left-1 bg-blue-500 text-white text-xs px-1 rounded">Main</span>}
                        </div>
                      ))}
                      <label className={`w-24 h-16 border-2 border-dashed ${th.bdr} rounded-lg flex items-center justify-center cursor-pointer ${th.hov}`}>
                        <Plus className={`w-5 h-5 ${th.mut}`} />
                        <input type="file" accept="image/*" multiple onChange={handlePropertyImageUpload} className="hidden" />
                      </label>
                    </div>
                    <p className={`text-xs ${th.mut}`}>First image will be the main photo. Drag arrows to reorder.</p>
                  </div>
                ) : (
                  <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed ${th.bdr} rounded-lg cursor-pointer ${th.hov}`}>
                    <Upload className={`w-8 h-8 ${th.mut} mb-2`} />
                    <span className={`text-sm ${th.mut}`}>Click to upload photos</span>
                    <span className={`text-xs ${th.mut}`}>Multiple images allowed</span>
                    <input type="file" accept="image/*" multiple onChange={handlePropertyImageUpload} className="hidden" />
                  </label>
                )}
              </div>
            </div>
            <div className={`px-6 py-4 border-t ${th.bdr} flex justify-end gap-3 flex-shrink-0`}>
              <button onClick={() => setShowPropertyModal(false)} className={`px-5 py-2.5 rounded-lg border ${th.bdr} ${th.txt} text-sm font-medium ${th.hov}`}>Cancel</button>
              <button onClick={saveProperty} className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">Add Property</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Loan Modal */}
      {showLoanModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowLoanModal(false)}>
          <div className={`${th.card} rounded-xl w-full max-w-lg shadow-2xl flex flex-col max-h-[85vh]`} onClick={e => e.stopPropagation()}>
            <div className={`px-6 py-4 border-b ${th.bdr} flex justify-between items-center flex-shrink-0`}>
              <h3 className={`text-lg font-semibold ${th.txt}`}>Add Loan</h3>
              <button onClick={() => setShowLoanModal(false)} className={`p-1.5 rounded-lg ${th.hov}`}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Property</label>
                <select value={loanForm.propId} onChange={e => setLoanForm({ ...loanForm, propId: e.target.value })} className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}>
                  <option value="">Select property (optional)...</option>
                  {props.map(p => <option key={p.id} value={p.id}>{p.addr} - {p.city}, {p.state}</option>)}
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Loan Name</label>
                <input type="text" value={loanForm.name} onChange={e => setLoanForm({ ...loanForm, name: e.target.value })} placeholder="Oak Street Loan" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
              </div>
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Lender</label>
                <select value={loanForm.lenderId} onChange={e => setLoanForm({ ...loanForm, lenderId: e.target.value })} className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}>
                  <option value="">Select lender...</option>
                  {lenders.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Loan Type</label>
                  <select value={loanForm.type} onChange={e => setLoanForm({ ...loanForm, type: e.target.value })} className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}>
                    <option value="Conventional">Conventional</option>
                    <option value="FHA">FHA</option>
                    <option value="VA">VA</option>
                    <option value="USDA">USDA</option>
                    <option value="Commercial">Commercial</option>
                    <option value="HELOC">HELOC</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Origination Date</label>
                  <input type="date" value={loanForm.origDate} onChange={e => setLoanForm({ ...loanForm, origDate: e.target.value })} className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Original Amount *</label>
                  <input type="number" value={loanForm.origAmount} onChange={e => setLoanForm({ ...loanForm, origAmount: e.target.value })} placeholder="200000" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Interest Rate *</label>
                  <input type="number" step="0.125" value={loanForm.rate} onChange={e => setLoanForm({ ...loanForm, rate: e.target.value })} placeholder="6.5" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Term (years)</label>
                  <select value={loanForm.term} onChange={e => setLoanForm({ ...loanForm, term: e.target.value })} className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}>
                    <option value="15">15 years</option>
                    <option value="20">20 years</option>
                    <option value="30">30 years</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>P&I Payment</label>
                  <input type="number" value={loanForm.pi} onChange={e => setLoanForm({ ...loanForm, pi: e.target.value })} placeholder="1264" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
              </div>
            </div>
            <div className={`px-6 py-4 border-t ${th.bdr} flex justify-end gap-3 flex-shrink-0`}>
              <button onClick={() => setShowLoanModal(false)} className={`px-5 py-2.5 rounded-lg border ${th.bdr} ${th.txt} text-sm font-medium ${th.hov}`}>Cancel</button>
              <button onClick={saveLoan} className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">Add Loan</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Policy Modal */}
      {showPolicyModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPolicyModal(false)}>
          <div className={`${th.card} rounded-xl w-full max-w-lg shadow-2xl flex flex-col max-h-[85vh]`} onClick={e => e.stopPropagation()}>
            <div className={`px-6 py-4 border-b ${th.bdr} flex justify-between items-center flex-shrink-0`}>
              <h3 className={`text-lg font-semibold ${th.txt}`}>Add Insurance Policy</h3>
              <button onClick={() => setShowPolicyModal(false)} className={`p-1.5 rounded-lg ${th.hov}`}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Property *</label>
                <select value={policyForm.propId} onChange={e => setPolicyForm({ ...policyForm, propId: e.target.value })} className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}>
                  <option value="">Select property...</option>
                  {props.map(p => <option key={p.id} value={p.id}>{p.addr} - {p.city}, {p.state}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Policy Type</label>
                  <select value={policyForm.type} onChange={e => setPolicyForm({ ...policyForm, type: e.target.value })} className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}>
                    <option value="Homeowners">Homeowners</option>
                    <option value="Landlord">Landlord</option>
                    <option value="Flood">Flood</option>
                    <option value="Umbrella">Umbrella</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Provider *</label>
                  <input type="text" value={policyForm.provider} onChange={e => setPolicyForm({ ...policyForm, provider: e.target.value })} placeholder="State Farm" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Policy Number</label>
                <input type="text" value={policyForm.policyNum} onChange={e => setPolicyForm({ ...policyForm, policyNum: e.target.value })} placeholder="POL-123456" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Annual Premium</label>
                  <input type="number" value={policyForm.premium} onChange={e => setPolicyForm({ ...policyForm, premium: e.target.value })} placeholder="1800" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Deductible</label>
                  <input type="number" value={policyForm.deductible} onChange={e => setPolicyForm({ ...policyForm, deductible: e.target.value })} placeholder="1000" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Start Date</label>
                  <input type="date" value={policyForm.start} onChange={e => setPolicyForm({ ...policyForm, start: e.target.value })} className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>End Date</label>
                  <input type="date" value={policyForm.end} onChange={e => setPolicyForm({ ...policyForm, end: e.target.value })} className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
              </div>
            </div>
            <div className={`px-6 py-4 border-t ${th.bdr} flex justify-end gap-3 flex-shrink-0`}>
              <button onClick={() => setShowPolicyModal(false)} className={`px-5 py-2.5 rounded-lg border ${th.bdr} ${th.txt} text-sm font-medium ${th.hov}`}>Cancel</button>
              <button onClick={savePolicy} className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">Add Policy</button>
            </div>
          </div>
        </div>
      )}

      {/* Record Payment Modal */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddPaymentModal(false)}>
          <div className={`${th.card} rounded-xl w-full max-w-md shadow-2xl`} onClick={e => e.stopPropagation()}>
            <div className={`px-6 py-4 border-b ${th.bdr} flex justify-between items-center`}>
              <h3 className={`text-lg font-semibold ${th.txt}`}>Record Payment</h3>
              <button onClick={() => setShowAddPaymentModal(false)} className={`p-1.5 rounded-lg ${th.hov}`}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              {/* Searchable Tenant Dropdown */}
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Tenant / Property *</label>
                <div className="relative">
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${th.mut}`} />
                    <input 
                      type="text"
                      placeholder="Search by tenant name or address..."
                      value={addPaymentForm.leaseId ? (() => {
                        const lease = allLeases.find(l => l.id === parseInt(addPaymentForm.leaseId));
                        const tenant = lease ? allTenants.find(t => t.id === lease.tenantId) : null;
                        const prop = lease ? props.find(p => p.id === lease.propId) : null;
                        return tenant && prop ? `${tenant.name} - ${prop.addr}${lease.unit ? ` (${lease.unit})` : ''}` : '';
                      })() : addPaymentSearch}
                      onChange={e => {
                        setAddPaymentSearch(e.target.value);
                        setAddPaymentForm({ ...addPaymentForm, leaseId: '' });
                        setAddPaymentDropdownOpen(true);
                      }}
                      onFocus={() => setAddPaymentDropdownOpen(true)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                    />
                  </div>
                  {addPaymentDropdownOpen && (
                    <div className={`absolute z-10 w-full mt-1 ${th.card} border ${th.bdr} rounded-lg shadow-lg max-h-48 overflow-y-auto`}>
                      {allLeases.filter(l => l.status === 'active').filter(lease => {
                        if (!addPaymentSearch) return true;
                        const tenant = allTenants.find(t => t.id === lease.tenantId);
                        const prop = props.find(p => p.id === lease.propId);
                        const searchLower = addPaymentSearch.toLowerCase();
                        return tenant?.name.toLowerCase().includes(searchLower) || 
                               prop?.addr.toLowerCase().includes(searchLower) ||
                               prop?.city.toLowerCase().includes(searchLower);
                      }).map(lease => {
                        const tenant = allTenants.find(t => t.id === lease.tenantId);
                        const prop = props.find(p => p.id === lease.propId);
                        return (
                          <div 
                            key={lease.id}
                            onClick={() => {
                              setAddPaymentForm({ ...addPaymentForm, leaseId: lease.id.toString(), amt: lease.rent });
                              setAddPaymentSearch('');
                              setAddPaymentDropdownOpen(false);
                            }}
                            className={`px-4 py-3 cursor-pointer ${th.hov} border-b ${th.bdr} last:border-b-0`}
                          >
                            <p className={`text-sm font-medium ${th.txt}`}>{tenant?.name}</p>
                            <p className={`text-xs ${th.mut}`}>{prop?.addr}{lease.unit ? ` - Unit ${lease.unit}` : ''}, {prop?.city}</p>
                            <p className={`text-xs ${th.mut}`}>{fmt(lease.rent)}/month</p>
                          </div>
                        );
                      })}
                      {allLeases.filter(l => l.status === 'active').filter(lease => {
                        if (!addPaymentSearch) return true;
                        const tenant = allTenants.find(t => t.id === lease.tenantId);
                        const prop = props.find(p => p.id === lease.propId);
                        const searchLower = addPaymentSearch.toLowerCase();
                        return tenant?.name.toLowerCase().includes(searchLower) || 
                               prop?.addr.toLowerCase().includes(searchLower) ||
                               prop?.city.toLowerCase().includes(searchLower);
                      }).length === 0 && (
                        <div className={`px-4 py-3 text-sm ${th.mut}`}>No tenants found</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Amount *</label>
                  <input 
                    type="number" 
                    value={addPaymentForm.amt} 
                    onChange={e => setAddPaymentForm({ ...addPaymentForm, amt: e.target.value })}
                    placeholder="0.00"
                    className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Status</label>
                  <select 
                    value={addPaymentForm.status} 
                    onChange={e => setAddPaymentForm({ ...addPaymentForm, status: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                  >
                    <option value="paid">Paid</option>
                    <option value="due">Due (Pending)</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Due Date</label>
                  <input 
                    type="date" 
                    value={addPaymentForm.due} 
                    onChange={e => setAddPaymentForm({ ...addPaymentForm, due: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>{addPaymentForm.status === 'paid' ? 'Paid Date' : 'Expected Date'}</label>
                  <input 
                    type="date" 
                    value={addPaymentForm.date} 
                    onChange={e => setAddPaymentForm({ ...addPaymentForm, date: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                  />
                </div>
              </div>
              {addPaymentForm.status === 'paid' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Payment Method</label>
                    <select 
                      value={addPaymentForm.method} 
                      onChange={e => setAddPaymentForm({ ...addPaymentForm, method: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                    >
                      {paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Late Fee</label>
                    <input 
                      type="number" 
                      value={addPaymentForm.lateFee} 
                      onChange={e => setAddPaymentForm({ ...addPaymentForm, lateFee: e.target.value })}
                      placeholder="0.00"
                      className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                    />
                  </div>
                </div>
              )}
              
              {/* Period Coverage - for partial payments or catching up */}
              <div className={`border-t ${th.bdr} pt-4`}>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Period Covered <span className={`font-normal ${th.mut}`}>(for partial/back payments)</span></label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs ${th.mut} mb-1`}>From</label>
                    <input 
                      type="date" 
                      value={addPaymentForm.periodStart} 
                      onChange={e => setAddPaymentForm({ ...addPaymentForm, periodStart: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs ${th.mut} mb-1`}>To</label>
                    <input 
                      type="date" 
                      value={addPaymentForm.periodEnd} 
                      onChange={e => setAddPaymentForm({ ...addPaymentForm, periodEnd: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                    />
                  </div>
                </div>
              </div>
              
              {/* Notes */}
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Notes</label>
                <textarea 
                  value={addPaymentForm.notes} 
                  onChange={e => setAddPaymentForm({ ...addPaymentForm, notes: e.target.value })}
                  placeholder="e.g., Partial payment for Nov-Dec, remaining $500 due next week..."
                  rows={2}
                  className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm resize-none`}
                />
              </div>
            </div>
            <div className={`px-6 py-4 border-t ${th.bdr} flex justify-end gap-3`}>
              <button onClick={() => setShowAddPaymentModal(false)} className={`px-5 py-2.5 rounded-lg border ${th.bdr} ${th.txt} text-sm font-medium ${th.hov}`}>Cancel</button>
              <button onClick={saveAddPayment} className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium">Record Payment</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Tenant Modal */}
      {showTenantModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowTenantModal(false)}>
          <div className={`${th.card} rounded-xl w-full max-w-lg shadow-2xl flex flex-col max-h-[85vh]`} onClick={e => e.stopPropagation()}>
            <div className={`px-6 py-4 border-b ${th.bdr} flex justify-between items-center flex-shrink-0`}>
              <h3 className={`text-lg font-semibold ${th.txt}`}>Add Tenant</h3>
              <button onClick={() => setShowTenantModal(false)} className={`p-1.5 rounded-lg ${th.hov}`}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-3 overflow-y-auto flex-1">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className={`block text-xs font-medium ${th.txt2} mb-1`}>Property *</label>
                  <select value={tenantForm.propId} onChange={e => setTenantForm({ ...tenantForm, propId: e.target.value })} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}>
                    <option value="">Select property...</option>
                    {props.map(p => <option key={p.id} value={p.id}>{p.addr} - {p.city}</option>)}
                  </select>
                </div>
                <div>
                  <label className={`block text-xs font-medium ${th.txt2} mb-1`}>Unit</label>
                  <input type="text" value={tenantForm.unit} onChange={e => setTenantForm({ ...tenantForm, unit: e.target.value })} placeholder="A, B..." className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
              </div>
              
              <div className={`border-t ${th.bdr} pt-3`}>
                <h4 className={`text-xs font-medium ${th.mut} uppercase mb-2`}>Tenant Info</h4>
                <div className="space-y-3">
                  <div>
                    <label className={`block text-xs font-medium ${th.txt2} mb-1`}>Full Name *</label>
                    <input type="text" value={tenantForm.name} onChange={e => setTenantForm({ ...tenantForm, name: e.target.value })} placeholder="John Smith" className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-xs font-medium ${th.txt2} mb-1`}>Email</label>
                      <input type="email" value={tenantForm.email} onChange={e => setTenantForm({ ...tenantForm, email: e.target.value })} placeholder="john@email.com" className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                    </div>
                    <div>
                      <label className={`block text-xs font-medium ${th.txt2} mb-1`}>Phone</label>
                      <input type="tel" value={tenantForm.phone} onChange={e => setTenantForm({ ...tenantForm, phone: e.target.value })} placeholder="(555) 123-4567" className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={tenantForm.ri} onChange={e => setTenantForm({ ...tenantForm, ri: e.target.checked })} className="rounded" />
                    <span className={`text-sm ${th.txt}`}>Has renters insurance</span>
                  </label>
                </div>
              </div>
              
              <div className={`border-t ${th.bdr} pt-3`}>
                <h4 className={`text-xs font-medium ${th.mut} uppercase mb-2`}>Lease</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className={`block text-xs font-medium ${th.txt2} mb-1`}>Start</label>
                    <input type="date" value={tenantForm.leaseStart} onChange={e => setTenantForm({ ...tenantForm, leaseStart: e.target.value })} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                  </div>
                  <div>
                    <label className={`block text-xs font-medium ${th.txt2} mb-1`}>End</label>
                    <input type="date" value={tenantForm.leaseEnd} onChange={e => setTenantForm({ ...tenantForm, leaseEnd: e.target.value })} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                  </div>
                  <div>
                    <label className={`block text-xs font-medium ${th.txt2} mb-1`}>Rent/mo *</label>
                    <input type="number" value={tenantForm.rent} onChange={e => setTenantForm({ ...tenantForm, rent: e.target.value })} placeholder="1500" className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                  </div>
                </div>
                <div className="mt-3">
                  <label className={`block text-xs font-medium ${th.txt2} mb-1`}>Rent Payment Method</label>
                  <select value={tenantForm.paymentMethod} onChange={e => setTenantForm({ ...tenantForm, paymentMethod: e.target.value })} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}>
                    {paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              
              <div className={`border-t ${th.bdr} pt-3`}>
                <h4 className={`text-xs font-medium ${th.mut} uppercase mb-2`}>Security Deposit</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className={`block text-xs font-medium ${th.txt2} mb-1`}>Amount</label>
                    <input type="number" value={tenantForm.depositAmount} onChange={e => setTenantForm({ ...tenantForm, depositAmount: e.target.value })} placeholder="1500" className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                  </div>
                  <div>
                    <label className={`block text-xs font-medium ${th.txt2} mb-1`}>Method</label>
                    <select value={tenantForm.depositMethod} onChange={e => setTenantForm({ ...tenantForm, depositMethod: e.target.value })} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}>
                      {paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-xs font-medium ${th.txt2} mb-1`}>Received</label>
                    <input type="date" value={tenantForm.depositDate} onChange={e => setTenantForm({ ...tenantForm, depositDate: e.target.value })} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                  </div>
                </div>
              </div>
            </div>
            <div className={`px-6 py-4 border-t ${th.bdr} flex justify-end gap-3 flex-shrink-0`}>
              <button onClick={() => setShowTenantModal(false)} className={`px-5 py-2.5 rounded-lg border ${th.bdr} ${th.txt} text-sm font-medium ${th.hov}`}>Cancel</button>
              <button onClick={saveTenant} className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">Add Tenant</button>
            </div>
          </div>
        </div>
      )}

      {/* Expense Modal */}
      {showExpenseModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowExpenseModal(false)}>
          <div className={`${th.card} rounded-xl w-full max-w-lg shadow-2xl`} onClick={e => e.stopPropagation()}>
            <div className={`px-6 py-4 border-b ${th.bdr} flex justify-between items-center`}>
              <h3 className={`text-lg font-semibold ${th.txt}`}>{expenseForm.id ? 'Edit Expense' : 'Add Expense'}</h3>
              <button onClick={() => setShowExpenseModal(false)} className={`p-1.5 rounded-lg ${th.hov}`}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Property Dropdown */}
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Property (optional)</label>
                  <div className="relative">
                    <button 
                      type="button"
                      onClick={() => setExpenseDropdowns({ ...expenseDropdowns, property: !expenseDropdowns.property, category: false, contractor: false, method: false })}
                      className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm text-left flex items-center justify-between`}
                    >
                      <span className={expenseForm.propId ? th.txt : th.mut}>
                        {expenseForm.propId ? props.find(p => p.id === parseInt(expenseForm.propId))?.addr : 'Portfolio-wide expense...'}
                      </span>
                      <ChevronDown className={`w-4 h-4 ${th.mut} transition ${expenseDropdowns.property ? 'rotate-180' : ''}`} />
                    </button>
                    {expenseDropdowns.property && (
                      <div className={`absolute top-full left-0 right-0 mt-1 ${th.card} rounded-lg border ${th.bdr} shadow-lg z-20 max-h-48 overflow-y-auto`}>
                        <button type="button" onClick={() => { setExpenseForm({ ...expenseForm, propId: '' }); setExpenseDropdowns({ ...expenseDropdowns, property: false }); }} className={`w-full px-4 py-2.5 text-left text-sm ${th.txt} ${th.hov}`}>Portfolio-wide expense...</button>
                        {props.map(p => (
                          <button key={p.id} type="button" onClick={() => { setExpenseForm({ ...expenseForm, propId: p.id }); setExpenseDropdowns({ ...expenseDropdowns, property: false }); }} className={`w-full px-4 py-2.5 text-left text-sm ${th.txt} ${th.hov}`}>{p.addr}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Date</label>
                  <input 
                    type="date" 
                    value={expenseForm.date} 
                    onChange={e => setExpenseForm({ ...expenseForm, date: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Amount</label>
                  <input 
                    type="number" 
                    value={expenseForm.amount} 
                    onChange={e => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                    placeholder="0.00"
                    step="0.01"
                    className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                  />
                </div>
                {/* Category Dropdown */}
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Category</label>
                  <div className="relative">
                    <button 
                      type="button"
                      onClick={() => setExpenseDropdowns({ ...expenseDropdowns, category: !expenseDropdowns.category, property: false, contractor: false, method: false })}
                      className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm text-left flex items-center justify-between`}
                    >
                      <span>{expenseForm.category}</span>
                      <ChevronDown className={`w-4 h-4 ${th.mut} transition ${expenseDropdowns.category ? 'rotate-180' : ''}`} />
                    </button>
                    {expenseDropdowns.category && (
                      <div className={`absolute top-full left-0 right-0 mt-1 ${th.card} rounded-lg border ${th.bdr} shadow-lg z-20 max-h-48 overflow-y-auto`}>
                        {expenseCategories.map(c => (
                          <button key={c} type="button" onClick={() => { setExpenseForm({ ...expenseForm, category: c }); setExpenseDropdowns({ ...expenseDropdowns, category: false }); }} className={`w-full px-4 py-2.5 text-left text-sm ${th.txt} ${th.hov} ${expenseForm.category === c ? 'bg-blue-50 text-blue-600' : ''}`}>{c}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* Contractor Dropdown */}
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Payee / Vendor</label>
                  <div className="relative">
                    <button 
                      type="button"
                      onClick={() => setExpenseDropdowns({ ...expenseDropdowns, contractor: !expenseDropdowns.contractor, property: false, category: false, method: false })}
                      className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm text-left flex items-center justify-between`}
                    >
                      <span className={expenseForm.contractorId ? th.txt : th.mut}>
                        {expenseForm.contractorId ? contractors.find(c => c.id === parseInt(expenseForm.contractorId))?.name : 'Select contractor...'}
                      </span>
                      <ChevronDown className={`w-4 h-4 ${th.mut} transition ${expenseDropdowns.contractor ? 'rotate-180' : ''}`} />
                    </button>
                    {expenseDropdowns.contractor && (
                      <div className={`absolute top-full left-0 right-0 mt-1 ${th.card} rounded-lg border ${th.bdr} shadow-lg z-20 max-h-48 overflow-y-auto`}>
                        <button type="button" onClick={() => { setExpenseForm({ ...expenseForm, contractorId: '' }); setExpenseDropdowns({ ...expenseDropdowns, contractor: false }); }} className={`w-full px-4 py-2.5 text-left text-sm ${th.mut} ${th.hov}`}>None (enter manually)</button>
                        {contractors.filter(c => c.active).map(c => (
                          <button key={c.id} type="button" onClick={() => { setExpenseForm({ ...expenseForm, contractorId: c.id, payee: c.name }); setExpenseDropdowns({ ...expenseDropdowns, contractor: false }); }} className={`w-full px-4 py-2.5 text-left text-sm ${th.txt} ${th.hov}`}>
                            {c.name} <span className={th.mut}>({c.category})</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <input 
                    type="text" 
                    value={expenseForm.payee} 
                    onChange={e => setExpenseForm({ ...expenseForm, payee: e.target.value, contractorId: '' })}
                    placeholder="Or type payee name..."
                    className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm mt-2`}
                  />
                </div>
                {/* Method Dropdown */}
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Payment Method</label>
                  <div className="relative">
                    <button 
                      type="button"
                      onClick={() => setExpenseDropdowns({ ...expenseDropdowns, method: !expenseDropdowns.method, property: false, category: false, contractor: false })}
                      className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm text-left flex items-center justify-between`}
                    >
                      <span>{expenseForm.method}</span>
                      <ChevronDown className={`w-4 h-4 ${th.mut} transition ${expenseDropdowns.method ? 'rotate-180' : ''}`} />
                    </button>
                    {expenseDropdowns.method && (
                      <div className={`absolute top-full left-0 right-0 mt-1 ${th.card} rounded-lg border ${th.bdr} shadow-lg z-20 max-h-48 overflow-y-auto`}>
                        {paymentMethods.map(m => (
                          <button key={m} type="button" onClick={() => { setExpenseForm({ ...expenseForm, method: m }); setExpenseDropdowns({ ...expenseDropdowns, method: false }); }} className={`w-full px-4 py-2.5 text-left text-sm ${th.txt} ${th.hov} ${expenseForm.method === m ? 'bg-blue-50 text-blue-600' : ''}`}>{m}</button>
                        ))}
                      </div>
                    )}
                  </div>
                  {expenseForm.method === 'Check' && (
                    <input 
                      type="text" 
                      value={expenseForm.checkNum} 
                      onChange={e => setExpenseForm({ ...expenseForm, checkNum: e.target.value })}
                      placeholder="Check number..."
                      className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm mt-2`}
                    />
                  )}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Description</label>
                <input 
                  type="text" 
                  value={expenseForm.description} 
                  onChange={e => setExpenseForm({ ...expenseForm, description: e.target.value })}
                  placeholder="What was the expense for?"
                  className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Receipt (optional)</label>
                <input 
                  type="file" 
                  accept="image/*,.pdf"
                  onChange={e => setExpenseForm({ ...expenseForm, receipt: e.target.files[0]?.name || null })}
                  className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Notes (optional)</label>
                <textarea 
                  value={expenseForm.notes} 
                  onChange={e => setExpenseForm({ ...expenseForm, notes: e.target.value })}
                  placeholder="Warranty info, receipt location, follow-up needed..."
                  rows={2}
                  className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm resize-none`}
                />
              </div>
            </div>
            <div className={`px-6 py-4 border-t ${th.bdr} flex justify-end gap-3`}>
              <button onClick={() => setShowExpenseModal(false)} className={`px-5 py-2.5 rounded-lg border ${th.bdr} ${th.txt} text-sm font-medium ${th.hov}`}>Cancel</button>
              <button onClick={recordExpense} className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium">{expenseForm.id ? 'Save Changes' : 'Add Expense'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Balance Update Modal */}
      {showBalanceModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowBalanceModal(false)}>
          <div className={`${th.card} rounded-xl w-full max-w-md shadow-2xl`} onClick={e => e.stopPropagation()}>
            <div className={`px-6 py-4 border-b ${th.bdr} flex justify-between items-center`}>
              <h3 className={`text-lg font-semibold ${th.txt}`}>Update Loan Balance</h3>
              <button onClick={() => setShowBalanceModal(false)} className={`p-1.5 rounded-lg ${th.hov}`}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Current Balance</label>
                <input 
                  type="number" 
                  value={balanceForm.balance} 
                  onChange={e => setBalanceForm({ ...balanceForm, balance: e.target.value })}
                  placeholder="0.00"
                  step="0.01"
                  className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Date</label>
                  <input 
                    type="date" 
                    value={balanceForm.date} 
                    onChange={e => setBalanceForm({ ...balanceForm, date: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Source</label>
                  <select 
                    value={balanceForm.source} 
                    onChange={e => setBalanceForm({ ...balanceForm, source: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                  >
                    <option value="statement">Statement</option>
                    <option value="servicer">Servicer Website</option>
                    <option value="payoff">Payoff Quote</option>
                    <option value="estimate">Estimate</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Notes (optional)</label>
                <input 
                  type="text" 
                  value={balanceForm.notes} 
                  onChange={e => setBalanceForm({ ...balanceForm, notes: e.target.value })}
                  placeholder="Annual statement, refi quote, etc."
                  className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}
                />
              </div>
            </div>
            <div className={`px-6 py-4 border-t ${th.bdr} flex justify-end gap-3`}>
              <button onClick={() => setShowBalanceModal(false)} className={`px-5 py-2.5 rounded-lg border ${th.bdr} ${th.txt} text-sm font-medium ${th.hov}`}>Cancel</button>
              <button onClick={recordBalanceUpdate} className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">Update Balance</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Loan Modal */}
      {showLoanEditModal && loanEditForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowLoanEditModal(false)}>
          <div className={`${th.card} rounded-xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]`} onClick={e => e.stopPropagation()}>
            <div className={`px-6 py-4 border-b ${th.bdr} flex justify-between items-center flex-shrink-0`}>
              <h3 className={`text-lg font-semibold ${th.txt}`}>Edit Loan</h3>
              <button onClick={() => setShowLoanEditModal(false)} className={`p-1.5 rounded-lg ${th.hov}`}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* Basic Info */}
              <div>
                <h4 className={`text-sm font-medium ${th.txt} mb-3`}>Basic Info</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs ${th.mut} mb-1`}>Loan Name</label>
                    <input type="text" value={loanEditForm.name} onChange={e => setLoanEditForm({...loanEditForm, name: e.target.value})} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                  </div>
                  <div>
                    <label className={`block text-xs ${th.mut} mb-1`}>Loan Type</label>
                    <select value={loanEditForm.type} onChange={e => setLoanEditForm({...loanEditForm, type: e.target.value})} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}>
                      <option>Conventional</option>
                      <option>FHA</option>
                      <option>VA</option>
                      <option>Commercial</option>
                      <option>Commercial Blanket</option>
                      <option>Portfolio</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-xs ${th.mut} mb-1`}>Account Number</label>
                    <input type="text" value={loanEditForm.accountNum} onChange={e => setLoanEditForm({...loanEditForm, accountNum: e.target.value})} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                  </div>
                  <div>
                    <label className={`block text-xs ${th.mut} mb-1`}>Interest Rate (%)</label>
                    <input type="number" step="0.125" value={loanEditForm.rate} onChange={e => setLoanEditForm({...loanEditForm, rate: e.target.value})} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                  </div>
                  <div>
                    <label className={`block text-xs ${th.mut} mb-1`}>Maturity Date</label>
                    <input type="date" value={loanEditForm.maturityDate} onChange={e => setLoanEditForm({...loanEditForm, maturityDate: e.target.value})} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                  </div>
                  <div>
                    <label className={`block text-xs ${th.mut} mb-1`}>HOA</label>
                    <input type="number" value={loanEditForm.hoa} onChange={e => setLoanEditForm({...loanEditForm, hoa: e.target.value})} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                  </div>
                </div>
              </div>

              {/* P&I */}
              <div>
                <h4 className={`text-sm font-medium ${th.txt} mb-3`}>Principal & Interest</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs ${th.mut} mb-1`}>Monthly P&I</label>
                    <input type="number" value={loanEditForm.pi} onChange={e => setLoanEditForm({...loanEditForm, pi: e.target.value})} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                  </div>
                </div>
              </div>

              {/* Loan Officer */}
              <div>
                <h4 className={`text-sm font-medium ${th.txt} mb-3`}>Loan Officer (Original Lender)</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className={`block text-xs ${th.mut} mb-1`}>Name</label>
                    <input type="text" value={loanEditForm.loanOfficer} onChange={e => setLoanEditForm({...loanEditForm, loanOfficer: e.target.value})} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                  </div>
                  <div>
                    <label className={`block text-xs ${th.mut} mb-1`}>Phone</label>
                    <input type="text" value={loanEditForm.loanOfficerPhone} onChange={e => setLoanEditForm({...loanEditForm, loanOfficerPhone: e.target.value})} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                  </div>
                  <div>
                    <label className={`block text-xs ${th.mut} mb-1`}>Email</label>
                    <input type="email" value={loanEditForm.loanOfficerEmail} onChange={e => setLoanEditForm({...loanEditForm, loanOfficerEmail: e.target.value})} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className={`block text-sm font-medium ${th.txt} mb-2`}>Notes</label>
                <textarea value={loanEditForm.notes || ''} onChange={e => setLoanEditForm({...loanEditForm, notes: e.target.value})} rows={3} placeholder="Balloon payment info, renewal options, special terms..." className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm resize-none`} />
              </div>
            </div>
            <div className={`px-6 py-4 border-t ${th.bdr} flex justify-end gap-3 flex-shrink-0`}>
              <button onClick={() => setShowLoanEditModal(false)} className={`px-5 py-2.5 rounded-lg border ${th.bdr} ${th.txt} text-sm font-medium ${th.hov}`}>Cancel</button>
              <button onClick={saveLoanEdit} className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Servicer Transfer Modal */}
      {showServicerModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowServicerModal(false)}>
          <div className={`${th.card} rounded-xl w-full max-w-md shadow-2xl`} onClick={e => e.stopPropagation()}>
            <div className={`px-6 py-4 border-b ${th.bdr} flex justify-between items-center`}>
              <h3 className={`text-lg font-semibold ${th.txt}`}>Add Servicer Transfer</h3>
              <button onClick={() => setShowServicerModal(false)} className={`p-1.5 rounded-lg ${th.hov}`}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Servicer Name</label>
                <input type="text" value={servicerForm.name} onChange={e => setServicerForm({...servicerForm, name: e.target.value})} placeholder="Mr. Cooper, LoanCare, etc." className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Account Number</label>
                  <input type="text" value={servicerForm.accountNum} onChange={e => setServicerForm({...servicerForm, accountNum: e.target.value})} className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Transfer Date</label>
                  <input type="date" value={servicerForm.transferDate} onChange={e => setServicerForm({...servicerForm, transferDate: e.target.value})} className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Phone</label>
                  <input type="text" value={servicerForm.phone} onChange={e => setServicerForm({...servicerForm, phone: e.target.value})} className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Email</label>
                  <input type="email" value={servicerForm.email} onChange={e => setServicerForm({...servicerForm, email: e.target.value})} className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Website</label>
                <input type="text" value={servicerForm.website} onChange={e => setServicerForm({...servicerForm, website: e.target.value})} placeholder="www.example.com" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
              </div>
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Notes</label>
                <input type="text" value={servicerForm.notes} onChange={e => setServicerForm({...servicerForm, notes: e.target.value})} placeholder="Reason for transfer, etc." className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
              </div>
            </div>
            <div className={`px-6 py-4 border-t ${th.bdr} flex justify-end gap-3`}>
              <button onClick={() => setShowServicerModal(false)} className={`px-5 py-2.5 rounded-lg border ${th.bdr} ${th.txt} text-sm font-medium ${th.hov}`}>Cancel</button>
              <button onClick={addServicerTransfer} className="px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium">Add Transfer</button>
            </div>
          </div>
        </div>
      )}

      {/* Update Tax Modal */}
      {showTaxUpdateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowTaxUpdateModal(false)}>
          <div className={`${th.card} rounded-xl w-full max-w-md shadow-2xl`} onClick={e => e.stopPropagation()}>
            <div className={`px-6 py-4 border-b ${th.bdr} flex justify-between items-center`}>
              <h3 className={`text-lg font-semibold ${th.txt}`}>Update Tax Amount</h3>
              <button onClick={() => setShowTaxUpdateModal(false)} className={`p-1.5 rounded-lg ${th.hov}`}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Monthly Tax Amount</label>
                <input type="number" value={taxForm.amount} onChange={e => setTaxForm({...taxForm, amount: e.target.value})} placeholder="0.00" step="0.01" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
              </div>
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Effective Date</label>
                <input type="date" value={taxForm.effectiveDate} onChange={e => setTaxForm({...taxForm, effectiveDate: e.target.value})} className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
              </div>
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Notes</label>
                <input type="text" value={taxForm.notes} onChange={e => setTaxForm({...taxForm, notes: e.target.value})} placeholder="New assessment, escrow adjustment, etc." className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
              </div>
            </div>
            <div className={`px-6 py-4 border-t ${th.bdr} flex justify-end gap-3`}>
              <button onClick={() => setShowTaxUpdateModal(false)} className={`px-5 py-2.5 rounded-lg border ${th.bdr} ${th.txt} text-sm font-medium ${th.hov}`}>Cancel</button>
              <button onClick={addTaxUpdate} className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">Update Tax</button>
            </div>
          </div>
        </div>
      )}

      {/* Update Insurance Modal */}
      {showInsUpdateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowInsUpdateModal(false)}>
          <div className={`${th.card} rounded-xl w-full max-w-md shadow-2xl`} onClick={e => e.stopPropagation()}>
            <div className={`px-6 py-4 border-b ${th.bdr} flex justify-between items-center`}>
              <h3 className={`text-lg font-semibold ${th.txt}`}>Update Insurance Amount</h3>
              <button onClick={() => setShowInsUpdateModal(false)} className={`p-1.5 rounded-lg ${th.hov}`}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Monthly Insurance Amount</label>
                <input type="number" value={insForm.amount} onChange={e => setInsForm({...insForm, amount: e.target.value})} placeholder="0.00" step="0.01" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
              </div>
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Effective Date</label>
                <input type="date" value={insForm.effectiveDate} onChange={e => setInsForm({...insForm, effectiveDate: e.target.value})} className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
              </div>
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Notes</label>
                <input type="text" value={insForm.notes} onChange={e => setInsForm({...insForm, notes: e.target.value})} placeholder="Policy renewal, coverage change, etc." className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
              </div>
            </div>
            <div className={`px-6 py-4 border-t ${th.bdr} flex justify-end gap-3`}>
              <button onClick={() => setShowInsUpdateModal(false)} className={`px-5 py-2.5 rounded-lg border ${th.bdr} ${th.txt} text-sm font-medium ${th.hov}`}>Cancel</button>
              <button onClick={addInsUpdate} className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">Update Insurance</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Tenant Modal */}
      {showTenantEditModal && tenantEditForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowTenantEditModal(false)}>
          <div className={`${th.card} rounded-xl w-full max-w-md shadow-2xl`} onClick={e => e.stopPropagation()}>
            <div className={`px-6 py-4 border-b ${th.bdr} flex justify-between items-center`}>
              <h3 className={`text-lg font-semibold ${th.txt}`}>Edit Tenant</h3>
              <button onClick={() => setShowTenantEditModal(false)} className={`p-1.5 rounded-lg ${th.hov}`}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Name</label>
                <input type="text" value={tenantEditForm.name} onChange={e => setTenantEditForm({...tenantEditForm, name: e.target.value})} className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
              </div>
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Email</label>
                <input type="email" value={tenantEditForm.email} onChange={e => setTenantEditForm({...tenantEditForm, email: e.target.value})} className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
              </div>
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Phone</label>
                <input type="text" value={tenantEditForm.phone} onChange={e => setTenantEditForm({...tenantEditForm, phone: e.target.value})} className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="tenantRi" checked={tenantEditForm.ri} onChange={e => setTenantEditForm({...tenantEditForm, ri: e.target.checked})} className="rounded" />
                <label htmlFor="tenantRi" className={`text-sm ${th.txt}`}>Renters Insurance Verified</label>
              </div>
            </div>
            <div className={`px-6 py-4 border-t ${th.bdr} flex justify-end gap-3`}>
              <button onClick={() => setShowTenantEditModal(false)} className={`px-5 py-2.5 rounded-lg border ${th.bdr} ${th.txt} text-sm font-medium ${th.hov}`}>Cancel</button>
              <button onClick={saveTenantEdit} className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Lease Modal */}
      {showLeaseEditModal && leaseEditForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowLeaseEditModal(false)}>
          <div className={`${th.card} rounded-xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]`} onClick={e => e.stopPropagation()}>
            <div className={`px-6 py-4 border-b ${th.bdr} flex justify-between items-center flex-shrink-0`}>
              <h3 className={`text-lg font-semibold ${th.txt}`}>Edit Lease & Deposit</h3>
              <button onClick={() => setShowLeaseEditModal(false)} className={`p-1.5 rounded-lg ${th.hov}`}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              {/* Lease Info */}
              <div>
                <h4 className={`text-sm font-medium ${th.txt} mb-3`}>Lease Details</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className={`block text-xs ${th.mut} mb-1`}>Start Date</label>
                    <input type="date" value={leaseEditForm.start} onChange={e => setLeaseEditForm({...leaseEditForm, start: e.target.value})} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                  </div>
                  <div>
                    <label className={`block text-xs ${th.mut} mb-1`}>End Date</label>
                    <input type="date" value={leaseEditForm.end} onChange={e => setLeaseEditForm({...leaseEditForm, end: e.target.value})} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                  </div>
                  <div>
                    <label className={`block text-xs ${th.mut} mb-1`}>Monthly Rent</label>
                    <input type="number" value={leaseEditForm.rent} onChange={e => setLeaseEditForm({...leaseEditForm, rent: e.target.value})} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                  </div>
                </div>
              </div>

              {/* Deposit Info */}
              <div>
                <h4 className={`text-sm font-medium ${th.txt} mb-3`}>Deposit Received</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className={`block text-xs ${th.mut} mb-1`}>Amount</label>
                    <input type="number" value={leaseEditForm.depositAmount} onChange={e => setLeaseEditForm({...leaseEditForm, depositAmount: e.target.value})} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                  </div>
                  <div>
                    <label className={`block text-xs ${th.mut} mb-1`}>Method</label>
                    <select value={leaseEditForm.depositMethod} onChange={e => setLeaseEditForm({...leaseEditForm, depositMethod: e.target.value})} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}>
                      <option>Check</option>
                      <option>Zelle</option>
                      <option>Venmo</option>
                      <option>CashApp</option>
                      <option>Cash</option>
                      <option>Money Order</option>
                      <option>Cashier Check</option>
                      <option>Wire</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-xs ${th.mut} mb-1`}>Date Received</label>
                    <input type="date" value={leaseEditForm.depositPaidDate} onChange={e => setLeaseEditForm({...leaseEditForm, depositPaidDate: e.target.value})} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                  </div>
                </div>
              </div>

              {/* Deposit Return */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <input type="checkbox" id="depositReturned" checked={leaseEditForm.depositReturned} onChange={e => setLeaseEditForm({...leaseEditForm, depositReturned: e.target.checked})} className="rounded" />
                  <label htmlFor="depositReturned" className={`text-sm font-medium ${th.txt}`}>Deposit Returned</label>
                </div>
                {leaseEditForm.depositReturned && (
                  <div className={`p-4 rounded-lg ${dark ? 'bg-emerald-900/20 border border-emerald-800' : 'bg-emerald-50 border border-emerald-200'}`}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-xs ${th.mut} mb-1`}>Amount Returned</label>
                        <input type="number" value={leaseEditForm.depositReturnedAmount} onChange={e => setLeaseEditForm({...leaseEditForm, depositReturnedAmount: e.target.value})} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                      </div>
                      <div>
                        <label className={`block text-xs ${th.mut} mb-1`}>Date Returned</label>
                        <input type="date" value={leaseEditForm.depositReturnedDate} onChange={e => setLeaseEditForm({...leaseEditForm, depositReturnedDate: e.target.value})} className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                      </div>
                      <div className="col-span-2">
                        <label className={`block text-xs ${th.mut} mb-1`}>Notes (deductions, etc.)</label>
                        <input type="text" value={leaseEditForm.depositNotes} onChange={e => setLeaseEditForm({...leaseEditForm, depositNotes: e.target.value})} placeholder="e.g., Deducted $150 for carpet cleaning" className={`w-full px-3 py-2 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={`px-6 py-4 border-t ${th.bdr} flex justify-end gap-3 flex-shrink-0`}>
              <button onClick={() => setShowLeaseEditModal(false)} className={`px-5 py-2.5 rounded-lg border ${th.bdr} ${th.txt} text-sm font-medium ${th.hov}`}>Cancel</button>
              <button onClick={saveLeaseEdit} className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Contractor Modal */}
      {showContractorModal && contractorForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowContractorModal(false)}>
          <div className={`${th.card} rounded-xl w-full max-w-lg shadow-2xl`} onClick={e => e.stopPropagation()}>
            <div className={`px-6 py-4 border-b ${th.bdr} flex justify-between items-center`}>
              <h3 className={`text-lg font-semibold ${th.txt}`}>{contractorForm.id ? 'Edit Contractor' : 'Add Contractor'}</h3>
              <button onClick={() => setShowContractorModal(false)} className={`p-1.5 rounded-lg ${th.hov}`}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Name</label>
                  <input type="text" value={contractorForm.name} onChange={e => setContractorForm({...contractorForm, name: e.target.value})} placeholder="Company or person name" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Category</label>
                  <select value={contractorForm.category} onChange={e => setContractorForm({...contractorForm, category: e.target.value})} className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`}>
                    {contractorCategories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Phone</label>
                  <input type="text" value={contractorForm.phone} onChange={e => setContractorForm({...contractorForm, phone: e.target.value})} placeholder="214-555-1234" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Email</label>
                  <input type="email" value={contractorForm.email} onChange={e => setContractorForm({...contractorForm, email: e.target.value})} placeholder="email@company.com" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Address</label>
                <input type="text" value={contractorForm.address} onChange={e => setContractorForm({...contractorForm, address: e.target.value})} placeholder="123 Main St, Dallas, TX" className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm`} />
              </div>
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(r => (
                    <button key={r} type="button" onClick={() => setContractorForm({...contractorForm, rating: r})} className="p-1">
                      <Star className={`w-6 h-6 ${r <= contractorForm.rating ? 'text-amber-400 fill-amber-400' : th.mut}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${th.txt2} mb-1.5`}>Notes</label>
                <textarea value={contractorForm.notes} onChange={e => setContractorForm({...contractorForm, notes: e.target.value})} placeholder="Availability, pricing notes, specialties..." rows={2} className={`w-full px-4 py-2.5 rounded-lg border ${th.bdr} ${th.card} ${th.txt} text-sm resize-none`} />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="contractorActive" checked={contractorForm.active} onChange={e => setContractorForm({...contractorForm, active: e.target.checked})} className="rounded" />
                <label htmlFor="contractorActive" className={`text-sm ${th.txt}`}>Active (show in payee dropdown)</label>
              </div>
            </div>
            <div className={`px-6 py-4 border-t ${th.bdr} flex justify-end gap-3`}>
              <button onClick={() => setShowContractorModal(false)} className={`px-5 py-2.5 rounded-lg border ${th.bdr} ${th.txt} text-sm font-medium ${th.hov}`}>Cancel</button>
              <button onClick={saveContractor} className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">{contractorForm.id ? 'Save Changes' : 'Add Contractor'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
