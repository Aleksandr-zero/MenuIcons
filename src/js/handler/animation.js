import { SETTINGS } from "../constants.js";


const animationReg = new RegExp(/transition\W\s\D{0,20}\s\d\W\ds\s\D{0,20}\s\d\D/, "g");


const setAnimationDelayReg = (value) => {
  return value.replace(/\d\W\ds/g, `${SETTINGS["animation_delay"]}s`);
};

const setAnimationFuncTimingReg = (value) => {
  return value.replace(/\sease\s/g, ` ${SETTINGS["function_timing"]} `);
};

const setAnimationDelay = (css) => {
  if ( "animation_delay" in SETTINGS && SETTINGS["animation_delay"] ) {
    css = css.replace(animationReg, setAnimationDelayReg);
  };

  return css
};

const setAnimationFuncTiming = (css) => {
  if ( "function_timing" in SETTINGS && SETTINGS["function_timing"] ) {
    css = css.replace(animationReg, setAnimationFuncTimingReg);
  };

  return css;
};


export function setAnimation(css) {
  css = setAnimationDelay(css);
  css = setAnimationFuncTiming(css);
  return css
};
