import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  to?: string;
  label?: string;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function BackButton({
  to = "/",
  label = "Back",
  className = "",
  variant = "outline",
  size = "sm"
}: BackButtonProps) {
  const [, setLocation] = useLocation();

  // Default styling based on size
  const sizeClasses = {
    sm: "text-xs h-8 px-3",
    md: "text-sm h-10 px-4",
    lg: "text-base h-12 px-6"
  };

  return (
    <Button
      variant={variant}
      onClick={() => setLocation(to)}
      className={`inline-flex items-center rounded-full gap-1.5 ${sizeClasses[size]} ${className}`}
    >
      <ArrowLeft className={`${size === "sm" ? "h-3.5 w-3.5" : size === "md" ? "h-4 w-4" : "h-5 w-5"}`} />
      {label}
    </Button>
  );
}