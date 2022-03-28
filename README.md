# Secure Recipes Client
## Host - https://meek-klepon-9ced87.netlify.app/
Client for Secure Recipes Web Application
## Description
CRUD application that allows users to securely store their recipes within an account. 
## Summary
Although this app is pretty basic in itself, it's main purpose is to showcase the skills that I currently have as a web developer. I've implemented a backend system that communicates to the client everytime there's a server error. If you register a new account, the app sends you an e-mail for confirmation to prevent spam accounts. Also if you want to reset a password to an account, an e-mail will get sent to the account with a JWT. The frontend is connected to a cloudinary widget that allows users to upload photos from anywhere on the net, then scales the images. I am using heroku to host my backend so the first response of the day will always be slow. For that, I've added loading spinners wherever neccessary to let the user know that there action is being taken care of. Forms come with frontend validation while the backend currently only checks if the value is there or not.
The app isn't perfect. There's some bugs I know about and probably alot more I don't. The app is responsive to a point but it can be better. This was the price of not having a second library like Bootstrap to handle this for me. The file structure on both ends definately isn't industry standard. For example my backend file structure doesn't include a utils or config folder. I also divided every folder by model for some reason, and included routers and middlewares in that folder. 
In conclusion, while this app can still be alot better, I do think it's good enough to make public and have this as my main app to showcase currently. If you look at my past projects compared to this one, I hope you'll notice how much I've improved over the past couple of years. I've provided notes on both ends of the project. The notes 
for my client are included within the draw.io link in the bottom. The notes for my server are located within the server repo under a file named 'plans.txt'.
## draw.io
https://drive.google.com/file/d/1I7lMpWwacuu-WuODwfHw5YLjx9lLMeDD/view?usp=sharing
