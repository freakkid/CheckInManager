export async function toMid(func) {
  return async function(ctx, next) {
    await func(ctx);
    next();
  }
}
