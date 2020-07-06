import {extend} from "./utils.js";


describe(`Utils tests`, () => {
  it(`"extend" should work correctly`, () => {
    const a = {
      property1: `property 1`,
      property2: `property 2`,
    };
    let b = {
      property3: `property 3`,
      property4: `property 4`,
    };
    expect(extend(a, b)).toEqual({
      property1: `property 1`,
      property2: `property 2`,
      property3: `property 3`,
      property4: `property 4`,
    });

    b = {
      property2: `property two`,
      property3: `property 3`,
    };
    expect(extend(a, b)).toEqual({
      property1: `property 1`,
      property2: `property two`,
      property3: `property 3`,
    });

    b = {
      property1: `property one`,
      property2: `property two`,
    };
    expect(extend(a, b)).toEqual({
      property1: `property one`,
      property2: `property two`,
    });

    b = {
      property1: `property one`,
    };
    expect(extend(a, b)).toEqual({
      property1: `property one`,
      property2: `property 2`,
    });
  });
});
