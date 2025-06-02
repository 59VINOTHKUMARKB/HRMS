git clone https://github.com/your-username/hrms-system.git
cd hrms-system

npm install

DATABASE_URL=your_database_connection_string
PORT=5000
SUPER_ADMIN_EMAIL=admin@example.com
SUPER_ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your_jwt_secret_key

npm run dev

npm run build
