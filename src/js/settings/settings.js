import { SETTINGS } from "../constants.js";


function setSettings(input) {
  const setsParam = input.dataset.setSettings;
  const setsValue = input.value.trim();

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
