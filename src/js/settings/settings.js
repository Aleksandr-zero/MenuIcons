function setSettings(input) {
  const valueSplit = input.value.split("-");
  const setsParam = valueSplit[0];
  const setsValue = valueSplit[1];

  localStorage.setItem(setsParam, setsValue);
};


export function getSettingsUser() {
  const settings = {};

  settings["color"] = localStorage.getItem("color");

  return settings;
};


export function addEventInput(inputs) {
  inputs.forEach((input) => {
    input.addEventListener("input", (event) => {
      setSettings(event.currentTarget);
    });
  });
};
