"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/Command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { MassifOutput } from "@/types/massif";
import { cn } from "@/utils/styleUtils";

interface IMassifFileSelectorProps {
  massifOutputs: MassifOutput[];
  labels: string[];
  setSelectedMassifOutput: React.Dispatch<React.SetStateAction<MassifOutput | undefined>>;
}

const MassifFileSelector = ({
  massifOutputs,
  labels,
  setSelectedMassifOutput,
}: IMassifFileSelectorProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const massifLabels = labels.map((label) => ({ label, value: label.toLowerCase() }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? massifLabels.find((massifLabel) => massifLabel.value === value)?.label
            : "Select Massif file..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search Massif file..." />
          <CommandEmpty>No file found.</CommandEmpty>
          <CommandGroup>
            {massifLabels.map((massifLabel) => (
              <CommandItem
                key={massifLabel.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setSelectedMassifOutput(
                    currentValue === value
                      ? undefined
                      : massifOutputs[
                          labels.findIndex((label) => label.toLowerCase() === currentValue)
                        ],
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === massifLabel.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {massifLabel.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MassifFileSelector;
