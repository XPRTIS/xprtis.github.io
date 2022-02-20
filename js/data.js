// Create an array for the different hazards that exist:

var offScreenSource = {};

var soap = {
    // ...
};

var dirtyHands = {
    x: 0,
    y: 0,
    width: 10,
    height: 10,
    damage: 5,
    imageUrl: "images/dirtyHand.jpg",
    speed: 10,
    source: offScreenSource,
    prevention: soap,
    points = 2,
    health = 100
};

var stove = {
    points: 10
};

var smoke = {
    x: 0,
    y: 0,
    width: 20,
    height: 20, 
    source: stove,
    damage: 5,
}; // Fill in with another hazard

var hazards = [dirtyHands, smoke]; // fill in the rest with your code.

// Create an array for the scripts of evil villan
// (Find them on the game design document)

var villanScripts = ["",
                    "He will run out of energy soon, and then my filthy hands will grab him!  I just hope he does not like fruits and vegetables!",
                    "Curses, he does eat fruits and vegetables.  He knows smoke from fires hurts his eyes.  I hope he does not also know it hurts his lungs! As long as his family cooks on a traditional fire, that smoke helps me out!",
                    "Zounds!  Even my dangerous smoke did not stop him.  Next round I’ll get him.  He won’t be able to avoid the poop on the ground.  And that poop carries worms that crawl into his bare feet and then live inside him!  They become my allies inside his body!",
                    "Curses!  Those worms are too slow.  Happily, flies that land on outdoor poop also fly to his food!  When he eats food with poop and germs on it, I will have him!  Each villager doing his morning walk to the fields is now helping me spread disease!",
                    "Even flies did not carry poop to him.  But he cannot avoid water!  Without boiling, chlorine or a filter, the water will carry poop and germs to him‼",
                    "...",
                    "Zounds!  He used chlorine [and a filter] to remove poop and germs from the water.  But there is no way to keep people with measles away from him.  He has not been immunized, so any nearby measles will spread to him quickly! ",
                    ];