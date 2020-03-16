import React from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Title, Button} from 'react-native-paper'
import {MaterialIcons} from '@expo/vector-icons'
import {NeomorphBox} from 'react-native-neomorph-shadows'

const Welcome = (props)=>{

    //const {_id,email,pass,picture} = props.route.params.item
    // const deleteEmployee = ()=>{
    //     fetch('http://10.0.2.2:3000/delete',{
    //         method:'post',
    //         headers:{
    //             'Content-Type': 'application/json'
    //         },
    //         body:JSON.stringify({
    //             id:_id
    //         })
    //     }).then(res=>res.json())
    //     .then(deletedEmp=>{
    //         Alert.alert(`${deletedEmp.name} deleted`)
    //         props.navigation.navigate('Home')
    //     }).catch(err=>{
    //         Alert.alert(`${err} something went wrong while deleting`)
    //     })
    // }
    
    return (
        <View style={styles.root}>
            <LinearGradient 
                colors={["#0B132B", "#235150"]}
                style={{height: "100%"}}/>
            <View style={{alignItems:'center'}}>
                
            <NeomorphBox style={styles.neoMorphIcon}>
                <View style={{width:200, height:200, marginTop:30, marginLeft:30}}>
                    <MaterialIcons name="check" size={150} color="#00FFFF"/>
                </View>
                </NeomorphBox>
                <Title style={{color:'#FFFFFF', marginBottom:10, marginTop:30, marginLeft:10}}>Welcome</Title>
                <Text style={styles.mytext}>@!</Text>
                <View>                             
                    <View style={styles.mybutton}>
                        <NeomorphBox style={styles.neoMorphButton}>
                        <Button icon="" 
                                mode="text" 
                                theme={theme}
                                // onPress={() => {
                                //     props.navigation.navigate('Create', 
                                //     {_id,email,pass,picture})
                                // }}
                                >
                                Access
                        </Button>
                        </NeomorphBox>
                    </View>
                </View>
            </View>
          
        </View>
    )
}

const theme = {
    colors:{
        primary:'#00FFFF'
    }
}

const styles=StyleSheet.create({
    root:{
        flex:1
    },
    neoMorphIcon:{
        shadowRadius:15,
        borderRadius:110,
        backgroundColor:'#0e2636',
        width:210,
        height:210,
        marginTop: -500
    },
    neoMorphButton:{
        shadowRadius:4,
        borderRadius:50,
        backgroundColor:'#1d474d',
        width:290,
        height:50,
        marginTop:20,
        paddingTop:7,
        marginLeft: -43
    },
    mytext:{
        fontSize: 15,
        color: '#00FFFF',
        marginLeft: 10,
        fontSize:25, 
        marginBottom:30
    },
    mybutton:{
        flex:1,
        width: 200,
        marginTop: 20
    }
})

export default Welcome

// #1d474d