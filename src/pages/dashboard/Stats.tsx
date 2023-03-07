import React from "react";
import { useEffect } from "react";
import { StatsContainer, Loading, ChartsContainer } from "../../components";
import { showStats } from "../../features/thunks/allJobs";
import { useAppDispatch, useAppSelector } from "../../store";

const Stats = () => {
  const { monthlyApplications, isLoading } = useAppSelector(
    (state) => state.allJobs
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(showStats());
  }, []);
  if (isLoading) return <Loading center />;

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
