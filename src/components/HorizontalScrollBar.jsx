import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";
import ExerciseCard from "./ExerciseCard";
import BodyPartCard from "./BodyPartCard";
import { LeftArrow, RightArrow } from "../assets";
// import "../App.css";

const HorizontalScrollbar = ({ data, bodyParts, setBodyPart, bodyPart }) => {
  const scrollbarRef = useRef();

  const scrollToLeft = () => {
    if (scrollbarRef.current) {
      scrollbarRef.current.scrollBy({
        top: 0,
        left: -scrollbarRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollToRight = () => {
    if (scrollbarRef.current) {
      scrollbarRef.current.scrollBy({
        top: 0,
        left: scrollbarRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col gap-10 overflow-x-hidden">
      <div
        className="flex gap-4 p-6 overflow-x-scroll"
        ref={scrollbarRef}
        id="HScroll"
      >
        {data.map((item) => {
          return (
            <Box
              key={item.id || item}
              itemID={item.id || item}
              title={item.id || item}
              m="0"
              width={"20vw"}
            >
              {bodyParts ? (
                <BodyPartCard
                  item={item}
                  setBodyPart={setBodyPart}
                  bodyPart={bodyPart}
                />
              ) : (
                <ExerciseCard exercise={item} />
              )}
            </Box>
          );
        })}
      </div>
      <div className="flex mx-auto gap-10">
        <img
          src={LeftArrow}
          alt="Left Arrow"
          onClick={scrollToLeft}
          className="hover:scale-125 duration-300"
        />
        <img
          src={RightArrow}
          alt="Right Arrow"
          onClick={scrollToRight}
          className="hover:scale-125 duration-300"
        />
      </div>
    </div>
  );
};

export default HorizontalScrollbar;
