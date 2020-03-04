import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Alert } from 'react-native'
import {Card, FAB} from 'react-native-paper'

const Home =  ({navigation}) => {

    const [data,setData] = useState([])
    const[loading,setLoading] = useState(true)

    const fetchData = ()=>{
        fetch('http://10.0.2.2:3000/')
        .then(res=>res.json())
        .then(results=>{
            setData(results)
            setLoading(false)
        }).catch(err=>{
            Alert.alert(`${err} something went wrong`)
        })
    }

    useEffect(()=>{
        fetchData()
    }, [])
    const renderList = ((item) =>{
        return (
            <Card style={styles.mycard}
                onPress={()=>navigation.navigate("Profile", {item})}>
                <View style={styles.cardView}>
                    <Image 
                        style={{width:70, height:70, borderRadius : 50}}
                        source={{uri:item.picture}}
                    />
                    <View style={{marginLeft:20}}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>{item.position}</Text>
                    </View>            
                </View>

            </Card>
        )
    })
    return (
        <View style={styles.root}>
            {/*{ renderList}*/}
            {/* {loading?<ActivityIndicator size='large' color='#00FFFF' /> : */}
            <FlatList
                data={data}
                renderItem={({item})=>{
                    return renderList(item)
                }}
                keyExtractor={item=>item._id}
                onRefresh={()=>fetchData()}
                refreshing={loading}
                />
            <FAB    onPress={()=>navigation.navigate('Create')}
                    style={styles.fab}
                    small
                    icon="plus"
                    theme={{colors:{accent:'#0B132B'}}}
            />
        </View>
        
    )
}

const styles = StyleSheet.create ({
    root:{
        flex: 1
    },
    mycard:{
        margin:5
    },    
    cardView:{
        flexDirection:'row',
        padding: 15
    },
    text:{
        fontSize: 20
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
})

export default Home;