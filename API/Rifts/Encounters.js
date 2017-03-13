on("chat:message", function(msg) {
    var tLOOT = '';
    var msgTxt = msg.content;
    if(msg.type == "api" && msgTxt.indexOf("!enc") !== -1) {
        var msgFormula = msgTxt.split(" ");
        //------------------
        var aLoottext = fPart + "background-color:#0B3B0B;'>● Encounter roll ●</div>";
        var croll = findObjs({_type: 'character', name: 'World'})[0];
        var oHour = findObjs({name: "Hour",_type: "attribute", _characterid: croll.id}, {caseInsensitive: true})[0];
        var oHourNum = parseInt(oHour.get("current"));
        dType = "Day";
        timeChance = 1;
        if(oHourNum >= 20 || oHourNum <= 5 ) { dType = "Night"; timeChance = 2; }
        NEchance = 49;
        CEchance = 1*timeChance;
        var loots = randomInteger(100);
        //------------------
        var img = "http:\\//i.imgur.com/hc669Eb.jpg";
        if(loots >= NEchance) {
            //EVENT ENCOUNTER
            var aLoottext = fPart + "background-color:#852828;'>● "+dType+ " Event ●</div>";
            sendChat('', "/desc " + aLoottext);
            var items = findObjs({_type: "tableitem",_rollabletableid: "-JNzlykL6Jb-5PpXsahe"});
            var rand1 = randomInteger(items.length);
            var chosen = items[rand1 - 1];
            var lootE = chosen.get("name");
            tLOOT = tLOOT + lPart + "background-size: 100%; background-image: url(" + img + ");'><b><u>"+NEchance+" EVENT:</b></u> <a style='color:#888'>#" + rand1 + " (" + loots + ")</a><br>" + lootE + "</div>";
        } else if (loots <= NEchance){
            //REAL ENCOUNTER
            var aLoottext = fPart + "background-color:#852828;'>● "+dType+ " Encounter! ● </div>";
            sendChat('', "/desc " + aLoottext);
            var items = findObjs({_type: "tableitem",_rollabletableid: "-JNy1bCgcImoZvPziK7C"});
            var rand1 = randomInteger(items.length);
            var chosen = items[rand1 - 1];
            var lootE = chosen.get("name");
            tLOOT = tLOOT + lPart + "background-size: 100%; background-image: url(" + img + ");'><b><u>"+CEchance+" CREATURE:</b></u> <a style='color:#888'>#" + rand1 + " (" + loots + ")</a><br>" + lootE + "</div>";
        }
        else {
            tLOOT = tLOOT + lPart + "background-size: 100%; background-image: url(" + img + ");'><b><u>"+CEchance+" "+loots+" NOTHING</div>";
        }
        sendChat('', '/w gm ' + tLOOT);
    }
});
on("chat:message", function(msg) {
    var msgTxt = msg.content;
    if(msg.type == "api" && msgTxt.indexOf("!A") !== -1) {

    }
});

function getFolderObjects(objs) {
    return _.map(objs, function(o) {
        if (_.isString(o)) {
            return getObj('handout', o) || getObj('character', o);
        }
        if (_.isArray(o.i)) {
            o.i = getFolderObjects(o.i);
            return o;
        }
    });
}

function getObjectFromFolder(path, folderData, getFolder) {
    if (path.indexOf('.') < 0) {
        if (getFolder) {
            return _.find(folderData, (o) => o.n && o.n.toLowerCase() === path.toLowerCase()).i;
        }
        return _.find(folderData, (o) => o.get && o.get('name').toLowerCase() === path.toLowerCase());
    }
    path = path.split('.');
    var folder = path.shift();
    path = path.join('.');
    folderData = _.find(folderData, (o) => o.n && o.n.toLowerCase() === folder.toLowerCase());
    return getObjectFromFolder(path, folderData.i);
}