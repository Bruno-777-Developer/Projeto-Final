export class ObjectLoop {

  private static context = new Set();
  private static count = 0;

  public static init(type: Function) {
    this.context.add(type);
  }

  public static create(type: Function): any {
    if (ObjectLoop.context.has(type)) {
      return null;
    }
    ObjectLoop.context.add(type);
    ObjectLoop.count++;
    let instance = new (type as any)();
    ObjectLoop.count--;
    if (ObjectLoop.count == 0) {
      ObjectLoop.context = new Set<any>();
    }
    return instance;
  }

}
