
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button'

import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Logo = require('./assets/images/logo.png');
const exampleReading = require('./assets/images/example_reading.png');
const exampleTable = require('./assets/images/example_table.png');


function HomeScreen( { navigation } ) {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <ImageViewer ImageSource={Logo} ImageType={"logo"} />
            </View>
            <View>
                <Text style={styles.captionText}>No device connected.</Text>
            </View>
            <View>
                <Button theme="blue"        label="Connect via Bluetooth"   page="Connected"        />
                <Button theme="purple"      label="View previous readings"  page="Readings" />
                <Button theme="grey"        label="Help"                    page="Help"             />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

function ConnectedScreen( { navigation } ) {
    return (
        <View style={styles.container}>
            <Button theme="disconnect" label="Disconnect" page="Home" />
            <View style={styles.logoContainer}>
                <ImageViewer ImageSource={Logo} ImageType={"logo"} />
            </View>
            <View>
                <Text style={styles.captionText}>Device connected.</Text>
            </View>
            <View style={styles.footerContainer}>
                <Button theme="green"   label="Take a reading"          page="ReadingInProgress" />
                <Button theme="purple"  label="View previous readings"  page="Readings" />
                <Button theme="grey"    label="Help"                    page="Help"             />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

function ReadingInProgressScreen( { navigation } ) {
    return (
        <View style={styles.container}>
            <Button theme="disconnect" label="Disconnect" page="Home" />
            <View>
                <Text style={styles.topText}>Reading in progress.</Text>
            </View>
            <View style={styles.exampleImageContainer}>
                <ImageViewer ImageSource={exampleReading} ImageType={"exampleImage"} />
            </View>
            <View style={styles.footerContainer}>
                <Button theme="red"   label="Finish reading and save"   page="ReadingComplete" />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

function ReadingCompleteScreen( { navigation } ) {
    return (
        <View style={styles.container}>
            <Button theme="disconnect" label="Disconnect" page="Home" />
            <View style={styles.logoContainer}>
                <ImageViewer ImageSource={Logo} ImageType={"logo"} />
            </View>
            <View>
                <Text style={styles.captionTextFourButtons}>Reading complete.</Text>
            </View>
            <View style={styles.footerContainer}>
                <Button theme="blue"    label="View reading"            page="ViewLastReading"   />
                <Button theme="green"   label="Take another reading"    page="ReadingInProgress" />
                <Button theme="purple"  label="View previous readings"  page="Readings"          />
                <Button theme="grey"    label="Help"                    page="Help"              />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

function ViewLastReadingScreen( { navigation } ) {
    return (
        <View style={styles.container}>
            <Button theme="disconnect" label="Disconnect" page="Home" />
            <View style={styles.topText}>
                <Text style={styles.topText}>Last reading.</Text>
            </View>
            <View style={styles.exampleImageContainer}>
                <ImageViewer ImageSource={exampleReading} ImageType={"exampleImage"} />
            </View>
            <View style={styles.footerContainer}>
                <Button theme="purple"   label="Export reading"   page="ReadingComplete" />
                <Button theme="blue"   label="Back"               page="ReadingComplete" />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

function ReadingsScreen( { navigation } ) {
    return (
        <View style={styles.container}>
            <Button theme="disconnect" label="Disconnect" page="Home" />
            <View style={styles.topText}>
                <Text style={styles.topText}>Readings</Text>
            </View>
            <View style={styles.exampleImageContainer}>
                <ImageViewer ImageSource={exampleTable} ImageType={"exampleImage"} />
            </View>
            <View style={styles.footerContainer}>
                <Button theme="export"  label="Export all readings" page="ReadingComplete" close={true}
                url='./assets/images/example_table.png'/>
                <Button theme="blue"    label="Back"                page="ReadingComplete" />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}


function HelpScreen( { navigation } ) {
    return (
        <View style={styles.container}>
            <Button theme="disconnect" label="Disconnect" page="Home" />
            <View style={styles.logoContainer}>
                <ImageViewer ImageSource={Logo} />
            </View>
            <View>
                <Text style={styles.captionText}>This will be a help screen.</Text>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const Stack = createNativeStackNavigator();

function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{   headerShown: false}}>

                <Stack.Screen name="Home"               component={HomeScreen}    />
                <Stack.Screen name="Connected"          component={ConnectedScreen}  />
                <Stack.Screen name="ReadingInProgress"  component={ReadingInProgressScreen}  />
                <Stack.Screen name="ReadingComplete"    component={ReadingCompleteScreen}  />
                <Stack.Screen name="ViewLastReading"    component={ViewLastReadingScreen}  />
                <Stack.Screen name="Readings"           component={ReadingsScreen}  />
                <Stack.Screen name="Help"               component={HelpScreen}  />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161616',
        alignItems: 'center',
    },
    logoContainer: {
        paddingTop: 60,
        paddingBottom: 30,
    },

    captionText: {
        paddingBottom: 100,
        fontSize: 20,
        color: '#ffffff',
    },

    captionTextFourButtons: {
        paddingBottom: 50,
        fontSize: 20,
        color: '#ffffff',
    },

    footerContainer: {
        flex: 0.7,
        alignItems: 'center',
        paddingBottom: 180,
    },

    topText: {
        paddingTop: 45,
        fontSize: 20,
        color: '#ffffff',
    },

    exampleImageContainer: {
        paddingTop: 20,
        paddingBottom: 10,
    },
});

export default App;