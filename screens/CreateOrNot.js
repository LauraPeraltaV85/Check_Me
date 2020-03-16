import React, {useState} from 'react';
import {StyleSheet, Image, View, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { LinearGradient } from 'expo-linear-gradient';
import {NeomorphBox} from 'react-native-neomorph-shadows'

const CreateOrNot = ({navigation,route}) =>{
    
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
    
    const verify = async (url) => {
        await fetch('https://api.kairos.com/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                    'app_id': 'b4563047',
                    'app_key': '93ef16866482b1d592900953ca280cf1'
                },
            body: JSON.stringify({
                'image': url,
                'subject_id': 'laura@bog.com',
                "gallery_name": "MyGallery"
                })
            }).then((res) => res.json()).then((data) => {
                console.log('Esto es el data del verify')
                console.log(picture)
                console.log(data)
                console.log(data.images[0].transaction);
                if (data.images[0].transaction.confidence < 0.6){
                    console.log('no eres tu')
                    navigation.navigate('TryAgain')
                } else {
                    console.log('eres tu')
                    navigation.navigate('Welcome')
                }
            }).catch((e) => {
                console.log(e);
        });
    }        
    //verify();
    
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

    const handleUpload = async (image)=>{
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'employeeApp')
        data.append('cloud_name', 'lperalta972')
        
        await fetch('https://api.cloudinary.com/v1_1/lperalta972/image/upload', {
            method:'post',
            body:data
        }).then(res=>res.json()).then(data=>{
            console.log(data)
            setPicture(data.url)
            verify(data.url)
        }).catch(err=>{
            Alert.alert('error while uploading')
        })
        console.log('despues de await')
    }

    return (
        //<KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableshift}>
        <View style={styles.root}>
            <LinearGradient 
                colors={["#0B132B", "#235150"]}
                style={{height: "100%"}}/>
            <View style={{alignItems:'center'}}>
                <Image
                    style={{width:140, height:190, marginTop:-500, marginBottom:60}}
                    source={require('./../assets/logo_name.png')}/>
                    <View style={{alignItems:'center', width:'175%', height:'90%'}}>
                    <NeomorphBox style={styles.neoMorphCam}>
                    <Button titleStyle={{fontSize:80}}
                            icon='account' 
                            mode="text"
                            color='#00FFFF' 
                            theme={theme}
                            onPress={() => navigation.navigate('Login')}>
                            New user
                    </Button>
                    </NeomorphBox>
                    <NeomorphBox style={styles.neoMorphButton}>
                    <Button titleStyle={{fontSize:80}}
                            icon='account-check' 
                            mode="text"
                            color='#00FFFF' 
                            theme={theme}
                            onPress={() => pickFromCamera()}>
                            Check Me
                    </Button>
                    </NeomorphBox>
                    </View>
                </View>
        </View> 
        //</KeyboardAvoidingView>
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
    neoMorphCam:{
        shadowRadius:4,
        borderRadius:50,
        backgroundColor:'#1d474d',
        width:290,
        height:50,
        marginTop:15,
        marginBottom:20,
        paddingTop:7
    },
    neoMorphButton:{
        shadowRadius:4,
        borderRadius:50,
        backgroundColor:'#1d474d',
        width:290,
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

export default CreateOrNot;