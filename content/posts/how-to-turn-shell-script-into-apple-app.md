---
title: "How to Turn a Shell Script into an Apple App"
tags: ["shell-script", "macos", "app-development"]
date: 2025-03-17T10:48:29+02:00
description: "Tutorial on how to convert a shell script into a macOS application."
draft: true
---

Recently I downloaded Balatro on my Macbook Pro and I wanted to play mods on it, but to play mods on it I had to run a shell script. I didn't want to navigate to the directory and run the script every time I wanted to play, so I decided to turn the command that I had to run into an Apple app. This is how I did it.

## Step 1: Create the Shell Script

In this step I created a shell script that navigates to the directory where the Balatro mods are located and runs the script to launch the mods. Let's name the file `play_modded_balatro.sh`. Here is an example of what the script might look like:

```bash
play_modded_balatro.sh

#!/bin/bash
cd "path/to/your/balatro/mods"
./balatro_mod_script.sh
```

> **_NOTE:_** You can replace the contents of the script with whatever shell commands you would like to run.

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
Open your terminal and navigate to the directory where you want to create your app. Then run the following commands to create the necessary directories:

```bash
mkdir -p App_Name.app/Contents/MacOS # Creates the directory structure for the app
touch App_Name.app/Contents/Info.plist # Creates the Info.plist file
cp play_modded_balatro.sh App_Name.app/Contents/MacOS/ # Copies the shell script to the MacOS directory
```

