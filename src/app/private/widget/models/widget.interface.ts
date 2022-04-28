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
  widgetType?: string,
  customPrimaryColor?: string,
  customSecondaryColor?: string,
  customNegativePrimaryColor?: string,
  customNegativeSecondaryColor?: string,
  markNegativeDifferently?: boolean,
  showLabels?: boolean,
  showPeriods?: boolean,
  customLegend?: string,
  showYGrid?: boolean,
  showXGrid?: boolean,
  markFirst?: boolean,
  markLast?: boolean,
  title?: string,
}
