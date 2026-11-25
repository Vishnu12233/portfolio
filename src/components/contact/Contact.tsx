import { motion } from 'framer-motion'
import { Check, Copy, Loader2, Mail, Send, Sparkles } from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import { contactConfig, profile, social } from '../../data/portfolio'
import { cn } from '../../lib/utils'
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

type Status =
  | { type: 'idle' }
  | { type: 'submitting' }
  | { type: 'success' }
  | { type: 'error'; message: string }
  | { type: 'info'; message: string }

const initial: FormState = { name: '', email: '', subject: '', message: '' }

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function Contact() {
  const [form, setForm] = useState<FormState>(initial)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<Status>({ type: 'idle' })
  const [copied, setCopied] = useState(false)

  const errors = useMemo(() => {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) next.name = 'Full name is required.'
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!isValidEmail(form.email)) next.email = 'Enter a valid email address.'
    if (!form.subject.trim()) next.subject = 'Subject is required.'
    if (!form.message.trim()) next.message = 'Message is required.'
    else if (form.message.trim().length < 10)
      next.message = 'Message should be at least 10 characters.'
    return next
  }, [form])

  const links = [
    {
      label: 'Email',
      href: `mailto:${social.email}`,
      icon: Mail,
      display: social.email,
    },
    {
      label: 'GitHub',
      href: social.github,
      icon: GithubIcon,
      display: 'github.com/Vishnu12233',
    },
    {
      label: 'LinkedIn',
      href: social.linkedin,
      icon: LinkedinIcon,
      display: 'linkedin.com/in/vishnu-vishnu',
    },
  ]

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(social.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setStatus({
        type: 'info',
        message: `Copy this address manually: ${social.email}`,
      })
    }
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setTouched({ name: true, email: true, subject: true, message: true })

    if (Object.keys(errors).length > 0) {
      setStatus({
        type: 'error',
        message: 'Please fix the highlighted fields before sending.',
      })
      return
    }

    const formspreeId = contactConfig.formspreeId
    if (!formspreeId) {
      const params = new URLSearchParams({
        subject: form.subject,
        body: `From: ${form.name} <${form.email}>\n\n${form.message}`,
      })
      window.location.href = `mailto:${social.email}?${params.toString()}`
      setStatus({
        type: 'info',
        message:
          'Your email app is opening with a pre-filled draft. The message is only sent once you send it from that app.',
      })
      return
    }

    setStatus({ type: 'submitting' })
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      if (!response.ok) {
        throw new Error('Delivery failed. Please try again or email me directly.')
      }
      setForm(initial)
      setTouched({})
      setStatus({ type: 'success' })
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong while sending.',
      })
    }
  }

  const fieldClass =
    'w-full rounded-xl border border-line bg-white px-4 py-3.5 text-sm text-ink outline-none transition placeholder:text-muted/50 focus:border-purple/40 focus:ring-2 focus:ring-purple/10'

  return (
    <section id="contact" className="section-shell relative overflow-hidden bg-canvas">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,58,237,0.08),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 dot-grid opacity-20"
      />
      <div className="container-shell relative">
        <SectionHeading
          index="06"
          eyebrow="Contact"
          title="Let's Build Something Extraordinary."
          description="Have an idea, a project, or an opportunity? Let's connect and turn it into something meaningful."
          align="center"
        />

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.86fr_1.14fr]">
          <Reveal>
            <aside className="flex h-full flex-col rounded-[2rem] border border-line bg-white p-7 shadow-soft sm:p-8">
              <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-violet-50 via-white to-cyan-50">
                <div className="absolute inset-0 dot-grid opacity-30" />
                <div className="relative flex h-24 w-24 items-center justify-center">
                  <span className="absolute inset-0 rounded-full border border-purple/20" />
                  <span className="absolute inset-4 rounded-full border border-dashed border-blue/25" />
                  <span className="absolute inset-8 rounded-full bg-gradient-to-br from-purple/20 to-cyan/20 blur-md" />
                  <Mail size={28} className="relative text-purple" />
                  <span className="absolute -right-1 top-2 h-2 w-2 rounded-full bg-cyan" />
                </div>
                <span className="absolute bottom-3 left-3 font-mono text-[7px] uppercase tracking-[0.18em] text-muted/50">
                  Open channel / 01
                </span>
              </div>

              <div className="mt-7 flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-700">
                  {profile.status}
                </p>
              </div>

              <h3 className="mt-3 font-display text-2xl font-semibold text-ink">
                Direct lines.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                The fastest way to reach me is email. I&apos;m also active on
                GitHub and LinkedIn.
              </p>

              <div className="mt-6 space-y-2">
                {links.map((link) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition hover:border-line hover:bg-canvas"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-canvas text-purple transition group-hover:bg-white">
                        <Icon size={15} />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                          {link.label}
                        </span>
                        <span className="block truncate text-sm font-medium text-ink">
                          {link.display}
                        </span>
                      </span>
                    </a>
                  )
                })}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-5">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-xs text-ink transition hover:border-purple/30 hover:text-purple"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? 'Email copied' : 'Copy email'}
                </button>
                <span className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-muted/50">
                  <Mail size={10} />
                  Email preferred
                </span>
              </div>
            </aside>
          </Reveal>

          <Reveal delay={0.08}>
            <motion.form
              onSubmit={onSubmit}
              noValidate
              className="grid gap-4 rounded-[2rem] border border-line bg-white p-6 shadow-soft sm:grid-cols-2 sm:p-8"
            >
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-purple">
                    Send a message
                  </p>
                  <Sparkles size={13} className="text-muted/40" />
                </div>
                <p className="mt-2 text-sm text-muted">
                  Tell me what you&apos;re building, exploring, or imagining.
                </p>
              </div>

              {(
                [
                  ['name', 'Full Name', 'text', 'Your full name', 'name', 'name'],
                  ['email', 'Email Address', 'email', 'you@example.com', 'email', 'email'],
                  ['subject', 'Subject', 'text', 'What is this about?', 'subject', 'off'],
                ] as const
              ).map(([key, label, type, placeholder, name, autoComplete]) => {
                const errorId = `${key}-error`
                const hasError = Boolean(touched[key] && errors[key])
                return (
                  <label
                    key={key}
                    className={cn('block space-y-2', key === 'subject' && 'sm:col-span-2')}
                  >
                    <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
                      {label}
                    </span>
                    <input
                      type={type}
                      name={name}
                      autoComplete={autoComplete}
                      value={form[key]}
                      placeholder={placeholder}
                      className={cn(fieldClass, hasError && 'border-rose-400')}
                      onBlur={() =>
                        setTouched((previous) => ({ ...previous, [key]: true }))
                      }
                      onChange={(event) =>
                        setForm((previous) => ({
                          ...previous,
                          [key]: event.target.value,
                        }))
                      }
                      aria-invalid={hasError}
                      aria-describedby={hasError ? errorId : undefined}
                    />
                    {hasError ? (
                      <span id={errorId} className="block text-xs text-rose-500">
                        {errors[key]}
                      </span>
                    ) : null}
                  </label>
                )
              })}

              <label className="block space-y-2 sm:col-span-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
                  Message
                </span>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  placeholder="Tell me about your idea..."
                  className={cn(
                    fieldClass,
                    'resize-y',
                    touched.message && errors.message && 'border-rose-400',
                  )}
                  onBlur={() =>
                    setTouched((previous) => ({ ...previous, message: true }))
                  }
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      message: event.target.value,
                    }))
                  }
                  aria-invalid={Boolean(touched.message && errors.message)}
                  aria-describedby={
                    touched.message && errors.message ? 'message-error' : undefined
                  }
                />
                {touched.message && errors.message ? (
                  <span id="message-error" className="block text-xs text-rose-500">
                    {errors.message}
                  </span>
                ) : null}
              </label>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={status.type === 'submitting'}
                  className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white shadow-soft transition hover:bg-purple disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status.type === 'submitting' ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <Send size={15} />
                  )}
                  {status.type === 'submitting' ? 'Sending…' : 'Send Message'}
                </button>

                <div aria-live="polite">
                  {status.type === 'success' ? (
                    <p className="mt-4 text-sm text-emerald-600" role="status">
                      Message delivered. I&apos;ll get back to you soon.
                    </p>
                  ) : null}
                  {status.type === 'error' ? (
                    <p className="mt-4 text-sm text-rose-500" role="alert">
                      {status.message}
                    </p>
                  ) : null}
                  {status.type === 'info' ? (
                    <p className="mt-4 text-sm leading-relaxed text-amber-700" role="status">
                      {status.message}
                    </p>
                  ) : null}
                </div>

                <p className="mt-4 text-[10px] leading-relaxed text-muted/60">
                  {contactConfig.formspreeId
                    ? 'Your message is delivered through Formspree.'
                    : 'No email service is configured, so this form opens a real email draft in your default mail app.'}
                </p>
              </div>
            </motion.form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
