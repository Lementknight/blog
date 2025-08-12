---
title: "How to Turn a Shell Script into an Apple App"
tags: ["shell-script", "macos", "app-development"]
date: 2025-08-12T12:00:00-05:00
description: "Tutorial on how to convert a shell script into a macOS application."
draft: false
---

Recently I downloaded [Balatro](https://www.playbalatro.com/) on my Macbook Pro and I wanted to play mods on it, but to play mods on it I had to run a shell script. I didn't want to navigate to the directory on my terminal and run the script every time I wanted to play, so I decided to turn the command that I had to run into an Apple app. This is how I did it.

## Step 1: Create the Shell Script

In this step I created a shell script that navigates to the directory where the Balatro mods are located and runs the script to launch the mods. Let's name the file `play_modded_balatro.sh`. Here is an example of what the script might look like:

```bash
play_modded_balatro.sh

#!/bin/bash
cd "path/to/your/balatro/mods"
./balatro_mod_script.sh
```

## Step 2: Make the Script Executable

After creating the shell script, you need to make it executable. Open your terminal and run the following command:

```bash
chmod +x play_modded_balatro.sh
```

Congratulations! You have now created a shell script that can be executed from the terminal. Now let's turn it into an app.

Before we can turn the shell script into an app, we need to create a directory structure that macOS expects for applications.

Here is what the structure of the app will look like:

```bash
App_Name.app/
├── Contents/
│   ├── Info.plist
│   ├── MacOS/
│   │   └── play_modded_balatro.sh
```

`App_Name.app` is the name of your application, this is the root directory of the application bundle which will contains the necessary files for macOS to recognize it as an application.

`Info.plist` is a property list file that contains metadata about the application, such as its name, version, and executable path.


## Step 3: Create the Directory Structure
Open your terminal and navigate to the `Applications` directory. Then run the following commands to create the necessary directories:

```bash
cd ~
cd ../../Applications # Navigate to the Applications directory
mkdir -p App_Name.app/Contents/MacOS # Creates the directory structure for the app
touch App_Name.app/Contents/Info.plist # Creates the Info.plist file
cp <path_to_your_shell_script> App_Name.app/Contents/MacOS/ # Copies the shell script to the MacOS directory
```

> [!NOTE]
> You want to place the app in the `Applications` directory so that it can be easily accessed and launched like any other application on your Mac.

## Step 4: Edit the Info.plist File
Now you need to edit the `Info.plist` file to provide the necessary metadata for your application. Open the `Info.plist` file in a text editor and add the following content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleName</key>
    <string>App_Name</string>
    <key>CFBundleIdentifier</key>
    <string>com.example.App_Name</string>
    <key>CFBundleVersion</key>
    <string>1.0</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0</string>
    <key>LSArchitecturePriority</key>
    <string>arm64</string>
</dict>
</plist>
```
> [!NOTE]
> Replace `LSArchitecturePriority` is set to `arm64` since my the mod for Balatro needs to run on the Apple Silicon architecture (not with Rosetta 2). You can read more about the `Info.plist` file [here](https://developer.apple.com/documentation/bundleresources/information-property-list).


## Step 5: Run the Application
Now that you have created the app structure and edited the `Info.plist` file, you can run your application. Open Finder, navigate to the `Applications` directory, and double-click on `App_Name.app`. 


References:
- [Converting a Shell Script Into a *.app File](https://stackoverflow.com/questions/30792569/converting-a-shell-script-into-a-app-file#:~:text=Where%20the%20file,MyScript)
- [The Importance of Info.plist in iOS Development](https://medium.com/@kalidoss.shanmugam/the-importance-of-info-plist-in-ios-development-fa76c238a243)