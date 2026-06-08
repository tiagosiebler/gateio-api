/** File payload for Gate multipart/form-data OTC endpoints */
export type GateMultipartFile =
  | Blob
  | Buffer
  | { filename?: string; content: Blob | Buffer };

export function appendGateMultipartFile(
  form: FormData,
  fieldName: string,
  file: GateMultipartFile,
): void {
  if (Buffer.isBuffer(file)) {
    form.append(fieldName, new Blob([file]), 'file');
    return;
  }
  if (file instanceof Blob) {
    form.append(fieldName, file);
    return;
  }
  const { filename, content } = file;
  const blob = Buffer.isBuffer(content) ? new Blob([content]) : content;
  form.append(fieldName, blob, filename ?? 'file');
}

export function appendGateMultipartFields(
  form: FormData,
  fields: Record<string, string | undefined>,
): void {
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined) {
      form.append(key, value);
    }
  }
}
