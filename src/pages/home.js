// Pages.js
import React from "react";
import {ControlledAccordions} from "../components";
import { useQuery } from 'react-query';
import { getMostStarsRepo } from "../apis/githubApi";

const Home = () => {
  const { isLoading, error, data } = useQuery('fetchData', getMostStarsRepo);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {/* Other content for the page */}
      <ControlledAccordions repos={data ? data.items : null} />
    </>
  );
};

export default Home;
