"use-strict";

import { Record } from "./Record.js";
import { mergeSort, compareBy } from "./sorter.js";
import { Constants } from "./Constants.js";

let records;
const headers = new Set();

/**
 * Read in the data.
 */
Papa.parse(Constants.INPUT_DATA, {
  download: true,
  complete: function (results) {
    Constants.loadDataBtn.addEventListener("click", () => {
      console.log("og data:", results.data);
      records = createTable(results.data, "Original Data");
      Constants.loadDataBtn.disabled = true;
    });
  },
});

/**
 * Style the table.
 * @param {Object} div The div that contains the table.
 * @param {Object} table The table of records itself.
 * @param {String} tableTitle The title for the table.
 */
const styleTable = (div, table, tableTitle) => {
  div.className = "tables-container";
  div.style.height = "400px";
  div.style.overflow = "auto";
  const title = table.createTHead();
  const titleRow = title.insertRow(0);
  titleRow.style.color = "red";
  const cell = titleRow.insertCell(0);
  cell.innerHTML = "<b>" + tableTitle + "</b>";
};

// Check if a string is null, undefined, or empty.
function isEmpty(str) {
  return (!str || str.length === 0 );
}

/**
 * Create the html table to be displayed.
 * @param {Array<Array>} rows Rows in the csv
 * @param {String} tableTitle The label given to the table
 * @returns Array<Record>
 */
const createTable = (rows, tableTitle) => {
  console.log("Creating table...");

  const div = document.createElement("div");
  const table = document.createElement("table");

  styleTable(div, table, tableTitle);

  const records = [];

  for (let i = 0; i < rows.length; i++) {
    const tr = document.createElement("tr");

    if (i != 0) {
      let name    = rows[i][0],
          address = rows[i][1],
          invoice = rows[i][2],
          date    = rows[i][3];
      records.push(new Record(name, address, parseFloat(invoice), new Date(date).getTime()));
      let newDate = new Date(date);
      const month = newDate.getMonth() + 1,
            day   = newDate.getDate(),
            year  = newDate.getFullYear();
      rows[i][3] = month + "/" + day + "/" + year;
    }

    for (const rowElement of rows[i]) {
      if (isEmpty(rowElement)) break
      const text = document.createTextNode(rowElement);
      if (i === 0) {
        const header = document.createElement("th");
        header.appendChild(text);
        headers.add(rowElement);
        tr.appendChild(header);
      } else {
        const td = document.createElement("td");
        td.appendChild(text);
        tr.appendChild(td);
      }
    }
    table.appendChild(tr);
  }
  div.appendChild(table);
  document.querySelector(".table-container").appendChild(div);
  return records;
};

/**
 * Sort the data by the columns specified.
 */
Constants.sortBtn.addEventListener("click", () => {
  let recordsCopy = [...records];
  const columns = [];

  if (ascending.childElementCount === 0 && descending.childElementCount === 0)
    return;
  else {
    // Can only do ascending then descending order. Next time, also add descending then by ascending order.
    Constants.ascendingBox.childNodes.forEach((node) => columns.push(node.value));
    Constants.descendingBox.childNodes.forEach((node) =>
      columns.push("-" + node.value)
    );
  }

  const sortedRecords = mergeSort(recordsCopy, compareBy(columns));

  // Put sorted records back into table.
  const convertedSortedRecords = [Array.from(headers)].concat(
    sortedRecords.map(Object.values)
  );

  // Put the sorted table on the page.
  createTable(convertedSortedRecords, `Sorted by: ${JSON.stringify(columns)}`);
});
