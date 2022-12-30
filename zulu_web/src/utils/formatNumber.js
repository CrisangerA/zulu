export const fCurrency = (value) => {  
  return new Intl.NumberFormat('es-CO', {
    currency: 'COP',
    style: 'currency',
    minimumFractionDigits: 0
  }).format(value);
}
