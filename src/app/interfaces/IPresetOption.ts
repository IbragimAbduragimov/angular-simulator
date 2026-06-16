import { Preset } from "@primeuix/themes/types";
import { Theme } from "../../enums/Theme";

export interface IPresetOption {
  value: Theme;
  preset: Preset;
}