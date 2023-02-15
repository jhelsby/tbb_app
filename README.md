# tbb_app

Mobile app for Team Biodevices Without Borders. Coded in React Native. Currently just a
frontend that doesn't do anything. Full functionality can only be implemented once 
the hardware has been built.

## Get Started

I used Expo Go to build this app.

* You can also get it working with the React Native CLI if you prefer.

* You can also run it in your browser using Snack without installing anything, if you copy the files over appropriately.

See [here](https://reactnative.dev/docs/environment-setup) for further details on all three methods.

To get going with Expo Go, first install it and create an Expo account, as detailed 
[here](https://docs.expo.dev/get-started/installation/).

Once installed, run the following commands in the directory you wish to use:

```bash
npx create-expo-app YourProjectName
npm install @react-navigation/native-stack    # Install packages the  
npx expo install expo-sharing                 # app is currently using.
```

Place this repository's files in the newly created YourProjectName directory, replacing any files 
containing duplicates as prompted. Then run:

```bash
cd YourProjectName
npx expo start
```

This will print a QR code to terminal. If you have a smartphone, the easiest way to get the
app running is to install the Expo Go app on your phone, login to your account and scan the QR code. 

Alternatively:

* If you are using MacOS, you can get the app running in an iOS simulator on your computer using Xcode: 
see [here](https://docs.expo.dev/workflow/ios-simulator/).

* You can get the app running in an Android simulator on your computer using Android Studio: 
see [here](https://docs.expo.dev/workflow/android-studio-emulator/).

* You can run the app in your web browser with Expo CLI: see [here](https://docs.expo.dev/workflow/web/).
