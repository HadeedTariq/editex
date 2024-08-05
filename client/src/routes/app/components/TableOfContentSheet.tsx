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
};

export function TableOfContentSheet({ headings }: TableOfContentProps) {
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
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${heading.id}`)?.scrollIntoView({
                    behavior: "smooth",
                  });
                  // Optionally close the sheet after navigating
                  setIsOpen(false);
                  // Update the URL without navigating
                  history.replaceState(null, null, `#${heading.id}`);
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
