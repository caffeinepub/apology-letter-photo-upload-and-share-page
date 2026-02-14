import { ExternalBlob } from '../backend';
import { createActorWithConfig } from '../config';

export async function uploadApologyLetter(
  file: File,
  onProgress?: (percentage: number) => void
): Promise<string> {
  const actor = await createActorWithConfig();
  
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  
  let blob = ExternalBlob.fromBytes(bytes);
  
  if (onProgress) {
    blob = blob.withUploadProgress(onProgress);
  }
  
  const uniqueName = `${Date.now()}-${file.name}`;
  const id = await actor.uploadApologyLetter(blob, uniqueName);
  
  return id;
}
