// const pidusage = require('pidusage');
const fs = require('fs');
const os = require('os');
const errorDisplay = "(Error en el controlador de Server)";

// Obtener la cantidad de CPUs disponibles en el sistema
const numCPUs = os.cpus().length;

const getUseServerCPU = async () => {
  try {
      // Obtener la carga promedio del sistema
      const loadAvg = os.loadavg();
      // Calcular el uso total de la CPU en porcentaje
      const totalUsage = (loadAvg[0] / numCPUs) * 100;
      return totalUsage.toFixed(2);
  } catch (error) {
      throw new Error(`Error al intentar obtener el uso de la CPU del servidor ${errorDisplay}`, error);
  }
};

const getUseServerRAM = async () => {
  try {
      // Obtener la memoria total y la memoria libre
      const totalMem = os.totalmem();
      const freeMem = os.freemem();

      // Calcular el uso de la memoria en porcentaje
      const usedMem = totalMem - freeMem;
      const totalUsage = (usedMem / totalMem) * 100;

      return totalUsage.toFixed(2);
  } catch (error) {
      throw new Error(`Error al intentar obtener el uso de la RAM del servidor ${errorDisplay}`, error);
  }
};

// const getDiskUsage = async () => {
//   // Obtener la información del disco
//   const diskInfo = fs.statSync('/');

//   // Calcular el uso del disco
//   const totalSpace = diskInfo.blocks * diskInfo.blksize;
//   const freeSpace = diskInfo.blocks * diskInfo.blksize - diskInfo.size;

//   // Calcular el porcentaje de espacio libre
//   const freeSpacePercentage = (freeSpace / totalSpace) * 10;

//   return freeSpacePercentage.toFixed(2);
// }

const getUseServerInfo = async () => {
  try {
      const cpuUsage = await getUseServerCPU();
      const ramUsage = await getUseServerRAM();
      // const diskUsage = await getDiskUsage();

      return {
          cpu: cpuUsage,
          ram: ramUsage,
          disk: diskUsage
      }
  } catch (error) {
      throw new Error(`Error al intentar obtener la información del servidor ${errorDisplay}`, error);
  }
};

module.exports = {
  getUseServerInfo,
  getUseServerCPU,
  getUseServerRAM,
  // getDiskUsage
}