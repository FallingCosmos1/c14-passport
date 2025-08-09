import React, { useMemo, useState } from "react";
import { ImageBackground, View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";

const LOCATIONS = [
  "Cerveceria14",
  "Playa14",
  "Terraza14",
  "Club14",
  "14Grados",
  "El Deposito de San Arnoldo",
  "Taproom14",
  "14Naranjo",
];

function randomEightDigit() {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

function formatDate(d) {
  const pad = (n) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
}

export default function App() {
  const [screen, setScreen] = useState("splash");
  const idNumber = useMemo(() => randomEightDigit(), []);
  const issueDate = useMemo(() => formatDate(new Date()), []);
  const [stamps, setStamps] = useState({});

  if (screen === "splash") {
    return (
      <TouchableOpacity style={styles.splashContainer} activeOpacity={0.9} onPress={() => setScreen("info")}>
        <ImageBackground
          source={require("../assets/c14-passport.png")}
          style={styles.splashImage}
          imageStyle={{resizeMode: "contain"}}
        >
          <View style={{flex:1}}/>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  if (screen === "info") {
    return (
      <View style={styles.page}>
        <Text style={styles.header}>PASAPORTE</Text>
        <View style={styles.infoRow}>
          <Image source={require("../assets/holder-photo.png")} style={styles.photo} />
          <View style={{flex:1, marginLeft: 16}}>
            <Text style={styles.label}>Lugar de expedición</Text>
            <Text style={styles.value}>Ciudad Vieja, Guatemala</Text>

            <Text style={styles.label}>Fecha de expedición</Text>
            <Text style={styles.value}>{issueDate}</Text>

            <Text style={styles.label}>Fecha de expiración</Text>
            <Text style={styles.value}>hasta la penúltima</Text>

            <Text style={styles.label}>Número de pasaporte</Text>
            <Text style={styles.mono}>{idNumber}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.tripBtn} onPress={() => setScreen("trips")}>
          <Image source={require("../assets/dc3.png")} style={styles.dc3} />
          <Text style={styles.tripText}>mis viajes</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleStamp = (place) => {
    setStamps((prev) => {
      const next = {...prev};
      if (next[place]) {
        delete next[place];
      } else {
        next[place] = formatDate(new Date());
      }
      return next;
    });
  };

  return (
    <View style={styles.page}>
      <Text style={styles.header}>Sedes & Sellos</Text>
      <FlatList
        data={LOCATIONS}
        keyExtractor={(item) => item}
        contentContainerStyle={{paddingBottom: 24}}
        renderItem={({item}) => (
          <View style={styles.locationRow}>
            <View style={{flex:1}}>
              <Text style={styles.locationName}>{item}</Text>
              {stamps[item] && (
                <View style={styles.stamp}>
                  <Text style={styles.stampText}>SELLADO • {stamps[item]}</Text>
                </View>
              )}
            </View>
            <TouchableOpacity style={styles.stampBtn} onPress={() => toggleStamp(item)}>
              <Text style={styles.stampBtnText}>{stamps[item] ? "Quitar sello" : "Sellar"}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.backBtn} onPress={() => setScreen("info")}>
        <Text style={styles.backText}>Volver al pasaporte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: { flex:1, backgroundColor: "#0b1830" },
  splashImage: { flex:1, justifyContent: "center", alignItems: "center", padding: 24 },

  page: { flex:1, backgroundColor: "#f5efe3", paddingTop: 56, paddingHorizontal: 20 },
  header: { fontSize: 22, letterSpacing: 2, alignSelf: "center", marginBottom: 22, fontWeight: "700", color: "#1c2a45" },

  infoRow: { flexDirection: "row", backgroundColor: "#fff", borderRadius: 14, padding: 14, elevation: 2, shadowOpacity: 0.1, shadowRadius: 6, shadowColor: "#000", shadowOffset: {width:0, height:2}},
  photo: { width: 140, height: 190, borderRadius: 6, resizeMode: "cover", borderWidth: 1, borderColor: "#ccc" },

  label: { fontSize: 12, color: "#5b6a83", marginTop: 8 },
  value: { fontSize: 16, color: "#101828", marginBottom: 6 },
  mono: { fontSize: 18, fontFamily: "Courier", letterSpacing: 2, color: "#101828", marginBottom: 6 },

  tripBtn: { marginTop: 24, alignSelf: "center", alignItems: "center" },
  dc3: { width: 160, height: 110, resizeMode: "contain", opacity: 0.85 },
  tripText: { marginTop: -8, fontSize: 16, fontWeight: "600", color: "#1c2a45", textTransform: "uppercase", letterSpacing: 2 },

  locationRow: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 12, padding: 14, marginBottom: 12 },
  locationName: { fontSize: 16, fontWeight: "600", color: "#0f1f39" },
  stamp: { marginTop: 8, borderWidth: 2, borderColor: "#c0392b", borderRadius: 999, paddingVertical: 4, paddingHorizontal: 10, alignSelf: "flex-start", transform: [{rotate: "-8deg"}] },
  stampText: { fontSize: 12, fontWeight: "700", color: "#c0392b", letterSpacing: 1 },
  stampBtn: { backgroundColor: "#0f1f39", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
  stampBtnText: { color: "white", fontWeight: "600" },

  backBtn: { alignSelf: "center", marginTop: 10, padding: 10 },
  backText: { color: "#0f1f39", fontWeight: "600", textDecorationLine: "underline" },
});
