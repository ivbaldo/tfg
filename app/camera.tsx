import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Pressable } from "react-native";
import { CameraView, Camera } from "expo-camera";

export default function CameraScreen(){

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);

  //Solicitamos los permisos al usuario para acceder a la camara
  useEffect(() => {
    const getCameraermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getCameraermissions();
  }, []);

  const handleBarcodeScanned = ({type, data} : {type: any, data : any}) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned`)
  }

  if(hasPermission == null) {
    return <Text>Se require permisos para acceder a la cámara</Text>
  }
  if(hasPermission === false) {
    <Text>No tiene permisos para acceder a la cámara</Text>
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
        <Pressable style={styles.button} onPress={() => setScanned(false)}>
        <Text style={styles.text}>Volver a escanear</Text>
      </Pressable>
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
  button: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    elevation: 3,
    height: '100%',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    backgroundColor: 'dodgerblue',
    borderRadius: 4,
    padding: 20,
  },
});