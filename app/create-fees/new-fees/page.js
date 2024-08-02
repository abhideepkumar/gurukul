import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { CalendarDaysIcon } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex justify-center items-center h-screen p-6">
      <Card className="w-full max-w-lg rounded-2xl shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-center text-2xl font-semibold">Create Fee Structure</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-4">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-lg">Name</Label>
            <Input id="name" placeholder="Enter name" className="rounded-md text-lg" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="amount" className="text-lg">Amount</Label>
            <Input id="amount" type="number" placeholder="Enter amount" className="rounded-md text-lg" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="recurring" className="text-lg">Choose Recurring</Label>
            <Select>
              <SelectTrigger id="recurring" className="rounded-md flex items-center justify-between text-lg">
                <SelectValue placeholder="Select recurring" />
                <div className="h-5 w-5 text-muted-foreground" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="annually">Annually</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label htmlFor="remark" className="text-lg">Remark</Label>
            <Input id="remark" placeholder="Enter remark" className="rounded-md text-lg" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-6 p-4">
          <Button variant="outline" className="w-full rounded-md text-red-500 text-lg py-2">
            Cancel
          </Button>
          <Button className="w-full rounded-md text-white text-lg py-2">
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
