'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ImportResultsTable({ passedRecords, failedRecords }) {
  const renderTable = (records) => (
    <ScrollArea className="h-[400px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Admission ID</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Roll Number</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record, index) => (
            <TableRow key={index}>
              <TableCell>{record.full_name}</TableCell>
              <TableCell>{record.admission_id}</TableCell>
              <TableCell>{record.classname}</TableCell>
              <TableCell>{record.roll_number}</TableCell>
              <TableCell>
                {record.success ? (
                  <span className="text-green-600">{record?.message}</span>
                ) : (
                  <span className="text-red-600">
                    {record?.message.details || "Failed"}
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  )

  return (
    <Tabs defaultValue="passed" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="passed">Passed ({passedRecords.length})</TabsTrigger>
        <TabsTrigger value="failed">Failed ({failedRecords.length})</TabsTrigger>
      </TabsList>
      <TabsContent value="passed">
        {renderTable(passedRecords)}
      </TabsContent>
      <TabsContent value="failed">
        {renderTable(failedRecords)}
      </TabsContent>
    </Tabs>
  )
}
