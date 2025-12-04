


// import { app } from "@azure/functions";
// import { readTasks, writeTasks } from "./store.js";

// app.http("updatetask", {
//   methods: ["PUT"],                                  // PUT request for update
//   authLevel: "anonymous",
//   handler: async (req) => {
//     const body = await req.json();                   // body se data read kar rahe
//     const tasks = readTasks();                       // storage.json file read

//     const task = tasks.find(t => t.rowKey === body.rowKey); // jis rowKey ka match mile wo task find
//     if (!task) return { status: 404, jsonBody: { error: "Task not found" }};

//     if (body.status) task.status = body.status;      // agar status bheja → update karo
//     if (body.title) task.title = body.title;         // agar title bheja → update karo

//     writeTasks(tasks);                               // storage.json me update save
//     return { status: 200, jsonBody: task };          // updated object return
//   }
// });

import { app } from "@azure/functions";
import { updateTask } from "./store.js";

app.http("updatetask", {
  methods: ["PUT"],                                     // PUT = full update
  authLevel: "anonymous",
  handler: async (req) => {
    try {
      const body = await req.json();                   // request body read
      const { rowKey, title, status } = body;          // full fields destructure

      if (!rowKey || !title || !status) {              // validation agar kuch missing ho
        return {
          status: 400,
          jsonBody: { error: "rowKey, title, status required" }
        };
      }

      await updateTask(rowKey, { title, status });     // DB update call (merge)
      return {
        status: 200,
        jsonBody: { ok: true, msg: "update success", rowKey, title, status }
      };

    } catch (err) {
      console.error("PUT ERROR:", err);
      return { status: 500, jsonBody: { error: "UPDATE failed" } };
    }
  }
});
