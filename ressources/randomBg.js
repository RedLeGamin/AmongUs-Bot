var myArray = [
  "https://media.discordapp.net/attachments/405780210265620480/761524088333533204/unknown_3.jpg",
  "https://media.discordapp.net/attachments/429158600720515077/758741106258608158/unknown.png",
  "https://media.discordapp.net/attachments/405780210265620480/761524088166023178/unknown_2.jpg",
  "https://cdn.discordapp.com/attachments/405780210265620480/761600673569308722/t.png"
];
var backgroundUrl = myArray[Math.floor(Math.random() * myArray.length)];

module.exports = () => backgroundUrl;