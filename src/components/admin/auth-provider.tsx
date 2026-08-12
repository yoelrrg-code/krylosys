'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser, loginUser, logoutUser } from '@/app/admin/actions'
import { Loader2, Lock, Mail, AlertCircle, KeyRound } from 'lucide-react'

interface AuthUser {
  email: string
  name: string
  role: string
}

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => ({ success: false }),
  logout: async () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let isSubscribed = true
    getCurrentUser().then((u) => {
      if (isSubscribed) {
        setUser(u)
        setLoading(false)
      }
    })
    return () => {
      isSubscribed = false
    }
  }, [])

  const handleLogin = async (email: string, pass: string) => {
    setSubmitting(true)
    setLoginError('')
    const res = await loginUser(email, pass)

    if (res.success && res.user) {
      setUser(res.user)
      setLoading(true)
      window.location.reload()
      return { success: true }
    } else {
      setSubmitting(false)
      const err = res.error || 'Credenciales inválidas'
      setLoginError(err)
      return { success: false, error: err }
    }
  }

  const handleLogout = async () => {
    setLoading(true)
    await logoutUser()
    window.location.reload()
  }

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!loginEmail || !loginPassword) {
      setLoginError('Por favor ingresá tu correo y contraseña')
      return
    }
    await handleLogin(loginEmail, loginPassword)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060913] flex flex-col items-center justify-center gap-3 text-slate-400 font-sans select-none">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
        <span className="text-xs font-medium tracking-wide">Verificando sesión...</span>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#060913] flex items-center justify-center p-4 font-sans select-none">
        <div className="w-full max-w-md bg-[#0D1322] border border-slate-800 rounded-2xl p-8 shadow-2xl shadow-cyan-950/20 space-y-6">
          
          {/* Header & Logo */}
          <div className="text-center space-y-3">
            <div className="inline-flex w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 items-center justify-center font-black text-xl shadow-lg shadow-cyan-500/20">
              K
            </div>
            <h1 className="text-xl font-bold text-slate-100 tracking-tight">
              Acceso al Panel Admin
            </h1>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Ingresá tus credenciales de administrador para acceder a Krylosys.
            </p>
          </div>

          {/* Error Alert */}
          {loginError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-xs text-red-400 flex items-center gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={onFormSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="block font-semibold text-slate-300">
                Correo Electrónico
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 absolute left-3 text-slate-500 pointer-events-none" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@krylosys.com"
                  className="w-full pl-9 pr-4 py-2.5 bg-[#060913] border border-slate-800 rounded-lg text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block font-semibold text-slate-300">
                Contraseña
              </label>
              <div className="relative flex items-center">
                <KeyRound className="w-4 h-4 absolute left-3 text-slate-500 pointer-events-none" />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 bg-[#060913] border border-slate-800 rounded-lg text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-lg text-xs shadow-md shadow-cyan-500/10 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Iniciar Sesión</span>
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, loading, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}
