import React,{useState, useEffect, useCallback} from 'react';
import {StyleSheet,View,Text,Dimensions, ActivityIndicator,TextInput, Button, Alert,ScrollView, Modal} from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import {LineChart,BarChart,PieChart} from 'react-native-chart-kit';

const Calories = (props) => {
    const [flag,setFlag] = useState(false)
    const [sum,setSum] = useState(0)
    const options = {
        scopes: [
          Scopes.FITNESS_ACTIVITY_READ_WRITE,
          Scopes.FITNESS_BODY_READ_WRITE,
        ],
      }
      const opt = {
        startDate: "2020-01-01T00:00:17.971Z", // required
        endDate: new Date().toISOString(), // required
        basalCalculation: true, // optional, to calculate or not basalAVG over the week
      };
      const screenWidth = Dimensions.get("window").width;
      const [calo,setCal] = useState({
        labels: [],
        datasets: [
          {
            data:[]
          },
        ]
      });
    useEffect(()=>{
        GoogleFit.authorize(options)
          .then(authResult => {
            if (authResult.success) {
              console.log("AUTH_SUCCESS")
              let d = new Date()
              d.setDate(d.getDate()-6)
              opt.startDate=d.toISOString()
                GoogleFit.getDailyCalorieSamples(opt, (err, res) => {
                    console.log(res);
                    setCal(res);
                    labels1=[];
                    dataset1=[];
                    res.forEach(x=>{
                        labels1.push(x.day)
                        console.log(x.day)
                        dataset1.push(Math.round(x.calorie))
                        setSum(sum+Math.round(x.calorie))
                        console.log(Math.round(x.calorie))
                    });
               //console.log("ek");
                setCal({
                  labels: labels1,
                  datasets:[
                    {
                      data: dataset1
                    }
                  ]
                })
                console.log(calo);
              });}
              setTimeout(()=>{
                setFlag(true);
              },1200)
               
           })
        
    },[])
    
    
    return(
        <ScrollView>
            <Text style={{textAlign:'center',fontSize:30}}>Calories Burned</Text>
           { flag?<View>
      <BarChart
         //style={graphStyle}
         data={calo}
         width={screenWidth-20}
         height={220}
         fromZero={true}
         chartConfig={{
           backgroundColor: 'black',
           backgroundGradientFrom: 'black',
           backgroundGradientTo: '#39FF14',
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
       /><Text style={{marginLeft:50,marginBottom:30,marginTop:30,fontSize:20}}>Weekly Average Calories: {Math.round(sum/7)}</Text></View>:<ActivityIndicator size="large" />}
            
        </ScrollView>
    )
}

export default Calories;