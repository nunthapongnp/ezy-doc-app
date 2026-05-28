import Link from "next/link";
import { Button } from "@/components/ui/button"; // ถ้าใช้ shadcn

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 text-center">
      <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-6 text-foreground">
        Oops! Page Not Found
      </h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
