module.exports = {
    purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
    //   extend: {
    //     backgroundImage: theme => ({
    //       "login-bg": "url('./src/assets/img/login_bg.png')", //本地无法打包引入
    //     }),
    //   },
      screens: {
        md4: "460px",
        sm: "640px",
        // => @media (min-width: 640px) { ... }
  
        md: "768px",
        // => @media (min-width: 768px) { ... }
        mmd: "880px",
        lg: "1024px",
        // => @media (min-width: 1024px) { ... }
  
        xl: "1280px",
        // => @media (min-width: 1280px) { ... }
  
        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
    },
    variants: {},
  };
  