import { Separator } from "../ui/separator";

type Props = {
  title: string;
};

export const Title = ({ title }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-foreground text-xl">{title}</h2>
      <Separator className="h-1" />
    </div>
  );
};
