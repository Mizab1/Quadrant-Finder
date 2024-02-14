import { MCFunction, Objective, Selector, execute, title } from "sandstone";

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
    // Store the posX from NBT to scoreboard
    execute.store.result.score(playerPosX).run.data.get.entity(selfEntity, "Pos[0]");

    // Store the posY from NBT to scoreboard
    execute.store.result.score(playerPosY).run.data.get.entity(selfEntity, "Pos[1]");

    // Store the posZ from NBT to scoreboard
    execute.store.result.score(playerPosZ).run.data.get.entity(selfEntity, "Pos[2]");

    //! Debug Display (Used to display the current coords the actionbar)
    title(selfEntity).actionbar([
      [{ text: "X : " }, { score: { name: playerPosX.target, objective: playerPosX.objective.name } }, { text: " " }],
      [{ text: "Y : " }, { score: { name: playerPosY.target, objective: playerPosY.objective.name } }, { text: " " }],
      [{ text: "Z : " }, { score: { name: playerPosZ.target, objective: playerPosZ.objective.name } }, { text: " " }],
    ]);
  });
});
