export type Result<T> =
  | {
      success: true;
      payload: T;
    }
  | {
      success: false;
      error: string;
    };
