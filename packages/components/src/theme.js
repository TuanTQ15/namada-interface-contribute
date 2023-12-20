module.exports = {
  theme: {
    extend: {
      colors: {
        yellow: {
          DEFAULT: "#FFFF00",
          50: "#FFFFB8",
          100: "#FFFFA3",
          200: "#FFFF7A",
          300: "#FFFF52",
          400: "#FFFF29",
          500: "#FFFF00",
          600: "#C7C700",
          700: "#8F8F00",
          800: "#575700",
          900: "#333300",
          950: "#1F1F00",
        },
        cyan: {
          DEFAULT: "#00FFFF",
          50: "#B8FFFF",
          100: "#A3FFFF",
          200: "#7AFFFF",
          300: "#52FFFF",
          400: "#29FFFF",
          500: "#00FFFF",
          600: "#00C7C7",
          700: "#008F8F",
          800: "#005757",
          900: "#001F1F",
          950: "#000303",
        },

        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#999999",
          500: "#787878",
          600: "#545454",
          700: "#404040",
          800: "#292929",
          900: "#1A1A1A",
          950: "#0e0e0e",
        },
      },

      borderRadius: {
        DEFAULT: "10px",
        none: "0",
        sm: "5px",
        md: "10px",
        lg: "18px",
        full: "100%",
        mainContainer: "24px",
        textField: "8px",
        buttonBorderRadius: "200px",
      },

      fontSize: {
        xs: "0.8rem",
        sm: "0.9rem",
        base: "1rem",
        md: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.25rem",
        "5xl": "2.85rem",
        "6xl": "3.25rem",
        "7xl": "4rem",
      },

      transitionTimingFunction: {
        "in-cubic": "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
        "out-cubic": "cubic-bezier(0.215, 0.61, 0.355, 1)",
        "in-out-cubic": "cubic-bezier(0.645, 0.045, 0.355, 1)",
        "in-circ": "cubic-bezier(0.6, 0.04, 0.98, 0.335)",
        "out-circ": "cubic-bezier(0.075, 0.82, 0.165, 1)",
        "in-out-circ": "cubic-bezier(0.785, 0.135, 0.15, 0.86)",
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        "in-out-expo": "cubic-bezier(1, 0, 0, 1)",
        "in-quad": "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
        "out-quad": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "in-out-quad": "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
        "in-quart": "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
        "out-quart": "cubic-bezier(0.165, 0.84, 0.44, 1)",
        "in-out-quart": "cubic-bezier(0.77, 0, 0.175, 1)",
        "in-quint": "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
        "out-quint": "cubic-bezier(0.23, 1, 0.32, 1)",
        "in-out-quint": "cubic-bezier(0.86, 0, 0.07, 1)",
        "in-sine": "cubic-bezier(0.47, 0, 0.745, 0.715)",
        "out-sine": "cubic-bezier(0.39, 0.575, 0.565, 1)",
        "in-out-sine": "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
        "in-back": "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
        "out-back": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "in-out-back": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },

      animation: {
        "fade-in": "fadeIn var(--ease-out-expo) 1s",
      },

      keyframes: {
        fadeIn: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
      },

      spacing: {
        13: "3.25rem",
        14: "3.5rem",
        15: "3.75rem",
        16: "4rem",
        17: "4.25rem",
        18: "4.5rem",
        19: "4.75rem",
        20: "5rem",
        21: "5.25rem",
        22: "5.5rem",
        23: "5.75rem",
        24: "6rem",
        25: "6.25rem",
        26: "6.5rem",
        27: "6.75rem",
        28: "7rem",
        29: "7.25rem",
        30: "7.5rem",
        31: "7.75rem",
        32: "8rem",
        33: "8.25rem",
        34: "8.5rem",
        35: "8.75rem",
        36: "9rem",
        37: "9.25rem",
        38: "9.5rem",
        39: "9.75rem",
        40: "10rem",
        41: "10.25rem",
        42: "10.5rem",
        43: "10.75rem",
        44: "11rem",
        45: "11.25rem",
        46: "11.5rem",
        47: "11.75rem",
        48: "12rem",
        49: "12.25rem",
        50: "12.5rem",
        51: "12.75rem",
        52: "13rem",
        53: "13.25rem",
        54: "13.5rem",
        55: "13.75rem",
        56: "14rem",
        57: "14.25rem",
        58: "14.5rem",
        59: "14.75rem",
        60: "15rem",
        61: "15.25rem",
        62: "15.5rem",
        63: "15.75rem",
        64: "16rem",
        65: "16.25rem",
        66: "16.5rem",
        67: "16.75rem",
        68: "17rem",
        69: "17.25rem",
        70: "17.5rem",
        71: "17.75rem",
        72: "18rem",
        73: "18.25rem",
        74: "18.5rem",
        75: "18.75rem",
        76: "19rem",
        77: "19.25rem",
        78: "19.5rem",
        79: "19.75rem",
        80: "20rem",
        81: "20.25rem",
        82: "20.5rem",
        83: "20.75rem",
        84: "21rem",
        85: "21.25rem",
        86: "21.5rem",
        87: "21.75rem",
        88: "22rem",
        89: "22.25rem",
        90: "22.5rem",
        91: "22.75rem",
        92: "23rem",
        93: "23.25rem",
        94: "23.5rem",
        95: "23.75rem",
        96: "24rem",
        97: "24.25rem",
        98: "24.5rem",
      },
    },
  },
  plugins: [],
};
