export interface WeddingTemplateData {
  groomName: string;
  brideName: string;
  events: {
    name: string;
    date: string;
    time: string;
    venueName?: string;
  }[];
  photos?: string[];
}
