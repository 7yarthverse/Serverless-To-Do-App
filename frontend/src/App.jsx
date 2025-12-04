// // C:\Users\hpworld\Desktop\todoapp\frontend\src\App.jsx

// import { useEffect, useState } from "react";
// import { addTask, deleteTask, getTasks, updateTask } from "./api";

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [newTitle, setNewTitle] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   async function loadTasks() {
//     try {
//       setLoading(true);
//       setError("");
//       const data = await getTasks();
//       setTasks(data || []);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load tasks");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     loadTasks();
//   }, []);

//   async function handleAdd() {
//     if (!newTitle.trim()) return;
//     try {
//       setLoading(true);
//       setError("");
//       await addTask(newTitle.trim());
//       setNewTitle("");
//       await loadTasks(); // list refresh
//     } catch (err) {
//       console.error(err);
//       setError("Failed to add task");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleToggle(task) {
//     const newStatus = task.status === "done" ? "pending" : "done";
//     try {
//       setLoading(true);
//       setError("");
//       await updateTask(task.rowKey, newStatus);
//       await loadTasks();
//     } catch (err) {
//       console.error(err);
//       setError("Failed to update task");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleDelete(task) {
//     try {
//       setLoading(true);
//       setError("");
//       await deleteTask(task.rowKey);
//       await loadTasks();
//     } catch (err) {
//       console.error(err);
//       setError("Failed to delete task");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div style={{ maxWidth: 480, margin: "40px auto", fontFamily: "sans-serif" }}>
//       <h1>My Todo (Azure Functions)</h1>

//       <div style={{ marginBottom: 16 }}>
//         <input
//           type="text"
//           placeholder="New task title..."
//           value={newTitle}
//           onChange={(e) => setNewTitle(e.target.value)}
//           style={{ padding: 8, width: "70%", marginRight: 8 }}
//         />
//         <button onClick={handleAdd} disabled={loading}>
//           Add
//         </button>
//       </div>

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {tasks.length === 0 && !loading && <p>No tasks yet.</p>}

//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {tasks.map((t) => (
//           <li
//             key={t.rowKey}
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               border: "1px solid #ddd",
//               padding: "8px 12px",
//               marginBottom: 8,
//               borderRadius: 4,
//             }}
//           >
//             <span
//               style={{
//                 textDecoration: t.status === "done" ? "line-through" : "none",
//               }}
//             >
//               {t.title} ({t.status})
//             </span>
//             <div style={{ display: "flex", gap: 8 }}>
//               <button onClick={() => handleToggle(t)} disabled={loading}>
//                 {t.status === "done" ? "Mark Pending" : "Mark Done"}
//               </button>
//               <button onClick={() => handleDelete(t)} disabled={loading}>
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

 import { useEffect, useState } from "react";
import { addTask, deleteTask, getTasks, patchTask, updateTask } from "./api";

export default function Todo() {
  const [tasks, setTasks] = useState([]);   // tasks ki list rakhega state me
  const [title, setTitle] = useState(""); 
   const [editValues, setEditValues] = useState({});  // new task title input

  const load = () => {
    getTasks().then(setTasks);  // backend se fresh data fetch karke set
  };

  useEffect(() => {
    load();  // page load hote hi data le aao
  }, []);

  const handleAdd = () => {
    if (!title.trim()) return;  // empty title ignore karo
    addTask(title)              // new task backend me add
      .then(() => {
        setTitle("");           // input empty
        load();                 // UI refresh with latest data
      });
  };

  const handleUpdate = (id,title) => {
    updateTask(id, title,"done")      // status done kar rahe
      .then(load);
  };

const handlePatch = (id, newTitle, newStatus) => {          // doosra param title, teesra status
  patchTask(id, newTitle, newStatus)                        // backend ko patch request
    .then(() => {
      setEditValues({});                                    // rename inputs reset
      load();                                               // UI refresh
    });
};

  const handleDelete = (id) => {
    deleteTask(id)              // backend me delete kar do
      .then(load);
  };

  return (
    <div>
      <input
        value={title}           // input bind
        onChange={e => setTitle(e.target.value)} // typing update
        placeholder="New Task"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {tasks.map(t => (
          <li key={t.rowKey}>
            {t.title} - {t.status}
            <button onClick={() => handleUpdate(t.rowKey,t.title)}>Done</button>
            <button onClick={() => handleDelete(t.rowKey)}>Del</button>
            <input
  placeholder="Rename"                                       // rename text dalne ke liye input
  value={editValues[t.rowKey] || ""}                         // per row tracked rename
  onChange={(e) =>
    setEditValues({ ...editValues, [t.rowKey]: e.target.value }) // new rename text set
  }
/>

<button onClick={() => handlePatch(t.rowKey, editValues[t.rowKey], null)}>
  Save Title                                                 {/* sirf title patch */}
</button>

<button onClick={() =>
  handlePatch(
    t.rowKey,
    null,                                                    // title untouched
    t.status === "pending" ? "done" : "pending"             // toggle new status
  )
}>
  Toggle Status                                              {/* sirf status patch */}
</button>



          </li>
        ))}
      </ul>
    </div>
  );
}
