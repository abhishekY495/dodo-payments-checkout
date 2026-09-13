export function logToElement(elementId: string, message: string) {
  if (!elementId) return;
  const el = document.getElementById(elementId);
  if (!el) return;

  const line = document.createElement("div");
  line.textContent = `${new Date().toLocaleTimeString()}: ${message}`;

  el.appendChild(line);
  el.scrollTop = el.scrollHeight;
}
