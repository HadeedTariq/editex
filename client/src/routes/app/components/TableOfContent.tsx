import { useState } from "react";
import { PageHeadings } from "../pages/BlogPage";

type TableOfContentProps = {
  headings: PageHeadings[];
};

const TableOfContent = ({ headings }: TableOfContentProps) => {
  const [activeId, setActiveId] = useState("");
  return (
    <div className="relative w-[200px] h-[80vh] max-[1058px]:hidden">
      <div className="w-[200px] h-full fixed mt-0 dark:bg-violet-900 opacity-90  dark:text-white bg-gray-100 px-4 py-3 text-left text-gray-800 break-words rounded">
        <div className="mx-auto text-xl font-semibold">
          <strong>Table of content</strong>
        </div>
        <ul className="mt-2 list-disc px-2 pl-6">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ marginLeft: `${heading.level - 2}em` }}
            >
              <a
                className={`block dark:hover:bg-violet-800 hover:bg-gray-200 px-2 py-1 rounded ${
                  activeId === heading.id && "dark:bg-violet-800 bg-violet-300"
                }`}
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${heading.id}`)?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setActiveId(heading.id);
                }}
              >
                {heading.textContent}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TableOfContent;
