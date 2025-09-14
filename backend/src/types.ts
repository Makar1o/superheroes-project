export type ImageEntry = {
  id: string;
  url: string;
  filename: string;
};

export type Superhero = {
  id: string;
  nickname: string;
  real_name?: string;
  origin_description?: string;
  superpowers?: string;
  catch_phrase?: string;
  images: ImageEntry[];
  createdAt: string;
  updatedAt?: string;
};
