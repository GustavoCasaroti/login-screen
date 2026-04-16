# Frontend — Next.js

Interface de autenticação construída com **Next.js (App Router)**, **TypeScript** e **Tailwind CSS**.

---

## 📁 Estrutura Relevante

```
frontend/
├── app/
│   ├── page.tsx                              → Login (/)
│   ├── register/
│   │   └── page.tsx                          → Cadastro
│   └── forgot-password/
│       ├── page.tsx                          → Solicitar recuperação
│       ├── verify/
│       │   └── page.tsx                      → Validar código
│       └── reset-password/
│           └── page.tsx                      → Redefinir senha
├── components/
│   └── ui/
│       └── EyeIcon.tsx                       → Ícone olho compartilhado
├── lib/
│   └── api.ts                                → URL base da API
└── .env.local                                → Variáveis de ambiente
```

---

## ⚙️ Instalação

```bash
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

---

## 🌐 Variáveis de Ambiente (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 📄 Páginas

### Login (`/`)
- Formulário com `email` e `password`
- `autoComplete="email"` e `autoComplete="current-password"`
- Estado de loading com spinner animado
- Exibição de erro com `role="alert"`
- Checkbox "Manter conectado"
- Botões de login social (Google e GitHub) — sem integração
- Layout split: painel decorativo (oculto em mobile) + formulário
- Logo responsiva por breakpoint

### Cadastro (`/register`)
- Formulário com `name`, `email`, `password` e `confirmPassword`
- Checklist de requisitos de senha em tempo real:
  - Mínimo 6 caracteres
  - Letra maiúscula e minúscula
  - Caractere especial
- Estados de visibilidade independentes por campo de senha
- Validação de senhas coincidentes antes do submit
- `useRef` com cleanup de timeout para evitar memory leak

### Recuperação de senha (`/forgot-password`)
- Formulário com `email`
- Feedback de sucesso com redirecionamento automático para `/verify`
- `useRef` com cleanup de timeout no redirecionamento

### Verificação de código (`/forgot-password/verify`)
- Input para o código de 6 caracteres
- `autoComplete="one-time-code"` e `maxLength={6}`

### Redefinição de senha (`/forgot-password/reset-password`)
- Recebe token via query string (`?token=`)
- Checklist de requisitos igual ao cadastro
- Validação de token ausente com mensagem de erro imediata
- `useRef` com cleanup nos dois timeouts (blur e redirect)

---

## 🧱 Convenções de Código

- Inputs sempre controlados (`value` + `onChange`)
- Focus states via Tailwind (`focus:border-*`, `focus:ring-*`) — sem `e.target.style`
- Erros tratados com `err instanceof Error ? err.message : "Erro inesperado."`
- `try/catch/finally` em todas as chamadas de API
- Objetos de estilo estáticos declarados fora do componente
- `type="button"` explícito em todos os botões dentro de `<form>`
- `role="alert"` em todas as mensagens de feedback (erro e sucesso)
- Timeouts sempre guardados em `useRef` com cleanup no `useEffect`

---

## ♿ Acessibilidade

- `<label>` com `htmlFor` em inputs com label visível
- `aria-label` em inputs sem label visível e nos botões de olho
- `role="alert"` em todos os feedbacks ao usuário
- `autoComplete` correto por contexto
- `disabled` nos inputs durante loading
- `aria-label` dinâmico nos botões de mostrar/ocultar senha

---

## 🚧 Pendências

- [ ] Proteção de rotas com middleware Next.js
- [ ] Persistência de sessão após login (cookie / localStorage)
- [ ] Implementar OAuth (Google e GitHub)
- [ ] Dashboard funcional pós-login
- [ ] Tratar erros específicos da API por rota