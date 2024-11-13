import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'app_duoc',
  webDir: 'www',
  plugins: {
    BarcodeScanner: {
      camera: 'granted' // Configura el permiso para la cámara
    }
  }
};

export default config;
