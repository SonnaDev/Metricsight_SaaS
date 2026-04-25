'use client'

import { useEffect, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar,
} from 'recharts'

type Stats = {
  userCount: number
  orgCount: number
  revenue: number
  userGrowth: { month: string; users: number }[]
}

const revenueData = [
  { month: 'Jan', revenue: 420 },
  { month: 'Feb', revenue: 800 },
  { month: 'Mar', revenue: 1200 },
  { month: 'Apr', revenue: 1800 },
  { month: 'May', revenue: 2400 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 4100 },
  { month: 'Aug', revenue: 5200 },
  { month: 'Sep', revenue: 6100 },
  { month: 'Oct', revenue: 6900 },
  { month: 'Nov', revenue: 7600 },
  { month: 'Dec', revenue: 8340 },
]

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data)
        setLoading(false)
      })
  }, [])

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h2 className="text-lg font-medium mb-6">Overview</h2>

      {/* Metric cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-medium mt-1">
            {loading ? '...' : stats?.userCount.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-2xl font-medium mt-1">
            {loading ? '...' : `$${stats?.revenue.toLocaleString()}`}
          </p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-gray-500">Active Orgs</p>
          <p className="text-2xl font-medium mt-1">
            {loading ? '...' : stats?.orgCount}
          </p>
        </div>
      </div>

      {/* Line chart */}
      <div className="bg-white rounded-xl border p-6 mb-6">
        <h2 className="text-sm font-medium text-gray-700 mb-4">User Growth</h2>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={stats?.userGrowth}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#111827" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar chart */}
      <div className="bg-white rounded-xl border p-6">
        <h2 className="text-sm font-medium text-gray-700 mb-4">Monthly Revenue</h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
            <Bar dataKey="revenue" fill="#111827" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  )
}