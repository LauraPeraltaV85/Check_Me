import React, {useState} from 'react';
import {StyleSheet, Image, Text, View, Modal, Alert, KeyboardAvoidingView, Platform} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { LinearGradient } from 'expo-linear-gradient';
import {NeomorphBox} from 'react-native-neomorph-shadows'

const Login = ({navigation,route}) =>{
    
    const getDetails = (type)=>{
        if(route.params){
            switch(type){ 
                case 'email':
                    return route.params.email 
                case 'pass':
                    return route.params.pass
                case 'picture':
                    return route.params.picture
            }
        } 
        return ""
    }
    
    const [email, setEmail] = useState(getDetails('email'))
    const [pass, setPass] = useState(getDetails('pass'))
    const [picture, setPicture] = useState(getDetails('picture'))
    const [modal, setModal] = useState(false)
    const [enableshift,setEnableshift] = useState(false)

    const submitData = ()=>{
        fetch('http://10.0.2.2:3000/send-data', {
            method: 'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,
                pass,
                picture
            })
        }).then(res=>res.json()).then(data=>{
            Alert.alert(`${data.name} was saved successfully`)
            navigation.navigate('CreateOrNot')
        }).catch(err=>{
            Alert.alert('something went wrong posting data')
        })
    }

    const updateData = ()=>{
        fetch('http://10.0.2.2:3000/update', {
            method: 'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:route.params._id,
                email,
                pass,
                picture
            })
        }).then(res=>res.json()).then(data=>{
            Alert.alert(`${data.name} was successfully updated`)
            navigation.navigate('Home')
        }).catch(err=>{
            Alert.alert(`${err} something went wrong posting data`)
        })
    }

    const pickFromGallery = async ()=>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (granted){
            let data = await ImagePicker.launchImageLibraryAsync({
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

    const handleUpload = (image)=>{
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'employeeApp')
        data.append('cloud_name', 'lperalta972')
        
        fetch('https://api.cloudinary.com/v1_1/lperalta972/image/upload', {
            method:'post',
            body:data
        }).then(res=>res.json()).then(data=>{
            console.log(data)
            setPicture(data.url)
            setModal(false)
        }).catch(err=>{
            Alert.alert('error while uploading')
        })
    }

    return (
        // <KeyboardAvoidingView behavior='padding' enabled>
        <View style={styles.root}>
            <LinearGradient 
                colors={["#0B132B", "#235150"]}
                style={{height: "100%"}}/>
            <View style={{alignItems:'center'}}>
                <Image
                    style={{width:140, height:190, marginTop:-500, marginBottom:60}}
                    source={require('./../assets/logo_name.png')}/>
                    <View style={{alignItems:'center', width:'175%', height:'90%'}}>
                    <NeomorphBox inner swapShadowLevel style={styles.neoMorph}>
                        <TextInput
                            label='Email'
                            style={styles.inputStyle}
                            value={email}
                            theme={theme}
                            // onFocus={()=>setEnableshift(false)}
                            mode="flat"
                            onChangeText={text => setEmail(text)}
                        />
                        </NeomorphBox>
                    <NeomorphBox inner swapShadowLevel style={styles.neoMorph}>
                    <TextInput
                        label='Password'
                        style={styles.inputStyle}
                        value={pass}
                        secureTextEntry={true}
                        theme={theme}
                        // onFocus={()=>setEnableshift(false)}
                        mode="flat"
                        onChangeText={text => setPass(text)}
                    />
                    </NeomorphBox>
                    <View style={{flexDirection:'row', justifyContent:'space-between', width:290}}>
                    <NeomorphBox style={styles.neoMorphCam}>
                    <Button titleStyle={{fontSize:80}}
                            icon='camera' 
                            mode="text"
                            color='#00FFFF' 
                            theme={theme}
                            onPress={() => pickFromCamera()}>
                    </Button>
                    </NeomorphBox>
                    <NeomorphBox style={styles.neoMorphButton}>
                    <Button titleStyle={{fontSize:80}}
                            icon='arrow-right' 
                            mode="text"
                            color='#00FFFF' 
                            theme={theme}
                            onPress={() => submitData()}>
                            Check Me In
                    </Button>
                    </NeomorphBox>
                    </View>
                    </View>
        </View>
        </View> 
        // </KeyboardAvoidingView>
    )
}

const theme = {
    colors:{
        primary:'#00FFFF',
        accent:'#00FFFF',
        placeholder:'rgba(53,117,116,1)',
        text:'#00FFFF'
    }
}

const styles=StyleSheet.create ({
    root:{
        flex:1
    },
    inputStyle:{
        flex:1,
        marginLeft:15,
        width:'90%',
        height:55,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth:0,
        elevation: 0,
        color:'#00FFFF'
    },
    neoMorph:{
        shadowRadius:5,
        borderRadius:50,
        backgroundColor:'#193b42',
        width:290,
        height:55,
        marginBottom:20
    },  
    neoMorphCam:{
        shadowRadius:4,
        borderRadius:50,
        backgroundColor:'#1d474d',
        width:50,
        height:50,
        marginTop:15,
        paddingTop:7
    },
    neoMorphButton:{
        shadowRadius:4,
        borderRadius:50,
        backgroundColor:'#1d474d',
        width:225,
        height:50,
        marginTop:15,
        paddingTop:7
    },
    modalView:{
        position:'absolute',
        bottom:2,
        width:'100%',
        backgroundColor: "#ebebeb"
    },
    modalButtonView:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
}) 

export default Login;