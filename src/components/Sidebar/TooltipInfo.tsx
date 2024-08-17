import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { InfoCircledIcon } from "@radix-ui/react-icons";

type TooltipInfoProps = {
  title: string;
  content: string;
};

export const TooltipInfo = ({ title, content }: TooltipInfoProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <InfoCircledIcon className="w-4 h-4 text-foreground" />
      </TooltipTrigger>
      <TooltipContent className="w-80 p-4 gap-2 flex flex-col" side="right">
        <h4 className="font-semibold text-base">{title}</h4>
        <p className="text-sm">{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
