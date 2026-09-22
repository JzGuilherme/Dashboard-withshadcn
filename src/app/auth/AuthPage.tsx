import {
  BarChart3,
  CheckCircle2,
  KeyRound,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import { LoginForm } from "@/components/login-form"
import { Card, CardContent } from "@/components/ui/card"

type AuthPageProps = {
  onAuthenticated: () => void
}

export default function AuthPage({ onAuthenticated }: AuthPageProps) {
  return (
    <main className="min-h-svh bg-muted/30">
      <div className="grid min-h-svh lg:grid-cols-2">
        <section className="flex flex-col p-6 sm:p-10 lg:p-12">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </div>
            Workly
          </div>
          <div className="flex flex-1 items-center justify-center py-12">
            <Card className="w-full max-w-md border-border/60 shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <LoginForm onAuthenticated={onAuthenticated} />
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Ao continuar, você concorda com nossos termos de uso e política de
            privacidade.
          </p>
        </section>

        <section className="relative hidden overflow-hidden bg-primary p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -top-32 -right-32 size-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-24 size-96 rounded-full bg-white/10 blur-3xl" />
          <div className="relative">
            <div className="mb-12 flex size-12 items-center justify-center rounded-xl bg-white/15">
              <BarChart3 className="size-6" />
            </div>
            <h2 className="max-w-lg text-4xl font-semibold tracking-tight xl:text-5xl">
              Clareza para fazer o trabalho acontecer.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-primary-foreground/70">
              Acompanhe seus projetos, organize sua rotina e mantenha seu time
              alinhado em um único espaço.
            </p>
          </div>
          <div className="relative mx-auto my-8 w-full max-w-md">
            <div className="absolute -top-8 -right-4 size-24 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-8 -left-4 size-28 rounded-full bg-black/10 blur-2xl" />
            <div className="relative rotate-[-3deg] rounded-2xl border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-md">
              <div className="rounded-xl bg-background p-5 text-foreground shadow-lg">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <KeyRound className="size-4" />
                    </div>
                    <span className="text-sm font-semibold">Acesso seguro</span>
                  </div>
                  <ShieldCheck className="size-5 text-emerald-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-lg border bg-muted/40 px-3 py-2.5">
                    <Mail className="size-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      voce@exemplo.com
                    </span>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border bg-muted/40 px-3 py-2.5">
                    <LockKeyhole className="size-4 text-muted-foreground" />
                    <span className="text-xs tracking-[0.25em] text-muted-foreground">
                      ••••••••
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-1 text-xs text-emerald-600">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    Seus dados estão protegidos
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative space-y-4 text-sm text-primary-foreground/80">
            {["Visão geral em tempo real", "Colaboração sem atrito", "Decisões baseadas em dados"].map(
              (feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle2 className="size-4 text-primary-foreground/70" />
                  {feature}
                </div>
              ),
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
