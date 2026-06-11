export type NoticiaActionState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};
