export type Message<T> = {
  status: string; 
  msg: string,
  data?: T;
}