export enum WebSocketStatus {
  CONNECTING = "CONNECTING",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export enum OrderStatusEn {
  DONE = "done",
  CREATED = "created",
  PENDING = "pending",
}

export enum OrderStatusRu {
  DONE = "Выполнен",
  CREATED = "Создан",
  PENDING = "Готовится",
}

export interface IWSOrder {
  _id: string;
  ingredients: Array<string>;
  status: OrderStatusEn;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}