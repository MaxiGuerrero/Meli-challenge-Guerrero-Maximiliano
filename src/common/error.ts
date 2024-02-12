export class ErrorHTTP extends Error {
  constructor(public status: number, message: string | { message: string }) {
    const msg = typeof message === 'string' ? message : message.message;
    super(msg);
  }
}
