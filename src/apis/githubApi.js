import { get } from '../setup/client';

// const getMostStarsRepo = (body) => {
  
//   return get(`search/repositories?q=created:>2017-10-22&sort=stars&order=desc`, body);
// };

// export { getMostStarsRepo };


// githubApi.js
// const getMostStarsRepo = axios.create({
//   baseURL: 'https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc/',
// });

// export const fetchMostStarredRepos = async () => {
//   const response = await getMostStarsRepo.get();
//   return response.data;
// };

// githubApi.js

// const getMostStarsRepo = (body) => {
//   return get(`search/repositories?q=created:>2017-10-22&sort=stars&order=desc/`);
// };

const getMostStarsRepo = async () => {
  const response = await get('search/repositories?q=created:>2017-10-22&sort=stars&order=desc');
  return response.data;
};

const getRepoActivity = async (owner, repo) => {
  const response = await get(`/repos/${owner}/${repo}/stats/code_frequency`);
  console.log(owner, "response")
  return response
};


export {getMostStarsRepo, getRepoActivity}
