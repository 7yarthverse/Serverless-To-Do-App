// import { app } from "@azure/functions";
// import { readTasks, writeTasks } from "./store.js";

// app.http("patchtask", {
//   methods: ["PATCH"],                          // PATCH = partial update
//   authLevel: "anonymous",
//   handler: async (req) => {
//     const body = await req.json();             // body read kar rahe
//     const tasks = readTasks();                 // storage.json se list read

//     const task = tasks.find(t => t.rowKey === body.rowKey); // jis task ko update karna
//     if (!task) return { status: 404, jsonBody: { error: "Task not found" }};

//     if (body.title) task.title = body.title;   // sirf title update (agar send kiya)
//     if (body.status) task.status = body.status;// sirf status update (agar send kiya)

//     writeTasks(tasks);                         // file me save kar rahe
//     return { status: 200, jsonBody: task };    // final updated task return
//   }
// });

import { app } from "@azure/functions";
import { updateTask } from "./store.js";

app.http("patchtask", {
  methods: ["PATCH"],
  authLevel: "anonymous",
  handler: async (req) => {
    try {
      const body = await req.json();
      await updateTask(body.rowKey, body);                      // partial update
      return { status: 200, jsonBody: body };
    } catch (err) {
      console.error(err);
      return { status: 500, jsonBody: { error: "PATCH failed" } };
    }
  }
});
