export interface BaseDateModel {
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseModel extends BaseDateModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
