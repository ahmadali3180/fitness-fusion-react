import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { fetchData } from "../utils/fetchData";
import HorizontalScrollBar from "./HorizontalScrollBar";

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList"
      );

      setBodyParts(["all", ...bodyPartsData]);
    };
    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    const url = `https://exercisedb.p.rapidapi.com/exercises?limit=99999999`;
    if (search) {
      setLoading(true);
      const exercisesData = await fetchData(url);

      const searchedExercises = exercisesData.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(search.toLowerCase()) ||
          exercise.target.toLowerCase().includes(search.toLowerCase()) ||
          exercise.equipment.toLowerCase().includes(search.toLowerCase()) ||
          exercise.bodyPart.toLowerCase().includes(search.toLowerCase())
      );
      window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });

      setSearch("");
      setExercises(searchedExercises);
      setLoading(false);
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{
          fontSize: { lg: "44px", xs: "30px" },
        }}
        mb="50px"
        textAlign="center"
      >
        Awesome Exercises You <br />
        Should Know
      </Typography>

      <Box position="relative" mb="72px">
        <TextField
          height="76px"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase());
          }}
          placeholder="Search Exercises"
          type="text"
          sx={{
            input: {
              fontWeight: "700",
              border: "none",
              borderRadius: "4px",
            },
            width: { lg: "800px", xs: "350px" },
            backgroundColor: "#ffffff",
            borderRadius: "40px",
            fontSize: { lg: "17px", xs: "13px" },
          }}
        />
        <LoadingButton
          loading={loading}
          onClick={handleSearch}
          className="search-btn"
          variant="contained"
          sx={{
            backgroundColor: "#ff2625",
            color: "#fff",
            textTransform: "none",
            width: { lg: "170px", xs: "12px" },
            fontSize: { lg: "17px", xs: "13px" },
            height: "56px",
            position: "absolute",
            right: "0",
          }}
        >
          Search
        </LoadingButton>
      </Box>
      <div
        // sx={{
        //   position: "relative",
        //   width: "100%",
        //   p: "20px",
        // }}
        className="flex relative w-full p-6"
      >
        <HorizontalScrollBar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          bodyParts={bodyParts}
        />
      </div>
    </Stack>
  );
};

export default SearchExercises;
