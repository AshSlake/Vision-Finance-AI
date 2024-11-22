"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Loader2Icon } from "lucide-react";
import { GenerateAiReport } from "../_actions/generate-ai-report";
import { useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Markdown from "react-markdown";
import GeminiButton from "./efectButtonIaReport";

interface AiReportButtonProps {
  month: string;
}

const AibButton = ({ month }: AiReportButtonProps) => {
  const [report, setReport] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleGenerateReportClick = async () => {
    try {
      setIsLoading(true);
      const aiReport = await GenerateAiReport({ month });
      setReport(aiReport);
    } catch (error) {
      console.error("Error generating report:", error);
    }
    setIsLoading(false);
  };
  return (
    <Dialog>
      <DialogTrigger>
        <GeminiButton onClick={handleGenerateReportClick} disabled={isLoading}>
          {isLoading && <Loader2Icon className="mr-2 animate-spin" />}
          Gerar relatório de IA
        </GeminiButton>{" "}
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Relatório de IA</DialogTitle>
          <DialogDescription>
            Use a inteligencia artificial para gerar relatórios e insights
            relevantes sobre suas finanças.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
          <Markdown>{report}</Markdown>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleGenerateReportClick} disabled={isLoading}>
            {isLoading && <Loader2Icon className="animate-spin" />}
            Gerar relatório
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AibButton;
