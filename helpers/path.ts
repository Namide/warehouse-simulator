export default function getPath (path: string) {
  return process.env.NODE_ENV === 'development' ? path : `/warehouse-simulator${ path }`
}