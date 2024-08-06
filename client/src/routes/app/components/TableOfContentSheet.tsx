import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { PageHeadings } from "../pages/BlogPage";
import { useState } from "react";

type TableOfContentProps = {
  headings: PageHeadings[];
  headingId: string;
  setHeadingId: React.Dispatch<React.SetStateAction<string>>;
};

export function TableOfContentSheet({
  headings,
  setHeadingId,
}: TableOfContentProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetClose onClick={() => setIsOpen(false)} />
          <SheetTitle>Table Of Content</SheetTitle>
        </SheetHeader>
        <ul className="mt-2 list-disc px-2 pl-6">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ marginLeft: `${heading.level - 2}em` }}
            >
              <a
                className="block dark:hover:bg-violet-800 hover:bg-gray-200 px-2 py-1 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  setTimeout(() => {
                    setHeadingId(heading.id);
                  }, 100);
                }}
              >
                {heading.textContent}
              </a>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
