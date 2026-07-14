# Website — Teiú

O **Website Teiú** é a plataforma institucional responsável por apresentar a empresa, produtos, serviços e demais conteúdos aos visitantes.

A aplicação é composta por:

- **Frontend** desenvolvido em **React + Vite**
- **Backend (API)** desenvolvido em **Laravel**, localizado na pasta `api/`

O frontend consome os conteúdos disponibilizados pela API através de requisições HTTP utilizando Axios.

---

# Estrutura do Projeto

```
website_teiu/
│
├── api/                        # Backend Laravel (API)
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── public/
│   ├── resources/
│   ├── routes/
│   ├── storage/
│   └── ...
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
```

---

# Requisitos

## Backend

- PHP 8.4+
- Composer
- MySQL 8+

## Frontend

- Node.js 20+
- npm

---

# Instalação

## 1. Clonar o repositório

```bash
git clone https://github.com/GIC-TEIU/website_teiu.git
cd website_teiu
```

---

# Configuração da API (Laravel)

A API encontra-se na pasta:

```bash
cd api
```

## Instalar dependências

```bash
composer install
```

---

## Criar o ficheiro `.env`

Copie o ficheiro de exemplo.

### Windows

```bash
copy .env.example .env
```

### Linux / macOS

```bash
cp .env.example .env
```

Configure o ficheiro `.env` conforme abaixo.

```env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8080

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=website_teiu
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=database

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=no-reply@teiu.com.br
MAIL_PASSWORD="SUA_SENHA_DO_APP"
MAIL_FROM_ADDRESS=no-reply@teiu.com.br
MAIL_FROM_NAME="CMS - Holding"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"
```



---

## Gerar a chave da aplicação

```bash
php artisan key:generate
```

---

## Executar as migrations

```bash
php artisan migrate
```

Caso existam seeders:

```bash
php artisan migrate --seed
```



---

## Limpar caches

```bash
php artisan optimize:clear
```

---

## Iniciar a API

```bash
php artisan serve --port=8000
```
## Iniciar a API correspondente ao CMS

```bash
php artisan serve --port=8080
```

A API ficará disponível em:

```
http://localhost:8080
```

---

# Configuração do Frontend

Volte para a raiz do projeto.

```bash
cd ..
```

Instale as dependências.

```bash
npm install
```

Caso necessário:

```bash
npm install axios react-router-dom lucide-react tailwindcss-animate
```

---

## Configurar o `.env`

Na raiz do frontend crie um ficheiro `.env`.

```env
VITE_API_URL=http://172.17.206.130:8000
VITE_CMS_URL=http://172.17.206.130:8080
```

---

## Executar o Website

```bash
npm run dev
```

O website estará disponível em:

```
http://localhost:5173
```

---

# Comunicação entre os Projetos

```
Utilizador
      │
      ▼
Website React (Vite)
      │
      │ Axios
      ▼
API Laravel
      │
      ▼
MySQL
```

---

# Scripts

## Frontend

Executar em desenvolvimento

```bash
npm run dev
```

Gerar build

```bash
npm run build
```



---

## Backend

Iniciar servidor

```bash
php artisan serve --port=8000
```




Limpar caches

```bash
php artisan optimize:clear
```

---

# Tecnologias

## Frontend

- React 18
- Vite
- Axios
- React Router DOM
- Tailwind CSS
- Lucide React

## Backend

- Laravel 11
- PHP 8.4+
- MySQL
- Eloquent ORM
- REST API

---


# Licença

Projeto desenvolvido pela **GIC - TEIÚ**.

---

<div align="center">

**Website Institucional — TEIÚ**

© 2024 GIC - Todos os direitos reservados.

</div>
