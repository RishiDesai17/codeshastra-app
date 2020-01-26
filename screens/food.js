import React,{useState, useEffect, useContext} from 'react';
import {StyleSheet,View,Text,Dimensions, ActivityIndicator,TextInput, Button, Alert,ScrollView, Modal} from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import {LineChart,BarChart,PieChart} from 'react-native-chart-kit';
import { Context } from '../context/context';

const Food = (props) => {
    const [food,setFood] = useState([]);
    const [full,setFull] = useState([]);
    const [list,setList] = useState([]);
    const [qty,setQty] = useState();
    const [shit,setShit] = useState();
    const [item,setItems] = useState();
    const [count,setCount] = useState(0);
    const [flag,setFlag] = useState(false);
    const context = useContext(Context);
    let a;
    const getData = async () => {
        const url = "https://trackapi.nutritionix.com/v2/natural/nutrients"
        const response = await fetch(url, {
             method: 'POST',
            // headers:{
            //     'Content-Type': 'application/x-www-form-urlencoded',
            //     "x-app-id": "a3f8341d",
            //     "x-app-key": "0b1703131250ad9821f9fa1a8bfa5873"
            // },
            // form: {
            //    "query": "for breakfast i ate 2 eggs 5 bacon and 4 french toast"
            // }
            headers: 
        { //'Postman-Token': '54d58eba-e040-4906-abe4-9524e22dbe34',
//  'cache-control': 'no-cache',
 'x-app-key': '0b1703131250ad9821f9fa1a8bfa5873',
 'x-app-id': 'a3f8341d',
 'Content-Type': 'application/json',
 'x-remote-user-id': '0'
},
body: JSON.stringify({ query: `i ate ${qty} ${item}` }) })
        
        const resData = await response.json();
        console.log(resData);
        //resData.foods.forEach(y=>{
            setFood([{
                name: "Protein",
                population: resData.foods[0].nf_protein,
                color: '#F00',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },{
                name: "Carbs",
                population: resData.foods[0].nf_total_carbohydrate,
                color: '#ccc',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },{
                name: "Fat",
                population: resData.foods[0].nf_total_fat,
                color: 'rgb(0, 0, 255)',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            }])
            setShit(resData.foods[0].nf_calories)
            a=full;
            console.log(full);
            a.push(food);
            setFull(a);
    //    });
        setFlag(true);
        console.log(full);
    }
    useEffect(()=>{
        //getData();
    },[])
    const add = (x) => {
        if(food===""){
          Alert.alert("Pls fill in the field")
        }else{
          setList(y => [...y, {
            id: count,
            name: item,
            qty: qty,
            type: x
          }]);
          setCount(count+1);
        }
      }
    
      const del = (id) => {
        setList(currentItems => {
          return currentItems.filter((y) => y.id!==id);
        });
      }
    // const add = () => {
    //     context.add(qty,item)
    // }

    return(
        <ScrollView>
           
            <TextInput onChangeText={(value)=>{setItems(value)}} placeholder="Add Food item" style={{textAlign:"center"}} />
           
            <Button title="Analyse My Food" onPress={getData} color="green" />
            {flag?
                <PieChart
                data={food}
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
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                 //for the absolute number remove if you want percentage
              />
            :null}
            <Text></Text>
            <Text style={{textAlign:"center"}}>Calories: {shit} g</Text>
            <Text></Text>
            <TextInput onChangeText={(value)=>setQty(value)} placeholder="Quantity" style={{borderWidth:0.5,borderColor:"grey",textAlign:"center"}}  />
            {/* <Button title="add" onPress={add} /> */}
            {/* <TextInput style={{}} onChangeText={(value)=>setFood(value)}/> */}
            <Text></Text>
            <Button title="BREAKFAST" onPress={()=>add("Breakfast")} color="black" />
            <Text></Text>
            <Button title="LUNCH" onPress={()=>add("Lunch")} />
            <Text></Text>
            <Button title="DINNER" onPress={()=>add("Dinner")} color="brown"/>
            {list.map((item)=>(
              <View >
                  <Text>------------------------------------------------------------------------------------------</Text>
                <Text style={{textAlign:"center",fontSize:25}}>FoodItem : {item.name}</Text>
                <Text style={{textAlign:"center",fontSize:25}}>Quantity : {item.qty}</Text>
                <Text style={{textAlign:"center",fontSize:25}}>{item.type}</Text>
                <View style={{width: '30%',marginLeft:'35%'}}>
                  <Button title="DELETE" color="black" onPress={()=>del(item.id)} style={{textAlign:"center"}} />
                </View>
              </View>
            ))}
        </ScrollView>
    )
}

export default Food;