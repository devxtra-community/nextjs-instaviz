import { Card, CardContent } from "@/components/ui/card"
import {
ResponsiveContainer,
LineChart,
Line,
Tooltip,
XAxis,
YAxis,
CartesianGrid,
} from "recharts"
import { Users, UserCheck, UserX, UserCog, Star } from "lucide-react"

const monthlyUsers = [
{ name: "Jan", users: 3200 },
{ name: "Feb", users: 4200 },
{ name: "Mar", users: 5100 },
{ name: "Apr", users: 4800 },
{ name: "May", users: 5900 },
{ name: "Jun", users: 6400 },
{ name: "Jul", users: 7200 },
{ name: "Aug", users: 8100 },
{ name: "Sep", users: 7700 },
{ name: "Oct", users: 8600 },
{ name: "Nov", users: 9100 },
{ name: "Dec", users: 9700 },
]

const activeHours = [
{ name: "1 AM", value: 10 },
{ name: "4 AM", value: 20 },
{ name: "8 AM", value: 40 },
{ name: "12 PM", value: 70 },
{ name: "4 PM", value: 80 },
{ name: "8 PM", value: 55 },
{ name: "11 PM", value: 30 },
]

const cards = [
{ title: "Registered Users", value: "12.4K", percentage: "+8.2%", icon: <Users /> },
{ title: "Guest Users", value: "8.9K", percentage: "-2.1%", icon: <UserCog /> },
{ title: "Logged Users", value: "6.3K", percentage: "+5.5%", icon: <UserCheck /> },
// { title: "Banned Users", value: "340", percentage: "-1.2%", icon: <UserX /> },
{ title: "Premium Users", value: "2.4K", percentage: "+12.8%", icon: <Star /> },
]

export default function UserManagementDashboard() {
return ( <><div className="bg-[#f8f9fc] min-h-screen p-6 space-y-8">
 <h1 className="text-2xl font-bold text-gray-900 mb-2"></h1> 


  
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {cards.slice(0, 4).map((card, index) => (
      <Card
        key={index}
        className="rounded-2xl shadow-sm hover:shadow-md transition bg-white border border-gray-100"
      >
        <CardContent className="p-4 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 font-medium">{card.title}</p>
            <h2 className="text-xl font-bold text-gray-900">{card.value}</h2>
            <p
              className={`text-xs font-semibold ${
                card.percentage.includes("+") ? "text-green-500" : "text-red-500"
              }`}
            >
              {card.percentage}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg shadow-inner bg-[#AD49E1]">
            {card.icon}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4  ">
    {cards.slice(4).map((card, index) => (
      <Card
        key={index + 3}
        className="rounded-2xl shadow-sm hover:shadow-md transition bg-white border border-gray-100"
      >
        <CardContent className="p-4 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 font-medium">{card.title}</p>
            <h2 className="text-xl font-bold text-gray-900">{card.value}</h2>
            <p
              className={`text-xs font-semibold ${
                card.percentage.includes("+") ? "text-green-500" : "text-red-500"
              }`}
            >
              {card.percentage}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg shadow-inner bg-[#AD49E1]">
            {card.icon}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>

  {/* Line Graph Section */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
    {/* New Users Per Month */}
    <Card className="rounded-2xl shadow-md bg-white border border-gray-100">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              New Users per Month
            </h3>
            <p className="text-xs text-gray-500">
              Monthly registration growth overview
            </p>
          </div>
          <span className="text-green-500 text-sm font-semibold">
            +15.3% from last quarter
          </span>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyUsers} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#AD49E1" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#AD49E1" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b7280" }} />
            <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#AD49E1",
                border: "none",
                color: "#fff",
                borderRadius: "10px",
              }}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#AD49E1"
              strokeWidth={3}
              fill="url(#usersGradient)"
              dot={{ r: 4, fill: "#AD49E1" }}
              activeDot={{ r: 6, fill: "#7B2CBF" }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-3 text-center mt-6">
          <div>
            <h4 className="text-lg font-bold text-gray-900">9.7K</h4>
            <p className="text-xs text-gray-500">Total Users</p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-green-500">+1.2K</h4>
            <p className="text-xs text-gray-500">New This Month</p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-[#AD49E1]">+15.3%</h4>
            <p className="text-xs text-gray-500">Growth Rate</p>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Average Active Time */}
    <Card className="rounded-2xl shadow-md bg-white border border-gray-100">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Average Active Time
          </h3>
          <span className="text-green-500 text-sm font-semibold">
            +6.4% from last week
          </span>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={activeHours}>
            <defs>
              <linearGradient id="timeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#AD49E1" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#AD49E1" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b7280" }} />
            <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
            <Tooltip
              contentStyle={{

                backgroundColor: "#AD49E1",
                border: "none",
                color: "#fff",
                borderRadius: "10px",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#AD49E1"
              strokeWidth={3}
              fill="url(#timeGradient)"
              dot={{ r: 4, fill: "#AD49E1" }}
              activeDot={{ r: 6, fill: "#7B2CBF" }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="text-center mt-4">
          <h2 className="text-3xl font-bold text-gray-900">3h 42m</h2>
          <p className="text-sm text-gray-500">Avg. user active time per day</p>
        </div>
      </CardContent>
    </Card>
  </div>
</div>
</>

)
}
