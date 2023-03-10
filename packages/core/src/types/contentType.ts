export interface ContentType {
  uid: string;
  apiID: string;
  kind: "singleType" | "collectionType";
  options: {
    draftAndPublish: boolean;
  };
  pluginOptions: {
    localized?: boolean;
  };
  info: {
    displayName: string;
    pluralName: string;
    singularName: string;
  };
  attributes: Record<string, Attribute>;
}

export interface Attribute {
  type: string;
  required?: boolean;
  pluginOptions?: {
    localized?: boolean;
  };
  [p: string]: unknown;
}
