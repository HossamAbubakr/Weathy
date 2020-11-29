# Weathy The Weather Journal

![Showcase.gif](/Showcase.gif)

## Table of Contents

* [Summary](#Summary)

* [Technologies](#Technologies)

* [Features](#Features)

## Summary

Weathy is a weather journal app built using NodeJS and Javascript that I built to practice front end programming.

It uses Openweather.org as the weather endpoint, and has a sleek and modern design.

## Technologies

NodeJS was used as the server.
HTML, CSS and Pure JS was used for the front end.


## Features

1. Supports all American states but can be be modified to support other locations with ease.

2. Choose the temp to be in either Fahrenheit or Celsius.

3. Supports all 16 weather conditions exposed by the Openweather API and visually show the temp in each journal. 

4. Automatically loads journal (if available)

5. Rounded the temp to the closest integer.

6. Added a character limit when viewing the latest entries.

7. Added many measures for the bugs that might happen such as :
     A. Check for the legnth of the response to make sure there are elements in the body before attempting to the update the UI otherwise issues can arise when you load the site for the first time and the update UI function tries to look for past entries.

     B. The getMonth function has an index of 0 for some reason and in the example provided by Udacity the month will always be right unless corrected by a single month ahead of time.

     C. The aforementioned character limit to keep the UI simple and beautiful without a lot of clutter.

     D. Blank image for the temp condition as an empty src tag would result in a broken image icon.
		 

## Usage

You can get the project up and running in 3 simple steps.

1. Use the following command to install the required packages
```
npm install
```

2. Supply your own API key in app.js.
```
const apiKey = ""; /* Enter your API key here */
```
3. Use The follow command to start the server and voila!
```
npm start
```
