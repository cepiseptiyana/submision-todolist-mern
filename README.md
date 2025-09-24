# Todo List App

**TodoList App** adalah aplikasi full-stack untuk mengelola daftar tugas sehari-hari.

## Prasyarat

Sebelum menjalankan aplikasi, pastikan Anda sudah menginstal **Node.js** dan **npm**.  
Disarankan menggunakan versi terbaru dari npm.

### Update npm (opsional)

```bash
npm install -g npm@latest
```

## Project Overview

Aplikasi ini adalah **TodoList App** yang dibangun dengan arsitektur **Frontend–Backend** terpisah:

- Frontend menggunakan React dengan Ant Design untuk UI.

- Backend menggunakan Node.js + Sequelize ORM.

- Database menggunakan PostgreSQL.

## Fitur yang diimplementasikan

- CRUD (Create, Read, Update, Delete) untuk **Todo**

- CRUD untuk **Category**

- Menandai Todo sebagai **completed / uncompleted**

- **Pencarian (search)** berdasarkan:

  - `title` pada Todo
  - `name` pada Category

- **Pagination** pada daftar Todo dan Category untuk efisiensi data.

- **Relasi**: `todos.category_id` (foreign key) → `categories.id`

<div align="right">
  <a href="#readme">⬆️ Back to top</a>
</div>

## Step-by-Step Setup & Installation

### Clone Repository

1. clone the repo

```bash
git clone https://github.com/cepiseptiyana/submision-todolist-mern.git
```

2. Masuk ke repo :
   - cd submision-todolist-mern

### Setup Backend

1. Masuk ke folder backEnd :
   - cd backEnd
2. Install dependencies :

```bash
npm install
```

3. install ORM sequelize versi 6x:

```bash
npm install --save pg pg-hstore
```

4. Migrations Install Sequelize CLI :

```bash
npm install --save-dev sequelize-cli
```

5. Inisialisasi Sequelize :

To create an empty project you will need to execute init command

```bash
npx sequelize-cli init
```

Ini akan membuat folder berikut :

- config, contains config file, which tells CLI how to connect with database
- models, contains all models for your project
- migrations, contains all migration files
- seeders, contains all seed files

6. Configuration :

   Masuk ke file berikut :

- `backend/config/config.js`

  Lalu masukkan kode berikut (sesuaikan value dengan database Anda) :

```json
{
  "development": {
    "username": "postgres",
    "password": "yourpassword",
    "database": "todoList",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

7. Buat database :
   Ini akan membuat database todoList sesuai konfigurasi development `backend/config/config.js`

```bash
npx sequelize-cli db:create
```

8. Creating the first Model (and Migration) :

a. Generate model + migration untuk table `categories`

```bash
npx sequelize-cli model:generate --name Category --attributes name:string,color:string
```

Saat pakai sequelize-cli model:generate, hasilnya berupa :

```js
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Categories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      color: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Categories");
  },
};
```

b. Jalankan migration untuk membuat table `categories` di database

```bash
npx sequelize-cli db:migrate
```

c. Generate model table "Todos"

```bash
npx sequelize-cli model:generate --name Todo --attributes title:string,description:text,completed:boolean,category_id:integer,priority:string,due_date:date
```

Saat pakai sequelize-cli model:generate, hasilnya berupa :

- Migration file untuk tabel Todos yang otomatis tersimpan di:
  backend/migrations/xxxxxx-create-todo.js.

Isi migration kurang lebih seperti berikut: :

```js
"use strict";
/\*_ @type {import('sequelize-cli').Migration} _/;
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Todos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      completed: {
        type: Sequelize.BOOLEAN,
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      priority: {
        type: Sequelize.STRING,
      },
      due_date: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Todos");
  },
};
```

### Setup Front End
