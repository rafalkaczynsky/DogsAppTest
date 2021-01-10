import { getAllDogsUrl, getSubBreedImageUrl } from "./endpoints";

export const getSubBreedImageApi = (subBreed: string): Promise<any> => {
  return fetch(getSubBreedImageUrl(subBreed));
};

export const getAllDogsApi = (): Promise<any> => {
  return fetch(getAllDogsUrl);
};
