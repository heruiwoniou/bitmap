const _slice = Array.prototype.slice
export const slice = (data, ...args) => _slice.apply(data, args)  