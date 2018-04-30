export function toMid(func) {
  return function(ctx, next) {
    func(ctx);
    next();
  }
}
