const consoleExists = Boolean(window.console);

const logger = {
  info: (message: string) => {
    if (consoleExists) {
      window.console.info(`Canvasimo: ${message}`);
    }
  },
  warn: (message: string) => {
    if (consoleExists) {
      window.console.warn(`Canvasimo: ${message}`);
    }
  },
};

export default logger;
