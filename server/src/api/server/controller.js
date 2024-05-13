const pidusage = require('pidusage');
const os = require('os');

// Obtener la cantidad de CPUs disponibles en el sistema
const numCPUs = os.cpus().length;

const getUseServerCPU = async () => {
  // Obtener la carga promedio del sistema
  console.log("Carga promedio del sistema");
  const loadAvg = os.loadavg();
  // Calcular el uso total de la CPU en porcentaje
  const totalUsage = (loadAvg[0] / numCPUs) * 100;
  console.log("Uso total de la CPU: ", totalUsage.toFixed(2) + "%");
  return totalUsage.toFixed(2);
}

module.exports = {
  getUseServerCPU
}