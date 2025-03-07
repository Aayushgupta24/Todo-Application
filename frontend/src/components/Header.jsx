"use client"

function Header({ activeTab, setActiveTab }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <h1 className="text-3xl font-bold text-gray-800">Todo List Application</h1>

      <div className="flex bg-white rounded-md shadow-sm">
        <button
          className={`px-4 py-2 rounded-l-md ${
            activeTab === "todos" ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("todos")}
        >
          Todos
        </button>
        <button
          className={`px-4 py-2 rounded-r-md ${
            activeTab === "users" ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
      </div>
    </div>
  )
}

export default Header

