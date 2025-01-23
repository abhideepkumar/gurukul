import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Calendar, Phone, Mail, MapPin } from "lucide-react"

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-3 p-2">
    <Icon className="h-5 w-5 text-gray-500" />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value || "N/A"}</p>
    </div>
  </div>
)

export const StudentProfile = ({ student }) => {
  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-primary/10 p-4 rounded-full">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{student.full_name}</h2>
            <Badge variant="outline" className="mt-1">
              Class {student.classname}
            </Badge>
          </div>
        </div>

        <div className="grid gap-4">
          <InfoItem icon={Calendar} label="Date of Birth" value={new Date(student.dob).toLocaleDateString()} />
          <InfoItem icon={Phone} label="Phone Number" value={student.phone_no} />
          <InfoItem icon={User} label="Father's Name" value={student.fatherName} />
          <InfoItem icon={Mail} label="Admission ID" value={student.admission_id} />
          <InfoItem icon={MapPin} label="Address" value={student.address} />
        </div>
      </CardContent>
    </Card>
  )
}

