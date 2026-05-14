import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration file
// Ye pura setup batata hai ki frontend server kaise behave karega

export default defineConfig({

  // Plugins section
  // Yahan React plugin use ho raha hai taaki Vite React app ko properly run kar sake
  plugins: [react()],

  server: {

    // ==============================
    // 1. HOST SETTING
    // ==============================
    // "0.0.0.0" ka matlab:
    // Server ko sabhi network interfaces ke liye open kar dena
    // Simple words me:
    // Docker container ke bahar (browser se) access kar paoge
    // Agar ye nahi diya toh localhost se access nahi milega
    host: "0.0.0.0",


    // ==============================
    // 2. FILE WATCHING (HOT RELOAD)
    // ==============================
    watch: {

      // Docker + Windows issue fix
      // Normally file change detect nahi hota
      // Isliye polling use karte hain

      // usePolling: true ka matlab:
      // Vite har thodi der me check karega ki file change hui ya nahi
      // Agar change mile → browser automatically reload ho jayega
      usePolling: true
    },


    // ==============================
    // 3. PROXY (BACKEND CONNECTION)
    // ==============================
    proxy: {

      // Jab bhi frontend se "/api" call hoga
      // Example: fetch("/api/users")

      "/api": {

        // Ye request backend server ko bheji jayegi
        // "server" Docker service ka naam hai (docker-compose se)
        // Port 3000 pe backend chal raha hai
        target: "http://server:3000",

        // changeOrigin: true
        // Backend ko lagega request direct usi se aa rahi hai
        // Isse CORS error avoid hota hai
        changeOrigin: true,

        // secure: false
        // HTTPS validation skip karta hai (dev environment ke liye useful)
        secure: false
      }
    }
  }
})