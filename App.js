import React,{useState, useEffect, useCallback} from 'react';
import {StyleSheet,View,Text,Dimensions, ActivityIndicator,TextInput, Button, Alert,ScrollView, Modal} from 'react-native';
import Navigator from './navigation/navigation';
import ContextProvider from './context/context';

const App = () => {
  useEffect(()=>{
    console.disableYellowBox = true
  },[]) 
  return(
    <ContextProvider>
      <Navigator />
    </ContextProvider>
    
  )
 
};

const styles = StyleSheet.create({
  
});

export default App;
