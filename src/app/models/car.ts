export class Car {
  public key: string;
  public brand: string;
  public country: string;
  public year: number;
  public imageURL: string;

  constructor(obj?: any) {
    if (obj) {
      if (obj.key) {
        this.key = obj.key;
      }
      this.brand = obj.brand;
      this.country = obj.country;
      this.year = obj.year;
      this.imageURL = obj.imageURL;
    }
  }
}
