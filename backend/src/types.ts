export type ImageEntry = {
  id: string; // uuid
  url: string; // /uploads/...
  filename: string;
};

export type Superhero = {
  id: string; // uuid
  nickname: string;
  real_name?: string;
  origin_description?: string;
  superpowers?: string;
  catch_phrase?: string;
  images: ImageEntry[];
  createdAt: string;
  updatedAt?: string;
};
