import { View ,StyleSheet} from "react-native";

const CueBall = ({ enabled  = false}: { enabled?: boolean }) => {
  return (
    <View style={{...styles.ball,borderColor: enabled ? "#fff"  : "#DBDBDB"}}>
      <View style={{ ...styles.cue, display: enabled ? "flex" : "none" }} />
    </View>
  );
};


const styles = StyleSheet.create({
  ball: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.25,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  cue: {
    backgroundColor: "#fff",
    width: 12,
    height: 12,
    borderRadius:6,
  },
});

export default CueBall;