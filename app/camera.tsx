import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Pressable } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { useLocation } from "../hooks/useLocation"
export default function CameraScreen(){

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const { location, errorMsg } = useLocation();

  //Solicitamos los permisos al usuario para acceder a la camara
  useEffect(() => {
    const getCameraermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getCameraermissions();
  }, []);

  const handleLocation = () => {
    if(location) {
      alert(`Tu hubicación es Latitud: ${location.coords.latitude}, longitud ${location.coords.longitude}`);
    }else if(errorMsg){
      alert(`Ha habido un error: ${errorMsg}`);
    }
  }
  const handleBarcodeScanned = ({type, data} : {type: any, data : any}) => {
    setScanned(true);
    if(data === 'https://www.nfl.com/') {
      handleLocation();
    }else{
      alert(`QR no válido`);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => setScanned(false)}>
            <Text style={styles.text}>Volver a escanear</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 40
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    backgroundColor: 'dodgerblue',
    borderRadius: 8,
    padding: 20,
  },
});

function useGps() {
  throw new Error("Function not implemented.");
}
