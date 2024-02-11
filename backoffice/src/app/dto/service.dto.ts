export type ServiceDTO = {
  _id: string;
  name: string;
  duration: number;
  price: number;
  commission: number;
  createdAt: string;
  updatedAt: string;
  updatedby: string;
  __v: number;
  pictureUrls: string[];
  discount?: number;
}
