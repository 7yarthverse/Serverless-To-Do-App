// // src/functions/store.js
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const filePath = path.join(__dirname, "storage.json");

// export function readTasks() {
//   try {
//     if (!fs.existsSync(filePath)) {
//       fs.writeFileSync(filePath, "[]");
//       return [];
//     }

//     const data = fs.readFileSync(filePath, "utf-8");
//     if (!data.trim()) return [];
//     return JSON.parse(data);
//   } catch (err) {
//     console.error("READ ERROR", err);
//     return [];
//   }
// }

// export function writeTasks(tasks) {
//   try {
//     fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
//   } catch (err) {
//     console.error("WRITE ERROR", err);
//   }
// }

//azure db connected from here step 2 
// Ye module Azure Table Storage se CRUD operations handle karega

// Azure Table Storage CRUD with error handling

import { TableClient } from "@azure/data-tables"; // Azure DB client

const connection = process.env.AzureWebJobsStorage;            // env connection string
const tableName = "Tasks";                                     // Table name

export const client = TableClient.fromConnectionString(
  connection,
  tableName
);

// 🟢 GET ALL
export async function getAllTasks() {
  try {
    const tasks = [];
    for await (const entity of client.listEntities()) {        // table se read
      tasks.push(entity);
    }
    return tasks;
  } catch (err) {
    console.error("DB READ ERROR:", err);
    throw new Error("Database Read Failed");
  }
}

// 🟡 ADD
export async function addTask(title) {
  try {
    const task = {
      partitionKey: "task",
      rowKey: Date.now().toString(),
      title,
      status: "pending"
    };
    await client.createEntity(task);                           // insert record
    return task;
  } catch (err) {
    console.error("DB ADD ERROR:", err);
    throw new Error("Database Insert Failed");
  }
}

// 🟣 PATCH (partial update)
export async function updateTask(rowKey, data) {
  try {
    await client.updateEntity(
      { partitionKey: "task", rowKey, ...data },
      "Merge"                                                 // partial update
    );
  } catch (err) {
    console.error("DB UPDATE ERROR:", err);
    throw new Error("Database Update Failed");
  }
}

// 🔴 DELETE
export async function deleteTask(rowKey) {
  try {
    await client.deleteEntity("task", rowKey);
  } catch (err) {
    console.error("DB DELETE ERROR:", err);
    throw new Error("Database Delete Failed");
  }
}

