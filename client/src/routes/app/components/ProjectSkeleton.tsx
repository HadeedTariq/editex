import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectSkeleton() {
  return (
    <div className="flex items-center space-x-4 px-4">
      <div className=" flex gap-2">
        {[1, 2, 3, 4].map((val) => (
          <Skeleton
            key={val}
            className="bg-gray-600 rounded-md hover:bg-gray-700 transition duration-700 gap-2 flex items-center justify-center w-[300px] h-[200px]"
          />
        ))}
      </div>
    </div>
  );
}
