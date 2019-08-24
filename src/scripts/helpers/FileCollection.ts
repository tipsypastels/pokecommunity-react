import { getFileExtension } from "./FileHelpers";

export default class FileCollection {
  public allowedTypes: string[] = undefined;
  private onInvalidType: (type: string) => void = undefined;
  private onNoTypeErrors: () => void = undefined;
  
  constructor(private files: File[] = []) {}

  get names(): string[] {
    return this.files.map(f => f.name);
  }

  get length(): number {
    return this.files.length;
  }

  setAllowed(allowedTypes: string[]) {
    this.allowedTypes = allowedTypes;
    return this;
  }

  onTypeSuccess(onNoTypeErrors: () => void) {
    this.onNoTypeErrors = onNoTypeErrors;
    return this;
  }

  onTypeFailure(onInvalidType: (type: string) => void) {
    this.onInvalidType = onInvalidType;
    return this;
  }

  with(files: File[]) {
    const allowed: File[] = [];

    for (let file of files) {
      if (this.canAdd(file)) {
        allowed.push(file);
      }
    }

    // if all were allowed
    if (this.onNoTypeErrors && allowed.length === files.length) {
      this.onNoTypeErrors();
    }

    if (allowed.length === 0) {
      return this;
    }

    return this.cloneWith([...this.files, ...allowed]);
  }

  without(file: File) {
    const allowed = this.files.filter(f => f.name !== file.name);

    if (allowed.length === this.length) {
      return this;
    }

    return this.cloneWith(allowed);
  }

  map<T = any>(callback: (f: File) => T) {
    return this.files.map(callback);
  }

  private cloneWith(files: File[]): FileCollection {
    return new FileCollection(files)
      .setAllowed(this.allowedTypes)
      .onTypeFailure(this.onInvalidType)
      .onTypeSuccess(this.onNoTypeErrors);
  }

  private canAdd(file: File): boolean {
    return this.nameAllowed(file) && this.typeAllowed(file);
  }

  private nameAllowed(file: File): boolean {
    return !this.names.includes(file.name);
  }

  private typeAllowed(file: File): boolean {
    if (!this.allowedTypes) {
      return true;
    }

    const type = getFileExtension(file);

    if (this.allowedTypes.includes(type)) {
      return true;
    } else {
      if (this.onInvalidType) {
        this.onInvalidType(type);
      }
      return false;
    }
  }
}