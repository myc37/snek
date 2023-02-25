import { type FC } from "react";
import { type Month } from "~/types/dates";

type Props = {
  className?: string;
  barProgress: number;
  completedOrders: number;
};

const ProgressBar: FC<Props> = ({
  className = "",
  barProgress,
  completedOrders,
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="relative h-8 w-full overflow-hidden rounded-full border-2 border-black bg-slate-600">
        <div
          className={`to-primary-dark absolute z-10  h-full overflow-hidden bg-gradient-to-br from-primary to-primary-light`}
          style={{ width: `${barProgress}%` }}
        />
        <div className="absolute right-0 h-full  w-2/5 bg-yellow-400" />
        <div className="absolute right-[40%] z-20 h-full w-1 bg-black" />
      </div>
      <div
        className="absolute top-[110%] -ml-2 text-sm font-bold text-primary"
        style={{ left: `${barProgress}%` }}
      >
        {completedOrders}
      </div>
      <div
        className="absolute -top-full z-30 w-16"
        style={{ left: `${barProgress}%` }}
      >
        <img
          src="/ninja-van.png"
          alt="ninja van progress"
          className="relative right-[90%]"
        />
      </div>
      <div className="absolute right-[40%] -top-[30%] z-30 w-12">
        <img
          src="/golden-star.png"
          alt="golden ninja star"
          className="relative left-1/2"
        />
      </div>
    </div>
  );
};
export default ProgressBar;
