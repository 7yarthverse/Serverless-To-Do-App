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
////////////////////////////////////////////////////////////////////////////
//  import { useEffect, useState } from "react";
// import { addTask, deleteTask, getTasks, patchTask, updateTask } from "./api";

// export default function Todo() {
//   const [tasks, setTasks] = useState([]);   // tasks ki list rakhega state me
//   const [title, setTitle] = useState(""); 
//    const [editValues, setEditValues] = useState({});  // new task title input

//   const load = () => {
//     getTasks().then(setTasks);  // backend se fresh data fetch karke set
//   };

//   useEffect(() => {
//     load();  // page load hote hi data le aao
//   }, []);

//   const handleAdd = () => {
//     if (!title.trim()) return;  // empty title ignore karo
//     addTask(title)              // new task backend me add
//       .then(() => {
//         setTitle("");           // input empty
//         load();                 // UI refresh with latest data
//       });
//   };

//   const handleUpdate = (id,title) => {
//     updateTask(id, title,"done")      // status done kar rahe
//       .then(load);
//   };

// const handlePatch = (id, newTitle, newStatus) => {          // doosra param title, teesra status
//   patchTask(id, newTitle, newStatus)                        // backend ko patch request
//     .then(() => {
//       setEditValues({});                                    // rename inputs reset
//       load();                                               // UI refresh
//     });
// };

//   const handleDelete = (id) => {
//     deleteTask(id)              // backend me delete kar do
//       .then(load);
//   };

//   return (
//     <div>
//       <input
//         value={title}           // input bind
//         onChange={e => setTitle(e.target.value)} // typing update
//         placeholder="New Task"
//       />
//       <button onClick={handleAdd}>Add</button>

//       <ul>
//         {tasks.map(t => (
//           <li key={t.rowKey}>
//             {t.title} - {t.status}
//             <button onClick={() => handleUpdate(t.rowKey,t.title)}>Done</button>
//             <button onClick={() => handleDelete(t.rowKey)}>Del</button>
//             <input
//   placeholder="Rename"                                       // rename text dalne ke liye input
//   value={editValues[t.rowKey] || ""}                         // per row tracked rename
//   onChange={(e) =>
//     setEditValues({ ...editValues, [t.rowKey]: e.target.value }) // new rename text set
//   }
// />

// <button onClick={() => handlePatch(t.rowKey, editValues[t.rowKey], null)}>
//   Save Title                                                 {/* sirf title patch */}
// </button>

// <button onClick={() =>
//   handlePatch(
//     t.rowKey,
//     null,                                                    // title untouched
//     t.status === "pending" ? "done" : "pending"             // toggle new status
//   )
// }>
//   Toggle Status                                              {/* sirf status patch */}
// </button>



//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

//enterprise ui design
// 🚀 Enterprise Grade UI (React-Only)

import { useCallback, useEffect, useState } from "react";
import { addTask, deleteTask, getTasks, patchTask, updateTask } from "./api";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editValues, setEditValues] = useState({});

  const load = useCallback(() => {
    getTasks().then(setTasks);
  }, []);

  useEffect(() => {
    const run = async () => { await load(); };
    run();
  }, [load]);

  const handleAdd = () => {
    if (!title.trim()) return;
    addTask(title).then(() => {
      setTitle("");
      load();
    });
  };

  return (
    <div className="container">
      <h1 className="heading">Task Manager</h1>

      <div className="inputRow">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Create new task..."
        />
        <button className="btn btnPrimary" onClick={handleAdd}>Add</button>
      </div>

      <ul className="taskList">
        {tasks.map((t) => (
          <li key={t.rowKey} className="card">
            <div className="rowTop">
              <span className={`title ${t.status === "done" ? "done" : ""}`}>
                {t.title}
              </span>
              <span className="status">{t.status}</span>
            </div>

            <div className="rowActions">
              <button className="btn btnSuccess"
                onClick={() => updateTask(t.rowKey, t.title, "done").then(load)}>
                Complete
              </button>

              <button className="btn btnDanger"
                onClick={() => deleteTask(t.rowKey).then(load)}>
                Delete
              </button>

              <input
                className="rename"
                placeholder="Rename"
                value={editValues[t.rowKey] || ""}
                onChange={(e) =>
                  setEditValues({ ...editValues, [t.rowKey]: e.target.value })
                }
              />

              <button className="btn btnInfo"
                onClick={() =>
                  patchTask(t.rowKey, editValues[t.rowKey], null).then(() => {
                    setEditValues({});
                    load();
                  })
                }>
                Save
              </button>

              <button className="btn btnWarning"
                onClick={() =>
                  patchTask(
                    t.rowKey,
                    null,
                    t.status === "pending" ? "done" : "pending"
                  ).then(load)
                }>
                Toggle
              </button>
            </div>
          </li>
        ))}
      </ul>

      <style>{`
      .container {
        max-width: 550px;
        margin: auto;
        padding: 18px;
        font-family: 'Inter', sans-serif;
        background:#0f0f10;
        color:white;
      }

      .heading {
        text-align:center;
        font-size:32px;
        font-weight:700;
        color:#e2e8f0;
        margin-bottom:20px;
      }

      .inputRow {
        display:flex;
        gap:12px;
        margin-bottom:18px;
      }

      input {
        flex:1;
        padding: 12px;
        border-radius:10px;
        background:#1b1b1b;
        color:white;
        border:1px solid #2f2f2f;
        font-size:15px;
      }

      .taskList {
        display:flex;
        flex-direction:column;
        gap:12px;
      }

      .card {
        background:#161616;
        padding:14px 16px;
        border-radius:14px;
        border:1px solid #2b2b2b;
        display:flex;
        flex-direction:column;
        gap:10px;
      }

      .rowTop {
        display:flex;
        justify-content:space-between;
        align-items:center;
      }

      .title {
        font-size:18px;
        font-weight:600;
        color:#e5e5e5;
      }

      .title.done {
        color:#4ade80;
        text-decoration:line-through;
      }

      .status {
        padding:4px 12px;
        border-radius:8px;
        background:#1e293b;
        color:#38bdf8;
        font-size:13px;
      }

      .rowActions {
        display:flex;
        gap:8px;
        flex-wrap:wrap;
      }

      .btn {
        padding:7px 12px;
        border:none;
        border-radius:8px;
        font-size:13px;
        cursor:pointer;
        font-weight:600;
        color:white;
      }

      .btnPrimary { background:#2563eb; }
      .btnSuccess { background:#16a34a; }
      .btnDanger { background:#dc2626; }
      .btnWarning { background:#d97706; }
      .btnInfo { background:#0ea5e9; }

      .rename {
        flex:1;
        padding:7px;
        border-radius:8px;
        background:#111;
        color:white;
        border:1px solid #444;
      }

      @media(max-width: 480px){
        .rowTop{flex-direction:column;align-items:flex-start;gap:6px;}
      }
      `}</style>
    </div>
  );
}
