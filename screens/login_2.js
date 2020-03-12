import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, Linking, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Card, Button, TextInput} from 'react-native-paper'
import {MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons'
import {NeomorphBox} from 'react-native-neomorph-shadows'


const Login = ({navigation,route})=>{

    //const {_id,name,email,phone,position,picture} = props.route.params.item
    const getDetails = (type)=>{
        if(route.params){
            switch(type){ 
                case 'name':
                    return route.params.name 
                case 'phone':
                    return route.params.phone 
                case 'email':
                    return route.params.email 
                case 'picture':
                    return route.params.picture 
                case 'position':
                    return route.params.position 
            }
        } 
        return ""
    }
        
    const [name, setName] = useState(getDetails('name'))
    const [phone, setPhone] = useState(getDetails('phone'))
    const [email, setEmail] = useState(getDetails('email'))
    const [picture, setPicture] = useState(getDetails('picture'))
    const [position, setPosition] = useState(getDetails('position'))
    const [modal, setModal] = useState(false)
    const [enableshift,setEnableshift] = useState(false)
    const pickFromCamera = async ()=>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA)
        if (granted){
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.5
            })
            if (!data.cancelled){
                let newfile = {
                    uri:data.uri, 
                    type:`test/${data.uri.split('.')[1]}`,
                    name:`test.${data.uri.split('.')[1]}`}
                handleUpload(newfile)
            }
        }else{
            Alert.alert('You have to give us permission to work')
        }
    }
    return (
        <View style={styles.root}>
            <LinearGradient 
                colors={["#0B132B", "#235150"]}
                style={{height: "100%"}}/>
            <View style={{alignItems:'center'}}>
                <Image
                    style={{width:140, height:190, marginTop:-510, marginBottom:80}}
                    source={require('./../assets/logo_name.png')}/>
             {/* <View style={{alignItems:'center'}}>
                <Title style={{color:'#FFFFFF'}}>{name}</Title>
                <Text style={{fontSize:18, color: '#00FFFF', marginBottom:30}}>{position}</Text> */}
                <View>
                    <View style={{flex:1, width:'80%'}}>
                  <NeomorphBox inner swapShadowLevel style={styles.neoMorph}>
                      <Card style={styles.mycard}>
                        <TextInput
                            label='Email'
                            style={styles.inputStyle}
                            value={email}
                            onFocus={()=>setEnableshift(false)}
                            mode="outlined"
                            onChangeText={text => setEmail(text)}
                        />  
                        {/* <View style={styles.cardContent}>
                            <MaterialIcons name="email" size={28} color= 'rgba(54,133,127,0.3)'/>
                            <Text style={styles.mytext}>email</Text>
                        </View> */}
                    </Card></NeomorphBox>
                    <NeomorphBox inner swapShadowLevel style={styles.neoMorph}>
                    <Card style={styles.mycard}>
                        <View style={styles.cardContent} onPress={()=>openDial()}>
                            <MaterialCommunityIcons name="asterisk" size={28} color='rgba(54,133,127,0.3)'/>
                            <Text style={styles.mytext}>{phone}</Text>       
                        </View>
                    </Card>
                    </NeomorphBox>
                    <NeomorphBox style={styles.neoMorphButton}>
                                <Button style={{borderRadius:50, borderColor:'#00FFFF'}}
                                icon="arrow-right" 
                                mode="text"
                                color='#00FFFF' 
                                theme={theme}
                                onPress={() => {
                                    props.navigation.navigate('Home')}}>
                                       Check me in
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
        primary:'#1e4a49'
    }
}

const styles=StyleSheet.create({
    root:{
        flex:1
    },
    inputStyle:{
        borderRadius:50,
        margin:3,
        justifyContent:"space-around",
        width: '60%',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        elevation: 0,
        color: 'rgba(49,69,106,1)'
    },
    neoMorph:{
        shadowRadius:5,
        borderRadius:50,
        backgroundColor:'#193b42',
        width:290,
        height:40,
        marginBottom:20
    },
    neoMorphButton:{
        shadowRadius:4,
        borderRadius:50,
        backgroundColor:'#1d474d',
        width:290,
        height:40,
        marginTop:20
    },
    mycard:{
        margin:3,
        justifyContent:"space-around",
        width: '60%',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        elevation: 0,
        color: 'rgba(49,69,106,1)', 

    },
    cardContent:{
        flexDirection: 'row',
        padding: 5,
        paddingLeft:20
    },
    mytext:{
        fontSize: 15,
        color: 'rgba(54,133,127,0.5)',
        margin: 3,
        marginLeft: 10
    }
})
//#0e454a
//#1d444a

export default Login