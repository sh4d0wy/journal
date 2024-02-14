import {proxy} from 'valtio';

export const userData = proxy({
  username:"",
  level:0,
  points:0,
  pointsToReach:0,
  lables:[],
  graphData:[]
})