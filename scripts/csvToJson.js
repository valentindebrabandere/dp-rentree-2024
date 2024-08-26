import fs from "fs";
import csv from "csv-parser";

const results = [];

// Function to check if an object has only empty values
function isEmpty(obj) {
  return Object.values(obj).every(
    (value) =>
      (Array.isArray(value) && value.length === 0) ||
      value === "" ||
      value === null ||
      value === false
  );
}

// Read the CSV file using 'latin1' encoding
fs.createReadStream("./data/datas.csv", { encoding: "latin1" }) // Change encoding to 'latin1'
  .pipe(csv())
  .on("data", (data) => {
    try {
      // Create a JSON object for each row
      const jsonObject = {
        title: data["titre"] || "",
        slug: data["slug"] || "",
        channels: data["chaines"]
          ? data["chaines"].split(",").map((item) => item.trim())
          : [],
        date: data["date"] || "",
        presenters: data["presentateurs"]
          ? data["presentateurs"].split(",").map((item) => item.trim())
          : [],
        categorie: data["catégiorie"]
          ? data["catégiorie"].split(",").map((item) => item.trim())
          : [],
        exluPlay: data["exclu play"] === "v",
        nouveau: data["nouveau"] === "v",
        description: data["description"] || "",
      };

      // Add to results only if it's not empty
      if (!isEmpty(jsonObject)) {
        results.push(jsonObject);
      }
    } catch (err) {
      console.error("Error processing data:", data, err);
    }
  })
  .on("end", () => {
    try {
      // Write the JSON array to a file
      fs.writeFileSync(
        "../src/data/shows.json",
        JSON.stringify(results, null, 2),
        "utf-8"
      );
      console.log("CSV file successfully processed and JSON file created.");
    } catch (err) {
      console.error("Error writing JSON file:", err);
    }
  })
  .on("error", (error) => {
    console.error("Error reading CSV file:", error);
  });
