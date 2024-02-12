import { myTool } from "@private/my-tool";
import { writeFileSync } from "fs";

writeFileSync('./custom/tool.json', JSON.stringify(myTool));
