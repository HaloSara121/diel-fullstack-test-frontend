export const descriptionEllipsised = (text: string, size: number) => {
  if (text?.length > size) {
    return text.slice(0, size) + "..."
  }
  
  return text
}