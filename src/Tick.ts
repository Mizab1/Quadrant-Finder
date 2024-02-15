import { Data, MCFunction, Objective, Selector, _, execute, tellraw, title } from "sandstone";

// Var for the pack is in the dev env
const isDev = true;

// Const for self entity which points to the current entity
const selfEntity = Selector("@s");

// Scores and variable
const playerPosX = Objective.create("pos_x", "dummy")("@s");
const playerPosY = Objective.create("pos_y", "dummy")("@s");
const playerPosZ = Objective.create("pos_z", "dummy")("@s");

// * TICKING FUNCTION * //
const tick = MCFunction(
  "private/tick",
  () => {
    storePos();
  },
  {
    runEachTick: true,
  }
);

// MCFunction to store the current position of the entity
const storePos = MCFunction("private/store_pos", () => {
  execute.as("@a").run(() => {
    // Instance of the entity NBT data object
    const playerData = Data("entity", selfEntity);

    // Store the posX from NBT to scoreboard
    playerPosX.set(playerData.select("Pos[0]"));

    // Store the posY from NBT to scoreboard
    playerPosY.set(playerData.select("Pos[1]"));

    // Store the posZ from NBT to scoreboard
    playerPosZ.set(playerData.select("Pos[2]"));

    if (isDev) {
      //! Debug Display (Used to display the current coords the actionbar)
      title(selfEntity).actionbar([
        [{ text: "X : " }, { score: { name: playerPosX.target, objective: playerPosX.objective.name } }, { text: " " }],
        [{ text: "Y : " }, { score: { name: playerPosY.target, objective: playerPosY.objective.name } }, { text: " " }],
        [{ text: "Z : " }, { score: { name: playerPosZ.target, objective: playerPosZ.objective.name } }, { text: " " }],
      ]);
    }
  });
});

// Find the quadrant of the player
const findQuadrant = MCFunction("find_quadrant", () => {
  _.if(_.and(playerPosX["=="](0), playerPosZ["=="](0)), () => {
    tellraw(selfEntity, [{ text: "You are at the origin", color: "red" }]);
  }).else(() => {
    // For X = + and Z = +
    _.if(_.and(playerPosX.matches([1, Infinity]), playerPosZ.matches([1, Infinity])), () => {
      _.if(playerPosX[">"](playerPosZ), () => {
        tellrawGen("East");
      }).elseIf(playerPosX["<"](playerPosZ), () => {
        tellrawGen("South");
      });
    });

    // For X = - and Z = -
    _.if(_.and(playerPosX.matches([Infinity, -1]), playerPosZ.matches([Infinity, -1])), () => {
      _.if(playerPosX["<"](playerPosZ), () => {
        tellrawGen("West");
      }).elseIf(playerPosX[">"](playerPosZ), () => {
        tellrawGen("North");
      });
    });

    // For X = - and Z = +
    _.if(_.and(playerPosX.matches([Infinity, -1]), playerPosZ.matches([1, Infinity])), () => {
      playerPosX.multiply(-1);

      _.if(playerPosX[">"](playerPosZ), () => {
        tellrawGen("West");
      }).elseIf(playerPosX["<"](playerPosZ), () => {
        tellrawGen("South");
      });
    });

    // For X = + and Z = -
    _.if(_.and(playerPosX.matches([1, Infinity]), playerPosZ.matches([Infinity, -1])), () => {
      playerPosZ.multiply(-1);

      _.if(playerPosX[">"](playerPosZ), () => {
        tellrawGen("East");
      }).elseIf(playerPosX["<"](playerPosZ), () => {
        tellrawGen("North");
      });
    });
  });
});

// Tellraw gen
function tellrawGen(quadrant: string) {
  tellraw(selfEntity, [{ text: "You are in " }, { text: quadrant, color: "green" }, { text: " quadrant" }]);
}
