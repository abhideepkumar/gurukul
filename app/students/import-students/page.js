"use client";
import { useState, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon, Loader2, FileIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { processBulkAdmission } from "@/app/actions/bulkActions";
import { parse } from "csv-parse/sync";

export default function ImportStudentsPage() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile?.type !== "text/csv") {
      toast.error("Please upload a CSV file");
      return;
    }
    setFile(selectedFile);
    console.log("Selected file:", selectedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    maxFiles: 1,
  });

  const handleImport = async () => {
    if (!file) {
      toast.error("No file selected");
      return;
    }

    try {
      console.log("File:", file);
      setIsUploading(true);
      const fileContent = await file.text();
      console.log("File Content:", fileContent);
      if (!fileContent.trim()) {
        throw new Error("The uploaded file is empty or invalid.");
      }
      
      const records =await parse(fileContent.trim(), {
        columns: true,
        skip_empty_lines: true,
        relax_column_count: true,
        trim: true,
        bom: true,
      });

      console.log("Parsed CSV Records:", records);

      const result = await processBulkAdmission(records);
      if (!result.success) {
        throw new Error(result.message);
      }

      toast.success(`Processed ${result.message}`);

      // Handle failed records
      if (result.report?.failed > 0) {
        const failedResults = result.report.report.filter((r) => !r.success);
        const blob = new Blob([JSON.stringify(failedResults, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `failed-imports-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("CSV Parsing Error:", error);
      toast.error(error.message || "Failed to process file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setFile(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center py-8">
          <CardTitle className="text-2xl font-bold">Import Students</CardTitle>
          <CardDescription className="mt-2 text-lg">
            Upload a CSV file with student information.{" "}
            <a href="/bulk_students.csv" download="bulk_students.csv" className="text-primary hover:underline">
              Download template
            </a>
          </CardDescription>
        </CardHeader>

        <CardContent className="py-6 space-y-6">
          <div
            {...getRootProps()}
            className={`flex items-center justify-center h-64 border-4 border-dashed rounded-lg transition-colors cursor-pointer 
              ${isDragActive ? "border-primary bg-primary/5" : "border-slate-300"} 
              ${file ? "bg-slate-50" : ""}`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col gap-4">
              {file ? (
                <>
                  <FileIcon className="h-12 w-12 text-primary" />
                  <span className="text-lg text-slate-600">{file.name}</span>
                </>
              ) : (
                <>
                  <PlusIcon className="h-12 w-12 text-slate-400" />
                  <span className="text-lg text-slate-400">
                    {isDragActive ? "Drop file here" : "Drag and drop your CSV file here"}
                  </span>
                </>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-4 py-4">
          <Button variant="outline" onClick={handleCancel} disabled={isUploading}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={!file || isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importing...
              </>
            ) : (
              "Import"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
