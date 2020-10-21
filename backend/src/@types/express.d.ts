/* Sobrescrever tipagem do express */

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
