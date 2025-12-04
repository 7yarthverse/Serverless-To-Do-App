
// backend ka base URL set kar rahe hain  (local dev ke liye)
const API_BASE = "http://todofxn-c6bwayfsdxagbhcj.centralindia-01.azurewebsites.net/api";  // yahan se sare endpoints hit honge

export const getTasks = () => 
  fetch(`${API_BASE}/gettask`)  // backend se GET call
    .then(res => res.json());   // response JSON me convert

export const addTask = (title) =>
  fetch(`${API_BASE}/addtask`, {
    method: "POST",              // POST request
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })  // title bhejna required hai
  }).then(res => res.json());

export const updateTask = (rowKey, title,status) =>
  fetch(`${API_BASE}/updatetask`, {
    method: "PUT",               // PUT request
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rowKey,title, status }) // kaunsa task & kya status
  }).then(res => res.json());

 export const patchTask = (rowKey, title, status) =>         // PATCH = partial update
  fetch(`${API_BASE}/patchtask`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rowKey, title, status })         // jo bhejoge sirf wahi update hoga
  }).then(res => res.json());


export const deleteTask = (rowKey) =>
  fetch(`${API_BASE}/deletetask?rowKey=${rowKey}`, {
    method: "DELETE"             // backend ko delete bol rahe hain
  }).then(res => res.json());
