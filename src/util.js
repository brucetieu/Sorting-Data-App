import { Constants } from "./Constants.js";

// 'Overriding' Object to have a pop method which returns a key in the object
Object.prototype.pop = function () {
  for (var key in this) {
    if (!Object.hasOwnProperty.call(this, key)) continue;
    var result = this[key];
    return result;
  }
};

// Column -> Ascending, Ascending -> Column
document.querySelector(".add").addEventListener("click", () => {
  const selectElement = document.querySelector("#column");
  Constants.ascendingBox.appendChild(
    selectElement.options[selectElement.selectedIndex]
  );
});
document.querySelector(".remove").addEventListener("click", () => {
  const selectElement = document.querySelector("#ascending");
  Constants.columnBox.appendChild(
    selectElement.options[selectElement.selectedIndex]
  );
});
document.querySelector(".add-all").addEventListener("click", () => {
  const selectElement = document.querySelector("#column");
  while (selectElement.options.length > 0) {
    const temp = selectElement.options.pop();
    Constants.ascendingBox.appendChild(temp);
  }
});
document.querySelector(".remove-all").addEventListener("click", () => {
  const selectElement = document.querySelector("#ascending");
  while (selectElement.options.length > 0) {
    const temp = selectElement.options.pop();
    Constants.columnBox.appendChild(temp);
  }
});

// Ascending -> Descending or Descending -> Ascending
document.querySelector(".add2").addEventListener("click", () => {
  const selectElement = document.querySelector("#ascending");
  Constants.descendingBox.appendChild(
    selectElement.options[selectElement.selectedIndex]
  );
});
document.querySelector(".remove2").addEventListener("click", () => {
  const selectElement = document.querySelector("#descending");
  Constants.ascendingBox.appendChild(
    selectElement.options[selectElement.selectedIndex]
  );
});
document.querySelector(".add-all2").addEventListener("click", () => {
  const selectElement = document.querySelector("#ascending");
  while (selectElement.options.length > 0) {
    const temp = selectElement.options.pop();
    Constants.descendingBox.appendChild(temp);
  }
});
document.querySelector(".remove-all2").addEventListener("click", () => {
  const selectElement = document.querySelector("#descending");
  while (selectElement.options.length > 0) {
    const temp = selectElement.options.pop();
    Constants.ascendingBox.appendChild(temp);
  }
});

const clear = () => {
  const tables = document.querySelectorAll(".tables-container");
  for (let i = tables.length - 1; i >= 0; i -= 1)
    if (tables[i]) tables[i].parentNode.removeChild(tables[i]);
  Constants.loadDataBtn.disabled = false;
};

Constants.clearTablesBtn.addEventListener("click", () => {
  console.log("clearing tables...");
  clear();
});
