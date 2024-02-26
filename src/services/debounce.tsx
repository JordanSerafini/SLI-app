function debounce<F extends (...args: unknown[]) => unknown>(func: F, wait: number) {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
    // Définition de la fonction "wrapper" qui sera retournée et utilisée comme version "debounced" de la fonction originale
    const debouncedFunction = function(this: ThisParameterType<F>, ...args: Parameters<F>) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
  
      timeoutId = setTimeout(() => func.apply(this, args), wait);
    } as F & { cancel: () => void }; // Ajout de la signature de la méthode cancel
  
    // Ajout de la méthode cancel à la fonction "wrapper"
    debouncedFunction.cancel = function() {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };
  
    return debouncedFunction;
  }
  
  export default debounce;
  