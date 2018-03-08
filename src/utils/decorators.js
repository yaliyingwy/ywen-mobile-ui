export function abstract(msg = '抽象方法，必须实现') {
  return (target, name, descriptor) => {
    const value = () => {
      throw new Error(msg);
    };
    return { ...descriptor, value };
  };
}
