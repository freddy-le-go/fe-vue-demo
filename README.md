# Freddy Vue Profile Management App

A modern Vue.js 3 application for user profile management with authentication, form handling, and responsive UI components.

## 🚀 Features

- **Authentication System**: Login and registration with form validation
- **Profile Management**: Complete user profile CRUD operations
- **Avatar Upload**: File upload with preview functionality
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript support
- **Modern Stack**: Vue 3 + Vite + Pinia + Vue Router
- **UI Components**: Custom component library with shadcn/ui inspiration

## 🛠️ Tech Stack

- **Frontend**: Vue 3 with Composition API
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Type Safety**: TypeScript
- **Form Handling**: Vee-validate with Zod
- **HTTP Client**: TanStack Query (Vue Query)
- **UI Components**: Custom component library
- **Code Formatting**: Prettier

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Input, etc.)
│   └── AppHeader.vue   # Main header component
├── features/           # Feature-based modules
│   ├── auth/          # Authentication features
│   └── profile/       # Profile management features
├── views/             # Page components
│   ├── profile/       # Profile-related pages
│   ├── Home.vue       # Home page
│   ├── Login.vue      # Login page
│   └── Register.vue   # Registration page
├── stores/            # Pinia stores
├── composables/       # Reusable composables
├── lib/               # Utility libraries and API
└── router/            # Vue Router configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- pnpm 10+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd freddy-vue-1-jul
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

## 📱 Features Overview

### Authentication
- User registration and login
- Form validation with Vee-validate and Zod
- Persistent authentication state with Pinia

### Profile Management
- **Basic Details**: Personal information, contact details
- **Additional Details**: Extended profile information
- **Spouse Details**: Partner information management
- **Personal Preferences**: User preferences and settings
- **Avatar Management**: Profile picture upload and preview

### UI/UX
- Responsive design for all screen sizes
- Loading states and error handling
- Form validation with real-time feedback
- Modern, clean interface with Tailwind CSS

## 🎨 Component Library

The app includes a comprehensive UI component library:

- **Form Components**: Input, Select, Checkbox, Form validation
- **Layout Components**: Card, Button, Loading indicators
- **Navigation**: Header, Sidebar navigation
- **Feedback**: Error messages, loading states

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=your_api_url_here
```

### Vercel Deployment
The project includes `vercel.json` for seamless deployment to Vercel with proper SPA routing configuration.

## 📝 Development Guidelines

- Use TypeScript for all new code
- Follow Vue 3 Composition API patterns
- Use Tailwind CSS for styling
- Implement proper error handling
- Write descriptive component and function names
- Use Prettier for code formatting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `pnpm format` to format code
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using Vue 3 and modern web technologies.
