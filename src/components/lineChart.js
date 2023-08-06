import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
// import {getRepoActivity} from '../apis/githubApi'

const RepoActivityChart = ({ owner, repo }) => {
  const [chartOptions, setChartOptions] = useState({});

  // Process the code frequency data to extract additions and deletions
  const processChartData = (codeFrequencyData) => {
    const seriesData = codeFrequencyData.map(([timestamp, additions, deletions]) => {
      return {
        x: timestamp * 1000,
        additions,
        deletions,
      };
    });

    return seriesData;
  };

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        console.log("REACT_APP_GITHUB_ACCESS_TOKEN", process.env.REACT_APP_GITHUB_ACCESS_TOKEN)
        const authToken = "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"
        
        // const codeFrequencyResponse = await getRepoActivity({ owner, repo });
        // const [codeFrequencyResponse] = await Promise.all([
        //   client.get(`/repos/${owner}/${repo}/stats/code_frequency`),
        // ]);

        const [codeFrequencyResponse, contributorsResponse ] = await Promise.all([
          axios.get(`https://api.github.com/repos/${owner}/${repo}/stats/code_frequency`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }),
          axios.get(`https://api.github.com/repos/${owner}/${repo}/stats/code_frequency`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }),
        ]);
        const codeFrequencyData = codeFrequencyResponse?.data;
        const processedData = processChartData(codeFrequencyData);

        // Set the Highcharts options for the line chart
        setChartOptions({
          title: {
            text: "Total Changes",
          },
          xAxis: {
            type: "datetime",
          },
          yAxis: {
            title: {
              text: "Total Activity",
            },
          },
          series: [
            {
              name: "Additions",
              data: processedData.map(({ x, additions }) => [x, additions]),
            },
            {
              name: "Deletions",
              data: processedData.map(({ x, deletions }) => [x, deletions]),
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchActivityData();
  }, [owner, repo]);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default RepoActivityChart;
