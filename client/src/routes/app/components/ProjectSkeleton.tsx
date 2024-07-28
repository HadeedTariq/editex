import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectSkeleton() {
  return (
    <div className="flex items-center space-x-4 px-4 ">
      <div className="grid grid-cols-3 gap-2 max-[930px]:grid-cols-2 max-[640px]:grid-cols-1 mx-auto">
        {[1, 2, 4].map((val) => (
          <Skeleton
            key={val}
            className="bg-gray-600 rounded-md hover:bg-gray-700 transition duration-700 gap-2 flex items-center justify-center w-[300px] h-[200px]"
          />
        ))}
      </div>
    </div>
  );
}
