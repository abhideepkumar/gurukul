import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-2xl p-6 sm:p-8 md:p-10 rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Class</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter class name" className="rounded-lg" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fees">Select Fees</Label>
                <Select id="fees" className="rounded-lg">
                  <SelectTrigger>
                    <SelectValue placeholder="Select fees" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="tuition-fee">Tuition Fee</Label>
                <Input
                  id="tuition-fee"
                  type="number"
                  placeholder="Enter tuition fee"
                  className="rounded-lg"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tuition-fee-2">Tuition Fee</Label>
                <Input
                  id="tuition-fee-2"
                  type="number"
                  placeholder="Enter tuition fee"
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="col-span-full grid gap-2">
              <Label htmlFor="remark">Remark</Label>
              <Textarea id="remark" placeholder="Enter remark" className="rounded-lg" />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button>Save</Button>
          <Button variant="outline" className="text-red-500">
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}