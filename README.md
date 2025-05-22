
# BlogDash

![BlogDash Logo](public/blogdash-icon.svg)

A powerful platform for bloggers to create, manage, and share their content with a beautiful dashboard experience. BlogDash provides an intuitive interface for content creators to focus on writing while easily managing their publishing workflow.

## ✨ Features

### User Experience
- **Intuitive Dashboard**: Clean, modern interface for managing all your content
- **Dark/Light Mode**: Toggle between themes based on your preference
- **Responsive Design**: Fully responsive layout that works on all devices

### Content Management
- **Post Creation**: Rich text editor for creating engaging blog posts
- **Media Support**: Upload and manage images for your posts
- **Post Management**: Organize, edit, and delete your existing posts
- **Search Functionality**: Quickly find posts with the search feature

### User Management
- **Authentication**: Secure login/signup with Firebase Authentication
- **Profile Management**: Customize your profile information
- **Session Handling**: Automatic logout when session expires

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Routing**: React Router 7
- **State Management**: Redux Toolkit
- **Data Fetching**: TanStack React Query
- **UI Components**: Custom components with React Icons
- **Styling**: Tailwind CSS for utility-first styling
- **Backend/Database**: Firebase Realtime Database
- **Authentication**: Firebase Authentication
- **Build Tool**: Vite for fast development and optimized builds
- **Notifications**: React Toastify for user feedback

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn
- Firebase account (for backend services)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blogdash.git
   cd blogdash
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication and Realtime Database
   - Update Firebase configuration in `src/firebase.js`

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## 📁 Project Structure

```
blogdash/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── dashboardComponents/  # Dashboard-specific components
│   │   ├── layoutComponents/     # Layout-related components
│   │   ├── postFormComponents/   # Post form components
│   │   ├── postsComponents/      # Post list components
│   │   └── welcomPageComponents/ # Landing page components
│   ├── layouts/           # Page layouts
│   ├── pages/             # Page components
│   ├── store/             # Redux store
│   │   └── slices/        # Redux slices
│   ├── UI/                # UI utility components
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main App component
│   ├── App.css            # Global styles
│   ├── firebase.js        # Firebase configuration
│   ├── index.css          # CSS entry point
│   └── main.jsx           # Application entry point
├── .gitignore             # Git ignore file
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML entry point
├── package.json           # Project dependencies
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── vite.config.js         # Vite configuration
```

## 🔒 Authentication

BlogDash uses Firebase Authentication for secure user management. The app implements:
- Email/password authentication
- Token-based session management
- Automatic logout when session expires
- Protected routes for authenticated users

## 🌐 Deployment

To deploy the application:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to Firebase Hosting:
   ```bash
   firebase deploy
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

If you have any questions or feedback, please reach out to us at 0kage.safwat0@gmail.com
