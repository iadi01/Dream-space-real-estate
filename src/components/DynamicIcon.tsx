import React from "react";
import * as Icons from "lucide-react";

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function DynamicIcon({ name, className = "", size = 24 }: DynamicIconProps) {
  // Get icon by name from all Lucide icons, fallback to Home if not found
  const IconComponent = (Icons as any)[name] || Icons.Home;
  
  return <IconComponent className={className} size={size} />;
}
