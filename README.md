# 🔐 Auth System — Next.js + Laravel
 
Projeto fullstack de autenticação com **Next.js (frontend)** e **Laravel (backend)**.
 
O sistema implementa um fluxo completo de autenticação, incluindo login, cadastro, recuperação de senha e proteção de rotas com JWT. Desenvolvido com foco em aprendizado de arquitetura fullstack.
 
---
 
## 📁 Estrutura do Projeto
 
```
login-screen/
│
├── backend/     → API Laravel (ver backend/README.md)
├── frontend/    → Aplicação Next.js (ver frontend/README.md)
└── README.md    → Visão geral do projeto
```
 
---
 
## 🚀 Tecnologias
 
| Camada | Tecnologias |
|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend | Laravel, JWT (php-open-source-saver/jwt-auth), MySQL |
 
---
 
## ✨ Funcionalidades
 
**Autenticação**
- Registro de usuário com validação
- Login com geração de token JWT
- Logout com invalidação de token
- Proteção de rotas via middleware JWT
**Recuperação de senha**
1. Usuário informa o e-mail
2. Token de 6 caracteres gerado (válido por 30 minutos)
3. Usuário insere o código recebido
4. Usuário redefine a senha
5. Token removido do banco após uso
> O sistema nunca informa se o e-mail existe ou não — proteção contra enumeração de usuários.
 
---
 
## ⚙️ Setup rápido
 
```bash
# Backend
cd backend
composer install && cp .env.example .env
php artisan key:generate && php artisan jwt:secret && php artisan migrate
php artisan serve
 
# Frontend (outro terminal)
cd frontend
npm install && npm run dev
```
 
Documentação detalhada em cada subpasta.
 
---
 
## 🚧 Próximos Passos
 
- [ ] Envio real de e-mail para recuperação de senha
- [ ] Proteção de rotas no frontend (middleware Next.js)
- [ ] Persistência de sessão (cookies httpOnly)
- [ ] Dashboard funcional
- [ ] OAuth (Google / GitHub)