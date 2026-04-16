# Backend — Laravel API

API RESTful de autenticação construída com **Laravel**, usando **JWT** para proteção de rotas e **MySQL** como banco de dados.

---

## 📁 Estrutura Relevante

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── AuthController.php   → Lógica de autenticação
│   │   └── Middleware/              → Middleware JWT
│   └── Models/
│       └── User.php
├── database/
│   └── migrations/                  → Estrutura do banco
├── routes/
│   └── api.php                      → Definição das rotas
└── .env                             → Configuração do ambiente
```

---

## ⚙️ Instalação

```bash
composer install
cp .env.example .env

php artisan key:generate
php artisan jwt:secret
php artisan migrate

php artisan serve
```

A API estará disponível em `http://localhost:8000`.

---

## 🌐 Variáveis de Ambiente (.env)

```env
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nome_do_banco
DB_USERNAME=root
DB_PASSWORD=

JWT_SECRET=        # gerado pelo php artisan jwt:secret
JWT_TTL=60         # tempo de vida do token em minutos
```

---

## 🗄️ Banco de Dados

### Tabela `tb_users`

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | bigint | Chave primária |
| `st_name` | string | Nome do usuário |
| `st_email` | string | E-mail único |
| `st_password` | string | Senha |
| `id_role` | int | Perfil (1: Admin, 2: User) |
| `id_created_by` | int | Referência de quem criou |
| `st_reset_token` | string | Token de recuperação de senha |
| `dt_reset_token_expires_at` | timestamp | Expiração do token |
| `bl_active` | boolean | Status do usuário |
| `dt_created_at` | timestamp | Data de criação |
| `dt_updated_at` | timestamp | Data de atualização |

---

## 🔑 Rotas

### Públicas

| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/auth/register` | Cadastro de usuário |
| POST | `/api/auth/login` | Login e geração de token JWT |
| POST | `/api/auth/forgot-password` | Solicitar recuperação de senha |
| POST | `/api/auth/verify-reset-token` | Validar token de recuperação |
| POST | `/api/auth/reset-password` | Redefinir senha |

### Protegidas (JWT obrigatório)

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/auth/profile` | Dados do usuário autenticado |
| POST | `/api/auth/logout` | Logout e invalidação do token |
| GET | `/api/auth/dashboard` | Rota protegida de exemplo |

---

## 🔒 Autenticação JWT

Rotas protegidas exigem o token no header:

```
Authorization: Bearer {token}
```

---

## 🚧 Pendências

- [ ] Envio real de e-mail
- [ ] Implementar `profile()` no AuthController
- [ ] Implementar `dashboard()` no AuthController