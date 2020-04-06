import React, { Component } from 'react';
import { StyleSheet, Text, View ,ScrollView,AsyncStorage} from 'react-native';
import MyHeader from './MyHeader';

import { TextInput ,Card, List,Button} from 'react-native-paper';

export default class SearchScreen extends Component {

  state ={
    text :'',
    cities :[]
  };


  async buttonClick(){
      console.log('clicked')
      this.props.navigation.navigate('current city',{city:this.state.text})
      await AsyncStorage.setItem('mericity',this.state.text)
  }
  async listclicked(name){
      this.setState({text:name})
      await AsyncStorage.setItem('mericity',this.state.text)
      this.props.navigation.navigate('current city',{city:this.state.text})
  }


  fetchCities(text) {
    console.log(text)
    this.setState({text})
    fetch(`http://autocomplete.wunderground.com/aq?query=${text}`)
    .then(data=>data.json())
    .then(city=>{
      // console.log(data2)
      this.setState({
        cities:city.RESULTS.slice(0,9)
      
      })
    })
    console.log(this.state.cities)
  }

  render(){
    renderCity=<Card><List.Item title='No Cities' /></Card>
    if(this.state.cities.length>0){
      renderCity=this.state.cities.map(city=>{
        return(
          <Card style={{margin:5}} key={city.lat} onPress={()=>this.listclicked(city.name)}>
            <List.Item title={city.name} />

          </Card>
        )
      })
    }
  return (
    <View style={styles.container}>
      <MyHeader  title="select city"/>
      <TextInput
        label='City'
        placeholder='enter the city name'
        value={this.state.text}
        onChangeText={text => this.fetchCities(text)}
      />
      <Button  mode="contained" onPress={() => this.buttonClick()}>
            save changes
      </Button>
      <ScrollView>
        {renderCity}
      </ScrollView>
      {/* <Text>hey</Text> */}
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
 
  },
});
