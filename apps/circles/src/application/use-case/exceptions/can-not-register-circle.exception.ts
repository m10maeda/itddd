export class CanNotRegisterCircleException extends Error {
  public readonly id: string;
  public readonly member: string;

  public constructor(id: string, name: string) {
    super(`Circle({id: "${id}", name: "${name}"}) can not registered"`);

    this.id = id;
    this.member = name;
  }
}
