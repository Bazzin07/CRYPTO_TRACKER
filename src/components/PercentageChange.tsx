
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface PercentageChangeProps {
  value: number;
  className?: string;
}

const PercentageChange = ({ value, className }: PercentageChangeProps) => {
  
  const isPositive = value > 0;
  const isZero = value === 0;
  
 
  const textColor = isPositive ? 'text-green-500' : isZero ? 'text-gray-500' : 'text-red-500';
  
  return (
    <div className={cn("flex items-center", textColor, className)}>
      {isPositive ? (
        <ArrowUp className="h-4 w-4 mr-1" />
      ) : isZero ? null : (
        <ArrowDown className="h-4 w-4 mr-1" />
      )}
      <span>{Math.abs(value).toFixed(2)}%</span>
    </div>
  );
};

export default PercentageChange;
