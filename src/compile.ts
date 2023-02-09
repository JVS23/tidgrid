import { readFileSync } from "fs";
import { CompileResult, compileString } from "sass";
import { Configuration, readCongfiguration } from "./config";
import { createBreakpoint } from "./breakpoint"

function compile() {
  const configuration: Configuration = readCongfiguration();

  const breakpoints: string[] = Object.entries(configuration.variant.breakpoints)
    .map((breakpoint) => createBreakpoint(...breakpoint)
  );

  const source = readFileSync("src/tidgrid.scss", "utf-8");
  const result: CompileResult = compileString(source, { style: "expanded", loadPaths: ["src"] });
  console.log(result.css);
}

compile();
