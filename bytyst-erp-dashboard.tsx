import React, { useState } from 'react';
import { Search, Plus, Calendar, Package, DollarSign, Users, FileText, Bell, AlertCircle, TrendingUp, Zap, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

const BytystERPDashboard = () => {
  const [activeTab, setActiveTab] = useState('calendar');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Sample data
  const jobs = [
    { id: 'J001', client: 'Juan Martinez', description: '50 Shirts - 2 colors front, 1 back', status: 'IN PRODUCTION', date: '2025-07-08' },
    { id: 'J002', client: 'ABC Corp', description: '25 Hoodies - Logo Print', status: 'COMPLETED - SHIP', date: '2025-07-09' },
    { id: 'J003', client: 'Local School', description: '100 Uniforms - Custom Design', status: 'READY TO DECORATE', date: '2025-07-10' },
    { id: 'J004', client: 'Tech Startup', description: '75 Polo Shirts - Embroidery', status: 'ARTWORK APPROVED', date: '2025-07-12' }
  ];

  const quotes = [
    { id: 'Q001', client: 'Juan Martinez', items: '50 Shirts, 2 colors front, 1 back', total: 750, status: 'pending' },
    { id: 'Q002', client: 'ABC Corp', items: '25 Hoodies, Logo front', total: 625, status: 'approved' },
    { id: 'Q003', client: 'Local School', items: '100 Uniforms, Custom design', total: 1200, status: 'draft' }
  ];

  const invoices = [
    { id: 'INV001', client: 'ABC Corp', amount: 625, deposit: 200, status: 'partial' },
    { id: 'INV002', client: 'Maria Restaurant', amount: 450, deposit: 450, status: 'paid' },
    { id: 'INV003', client: 'Tech Startup', amount: 890, deposit: 890, status: 'paid' }
  ];

  const expenses = [
    { id: 'EXP001', vendor: 'Shirt Supplier Co', amount: 400, category: 'Inventory' },
    { id: 'EXP002', vendor: 'Ink Supply Ltd', amount: 150, category: 'Materials' },
    { id: 'EXP003', vendor: 'Equipment Rental', amount: 75, category: 'Equipment' }
  ];

  // Calculations
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.deposit, 0);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const netProfit = totalRevenue - totalExpenses;

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED - SHIP': return 'bg-gray-800 text-white';
      case 'IN PRODUCTION': return 'bg-purple-600 text-white';
      case 'READY TO DECORATE': return 'bg-blue-500 text-white';
      case 'ARTWORK APPROVED': return 'bg-teal-500 text-white';
      default: return 'bg-orange-400 text-gray-800';
    }
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const dayJobs = jobs.filter(job => {
        const jobDate = new Date(job.date);
        return jobDate.toDateString() === current.toDateString();
      });
      
      days.push({
        date: new Date(current),
        isCurrentMonth: current.getMonth() === month,
        jobs: dayJobs
      });
      
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const CalendarView = () => {
    const days = generateCalendarDays();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setMonth(newDate.getMonth() - 1);
                    setCurrentDate(newDate);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <button 
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setMonth(newDate.getMonth() + 1);
                    setCurrentDate(newDate);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-7 gap-px mb-4">
            {dayNames.map((day) => (
              <div key={day} className="py-3 text-center text-sm font-semibold text-gray-600 bg-gray-50 rounded-lg">
                {day.substring(0, 3).toUpperCase()}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
            {days.map((day, index) => (
              <div
                key={index}
                className={`min-h-32 bg-white p-2 ${!day.isCurrentMonth ? 'opacity-30' : ''} ${
                  day.date.toDateString() === new Date().toDateString() ? 'bg-blue-50 border-2 border-blue-200' : ''
                }`}
              >
                <div className="text-sm font-medium text-gray-800 mb-2">
                  {day.date.getDate()}
                </div>
                
                <div className="space-y-1">
                  {day.jobs.slice(0, 3).map((job) => (
                    <div
                      key={job.id}
                      className={`${getStatusColor(job.status)} p-2 rounded text-xs font-medium cursor-pointer hover:opacity-90 transition-opacity`}
                      title={`${job.client} - ${job.description}`}
                    >
                      <div className="font-semibold">{job.id}</div>
                      <div className="truncate">{job.client}</div>
                      <div className="truncate opacity-90">{job.description}</div>
                      <div className="mt-1 text-xs font-bold">{job.status}</div>
                    </div>
                  ))}
                  
                  {day.jobs.length > 3 && (
                    <div className="text-xs text-gray-500 p-1">
                      +{day.jobs.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const FinancialDashboard = () => {
    const monthlyData = [
      { month: 'Jan', revenue: 2400, expenses: 1200 },
      { month: 'Feb', revenue: 2800, expenses: 1400 },
      { month: 'Mar', revenue: 3200, expenses: 1600 },
      { month: 'Apr', revenue: 2900, expenses: 1450 },
      { month: 'May', revenue: 3500, expenses: 1750 },
      { month: 'Jun', revenue: 3800, expenses: 1900 },
      { month: 'Jul', revenue: totalRevenue, expenses: totalExpenses }
    ];

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
                <p className="text-emerald-100 text-xs mt-1">This month</p>
              </div>
              <DollarSign className="h-8 w-8 text-emerald-200" />
            </div>
            <div className="mt-4 flex items-center text-emerald-100 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+15% vs last month</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-2xl text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Total Expenses</p>
                <p className="text-3xl font-bold">${totalExpenses.toLocaleString()}</p>
                <p className="text-red-100 text-xs mt-1">This month</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Net Profit</p>
                <p className="text-3xl font-bold">${netProfit.toLocaleString()}</p>
                <p className="text-blue-100 text-xs mt-1">This month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Active Jobs</p>
                <p className="text-3xl font-bold">{jobs.length}</p>
                <p className="text-purple-100 text-xs mt-1">In production</p>
              </div>
              <Package className="h-8 w-8 text-purple-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Revenue vs Expenses</h3>
            <div className="space-y-4">
              {monthlyData.map((data) => {
                const maxValue = Math.max(...monthlyData.map(d => Math.max(d.revenue, d.expenses)));
                const revenueWidth = (data.revenue / maxValue) * 100;
                const expenseWidth = (data.expenses / maxValue) * 100;
                
                return (
                  <div key={data.month} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium text-gray-600">
                      <span>{data.month}</span>
                      <span>${data.revenue - data.expenses}</span>
                    </div>
                    <div className="relative">
                      <div className="h-6 bg-gray-100 rounded-lg overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-lg transition-all duration-1000"
                          style={{ width: `${revenueWidth}%` }}
                        ></div>
                      </div>
                      <div className="h-4 bg-gray-100 rounded-lg overflow-hidden mt-1">
                        <div 
                          className="h-full bg-red-400 rounded-lg transition-all duration-1000"
                          style={{ width: `${expenseWidth}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                <span>Revenue</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded"></div>
                <span>Expenses</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Revenue</h3>
            <div className="space-y-4">
              {invoices.filter(i => i.status === 'paid').map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                  <div>
                    <p className="font-medium text-gray-800">{invoice.client}</p>
                    <p className="text-sm text-gray-500">{invoice.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">+${invoice.deposit}</p>
                    <p className="text-xs text-green-500">Paid</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TelegramInterface = () => {
    const [command, setCommand] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    
    const sendCommand = () => {
      if (!command.trim()) return;
      setIsProcessing(true);
      setTimeout(() => {
        alert(`Command sent: "${command}"\n\nYour n8n workflow has been triggered!`);
        setCommand('');
        setIsProcessing(false);
      }, 1500);
    };

    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center space-x-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Telegram Command Center</h3>
            <p className="text-gray-600">Send commands to trigger your n8n workflows</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-bold text-gray-700 mb-4">Command</label>
            <div className="flex space-x-4">
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="e.g., Create quote for 50 shirts, 2 colors front, 1 back"
                className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && !isProcessing && sendCommand()}
                disabled={isProcessing}
              />
              <button
                onClick={sendCommand}
                disabled={isProcessing || !command.trim()}
                className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                  isProcessing 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                } text-white`}
              >
                {isProcessing ? 'Processing...' : 'Send'}
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
            <h4 className="font-bold mb-4 text-gray-800">Example Commands:</h4>
            <div className="space-y-2 text-gray-700">
              {[
                "Create quote for 30 hoodies, logo front, ABC Corp",
                "Juan's quote is approved with $200 deposit",
                "Update inventory: 50 white smalls received",
                "Schedule production for INV001 on July 15"
              ].map((cmd, index) => (
                <div 
                  key={index}
                  onClick={() => setCommand(cmd)}
                  className="p-3 rounded-lg hover:bg-white cursor-pointer transition-colors font-medium"
                >
                  • {cmd}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-blue-600 font-bold text-lg">B</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Bytyst Printshop</h1>
                  <p className="text-xs text-blue-100">Puerto Rico Screen Printing</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search jobs & customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition-colors">
                  <Plus className="h-4 w-4" />
                  <span>Customer</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition-colors">
                  <Plus className="h-4 w-4" />
                  <span>Quote</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition-colors">
                  <Plus className="h-4 w-4" />
                  <span>Invoice</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <Bell className="h-6 w-6 text-white cursor-pointer hover:text-blue-100" />
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'calendar', label: 'Calendar', icon: Calendar },
              { id: 'financials', label: 'Financials', icon: DollarSign },
              { id: 'quotes', label: 'Quotes', icon: FileText },
              { id: 'invoices', label: 'Invoices', icon: Package },
              { id: 'telegram', label: 'Command Center', icon: Zap }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'calendar' && <CalendarView />}
        {activeTab === 'financials' && <FinancialDashboard />}
        {activeTab === 'telegram' && <TelegramInterface />}
        {activeTab === 'quotes' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Quotes Management</h3>
            <div className="space-y-4">
              {quotes.map((quote) => (
                <div key={quote.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-lg text-gray-800">{quote.id} - {quote.client}</h4>
                      <p className="text-gray-600">{quote.items}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-800">${quote.total}</p>
                      <span className={`inline-block px-4 py-2 text-sm font-medium rounded-full ${
                        quote.status === 'approved' ? 'bg-green-100 text-green-800' :
                        quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {quote.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'invoices' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Invoices Management</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="h-4 w-4" />
                <span>New Invoice</span>
              </button>
            </div>

            {/* Invoice Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 font-medium">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-700">
                      ${invoices.reduce((sum, inv) => sum + inv.deposit, 0).toLocaleString()}
                    </p>
                    <p className="text-green-500 text-sm">This month</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-600 font-medium">Outstanding</p>
                    <p className="text-2xl font-bold text-yellow-700">
                      ${invoices.filter(i => i.status === 'partial').reduce((sum, inv) => sum + (inv.amount - inv.deposit), 0).toLocaleString()}
                    </p>
                    <p className="text-yellow-500 text-sm">Pending payment</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <AlertCircle className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 font-medium">Total Invoices</p>
                    <p className="text-2xl font-bold text-blue-700">{invoices.length}</p>
                    <p className="text-blue-500 text-sm">This month</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 font-medium">Avg Payment</p>
                    <p className="text-2xl font-bold text-purple-700">
                      ${Math.round(invoices.reduce((sum, inv) => sum + inv.amount, 0) / invoices.length).toLocaleString()}
                    </p>
                    <p className="text-purple-500 text-sm">Per invoice</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice List */}
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h4 className="font-bold text-lg text-gray-800">{invoice.id}</h4>
                          <p className="text-gray-600 font-medium">{invoice.client}</p>
                        </div>
                        <div className="hidden md:block">
                          <p className="text-sm text-gray-500">Total: ${invoice.amount}</p>
                          <p className="text-sm text-gray-500">Paid: ${invoice.deposit}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Balance Due</p>
                        <p className="text-xl font-bold text-gray-800">${invoice.amount - invoice.deposit}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-800">${invoice.amount}</p>
                        <span className={`inline-block px-4 py-2 text-sm font-medium rounded-full ${
                          invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                          invoice.status === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {invoice.status === 'paid' ? 'Fully Paid' : 
                           invoice.status === 'partial' ? 'Partial Payment' : 'Unpaid'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Payment Progress</span>
                      <span>{Math.round((invoice.deposit / invoice.amount) * 100)}% paid</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          invoice.status === 'paid' ? 'bg-green-500' : 
                          invoice.status === 'partial' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${(invoice.deposit / invoice.amount) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                          View Details
                        </button>
                        <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                          Send Reminder
                        </button>
                        {invoice.status === 'partial' && (
                          <button className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                            Record Payment
                          </button>
                        )}
                        <button className="px-3 py-1 text-sm bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors">
                          Download PDF
                        </button>
                      </div>
                      <div className="text-sm text-gray-500">
                        {invoice.status === 'partial' && `${invoice.amount - invoice.deposit} remaining`}
                        {invoice.status === 'paid' && 'Payment complete'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <h4 className="font-bold mb-4 text-gray-800">Quick Actions</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors text-left">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Plus className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Create Invoice</p>
                      <p className="text-sm text-gray-500">From approved quote</p>
                    </div>
                  </div>
                </button>
                
                <button className="p-4 bg-white rounded-lg border border-green-200 hover:bg-green-50 transition-colors text-left">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Record Payment</p>
                      <p className="text-sm text-gray-500">Update payment status</p>
                    </div>
                  </div>
                </button>
                
                <button className="p-4 bg-white rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors text-left">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Send Reminders</p>
                      <p className="text-sm text-gray-500">Bulk payment reminders</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'invoices' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Invoices Management</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="h-4 w-4" />
                <span>New Invoice</span>
              </button>
            </div>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-lg text-gray-800">{invoice.id} - {invoice.client}</h4>
                      <p className="text-gray-600">Total Amount: ${invoice.amount}</p>
                      <p className="text-sm text-gray-500">Deposit Received: ${invoice.deposit}</p>
                      <p className="text-sm text-gray-500">Balance Due: ${invoice.amount - invoice.deposit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-800">${invoice.amount}</p>
                      <p className="text-sm text-gray-600 mb-2">Paid: ${invoice.deposit}</p>
                      <span className={`inline-block px-4 py-2 text-sm font-medium rounded-full ${
                        invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                        invoice.status === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {invoice.status === 'paid' ? 'Fully Paid' : 
                         invoice.status === 'partial' ? 'Partial Payment' : 'Unpaid'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                          View Details
                        </button>
                        <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                          Send Reminder
                        </button>
                        {invoice.status === 'partial' && (
                          <button className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                            Record Payment
                          </button>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {invoice.status === 'partial' && `${invoice.amount - invoice.deposit} remaining`}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Invoice Summary Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 font-medium">Paid Invoices</p>
                    <p className="text-2xl font-bold text-green-700">
                      ${invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-600 font-medium">Pending Payments</p>
                    <p className="text-2xl font-bold text-yellow-700">
                      ${invoices.filter(i => i.status === 'partial').reduce((sum, inv) => sum + (inv.amount - inv.deposit), 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <AlertCircle className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 font-medium">Total Invoices</p>
                    <p className="text-2xl font-bold text-blue-700">{invoices.length}</p>
                    <p className="text-sm text-blue-500">This month</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BytystERPDashboard;