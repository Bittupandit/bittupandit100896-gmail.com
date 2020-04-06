import React,{Component} from 'react';
import {Text,View,StyleSheet,ScrollView,Alert,Image, AsyncStorage} from 'react-native';
import {Card,TextInput,List,Title} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

import MyHeader from './MyHeader';

export default class HomeScreen extends Component{

    state ={ 
        info:{
            name:'loading !!',
            temp:'loading !!',
            humidity:'loading !!',
            desc:'loading !! ',
            icon:'loading !!',


        }
    }

    
    async getWeather(){
        Mycity=await AsyncStorage.getItem('mericity');
        if(!Mycity){

            Mycity = this.props.navigation.getParam('city','raipur')
        }
        
        fetch(`http:/api.openweathermap.org/data/2.5/weather?q=${Mycity}
        &units=metric&APPID=92b2bf09fb37b9cd3f76648c71cd2a14`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({
                info:{
                    name:data.name,
                    temp:data.main.temp,
                    humidity:data.main.humidity,
                    desc:data.weather[0].description,
                    icon:data.weather[0].icon,
                    
                }
               
            })
            // console.log(this.state.info)
        }).catch(err=>{
            Alert.alert('Error'+err.message+"please connect to the internet",[{text:'ok'}])

        })

    }
    componentDidMount(){
        this.getWeather()
    }

    render(){
        console.log(this.state.info)
        if(this.props.navigation.getParam('city')){
            this.getWeather()
        }
        return(
            <View style={styles.container}>
                <MyHeader  title="current city weather"/>
                <Card style={{margin:20}}>
                    {/* <LinearGradient 
                        colors={['#021B79','#0575E6']}
                    > */}
                        <View style={{padding:20,alignItems:'center'}}>
                            <Title style={styles.text}> {this.state.info.name}</Title>
                            <Image style={{width:50,height:50,}}
                            source={{uri:'http://openweathermap.org/img/w/'+this.state.info.icon+".png"}}
                            />
                            <Title style={styles.text}>Temperature: {this.state.info.temp}</Title>
                            {/* <Title style={styles.text}>Icon: {this.state.info.icon}</Title> */}
                            <Title style={styles.text}>Humidity: {this.state.info.humidity}</Title>
                            <Title style={styles.text}>Description: {this.state.info.desc}</Title>
                        </View>
                    {/* </LinearGradient> */}
                </Card>
                {/* <Text>Hey! this is home screen</Text> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        
    },
    text:{
        textAlign:'center',
    }
})

// 92b2bf09fb37b9cd3f76648c71cd2a14