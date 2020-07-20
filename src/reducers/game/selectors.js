import {NameSpace} from "../name-space.js";


const NAME_SPASE = NameSpace.GAME;


const getStep = (state) => {
  return state[NAME_SPASE].step;
};

const getMistakes = (state) => {
  return state[NAME_SPASE].mistakes;
};

const getMaxErrorsCount = (state) => {
  return state[NAME_SPASE].maxErrorsCount;
};


export {
  getStep,
  getMistakes,
  getMaxErrorsCount,
};
