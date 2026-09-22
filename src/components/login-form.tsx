import { useState } from "react"
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type StoredUser = {
  name: string
  email: string
  password: string
}

type LoginFormProps = React.ComponentProps<"form"> & {
  onAuthenticated: () => void
}

export function LoginForm({
  className,
  onAuthenticated,
  ...props
}: LoginFormProps) {
  const [isRegistering, setIsRegistering] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") || "").trim()
    const email = String(formData.get("email") || "").trim().toLowerCase()
    const password = String(formData.get("password") || "")
    const users: StoredUser[] = JSON.parse(
      localStorage.getItem("workspace-users") || "[]",
    )

    if (isRegistering) {
      if (password.length < 6) {
        setError("A senha precisa ter pelo menos 6 caracteres.")
        setIsSubmitting(false)
        return
      }

      if (users.some((user) => user.email === email)) {
        setError("Já existe uma conta com este e-mail.")
        setIsSubmitting(false)
        return
      }

      localStorage.setItem(
        "workspace-users",
        JSON.stringify([...users, { name, email, password }]),
      )
    } else {
      const user = users.find(
        (storedUser) =>
          storedUser.email === email && storedUser.password === password,
      )

      if (!user) {
        setError("E-mail ou senha incorretos.")
        setIsSubmitting(false)
        return
      }
    }

    localStorage.setItem("workspace-session", "authenticated")
    onAuthenticated()
    setIsSubmitting(false)
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {isRegistering ? "Crie sua conta" : "Bem-vindo de volta"}
          </h1>
          <p className="text-sm text-balance text-muted-foreground">
            {isRegistering
              ? "Comece a organizar seu trabalho em um só lugar."
              : "Entre para continuar no seu espaço de trabalho."}
          </p>
        </div>
        {isRegistering && (
          <Field>
            <FieldLabel htmlFor="name">Nome</FieldLabel>
            <div className="relative">
              <UserRound className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Seu nome"
                className="pl-9"
                autoComplete="name"
                required
              />
            </div>
          </Field>
        )}
        <Field>
          <FieldLabel htmlFor="email">E-mail</FieldLabel>
          <div className="relative">
            <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="voce@exemplo.com"
              className="pl-9"
              autoComplete="email"
              required
            />
          </div>
        </Field>
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            {!isRegistering && (
              <button
                type="button"
                className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                onClick={() =>
                  setError(
                    "Entre em contato com o suporte para redefinir sua senha.",
                  )
                }
              >
                Esqueci minha senha
              </button>
            )}
          </div>
          <div className="relative">
            <LockKeyhole className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="pr-10 pl-9"
              autoComplete={
                isRegistering ? "new-password" : "current-password"
              }
              required
            />
            <button
              type="button"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword((visible) => !visible)}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </Field>
        <FieldError>{error}</FieldError>
        <Field>
          <Button type="submit" className="h-10 w-full" disabled={isSubmitting}>
            {isSubmitting
              ? "Aguarde..."
              : isRegistering
                ? "Criar conta"
                : "Entrar"}
          </Button>
        </Field>
        <FieldDescription className="text-center">
          {isRegistering ? "Já tem uma conta?" : "Ainda não tem uma conta?"}{" "}
          <button
            type="button"
            className="font-medium text-foreground underline underline-offset-4"
            onClick={() => {
              setIsRegistering((registering) => !registering)
              setError("")
            }}
          >
            {isRegistering ? "Entrar" : "Criar conta"}
          </button>
        </FieldDescription>
      </FieldGroup>
    </form>
  )
}
