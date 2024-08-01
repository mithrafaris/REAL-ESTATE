import React from 'react';

function Dashboard() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold">REAL ESTATE</h1>
        </div>
        <nav className="flex-grow">
          <ul>
            <li className="p-4 hover:bg-gray-700">
              <a href="#">Sales</a>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <a href="#">Customers</a>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <a href="#">Settings</a>
            </li>
            <li className="p-4 hover:bg-gray-700">
            <a href="#">logout</a>
          </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <div>
            <button className="px-4 py-2 bg-slate-900 text-white rounded-lg">LOGIN</button>
          </div>
        </header>

        {/* Dashboard Widgets */}
        <main className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Widget 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium mb-2">Total Sales</h2>
              <p className="text-3xl font-bold">$12,500</p>
            </div>

            {/* Widget 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium mb-2">New Customers</h2>
              <p className="text-3xl font-bold">250</p>
            </div>

            {/* Widget 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium mb-2">Active Users</h2>
              <p className="text-3xl font-bold">1,200</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
