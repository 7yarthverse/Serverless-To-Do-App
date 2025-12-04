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
import { useEffect, useState } from "react";
import { addTask, deleteTask, getTasks, patchTask, updateTask } from "./api";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editValues, setEditValues] = useState({});
  const [loading, setLoading] = useState(true);  // loading ui

  const load = () => {
    setLoading(true);
    getTasks().then((res) => {
      setTasks(res);
      setLoading(false);
    });
  };

  useEffect(() => {
  const fetchData = async () => {
    await load();   // indirectly setState call allowed safely
  };
  fetchData();
}, []);

  const handleAdd = () => {
    if (!title.trim()) return;
    addTask(title).then(() => {
      setTitle("");
      load();
    });
  };

  const handleUpdate = (id, title) =>
    updateTask(id, title, "done").then(load);

  const handlePatch = (id, newTitle, newStatus) =>
    patchTask(id, newTitle, newStatus).then(() => {
      setEditValues({});
      load();
    });

  const handleDelete = (id) => deleteTask(id).then(load);

  return (
    <div className="appContainer">
      <h1 className="appTitle">🚀To do For You</h1>

      <div className="inputBar">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new task..."
        />
        <button className="addBtn" onClick={handleAdd}>Add</button>
      </div>

      {loading ? (
        <p className="loading">Loading Tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="empty">No tasks yet. Add your first!</p>
      ) : (
        <ul className="taskList">
          {tasks.map((t) => (
            <li key={t.rowKey} className="taskCard">
              <div className="topRow">
                <span className={`taskTitle ${t.status === "done" ? "completed" : ""}`}>
                  {t.title}
                </span>
                <span className="status">{t.status}</span>
              </div>

              <div className="actionRow">
                <button className="btn done" onClick={() => handleUpdate(t.rowKey, t.title)}>Done</button>
                <button className="btn delete" onClick={() => handleDelete(t.rowKey)}>Del</button>

                <input
                  className="renameInput"
                  placeholder="Rename"
                  value={editValues[t.rowKey] || ""}
                  onChange={(e) =>
                    setEditValues({ ...editValues, [t.rowKey]: e.target.value })
                  }
                />

                <button className="btn save" onClick={() => handlePatch(t.rowKey, editValues[t.rowKey], null)}>
                  Save
                </button>

                <button className="btn toggle"
                  onClick={() =>
                    handlePatch(
                      t.rowKey,
                      null,
                      t.status === "pending" ? "done" : "pending"
                    )}>
                  Toggle
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* React scoped UI styling */}
      <style>{`
      .appContainer {
        max-width: 480px;
        margin: auto;
        padding: 18px;
        font-family: Poppins, sans-serif;
      }
      .appTitle {
        text-align: center;
        font-size: 30px;
        margin-bottom: 15px;
        font-weight: 700;
        background: linear-gradient(90deg,#ff4d4d,#ff9f1a);
        -webkit-background-clip: text;
        color: transparent;
      }
      .inputBar {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
      }
      input {
        flex: 1;
        padding: 12px;
        border-radius: 10px;
        border: 2px solid #333;
        background: #111;
        color: #fff;
        font-size: 16px;
      }
      .addBtn {
        padding: 12px 18px;
        border-radius: 10px;
        background: #ff9f1a;
        color: #000;
        font-weight: 600;
        border: none;
        cursor: pointer;
      }
      .taskList {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .taskCard {
        padding: 14px;
        background: #171717;
        border-radius: 14px;
        border: 1px solid #262626;
        box-shadow: 0 0 10px rgba(255,159,26,0.3);
        display: flex;
        flex-direction: column;
        gap: 10px;
        animation: fadeIn 0.3s ease;
        min-height: 80px;
      }
      @keyframes fadeIn { from {opacity:0; transform:translateY(6px);} to {opacity:1;} }

      .topRow {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .taskTitle { font-size: 18px; font-weight: 600; color: #fff; }
      .completed { text-decoration: line-through; color:#41ff41; }
      .status {
        padding: 4px 12px;
        font-size: 12px;
        border-radius: 8px;
        background: #333;
        color: #ff9f1a;
      }
      .actionRow {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .btn {
        padding: 6px 10px;
        font-size: 12px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
      }
      .done { background:#41ff41; }
      .delete { background:#ff4d4d; }
      .save { background:#1e90ff; }
      .toggle { background:#ff9f1a; }
      .renameInput {
        flex: 1;
        background: #222;
        border-radius: 8px;
        border:1px solid #555;
        color:white;
        padding:6px 8px;
      }
      .loading, .empty {
        text-align:center;
        color:#ff9f1a;
        font-size:16px;
        margin-top:20px;
      }

      @media(max-width: 480px){
        .topRow { flex-direction: column; align-items: flex-start; gap:4px; }
      }
      `}</style>
    </div>
  );
}

