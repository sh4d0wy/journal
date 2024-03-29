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
            transform:'translateX(0px) translateY(0px )'
          },
          '50%':{
            transform:'translateX(60vw)'
          },
          '100%':{
            transform:'translateX(0px) translateY(0px)'
          }
        },
        floating:{
          '0%':{
            transform:'translateY(0px)'
          },
          '50%':{
            transform:'translateY(-10px)'
          },
          '100%':{
            transform:'translateY(0px)'
          }
        }
      },
      animation: {
        orb: "translateOrb 15s alternate infinite",
        float:"floating 3s alternate infinite ease-in-out"
    },
  },
  plugins: [],
  }
} satisfies Config;
