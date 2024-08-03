import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { PageHeadings } from "../pages/BlogPage";

type TableOfContentProps = {
  headings: PageHeadings[];
};

export function TableOfContentSheet({ headings }: TableOfContentProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
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
