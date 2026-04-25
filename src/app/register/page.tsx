'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error)
        return
      }

      router.push('/login?registered=true')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white border rounded-xl p-8 w-full max-w-sm">
        <h1 className="text-xl font-medium mb-2">Create your account</h1>
        <p className="text-sm text-gray-400 mb-6">Start your MetricSight workspace</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-500 block mb-1">Full name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="min. 6 characters"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-900 text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-700 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        <p className="text-sm text-gray-400 text-center mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-gray-900 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}