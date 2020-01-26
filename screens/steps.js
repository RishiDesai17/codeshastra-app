import React,{useState, useEffect, useCallback} from 'react';
import {StyleSheet,View,Text,Dimensions, ActivityIndicator,TextInput, Button, Alert,ScrollView, Modal, ShadowPropTypesIOS} from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import {LineChart,BarChart,PieChart} from 'react-native-chart-kit';

const Steps = (props) => {
        const [flag,setFlag] = useState(false);
        const [flag1,setFlag1] = useState(false);
        const [sum,setSum] = useState(0);
        const [datum,setData] = useState({
          labels: [],
          datasets: [
            {
              data:[]
            },
          ]
        });
        const [calo,setCal] = useState({
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
          basalCalculation: true, // optional
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
              d.setDate(d.getDate()-6)
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
                 setSum(sum+x.value)
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
        
      
  //       const getData = async () => {
  //           const url = "https://trackapi.nutritionix.com/v2/natural/nutrients"
  //           const response = await fetch(url, {
  //                method: 'POST',
  //               // headers:{
  //               //     'Content-Type': 'application/x-www-form-urlencoded',
  //               //     "x-app-id": "a3f8341d",
  //               //     "x-app-key": "0b1703131250ad9821f9fa1a8bfa5873"
  //               // },
  //               // form: {
  //               //    "query": "for breakfast i ate 2 eggs 5 bacon and 4 french toast"
  //               // }
  //               headers: 
  //           { //'Postman-Token': '54d58eba-e040-4906-abe4-9524e22dbe34',
  //   //  'cache-control': 'no-cache',
  //    'x-app-key': '0b1703131250ad9821f9fa1a8bfa5873',
  //    'x-app-id': 'a3f8341d',
  //    'Content-Type': 'application/json',
  //    'x-remote-user-id': '0'
  //   },
  // body: JSON.stringify({ query: 'for breakfast i ate 2 eggs, 5 bacon, and 4 french toast' }) })
            
  //           const resData = await response.json();
  //           console.log(resData.foods[0].food_name);
  //       }

        return (
          <ScrollView>
           <Text style={{marginLeft:90,fontSize:30}}>DAILY STEPS</Text>
            {flag?
            <View>
             <BarChart style={{marginLeft:5,paddingLeft:5}}
         //style={graphStyle}
         data={datum}
         width={screenWidth-10}
         height={220}
         fromZero={true}
         chartConfig={{
           backgroundColor: '#e26a00',
           backgroundGradientFrom: '#fb8c00',
           backgroundGradientTo: '#ffa726',
           decimalPlaces: 0, // optional, defaults to 2dp
           color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
             borderRadius: 16,
             
            
           },
           
         }}
         style={{
           marginVertical: 8,
           borderRadius: 16,
           marginHorizontal: 0,
           marginTop:20
         }}
         verticalLabelRotation={0}
       />
              
        
              </View>:<ActivityIndicator size="large"/>
        }
          
      <Button title="Calories burned" onPress={()=>{
          props.navigation.navigate("Calories");
      }} />
      {/* <Button title="Bot" onPress={()=>{
          props.navigation.navigate("Chatbot");
      }} /> */}
      <Text style={{marginLeft:50,marginBottom:30,marginTop:30,fontSize:20}}>Weekly Average Steps : {Math.round(sum/7)}</Text>
        <Text style={{marginLeft:100,marginBottom:30,marginTop:10,fontSize:30}}></Text>
            <Modal visible={v}>
              <View style={{backgroundColor:"black",flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:"white",fontSize:45}}>Fitness Coach</Text>
                <ActivityIndicator size="large" color="white" style={{marginTop:20}} />
              </View>
            </Modal>
          </ScrollView>
        );
}

export default Steps;