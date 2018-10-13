const logger = {
  info: (message: string) => {
    // tslint:disable-next-line:no-console
    // tslint:disable-next-line:strict-type-predicates
    if (console && typeof console.info === 'function') {
      // tslint:disable-next-line:no-console
      console.info(`Canvasimo: ${message}`);
    }
  },
  warn: (message: string) => {
    // tslint:disable-next-line:no-console
    // tslint:disable-next-line:strict-type-predicates
    if (console && typeof console.warn === 'function') {
      // tslint:disable-next-line:no-console
      console.warn(`Canvasimo: ${message}`);
    }
  },
};

export default logger;
