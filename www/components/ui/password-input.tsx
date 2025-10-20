'use client'

import { useState, useMemo } from 'react'
import { Input } from './input'
import { Button } from './button'
import { Check, X, Sparkles } from 'lucide-react'

export interface PasswordRequirement {
  label: string
  met: boolean
}

export function validatePassword(password: string): PasswordRequirement[] {
  return [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Contains number', met: /[0-9]/.test(password) },
    { label: 'Contains special character (!@#$%^&*)', met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) }
  ]
}

export function generateStrongPassword(): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const special = '!@#$%^&*'
  
  // Ensure at least one of each required character type
  let password = ''
  password += uppercase[Math.floor(Math.random() * uppercase.length)]
  password += lowercase[Math.floor(Math.random() * lowercase.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += special[Math.floor(Math.random() * special.length)]
  
  // Fill the rest randomly (total 16 characters)
  const allChars = uppercase + lowercase + numbers + special
  for (let i = password.length; i < 16; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)]
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('')
}

export function isPasswordValid(password: string): boolean {
  const requirements = validatePassword(password)
  return requirements.every(req => req.met)
}

interface PasswordInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  showGenerator?: boolean
  showRequirements?: boolean
  className?: string
}

export function PasswordInput({
  id,
  label,
  value,
  onChange,
  required = false,
  showGenerator = false,
  showRequirements = true,
  className = ''
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const passwordRequirements = useMemo(() => {
    if (!value) return []
    return validatePassword(value)
  }, [value])

  const isValid = useMemo(() => {
    return passwordRequirements.length > 0 && passwordRequirements.every(req => req.met)
  }, [passwordRequirements])

  function handleGeneratePassword() {
    const newPassword = generateStrongPassword()
    onChange(newPassword)
    setShowPassword(true)
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium" htmlFor={id}>
          {label}
          {required && ' *'}
        </label>
        {showGenerator && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleGeneratePassword}
            className="h-7 text-xs"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Generate
          </Button>
        )}
      </div>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={value && !isValid ? 'border-destructive' : ''}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      
      {/* Password Requirements */}
      {showRequirements && value && (
        <div className="space-y-1.5 pt-1">
          {passwordRequirements.map((req, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs">
              {req.met ? (
                <Check className="w-3.5 h-3.5 text-green-600" />
              ) : (
                <X className="w-3.5 h-3.5 text-muted-foreground" />
              )}
              <span className={req.met ? 'text-green-600' : 'text-muted-foreground'}>
                {req.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

