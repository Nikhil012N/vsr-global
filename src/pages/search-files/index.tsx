import { useNavigate } from "react-router";
import { FilesTable } from "@/features/search-files/FilesTable";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useState, useEffect } from "react";
import mockData from "@/data/mock-data.json";

export default function FilesPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectFile = (id: number) => {
    navigate(`/files/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-auto ">
      <FilesTable
        data={mockData.files}
        onSelectFile={handleSelectFile}
        month="Nov"
        year="2024"
      />
    </main>
  );
}
