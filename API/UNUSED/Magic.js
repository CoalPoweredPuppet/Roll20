//!magic --[[1d5]] rounds --desc --ammo
on('chat:message', function (msg) {
    if (msg.type != "api") return;
    var msgTxt = msg.content;
    var command = msg.content.split(" ", 1);
    if (command == "!magic") {
        var cWho = findObjs({_type: 'character',name: msg.who})[0];
        if (cWho == undefined && msg.who != "GM (GM)") {
            cWho = RollRight(msg.playerid);
            msg.who = cWho.get("name");
        }
        //check roll---------------------
        var ar = msg.inlinerolls[0];
        if (ar === undefined) {
            sendChat('', "/direct <B><I>bad macro!");
            return;
        }
        //define var----------------------
        var who = msg.who;
        var PlayerBGColor = getObj("player", msg.playerid).get("color");
        var boxcolor = '#8836A8';
        if (msg.who == "GM (GM)") {who = "NPC";}
        var font = 'Century Gothic';
        var dParts = "";
        var dRoll = "";
        var DD = "";
        var bText = "";
        var DDtext = "";
        var bg_crit = "";
        var MainSay = "<div style='box-shadow: 3px 3px 2px "+bShadow+"; text-shadow: 1px 1px #878787; font-family: "+ font + "; font-size: small; text-align: center; vertical-align: middle; padding: 1px; border-left: 1px solid #000; border-right: 1px solid #000; border-radius: 0px; background-color:#CEC7B6; color: #000;'>";
        var MainEven = "<div style='box-shadow: 3px 3px 2px "+bShadow+"; text-shadow: 1px 1px #878787; font-family: " + font + "; text-align: center; vertical-align: middle; padding: 1px; border-left: 1px solid #000; border-right: 1px solid #000; border-radius: 0px; background-color: #CEC7B6; color: #000;'>";
        var MainOdd = "<div style='box-shadow: 3px 3px 2px "+bShadow+"; text-shadow: 1px 1px #878787; font-family: " + font + "; text-align: center; vertical-align: middle; padding: 1px; border-left: 1px solid #000; border-right: 1px solid #000; border-radius: 0px; background-color: #C0B9A8; color: #000;'>";
        var msgFormula = msgTxt.split(" --");
        //set desc
        if (msgFormula[2] !== undefined) Custom = "Effect: " + msgFormula[2].toUpperCase();
        else(Custom = "");
        //--------------------------------
        //duration PARTS-----------------
        //-----------------------------
        //Attack total and type
        Atotal = (ar.results.total);
        Atype = "<a style='color:RED'>" + ar.expression + "</a>";
        //-----------------------------
        //CHATBOX PARTS----------------
        //-----------------------------
        Main = MainSay + "<i>" + Custom + "</div>";
        var mType = msgFormula[1].split(" ");
        var mType = mType[1];
        Main = Main + MainOdd + Atype + "<b> = <a style='color:BLUE'>" + Atotal + " " + mType +"</b></a></div>";
        //-----------------------------
        //AMMO PARTS----------------
        //-----------------------------
        if (msgFormula[3] !== undefined) {
            var ammoF = msgFormula[3].split(" ");
            var ammoType = ammoF[0];
            if (cWho !== undefined) {
                var ammo0 = findObjs({_type: "attribute",name: ammoType,_characterid: cWho.id}, {caseInsensitive: true})[0];
            }
            if (ammo0 !== undefined){
                var ammoC = parseInt(ammoF[1]);
                if(ammoC === undefined || isNaN(ammoC)) ammoC = 1;
                var cAmmo = parseInt(ammo0.get("current"));
                var mAmmo = parseInt(ammo0.get("max"));
                var curPageID = findObjs({_type: "campaign"})[0].get("playerpageid");
                var curPage = findObjs({_type: "page", _id: curPageID})[0];
                var charObj = findObjs({ type: 'character', controlledby: msg.playerid })[0];
                var tokens = findObjs({_type: "graphic", layer:"objects", _pageid: curPageID, represents: charObj.id});
                _.each(tokens, function(id) {
                    var who = getObj('character', id.get("_represents"));
                    var aSet = findObjs({_type: "attribute",name: ammoType,});
                    aSet = aSet[0].id;
                    id.set("bar3_link", aSet);
    				id.set('bar3_value', cAmmo);
					id.set('bar3_max', mAmmo);
                });
                var aPart = "<div style='box-shadow: 3px 3px 2px "+bShadow+"; font-family: "+font+"; font-size: 8pt; text-align: center; margin:0px; padding:0px 0px 0px 0px; border-left: 1px solid #000; border-right: 1px solid #000; border-top: 1px solid #000; border-radius: 0px; color: #000;";
                if (cAmmo <= 0 || cAmmo < ammoC) {
                    cAmmo = "0";
                    ammo0.set('current', cAmmo);
                    ammo0.set('max', mAmmo);
                    Main = aPart + "background-color:RED;'><b><i>Not Enough " + ammoType + " ammo left in clip.</div>";
                }
                else if (cAmmo <= 2 || cAmmo < ammoC) {
                    cAmmo = cAmmo - ammoC;
                    ammo0.set('current', cAmmo);
                    ammo0.set('max', mAmmo);
                    Main = Main + aPart + "background-color:RED;'><b><i>" + cAmmo + " " + ammoType + " ammo left in clip.</div>";
                }
                else {
                    cAmmo = cAmmo - ammoC;
                    ammo0.set('current', cAmmo);
                    ammo0.set('max', mAmmo);
                    Main = Main + aPart + "background-color:#A8A191;'><b><i>" + cAmmo + " of " + mAmmo + " " + ammoType + " left</div>";
                }
            }
        }
        //-----------------------------
        //SEND CHAT----------------
        //-----------------------------
        var pad = "3px;";
        if (bText != "") pad = "2px;";
        var top = "<div style=' box-shadow: 3px 3px 2px "+bShadow+"; text-shadow: -1px -1px #000, 1px -1px #000, -1px 1px #000, 2px 2px #000; font-family: "+font+"; text-align: center; vertical-align: middle; padding: 0px 0px; margin-top: 0.2em; border: 1px solid #000; border-radius: 10px 10px 0px 0px; color: #FFFFFF; background-color:" + boxcolor + ";'><b>" + who + "  Casts</div>";
        End = "<div style='box-shadow: 3px 3px 2px "+bShadow+"; text-shadow: -1px -1px #000, 1px -1px #000, -1px 1px #000, 2px 2px #000; font-family: "+font+"; font-size: 16px ;text-align: center; padding: "+pad+" vertical-align: middle; border: 1px solid #000; border-radius: 0px 0px 5px 5px; color: #FFFFFF; background-color:#545454;'><b>"  + bText + "</div>";
        sendChat(who, '/direct ' + top + Main + End);
        return;
    }
});