import { ReactNode } from "react";

interface PercenetageItem {
  icon: ReactNode;
  title: string;
  value: number;
}

const PercenetageItem = ({ icon, title, value }: PercenetageItem) => {
  return (
    <div className="flex items-center justify-between">
      {/* Icone */}
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <p className="text-sm font-bold">{value}%</p>
    </div>
  );
};

export default PercenetageItem;
