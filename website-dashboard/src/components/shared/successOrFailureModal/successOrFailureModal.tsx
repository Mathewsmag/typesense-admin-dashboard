import clsx from "clsx";
import { useEffect } from "react";
import { ReactComponent as Cancel } from "./svgs/x-lg.svg";

interface Props {
  onClick: () => void;
  content: string;
  color: string;
}

function SuccessOrFailureModal({ onClick, content, color }: Props) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClick();
    }, 4000);

    return () => clearTimeout(timeout);
  }, [onClick]);

  return (
    <div
      className={clsx(
        `flex items-center gap-3 fixed bottom-5 left-2/4 bg-[${color}] -translate-x-1/2 py-3 px-4 max-w-md font-bold font-lato rounded-md`
      )}
    >
      <p>{content}</p>
      <Cancel onClick={onClick} className="cursor-pointer" />
    </div>
  );
}

export default SuccessOrFailureModal;
