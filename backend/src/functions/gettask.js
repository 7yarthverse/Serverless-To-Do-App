// // backend/src/gettask.js
// const { app } = require("@azure/functions");
// app.http("gettask", {
//   methods: ["GET"],
//   authLevel: "anonymous",
//   handler: async () => {
//     const tasks = [
//       { rowKey: "1", title: "Dummy task 1", status: "pending" },
//       { rowKey: "2", title: "Dummy task 2", status: "done" },
//       { rowKey: "2", title: "Dummy task 2", status: "done" },
//       { rowKey: "2", title: "Dummy task 2", status: "done" },
//       { rowKey: "2", title: "Dummy task 2", status: "done" }
//     ];

//     return {
//       status: 200,
//       jsonBody: tasks
//     };
//   }
// });
import { app } from "@azure/functions";
import { getAllTasks } from "./store.js";

app.http("gettask", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async () => {
    try {
      const tasks = await getAllTasks();                      // DB call
      return { status: 200, jsonBody: tasks };                // success
    } catch (err) {
      console.error(err);
      return { status: 500, jsonBody: { error: "GET failed" } };
    }
  }
});
