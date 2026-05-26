# Velas & Succulentas

A professional ecommerce-light web application for a decorative candle and succulent business. Built as a concept store showcasing artisan candles and curated succulents — designed for browsing, inspiration, and a seamless shopping-like experience without real payments.

## Technologies

| Tech | Purpose |
|---|---|
| **React 19** | UI library |
| **Vite 8** | Build tool and dev server |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **React Router DOM** | Client-side routing |
| **Framer Motion** | Declarative animations |
| **Lucide React** | Icon library |
| **React Hot Toast** | Toast notifications |

## Project Structure

```
src/
├── components/
│   ├── layout/          # MainLayout, Navbar, Footer
│   └── ui/              # Reusable UI primitives (future)
├── config/              # App configuration (future)
├── context/             # React context providers (future)
├── hooks/               # Custom hooks (future)
├── pages/               # Route-level page components
│   ├── Home.jsx
│   ├── Catalog.jsx
│   ├── Favorites.jsx
│   ├── Cart.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── routes/              # Router configuration
│   └── AppRouter.jsx
├── styles/              # Global CSS and Tailwind config
│   └── index.css
├── utils/               # Helper functions (future)
├── App.jsx              # Root component
└── main.jsx             # Entry point
```

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Design Foundation

- **Brand palette:** Warm terracotta tones (`brand-*`) paired with earthy sage greens (`sage-*`)
- **Typography:** `Playfair Display` (serif) for headings, `Inter` (sans-serif) for body text
- **Layout:** Mobile-first responsive design with a sticky navbar, sidebar drawer on mobile, and a full footer
- **Animations:** Subtle fade-in and slide-up transitions via Framer Motion

## License

MIT
