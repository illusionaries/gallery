export interface Image {
  imageSrc: string;
  title: string;
  description?: string;
  additionalInfo?: string;
  width?: number;
  height?: number;
}

export interface Gallery {
  location: string;
  date: string;
  images: Image[];
}
