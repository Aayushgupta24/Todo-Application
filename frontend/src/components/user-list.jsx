"use client"

import { useTodoContext } from "@/context/todo-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function UserList() {
  const { users, activeUser, setActiveUser } = useTodoContext()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className={`flex items-center justify-between p-3 rounded-lg ${
                activeUser?.id === user.id ? "bg-primary/10" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
              </div>

              <Button variant={activeUser?.id === user.id ? "default" : "outline"} onClick={() => setActiveUser(user)}>
                {activeUser?.id === user.id ? "Active" : "Switch"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

