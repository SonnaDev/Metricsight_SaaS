'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function SettingsPage() {
  const { data: session, update } = useSession()

  const [name, setName] = useState(session?.user?.name ?? '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [nameSuccess, setNameSuccess] = useState('')
  const [nameError, setNameError] = useState('')
  const [nameLoading, setNameLoading] = useState(false)

  const [passSuccess, setPassSuccess] = useState('')
  const [passError, setPassError] = useState('')
  const [passLoading, setPassLoading] = useState(false)

  async function handleNameUpdate(e: React.FormEvent) {
    e.preventDefault()
    setNameLoading(true)
    setNameError('')
    setNameSuccess('')

    const res = await fetch('/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })

    const data = await res.json()

    if (!res.ok) {
      setNameError(data.error)
    } else {
      setNameSuccess('Name updated successfully')
      await update({ name })
    }

    setNameLoading(false)
  }

  async function handlePasswordUpdate(e: React.FormEvent) {
    e.preventDefault()
    setPassLoading(true)
    setPassError('')
    setPassSuccess('')

    if (newPassword !== confirmPassword) {
      setPassError('New passwords do not match')
      setPassLoading(false)
      return
    }

    const res = await fetch('/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword }),
    })

    const data = await res.json()

    if (!res.ok) {
      setPassError(data.error)
    } else {
      setPassSuccess('Password updated successfully')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }

    setPassLoading(false)
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h2 className="text-lg font-medium mb-6">Settings</h2>

      {/* Profile section */}
      <div className="bg-white rounded-xl border p-6 mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">
          Profile
        </h3>
        <form onSubmit={handleNameUpdate} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-500 block mb-1">
              Email
            </label>
            <input
              type="email"
              value={session?.user?.email ?? ''}
              disabled
              className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">
              Email cannot be changed
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">
              Full name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="Your name"
              required
            />
          </div>
          {nameError && (
            <p className="text-red-500 text-sm">{nameError}</p>
          )}
          {nameSuccess && (
            <p className="text-green-500 text-sm">{nameSuccess}</p>
          )}
          <div>
            <button
              type="submit"
              disabled={nameLoading}
              className="bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700 disabled:opacity-50"
            >
              {nameLoading ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Password section */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">
          Change password
        </h3>
        <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-500 block mb-1">
              Current password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">
              New password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="min. 6 characters"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">
              Confirm new password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="••••••••"
              required
            />
          </div>
          {passError && (
            <p className="text-red-500 text-sm">{passError}</p>
          )}
          {passSuccess && (
            <p className="text-green-500 text-sm">{passSuccess}</p>
          )}
          <div>
            <button
              type="submit"
              disabled={passLoading}
              className="bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700 disabled:opacity-50"
            >
              {passLoading ? 'Updating...' : 'Update password'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}