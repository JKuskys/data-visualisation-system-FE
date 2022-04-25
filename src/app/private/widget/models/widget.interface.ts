export interface IWidget {
  id?: number;
  key: string;
  isPublic: boolean;
  takeFromStart: boolean;
  url: string;
  method: string;
  customAttribute?: string;
  customValue?: string;
  customLabel?: string;
  customMin?: number;
  customMax?: number;
  author?: string;
  headers?: { [key: string]: string }[];
}
