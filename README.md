#MOVIREC

## 🎬 Movie Recommendation App

🚀 A modern, full-stack **Movie Recommendation App** that allows users to browse trending movies, receive personalized recommendations, and manage their favorite movies. Built with **Next.js, TypeScript, and TailwindCSS**, and powered by a **Django REST API**.

## 📌 Features
✅ **User Authentication** (JWT-based login & signup)  
✅ **Trending Movies** (Fetched from TMDb via the backend)  
✅ **Personalized Recommendations** (Based on trending movie selections)  
✅ **Favorites System** (Users can save & manage favorite movies)  
✅ **Search & Filters** (Sort by genre, popularity, rating, release date)  
✅ **Responsive UI** (Works seamlessly across devices)  
✅ **Dark Mode Support** 🌙  

---

## 🛠️ Technologies Used

### **Frontend (Client)**
- **Next.js 14** (Server-side rendering & API integration)
- **TypeScript** (Type safety & better development experience)
- **TailwindCSS** (Modern, responsive styling)
- **Radix UI** (Accessible UI components)
- **JWT-based Auth** (Token-based authentication for security)

### **Backend (API Service)**
- **Django REST Framework** (Powerful API development)
- **PostgreSQL** (Relational database for user & movie data)
- **Redis** (Caching for improved performance)
- **Swagger** (Comprehensive API documentation)
- **JWT Authentication** (Secure login & user sessions)

---

## 📂 Project Structure
```
📦 movie-recommendation-app
 ┣ 📂 app  # Next.js API Routes
 ┣ 📂 components  # UI components
 ┣ 📂 context  # State management (Auth & Favorites Context)
 ┣ 📂 pages  # Next.js pages (Movies, Favorites, Auth, etc.)
 ┣ 📂 styles  # Global styles (Tailwind & custom CSS)
 ┣ 📜 .env.local  # API Keys & Environment Variables
 ┣ 📜 package.json  # Project dependencies
 ┣ 📜 README.md  # Project documentation
 ┗ 📜 tsconfig.json  # TypeScript configuration
```

---

## 🚀 Installation & Setup

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/HARBBEY21166/TestRun.git
cd TestRun
```

### 2️⃣ **Install Dependencies**
```sh
npm install
```

### 3️⃣ **Set Up Environment Variables**
Create a `.env.local` file in the root directory and add:
```sh
NEXT_PUBLIC_BACKEND_URL=https://alxprodev-movie-recommendation-backend.onrender.com
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```

### 4️⃣ **Start the Development Server**
```sh
npm run dev
```
Visit `http://localhost:3000` in your browser.

---

## 🔗 API Integration (Backend)
### **Base URL:** `https://alxprodev-movie-recommendation-backend.onrender.com/api`

### **1️⃣ User Authentication**
- **Login:** `POST /users/login/`
- **Signup:** `POST /users/signup/`
- **Refresh Token:** `POST /users/token/refresh/`

### **2️⃣ Movie Data**
- **Get Trending Movies:** `GET /movies/trending/`
- **Get Recommendations:** `GET /movies/recommendations/{movie_id}/`

### **3️⃣ Favorites System**
- **Save a Favorite:** `POST /favorites/`
- **Get Favorites:** `GET /favorites/`
- **Remove Favorite:** `DELETE /favorites/{id}/`

---

## 🌍 Deployment
The app is deployed on **Vercel**. You can access it here: [Live Demo](https://movierec-one.vercel.app/)

To deploy manually:
```sh
git push origin main
```
Vercel will automatically build and deploy the project.

---

## 📌 Future Improvements
🔹 **Improve UI/UX Design** for a more polished experience  
🔹 **Implement Search Functionality** for better navigation  
🔹 **Add User Profiles** with watch history and preferences  
🔹 **Enable Movie Reviews & Ratings** from users  

---

## 🤝 Contributing
Contributions are welcome! Feel free to fork this repo, create a branch, and submit a pull request.

---

## 📜 License
This project is open-source and available under the **MIT License**.

💡 **Developed by [Abbey](https://github.com/HARBBEY21166)** 🚀
