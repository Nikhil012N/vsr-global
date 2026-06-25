import { ErrorBoundary, getErrorMessage } from "react-error-boundary";
import { Header } from "./Header";
import mockData from "@/data/mock-data.json";
import { Outlet } from "react-router";
import { Button } from "../ui/Button";
export default function RootLayout() {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div role="alert" className="grid items-center w-screen place-content-center h-screen gap-2">
          <h1 className="font-bold text-2xl">Something went wrong!</h1>
          <pre >{getErrorMessage(error)}</pre>
          <Button variant={"destructive"} onClick={resetErrorBoundary}>Try again</Button>
        </div>
      )}
    >
      <div className="flex flex-col h-screen bg-background overflow-hidden">
        <Header
          userName={mockData.user.name}
          userAvatar={mockData.user.avatar}
        />
        <Outlet/>
      </div>
    </ErrorBoundary>
  );
}
