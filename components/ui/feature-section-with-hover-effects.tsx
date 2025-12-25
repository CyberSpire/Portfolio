import { cn } from "../../lib/utils";
import React from "react";

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function FeaturesSectionWithHoverEffects({ features, className }: { features: Feature[], className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto", className)}>
      {features.map((feature, index) => (
        <FeatureItem key={feature.title} {...feature} index={index} total={features.length} />
      ))}
    </div>
  );
}

interface FeatureItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  total: number;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  title,
  description,
  icon,
  index,
  total
}) => {
  // Logic to determine grid borders based on index and total count
  // Assuming 4 columns on desktop (lg)
  const isLastRow = index >= total - (total % 4 || 4);
  const isFirstColumn = index % 4 === 0;
  
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-gray-200",
        isFirstColumn && "lg:border-l",
        // Only add bottom border if it's NOT the last row
        !isLastRow && "lg:border-b"
      )}
    >
      {/* Hover Gradients */}
      {!isLastRow && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
      )}
      {isLastRow && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-gray-50 to-transparent pointer-events-none" />
      )}
      
      <div className="mb-4 relative z-10 px-10 text-gray-600">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-gray-300 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-gray-900">
          {title}
        </span>
      </div>
      <p className="text-sm text-gray-600 max-w-xs relative z-10 px-10 leading-relaxed">
        {description}
      </p>
    </div>
  );
};