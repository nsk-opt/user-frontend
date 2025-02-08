export function handleError(error: Error, containerId: string): void {
  console.error("Error: ", error);
  const container = document.getElementById(containerId);

  if (container)
    container.innerHTML = `<p>Не удалось загрузить данные. Ошибка: ${error.message}</p>`;
}
