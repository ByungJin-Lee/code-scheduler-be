declare global {
  namespace Express {
    export interface Request {
      userId: string | null;
      cookies: CookiesProps | null;
    }
    export interface Response {
      retJson(service: string, ok: boolean, data?: any): void;
    }
  }
}

export interface CookiesProps {
  refreshToken: string;
}
