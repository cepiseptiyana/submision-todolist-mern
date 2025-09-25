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

   - cd `submision-todolist-mern`.

### Setup Backend

#### install depedencies

1. Masuk ke folder backEnd :

   - cd `backEnd`.

2. Install dependencies :

```bash
npm install
```

3. install express js versi 5x:

```bash
npm install express
```

4. install joi schema validator versi 18x:

```bash
npm install joi
```

5. install CORS versi 2x:

```bash
npm install cors
```

6. install ORM sequelize versi 6x:

```bash
npm install --save sequelize
```

7. Install PostgreSQL driver dan helper pg versi 8x dan pg-hstore versi 2x:

```bash
npm install --save pg pg-hstore
```

8. Migrations Install Sequelize CLI :

```bash
npm install --save-dev sequelize-cli
```

9. Inisialisasi Sequelize :

To create an empty project you will need to execute init command.

```bash
npx sequelize-cli init
```

Ini akan membuat folder berikut :

- config, contains config file, which tells CLI how to connect with database
- models, contains all models for your project
- migrations, contains all migration files
- seeders, contains all seed files

#### Confiurations

1. Configuration :

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

2. Buat database :
   Ini akan membuat database todoList sesuai konfigurasi development `backend/config/config.js`

```bash
npx sequelize-cli db:create
```

3. Membuat Model Pertama dan ( Migration) :

#### Generate model + migration untuk table `categories`

a. Generate model + migrations `categories` :

```bash
npx sequelize-cli model:generate --name Category --attributes name:string,color:string
```

Setelah Generate maka, hasilnya berupa 2 file :

- `models/category.js`
- `migrations/XXXXXXXX-create-category.js`

b. Definisikan File `models/category.js` Model category :

```js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Category punya banyak Todo
      Category.hasMany(models.Todo, {
        foreignKey: "category_id",
        as: "todos",
      });
    }
  }

  Category.init(
    {
      name: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
```

c. Definisikan File `migrations/XXXXXXXX-create-category.js` Migrations Category :

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

d. Jalankan migration untuk membuat table `categories` ke database :

```bash
npx sequelize-cli db:migrate
```

#### Generate model + migration untuk table `Todos`

a. Generate model + migrations `Todos` :

```bash
npx sequelize-cli model:generate --name Todo --attributes title:string,description:text,completed:boolean,category_id:integer,priority:string,due_date:date
```

Setelah Generate maka, hasilnya berupa 2 file :

- `models/todo.js`
- `migrations/XXXXXXXX-create-todo.js`

Isi migration kurang lebih seperti berikut: :

b. Definisikan File `models/todo.js` Model Todo :

```js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Todo belongTo Category
      Todo.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      completed: DataTypes.BOOLEAN,
      category_id: DataTypes.INTEGER,
      priority: DataTypes.STRING,
      due_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
```

c. Definisikan File `migrations/XXXXXXXX-create-todo.js` Migrations Category :

```js
"use strict";
/** @type {import('sequelize-cli').Migration} */
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

d. Jalankan migration untuk membuat table `todos` ke database :

```bash
npx sequelize-cli db:migrate
```

### Setup Front End
