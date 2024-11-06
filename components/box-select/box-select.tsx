import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import CheckBox from '../check-box/check-box';
import { Colors } from '@/constants/Colors';


interface BoxSelectProps{
  title?:string;
  checked?:boolean;
  onPress?: () => void;
  checkBoxSize?:number;
}

const BoxSelect = ({title,checked,onPress,checkBoxSize}:BoxSelectProps) => {
  return (
    <Pressable style={styles.boxSelect} onPress={onPress}>
      <CheckBox checked={checked} size={checkBoxSize} /> 
      
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  )
}

export default BoxSelect;

const styles = StyleSheet.create({
  boxSelect:{
    paddingVertical:6,
    paddingRight:32,
    paddingLeft:10,
    flexDirection:"row",
    alignItems:"center",
    alignSelf:"flex-start",
    gap:6,
    backgroundColor:Colors.grey,
    borderRadius:4,
    // width:"auto"
  },
  title:{
    fontWeight:"500",
    fontSize:16,
    color:"black"
  }
})