import React from 'react';
import {StyleSheet, Text, View, Image, Linking, Platform, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Title, Card, Button} from 'react-native-paper'
import {MaterialIcons, AntDesign} from '@expo/vector-icons'


const Profile = (props)=>{

    const {_id,name,email,phone,position,picture} = props.route.params.item
    const deleteEmployee = ()=>{
        fetch('http://10.0.2.2:3000/delete',{
            method:'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id:_id
            })
        }).then(res=>res.json())
        .then(deletedEmp=>{
            Alert.alert(`${deletedEmp.name} deleted`)
            props.navigation.navigate('Home')
        }).catch(err=>{
            Alert.alert(`${err} something went wrong while deleting`)
        })
    }
    const openDial=()=>{
        if(Platform.OS === "android"){
            Linking.openURL(`tel:${phone}`)
        } else{
            Linking.openURL(`telprompt:${phone}`)
        }
    }
    return (
        <View style={styles.root}>
            <LinearGradient 
                colors={["#0B132B", "#235150"]}
                style={{height: "100%"}}/>
            <View style={{alignItems:'center'}}>
                <Image
                    style={{width:140, height:140, borderRadius:140/2, marginTop:-550}}
                    source={{uri:picture}}/>
            <View style={{alignItems:'center'}}>
                <Title style={{color:'#FFFFFF'}}>{name}</Title>
                <Text style={{fontSize:18, color: '#00FFFF', marginBottom:30}}>{position}</Text>
                <View>
                    <View style={{flex:1, width:'100%'}}>
                    <Card style={styles.mycard} onPress={()=>{
                    Linking.openURL(`mailto:${email}`)
                    }}>
                        <View style={styles.cardContent}>
                            <MaterialIcons name="email" size={28} color="#00FFFF"/>
                            <Text style={styles.mytext}>{email}</Text>
                        </View>
                    </Card>
                    <Card style={styles.mycard}>
                        <View style={styles.cardContent} onPress={()=>openDial()}>
                            <AntDesign name="phone" size={28} color="#00FFFF"/>
                            <Text style={styles.mytext}>{phone}</Text>       
                        </View>
                    </Card>
                    
                    <View style={styles.mybutton}>
                        <Button icon="circle-edit-outline" 
                                mode="contained" 
                                theme={theme}
                                onPress={() => {
                                    props.navigation.navigate('Create', 
                                    {_id,name,email,phone,position,picture})
                                }}>
                                Edit
                        </Button>
                        <Button icon="delete" 
                                mode="contained"
                                theme={theme}
                                onPress={() => deleteEmployee()}>
                                Delete
                        </Button>
                    </View>
                    </View>
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
    mycard:{
        margin:3,
        width: '65%',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        elevation: 0
    },
    cardContent:{
        flexDirection: 'row',
        padding: 15,
        marginTop: -20
    },
    mytext:{
        fontSize: 15,
        color: '#00FFFF',
        margin: 3,
        marginLeft: 10
    },
    mybutton:{
        flexDirection: 'row',
        justifyContent: "space-around",
        width: '70%',
        marginTop: 20
    }
})

export default Profile