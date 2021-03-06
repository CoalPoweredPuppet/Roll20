function FoodSet(Hours) {
    var tFood = "";
    var tFood1 = '';
    var tFood1= '';
    var characters = findObjs({_type: "character" ,inplayerjournals: "all"});
    _.each(characters, function(id) {
        color = "#ABDB27";
        var aName = findObjs({_type: "attribute",name: "Name",_characterid: id.id}, {caseInsensitive: true})[0];
        var aFood = findObjs({ _type: "attribute",name: "HUNGER",_characterid: id.id}, {caseInsensitive: true})[0];
        var HungH = findObjs({_type: "attribute",name: "HUNGERH",_characterid: id.id}, {caseInsensitive: true})[0];
        if(HungH && aFood !== undefined) {
            var Hperc = HungH.get("current");
            var FoodMax = aFood.get("max")
            var FoodCount = parseFloat(aFood.get("current")-(Hperc*Hours));
            if (FoodCount > FoodMax) FoodCount = FoodMax;
            if (FoodCount < 0) FoodCount = 0;
            FoodCount = Math.round(FoodCount.toFixed(1));
            var FoodPercentage = Math.round(FoodCount)
            var name = aName.get("current") + "("+FoodPercentage+"/"+FoodMax+")";
            aFood.set('current', FoodCount);
            if (FoodCount <= FoodMax*0.15) {
                tFood = tFood.concat("{{<small>"+name+ ":=<small>is starving!<br>(-8 on all rolls -60% skills).}}");
                color = "#F7DB5C"
            }
            else if (FoodCount <= FoodMax*0.30) {
                tFood = tFood.concat("{{<small>"+name+ ":=<small>needs to eat.<br>(-2 on all rolls -30% skills).}}");
                color = "#F7DB5C"
            }
            else if (FoodCount <= FoodMax*0.45) {
                tFood = tFood.concat("{{<small>"+name+ ":=<small>is getting hungry.}}");
            }
            if (FoodCount <= FoodMax*0.45) {
                var a = '<div style="margin:5px; float:right; display:inline-block; border-radius:2px; width:40%; background-color:black; border:1px solid black; height:3px">';
                var b = '<div style="border-radius: 2px; width:'+Math.round(FoodCount/FoodMax*100)+'%;background-color:'+color+';border-right:1px solid black;height:3px"></div></div><hr>';
                tFood1 = tFood1.concat(name+" "+a+b);
            }
        }
    });
    var Chart = "<div style='text-align:left; font-size:8pt; background-color:white; padding:2px; border:1px solid black;'>"+tFood1+"</div>";
    sendChat('', "&{template:RIFTS} {{name=Food}} {{color=food}}"+tFood+"{{Stats="+Chart+"}}");
};
function SleepSet(HoursPassed) {
    var characters = findObjs({_type: "character" ,inplayerjournals: "all"});
    var tSleep = "";
    var IsAsleep = "";
    var tFood1 = '';
    _.each(characters, function(id) {
        color = "#A1D4E6";
        var aName = findObjs({_type: "attribute",name: "Name",_characterid: id.id}, {caseInsensitive: true})[0];
        var aSleep = findObjs({ _type: "attribute",name: "SLEEP",_characterid: id.id}, {caseInsensitive: true})[0];
        var Sleeping = findObjs({ _type: "attribute",name: "SLEEPING",_characterid: id.id}, {caseInsensitive: true})[0];
        if(aSleep !== undefined) {
            var MaxUp = aSleep.get("max");
            var HoursUp = parseFloat(+aSleep.get("current"));
            var slname = aName.get("current");
            var name = aName.get("current") + "("+HoursUp+"/"+MaxUp+")";
            var IsSleeping = Sleeping.get("current");
            if (IsSleeping == 1) {
                var IsSleepingAdjust = Sleeping.get("max");
                HoursUp = HoursUp - (HoursPassed * IsSleepingAdjust);
                if (HoursUp < 0) HoursUp = 0;
                IsAsleep = IsAsleep.concat("{{<small>"+ slname + ":=<small> is sleeping ["+Math.round(HoursUp/IsSleepingAdjust)+"]}}<br>");
            }
            else {
            var HoursUp = parseFloat(+aSleep.get("current") + +HoursPassed);
            }
            if (HoursUp >= MaxUp && IsSleeping != 1) {
                tSleep = tSleep.concat(name + ":is passed out.</div>");
            }
            else if (HoursUp > (MaxUp * 0.80) && IsSleeping != 1) {
                tSleep = tSleep.concat("{{<small>"+ name + ":=<small>is barely able to stay awake!</b><br><i>[-8 on all rolls, -75% on perception rolls, -75% skills, DC PE 16 to fall asleep].}}");
                color = "#F7DB5C"
            }
            else if (HoursUp > (MaxUp * 0.65) && IsSleeping != 1) {
                tSleep = tSleep.concat("{{<small>"+name + ":=<small>seriously needs to sleep.</b><br><i>[-2 on all rolls, -30% on perception rolls, -30% skills, DC PE 10 to fall asleep].}}");
                color = "#F7DB5C"
            }
            else if (HoursUp > (MaxUp * 0.5) && IsSleeping != 1) {
                tSleep = tSleep.concat("{{<small>"+name +":=<small>is getting sleepy.</b><br><i>[-15% on perception roll,-10% skills].}}");
            }
            aSleep.set('current', HoursUp);
            var bar = Math.round(HoursUp/MaxUp*100);
            var bar = Math.round((MaxUp-HoursUp)/MaxUp*100);
            if (HoursUp > (MaxUp * 0.5) && IsSleeping != 1) {
                var a = '<div style="padding: 0px; margin:5px; float:right; display:inline-block; border-radius:2px; width:40%; background-color:black; border:1px solid black; height:3px">';
                var b = '<div style="border-radius: 2px; width:'+bar+'%;background-color:'+color+';border-right:1px solid black;height:3px"></div></div><hr>';
                tFood1 = tFood1.concat(name+" "+a+b);
            }
            log(tFood1)
        }
    });
    tSleep = tSleep + IsAsleep;
    var Chart = "<div style='text-align:left; font-size:8pt; background-color:white; padding:1px; border:1px solid black;'>"+tFood1+"</div>";
    var button = "<a href='!sleep' style='line-height: 1em; border:2px solid; margin:0; padding: 3px; text-align:center; height:8px; background:#1184AB; color:#ffffff; font-size:9px;'>Sleep</a>";
    sendChat('', "&{template:RIFTS} {{name=Sleep    "+button+"}} {{color=sleep}}"+tSleep+"{{Stats="+Chart+"}}");
};