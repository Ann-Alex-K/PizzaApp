export function loadState<T>(key: string): T | undefined {
  try {
    const jsonsState = localStorage.getItem(key);
    if (!jsonsState) return undefined;
    return JSON.parse(jsonsState);
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export function saveState<T>(state: T, key: string) {
    const stringState = JSON.stringify(state);
    localStorage.setItem(key, stringState);
}

export function saveCart<T>(state: T, key: string) {
    const stringState = JSON.stringify(state);
    localStorage.setItem(key, stringState);
}