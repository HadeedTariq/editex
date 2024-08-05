import { useEffect, useState } from "react";

export default function ReadingBar() {
  const [width, setWidth] = useState(0);
  const scrollHeight = () => {
    var el = document.documentElement,
      ScrollTop = el.scrollTop || document.body.scrollTop,
      ScrollHeight = el.scrollHeight || document.body.scrollHeight;
    var percent = (ScrollTop / (ScrollHeight - el.clientHeight)) * 100;
    setWidth(percent);
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollHeight);
    return () => window.removeEventListener("scroll", scrollHeight);
  }, [width]);

  return (
    <p
      className={
        "fixed bg-violet-600 transition duration-500 rounded-b-[2px] h-[6px] z-50 top-0"
      }
      style={{ width: `${width}%` }}
    ></p>
  );
}
