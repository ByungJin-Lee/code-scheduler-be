declare global {
  namespace Express {
    export interface Request {
      userId: string | null;
    }
    export interface Response {
      retJson(service: string, ok: any, data?: any): void;
    }
  }
}
export {};
