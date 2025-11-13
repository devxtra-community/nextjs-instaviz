"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

const users = [
  { name: "Arjun Rao", uploads: 542, size: "1.8 GB" },
  { name: "Meghana Nair", uploads: 498, size: "1.6 GB" },
  { name: "Rahul Dev", uploads: 450, size: "1.5 GB" },
  { name: "Sneha Pillai", uploads: 390, size: "1.2 GB" },
]

export default function TopUploadersTable() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-2xl shadow-md border border-gray-100">
        <CardHeader>
          <CardTitle>Top Uploaders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Uploads</TableHead>
                <TableHead>Storage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, i) => (
                <TableRow key={i}>
                  <TableCell className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 bg-[#AD49E1]/10">
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    {user.name}
                  </TableCell>
                  <TableCell>{user.uploads}</TableCell>
                  <TableCell>{user.size}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}
