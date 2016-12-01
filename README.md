# Rhetoric
A hacked up demo / proof of concept for single page web application that 
analyzes speech and visualizes the speaker’s ideas in real time.

Proposed final project for COMP86 - "Object Oriented 
Programming for GUI" at Tufts University

Presented on Wednesday, November 30 2016.

# View the Presentation and Proposal PDFs
Presentation.pdf & Proposal.pdf Located in this repo

# How it Works
Upon loading the webpage, the app will begin reading in user audio input, and 
generate an ongoing text transcript that dynamically appears on the page as the 
user speaks. Every time there is a meaningful pause or the user stops speech 
detection, speech text will be analyzed for keywords, sentiments, concepts, 
phrases, and other ideas. The relationship between ideas will then be displayed 
in a network visualization graph.

#API & Library Usage
## Speech to text  - Webkit Speech Recognition API
https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

## Network Graph Visualization - VisJS
http://visjs.org/index.html#download_install

## Text Analysis  - Aylien Text Analysis API
http://aylien.com/text-api
I have already contacted the company and obtained an API key for a free tier app,
and have been able to successfuly make API calls. I plan to use the "entities", 
"concepts", "classify", and "hashtags" endpoints. The API provides a way to 
make combined calls to multiple endpoints, and receive a combined response.

# Goals 
1. Convert speech to text in real time, and render an ongoing transcript in the 
browser using the MDN Webkit Speech Recognition API.
2. Periodically analyze the transcript by making calls to the  Aylien Text 
Analysis API.
3. Visualize relationships between keywords, sentiments, concepts, phrases, and 
other ideas in a network graph using the VisJS javascript library

# Possible Target Users 
● Economic analysts trying to quickly identify real time market trends and 
sentiments about the future
● News analysts looking to distill ideas from speeches by leaders and public 
figures
● Lawyers who seek insight into human motivations from speech
● Medical or psychiatric professionals trying to identify patterns and 
relationshipsbetween described symptoms
● Public speakers who wish to add visual aid to their speeches in real time, or 
make sure they are properly conveying the core ideas of an overarching message

# Running the Demo Locally

Run npm install 

Type node index.js

View localhost:5000

Allow access to your browser's microphone

Begin speaking and the app will translate your speech to text. When you take
a significant pause or finish speaking, the app will perform analysis on
your speech.
