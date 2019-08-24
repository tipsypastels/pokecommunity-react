import randomColor from 'randomcolor';

import { attachments } from '../../configs/config.json';

export function arrayOfFiles(files: FileList): File[] {
  const array: File[] = [];
  for (let i = 0; i < files.length; i++) {
    array.push(files.item(i));
  }
  return array;
}

// TODO attachment handler functions might need to be moved to some shared lib so the server can access them too. come back to this when implementing the server side part

export function getFileExtension(file: File): string {
  const names = file.name.split('.');
  return names[names.length - 1];
}

export function fileAllowedAsAttachment(file: File): boolean {
  return attachments.allowedTypes.includes(getFileExtension(file));
}

export function getFileColor(file: File): string {
  return randomColor({ seed: getFileExtension(file) });
}