export {};

declare global {
  namespace Express {
    export interface Request {
      userId: string | null;
    }
    export interface Response {
      retJson(service: string, ok: boolean, data?: any): void;
    }
  }
}
