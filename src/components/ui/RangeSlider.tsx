// components/RangeSlider.tsx
import React from "react";
import ReactSlider, { ReactSliderProps } from "react-slider";

import { cn } from "@/utils/styleUtils";

const RangeSlider = <T extends number | readonly number[]>(_props: ReactSliderProps<T>) => {
  const isVertical = _props.orientation === "vertical";
  return (
    <ReactSlider
      {..._props}
      renderThumb={(props, state) => (
        <div
          {...props}
          className={cn({
            "h-full": !isVertical,
            "w-full": isVertical,
            "aspect-square rounded-full bg-foreground text-xs text-background flex items-center justify-center cursor-grab":
              true,
          })}
        >
          {state.valueNow}
        </div>
      )}
      renderTrack={(props, state) => {
        //check if there are multiple values
        const points = Array.isArray(state.value) ? state.value.length : null;
        const isMulti = points && points > 0;
        const isLast = isMulti ? state.index === points : state.index === 1;
        const isFirst = state.index === 0;
        return (
          <div
            {...props}
            className={cn({
              //use 1/4 height or width depending on the orientation and make sure to center it.
              "h-1/4 top-1/2 -translate-y-1/2": !isVertical,
              "w-1/4 left-1/2 -translate-x-1/2": isVertical,
              "rounded-full": true,
              "bg-red-500": isMulti ? isFirst || isLast : isLast,
              "bg-secondary": isMulti ? !isFirst || !isLast : isFirst,
            })}
          />
        );
      }}
      renderMark={(props) => {
        return (
          <div
            {...props}
            className={cn({
              "top-1/2 -translate-y-1/2": !isVertical,
              "left-1/2 -translate-x-1/2": isVertical,
              "w-1/5 h-1/5": true,
              "rounded-full bg-indigo-500": true,
            })}
          ></div>
        );
      }}
    />
  );
};
export default RangeSlider;
