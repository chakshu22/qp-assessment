# 🛒 Grocery Booking API – QP Assessment

A TypeScript-based Grocery Booking API built with Node.js, Express, Prisma, and PostgreSQL.  
Supports user authentication, grocery inventory management (admin), and grocery booking (user).  
This is built for the **Fullstack Node QP Assessment**.

---

## 🔧 Tech Stack

- **Node.js** + **TypeScript**
- **Express.js** – Web framework
- **PostgreSQL** – Relational database
- **Prisma** – Type-safe ORM
- **JWT** – Authentication
- **Docker + Docker Compose** – Containerization
- **bcrypt** – Password hashing

---

## 📁 Project Structure

qp-assessment/ ├── prisma/ # Prisma schema and migrations │ └── schema.prisma ├── src/ │ ├── controllers/ # Business logic │ ├── middleware/ # JWT & role auth │ ├── routes/ # API routing (auth, admin, user) │ ├── utils/ # Prisma client setup │ └── index.ts # App entry point ├── .env # Environment variables ├── Dockerfile ├── docker-compose.yml ├── package.json ├── README.md # This file


---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/qp-assessment.git
cd qp-assessment

**2. Set up .env**
Create a .env file in the root:

DATABASE_URL=postgresql://postgres:postgres@db:5432/grocery_app
JWT_SECRET=your-secret-key
PORT=3000

**3. Start the app with Docker**

docker-compose up -d


This launches:

PostgreSQL DB (db)

Node.js app (app)

**4. Run Prisma migrations**

docker exec -it qp-assessment-app npx prisma migrate dev --name init


🔐 Authentication
All users must register and login

Access is protected using JWT

Use Bearer tokens in headers:
Authorization: Bearer <token>

🧪 API Endpoints
✅ Public (no auth)
POST /auth/register – Register new user

POST /auth/login – Login and get JWT

🔐 Admin (requires admin role)
POST /admin/items – Add grocery item

GET /admin/items – List all items

PUT /admin/items/:id – Update item

PATCH /admin/items/:id/stock – Update stock

DELETE /admin/items/:id – Delete item

🔐 User (requires user role)
GET /user/items – List available grocery items

POST /user/orders – Place an order


🧾 Sample Order Payload

{
  "items": [
    { "itemId": "clxyz123", "quantity": 2 },
    { "itemId": "clxyz456", "quantity": 1 }
  ]
}


📦 Database Models
Using Prisma with PostgreSQL:

model User {
  id       String   @id @default(cuid())
  email    String   @unique
  password String
  role     Role     @default(USER)
  orders   Order[]
}

model GroceryItem {
  id    String  @id @default(cuid())
  name  String
  price Float
  stock Int
  orders OrderItem[]
}

model Order {
  id       String       @id @default(cuid())
  user     User         @relation(fields: [userId], references: [id])
  userId   String
  items    OrderItem[]
  createdAt DateTime    @default(now())
}

model OrderItem {
  id       String       @id @default(cuid())
  item     GroceryItem  @relation(fields: [itemId], references: [id])
  itemId   String
  order    Order        @relation(fields: [orderId], references: [id])
  orderId  String
  quantity Int
}

enum Role {
  ADMIN
  USER
}


🔄 Future Improvements
✅ Swagger API docs

✅ Order history route

❌ Password reset support

❌ Admin dashboard UI


📬 Author
Built with ❤️ by [Chakshu Sharma]
For QP Assessment – Fullstack Node Position


---


