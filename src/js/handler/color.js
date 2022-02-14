import { SETTINGS } from "../constants.js";


const rgbReg = new RegExp(/rgb[(]\d{1,3},\s\d{1,3},\s\d{1,3}[)]/, "g");


const setCharToHex = (value) => {
  if ( value[0] !== "#" ) value = `#${value}`;

  return value;
};

const rgbToHsl = (r, g, b) => {
  let v = Math.max(r ,g, b);
  let c = v-Math.min(r, g, b);
  let f = (1 - Math.abs(v + v - c - 1)); 
  let h = c && ((v == r) ? (g - b) / c : ((v == g) ? 2 + (b - r) / c : 4 + (r - g) / c)); 

  return `hsl(${60 * (h < 0 ? h + 6 : h)}, ${f ? c / f : 0}, ${(v + v - c) / 2})`;
};

const rgbToHex = (rgb) => {
  return '#' + rgb.match(/[0-9|.]+/g).map((x,i) => i === 3 ? parseInt(255 * parseFloat(x)).toString(16) : parseInt(x).toString(16)).join('');
};


export function setColor(css) {
  const setsColor = SETTINGS["color"];
  const rgb = css.match(/rgb[(](\d{1,3},\s\d{1,3},\s\d{1,3})[)]/)[1];

  if ( "color_sets" in SETTINGS ) {
    if ( setsColor === "hex" ) css = css.replace(rgbReg, setCharToHex(SETTINGS["color_sets"]))
    else if ( setsColor === "hsl" ) css = css.replace(rgbReg, `hsl(${SETTINGS["color_sets"]})`)
    else if ( setsColor === "rgb" ) css = css.replace(rgbReg, `rgb(${SETTINGS["color_sets"]})`);

  } else if ( setsColor === "hex" ) {
    const hex = rgbToHex(rgb);
    css = css.replace(rgbReg, hex);

  } else if ( setsColor === "hsl" ) {
    const rgbSplit = rgb.split(",");
    const hsl = rgbToHsl(rgbSplit[0], rgbSplit[1], rgbSplit[2]);
    css = css.replace(rgbReg, hsl);
  };
  
  return css;
};
