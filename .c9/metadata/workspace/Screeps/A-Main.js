{"changed":false,"filter":false,"title":"A-Main.js","tooltip":"/Screeps/A-Main.js","value":"global.DX = require('Z_Functions');\n// --------------------------------------\nfor(var name in Memory.creeps) {\n    if(!Game.creeps[name]) delete Memory.creeps[name];\n}\nfor(var name in Memory.rooms) {\n    if(!Game.rooms[name]) delete Memory.rooms[name];\n    else if(Game.time % 10 === 0) {\n        DX.FindRepairs(Game.rooms[name]);\n        DX.FindBuilds(Game.rooms[name]);\n    }\n}\n//--------------------------------------\nrequire('Z_Population');\nvar Z_Spawner = require('Z_Spawner');\n//--------------------------------------\nfor(var name in Memory.spawns) {\nif(!Game.spawns[name]) delete Memory.spawns[name];\n    else Z_Spawner(Memory.spawns[name]);\n}\nMemory.flags = Memory.flags || {};\nfor(var name in Game.flags) {\n    Memory.flags[name] = Game.flags[name];\n}\nfor(var i in Memory.flags) {\n    if(!Game.flags[i]) delete Memory.flags[i];\n}\n//--------------------------------------\nvar MMiner = require('M-Miner');\nvar MHelper = require('M-Helper');\nvar BBuilder = require('B-Builder');\nvar BHelper = require('B-Helper');\nvar RRepair = require('R-Repair');\nvar MRunnerH = require('M-RunnerH');\nvar FGuard = require('F-Guard');\nvar FHeal = require('F-Heal');\nvar CCarry = require('C-Carry');\n//----------------------------------\nfor(var name in Game.creeps) {\n    var creep = Game.creeps[name];\n    if (creep.memory.script) {\n        var creepMem = creep.memory.script.replace('-', '');\n        eval(creepMem)(creep);\n        if(creepMem !== 'MMiner')DX.LootDropped(creep);\n        if(creep.ticksToLive < 20) creep.say('DYING!')\n        }\n    else creep.say('LOST')\n};\n// --------------------------------------\nrequire('Z_Announce');\nrequire('Z_Links');","undoManager":{"mark":-1,"position":-1,"stack":[]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":33,"column":36},"end":{"row":33,"column":36},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1440538531000}