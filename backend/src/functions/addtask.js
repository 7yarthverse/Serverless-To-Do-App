
// import { app } from "@azure/functions";
// import { readTasks, writeTasks } from "./store.js";

// app.http("addtask", {
//   methods: ["POST"],
//   authLevel: "anonymous",
//   handler: async (req) => {
//     try {
//       const body = await req.json();
//       const tasks = readTasks();

//       const newTask = {
//         rowKey: Date.now().toString(),
//         title: body.title,
//         status: "pending",
//       };

//       tasks.push(newTask);
//       writeTasks(tasks);

//       return { status: 201, jsonBody: newTask };
//     } catch (err) {
//       console.error(err);
//       return { status: 500, jsonBody: { error: "ADD failed" } };
//     }
//   },
// });


import { app } from "@azure/functions";
import { addTask } from "./store.js";

app.http("addtask", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (req) => {
    try {
      const { title } = await req.json();                     // body read
      const task = await addTask(title);                      // create DB
      return { status: 200, jsonBody: task };
    } catch (err) {
      console.error(err);
      return { status: 500, jsonBody: { error: "POST failed" } };
    }
  }
});
