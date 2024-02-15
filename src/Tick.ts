import { Data, MCFunction, Objective, Selector, execute, title } from "sandstone";

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
  "tick",
  () => {
    storePos();
  },
  {
    runEachTick: true,
  }
);

// MCFunction to store the current position of the entity
const storePos = MCFunction("store_pos", () => {
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
