# 🔐 Auth System — Next.js + Laravel

Projeto fullstack de autenticação com **Next.js (frontend)** e **Laravel (backend)**.

O sistema implementa um fluxo completo de autenticação, incluindo login, cadastro, recuperação de senha e proteção de rotas com JWT.

---

## 🚀 Tecnologias

### Frontend

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS

### Backend

* Laravel
* JWT (phposourcesaver/jwt-auth)
* MySQL

---

## 📁 Estrutura do Projeto

```
login-screen/
│
├── backend/     # API Laravel
├── frontend/    # Aplicação Next.js
└── README.md    # Documentação principal
```

---

## ✨ Funcionalidades

### 🔐 Autenticação

* Registro de usuário
* Login com validação
* Logout com invalidação de token (JWT)
* Proteção de rotas com middleware

---

### 🔁 Recuperação de Senha

Fluxo implementado:

1. Usuário informa o e-mail
2. Um token é gerado (válido por 30 minutos)
3. Usuário insere o código recebido
4. Usuário redefine a senha
5. Token é removido do banco após uso

> ⚠️ O sistema não informa se o e-mail existe ou não (boa prática de segurança)

---

## 🧱 Frontend

### 📁 Páginas

```
/                   → Login
/register           → Cadastro
/forgot-password    → Solicitar recuperação
/forgot-password/verify → Validar código
/forgot-password/reset-password → Redefinir senha
```

---

### 🎯 Destaques

* Formulários controlados (React)
* Feedback visual de loading
* Tratamento de erros da API
* Acessibilidade (ARIA + labels)
* Componentização (ex: EyeIcon)
* Integração com API via variável global (`NEXT_PUBLIC_API_URL`)

---

## 🔑 API (Laravel)

### Rotas Públicas

```
POST /api/register
POST /api/login
POST /api/forgot-password
POST /api/verify-reset-token
POST /api/reset-password
```

---

### Rotas Protegidas (JWT)

```
GET  /api/me
POST /api/logout
GET  /api/dashboard
```

---

## ⚙️ Configuração

### 🔧 Backend

```bash
cd backend

composer install
cp .env.example .env

php artisan key:generate
php artisan jwt:secret
php artisan migrate

php artisan serve
```

---

### 💻 Frontend

```bash
cd frontend

npm install
npm run dev
```

---

## 🌐 Variáveis de Ambiente

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## ♿ Acessibilidade

* Inputs com `label` e `htmlFor`
* `aria-label` em elementos sem label visível
* `role="alert"` para feedback
* `autoComplete` correto
* Inputs desabilitados durante loading

---

## 🚧 Próximos Passos

* [ ] Proteção de rotas no frontend (middleware Next.js)
* [ ] Persistência de login (localStorage ou cookies)
* [ ] Dashboard funcional
* [ ] Integração com envio real de e-mail
* [ ] OAuth (Google / GitHub)

---

## 🧠 Observações

* Projeto com foco em aprendizado de arquitetura fullstack
* Código organizado seguindo boas práticas de validação e separação de responsabilidades
* Backend estruturado com Controller + validação via Laravel

---
