export const removeLogs = (elementId: string) => {
  const el = document.getElementById(elementId);
  if (el) el.innerHTML = "";
};
