
// import { app } from "@azure/functions";
// import { readTasks, writeTasks } from "./store.js";

// app.http("deletetask", {
//   methods: ["DELETE"],
//   authLevel: "anonymous",
//   handler: async (req) => {
//     try {
//       const url = new URL(req.url);
//       const rowKey = url.searchParams.get("rowKey");

//       const tasks = readTasks();
//       const filtered = tasks.filter((t) => t.rowKey !== rowKey);

//       writeTasks(filtered);

//       return { status: 200, jsonBody: { ok: true } };
//     } catch (err) {
//       console.error(err);
//       return { status: 500, jsonBody: { error: "DELETE failed" } };
//     }
//   },
// });


import { app } from "@azure/functions";
import { deleteTask } from "./store.js";

app.http("deletetask", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  handler: async (req) => {
    try {
      const rowKey = req.query.get("rowKey");
      await deleteTask(rowKey);
      return { status: 200, jsonBody: { ok: true, rowKey } };
    } catch (err) {
      console.error(err);
      return { status: 500, jsonBody: { error: "DELETE failed" } };
    }
  }
});
