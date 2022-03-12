import { SETTINGS } from "../constants.js";


function setSettings(block) {
  const setsParam = block.dataset.setSettings;
  const setsValue = block.value.trim();

  localStorage.setItem(setsParam, setsValue);

  updateSettings(setsParam, setsValue);
};

function updateSettings(param, value) {
  SETTINGS[param] = value;
};


export function getSettingsUser() {
  const settings = {};

  settings["color"] = localStorage.getItem("color");
  settings["color_sets"] = localStorage.getItem("color_sets");
  settings["animation_delay"] = localStorage.getItem("animation_delay");
  settings["function_timing"] = localStorage.getItem("function_timing");
  settings["name_btn"] = localStorage.getItem("name_btn");
  settings["active_class_btn"] = localStorage.getItem("active_class_btn");

  return settings;
};


export function addEventInputRadio(inputs) {
  inputs.forEach((input) => {
    input.addEventListener("input", (event) => {
      setSettings(event.currentTarget);
    });
  });
};

export function addEventInputText(inputs) {
  inputs.forEach((input) => {
    input.addEventListener("focusout", (event) => {
      setSettings(event.currentTarget);
    });
  });
};

export function addEventSelect(selects) {
  selects.forEach((select) => {
    select.addEventListener("change", (event) => {
      setSettings(event.currentTarget);
    });
  });
};
