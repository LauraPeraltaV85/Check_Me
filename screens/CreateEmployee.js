import React, {useState} from 'react';
import {StyleSheet, Text, View, Modal, Alert, KeyboardAvoidingView} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const CreateEmployee = ({navigation,route}) =>{
    
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

    const submitData = ()=>{
        fetch('http://10.0.2.2:3000/send-data', {
            method: 'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name,
                email,
                phone,
                picture,
                position
            })
        }).then(res=>res.json()).then(data=>{
            Alert.alert(`${data.name} was saved successfully`)
            navigation.navigate('Home')
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
                name,
                email,
                phone,
                picture,
                position
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
        <KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableshift}>
        <View >
             <TextInput
                label='Name'
                style={styles.inputStyle}
                value={name}
                onFocus={()=>setEnableshift(false)}
                mode="outlined"
                onChangeText={text => setName(text)}
            />
             <TextInput
                label='Email'
                style={styles.inputStyle}
                value={email}
                onFocus={()=>setEnableshift(false)}
                mode="outlined"
                onChangeText={text => setEmail(text)}
            />
             <TextInput
                label='phone'
                style={styles.inputStyle}
                value={phone}
                onFocus={()=>setEnableshift(false)}
                keyboardType="number-pad"
                mode="outlined"
                onChangeText={text => setPhone(text)}
            />
             <TextInput
                label='position'
                style={styles.inputStyle}
                value={position}
                onFocus={()=>setEnableshift(true)}
                mode="outlined"
                onChangeText={text => setPosition(text)}
            />
            <Button style={styles.inputStyle}
                icon={picture===""?"upload":"check"} 
                mode="contained" 
                theme={theme}
                onPress={() => setModal(true)}>
                Upload Image
            </Button>
            {route.params?
            <Button style={styles.inputStyle}
                icon="content-save" 
                mode="contained"
                theme={theme} 
                onPress={() => updateData()}>
                Update details
            </Button>
            :<Button style={styles.inputStyle}
                icon="content-save" 
                mode="contained"
                theme={theme} 
                onPress={() => submitData()}>
                Save
            </Button>
            }
            
            <Modal
            animationType='slide'
            transparent={true}
            visible={modal}
            onRequestClose={()=>{
                setModal(false)
            }}>
                <View style={styles.modalView}>
                    <View style={styles.modalButtonView}>
                        <Button icon="camera" 
                                mode="contained" 
                                theme={theme}  
                                onPress={() => pickFromCamera()}>
                                    Camera
                        </Button> 
                        <Button icon="image-area" 
                                mode="contained" 
                                theme={theme}
                                onPress={() => pickFromGallery()}>
                                    Gallery
                        </Button>
                    </View> 
                    <Button icon="cancel"
                            theme={theme} 
                            onPress={() => setModal(false)}>
                        Cancel
                    </Button>
                </View>
            </Modal>
        </View>
        </KeyboardAvoidingView>
    )
}

const theme = {
    colors:{
        primary:'#00FFFF'
    }
}

const styles=StyleSheet.create ({
    root:{
        flex:1
    },
    inputStyle:{
        margin: 10
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

export default CreateEmployee;