import { Header } from "./Header";
import { useStore } from "../store";
import { sortingAlgorithms } from "../consts/sortingAlgorithms";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

export const MobileHeader = () => {
  const { activeAlgorithm } = useStore();
  const { title, shortDescription } = sortingAlgorithms[activeAlgorithm];
  return (
    <div className="flex md:hidden flex-col gap-2 bg-accent p-4 rounded">
      <h2 className="text-2xl font-medium relative">{title}</h2>
      <p>{shortDescription}</p>

      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className="ml-auto bg-background hover:bg-background/90 hover:text-foreground"
            size="sm"
          >
            Learn more
          </Button>
        </DrawerTrigger>
        <DrawerContent className="bg-background border-none border-accent/50">
          <Header />
        </DrawerContent>
      </Drawer>
    </div>
  );
};
