import { FaUniversity } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import cn from "classnames";

export type TEdExpBlock = {
  id: string | number;
  type: "education" | "experience";
  years: string;
  text: string;
  isLast?: boolean;
};

function EdExpBlock({ type, years, text, isLast }: TEdExpBlock) {
  return (
    <li>
      <div
        className={cn("!mb-4", "md:!mb-10", "z-10", {
          "timeline-start": type === "education",
          "timeline-end": type === "experience",
          "md:text-end": type === "education",
        })}
      >
        <div
          className={cn(
            "w-max",
            "mb-2",
            "flex",
            "flex-row-reverse",
            "gap-3",
            {
              "md:flex-row": type === "education",
              "bg-secondary": type === "education",
              "bg-primary": type === "experience",
            },
            "-mt-2",
            "-ml-6",
            "mr-auto",
            {
              "md:ml-auto": type === "education",
              "md:-mr-6": type === "education",
            },
            "px-2",
            "pt-1",
            "rounded-lg",
            {
              "text-secondary-content": type === "education",
              "text-primary-content": type === "experience",
            }
          )}
        >
          <time className="font-mono">{years}</time>
          {type === "experience" ? <GiTeacher size={20} /> : null}
          {type === "education" ? <FaUniversity size={20} /> : null}
        </div>
        <p className="text-lg" dangerouslySetInnerHTML={{ __html: text }} />
      </div>
      {isLast ? null : <hr />}
    </li>
  );
}

export default EdExpBlock;
