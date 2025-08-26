import { Card, CardContent, CardHeader, CardTitle } from "@/components/student/dashboard/ui/card"
import { Avatar, AvatarFallback } from "@/components/student/dashboard/ui/avatar"
import { Button } from "@/components/student/dashboard/ui/button"
import { Input } from "@/components/student/dashboard/ui/input"
import { Badge } from "@/components/student/dashboard/ui/badge"
import { Phone, Video, Info, Send, Paperclip, Check } from "lucide-react"

export default function MessagesPage() {
  const conversations = [
    { id: 1, name: "Suporte ADMIN", lastMessage: "Pesquisar chat", unread: false },
    { id: 2, name: "Suporte ADMIN", lastMessage: "Pesquisar chat", unread: 1 },
    { id: 3, name: "Suporte ADMIN", lastMessage: "Pesquisar chat", unread: false },
    { id: 4, name: "Suporte ADMIN", lastMessage: "Pesquisar chat", unread: false },
  ]

  const messages = [
    {
      id: 1,
      sender: "other",
      content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      time: "8:00 PM",
    },
    {
      id: 2,
      sender: "me",
      content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      time: "8:00 PM",
    },
    {
      id: 3,
      sender: "other",
      content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      time: "8:00 PM",
    },
    {
      id: 4,
      sender: "me",
      content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      time: "8:00 PM",
    },
    {
      id: 5,
      sender: "other",
      content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      time: "8:00 PM",
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
      {/* Conversations List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-xl">Messages</CardTitle>
          <p className="text-sm text-gray-600">Connect with instructors and Employers</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-orange-500 text-white">SA</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm truncate">{conversation.name}</h4>
                    {conversation.unread && (
                      <Badge className="bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{conversation.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="lg:col-span-2 flex flex-col">
        {/* Chat Header */}
        <CardHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-orange-500 text-white">SA</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">Suporte ADMIN</h3>
                <p className="text-sm text-gray-600">#CU6798H</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Info className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div className="flex items-start gap-2 max-w-xs lg:max-w-md">
                  {message.sender === "other" && (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      OP
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === "me" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.sender === "me" ? "text-blue-100" : "text-gray-500"}`}>
                      {message.time}
                    </p>
                  </div>
                  {message.sender === "me" && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-orange-500 text-white text-xs">JD</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <Input placeholder="Digite a mensagem" className="flex-1" />
            <Button variant="ghost" size="icon">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Check className="w-4 h-4" />
            </Button>
            <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
