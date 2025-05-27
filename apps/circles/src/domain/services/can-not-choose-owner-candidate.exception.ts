export class CanNotChooseOwnerCandidateException extends Error {
  public constructor() {
    super('Can not choose owner candidate');
  }
}
