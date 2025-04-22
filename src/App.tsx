import { useState } from "react";

function App() {
    const [count, setCount] = useState(0);

    return (
        <main className="bg-[rgb(61,61,61)] text-white">
            <h1>Vite + React</h1>
            <div className="card">
                <button
                    className="border-indigo-500 border-6 rounded-2xl hover:bg-[rgb(82,82,82)] hover:cursor-pointer active:bg-[rgb(255,0,0)]"
                    onClick={() => setCount((count) => count + 1)}
                >
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </main>
    );
}

export default App;
