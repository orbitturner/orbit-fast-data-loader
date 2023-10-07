export interface ConnectionOptions {
  sgbd: string;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

export interface ImportOptions {
  file: string;
  separator: string;
  tablename: string;
  schema: string;
}

export interface ExportOptions {
  file: string;
  separator: string;
  tablename: string;
  schema: string;
}
