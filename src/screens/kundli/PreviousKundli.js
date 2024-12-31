import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PreviousKundli = () => {
  return (
    <View style={styles.container}>
      <Text style={{ alignItems: "center", justifyContent: "center", alignSelf: "center", fontSize: 18 }}>No Data Found</Text>
    </View>
  )
}

export default PreviousKundli

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
})