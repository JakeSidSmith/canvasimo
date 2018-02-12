const pixelData = [0, 0, 0, 0];

export default class ImageDataStub {
  public width: number;
  public height: number;
  public data: number[] = [];

  public constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    for (let i = 0; i < width * height; i += 1) {
      this.data = this.data.concat(pixelData);
    }
  }
}
