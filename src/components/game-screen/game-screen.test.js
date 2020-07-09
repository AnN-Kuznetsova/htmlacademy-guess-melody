import React from "react";
import renderer from "react-test-renderer";
import {GameScreen} from "./game-screen.jsx";
import {GameType} from "../../const.js";
import {shallow} from "enzyme";


const children = <div className="children-component" />;


describe(`Render GameScreen`, () => {
  describe(`when game type is "ARTIST"`, () => {
    const props = {
      type: GameType.ARTIST,
      children,
    };


    it(`Should match with snapshot`, () => {
      const gameScreenSnapshot = renderer.create(
          <GameScreen {...props} />
      ).toJSON();

      expect(gameScreenSnapshot).toMatchSnapshot();
    });


    it(`Should render correct game-type`, () => {
      const gameScreenElement = shallow(<GameScreen {...props} />);

      expect(gameScreenElement.prop(`className`))
        .toEqual(expect.stringContaining(`game--${GameType.ARTIST}`));
    });
  });


  describe(`when game type is "GENRE"`, () => {
    const props = {
      type: GameType.GENRE,
      children,
    };


    it(`Should match with snapshot`, () => {
      const gameScreenSnapshot = renderer.create(
          <GameScreen {...props} />
      ).toJSON();

      expect(gameScreenSnapshot).toMatchSnapshot();
    });


    it(`Should render correct game-type`, () => {
      const gameScreenElement = shallow(<GameScreen {...props} />);

      expect(gameScreenElement.prop(`className`))
        .toEqual(expect.stringContaining(`game--${GameType.GENRE}`));
    });
  });
});
