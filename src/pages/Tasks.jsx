import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fetchTasks = async () => {
        try {
            const res = await api.get("/tasks");
            setTasks(res.data.data);
        } catch (err) {
            if (err.response?.status === 401) {
                localStorage.removeItem("accessToken");
                navigate("/");
            }
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await api.post("/tasks", { title, description, status: "pending" });
            setTitle("");
            setDescription("");
            fetchTasks();
        } catch (err) {
            setError(err.response?.data?.message || "Could not create task");
        }
    };

    const toggleStatus = async (task) => {
        const nextStatus = task.status === "done" ? "pending" : "done";
        try {
            await api.put(`/tasks/${task._id}`, { status: nextStatus });
            fetchTasks();
        } catch (err) {
            setError(err.response?.data?.message || "Could not update task");
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (err) {
            setError(err.response?.data?.message || "Could not delete task");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/");
    };

    return (
        <div style={{ maxWidth: "500px", margin: "50px auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>My Tasks</h2>
                <button onClick={handleLogout}>Logout</button>
            </div>

            <form onSubmit={handleCreate} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ marginLeft: "8px" }}
                />
                <button type="submit" style={{ marginLeft: "8px" }}>
                    Add
                </button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul style={{ listStyle: "none", padding: 0 }}>
                {tasks.map((task) => (
                    <li
                        key={task._id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "8px",
                            padding: "8px",
                            border: "1px solid #444",
                        }}
                    >
                        <div>
                            <strong
                                style={{
                                    textDecoration: task.status === "done" ? "line-through" : "none",
                                }}
                            >
                                {task.title}
                            </strong>
                            <p style={{ margin: 0, fontSize: "0.9em" }}>{task.description}</p>
                        </div>
                        <div>
                            <button onClick={() => toggleStatus(task)}>
                                {task.status === "done" ? "Undo" : "Done"}
                            </button>
                            <button onClick={() => handleDelete(task._id)} style={{ marginLeft: "8px" }}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Tasks;