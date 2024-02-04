import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes:{
        translateOrb:{
          '0%':{
            transform:'translateX(0) translateY(0)'
          },
          '50%':{
            transform:'translateX(60vw) translateY(30vh)'
          },
          '100%':{
            transform:'translateX(0) translateY(0)'
          }
        }
      },
      animation: {
        orb: "translateOrb 15s alternate infinite"
    },
  },
  plugins: [],
  }
} satisfies Config;
