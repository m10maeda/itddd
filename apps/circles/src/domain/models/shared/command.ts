export abstract class Command {
  public abstract execute(): Promise<void>;
}
