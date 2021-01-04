const Discord = require('discord.js');
const bot = new Discord.Client();
var fs = require('fs'); //Required for userdata

var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

const token = 'NjI3OTY3MzQwODg5MjQzNjc5.XZEWKQ.pzuKFwFApcRiM_B4zdSy2jtO0iY';

const PREFIX = '~~'
var helpmessage = ("```Current Commands```\n1. ping\n2. check\n3. info version\n4. clear")

bot.on('ready', () =>{
    console.log('Caretaker online');
})

bot.on('message', message=>{
    
    var sender = message.author;
    var msg = message.content.toUpperCase();
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'ping':
            message.channel.send('pong!');
            break;
			
        case 'info':
            if(args[1] === 'version'){
                message.channel.send('Version 1.0.0');
            } else{
                message.channel.send('Invalid Args');
            }
            break;
			
        case 'help':
            message.channel.send(helpmessage);
            break;
			
        case 'clear':
            if(!args[1]) return message.reply('Error, please define second arg!');
            message.channel.bulkDelete(args[1]);
            break;

        //Poof Patroller Check:
        case 'check':
            if (!args[1]) return message.reply('Invalid Syntax: ~~check @username');

            username = args[1];
            if (username == "<@627967340889243679>") { message.channel.send(username + " is potty trained. And " + message.author + " will be getting spanked to make sure they remember it."); break; }
            if (username == "@everyone" || username == "@here") { message.channel.send(message.author + " has been paci-gagged for their crimes against humanity."); break; }
            
            //Generates a value of 1-6 to decide diaper status
            var value1 = Math.floor(Math.random() * 6) + 1;
            //Generated a value between 1-4, 1-3, or 1-2 depending on number of responses in each category
            if (value1 <= 3) {
                value2 = Math.floor(Math.random() * 2) + 1;
            } else if (value1 <= 5) {
                value2 = Math.floor(Math.random() * 3) + 1;
            } else {
                value2 = Math.floor(Math.random() * 4) + 1;
            }

            if (value1 == 1) {
                if (value2 == 1) { message.channel.send(username + " is wet and messy. Bummer, kiddo. Looks like you won't be out of diapers any time soon.")
                } else { message.channel.send(username + " is wet and messy. Somebody change them before they get a bad rash!")}
            } else if (value1 == 2) { 
                if (value2 == 1) { message.channel.send(username + " is wet, but their diaper can still hold quite a bit more.")
                } else { message.channel.send(username + " is wet. They probably like being in soggy padding or they would have asked for a change by now.")}
            } else if (value1 == 3) {
                if (value2 == 1) { message.channel.send(username + " is a little damp. Looks like they're not as big as they think.")
                } else { message.channel.send(username + " is a little damp. Someone didn't quite make it to the potty.")}
            } else if (value1 == 4) {
                if (value2 == 1) { message.channel.send(username + " is messy. Oof! That smell is overpowering.")
                } else if (value2 == 2) { message.channel.send(username + " is messy. Looks like potty training isn't going so well.")
                } else {message.channel.send(username + " is such a little stinker...someone change this bab pronto!")}
            } else if (value1 == 5) {
                if (value2 == 1) { message.channel.send(username + " is soaked! Chance of leaking at 95% if not changed immediately.")
                } else if (value2 == 2) { message.channel.send("Oh no! " + username + " is about to leak! Someone needs changing pronto!")
                } else {message.channel.send("Uh oh! " + username + " leaked! Someone needs a thicker diaper...")}
            } else {
                if (value2 == 1) { message.channel.send(username + " is clean. What a big kid!")
                } else if (value2 == 2) { message.channel.send(username + " is clean. They must have been changed recently.")
                } else if (value2 == 3) { message.channel.send("Wow! " + username + " is actually dry... for once.")
                } else {message.channel.send(username + " is clean. They deserve a sticker on their sticker chart.")}
            }
            break;

        case 'stats':
            message.channel.send('You have sent **' + userData[sender.id].messagesSent + '** messages!')
            break;
        
        case 'bal': case 'balance':
            if (userData[sender.id].bal >= 0) {
                message.channel.send('You have acquired **$' + userData[sender.id].bal + '**!')
            }
            else {
                message.channel.send('You have **$' + userData[sender.id].bal * -1 + '** worth in debt!')
            }
            break;
        case 'addmoney':
            if (!args[1]) return message.reply("```Invalid Method!```\naddmoney momscreditcard\naddmoney diaperpics\naddmoney taxdollars");
            if (args[1] == "momscreditcard") {userData[sender.id].bal += 200.0; message.channel.send("$200 has been added to your account!")}
            if (args[1] == "diaperpics") {
                var yolo = Math.floor(Math.random() * 10) + 1;
                if (yolo <= 9) {message.channel.send("You gained no money this time, but you do feel cuter!")}
                else {userData[sender.id].bal += 10000.0; {message.channel.send("$10,000 has been added to your account by Strom Holdings LLC")}}}
            if (args[1] == "taxdollars") {userData[sender.id].bal += 500.0; message.channel.send("$500 has been added to your account Mr. President!")}
            break;

        case 'todolist':
                message.channel.send("```To-Do List:```\nTrivia\nMoney-Making Methods -- Gambling?\nGames\nStats Leaderboards\nDeep-Learning Ai - Threaten people who awoo with pics of their house and family???\nLoki eats crayons")
                break;
    }

    /****************
     *   USER DATA  *
     ****************/
    //If user isn't in data: 
    if (!userData[sender.id]) userData[sender.id] = {
        messagesSent: 0,
        bal: 0
    }

    //Then, add a message count to their count:
    userData[sender.id].messagesSent++;

    //Save data/errors:
    fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
        if (err) console.error(err);
    });


    /****************
     *   AWOO BAN   *
     ****************/
    if (msg.includes('AWOO') && message.author != "<@627967340889243679>") {
        console.log('message.author == ' + message.author);
        message.delete()
        userData[sender.id].bal -= 350.0
        message.channel.send("NO! Bad " + message.author + "! No awooing! You have been charged $350 and you're sleeping on the couch tonight.")
    }
})

    


bot.login(token);