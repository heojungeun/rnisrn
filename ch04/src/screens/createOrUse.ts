const cache: Record<string, any> = {}

// eslint-disable-next-line import/prefer-default-export
export const createOrUse = <T>(key: string, callback: () => T) => {
  // cache[key]에 값이 있으면 그대로 반환, 없으면 callback 호출하여 값을 얻어서 반환
  if (!cache[key]) cache[key] = callback()
  return cache[key]
}
