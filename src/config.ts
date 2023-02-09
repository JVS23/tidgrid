import yaml, { YAMLException } from "js-yaml";
import fs from "fs";

class ConfigurationError extends Error {}

interface Configuration {
  namespace: {
    syntax: "parentheses" | "dashes"
    prefixes: boolean
  }
  grid: {
    row: {
      sizes: string[]
      fractions: string[]
    }
    gaps: {
      indices: "impilict" | "explicit"
      sizes: string[] | Map<string, string>
    }
  }
  variant: {
    breakpoints: Map<string, string>
  }
  layout: {
    section: Map<string, string>
    footer: Map<string, string>
    margin: Map<string, string>
  }
}

const DEFAULT_PATH = "tidgridrc.yml";

function readCongfiguration(path: string = DEFAULT_PATH, encoding: BufferEncoding = "utf8"): Configuration {
  try {
    return yaml.load(fs.readFileSync(path, encoding)) as Configuration;
  } catch (exception) {
    if (exception instanceof YAMLException) {
      throw new ConfigurationError(exception.message);
    } else if (exception instanceof Error) {
      if (exception.message.startsWith("ENOENT"))
        throw new ConfigurationError(`Unable to read configuration in ${path}: file not found.`);
    }
    
    throw new ConfigurationError(`An unknown error was thrown when reading configuration in ${path}. Unable to elaborate.`);
  }
}

export {
  Configuration,
  readCongfiguration
};
