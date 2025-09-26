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
   Ini akan membuat database `todoList` sesuai konfigurasi development `backend/config/config.js`

```bash
npx sequelize-cli db:create
```

3. Jalankan Migrate untuk buat table `todos` dan `categories` :

```bash
npx sequelize-cli db:migrate
```

4. Jalankan Sedeer :
   ini akan meneksekusi file seeder untuk demo data category dan todos

```bash
npx sequelize-cli db:seed:all
```

3. Jalankan server backend (di dalam folder `backEnd`):

```bash
node app
```

<div align="right">
  <a href="#readme">⬆️ Back to top</a>
</div>

### Setup Front End

#### install depedencies

1. Masuk ke folder frontEnd :

   - cd `frontEnd`.

2. Install dependencies :

```bash
npm install
```

3.  Jalankan server frontEnd (di dalam folder `frontEnd`):

```bash
npm run dev
```

<div align="right">
  <a href="#readme">⬆️ Back to top</a>
</div>

# Required Technical Questions

## Database Design Questions

1. What database tables did you create and why?

- Categories
  a. Purpose : Menyimpan daftar kategori yang bisa digunakan untuk mengelompokkan todo items.

  b. Columns :

  - id (Primary Key) → identifikasi unik tiap kategori
  - name → nama kategori
  - color → warna kategori untuk tampilan UI
  - createdAt → create new data category timestamp.
  - updatedAt → timestamp otomatis.

  c. Reasoning: Memisahkan kategori dari todo agar mudah melakukan filtering dan menambah fleksibilitas di UI.

- Todos
  a. Purpose: Menyimpan daftar tugas (todo items) yang akan dikelola oleh user.
  b. Columns:

  - id (Primary Key)
  - title → judul tugas
  - description → deskripsi tugas
  - completed → status selesai/tidak
  - category_id → foreign key ke table Categories
  - priority → level prioritas tuga
  - due_date → tanggal tenggat
  - createdAt / updatedAt → timestamp otomatis

  c. Reasoning: Struktur ini memungkinkan setiap todo dikaitkan ke satu kategori dan memiliki field tambahan untuk pengelolaan dan visualisasi di UI nya.

- Relationships:
  a. One-to-Many: Satu kategori (Categories) dapat memiliki banyak todo (Todos).
  b. Di Sequelize:

  ```js
  Category.hasMany(Todo, { foreignKey: "category_id", as: "todos" });
  Todo.belongsTo(Category, { foreignKey: "category_id", as: "category" });
  ```

- Why this structure:
  a. Memisahkan Categories dan Todos mempermudah skalabilitas dan pengelolaan relasi.
  b. Bisa menambahkan field tambahan ke kategori tanpa mengubah table Todos.
  c. Bisa menambahkan field Category ke Todo untuk kebutuhan UI.

2. How did you handle pagination and filtering in the database?

a. Pagination :

#### fetch Frontend (React):

Query parameter page, perPage, dan search dikirim ke backend menggunakan fetch. Contoh:

```js
// GET TODO PAGINATION
fetch(`${API_BASE}?page=1&perPage=10&search=keyword`);
```

#### Backend (Express + Sequelize):

- Query parameter diterima (page, perPage, search) lalu diteruskan ke controller.
- Filtering dilakukan dengan Sequelize.Op.iLike untuk pencarian case-insensitive pada kolom title.
- Pagination menggunakan limit dan offset.
- Menggunakan findAndCountAll agar data (rows) dan total count (count) bisa didapat sekaligus..

```js
const { count, rows } = await Todo.findAndCountAll({
  where: search ? { title: { [Op.iLike]: `%${search}%` } } : {},
  limit: perPage,
  offset: (page - 1) * perPage,
  include: [{ model: Category, as: "category" }],
});
```

#### Response JSON:

Backend mengembalikan data beserta informasi pagination:

```json
{
  "status": true,
  "data": [...],
  "pagination": {
    "current_page": 1,
    "per_page": 10,
    "total": 100,
    "total_pages": 10
  }
}
```

#### Efficiency & Indexes:

- limit dan offset membatasi jumlah data per halaman.
- Index pada kolom category_id mempercepat join dengan tabel Categories.
- Index tambahan pada title membantu performa pencarian.

## Technical Decision Questions

1. How did you implement responsive design?

#### Breakpoints:

Menggunakan default breakpoints dari Ant Design (xs, sm, md, lg, xl).

- xs untuk mobile (<576px)
- sm untuk tablet (≥576px)
- md untuk small desktop (≥768px)
- lg untuk large desktop (≥992px)
- xl untuk wide screen (≥1200px)

#### Adaptation:

- Layout otomatis menyesuaikan grid (useBreakpoint()) sehingga pada layar kecil konten akan menyesuaikan breakpoints ant Design sm, md, lg dll.
- Beberapa elemen (misalnya navbar) berubah style setiap kali ukuran useBreakpoint().md.

#### Ant Design Components:

- Form, Table dan Input yang otomatis full width di layar kecil.
- Navbar yang otomatis berubah style setiap ukuran layar md.

2. How did you structure your React components?
   menggunakan struktur folder featured based.

#### Component Hierarchy:

- `App.js` → entry utama
- `src`
  - `/api` (untuk fetch data ke backEnd)
  - `/hooks` (membuat custom hooks fetch data todos dan categories untuk pagination)
  - `/features` (berisi component fitur untuk keperluan pages.)
  - `/routes` (routes react router)
  - `/template` (sebagai layout)

#### State Management:

- Aplikasi ini **tidak menggunakan state management global** (seperti Redux/Zustand).
- Pagination dan filter disimpan di **state lokal React** menggunakan custom hooks di folder `src/hooks`.
- State tersebut kemudian dikirim sebagai query parameter ke backend untuk mengambil data sesuai kebutuhan.

#### Filtering & Pagination State:

- `search`, `page`, dan `perPage` disimpan di **state lokal React** menggunakan custom hooks di folder `src/hooks`.
- Saat berubah, trigger fetch ulang ke backend.

3. What backend architecture did you choose and why?

#### Architecture:

- Backend menggunakan pola **Model–Controller–Routes**:
  - **Model**: didefinisikan dengan Sequelize untuk representasi tabel database.
  - **Controller**: berisi business logic untuk setiap endpoint.
  - **Routes**: menghubungkan request HTTP dengan controller yang sesuai.
- Pola ini dipilih agar code lebih terstruktur dan mudah dikembangkan.

#### API Routes:

- /api/todos → CRUD Todo
- /api/categories → CRUD Category

#### Code Structure:

- models/ → Sequelize models
- controllers/ → logika bisnis (CRUD)
- routes/ → mapping endpoint ke controller
- middlewares/ → error handling & 404 handler
- config/ → konfigurasi database

#### Error Handling:

- Middleware Express untuk menangkap error (app.use((err, req, res, next) => {...})).
- Response data JSON konsisten: { status: false, message: "error message" }.

4. How did you handle data validation?

#### Validation Location:

- Frontend: Validasi basic menggunakan Ant Design Form (misalnya required field, format tanggal, title min 3 karakter).
- Backend: Validasi lebih ketat di controller meggunakan Joi sebelum simpan ke database (misalnya panjang title, foreign key category_id valid).
  ```js
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().allow(""),
    completed: Joi.boolean().default(false),
    category_id: Joi.number().integer().optional(),
    priority: Joi.string().valid("low", "medium", "high").default("medium"),
    due_date: Joi.date().optional(),
  });
  ```

#### Validation Rules:

- title wajib diisi (required, min 3 karakter).
- completed harus boolean.
- category_id harus referensi valid ke tabel Categories.
- due_date harus tanggal valid.

#### Reasoning:

- Validasi frontend → untuk pengalaman pengguna (cegah input salah lebih cepat).
- Validasi backend → untuk keamanan dan konsistensi data (tidak percaya 100% ke client).

## Testing & Quality Questions

1. What did you choose to unit test and why?

- Untuk submission ini saya belum membuat unit test.
- Fokus utama saya masih pada implementasi fitur utama (CRUD, pagination, integrasi frontend-backend).

2. If you had more time, what would you improve or add?

- Testing: Tambah unit test dengan Jest atau juga dengan React Testing Library(RTL) untuk memastikan fungsi berjalan sesuai ekspektasi.
- Technical debt:
  - Rapikan error handling di controller agar lebih konsisten dengan middleware.
  - Saya akan merapihkan fetch di frontEnd menggunakan React-Redux.
- Features:

  - Menggunakan state management React-Redux untuk logika store.
  - Tambah fitur filter dan sort (asc/desc).
  - Tambah user authentication agar todo bisa dipersonalisasi per user.

- Refactor:
  - Mengganti custome hooks `src/hooks` dengan React-Redux untuk kebutuhan fetching api.

<div align="right">
  <a href="#readme">⬆️ Back to top</a>
</div>
