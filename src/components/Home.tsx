import ChatSidebar from "./ChatSidebar";
import { ChatArea } from "./ChatArea";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";

const Home = () => {
  return (
    <div className="h-screen w-full bg-[#0f0f0f] text-neutral-100 flex overflow-hidden">
      <aside className="hidden md:flex flex-col w-64 border-r border-neutral-800 bg-[#151515]">
        <ChatSidebar />
      </aside>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 left-4 z-50"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 bg-[#151515] border-r border-neutral-800"
          >
            <ChatSidebar />
          </SheetContent>
        </Sheet>
      </div>

      <main className="flex-1 flex flex-col">
        <ChatArea />
      </main>
    </div>
  );
};

export default Home;
