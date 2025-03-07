"use client"
import { useTodoContext } from "../context/TodoContext"

function UserList() {
  const { users, activeUser, setActiveUser } = useTodoContext()

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Users</h2>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className={`flex items-center justify-between p-3 rounded-lg ${
              activeUser?.id === user.id ? "bg-blue-50" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>

            <button
              onClick={() => setActiveUser(user)}
              className={`px-4 py-2 rounded-md ${
                activeUser?.id === user.id
                  ? "bg-blue-500 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {activeUser?.id === user.id ? "Active" : "Switch"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserList

