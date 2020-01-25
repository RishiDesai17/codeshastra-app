import React,{useState, useEffect, useCallback} from 'react';
import {StyleSheet,View,Text,Dimensions, ActivityIndicator,TextInput, Button, Alert,ScrollView, Modal} from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import {LineChart,BarChart,PieChart} from 'react-native-chart-kit';

const App = () => {
  const [flag,setFlag] = useState(false);
  const [datum,setData] = useState({
    labels: [],
    datasets: [
      {
        data:[]
      },
    ]
  });
  const [v,setV] = useState(true);
  const [food,setFood] = useState();
  const [list,setList] = useState([]);
  const [count,setCount] = useState(0);
  const datas = 
    [
      {
        name: 'Seoul',
        population: 21500000,
        color: 'rgba(131, 167, 234, 1)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Toronto',
        population: 2800000,
        color: '#F00',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'New York',
        population: 8538000,
        color: '#ccc',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Moscow',
        population: 11920000,
        color: 'rgb(0, 0, 255)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
  ];
  const line = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [-20, 45, 28, 80, 99, 43],
        strokeWidth: 2, // optional
      },
    ],
  };
  const screenWidth = Dimensions.get("window").width;
  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ_WRITE,
      Scopes.FITNESS_BODY_READ_WRITE,
    ],
  }
  const options1 = {
    startDate: "2020-01-01T00:00:00.001Z", // required ISO8601Timestamp
    endDate: new Date().toISOString() // required ISO8601Timestamp
  };
  const opt = {
    startDate: "2020-01-01T00:00:00.001Z", // required
    endDate: new Date().toISOString(), // required
    //basalCalculation: true, // optional, to calculate or not basalAVG over the week
  };
  useEffect(()=>{
    setTimeout(()=>{
      setV(false);
    },1800)
    GoogleFit.authorize(options)
    .then(authResult => {
      if (authResult.success) {
        console.log("AUTH_SUCCESS")
        let d = new Date()
        d.setDate(d.getDate()-4)
        options1.startDate=d.toISOString()
        GoogleFit.getDailyStepCountSamples(options1)
        //   ,(err,res)=>{
        //   console.log(res);
        // })
     .then((res) => {
         console.log('Daily steps ',res[2].steps)
         let labels=[]
         let dataset=[]
         setData(res[2].steps);
         //console.log("ek hee")
         res[2].steps.forEach(x=>{
           labels.push(x.date.substring(8))
           dataset.push(x.value)
         });
         //console.log("ek");
          setData({
            labels: labels,
            datasets:[
              {
                data: dataset
              }
            ]
          })
          //console.log(datum)
         setFlag(true);
     })
     .catch((err) => {console.warn(err)})
      } else {
        console.log("AUTH_DENIED", authResult.message);
       }
    })
    .catch(() => {
      console.log("AUTH_ERROR");
    })
  },[])
  
  const add = () => {
    if(food===""){
      Alert.alert("Pls fill in the field")
    }else{
      setList(y => [...y, {
        id: count,
        name: food
      }]);
      setCount(count+1);
    }
  }

  const del = (id) => {
    setList(currentItems => {
      return currentItems.filter((y) => y.id!==id);
    });
  }

  return (
    <ScrollView>
      <Text>hi</Text>
      {flag?
      <View>
       <BarChart
   //style={graphStyle}
   data={datum}
   width={screenWidth-20}
   height={220}
   fromZero={true}
   chartConfig={{
     backgroundColor: '#e26a00',
     backgroundGradientFrom: '#fb8c00',
     backgroundGradientTo: '#ffa726',
     decimalPlaces: 0, // optional, defaults to 2dp
     color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
       borderRadius: 16
     },
     
   }}
   style={{
     marginVertical: 8,
     borderRadius: 16,
     marginHorizontal: 10
   }}
   verticalLabelRotation={0}
 />
        
  <Text>{JSON.stringify(datum)}</Text>
        </View>:<ActivityIndicator size="large"/>
  }
    <PieChart
  data={datas}
  width={Dimensions.get('window').width -5 }
  height={220}
  chartConfig={{
    backgroundColor: '#1cc910',
    backgroundGradientFrom: '#eff3ff',
    backgroundGradientTo: '#efefef',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
      marginRight: 10,
      width: '100%'
    },
  }}
  style={{
    
  }}
  accessor="population"
  backgroundColor="transparent"
  paddingLeft="15"
   //for the absolute number remove if you want percentage
/>
    <TextInput style={{}} onChangeText={(value)=>setFood(value)}/>
      <Button title="ADD" onPress={add} />
      {list.map((item)=>(
        <View>
          <Text>{item.name}</Text>
          <View style={{width: '30%'}}>
            <Button title="DELETE" color="red" onPress={()=>del(item.id)} />
          </View>
        </View>
      ))}
      <Modal visible={v}>
        <View style={{backgroundColor:"black",flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text style={{color:"white",fontSize:45}}>My App</Text>
          <ActivityIndicator size="large" color="white" style={{marginTop:20}} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
