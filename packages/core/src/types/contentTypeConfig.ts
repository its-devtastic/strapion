import type React from "react";
import type { ColumnType } from "antd/es/table";

export interface ContentTypeConfig {
  apiID: string;
  description?: string;
  readOnly?: boolean;
  icon?: React.ReactNode;
  name?: string;
  columns?: ColumnType<any>[];
  fields?: {
    main?: FieldDefinition[];
    side?: FieldDefinition[];
    coverImage?: {
      path: string;
    };
  };
}

interface FieldDefinition {
  path: string;
  label?: string;
}
