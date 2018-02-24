import Default, { Canvasimo } from '../src';

describe('exports', () => {

  it('should export Canvasimo as the default and a named export', () => {
    expect(Default).toBeTruthy();

    expect(Default).toBe(Canvasimo);
  });

});
