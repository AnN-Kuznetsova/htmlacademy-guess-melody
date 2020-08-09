import {combineReducers} from "redux";

import {NameSpace} from "./name-space";
import {reducer as data} from "./data/data";
import {reducer as game} from "./game/game";
import {reducer as user} from "./user/user";


export const reducer = combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.GAME]: game,
  [NameSpace.USER]: user,
});
