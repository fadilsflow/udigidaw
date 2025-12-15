export interface WeddingTemplateData {
  groomNickname: string;
  groomName: string;
  groomImage?: string;
  groomParents?: {
    father: string;
    mother: string;
  };
  brideNickname: string;
  brideName: string;
  brideImage?: string;
  brideParents?: {
    father: string;
    mother: string;
  };
  events: {
    name: string;
    date: string;
    time: string;
    venueName?: string;
    venueAddress?: string;
  }[];
  photos?: string[];
}
