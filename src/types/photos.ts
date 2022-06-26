interface ISize {
  width: number | undefined;
  height: number | undefined;
  orientation?: number;
  type?: string;
}

interface ISizeCalculationResult extends ISize {
  images?: ISize[];
}

export type ImageResult = {
  src: string;
  dimensions: ISizeCalculationResult;
  blurDataURL: string;
};

type PhotosType = {
  slug: string;
  title: string;
  date: string;
  author: string;
  content: string;
  img_dir: string;
  cover_img: string;
  meta: string;
  images: ImageResult[];
};

export default PhotosType;
