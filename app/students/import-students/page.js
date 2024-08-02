import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusIcon } from '@/assets/icons';

export default function ImportStudentsPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-4xl mx-4">
        <CardHeader className="text-center py-8">
          <CardTitle className="text-2xl font-bold">Import file by just drag and drop</CardTitle>
          <CardDescription className="mt-2 text-lg">
            The file should be in the correct format otherwise import will fail.{" "}
            <Link href="#" className="underline" prefetch={false}>
              Click here
            </Link>
            {" "}to download the format.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-12">
          <div className="flex items-center justify-center h-64 border-4 border-dashed border-slate-300 rounded-lg">
            <div className="flex flex-col items-center gap-4">
              <PlusIcon className="h-12 w-12 text-gray-400" />
              <span className="text-lg text-gray-400">Drag and drop your file here</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end py-4">
          <Button variant="destructive" className="mr-2">Cancel</Button>
          <Button>Import</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
