import { useDispatch } from "react-redux";
import { useAppRouter } from "../hooks/useAppRouter";
import { Check, X } from "lucide-react";
import { setProjectPublic } from "../reducer/appReducer";

const ProjectHandlerToggleBar = () => {
  const dispatch = useDispatch();

  const { isProjectPublic } = useAppRouter();
  return (
    <div className="flex items-center gap-2">
      <h3>Public</h3>
      <label
        htmlFor="AcceptConditions"
        className={`relative h-6 w-12 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent]  ${
          isProjectPublic ? "bg-green-500" : ""
        }`}>
        <input
          onClick={() => dispatch(setProjectPublic())}
          type="checkbox"
          id="AcceptConditions"
          className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
        />

        <span
          className={`absolute inset-y-0 start-0 z-10 m-1 inline-flex size-5 items-center justify-center rounded-full bg-white text-gray-400 transition-all ${
            isProjectPublic ? "start-6 text-green-600" : ""
          }`}>
          {isProjectPublic && <Check />}
          {!isProjectPublic && <X color="red" />}
        </span>
      </label>
    </div>
  );
};

export default ProjectHandlerToggleBar;
